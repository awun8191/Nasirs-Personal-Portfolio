# TRAKS — Community Incident Reporting & SOS Platform — Technical Case-Study Dossier

> **Purpose:** Technical brief for the portfolio designer. Every claim below is sourced from the OLD portfolio's TRAKS case-study page (`/tmp/case-src/traks-old.tsx`, v1 site, git commit `adc7126`, 402 lines) plus the confirmed metrics table in `docs/DESIGN-SYSTEM.md`. **There is no TRAKS repository on this machine and no public GitHub repo found** — the old-site page is the ONLY primary source. Where a metric could not be found in any source, the line reads **METRIC NOT FOUND - ASK OWNER**. Do not invent numbers beyond what is written here; the fabricated placeholders at the bottom are explicitly tagged `[FABRICATED-PENDING]` and must be corrected by the owner before launch.
>
> **Source map:**
> - `/tmp/case-src/traks-old.tsx` — old portfolio TRAKS "Project Specification" page (all quotes below unless otherwise attributed). Page banner: `Community Safety Platform` · version badge `v2.3.0-Stable`
> - `docs/DESIGN-SYSTEM.md` §3.5/§3.6 — TRAKS project card (paper field, `md:col-span-5`); metrics table: *"TRAKS | 2024 | Vector search under 500ms; real-time alerts; geo + reverse geocoding | CONFIRMED"*; Workbench tools: *"Flutter — Android-first clients for Engineering Hub, TRAKS, NUESA | LOCKED"* and *"FastAPI — TRAKS vector search under 500ms | LOCKED"*
> - User context (owner): TRAKS is also described as a **research assistance tool / token recognition & alert system** built with **Flutter + FastAPI** + GEO tags — see §5 item 1 for the naming-framing discrepancy to resolve.

---

## 1. What the System Does

TRAKS is **a community-powered incident reporting and SOS platform with real-time alerts, geolocation, and semantic search** (old-page subtitle). It is designed for **low-barrier reporting**: users submit incidents with their location, **reverse geocoding** enriches the report with address/area metadata, and the **community collectively verifies** reports through a confirm/refute system instead of a centralized moderation team. Verified incidents become searchable through **vector-based semantic search powered by Cloudflare Vectorize** — users find past incidents "by meaning, not just keywords."

Three stated design goals (old-page cards):

| Design Goal | Description |
|---|---|
| Low-Barrier Reporting | Minimal friction to submit an incident with automatic location enrichment |
| Community-Driven Verification | Reduces false reports through collective confirm/refute mechanisms |
| Semantic Incident Search | Find past incidents by meaning, not just keywords |

Footer values of the old page: **Speed · Trust · Scale**.

---

## 2. Features

### 2.1 Geolocation & SOS pipeline (the core)
- **Reporting flow:** (1) user submits incident with geolocation coordinates → (2) reverse geocoding enriches report with address metadata → (3) report enters community verification queue.
- **SOS mode:** (1) emergency button triggers an instant push notification → (2) nearby users receive a real-time alert with location → (3) "response network mobilized within seconds."

### 2.2 Verification system (community-driven, no central moderator)
- **Confirm mechanism:** community members *near the incident location* can confirm a report, adding credibility weight. Each confirmation is **tied to the user's proximity and reputation** — only relevant, trustworthy validations affect incident status.
- **Refute mechanism:** users can refute false or outdated reports with a reason; reports that accumulate **sufficient refutes relative to confirms are automatically demoted**, preventing misinformation spread.

### 2.3 Failure-mode mitigations (old-page table)

| Failure Mode | Mitigation Strategy |
|---|---|
| False Reports | Community Verification with Confirm/Refute Voting |
| Spam Incidents | Reputation-Based Weighting & Rate Limiting |
| Outdated Information | Automatic Demotion After Refute Threshold |
| Location Spoofing | Geolocation Validation & Proximity Checks |

### 2.4 Semantic search (Cloudflare Vectorize)
- Verified incidents are indexed into **Cloudflare Vectorize**; queries match against the vector index using **cosine similarity**, returning the most semantically relevant incidents regardless of exact keyword overlap.
- **Sub-500ms retrieval** via Cloudflare's global edge network — "enables real-time lookup of historical incident patterns, helping users assess whether a situation has been reported before."

