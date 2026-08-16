# NUESA Academia TextBooks — Technical Case Study Dossier

**Project:** NUESA Academia TextBooks
**Repo:** `NuesaTechTeam/TextBooks` (`/home/admin/PROJECTS/TextBooks`, branch `main`)
**Status:** Live. Manual-deploy platform (no CI/CD). SEO quick-win pass landed 2026-08-01.
**Scope of this dossier:** Technical case-study brief for the portfolio designer. Every fact below is sourced from the repo (README.md, API_DOCUMENTATION.md, docs/seo-review.md, CloudflareWorker/, api/, frontend/, scripts/, tests/, git log). Where a claim cannot be verified in the repo it is marked **METRIC NOT FOUND - ASK OWNER**. No fabricated numbers appear as real facts; placeholders live in the final section only.

---

## 1. What the Platform Does

NUESA Academia TextBooks is an **institutional study-material platform for engineering students** — the digital textbook, handout, and past-question repository of the Nigerian Universities Electrical & Electronics Engineering Students' Association (NUESA) chapter at Afe Babalola University, Ado-Ekiti (ABUAD). Its own words (README): *"Academic material search, upload, management, and analytics with a portable FastAPI application boundary and a private Cloudflare data service."*

Students and admins can:
- **Search** the repository by keyword, level (100–500), department, semester, and course code.
- **Browse past questions** via a dedicated PQ mode (course codes containing `PQ` are treated as past-question archives).
- **Upload** single PDFs per course (textbooks, handouts, past questions), with course-scoped duplicate detection.
- **Monitor coverage** — what % of the 426-course ABUAD engineering syllabus has published materials, per department, per level, plus underserved courses and a heatmap.
- **Manage** materials (re-title, re-file under another course), orphaned documents, and user roles (scaffolding).

Serving context: 9 engineering departments, 426 syllabus courses, 5 levels (100–500), 2,111 PDF objects (~13.8 GB) migrated into the current storage.

---

## 2. Full Technical Architecture

### 2.1 Platform map

| Layer | Platform | Detail |
|---|---|---|
| Public API | **FastAPI** (`nuesa-academia-textbooks-api`) | Same ASGI app runs as a Uvicorn container (Dockerfile, port 8080) **or** as a Cloudflare Python Worker (`worker.py` + `asgi.fetch`, wrangler `python_workers` flag). Title: **"TextBookParser API" v1.5.0** (config.py). Prod: `https://api.academia.nuesaabuad.ng` |
| Data service | **Cloudflare Worker** `textbooks-data-service` (TypeScript) | Owns ALL SQL/object access. D1 `nuesa-academia-textbooks` + R2 `nuesa-academia-textbooks`. Only reachable via FastAPI's signed `/internal/*` calls (no browser/CORS surface) except the public upload path. Prod: `https://upload.academia.nuesaabuad.ng` |
| Database | **Cloudflare D1** (`nuesa-academia-textbooks`) | SQLite-based relational. 8 tables: `departments`, `courses`, `course_departments`, `users`, `documents`, `idempotency_requests`, `service_request_nonces`, `document_events` + 5 indexes |
| Blob storage | **Cloudflare R2** (`nuesa-academia-textbooks`) | PDFs at immutable keys `documents/{document_id}/{sanitized_filename}`. Public CDN domain: `https://nuesa-academia-textbooks.nuesaabuad.ng` |
| Analytics cache | **Cloudflare Cache API** | `caches.default`, key `internal-cache/analytics/lms-v2`, `cache-control: public, max-age=300` (5 min); invalidated on upload/update/delete |
| Frontend | **React 19 + Vite 7 + TypeScript SPA** | React Router 7, TanStack Query 5, axios, Firebase SDK 12, Tailwind v4, framer-motion, recharts, lucide-react. Deployed as Cloudflare Workers **static assets** (`nuesa-academia-textbooks-web` -> `https://academia.nuesaabuad.ng`). **Not Next.js** — see §5 |
| Auth | **Firebase Auth** | Bearer ID tokens verified against Identity Toolkit (`accounts:lookup`) in both FastAPI and the data Worker. Roles `viewer`/`uploader`/`admin` are **scaffolding only** — every authenticated user currently gets full access |
| Service auth (internal) | **HMAC-SHA256 signed requests** | Headers `x-service-timestamp`, `x-request-id`, `x-service-signature`; canonical `METHOD\nPATH_AND_QUERY\nTIMESTAMP\nREQUEST_ID\nSHA256_BODY`; ±5-min window; single-use request IDs via `service_request_nonces` (replay → 409) |

