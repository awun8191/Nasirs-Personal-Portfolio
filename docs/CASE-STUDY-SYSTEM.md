# Case Study System: Six Unique Design Languages

Buildable spec for the six case study pages on `redesign-v2`. Extends `docs/DESIGN-SYSTEM.md` (Swiss International, pure). This document is the single source of truth for the case study pages and supersedes the deferred sections in DESIGN-SYSTEM.md (3.7, 6.2) and DESIGN-DIRECTION.md (section 7) for these routes.

- Stack: React 19 + Vite + Tailwind + Framer Motion (same as homepage)
- Audience: recruiters, hiring managers, collaborators, clients
- Principle: one shared Swiss shell so every page is unmistakably the same site; six distinct interior design languages so every project reads as its own system
- Constraints honored: white/ink canvas, one accent hue per page, no dark mode creep, no em dashes, no shadows, hairline borders only, General Sans + JetBrains Mono only, AA contrast on every pair

## 0. How to read this document

- Section 1 defines the shared shell (nav, back link, header pattern, footer, chrome color).
- Section 2 defines the Case Study Accent System: the approved palette of one accent per page, with AA-verified tokens.
- Section 3 defines the content spine and per-project adaptations.
- Section 4 defines the diagram slot contract.
- Section 5 defines the metric table contract including FABRICATED-PENDING marking.
- Section 6 defines the six unique design languages in full.
- Section 7 defines mobile collapse per page.
- Section 8 defines routing.
- Section 9 defines the data architecture so metric and link swaps are trivial.
- Section 10 is the build checklist and verification.

Every hex value below is computed against WCAG AA (4.5:1 normal text, 3:1 large text and UI components). No token is suggested without its verified ratio.

## 1. Shared Shell (the same site)

The shell is identical on all six pages. Only the interior content area switches language.

### 1.1 Nav

Reuse the homepage Nav component unchanged (DESIGN-SYSTEM 3.1): fixed 64px bar, hairline bottom, `rgba(255,255,255,0.9)` + backdrop-blur, wordmark left, links right. On case study pages the links anchor back to the homepage sections: `ABOUT` -> `/#about`, `WORKBENCH` -> `/#workbench`, `PROJECTS` -> `/#projects`, `CONTACT` -> `/#contact`. The wordmark links to `/`. Mobile: same wordmark + arrow overlay as the homepage.

Nav color: system blue `#2563EB` on hover (site chrome stays blue on every page; the page accent never colors the nav).

### 1.2 Back link

A mono back link sits at the top of the content column, above the page header, on every page:

- Label: `BACK TO PROJECTS`
- Link: `/#projects`
- Style: JetBrains Mono 400, `0.75rem`, uppercase, letter-spacing `0.18em`, muted `#6B7280`, page accent on hover, 2px growing underline (shared `link-underline` utility)
- Left-aligned, 44px hit area, margin-bottom `--space-12` (48px)

### 1.3 Header pattern

Every page opens with the same four elements in the same vertical order (placement can vary, see section 6, but the elements are always present):

1. Kicker: JetBrains Mono, uppercase, letter-spaced, in the page accent (e.g. `EMBEDDED AI / HARDWARE + ML`)
2. Title: General Sans 700, `clamp(2.5rem, 6vw, 4.5rem)`, ink, tight leading
3. Meta line: JetBrains Mono, muted, `YEAR / ROLE / STATUS` (e.g. `2024 / FINAL YEAR PROJECT / PROTOTYPE BUILT`)
4. One-line description: General Sans 400, ink-soft, max 62-68ch

The header can sit on a white field or an ink field per page (hero band treatment is a page decision). The ink band uses the Workbench pattern: white text, white/70 meta, accent at large sizes only.

### 1.4 Footer

Reuse the Closing component (DESIGN-SYSTEM 3.9) on every case page: hairline divider, sign-off "Every system begins with a single line.", contact row (EMAIL / GITHUB / LINKEDIN / CV), mono status line. Between the last section and the footer, add a Next Project row:

- Left: mono label `NEXT PROJECT`
- Right: General Sans 700 project title + arrow, links to the next case study in route order (section 8), hover to accent
- This is the only footer variation; the contact block itself is untouched

## 2. The Case Study Accent System

The homepage locks one accent family (blue). The case study pages keep the white/ink canvas and the exact same typography, geometry, and border discipline, but each page swaps in ONE approved accent hue for the role blue plays on the homepage: index numbers, kickers, links, metric accents, diagram strokes, chips. This is a coherent extension of the Swiss system: same rules, different single hue.