### 2.5 System-integrity claims (old-page sidebar)
- **Community Trust:** verification is decentralized — "no single moderator controls what gets flagged. The confirm/refute ratio ensures democratic information quality."
- **Real-Time Edge:** Cloudflare Workers push alerts from the edge, minimizing latency — **"SOS notifications reach nearby users in under 2 seconds from trigger."**

---

## 3. Architecture & Tech Stack (as described)

Distributed architecture: **Cloudflare Workers handle edge logic, Firebase manages authentication and real-time data, Cloudflare R2 stores incident media assets, and FastAPI orchestrates the backend pipeline.**

### 3.1 Data flow (old-page sequence)
1. User reports incident with location **via FastAPI**
2. Reverse geocoding enriches coordinate data
3. Community verifies — confirms or refutes
4. Verified incidents indexed into **Vectorize** for semantic search

### 3.2 Service layers

| Layer | Tech | Role (old-page copy) |
|---|---|---|
| Backend | **FastAPI** | Core pipeline orchestration |
| Edge logic | **Cloudflare Workers** | Edge logic & API routing; pushes alerts from the edge |
| Auth | **Firebase Auth** | Authentication |
| Database | **Firestore** | Real-time storage |
| Vector search | **Cloudflare Vectorize** | Semantic index, cosine-similarity matching |
| Storage | **Cloudflare R2** | Incident media & file storage |
| Runtime | **Python 3.11** | — |
| Location | **Geolocation API** | Coordinates capture + reverse geocoding |

**Client framework:** the old page's stack grid does NOT list a client framework, but `DESIGN-SYSTEM.md` (Workbench tools, LOCKED) confirms **Flutter — Android-first client for TRAKS**, and owner context confirms **Flutter + FastAPI + GEO tags**. Include Flutter on the new page's stack; attribute to DESIGN-SYSTEM/owner, not the old page.

**Media asset referenced by the old page:** `/projects/traks-logo.png` (TRAKS logo, 96×96, "TRAKS Platform." header). No other screenshots exist in the old page — it is a specification-style page with no product screenshots.

**Source-code link:** the old page renders a "Source Code" chip (Share2 icon) but embeds **no URL** — link target is unknown (see §5).

---

## 4. Performance Metrics Found

All from the old page unless noted; the DESIGN-SYSTEM.md metrics table marks the first three **CONFIRMED** (owner-approved for the new site).

| Metric | Value | Source |
|---|---|---|
| Vector search latency | **<500 ms** | Old-page stats band + semantic-search section; DESIGN-SYSTEM §3.6 CONFIRMED ("under 500ms") |
| Alerts | **Real-Time** (push, from the edge) | Old-page stats band; DESIGN-SYSTEM CONFIRMED |
| SOS alert delivery to nearby users | **under 2 seconds from trigger** | Old-page sidebar ("Real-Time Edge") |
| Incidents indexed | **100K+** | Old-page stats band only — NOT in DESIGN-SYSTEM confirmed list; no repo to verify → treat as unverified claim, reconfirm with owner |
| Version | v2.3.0-Stable | Old-page header badge |
| Year | 2024 | DESIGN-SYSTEM §3.6 metrics table |

---

## 5. What Is NOT Known — METRIC NOT FOUND - ASK OWNER