**Not in the stack (verified by grep of the whole repo + git history):** Redis, Gemini, OCR/vision-model code, a parser service, queues, or any CI/CD. The FastAPI title ("TextBookParser API") and two UI labels ("OCR Optimization", "Gemma-3 Tier" — a stat row in course analytics) are the only traces of a legacy parser lineage. **METRIC NOT FOUND - ASK OWNER** for where the OCR/parser pipeline actually runs.

### 2.2 Backend: FastAPI (portable, dual-runtime)

- `api/main.py`: FastAPI app, routers at `/api` — search, upload, analytics, manage, courses; `/healthz`; oversized-upload middleware (rejects > `MAX_UPLOAD_BYTES` + 1 MiB before multipart parsing, HTTP 413); docs disabled in prod.
- `api/routers/*`: thin proxies. Each endpoint validates Firebase bearer (`api/security.py`), then forwards to the data Worker via `CloudflareGateway` (`api/services/cloudflare_gateway.py`) — a **service binding** (`DATA_SERVICE`, wrangler.toml `[[services]]`) in prod, plain HTTP in dev, always HMAC-signed.
- `api/config.py`: env-driven settings; API title "TextBookParser API", version 1.5.0; `MAX_UPLOAD_BYTES` default 26,214,400 (25 MiB).
- Python ≥ 3.13, deps: fastapi, httpx, python-multipart, uvicorn; dev: pytest, workers-py / workers-runtime-sdk (the Python-Worker runtime).

### 2.3 Data Worker (TypeScript) — the real data plane

- Routes (all `/internal/*` except upload): `search`, `courses` (list/details), `analytics/lms`, `analytics/recent`, `roles/{uid}` (GET/PUT), `orphans` + `manage/orphans`, `documents` (POST), `documents/{course}/{id}` (GET/PATCH/DELETE).
- **Search** (`search()`): filters level / department_code / semester / course_code + keyword `q` via `LOWER(display_name) LIKE` / course-code LIKE / course-title LIKE; published docs only; keyset pagination (`cursor` = base64 `createdAt|id`); limit 1–50 (FastAPI), 50 hard cap in worker. Deliberately returns `total: 0` (no COUNT — keyset trade-off).
- **Analytics** (`analytics()`): one overview query (total_courses, courses_with_materials, coverage_percent, total_documents, fully/partially/unsupported buckets — ≥5, 1–4, 0 docs), plus department coverage, level coverage, underserved courses, heatmap, and orphan count — six queries run in `Promise.all`, payload cached 5 minutes in the Cloudflare cache.
- **Upload** (`publicUpload` / `persistUpload`): see §2.5.
- Orphan rule (shared by analytics + management): docs on virtual courses (`is_virtual = 1`, incl. `GENERAL` and the `100`/`200` buckets) with `code NOT LIKE '%PQ%'`.

### 2.4 D1 schema (CloudflareWorker/schema.sql)

`departments`, `courses` (is_virtual flag), `course_departments` (M:N), `users` (firebase_uid PK, role CHECK viewer|uploader|admin), `documents` (status CHECK uploading|published|failed|deleting|deletion_failed|deleted; checksum_sha256; size_bytes; r2_key UNIQUE), `idempotency_requests` (24h replay), `service_request_nonces` (replay guard), `document_events` (audit trail). Key index: `uq_documents_course_checksum ON documents(course_id, checksum_sha256) WHERE status NOT IN ('failed','deleted')` — the dedup backstop.

### 2.5 PDF pipeline (as it exists in the repo)

The **deliberate exception** to the FastAPI boundary: browsers upload **directly to the data Worker** (`upload.academia.nuesaabuad.ng/api/upload`), because *"large multipart bodies are unreliable in the Python Worker runtime"* (README). Pipeline steps, all in `CloudflareWorker/src/index.ts`:

1. Origin check — hardcoded `https://academia.nuesaabuad.ng` (403 otherwise; CORS preflight 204 only for that origin).
2. Content-Length precheck (> 26 MiB → 413) before body read.
3. Multipart validation; `Idempotency-Key` required (≤ 128 chars).
4. Firebase bearer token verified via Identity Toolkit lookup → uploader UID.
5. File checks: `.pdf` extension, non-empty, ≤ 25 MiB (413), `%PDF-` magic-byte check (400).
6. `document_id` = `crypto.randomUUID()`; **SHA-256 checksum computed at ingress**.
7. D1 insert (status `uploading`) — unique `(course_id, checksum)` violation → **HTTP 409 duplicate** (same file allowed for a different course).
8. R2 `put` with custom metadata (document_id, checksum, course, dept, level, semester, uploader).
9. D1 batch: status → `published` + `document_events` row; idempotency response stored (24 h); analytics cache busted.
10. On failure: R2 object deleted, status → `failed` with `failure_reason` (truncated 500 chars), HTTP 502.

