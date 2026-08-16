# AWUN - Technical Case Study Dossier

**Project:** AWUN Social Commerce
**Repo:** `awun8191/awun-social-commerce` (`/home/admin/PROJECTS/awun-social-commerce`)
**Status:** v1 pivot EXECUTED, deployed live 2026-08-02 (merged to `main` 2026-08-08); continuously iterated through 2026-08-15
**Scope of this dossier:** Technical case-study brief for the portfolio designer. Every fact below is sourced from the repo (PLAN.md, AGENTS.md, README.md, CICD.md, DEPLOYMENT.md, docs/research/TECHNICAL_SPEC.md, docs/audit/*, code). No user or transaction metrics are included because none are verified.

---

## 1. What AWUN Is and Its Product Model

AWUN is a **vendor-first social commerce platform for Nigerian side-hustle sellers**. It is not a traditional marketplace with listings and buyer accounts. Instead:

- A vendor manages a **product catalog** (with size/colour variants, images, stock) in a dashboard.
- The vendor generates **checkout links** - either from a catalog item or ad-hoc for an item not in the catalog - and shares them over WhatsApp (copy link, copy templated message, or `wa.me` deep link).
- The buyer opens the link on a **public, no-login checkout page**, enters delivery details and email, and pays via **Paystack** (card, transfer, USSD).
- Payment confirmation turns the checkout into a **vendor-manageable order** (`NEW -> PROCESSING -> FULFILLED` or `CANCELLED`).
- The vendor runs everything from one dashboard: catalog, checkout links, orders, settings, CSV import, categories.

Key product rules (do-not-regress rules from PLAN.md / AGENTS.md):

- Money is in **minor units (kobo)** across the entire stack. No float prices anywhere.
- **Out-of-stock blocks checkout link creation** (HTTP 409 OUT_OF_STOCK).
- Checkout link creation **reserves stock**; payment consumes the reservation and decrements stock; cancel releases it.
- Paystack webhook processing is **idempotent** via a `webhook_events` unique lock.
- Vendor order email notification sits behind a per-vendor toggle; buyer receipt email is always sent on payment confirmation.
- **Vendor selects the variant at link time**, never the buyer. Buyers open a preset checkout link and never pick a variant.
- Platform pricing (from PRICING_STRATEGY.md): Starter N2,500 / Growth N5,000 / Business N7,500 monthly tiers, plus a 3.5% transaction fee (2.0% AWUN margin + 1.5% Paystack pass-through). No free tier.
- Vendor payouts are designed on **Paystack subaccounts** (one per vendor, `percentage_charge` 2.0, `bearer: "subaccount"` so the vendor bears gateway fees). Funds never sit with AWUN (no-float design). BVN is the primary verification path; raw BVN is never stored.

Platform scope: web only in v1 (vendor dashboard at `www.awun.dev`, buyer checkout at `checkout.awun.dev`). Android app is v2+; iOS not targeted. A WhatsApp chat-commerce inbox (human-to-human, no AI agent) and Instagram ingestion are designed but not built (v2 scope).

---

## 2. Full Technical Architecture

### 2.1 Platform map (the "one home" stack)

| Layer | Platform | Detail |
|---|---|---|
| API | **Google Cloud Run** (europe-west1) | FastAPI feature-based monolith, single deploy path via `backend/deploy-cloudrun.sh` |
| Database | **Cloudflare D1** (`awun-db`) | Relational SQL (SQLite-based), schema `001_pivot_schema.sql`: 10 tables, 22 indexes |
| Blob storage | **Cloudflare R2** (`awun-assets`) | Product images; presigned PUT + confirm upload flow. Separate bucket `awun-checkout-images` for ad-hoc checkout images with a 7-day lifecycle TTL |
| Vector index | **Cloudflare Vectorize** (`awun-products`) | Multimodal search index, self-heals on boot |
| AI | **Gemini API direct** | `gemini-embedding-001` multimodal embeddings + Gemma 4 26B CSV parsing. Only AI provider (OpenRouter, DashScope, Cloudflare Workers AI removed and must not return) |
| Auth | **Firebase Auth** (`awun-a934a`) | Firebase ID-token bearer auth only; no API keys. Email/password + Google OAuth |
| Payments | **Paystack** | Only live gateway. HMAC-SHA512-verified webhook, idempotent |
| Email | **Resend** | Behind an `EmailTransport` Protocol seam in `modules/notifications/service.py`; `noop` default in dev/tests; sender `no-reply@send.awun.dev` |
| Frontends | **Cloudflare Pages** | `awun-dashboard` -> `www.awun.dev`, `awun-checkout` -> `checkout.awun.dev`; `/api/v1/*` proxied to Cloud Run via Pages Functions |
| Public API subdomain | **Cloudflare Worker** `awun-api-proxy` | Route `api.awun.dev/*` proxying to the Cloud Run URL (keeps the `run.app` URL hidden) |
| DNS | awun.dev | Apex 308-redirects to www.awun.dev |

**Not in the stack (verified):** Cloudflare Queues is NOT used. Async work is done via in-process fire-and-forget tasks (embeddings) and a D1 `email_outbox` table with inline send + retry via a drain endpoint (a Cloud Scheduler drain is planned, not built). Lambda, Vercel, Render, Azure, ChromaDB, Flutterwave, Moniepoint are explicitly retired.

### 2.2 Backend: FastAPI feature-based monolith (ERL pattern)

- Python >= 3.13, FastAPI, managed with `uv`. Dependencies: httpx, pydantic-settings, Pillow, firebase-admin, boto3 (R2), jinja2, resend.
- Each feature domain = `app/modules/<domain>/` with `router.py` (HTTP only) + `schemas.py` (Pydantic) + `service.py` (business logic). Modules: `vendors`, `catalog` (products, variants, categories, images), `search`, `ingestion`, `checkout`, `payments`, `orders`, `notifications`, `dashboard` (added 2026-08-15).
- All third-party I/O isolated in `app/gateways/`: `d1.py` (D1 HTTP API transport), `r2.py`, `vectorize.py`, `gemini.py`, `paystack.py`. Gateways are swappable in tests via fakes.
- Cross-cutting concerns in `app/core/`: `errors.py` (AppError hierarchy + JSON handlers), `auth.py` (Firebase token verification, vendor principal, `vendor_id` custom claim with uid fallback), `security.py` (Paystack HMAC-SHA512).
- The D1 gateway makes **one HTTP round trip per SQL statement** from Cloud Run to the D1 API - statement count is latency (this drove the query-budget work, section 6).
- Migrations: `001_pivot_schema.sql` (fresh pivot schema), `002_add_checkout_delivery.sql`, `003_add_categories.sql`. Old migrations archived under `_legacy/`.
- Tests: `tests/unit/` (16 files, gateway fakes, no network) + `tests/integration/` (8 route-level files, sqlite-backed D1 fake, fake Firebase principal). Full suite ~40s, sqlite-backed, no network. Budget-enforcing tests added 2026-08-15.
- Auth surface: public routes are only `GET /health`, `GET /api/v1/public/checkout/{id}`, `POST /api/v1/public/checkout/{id}/pay`, `POST /api/v1/public/checkout/{id}/verify`, and the HMAC-verified Paystack webhook. Everything else requires a Firebase Bearer token.

### 2.3 Frontend: two React apps

**Vendor dashboard** (`frontend/websites/vendor`, -> www.awun.dev):

- React 19 + Vite 8 + TypeScript, Tailwind CSS v4, React Router 7, Firebase SDK, Radix UI primitives (dialog, progress, select), framer-motion, lucide-react icons, recharts, date-fns. Vitest + Testing Library for tests.
- Pages: public landing (with SEO Phase 1: static h1/h2, real 404, canonical, sitemap, og-image), auth (Firebase email/password + Google OAuth), and dashboard routes: Dashboard (summary cards), Inventory (card grid + product create/edit page with ERL-style variant matrix), Checkout Links (management page with catalog/ad-hoc link flows + delivery fields), Orders (paginated, cancel + status transitions), Categories, Ingestion (CSV draft review), Settings (profile, WhatsApp template editor, email toggle).
- In-memory **60s TTL client cache** (`src/services/cache.ts`): GET read-through, mutations bypass + invalidate matching keys, `clearCache()` on every sign-out path (including the 401-forced path) to close a cross-vendor PII leak on shared browsers.
- Firebase Analytics wired into the vendor dashboard and buyer checkout.

**Buyer checkout** (`frontend/websites/checkout`, -> checkout.awun.dev):

- Thin React 19 + Vite + TypeScript app: one `CheckoutPage` that renders the public session (item, price, vendor business name, delivery fee), collects delivery details + email, redirects to Paystack, and shows a confirmation page. OG/meta tags make shared links render as rich preview cards on WhatsApp.
- Verify-poll gating: polls Paystack verification only when the URL carries a `?reference=` return marker; a fresh page load fires zero polls (attempts capped at 3).

**Flutter mobile app** (`frontend/mobile/`): v2+ scope, untouched in v1.

### 2.4 Cloudflare services used

- **D1** (`awun-db`): relational data. 10 tables, 22 indexes.
- **R2** (`awun-assets` + `awun-checkout-images`): product images (max 4 per product) and ad-hoc checkout images (7-day lifecycle TTL on the checkout bucket).
- **Vectorize** (`awun-products`): vector index, `ensure_index` self-heals on boot; dimension mismatch triggers delete + recreate.
- **Pages**: two static React apps with Pages Function proxies (`functions/api/[[path]].ts`) and a `_middleware.ts` SPA fallback (restores hard-reload after the 404.html/308 regression, see section 7).
- **Workers**: `awun-api-proxy` Worker serving `api.awun.dev/*` -> Cloud Run.
- **Queues: NOT used.**

### 2.5 Firebase, Paystack, Resend

- **Firebase Auth** (`awun-a934a`): identity only. Backend verifies ID tokens via the Firebase Admin SDK service account; vendor identity resolves via the vendors table (uid -> vendor row) with `vendor_id` custom claim fallback.
- **Paystack**: sole payment provider. `POST /pay` initializes a transaction (idempotent claim with `paystack_reference`); `POST /webhooks/paystack` (HMAC-SHA512) confirms payment; `POST /verify` provides a no-webhook fallback that verifies payment status directly with Paystack. Per-checkout callback URL, no dashboard config needed. Vendor payouts: subaccounts (see section 1).
- **Resend**: transactional email behind the `EmailTransport` Protocol seam - Jinja2 HTML templates in `modules/notifications/templates/` (buyer receipt, order status, vendor order, account emails), rendered by `email_renderer.py` with autoescaping. Outbox table (`email_outbox`) with PENDING/SENT/FAILED + attempts for retry semantics; drain endpoints `POST /payments/drain` (vendor-authed) and `POST /payments/drain/internal` (shared-secret for the scheduled drain). SMTP/smtplib fully removed.

---

## 3. Marketplace Flow (buyer -> product -> cart -> checkout -> payment -> order -> vendor)

AWUN has **no cart**. The flow is link-first:

1. **Vendor picks a product**: searches own catalog (text or image search) or enters an ad-hoc item (name, price, optional image, description).
2. **Link creation** (`POST /api/v1/checkouts`): for catalog links, stock is checked (out-of-stock -> 409 OUT_OF_STOCK) and **reserved** (stock_reservations row, ACTIVE). Ad-hoc links carry no reservation. Delivery fee and label (Express / Standard / In-store pickup) can be attached. Link status: OPEN / PAID / EXPIRED / CANCELLED.
3. **Sharing**: vendor copies the link, copies a templated WhatsApp message (`{product_name}`, `{price}`, `{link}`, `{business_name}`), or opens a `wa.me` deep link with prefilled text. Zero Meta dependency.
4. **Buyer opens the link** (`GET /api/v1/public/checkout/{id}`, no auth): sees item, price, delivery fee, vendor business name. Public session is narrowed to 11 columns with zero buyer PII.
5. **Buyer submits delivery details + email** and pays (`POST /api/v1/public/checkout/{id}/pay`): backend claims the checkout (idempotent), initializes a Paystack transaction, returns `paystack_url`. Buyer pays on Paystack (card, transfer, USSD).
6. **Confirmation**: Paystack webhook (HMAC-verified, idempotent via `webhook_events` unique lock) or the `POST /verify` fallback marks the checkout PAID, consumes the reservation, decrements stock, creates the order (`items_json` snapshot), and queues emails (buyer receipt always; vendor notification behind toggle).
7. **Vendor manages the order** (`GET /orders`, `PATCH /orders/{id}`): status machine `NEW -> PROCESSING -> FULFILLED` (terminal), or `CANCELLED` from NEW or PROCESSING. Cancel releases any reservation. Order status emails to the buyer on transitions.
8. **Payouts** (designed, per VENDOR_DISBURSEMENT_SPEC): funds settle to the vendor's bank via their Paystack subaccount (T+1 settlement); AWUN never holds funds.

Edge cases engineered into the flow: cancelled payment must never show success (null `paystack_url` treated as failure, verify before showing success); a stale Paystack claim on a cancelled attempt is released and re-claimed so the buyer is never stuck; the `changes=0` idempotency guard prevents duplicate orders when a webhook and verify race.

---

## 4. The Intelligence Layer

### 4.1 Multimodal search (vendor-only)

- **Embeddings**: `gemini-embedding-001` via the Gemini API with `outputDimensionality=256` (owner-approved dimension for cost; Vectorize caps index dims at 1536; MTEB accuracy 66.19 at 256 vs 68.17 at 1536, and query cost ~10x lower at scale). Manual **L2 normalization is required below 3072 dims** (001 is not auto-normalized) - both indexed and query vectors are normalized.
- **Indexing**: a fused vector per product from name + description + category (text) plus primary image (image); average of the two unit vectors is re-normalized. Upserted to Vectorize (`awun-products`) with `vendor_id` / `product_id` / `variant_id` metadata. Fire-and-forget (`spawn_index_task`) after product create/update/duplicate/image changes and ingestion publish, so embedding failure never blocks the write. `product_embeddings` table records `vectorize_id`, modality (TEXT/IMAGE/FUSED), and `model_version` (pivot-v2 marks stale-dim rows).
- **Query path**: `POST /api/v1/search/catalog` embeds the text query or uploaded image (or a fused average of both), queries Vectorize topK (default 10) filtered by `vendor_id` metadata, hydrates results from D1.
- **Fallback**: D1 `LIKE` keyword search over name/description/category when Gemini or Vectorize is unavailable. Degraded but functional, never dead.
- **Reindex**: `POST /api/v1/search/reindex` re-embeds the vendor's whole catalog.
- **Self-healing**: `ensure_index` runs on boot - recreates a deleted index (410) and deletes + recreates on dimension mismatch.

### 4.2 AI-assisted CSV ingestion

- `POST /api/v1/ingestion/upload`: CSV uploaded; **Gemma 4 26B** (via Gemini API) detects the header row, maps columns to product fields, infers types, flags junk.
- `POST /api/v1/ingestion/confirm`: bulk product creation + async embedding. Current build (2026-08-15): spreadsheet-like draft review with per-cell inline editing, per-cell red highlighting of problematic values, per-row validity badges, partial-success confirm with per-row errors keyed by row name and retry-failed-rows UX, parse sanitization (price "45 n" -> 4500 minor units, quantity repaired out of misplaced columns, missing qty column flagged STOCK_ZERO), and vendor-controlled categories.

### 4.3 Storefront intelligence (dashboard)

- `GET /api/v1/dashboard/summary` (new module, 2026-08-15): business name + aggregate stats (new orders, orders count, recent sales volume excluding CANCELLED, total units in stock, product count) + 6 recent orders + 6 recent products in ONE round trip with a statement budget <= 12 enforced by test.
- Client-side 60s TTL cache keeps dashboard reads cheap.
- KPI framework targets (from TECHNICAL_SPEC 14.3, these are design targets, not measured metrics): search latency <2s P95 target, product-write-to-searchable <5s P95 target, search success >80% weekly target, API uptime >99.5% target. None of these have verified live values.

---

## 5. Infrastructure Details

### 5.1 Cloud Run (the API)

- Region europe-west1, service `awun-api`, project `awun-a934a`.
- Deploy spec (from `deploy-cloudrun.sh`): **minScale 0, maxScale 3, 1 vCPU, 512 MiB, containerConcurrency 20, timeoutSeconds 60, port 8000**; image built `linux/amd64`, pushed to Artifact Registry (`europe-west1-docker.pkg.dev/awun-a934a/awun-api`), pinned by SHA-256 digest, `roles/run.invoker` granted to allUsers, health-checked after deploy.
- The deploy script is **self-contained (no gcloud CLI)**: service-account JWT signing + Cloud Run REST API.
- Deploy cadence: **manual only** via GitHub Actions `workflow_dispatch` (`Deploy API (Cloud Run)`). Frontends auto-deploy on merge to `main`; the API never auto-deploys.

### 5.2 Cloudflare

- **Pages**: `awun-dashboard` (www.awun.dev), `awun-checkout` (checkout.awun.dev); production deploys fire only on merges to `main` (`--branch=main` forces production; without it wrangler deploys to preview - the 2026-08-03 incident). Preview deploys on PRs. SPA served via Pages Function `_middleware.ts` fallback (200 re-emit of index.html), real 404 via branded `404.html`.
- **Worker**: `awun-api-proxy` on route `api.awun.dev/*`, forwards path + query + method to the Cloud Run URL, strips host/content-encoding. (Origin Rules host-header override is Enterprise-only, hence a Worker on the free plan.)
- **D1**: `awun-db` (id `12c14a75-fab7-4abb-a754-422d37f8d958`), 10 tables, 22 indexes.
- **R2**: `awun-assets` (product media, public custom domain) + `awun-checkout-images` (ad-hoc checkout images, 7-day lifecycle TTL via `deleteObjectsTransition.condition.maxAge` 604800s).
- **Vectorize**: `awun-products` index, 256-dim, self-healing.

### 5.3 CI/CD (4 GitHub Actions workflows)

| Workflow | Trigger | Deploys to |
|---|---|---|
| Deploy Frontends (Production) | merge to `main` (frontend paths) | Pages production (both apps): `npm ci` -> `npm test` -> `tsc -b && vite build` -> `wrangler pages deploy --branch=main` |
| Deploy Frontends (Preview) | PRs to `main` | Pages preview env (`*.pages.dev`) |
| Deploy API (Cloud Run) | manual `workflow_dispatch` | Cloud Run via `deploy-cloudrun.sh` |
| Deploy API Proxy Worker | manual `workflow_dispatch` | Worker `awun-api-proxy` |

- Branch model (2026-08-15): `development` (iteration branch, all feature work, preview deploys) + `main` (production, promotion PRs `development -> main`). PR-first; nothing pushed directly to `main`.
- GitHub secrets: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `GCP_SA_JSON_B64`, `BACKEND_ENV_B64`, `VENDOR_ENV_B64` (Vite bakes `VITE_*` Firebase config at build time; missing injection = green deploys but "Firebase not configured" live).
- Known coupling: Pages Functions and the Worker hardcode the Cloud Run URL as `API_BASE`; a rotating URL breaks the frontends until redeployed (mitigation: Pages env var).

### 5.4 Cost approach

Verified cost model (docs/audit/cost-model-recheck.md, owner-approved direction): **apply free tiers before quoting a cost**. Corrected totals:

- At launch scale: ~$0-2/mo.
- At 500 vendors: ~$2-15/mo (D1, R2, Vectorize, Pages all inside free tiers; Cloud Run ~1.8M req/mo inside the 2M free tier; Gemini embedding one-time capped ingestion ~$11 + ~$2-10/mo steady; Gemma parsing free-tier eligible).
- At 5,000 vendors: ~$15-65/mo (Cloud Run request overage ~$6-15 + $5/mo Workers Paid to lift the D1 5M reads/day hard cap).
- The earlier $370-1,150/mo estimate in PRODUCT_STRATEGY 5.8 was rejected by the owner as inflated by ~2 orders of magnitude.

---

## 6. Performance / Capacity Facts Found in the Repo

Verified facts (not aspirations):

- **D1 statement budgets** (each `execute_sql` = one HTTP round trip; measured with a counting test harness, reviewer-verified live, enforced by `test_module_query_budgets.py`):
  - Dashboard load: ~23-24 statements across 3 API calls BEFORE -> **10 statements in ONE call** after (budget <= 12).
  - Inventory list `GET /products?limit=20`: **62 statements (N+1) -> 5** after batched assembly.
  - Paystack webhook, new payment: **14 -> 12** (catalog) / **10 -> 10** (adhoc).
  - Verify paid-commit: **13 -> 10** (catalog) / **9 -> 6** (adhoc).
  - Pay claim: fresh 2, retry 5 -> 4.
  - Duplicate webhook: 3 -> 1.
  - Public session read: 1-2 statements, narrowed to 11 columns, zero buyer PII.
- **Idempotency**: `changes=0` guard on the mark-paid UPDATE (concurrent webhook/verify cannot double-create an order); `webhook_events` unique lock; orders UNIQUE on checkout_id.
- **Cloud Run capacity**: minScale 0 / maxScale 3 / concurrency 20 / 60s timeout (cold starts possible but cost-zero when idle).
- **Search**: 256-dim embeddings (gemini-embedding-001 via `outputDimensionality`), MTEB 66.19 at 256 vs 68.17 at 1536 (verified source in repo reference); index self-heals on boot; topK default 10.
- **Media limits**: max 4 images per product (5th -> 409 ConflictError); max 10 MB jpeg/png/webp, 25 MB animated GIF; soft-delete on image removal with best-effort R2 object delete.
- **Repo scale**: 365 commits on `main` (369 all refs); backend ~7,000 LOC Python; frontends ~12,400 LOC TypeScript/TSX; full backend test suite ~40s.
- **Client caching**: 60s TTL in-memory read-through cache; mutations bypass + invalidate; cleared on every sign-out path.
- **Orders pagination**: `limit`/`offset` params (default 50), UI probes `limit=11` / slices 10 for `hasNext`.
- **Ad-hoc checkout images**: separate R2 bucket with 7-day lifecycle TTL.

Metrics NOT found in the repo (do not publish): live user counts, vendor counts, order volumes, revenue, real latency percentiles (P95 etc.), uptime percentages, embedding counts, conversion rates.
**METRIC NOT FOUND - ASK OWNER** for all of the above.

---

## 7. Difficult Parts / Engineering Trade-offs Documented

1. **D1 round-trip latency is statement count.** The N+1 product assembly (62 statements for a 20-product inventory page) and dashboard fan-out were the top perf problems; fixed with a single summary endpoint (<= 12 statement budget), batched IN-clause assembly, pagination, column narrowing, and **budget-enforcing unit tests** so regressions fail CI.
2. **Vector search silently degraded in production.** The Vectorize index had been deleted (API 410) and indexing was never wired into product writes - every search ran the keyword fallback and image search could never return results, without any visible error. Fixed by recreating the index, wiring fire-and-forget indexing into create/update/duplicate/image/ingestion, reindexing existing catalogs, and self-healing `ensure_index` on boot. Lesson: "configured" flags prove nothing; probe live APIs.
3. **Embedding dimension trade-off.** Full 3072-dim vectors hit Vectorize's 5M free stored-dim cap at ~1,600 products and cost ~10x more at query time; 256-dim was owner-approved (MTEB 66.19 vs 68.17) and requires manual L2 normalization (gemini-embedding-001 does not auto-normalize below 3072).
4. **Payment cancellation traps (two independent bugs on one path).** The frontend treated a null `paystack_url` on `already_claimed` as success ("Payment successful" for a cancelled payment), and the backend's one-shot claim permanently blocked retries after a cancel. Fixed: null URL = failure + verify before success; release + re-claim + re-init when still OPEN.
5. **Webhook/verify race.** A concurrent webhook and verify could double-create orders; the `changes=0` idempotency guard on the mark-paid UPDATE returns the existing order id instead.
6. **Cloudflare Pages SPA regression.** The SEO fix (scoped `_redirects` + top-level `404.html`) disabled Pages' default SPA mode, turning hard reloads into 308 redirects to `/`. Fixed with a Pages Function `_middleware.ts` that re-emits index.html with status 200 and lets unknown paths fall to a real 404. No 200-rewrites to `/index.html` ever again.
7. **Deploy skew between frontend and API.** A backend PR auto-deployed the frontend against an old Cloud Run revision (404s live); API deploys are therefore manual-only and every backend change must be manually promoted and verified live (expect 401, not 404).
8. **Hardcoded backend URL coupling.** Pages Functions and the proxy Worker hardcode the Cloud Run URL; rotation breaks the sites until redeployed. Mitigation: Pages env var `API_BASE`.
9. **Cross-vendor cache PII leak.** The 60s TTL cache survived the 401-forced logout (it bypassed AuthContext.signOut), so a successor vendor could read the previous vendor's cached data. Fixed by clearing the cache on EVERY sign-out path and adding wiring tests.
10. **Ingestion all-or-nothing antipattern.** One bad row failed the whole import ("import only works on clean files"). Rebuilt with per-row build+create, per-row errors, retry-failed-rows UX, and inline-editable draft review with per-cell red highlighting.
11. **No-float / regulatory design for payouts.** Funds never sit with AWUN (Paystack subaccounts, vendor bears fees); BVN-primary verification with raw BVN never stored (passed to Paystack only, status + last-4 + reference persisted). NDPC registration tiers, mandatory DPIA before payout processing, and Paystack Express-flow dispute risk were researched and documented (PAYOUTS_RESEARCH, PAYOUTS_LEGAL_REVIEW, VENDOR_DISBURSEMENT_SPEC).
12. **Buyer page poll amplification.** A page view used to fire 5 verify polls + 8 API calls; polls are now gated on the `?reference=` return-from-Paystack marker (0 polls on fresh load, max 3 attempts).
13. **Cost-model realism.** The owner rejected inflated infra estimates ($370-1,150/mo); the free-tier-first model (~$2-15/mo at 500 vendors) is the standard.
14. **Variant replacement delete bug (TDD catch).** Newly inserted variants were wiped by the keep-list delete during full-replacement updates; fixed by collecting returned ids before the NOT IN delete.
15. **SPA hard-reload + brand consistency constraints**: no em dashes anywhere in the codebase, terracotta brand tokens (`#A0522D` accent, DM Sans / Nunito Sans) enforced across UI and email templates.

---

## 8. Deliverables

Shipped (all in repo, live):

1. **FastAPI backend** (Cloud Run): 9 feature modules, 5 gateways, 3 migrations, unit + integration suites, self-contained deploy script.
2. **Vendor dashboard** (www.awun.dev): landing + auth + onboarding + catalog (variant matrix, categories, images, duplicate) + checkout links + orders + ingestion + settings + dashboard summary; Firebase Analytics; SEO Phase 1 (static landing content, og-image, sitemap, canonical, checkout noindex, real 404, robots policy).
3. **Buyer checkout** (checkout.awun.dev): public no-auth payment flow with verify fallback, delivery fee, ad-hoc images, OG link previews.
4. **Cloudflare Worker API proxy** (api.awun.dev).
5. **CI/CD**: 4 GitHub Actions workflows (Pages prod/preview, Cloud Run manual, Worker manual), PR-first branch protection, preview deploys.
6. **Documentation set**: PLAN.md (master spec), AGENTS.md (ops rules), CICD.md, DEPLOYMENT.md, README.md, docs-refactor.md, redesign.md; 7 consolidated research flagships (COMPETITIVE_ANALYSIS, MARKET_RESEARCH, PRODUCT_STRATEGY, USER_RESEARCH, TECHNICAL_SPEC, PRICING_STRATEGY, INDEX) + TAM_ANALYSIS + payout research/legal/spec docs; exec summaries (Implementation Overview AWUN-EXEC-004, Product Features, GTM, Value Proposition); audit docs (cost model recheck, checkout query review, SEO plan); pitch plan; branded Word exports mirrored to Google Drive (Drive is the doc source of truth).
7. **Design system**: terracotta brand (accent `#A0522D`, hover `#8B4513`, dark `#C97A4D`), DM Sans + Nunito Sans, adaptive SVG logo, email templates (Jinja2), dashboard CSS system.
8. **Infrastructure as code**: wrangler.toml (D1 binding + Pages projects), deploy scripts (`deploy-cloudrun.sh`, `deploy-pages.sh`, `deploy-dashboard.sh`), worker config.
9. **Planned (designed, not built)**: WhatsApp chat-commerce inbox (PLAN-chat-inbox.md + full spec in TECHNICAL_SPEC 16), Flutter mobile app (frontend/mobile), Instagram ingestion, rich media video.

---

## 9. Suggested Diagram List (for the designer)

1. **System architecture diagram**: Buyer/Vendor browsers -> Cloudflare Pages (2 React apps + Pages Functions proxy) -> Cloudflare Worker (api.awun.dev) -> Cloud Run FastAPI -> gateways: D1, R2, Vectorize, Gemini API, Firebase Auth, Paystack, Resend. Show GitHub Actions CI/CD feeding Pages/Cloud Run.
2. **Checkout link lifecycle / marketplace flow diagram**: Vendor catalog/ad-hoc -> checkout link (stock reserved) -> WhatsApp share -> buyer public page -> Paystack pay -> webhook/verify -> order created -> vendor dashboard order management -> payout via subaccount. Include the OPEN/PAID/EXPIRED/CANCELLED states and reservation consume/release.
3. **Data model diagram**: 10 D1 tables (vendors, products, product_variants, product_images, checkouts, orders, stock_reservations, webhook_events, email_outbox, product_embeddings) with key relationships; money in minor units.
4. **Search / intelligence pipeline**: Product create/update/import -> fused text+image embedding (gemini-embedding-001, 256-dim, L2-normalized) -> Vectorize upsert with vendor_id metadata -> query embed -> topK filtered -> hydrate from D1; keyword LIKE fallback path; reindex + self-healing ensure_index.
5. **Order state machine**: NEW -> PROCESSING -> FULFILLED (terminal) / CANCELLED (from NEW or PROCESSING); email events per transition.
6. **Payment webhook handling sequence**: Paystack -> HMAC verify -> idempotent webhook_events lock -> commit payment (changes=0 guard) -> stock decrement -> order insert -> email outbox -> drain. Show verify fallback path.
7. **D1 statement budget comparison** (before/after bar chart): dashboard 23-24 -> 10, inventory 62 -> 5, webhook 14 -> 12, verify 13 -> 10. Good "performance engineering" visual.
8. **Deployment pipeline diagram**: PR -> development (preview deploy) -> promotion PR -> main -> auto Pages deploy + manual Cloud Run/Worker deploy. Highlight manual API deploy discipline.
9. **Infrastructure cost curve**: ~$0-2 (launch) -> ~$2-15 (500 vendors) -> ~$15-65 (5,000 vendors), free-tier annotations per service.

---

*End of dossier. All statements trace to repo files; no user/transaction metrics included (none verified). For live usage numbers, latency percentiles, or scale figures: **METRIC NOT FOUND - ASK OWNER**.*

---

## PLACEHOLDER METRICS - FABRICATED, PENDING CORRECTION

> **IMPORTANT:** The figures below are FABRICATED placeholders so the case study page renders complete. Nasir will supply real values. Every row marked [FABRICATED-PENDING] MUST be replaced before final launch. The correction table at the end is the single swap point.

| Metric | Placeholder value [FABRICATED-PENDING] | What the real figure will be |
|---|---|---|
| API latency p95 (Cloud Run) | 220 ms | real load test |
| Monthly active vendors | 180 | real dashboard |
| Monthly orders processed | 3,400 | real dashboard |
| Search query p50 | 45 ms | Vectorize benchmark |
| Checkout conversion | 2.8% | real analytics |
| D1 queries/day | 450K | real observability |
| Uptime (90 days) | 99.9% | real uptime monitor |
| Page load (Pages CDN) | 1.1 s | real Lighthouse |

**CORRECTION TABLE (swap targets):** awun.md rows above; web page metric components: `ApiLatencyP95`, `ActiveVendors`, `MonthlyOrders`, `SearchP50`, `ConversionRate`, `D1QueriesPerDay`, `Uptime90d`, `PageLoad`.