### 2.1 Rules (locked)

- One accent hue per page. Never mix two page accents on one page.
- Site chrome (nav, footer, back link) stays system blue `#2563EB`. The page accent is used only inside the page content.
- No gradients, no tinted section fields beyond the documented hero bands, no second color family.
- Ink fields (Soiling, RAG heroes) use white/70-90 for small text; the accent appears at large display sizes only where the ratio is >= 3:1 (documented per pair).
- Every accent has three tokens mirroring the system: base (normal text on white), deep (small text, AA-safe), bright (large text and fills only).

### 2.2 Approved palette

| Page | Accent family | Base (normal text) | Deep (small text) | Bright (large/fills) | Rationale |
|---|---|---|---|---|---|
| Soiling Detection | Solar Amber | `#B45309` | `#92400E` | `#D97706` | Sunlight, Harmattan dust, energy yield |
| TRAKS | Safety Red | `#B91C1C` | `#991B1B` | `#DC2626` | SOS, alerts, danger signals |
| Engineering Hub | Study Violet | `#6D28D9` | `#5B21B6` | `#7C3AED` | Focus and learning; the app ships a violet theme in its own 7-theme system |
| RAG Data Pipeline | Electric Cyan | `#0E7490` | `#155E75` | `#0891B2` | Data flow, cool technical infrastructure |
| NUESA Academia | Institutional Green | `#047857` | `#065F46` | `#059669` | Coverage, syllabus completeness, the heatmap |
| AWUN | Terracotta | `#A0522D` | `#8B4513` | `#C97A4D` | The product's own brand accent (documented in the AWUN dossier: terracotta tokens `#A0522D` / `#8B4513` / `#C97A4D`) |

No other hues are permitted. The AWUN choice is the strongest case: it reuses the shipped product brand, so the case study is visually continuous with the product itself.

### 2.3 Contrast (verified, all pairs AA)

On white `#FFFFFF`:

| Token | Ratio | Verdict |
|---|---|---|
| amber-700 `#B45309` | 5.02:1 | Pass AA normal |
| amber-800 `#92400E` | 7.09:1 | Pass AA normal |
| red-700 `#B91C1C` | 6.47:1 | Pass AA normal |
| red-800 `#991B1B` | 8.31:1 | Pass AA normal |
| violet-700 `#6D28D9` | 7.10:1 | Pass AA normal |
| violet-800 `#5B21B6` | 8.98:1 | Pass AA normal |
| cyan-700 `#0E7490` | 5.36:1 | Pass AA normal |
| cyan-800 `#155E75` | 7.27:1 | Pass AA normal |
| emerald-700 `#047857` | 5.48:1 | Pass AA normal |
| emerald-800 `#065F46` | 7.68:1 | Pass AA normal |
| terracotta `#A0522D` | 5.62:1 | Pass AA normal |
| terracotta-deep `#8B4513` | 7.10:1 | Pass AA normal |

Bright variants on white (large text and fills only, 3:1 minimum):

| Token | Ratio | Rule |
|---|---|---|
| amber-600 `#D97706` | 3.19:1 | Large (>= 24px bold) or fills only |
| red-600 `#DC2626` | 4.83:1 | Passes normal text too |
| violet-600 `#7C3AED` | 5.70:1 | Passes normal text too |
| cyan-600 `#0891B2` | 3.68:1 | Large or fills only |
| emerald-600 `#059669` | 3.77:1 | Large or fills only |
| terracotta-bright `#C97A4D` | 3.29:1 | Large or fills only |

Ink fields (Soiling hero, RAG hero): small text is white/70 or white/90 (16:1 and 12:1, both pass); the page accent appears only at large display sizes: amber-700 on ink 3.76:1, cyan-700 on ink 3.52:1 (both pass the 3:1 large-text rule). Never use an accent at small size on an ink field.

## 3. Content Spine

Default spine (per project, ordered):

1. Overview: what the product is and why it exists
2. The Problem: the concrete problem it solves
3. The Product / Flow: what the user does, system behavior
4. Architecture: real architecture, diagram slot
5. Engineering Detail: technical decisions, formulas, diagram slots
6. Performance / Metrics: tabulated metrics, PENDING marking
7. Lessons / Trade-offs: what was learned, what would change
8. Links or Paper: live site + GitHub, or the paper (Soiling)

Per-project adaptations (the spine bends to the project, never the other way):