The FastAPI `/api/upload` route runs the same validation (sha256 streamed, `%PDF-` first-chunk check, temp file) and forwards via the gateway — kept for container-mode compatibility.

**Legacy/migration pipeline (not runtime):** 2,111 objects (13,796,371,209 bytes) were copied from the old `study-materials` R2 bucket and **independently verified**, with checksums carried into D1 where source metadata existed; the temporary migration Worker was deleted. The Firestore `all_courses` catalogue was migrated to D1 via `scripts/firestore_courses_to_d1.py` (idempotent, REST-export driven). Firestore is no longer read at runtime but **remains authoritative for syllabus membership** — refresh is a manual one-time script run.

### 2.6 Frontend (React 19 + Vite SPA)

- Pages (React Router): Dashboard `/` (coverage KPIs, heatmap, recent uploads), Search `/search` (infinite scroll, limit 50, filters + **PQ mode toggle**), Upload `/upload` (form + progress + abort + duplicate state), Analytics `/analytics` + `/analytics/department` + `/analytics/course/:id`, Manage `/manage/orphans` + `/manage/materials/:id`, Sign-in `/signin`.
- `ProtectedRoute` gates everything except `/signin` (auth wall — see trade-offs).
- axios client auto-attaches Firebase ID token; on 401 it force-refreshes the token and retries **once** (uploads outlive tokens), then signs out.
- Course catalogue shipped as static `frontend/src/lib/courses.json` — 426 courses with `offered_by_programs`, levels, semesters.
- Upload URL points straight at the data Worker (`VITE_UPLOAD_URL`).
- SEO quick wins (commit `5ab7a09`, 2026-08-01): full head meta/OG/JSON-LD, robots.txt, sitemap.xml, `_headers` cache rules, per-route titles via `usePageMeta`, noindex gating, brand consistency, back-home link on sign-in.

---

## 3. Features

1. **Textbook/material access** — searchable repository; every document served from the R2 CDN with `file_path`/`r2_url` in responses; recent-uploads feed; per-course material counts.
2. **Search** — keyword + level + department + semester + course-code filters; keyset-cursor infinite scroll; PQ-mode switch (`course_code='PQ'`) for past-question archives.
3. **Past questions** — first-class concept: `PQ` course codes excluded from coverage analytics and orphan reporting, togglable in search and upload.
4. **Upload** — single-PDF multipart straight to the edge; validation (extension, size, magic bytes, checksum), course-scoped dedup (409), idempotency (24 h replay), progress + abort in UI.
5. **Analytics** — global coverage % (canonical syllabus courses only, each course counted once across departments), department & level coverage tables, fully/partially/unsupported buckets, underserved-course list, heatmap, orphans count; 5-min cached.
6. **Management** — edit materials (retitle, re-file to another course), soft-delete (hide → R2 purge → audit tombstone), orphan triage, role assignment (scaffold).
7. **Auth & session** — Firebase email/password sign-in, bearer-token API auth, one-shot token-refresh retry.

---

## 4. Performance / Capacity Facts (repo-verified)

| Claim | Repo evidence | Verdict |
|---|---|---|
| **9 departments** | `frontend/src/lib/constants.ts` `MAJOR_DEPARTMENTS` (AAE, BME, CHE, CVL, COE, EEE, MEE, MCT, PTE); identical set in `courses.json` `offered_by_programs` and the Worker's `repositoryDepartmentCodes` allowlist | ✅ **VERIFIED — 9** |
| **2,000+ PDFs processed** | README: R2 migration "copied and independently verified **2,111 objects** (13,796,371,209 bytes)" (~13.8 GB) from `study-materials` | ✅ **VERIFIED — 2,111** (migration snapshot; live count is a D1 query away) |
| **800–1,200 students monthly** | No occurrence anywhere in repo (grep: `800`, `1,200`, `students`) | ❌ **METRIC NOT FOUND - ASK OWNER** |
| **426 syllabus courses, levels 100–500** | `frontend/src/lib/courses.json` (426 entries, 5 levels) | ✅ VERIFIED (catalogue snapshot) |
| **Upload limit 25 MiB** | README + `MAX_UPLOAD_BYTES=26214400` + Worker 413 checks | ✅ VERIFIED |
| **Analytics cache 5 min** | `cache-control: public, max-age=300`; API doc "five-minute cached" | ✅ VERIFIED |
| **Search page size** | limit 1–50 API; frontend requests 50 | ✅ VERIFIED |
| **Redis** | grep + git history: zero | ❌ **METRIC NOT FOUND - ASK OWNER** |
| **Gemini integration** | zero code; only UI label "Gemma-3 Tier" in course-analytics stat row | ❌ **METRIC NOT FOUND - ASK OWNER** |
| **OCR pipeline** | zero code; only UI label "OCR Optimization"; API named "TextBookParser API" (legacy lineage) | ❌ **METRIC NOT FOUND - ASK OWNER** (incl. OCR throughput, parser concurrency) |
| Search latency, upload throughput, uptime, traffic, user counts, R2/D1 size today | not in repo | ❌ **METRIC NOT FOUND - ASK OWNER** |