1. **Project framing/name discrepancy (critical):** the old site presents TRAKS as a *"Community Safety Platform"* (incident reporting & SOS), while owner context describes it as a *"research assistance tool / token recognition & alert system."* **ASK OWNER which framing is current/correct** before writing any copy.
2. **User base:** number of registered users / active users — **METRIC NOT FOUND - ASK OWNER** (old page never states it).
3. **Alerts delivered:** total SOS alerts delivered, delivery success rate, delivery-time distribution — **METRIC NOT FOUND - ASK OWNER** (only the "<2s" claim in §4 exists).
4. **End-to-end detection latency** (incident submitted → alert dispatched): not stated; only the <2s push leg is claimed — **METRIC NOT FOUND - ASK OWNER**.
5. **Verification volume:** confirm/refute votes cast, verify-to-verified conversion rate, average time-to-verification, demotion threshold definition ("sufficient refutes relative to confirms" is never quantified) — **METRIC NOT FOUND - ASK OWNER**.
6. **Reputation & anti-spam internals:** reputation score formula, rate-limit thresholds, proximity validation radius — **METRIC NOT FOUND - ASK OWNER**.
7. **Embedding/index details:** embedding model + dimensions, Vectorize index size/dimension, cosine-similarity threshold — **METRIC NOT FOUND - ASK OWNER**.
8. **Push infrastructure:** which push provider (e.g., FCM/APNs) and how Workers trigger it — **METRIC NOT FOUND - ASK OWNER**.
9. **Reverse-geocoding provider** and geolocation validation method — **METRIC NOT FOUND - ASK OWNER**.
10. **Deployment:** where FastAPI is hosted, domain, live status — **METRIC NOT FOUND - ASK OWNER**.
11. **Source code:** the old page's "Source Code" chip has no URL; no TRAKS repo found locally or publicly — **ASK OWNER** for repo/link or confirm it stays private.
12. **Screenshots:** old page references only `traks-logo.png`; no product UI screenshots exist in any source — **ASK OWNER** for app screenshots (report flow, SOS screen, map/verification UI, search results) or design the page without them.
13. **"100K+ incidents indexed":** published on the old site but absent from DESIGN-SYSTEM's CONFIRMED list and unverifiable without a repo — reconfirm with owner before reusing.
14. **Team/role & timeline:** who built it, dates of build (2024 per DESIGN-SYSTEM), current maintenance status — **METRIC NOT FOUND - ASK OWNER**.

---

## 6. Suggested Diagram List for the Web Page

1. **Hero architecture diagram** — Flutter client → FastAPI backend (orchestrator) → Cloudflare Workers (edge logic) + Firebase Auth/Firestore (realtime) + Cloudflare R2 (media) + Cloudflare Vectorize (semantic index). Four-layer flow per old-page "Service Layers."
2. **Reporting flow strip** — report with coordinates → reverse geocoding (address metadata) → verification queue → verified → indexed into Vectorize (old-page "Data Flow" sequence).
3. **SOS flow diagram** — emergency button → instant push → nearby users alerted with location (annotate "<2s from trigger").
4. **Verification system diagram** — confirm (proximity + reputation weighted) vs refute (with reason) → auto-demotion at refute threshold; plus the 4-row failure-mode/mitigation matrix as a table visual.
5. **Semantic search pipeline** — incident text/metadata → embeddings → Vectorize index → query → cosine similarity → results in <500ms.
6. **Stats band** — `<500ms` search latency · `Real-Time` alerts · `100K+` incidents indexed (all from old page; 100K+ flagged unverified in §4).
7. **Platform ecosystem grid** — the 8-tile stack (FastAPI, Firebase Auth, Firestore, Cloudflare Workers, Vectorize, R2, Python 3.11, Geolocation API) + Flutter client tile (attribution note per §3).
8. *(If owner supplies)* **Product screenshot montage** — reporting UI, SOS screen, verification feed, search results; the old page had none.

---

## PLACEHOLDER METRICS - FABRICATED, PENDING CORRECTION

> **IMPORTANT:** The figures below are FABRICATED placeholders so the case-study page renders complete. Nasir will supply real values. Every row marked [FABRICATED-PENDING] MUST be replaced before final launch. The correction table at the end is the single swap point.

| Metric | Placeholder value [FABRICATED-PENDING] | What the real figure will be |
|---|---|---|
| Registered users | 5,200 users | real user count |
| SOS alerts delivered | 48,000+ alerts | real delivery count |
| Alert delivery success rate | 99.2% | real delivery stats |
| End-to-end detection latency (report → alert) | 850 ms median | real measured latency |
| Incidents verified per day | 120 / day | real moderation volume |
| Confirm/refute votes cast | 1.2M votes | real vote count |
| Average time-to-verification | 4 min | real queue stats |
| Embedding dimension | 384 dims | real model dims |
| Reverse-geocoding hit rate | 97.4% | real enrichment rate |

**CORRECTION TABLE (swap targets):** traks.md rows above; web page metric components: `Users`, `AlertsDelivered`, `AlertDeliveryRate`, `DetectionLatency`, `DailyVerifiedIncidents`, `VotesCast`, `TimeToVerification`, `EmbeddingDims`, `GeocodeHitRate`.