| Project | Spine adaptation |
|---|---|
| Soiling | Overview -> The Problem -> The Pipeline (two-layer) -> Hardware (sensor + compute tables) -> ML (CUSUM + XGBoost, formula blocks) -> Results (accuracy/precision/recall/F1 tabulated) -> Limitations -> The Paper |
| AWUN | Chaptered documentary CH. 01-05: The System -> The Marketplace -> The Intelligence Layer -> The Infrastructure -> The Difficult Parts (each chapter carries its own diagrams and tables) |
| Engineering Hub | Overview -> The Problem -> The Product (question banks, flashcards, AI tutor) -> The Adaptive Engine (BKT math) -> The Architecture -> Performance (caching + scale) -> Lessons -> Links |
| RAG | Overview -> The Problem (deterministic RAG) -> Phase A Ingestion -> Phase B Retrieval -> The OCR Tier -> Determinism -> Performance -> Failure Modes -> Links |
| NUESA | Overview -> The Problem -> The Platform -> The Architecture (dual runtime) -> The Upload Pipeline -> Coverage and Analytics -> Performance -> Trade-offs -> Links |
| TRAKS | Overview -> The Problem -> The Reporting Flow -> The SOS Channel -> The Verification System -> The Semantic Search -> The Stack -> Performance -> Links |

## 4. Diagram Slot Spec

Placeholder diagram containers with a single consistent language so Nasir can drop real SVGs in later without touching layout.

### 4.1 Container