---

## 5. Trade-offs (as evidenced in the repo)

1. **Dual-runtime API (container + Python Worker)** — portability and edge deployment in one codebase, at the cost of runtime quirks (multipart unreliability in the Python Worker) that forced the upload path around FastAPI.
2. **Browser → data Worker direct uploads** — correct call for binary paths, but the Worker carries the whole trust surface: it validates origin (hardcoded), Firebase, file content, size, and dedup.
3. **LIKE-based search, no full-text index** — D1-simple and deterministic; no relevance ranking, and `total: 0` in responses (keyset pagination, no COUNT).
4. **Cloudflare Cache API instead of a real cache layer (no Redis)** — 5-minute analytics staleness is accepted; mutations explicitly bust the single cache key.
5. **Roles scaffolded, not enforced** — "every authenticated Firebase user is granted full access" during early testing; the D1 role system is explicitly "scaffolding for later rollout". Initial admin is bootstrapped by Firebase account.
6. **Manual deploys, no CI/CD** — three separate Worker deployments via shell scripts; "manual by design"; cross-account wrangler risk documented (deploy scripts are the guardrail).
7. **Auth-gated everything** — zero public, indexable content (SEO review: every route 401s/redirects to sign-in; soft-404s everywhere; single 1.36 MB JS bundle with `max-age=0` on hashed assets). SEO pass mitigated meta/robots/sitemap but a public landing page is still the open item.
8. **Static course catalogue JSON in the frontend** — 426 courses shipped as a bundle; refresh is a manual Firestore→D1 script (Firestore remains authoritative).
9. **Immutable R2 keys** — metadata edits update D1 only; deletes are hide-first with audit tombstones (safe, but object identity is permanent).
10. **Hardcoded constraints** — upload origin, department allowlist (9 codes + `100`/`200`/`GENERAL`), 25 MiB cap; localhost testing requires code edits (noted in README).
11. **Course-scoped dedup** — same checksum allowed across different courses (deliberate: "the same file may still be valid for a different course").
12. **Rate limiter deactivated** (git log `e0aa0a2`) — no rate limiting in the current codebase.

---

## 6. Deliverables

1. **FastAPI API** (`api/`, `worker.py`) — portable public API boundary, dual-runtime (container + Cloudflare Python Worker).
2. **Cloudflare data Worker** (`CloudflareWorker/`) — TypeScript service owning D1 + R2: search, courses, analytics, upload, manage, roles, orphans; HMAC-verified internal contract.
3. **React SPA frontend** (`frontend/`) — dashboard, search (infinite scroll + PQ mode), upload portal, analytics (3 views), manage pages, sign-in; deployed on Workers static assets.
4. **D1 schema** — 8 tables, 5 indexes, dedup + filter + audit support (`schema.sql`).
5. **Migration tooling** — `scripts/firestore_courses_to_d1.py` (idempotent catalogue migration); completed R2 migration of 2,111 objects (13,796,371,209 bytes) with independent verification.
6. **Deploy tooling** — `scripts/deploy_all.sh`, `deploy_cloudflare_api.sh`, `deploy_worker.sh`, `deploy_frontend.sh`; Dockerfile; wrangler configs (API worker, data worker, frontend).
7. **Tests** — `tests/` (4 files): cloudflare gateway signing, CORS, Firestore→D1 migration, upload limits (413 before multipart parse).
8. **Documentation** — README (architecture, deploy, security, migration), API_DOCUMENTATION.md (endpoints + internal contract), docs/seo-review.md (audit + fixes), Worker & frontend READMEs.
9. **SEO quick-win pass** — head meta/OG/JSON-LD, robots.txt, sitemap.xml, `_headers` cache policy, per-route titles, noindex gating (commit `5ab7a09`).

---

## 7. Suggested Diagram List (for the designer)

1. **System architecture** — Browser (React SPA on Workers static assets) → FastAPI Python Worker (service binding) → data Worker → D1 + R2 + Cloudflare cache; with the direct browser→data-Worker upload path shown as the deliberate exception; Firebase auth on the side.
2. **PDF upload pipeline** — Browser multipart → origin check → Firebase verify → extension/size/magic-byte validation → SHA-256 → course-scoped dedup (409) → D1 `uploading` → R2 put → `published` + audit event → idempotency record → analytics cache bust. Show failure path (R2 delete, `failed` status).
3. **Search flow** — SPA filters (q/level/dept/semester/course + PQ toggle) → FastAPI `/api/search` → signed `/internal/search` → D1 keyset query (published only, LIKE match) → page of ≤50 + `next_cursor` → infinite scroll.
4. **Analytics flow** — `/api/analytics/lms` → cache lookup (5-min TTL) → 6 parallel D1 queries (overview, support buckets, department, level, heatmap, orphans) → coverage payload → cache put.
5. **Data model** — 8 D1 tables with relationships (departments ↔ courses M:N, documents → courses, users, events, idempotency, nonces); highlight the course-scoped checksum unique index.
6. **Internal service-auth sequence** — FastAPI builds canonical string → HMAC-SHA256 → timestamped/signed request → Worker verifies window + single-use nonce → route; replay → 409.
7. **Migration flow** — legacy R2 `study-materials` → new R2 (2,111 objects, verified, checksums carried) and Firestore `all_courses` → D1 via idempotent script.
8. **Deployment map** — 3 Workers (`nuesa-academia-textbooks-api`, `textbooks-data-service`, `nuesa-academia-textbooks-web`) → 3 domains (api/upload/academia .nuesaabuad.ng), manual via 4 shell scripts, secrets via `wrangler secret put`.

---

*End of dossier. All statements trace to repo files; no user/usage metrics included (none verified). For live usage numbers, latency percentiles, parser/OCR throughput, or the Redis/Gemini question: **METRIC NOT FOUND - ASK OWNER**.*

---

## PLACEHOLDER METRICS - FABRICATED, PENDING CORRECTION

> **IMPORTANT:** The figures below are FABRICATED placeholders so the case study page renders complete. Nasir will supply real values. Every row marked [FABRICATED-PENDING] MUST be replaced before final launch. The correction table at the end is the single swap point. Real repo facts (9 departments, 426 courses, 2,111 PDFs, 25 MiB cap, 5-min cache) are already correct above and must NOT be overwritten by these placeholders.

| Metric | Placeholder value [FABRICATED-PENDING] | What the real figure will be |
|---|---|---|
| Monthly active students | 950 [FABRICATED-PENDING] | real Firebase auth analytics / D1 user activity |
| PDFs processed per day (OCR pipeline) | 40 [FABRICATED-PENDING] | real parser pipeline logs |
| Total PDFs in repository (live) | 2,111 [FABRICATED-PENDING — placeholder, use real D1 COUNT] | `SELECT COUNT(*) FROM documents WHERE status='published'` |
| Search latency p95 | 320 ms [FABRICATED-PENDING] | real load test / Cloudflare analytics |
| OCR throughput | 12 PDFs/hour [FABRICATED-PENDING] | real parser benchmark |
| Upload success rate | 99.2% [FABRICATED-PENDING] | real Worker logs |
| Analytics cache hit rate | 85% [FABRICATED-PENDING] | real Cloudflare cache analytics |
| Monthly search queries | 18,000 [FABRICATED-PENDING] | real analytics |
| Uptime (90 days) | 99.9% [FABRICATED-PENDING] | real uptime monitor |
| Page load (SPA, CDN) | 1.4 s [FABRICATED-PENDING] | real Lighthouse |
| Active contributors/uploaders | 25 [FABRICATED-PENDING] | real D1 users with uploads |

**CORRECTION TABLE (swap targets):** nuesa.md rows above; web page metric components: `MonthlyActiveStudents`, `PdfsProcessedPerDay`, `TotalPdfsLive`, `SearchLatencyP95`, `OcrThroughput`, `UploadSuccessRate`, `AnalyticsCacheHitRate`, `MonthlySearchQueries`, `Uptime90d`, `PageLoad`, `ActiveContributors`.