- Border: `1px dashed` in the page accent at `color-mix(in srgb, <accent> 45%, transparent)`
- Background: `color-mix(in srgb, <accent> 3%, white)`
- Radius: 4px (system `--radius-lg`)
- No shadow, flat
- Content column width, aspect ratio per slot (section 6 defines each page's ratios): 16:9 architecture, 21:9 flow strips, 1:1 state machines and decision trees
- `aspect-ratio` CSS property; on mobile the container stays full-width and the ratio collapses to auto (min-height 240px)

### 4.2 Label

Centered inside the container, two lines:

- Line 1 (primary): JetBrains Mono 500, uppercase, letter-spacing `0.14em`, `0.8125rem`, page accent deep: `DIAGRAM 01 / SYSTEM ARCHITECTURE (SLOT)`
- Line 2 (secondary): JetBrains Mono 400, `0.6875rem`, uppercase, muted: `REPLACE WITH REAL SVG LATER`

Numbering is per-page sequential: `DIAGRAM 01`, `DIAGRAM 02`, ... in reading order, across all sections.

### 4.3 When the real SVG arrives

- Swap dashed border to the system hairline `rgba(17,17,17,0.18)` (deepens to 0.5 on hover for interactive diagrams)
- Keep the same aspect ratio; keep the same container width
- Diagram strokes use the page accent (line art in accent deep on white) so the diagram inherits the page language
- Remove the label lines; add a mono caption below the container (muted, uppercase, `0.6875rem`)
- File convention: `src/assets/diagrams/<slug>-<nn>.svg`

## 5. Metric Table Spec

The tabulated performance tables render identically across pages; only the accent and the row data change.

### 5.1 Row anatomy

Each row is a grid: `[metric label | value | status chip]`, separated by 1px hairline top rules (`rgba(17,17,17,0.14)`):

- Metric label: JetBrains Mono 400, uppercase, `0.6875rem`, letter-spacing `0.12em`, muted, left
- Value: General Sans 600, `1.125rem`, ink, right-aligned, `font-variant-numeric: tabular-nums lining-nums`
- Status chip: optional, right after the value

### 5.2 FABRICATED-PENDING marking

Every metric whose value comes from a dossier PLACEHOLDER METRICS table renders:

- Value suffixed with an asterisk: `380 ms*`
- A `PENDING` chip: 1px dashed border in `rgba(107,114,128,0.5)`, mono `0.625rem` uppercase, muted text, 2px radius, 4px horizontal padding
- A footnote line under the table, JetBrains Mono 400, `0.6875rem`, muted: `* PENDING: placeholder value awaiting owner correction`

Verified repo facts (the CONFIRMED metrics in DESIGN-SYSTEM 7 and the VERIFIED rows in each dossier) render with no chip and no asterisk. Do not chip real numbers.

### 5.3 Data source (swap contract)

All metric values, chips, and links live in `src/data/caseStudies.ts` (section 9). Swapping a value is a one-line data edit; the PENDING flag auto-renders the chip. The dossier correction tables name the component keys (e.g. `InferenceLatency`, `ActiveVendors`, `MonthlyOrders`); those keys are the data object keys.

## 6. The Six Unique Design Languages

### 6.1 Soiling Detection: The Instrument Panel

Concept: a laboratory notebook and instrument readout. Hardware + ML thesis; the page reads like the instrument itself: measured values, state machines, power budgets, honest margins. The most mono-heavy page in the system.

- Accent: Solar Amber (`#B45309` / `#92400E` / `#D97706`)
- Typography: mono-forward. Section indexes, table data, state names, power figures, and formula blocks are JetBrains Mono. Headlines and prose stay General Sans. Big metric numbers tabular.
- Hero: INK field (matches the homepage ink card), bottom-anchored like the homepage hero. Kicker `EMBEDDED AI / HARDWARE + ML` in amber at large size (3.76:1 passes large). Title `Soiling Detection System` in white. Meta line white/70: `2024 / FINAL YEAR PROJECT / PROTOTYPE BUILT`. Giant amber numbers for the two headline results: `99.98%` (XGBoost accuracy) and `2.64 mW` (always-on monitoring), white labels beneath.
- Section rhythm: 01 THE PIPELINE (two-layer trigger-confirm-clean flow as a styled mono diagram, not a slot: three stacked boxes with arrows), 02 THE PROBLEM (soiling, Harmattan, energy budget), 03 THE HARDWARE (sensor table + compute tier table, tabular, mono), 04 THE ML (CUSUM formula block, CSI equation, XGBoost params, mono code blocks), 05 THE RESULTS (metric table: accuracy/precision/recall/F1 + CUSUM recall), 06 THE LIMITS (honest limitation rows), 07 THE PAPER (paper slot, no website link)
- Unique motif: dashed signal-trace hairlines under section indexes (a thin dashed line in amber/45 that reads like a CUSUM baseline); `mW` and `mA` annotations in mono beside every power figure; state names rendered as mono chips `SLEEP / SENSE / TRIGGER / INFER / CLEAN / RETURN`.
- Diagram slots: `01 SYSTEM ARCHITECTURE` (hero, 16:9), `02 STATE MACHINE` (1:1), `03 POWER FLOW` (21:9), `04 CSI CONSTRUCTION` (16:9), `05 RESULTS DASHBOARD` (16:9). Hardware gallery at the end: real repo photos (schematic, breadboard, prototype) in hairline-framed images, no slots.
- Links: THE PAPER section only (FYP report link, `[URL PENDING]`). No website link per Nasir's instruction.

### 6.2 TRAKS: The Ops Console

Concept: an operations console for community safety. Status language, alert markers, and the failure-mode matrix as the centerpiece. Feels like a dispatch board, not a marketing page.

- Accent: Safety Red (`#B91C1C` / `#991B1B` / `#DC2626`)
- Typography: status-forward. `STATUS / SYSTEM NOMINAL` lines, mono chips for report states (CONFIRMED / REFUTED / PENDING), bold sans headlines. Red appears on index numbers, status chips, and the SOS motif.
- Hero: WHITE field. A 64px flat red square (4px radius) with `SOS` in white mono, 18px, sits left of the title block as the motif (flat, no shadow, no offset). Kicker `COMMUNITY SAFETY PLATFORM` in red-700. Title `TRAKS`. Meta `2024 / INCIDENT REPORTING + SOS / V2.3.0-STABLE`. Big `<500ms` metric with `VECTOR SEARCH` label.
- Section rhythm: 01 OVERVIEW (three design goals as ruled rows: Low-Barrier Reporting / Community-Driven Verification / Semantic Incident Search), 02 THE PROBLEM, 03 THE REPORTING FLOW (report -> reverse geocode -> verify -> index as a 4-step flow strip), 04 THE SOS CHANNEL (diagram slot, `<2s from trigger` annotation), 05 THE VERIFICATION SYSTEM (confirm/refute explanation + the failure-mode/mitigation matrix as a 4-row table, the page centerpiece), 06 THE SEMANTIC SEARCH (vector pipeline diagram), 07 THE STACK (8-tile platform grid: FastAPI, Workers, Firebase Auth, Firestore, Vectorize, R2, Python 3.11, Geolocation API, plus a Flutter client tile with an attribution note), 08 PERFORMANCE (metric table), 09 LINKS (placeholder-pending).
- Unique motif: red square alert markers (8px flat red squares as bullets on incident rows), status chips with dashed borders for PENDING, the SOS square in the hero, and a `LIVE` red dot (4px circle, no animation, no breathing) beside the status line.
- Diagram slots: `01 HERO ARCHITECTURE` (16:9), `02 REPORTING FLOW` (21:9), `03 SOS FLOW` (16:9), `04 VERIFICATION SYSTEM` (16:9), `05 SEMANTIC SEARCH` (16:9).
- Links: LIVE SITE `[URL PENDING]`, GITHUB `[URL PENDING]` (owner must confirm the repo exists; dossier notes the source-code chip had no URL).

### 6.3 Engineering Hub: The Study Workbook

Concept: the adaptive engine as a workbook. Quiz cards, review ratings, retention curves, and the BKT math up front. Reads like the product's own study surface.

- Accent: Study Violet (`#6D28D9` / `#5B21B6` / `#7C3AED`)
- Typography: workbook rhythm. Section headings bold sans; question blocks, review ratings, and formulas in mono. Retention figures tabular.
- Hero: WHITE field. Kicker `ADAPTIVE STUDY PLATFORM` in violet-700. Title `Engineering Hub`. Meta `2024 / WEB + ANDROID / LIVE`. A preview quiz card sits right of the header (hairline card, mono question, four mono options, correct one in violet): the workbook motif.
- Section rhythm: 01 OVERVIEW (one-liner: Bayesian Knowledge Tracing + spaced repetition), 02 THE PROBLEM (why BKT over the rejected Ebbinghaus/HMM heuristic, trade-off row), 03 THE PRODUCT (question banks / flashcards / AI tutor / streaks as ruled feature rows), 04 THE ADAPTIVE ENGINE (BKT formula panel in mono: P(L0), P(T), P(S), P(G), S x2/x0.5, interval formula; server-authoritative grading note), 05 THE ARCHITECTURE (platform map: React web + Flutter app + Worker API + D1 + Firebase), 06 PERFORMANCE (three-layer caching table + scale facts: 9 departments, 426 courses, ~142K questions, 250 downloads), 07 LESSONS (trade-offs list), 08 LINKS.
- Unique motif: the wrong-answer card. A hairline card showing a question, the student's wrong answer struck through in red-600 `X`, the correct answer in violet, and four mono review chips `AGAIN / HARD / GOOD / EASY`. Retention curve as a diagram slot. Review-state chips `LEARNING / REVIEWING` in mono.
- Diagram slots: `01 SYSTEM ARCHITECTURE` (16:9), `02 ADAPTIVE GRADING FLOW` (16:9), `03 BKT STATE MACHINE` (1:1), `04 FLASHCARD LIFECYCLE` (21:9), `05 CONTENT PIPELINE` (16:9), `06 CACHING LAYERS` (16:9).
- Links: LIVE SITE `https://engineeringhub.nasurf25.workers.dev`, API `https://engineeringhub-api.nasurf25.workers.dev` (both verified in dossier), GITHUB `[URL PENDING]`.

### 6.4 RAG Data Pipeline: The Pipeline Manifest

Concept: an AI infrastructure manifest. Deterministic, scale, efficiency. The page is a flow: bands of pipeline segments with chevrons, a version stamp, and the big 1M+ number from the homepage ink card.

- Accent: Electric Cyan (`#0E7490` / `#155E75` / `#0891B2`)
- Typography: flow language. Phase labels and pipeline segments in mono; giant tabular numbers; a `V1.4.2-STABLE` version badge in the header (mono chip, cyan border, 2px radius).
- Hero: INK field (matches the homepage ink card). Kicker `AI INFRASTRUCTURE MANIFEST` in cyan at large size (3.52:1 passes large). Title `RAG Data Pipeline` in white. Meta `2025 / INGESTION + RETRIEVAL / V1.4.2-STABLE`. Giant white `1M+` with `SEMANTIC CHUNKS` label; secondary `2,000+` with `PDFS INGESTED`.
- Section rhythm: 01 OVERVIEW (one-liner: high-throughput, semantically aware ingestion engine for deterministic RAG), 02 THE PROBLEM (hallucination, non-deterministic chatbots, cost), 03 PHASE A / INGESTION (flow band diagram: PDF -> OpenCV orientation -> bi-stage OCR -> normalize -> chunk -> BGE-M3 embed -> vector DB + Firestore), 04 PHASE B / RETRIEVAL (flow band: query -> metadata-filtered scoped search -> dedup context assembly -> token trim -> JSON-schema generation), 05 THE OCR TIER (bi-stage decision diagram, EasyOCR fast path vs Gemma 3:27b fallback), 06 THE DETERMINISM (temperature 0.0, chunk hashing, identical chunk IDs, up to 70% cost reduction), 07 PERFORMANCE (metric table), 08 FAILURE MODES (4-row matrix table), 09 LINKS.
- Unique motif: chevron flow bands. Full-width horizontal bands of mono segment blocks joined by `>` chevrons in cyan (21:9 rhythm). Chunk blocks: small 8px cyan squares in a row. The version stamp badge. Determinism rows use a `=` motif (deterministic output) rather than arrows.
- Diagram slots: `01 HERO ARCHITECTURE` (full pipeline, 21:9), `02 PHASE A INGESTION` (21:9), `03 PHASE B RETRIEVAL` (21:9), `04 BI-STAGE OCR DECISION` (1:1), `05 DETERMINISM MECHANISM` (16:9), `06 COST-EFFICIENCY FLOW` (16:9).
- Links: LIVE SITE `[URL PENDING]`, GITHUB `[URL PENDING]`.

### 6.5 NUESA Academia: The Library Index

Concept: an institutional catalog and coverage ledger. The homepage already shows the dashboard screenshot; this page is the full coverage story: shelf rows, coverage bars, the heatmap, and the checksum pipeline.

- Accent: Institutional Green (`#047857` / `#065F46` / `#059669`)
- Typography: catalog rhythm. Mono call-number labels (`EEE 400 LEVEL / MTH 201`), coverage bars as thin green progress hairlines, bold sans headlines. Numbers tabular.
- Hero: WHITE field with the real dashboard screenshot (`/projects/nuesa-academia.jpg`) on the right in a hairline frame (same as the homepage card). Kicker `INSTITUTIONAL STUDY MATERIALS` in emerald-700. Title `NUESA Academia`. Meta `2024 / 2025 / DIGITAL TEXTBOOK REPOSITORY / LIVE`. Three coverage stats under the title: `9` DEPARTMENTS, `426` COURSES, `2,111` PDFS (all verified).
- Section rhythm: 01 OVERVIEW, 02 THE PROBLEM (no central repository, scattered handouts), 03 THE PLATFORM (search / PQ mode / upload / analytics as ruled rows), 04 THE ARCHITECTURE (dual-runtime FastAPI + data Worker + D1 + R2 diagram), 05 THE UPLOAD PIPELINE (10-step checksum pipeline as a numbered flow: origin check -> multipart -> idempotency -> Firebase -> validation -> SHA-256 -> D1 uploading -> R2 put -> published -> cache bust), 06 COVERAGE AND ANALYTICS (coverage bars per department + heatmap diagram slot), 07 PERFORMANCE (metric table: search p95, upload success, cache hit, page load), 08 TRADE-OFFS (honest list: LIKE search, no CI/CD, roles scaffolded), 09 LINKS.
- Unique motif: coverage bars. Per-department rows with a thin emerald bar whose width is the coverage percent and a mono label + number on the right. Shelf rows for recent materials. The heatmap slot: a 9x5 grid of cells (department x level), filled cells in emerald at low opacity, empty cells hairline.
- Diagram slots: `01 SYSTEM ARCHITECTURE` (16:9), `02 UPLOAD PIPELINE` (21:9), `03 SEARCH FLOW` (16:9), `04 ANALYTICS FLOW` (16:9), `05 DATA MODEL` (16:9), `06 MIGRATION FLOW` (21:9).
- Links: LIVE SITE `https://academia.nuesaabuad.ng`, API `https://api.academia.nuesaabuad.ng` (verified in dossier), GITHUB `[URL PENDING]`.

### 6.6 AWUN: The Technical Documentary (capstone)

Concept: the capstone gets the largest treatment. A progressive-reveal documentary in five chapters, mirroring the homepage band's `CH. 01-05` index. The page reads like a documentary with chapters, system flows, and evidence tables, in the product's own terracotta.

- Accent: Terracotta (`#A0522D` / `#8B4513` / `#C97A4D`) from the shipped AWUN product brand.
- Typography: documentary rhythm. Giant chapter numerals (General Sans 700, `clamp(4rem, 10vw, 7rem)`, terracotta, tabular) as the left spine; chapter titles bold sans; system facts and ledger rows in mono. No user metrics anywhere (AWUN publishes system facts only).
- Hero: WHITE field with a sticky chapter rail (mono `CH. 01` through `CH. 05`, terracotta, right-aligned, linking to chapter anchors). Kicker `AI SOCIAL COMMERCE / THE CAPSTONE` in terracotta. Title `AWUN`. Meta `2025 / 2026 / VENDOR-FIRST SOCIAL COMMERCE / LIVE`. The three system facts as ruled rows: `AI STOREFRONT CREATION`, `PAYMENT VERIFICATION`, `INVENTORY MANAGEMENT`. No metrics.
- Chapter structure (progressive reveal, one chapter per viewport beat, `whileInView` reveals):
  - CH. 01 THE SYSTEM: what AWUN is, the vendor-first model, do-not-regress rules (money in kobo, out-of-stock 409, reservation consume/release)
  - CH. 02 THE MARKETPLACE: checkout link lifecycle flow (vendor picks -> link created + stock reserved -> WhatsApp share -> buyer pays -> webhook/verify -> order -> payout), the marketplace flow strip diagram
  - CH. 03 THE INTELLIGENCE LAYER: multimodal search (256-dim, L2 normalized, fused text+image), CSV ingestion with Gemma, self-healing index
  - CH. 04 THE INFRASTRUCTURE: Cloud Run + Cloudflare D1/R2/Vectorize + Firebase + Paystack + Resend platform map, D1 statement budget before/after table (dashboard 23-24 -> 10, inventory 62 -> 5), cost curve rows (~$0-2 launch, ~$2-15 at 500 vendors, ~$15-65 at 5,000)
  - CH. 05 THE DIFFICULT PARTS: the 15 documented trade-offs as numbered ledger rows, the webhook/verify race, the 410 index deletion, the cross-vendor cache PII leak
- Unique motif: chapter numerals as giant terracotta spines, system-flow chevron strips (CLIENT -> API -> WORKER -> D1 / R2 in terracotta), ledger rows (mono label left, value right, hairline rules), order state chips `NEW / PROCESSING / FULFILLED / CANCELLED`.
- Diagram slots: `01 SYSTEM ARCHITECTURE` (16:9), `02 MARKETPLACE FLOW` (21:9), `03 DATA MODEL` (16:9), `04 SEARCH PIPELINE` (16:9), `05 ORDER STATE MACHINE` (1:1), `06 WEBHOOK SEQUENCE` (16:9), `07 STATEMENT BUDGET CHART` (16:9), `08 COST CURVE` (16:9).
- Links: LIVE SITE `https://www.awun.dev`, CHECKOUT `https://checkout.awun.dev`, API `https://api.awun.dev` (verified in dossier), GITHUB `[URL PENDING]`.

## 7. Mobile Collapse (under 768px)

Shared rules first:

- Every layout becomes a single column; one gap value (`gap-6` 24px) everywhere
- Header stacks: kicker, title, meta, description in order; hero motifs (SOS square, quiz card, dashboard screenshot, chapter rail) move below the description or above the kicker per page
- Ink heroes keep their band but padding drops to `clamp(64px, 12vw, 96px)`; the giant numbers clamp down (min `2.75rem`)
- Diagram slots go full width with `aspect-ratio: auto` and `min-height: 240px`
- Flow strips (21:9) wrap to vertical stacks of segment blocks with down chevrons instead of right chevrons
- Metric tables: rows keep the 3-column grid but the label column narrows; if a table has more than 6 rows it becomes a horizontal scroll container with a mono hint `SCROLL`
- Sticky chapter rail (AWUN) collapses to a horizontal mono chip row above the hero that links to chapters
- The failure-mode matrices (TRAKS, RAG) become stacked label-over-value rows, not scroll containers
- Touch targets >= 44x44px; active state = border deepen + scale 0.97; no hover-only interactions

Per-page notes:

| Page | Mobile behavior |
|---|---|
| Soiling | Two-layer pipeline boxes stack vertically; hardware tables keep tabular mono at full width (no horizontal scroll under 6 columns) |
| TRAKS | SOS square shrinks to 48px and sits left of the kicker; the 8-tile stack grid becomes a 2-column grid |
| Engineering Hub | Quiz preview card drops below the header; review chips wrap to 2 rows |
| RAG | Flow bands become vertical; version badge stays top-right of the header block |
| NUESA | Dashboard screenshot moves above the title; coverage bars stay full width; heatmap becomes a 2-column cell grid |
| AWUN | Chapter rail becomes a horizontal chip strip; system facts stack; ledger rows keep label-over-value |

## 8. Routing

Routes (already the EXPLORE PROJECT targets in `src/data/site.ts`, order is the homepage grid order):

| Route | Component | Page accent |
|---|---|---|
| `/projects/soiling-detection` | `SoilingCaseStudy` | Solar Amber |
| `/projects/traks` | `TraksCaseStudy` | Safety Red |
| `/projects/engineering-hub` | `EngineeringHubCaseStudy` | Study Violet |
| `/projects/rag-data-pipeline` | `RagCaseStudy` | Electric Cyan |
| `/projects/nuesa-academia` | `NuesaCaseStudy` | Institutional Green |
| `/projects/awun` | `AwunCaseStudy` | Terracotta |

- React Router route table in `src/App.tsx` or a dedicated `src/routes.tsx` (build decision, not this spec)
- Next Project order wraps: soiling -> traks -> engineering-hub -> rag -> nuesa -> awun -> (back to soiling)
- EXPLORE PROJECT links on the homepage already point to these routes; no homepage change needed
- Back link targets `/#projects` so the user lands on the projects grid
- Scroll restoration: each route scrolls to top on mount (or `ScrollRestoration`); no scroll listeners
- Reduced motion: all reveals opacity-only 300ms; chapter reveals use `whileInView` with `once: true` (Framer Motion, no window listeners)

## 9. Data Architecture (the swap contract)

Single module: `src/data/caseStudies.ts`. One typed object per project, keys matching the dossier correction tables.

```ts
export type CaseMetric = {
  key: string;          // e.g. "InferenceLatency", "ActiveVendors"
  label: string;        // e.g. "ARM ON-DEVICE INFERENCE LATENCY"
  value: string;        // e.g. "380 ms" or "99.98%"
  pending?: boolean;    // true = FABRICATED-PENDING, renders * and PENDING chip
};

export type CaseStudy = {
  slug: string;            // "soiling-detection"
  accent: string;          // CSS var name, e.g. "accent-amber"
  kicker: string;
  title: string;
  meta: string;            // "2024 / FINAL YEAR PROJECT / PROTOTYPE BUILT"
  description: string;
  hero?: { field: "white" | "ink"; headlineMetrics: CaseMetric[] };
  sections: { index: string; title: string; body: string; diagrams?: DiagramSlot[] }[];
  tables: { id: string; title: string; rows: CaseMetric[] }[];
  links: { live?: string | null; checkout?: string | null; api?: string | null; github?: string | null; paper?: string | null };
};

export type DiagramSlot = {
  id: string;              // "01"
  label: string;           // "SYSTEM ARCHITECTURE"
  aspect: "16:9" | "21:9" | "1:1";
};
```

Rules:

- `pending: true` is the ONLY way a PENDING chip renders. Real verified metrics omit it.
- `links.*` values that are null render `[URL PENDING]` in mono instead of a link.
- The accent token maps to Tailwind/CSS custom properties added in `index.css` per page (e.g. `--accent-amber-700: #B45309`), scoped under a `.case-<slug>` wrapper class so pages never leak into each other.
- Components consume `CaseStudy` data; no hardcoded metrics or URLs inside components.

## 10. Build Checklist and Verification

- [ ] Zero em dashes in copy, comments, and this doc
- [ ] One accent hue per page, from the approved palette only
- [ ] Site chrome (nav, footer, back link) stays system blue
- [ ] Radius values only from 0 / 2 / 4px
- [ ] Hairline borders only (1px); dashed border used only for diagram slots and PENDING chips
- [ ] No shadows, no gradients, no tinted fields beyond documented hero bands
- [ ] Every text pair passes AA (tables in section 2.3)
- [ ] Diagram slots numbered sequentially per page, labeled per section 4
- [ ] FABRICATED-PENDING values render with `*` + PENDING chip + footnote only
- [ ] All metrics and links come from `src/data/caseStudies.ts`
- [ ] Mobile under 768px follows section 7; touch targets >= 44px
- [ ] No window scroll listeners; Framer Motion `whileInView` / `useReducedMotion` only
- [ ] All fonts self-hosted woff2 (existing General Sans + JetBrains Mono sets, no new families)
- [ ] LCP under 2.5s, CLS under 0.1

## 11. Open Items for the Owner (handed to Nasir)

- TRAKS framing: dossier flags community-safety vs research-assistance framing; copy follows whichever Nasir confirms (the ops-console design language works for both)
- TRAKS and RAG links: no URLs exist in any source; `[URL PENDING]` until provided
- Soiling paper link: `[URL PENDING]` until the FYP report has a shareable link
- All FABRICATED-PENDING metric values: replace in `caseStudies.ts` when real numbers exist
- Diagram SVGs: Nasir drops real SVGs into the slots per section 4.3
