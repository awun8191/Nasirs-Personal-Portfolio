# Engineering Hub - Technical Case Study Dossier

**Project:** Engineering Hub - adaptive study platform for engineering students
**Repo:** `/home/admin/PROJECTS/Engineering-Hub` (monorepo: `engineering_web/`, `engineering_app/`, `workers/`, `docs/`)
**Owner:** Nasurf (Nasir) - presented under **The John Amhanesi Foundation** (README header)
**Status:** Live (web + API deployed to Cloudflare), Android app in release builds (`1.0.0+52`, 52 build iterations); repo history 2025-04-10 to 2026-08-15 (351 commits on current branch lineage)
**Live URLs (from README):** Web `engineeringhub.nasurf25.workers.dev` - API `engineeringhub-api.nasurf25.workers.dev`
**Scope of this dossier:** Technical case-study brief for the portfolio designer. Every fact below is sourced from the repo (README.md, docs/*, workers/api source, engineering_web source, engineering_app source, git history). Metrics that exist nowhere in the repo are marked **METRIC NOT FOUND - ASK OWNER**. The final section contains clearly-tagged FABRICATED placeholders pending owner correction.

---

## 1. What Engineering Hub Is and Who It Serves

Engineering Hub is an **adaptive study platform for engineering students** that combines course discovery, question banks, quizzes, spaced-repetition flashcards, schedules, and learning analytics into one mobile-first study workflow.

- **Product purpose (engineering_app/PRODUCT.md):** "EngineeringHub brings course registration, schedules, quizzes, flashcard review, and learning analytics into one mobile-first study workflow. Success means students can immediately understand what is next, act on it, and trust the information shown."
- **Users:** "Engineering students use EngineeringHub between classes and study sessions to manage their timetable, prepare for assessments, and complete the next useful learning action without losing context."
- **Core learning model (README):** "Adaptive study platform for engineering students. Uses Bayesian Knowledge Tracing and spaced repetition to help students learn smarter, not harder."
- **Content scale:** 9 departments, 426 courses documented in D1 (`courses` table, README D1 schema section), ~142K questions documented in D1 (`questions` table). Checked-in `courses.json` catalog contains 371 course records (verified by parsing the file).
- **Platforms:** React web SPA + Flutter Android app (iOS not configured; web config partial). Both clients share one Worker API contract.
- **Context facts already used on the portfolio homepage (owner-provided, not from this repo):** Flutter + Python + FastAPI + Firebase stack, BuildVerse semifinalist July 2026, 250 downloads (BuildVerse context). NOTE: the current canonical backend is the Cloudflare Worker/D1; the FastAPI origin is owner-provided context (no FastAPI code or references remain in the current working tree - grep-verified). Python survives in the repo only as the documented CourseGen content pipeline (see 2.5).

---

## 2. Full Technical Architecture

### 2.1 Platform map

| Layer | Technology | Detail |
|---|---|---|
| Web frontend | **React 19 + Vite 8 + TypeScript 6** SPA (`engineering_web/`) | TanStack React Query, React Router 7, KaTeX LaTeX rendering, framer-motion, lucide-react, Vitest + Playwright smoke tests |
| Mobile | **Flutter (Dart)** Android app (`engineering_app/`) | 221 Dart files in `lib/`, version `1.0.0+52`; BLoC + GetX state management; Firebase SDK suite |
| API | **Cloudflare Worker** `engineeringhub-api` (`workers/api/src/index.js`, 1,564 lines) | Edge API, single worker, module-style routing; plus `learning.js` (492 lines, Durable Object `LearningCoordinator`), `bkt.js` (93 lines, pure BKT math), `legacy_analytics.js` (113 lines) |
| Database | **Cloudflare D1 (SQLite)** `vens-hub-questions-v2` (db id `fc097b23-2d08-48ec-b63a-d24e6f62190f`) | Shared content (courses, departments, questions) + authoritative per-user learning state (7 user tables) |
| Coordination | **Durable Object** `LearningCoordinator` (wrangler.toml migration tag `v1`) | Per-user D1 learning coordination: answers, reviews, decks, imports, account deletion |
| Auth | **Firebase Auth** (`engineering-hub-7e5e1`) | Email/password + Google sign-in; ID token as bearer; JWKS-verified in the Worker |
| User data | **Firebase Firestore** | Profiles, schedules, academic calendar, personal events, legacy flashcard data (one-time import source) |
| AI | **Google Gemini** (`gemma-4-31b-it`, env-overridable) | `/assistant` Q&A endpoint, max output tokens 1024, rate limit 30/min |
| Content pipeline | **CourseGen (Python)** - documented in README, `coursegen/` NOT present in the checked-out tree | PDF -> OCR -> RAG -> Gemini question generation -> D1 upload; embeddings via Cloudflare Workers AI `@cf/baai/bge-m3`; vector store ChromaDB (local DuckDB+Parquet); OCR via Gemini / EasyOCR / PaddleOCR; deploy to ECR (`888429341445.dkr.ecr.us-east-1.amazonaws.com/rag:latest`) |
| Deploy targets | **Cloudflare Pages** (web SPA, `wrangler.toml` name `engineeringhub`, SPA `not_found_handling`), **Cloudflare Workers** (API), APK builds for Android | `vercel.json` also present (asset caching + SPA rewrites) - the web app has a Vercel deployment history; README's canonical web deploy is `wrangler pages deploy dist/` |

### 2.2 Web app (`engineering_web/`)

- React 19 + Vite 8 + TypeScript, ~83K total LOC across web+app+worker source trees (ts/tsx/dart/js/css, wc -l).
- Pages (README "Web App Components"): Landing, Login, Register (4-step: Name -> Dept -> Courses -> Account), Dashboard (streak card + course workspace grid), Courses (search + department/level filters + pagination), Course Detail (expandable outline), Quiz Setup (calculation/theory selector, question-count slider), Multiple Choice quiz mode, Quiz Completion (score, topic breakdown, adaptive sync), Flashcards (`/app/study` scroll-snap feed), Schedule (week/day views, CRUD, calendar picker), Hub (metrics, adaptive mastery overview), Streaks (calendar grid, personal/friends tabs), Course Analytics (mastery chart, strengths/weaknesses), Profile (avatar, stats, 7-theme picker, courses editor), AI Assistant (floating overlay), plus Verify Email, Account Deletion, Contact, Privacy Policy, 404.
- Design system: CSS custom properties tokens, 7 color schemes (teal/blue/purple/pink/orange/green/slate) x light/dark, `prefers-reduced-motion` support, responsive breakpoints 1180/860/760/480/360px, Geist font (web) / Nunito Sans (mobile).
- Data: Firebase auth + Firestore init in `firebase.ts`; `userData.ts` (profiles, performance, flashcard data); `adaptive.ts` (learning API client); localStorage caches accelerate reads, Firebase is durable store.
- Recent landing work (git log): Swiss-poster aesthetic redesign, real dashboard screenshot hero, SEO overhaul (robots.txt, sitemap.xml, public legal pages).

### 2.3 Flutter app (`engineering_app/`)

- Android-configured only (iOS not configured; `kIsWeb` checks exist but no web config). Version `1.0.0+52`.
- State management: BLoC (auth, course, quiz), GetX (home, schedule, theme), Cubit (course alternative).
- Key services (README): `FirebaseAuthService`, `FireStoreServices` (legacy paths; web data goes through the Worker), `GeminiService`, `QuestionContentService` (fetches MCQ content from the Worker), `ThemeService`, `StreakService` (local SharedPreferences), `NotificationService` (FCM + local notifications, department topics), `VerificationEmailService`, `AnalyticsService` (18 Firebase Analytics event types).
- Mobile Flashcards: course picker -> ten random authenticated study questions from D1 (`/study-decks/:code`, default limit 10, max 25) shown as revealable cards; answer key evaluated locally; session-only deck, no review state written back.
- Adaptive client mirror: `lib/adaptive/` standalone Dart package (4 files) - sealed `SubmitResult` union, server-authoritative, no local BKT computation.
- Conductor-tracked work (git log): Android deployment readiness (INTERNET permission, isProduction), Crashlytics bootstrap-failure fix, resilient spaced-repetition flashcards (Phase 4), progressive course analytics (Phase 3).
- Account deletion: D1 + Firestore + Firebase Auth data removed via Worker `/delete_account` (tombstone `accountDeletionTombstone`, version 1).

### 2.4 Worker API + D1 (`workers/api/`)

- **Auth model:** Firebase ID token bearer; Worker verifies against cached JWKS (`firebaseJwksCache`), derives UID from `sub` claim. `X-User-Id` is not used for authorization.
- **Endpoint surface (from `api-reference.md` + routing in `index.js`):**
  - Public content: `GET /health`, `/departments`, `/departments/:code/courses`, `/courses` (search/filter, up to 10 `codes`, limit default 20 max 50, cursor pagination), `/courses/:code`, `/courses/:code/questions`, `/questions/:code` (legacy alias). Public responses omit answer keys.
  - Authenticated: `GET /study-decks/:code` (random questions WITH answer keys for client-side evaluation), `GET /schedule`, `POST /schedule/events`, `PUT|DELETE /schedule/events/:id` (Firestore-backed, Worker forwards ID token so Firestore rules authorize).
  - Learning (authenticated, D1 via `LearningCoordinator` DO): `POST /learning/answers` (grade one answer + BKT update), `POST /learning/reviews` (flashcard rating -> next review), `GET /learning/overview` (course performance, accuracy, retention forecast, review recommendation), `GET /learning/courses/:code`, `GET /learning/flashcards?course=` (online review deck), `POST /learning/import-flashcards`, `POST /learning/import-legacy-attempts[/complete]`.
  - AI: `POST /assistant` (Gemini, single- or multi-turn, rate-limited 30/min in-memory buckets).
  - Auth services: `POST /auth/send-verification-email` (3 per UID/IP per 15 min; token-derived user only), `POST /delete_account`.
  - Retired with explicit errors: `/adaptive/*` -> 410 "retired, update to /learning/answers"; `/user/*` -> 410 "user data is stored in Firebase"; `/uploads/*` -> 404 (notes upload retired, R2 credentials removed from mobile).
- **D1 schema v2** (`schema-v2.sql`): `courses` (code PK, type, units, levels JSON, semesters JSON, outline JSON, department_code, question_count), `departments` (code PK, course_count, courses JSON, question_count), `questions` (~142K rows: topic/subtopic, question_type, difficulty + difficulty_ranking, question, 4 options JSON, correct_answer_index, explanation, solution_steps JSON; indexes on course_code and topic_name). Comment in schema: *"rag_sources removed to stay under D1 500MB limit"*.
- **User tables (learning.js `USER_D1_TABLES`):** `learning_attempts`, `knowledge_states`, `flashcard_states`, `review_events`, `learning_imports`, `legacy_quiz_attempts`, `legacy_analytics_imports`. Migrations: `0001_learning.sql`, `0002_legacy_analytics.sql`.
- **Durable Object `LearningCoordinator`:** per-user state machine; dedup via `request_id` (review_events) / attempt dedup; retention forecast binary search over 14-point curve; review deck = `flashcard_states JOIN questions ORDER BY next_review_at ASC LIMIT 25`.
- **Worker config (wrangler.toml):** `GEMINI_MODEL=gemma-4-31b-it`, `GEMINI_MAX_OUTPUT_TOKENS=1024`, `ASSISTANT_RATE_LIMIT_PER_MINUTE=30`, `VERIFICATION_EMAIL_RATE_LIMIT=3`, `LEGACY_ANALYTICS_IMPORT_MODE=off`, `LEGACY_ANALYTICS_CUTOFF_AT=2026-07-16T00:00:00.000Z`, observability enabled (head sampling 1). Secrets: `GEMINI_API_KEY`, `FIREBASE_WEB_API_KEY`.

### 2.5 Content pipeline (CourseGen - documented, code not in working tree)

Per README: PDF textbooks -> PyMuPDF extraction -> OCR fallback (Gemini/EasyOCR) -> chunking (2 paragraphs per chunk, 2-sentence overlap) -> SHA1 dedup -> BGE-M3 embeddings (adaptive batching 8-100, token cap 7500, `"passage: "` prefix) -> ChromaDB store -> Gemini question generation (K=50 retrieval pool -> final 8-12 via temperature sampling, JSON repair, validation, disk cache) -> D1 upload. Dockerized (8GB RAM / 2 CPUs / BuildKit), ECR deploy via `build.sh`. **METRIC NOT FOUND - ASK OWNER:** how many questions were generated per pipeline run, total pipeline throughput, cost per course.

### 2.6 BKT adaptive engine (the intelligence layer)

- **Model:** 4-parameter Bayesian Knowledge Tracing + stability parameter (S) for spaced repetition. Defaults (bkt.js): P(L0)=0.15, P(T)=0.12, P(S)=0.10, P(G)=0.25, S0=1.0, S+ x2.0 on correct, S- x0.5 on incorrect, minimumSpacingDays 0.25 (~6h), reviewThreshold 0.75.
- **Update rules:** standard E-step posterior + M-step learning transition; S updates ONLY on qualified reviews (status `reviewing` AND elapsed >= min spacing) - massed-practice guard prevents S inflation.
- **Interval:** I = max(minSpacing, S * ln(P(L)/threshold)); readiness R = P(L)*exp(-dt/S) orders review priority; recall forecast P(recall) = P(L)*exp(-t/S); retention target 0.8.
- **Server-authoritative:** answer keys never shipped for grading; client shows "Checking..." lock, no optimistic UI; duplicate `attemptId` returns cached result, no state mutation.
- **Design lineage:** `docs/adaptive-learning-engine.md` (v2.5, June 2026) specifies the Firebase Cloud Functions implementation (Node 22 TypeScript, `functions-adaptive/`, Firestore transactions, `adaptive_states/{uid}`, immutable parameter versions at `course_priors/{courseId}/versions/`). The CANONICAL shipped implementation is the Worker D1 + Durable Object path (`/learning/*`); the Firestore-Functions path is the earlier/design-spec implementation. Cross-implementation strategy preserved: shared `bkt-test-cases.json` fixtures verified via Python bridge, 48 TypeScript tests + 7 Dart tests.

---

## 3. Features

### 3.1 Question banks
- 9 departments, 426 courses, ~142K questions in D1 (`questions` table, README-documented row counts); 371 course records in checked-in `courses.json`.
- All active quizzes are MCQ: `multiple_choice`, `theory`, and `calculation` are MCQ content variants (calculation = numerical problem with step-by-step solution; theory = conceptual with explanation). Legacy free-response theory / timer-setup / gap-fill routes removed from the router.
- Question metadata: topic, subtopic, difficulty + numeric difficulty_ranking, 4 options, correct answer index, explanation, solution_steps JSON, LaTeX rendering via KaTeX.
- Public browsing never exposes answer keys; only authenticated `/study-decks/:code` includes them.

### 3.2 Wrong-answer cards (flashcards)
- Flashcards are created from the **exact questions a student answered**, storing question text, options, the student's answer, the correct answer, correctness, explanation, solution steps, and review state (FLASHCARDS_PLAN.md).
- Wrong answers (and reviews rated `again`) become cards that come back sooner; correct/strong cards still return later (Ebbinghaus forgetting-curve principle) - FLASHCARDS_PLAN.md requirements 4.
- Scheduler: SM-2-derived ease factors (MIN_EASE 1.3, DEFAULT_EASE 2.3), stability days, repetitions, lapses, ratings `again | hard | good | easy` (learning.js).
- Every card shows the correct answer, offers a manual explanation toggle, and offers **AI explanation** (same `/assistant` backend as the floating panel) - FLASHCARDS_PLAN.md requirements 6-8.
- Web MVP stores per-question review state in browser storage; the Worker's `/learning/answers` path creates authoritative `flashcard_states` rows so online review decks (`/learning/flashcards`, LIMIT 25) and retention forecasts work cross-device.
- Known phase-2 fix: new wrong-answer cards originally got a hardcoded 10-minute `nextReviewAt` (review buffer too short); corrected to BKT `minimumSpacingDays` 0.25 (~6h) (docs/plans/2026-07-18-phase2-implementation-plan.md).

### 3.3 AI tutor
- `POST /assistant` - Gemini (`gemma-4-31b-it`) Q&A, single- or multi-turn chat (`messages` array), optional course/topic `context`, rate-limited to 30 req/min per user, 1024 max output tokens.
- Web: floating AI assistant overlay on every quiz + per-card "Ask AI to explain".
- Mobile: `GeminiService` for AI question generation.
- Model is env-configurable; 501 if `GEMINI_API_KEY` unconfigured.

### 3.4 Other features
- **Schedule:** normalized timetable + academic calendar (`academic_calendar_sessions/2025_2026/events` by default, `?session=` selector) + personal events; Firestore-backed, Worker-normalized so mobile and web share one contract.
- **Streaks:** daily engagement tracking with calendar visualization (mobile local via SharedPreferences; web page with personal/friends tabs).
- **Hub analytics:** course performance, accuracy, retention forecast (14-point curve), recommended review time, due-card counts.
- **Email verification gate:** email/password users routed to `/verify-email` until verified; Google users bypass; Worker dispatches via Firebase Identity Toolkit, 3 sends / 15 min.
- **Legacy analytics import:** one-time import of legacy quiz attempts / flashcards (mode `off` by default, cutoff 2026-07-16).
- **Account deletion:** full D1 + Firestore + Auth removal with tombstone.
- **Offline cache:** localStorage accelerates reads; React Query SWR pattern; assets 1-year immutable.

---

## 4. Performance / Capacity Facts Found in the Repo

Verified facts (not aspirations; "estimated" rows are labelled as such in the repo):

- **Three-layer caching** (docs/caching.md):
  - Layer 1 Worker `Cache-Control`: public content `max-age=300` (browser) / `s-maxage=3600-86400` (CDN); authenticated routes `private, no-cache` (deliberately no `Vary: Authorization`).
  - Layer 2 assets: `public, max-age=31536000, immutable` for fingerprinted assets; HTML `max-age=0, must-revalidate` (vercel.json).
  - Layer 3 React Query: `staleTime` 5 min (schedule 2 min, flashcards deck 1 min), `gcTime` 30 min, `retry: 2`, `refetchOnWindowFocus: false`; targeted invalidation on writes; manual refresh buttons.
- **Repo-documented estimated impact** (caching.md "Performance Impact (Estimated)" - ESTIMATED, not measured): CoursesPage API calls per session ~5-10 -> ~1-3; CourseDetailPage 2 requests per visit -> 0 after first visit (5-min window); catalog D1 reads -> 1 per TTL window across all users.
- **Rate limits:** assistant 30 req/min (in-memory buckets), verification email 3 / 15 min per UID/IP.
- **Pagination caps:** courses limit default 20 max 50; study decks default 10 max 25; attempts page default 50 max 200; profile course search up to 10 codes.
- **D1 capacity discipline:** schema-v2 comment documents `rag_sources` removal *"to stay under D1 500MB limit"* (500MB = D1 free-tier database size cap per Cloudflare docs - repo states the constraint, not the quota).
- **BKT efficiency:** pure stateless math, no I/O; dedup short-circuits duplicate submissions; single DO per user coordinates D1 state (batch statements via `QUESTIONS_DB.batch`).
- **Cost model (design doc, Firestore-based v2.5 - NOT the current Worker/D1 model):** 6 reads + 3 writes per graded answer; duplicates 1 read; ~$1.87/month modeled at 500 users x 50 answers/user/month (25K answers). Do not publish as current-cost.
- **Scale facts:** `questions` ~142K rows; `courses` 426 rows; `departments` 9 rows; courses.json 371 course records (checked in).
- **Tests:** web Vitest unit + Playwright smoke E2E (`npm run smoke`: auth -> AI -> flashcards -> quizzes); Flutter `auth_bloc_test.dart` + `data_contract_test.dart` (D1 study-deck contract); Worker `node --test` (learning, legacy analytics, account deletion); BKT TS 48 tests + Dart 7 tests on shared fixtures.
- **Deployment facts:** Worker deployed via `./deploy.sh` (wrangler deploy + health check); web via `wrangler pages deploy dist/`; deployed Worker version pinned in runbook: `8a9ee539-892b-4019-9ff7-96af460c5e74`.
- **METRIC NOT FOUND - ASK OWNER:** registered users, DAU/MAU, questions answered (total or per user), AI tutor response latency (p50/p95), request volumes, D1 read/write volumes, uptime %, conversion/signup funnel, Play Store download count (250 downloads is owner-provided BuildVerse context, not repo data), retention %, streak participation, crash-free rate.

---

## 5. Difficult Parts / Engineering Trade-offs Documented

1. **BKT over Ebbinghaus/HMM.** The v1 heuristic Ebbinghaus + HMM approach was rejected as "crude and not good at all" (adaptive-learning-engine.md, design decision 1). BKT chosen: pedagogically validated, P(L) interpretable as mastery, P(T)/P(S)/P(G) configurable per KC, and produces spaced-repetition behavior (massed practice -> flat mastery; spaced reviews -> S grows).
2. **Server-authoritative grading / no local BKT.** Shipping answer keys to clients would break assessment integrity; all BKT runs server-side. Cost: no optimistic UI - submission button locks with "Checking..." until the server responds; offline clients queue raw submissions without local state mutation.
3. **Massed-practice guard.** Rapid-fire correct answers would inflate stability indefinitely (scheduling reviews years out); S only updates on qualified reviews spaced >= `minimumSpacingDays` (0.25d).
4. **Immutable parameter versions.** States pin to a parameter version at creation; post-launch tuning uses "pin-and-continue" (Phase 1 default) vs log replay (deferred Phase 2) - no retroactive rewriting of historical mastery.
5. **Dedup via compound document ID.** `adaptive_attempts/{uid}_{attemptId}` enables existence-check dedup without composite indexes; duplicate returns cached result verbatim.
6. **Stripped access validation (v2.5 build).** App Check, IAM write controls, and quiz-session contracts deliberately omitted initially; documented as Phase 2 additions.
7. **Client-writable HUB records.** HUB analytics are client-writeable and therefore client-forgeable "by product decision" - server-owned performance integrity deferred (mobile-auth-mcq-hub.md).
8. **D1 500MB constraint.** `rag_sources` column dropped from the questions schema to stay under the D1 size limit - source attribution for questions was sacrificed.
9. **Review buffer bug (P0).** Wrong-answer cards hardcoded a 10-minute `nextReviewAt` (too short to be useful); corrected to BKT's 0.25-day minimum spacing (phase2 plan task 2.1).
10. **Mobile quiz evaluated locally.** Flashcards were only created when answers flowed through the Worker; mobile `QuizBloc` graded locally and `AdaptiveService` was dead code - Phase 2 wires fire-and-forget `POST /learning/answers` so cards get created without breaking offline quiz UX.
11. **Retired notes upload.** `/uploads/*` endpoints removed; R2 credentials stripped from mobile source with an explicit "rotate all previously shipped R2 keys" warning - convenience sacrificed for credential hygiene.
12. **`/user/*` API retired (410).** User data moved to Firebase/Firestore; learning state became authenticated D1 routes - one canonical data path per domain.
13. **Web/mobile department field mismatch.** Web saved display name, mobile saved code, into the same Firestore field -> timetable mapping broke after cross-platform saves; fixed by preferring `departmentCode` everywhere (phase2 plan task 2.3).
14. **Wildcard CORS.** All origins allowed (`*`); README "Remaining Work" explicitly lists restricting CORS to deployed web origins before production.
15. **Client-provided BKT state still accepted** as an interim measure; moving mastery-state validation fully server-side is listed as remaining security work.
16. **Release-mode blank screen.** Crashlytics native failure + bootstrap abort cascade caused blank release builds; fixed with bootstrap failure protection (git log `5ee74696`, `51062038`).
17. **CourseGen cost/quality controls:** adaptive embedding batching (8-100, token-capped 7500), temperature-sampled retrieval (K=50 -> 8-12), JSON repair + validation for LLM output, streaming JSONL (embeddings never held in memory), local Ollama embedding fallback, billing/token-cost tracking toggle.
18. **Session-boundary correctness:** HUB binds requests to active user + session epoch; late responses from a previous session are discarded so user A's analytics never render for user B; sign-out clears local cache, streak data, and navigation state.

---

## 6. Deliverables

1. **Cloudflare Worker API** (`workers/api/`): single edge worker (index.js 1,564 lines) + LearningCoordinator Durable Object + BKT engine + legacy analytics; D1 schema-v2 + 2 learning migrations; tests (node --test); deploy.sh with post-deploy health check.
2. **React web SPA** (`engineering_web/`): 20+ pages/routes, design system (7 themes x dark mode, tokens, responsive, reduced-motion), React Query caching layer, Playwright E2E smoke suite, Vitest unit tests, SEO pass (robots.txt, sitemap.xml, public legal pages), Swiss-poster landing redesign with real dashboard screenshot.
3. **Flutter Android app** (`engineering_app/`): 221 Dart files, BLoC/GetX architecture, adaptive client mirror package, FCM + local notifications, Firebase Analytics (18 event types), Crashlytics, Performance, account deletion, version `1.0.0+52`.
4. **Adaptive learning engine**: cross-implementation BKT (TypeScript + Dart) with shared float-verified fixtures (48 + 7 tests), server-authoritative grading, retention forecasting.
5. **Documentation set**: README.md (729 lines, full architecture + API reference + schema), docs/DEPLOYMENT.md, docs/api-reference.md, docs/caching.md, docs/adaptive-learning-engine.md (691-line spec v2.5), docs/mobile-auth-mcq-hub.md (runbook), docs/plans/2026-05-18 + 2026-07-18 (phase 2: 7 bug fixes + 4 UX enhancements), FLASHCARDS_PLAN.md, PRODUCT.md, firestore.rules + indexes + storage.rules.
6. **Content**: `courses.json` (371 course records: outlines, subtopics, program mappings); D1 loaded with ~142K questions across 426 courses / 9 departments (README-documented counts).
7. **Deployment artifacts**: deploy.sh, wrangler.toml (worker + web), vercel.json, .firebaserc, Firebase project `engineering-hub-7e5e1`.
8. **Planned / in-flight**: `review/landing-page-redesign` branch (current), worktree `t_b108af19` batched mobile hygiene fixes, Phase 2 remainder (server-side BKT validation, CORS restriction, durable rate limiting + production alerting, mobile profile_helpers.dart cleanup, App.tsx split), CourseGen pipeline rebuild.

---

## 7. Suggested Diagram List (for the designer)

1. **System architecture diagram:** Flutter app + React web -> Cloudflare Worker API (`engineeringhub-api`, incl. LearningCoordinator DO) -> D1 (`vens-hub-questions-v2`), Firebase Auth (ID-token verification), Firestore (profiles/schedule/calendar), Gemini (`/assistant`); content pipeline (CourseGen: PDF -> OCR -> chunk -> BGE-M3 embed -> ChromaDB -> Gemini question gen -> D1) feeding the same D1. Deploy targets: Cloudflare Pages (web), Workers (API), APK (Android).
2. **Auth flow diagram:** Email/password or Google -> Firebase Auth -> ID token -> bearer on Worker calls -> JWKS verification -> UID -> Firestore rules; email-verification gate (`/verify-email`, resend limit 3/15min) for email/password users; Google bypass; account-deletion cascade (Auth + Firestore + D1 + tombstone).
3. **Adaptive grading data flow:** quiz answer -> `POST /learning/answers` -> LearningCoordinator -> dedup check -> BKT update (bkt.js pure math) -> `knowledge_states` + `learning_attempts` + `flashcard_states` (wrong-answer card) -> mastery/retention overview + review deck.
4. **BKT state machine:** `learning` <-> `reviewing` at P(L)=0.75 threshold; S stability growth (x2 correct / x0.5 incorrect, only on qualified reviews); next-review interval formula; retention forecast curve (14 points, 0.8 target).
5. **Flashcard lifecycle:** quiz wrong answer / rating `again` -> card created (10-min bug -> 0.25d fix) -> review ratings again/hard/good/easy -> ease factor + stability update -> `next_review_at` schedule -> due deck (LIMIT 25, ordered) -> retention estimate.
6. **Three-layer caching diagram:** Worker Cache-Control (public max-age 300 / s-maxage 3600-86400; auth private no-cache) -> asset cache (1yr immutable) -> React Query (staleTime 5/2/1 min, gcTime 30 min) with invalidation triggers table.
7. **D1 data model ERD:** courses / departments / questions (content) + learning_attempts / knowledge_states / flashcard_states / review_events / learning_imports / legacy tables (user), noting `rag_sources` removed for the 500MB cap.
8. **Content pipeline diagram:** PDF textbooks -> PyMuPDF -> OCR fallback -> chunk (2 paragraphs, 2-sentence overlap) -> SHA1 dedup -> BGE-M3 embeddings (batch 8-100, token cap 7500) -> ChromaDB -> Gemini QG (K=50 -> 8-12) -> validation/JSON repair -> D1 upload.
9. **Web UX map:** Landing -> Register (4 steps) -> Dashboard -> Courses -> Quiz (MCQ) -> Completion + adaptive sync -> Flashcards feed -> Hub/Course Analytics -> Schedule/Streaks/Profile; floating AI assistant overlay.
10. **Deployment diagram:** `./deploy.sh` (worker + health check) / `wrangler pages deploy dist/` (web) / `flutter build apk --release` (Android); secrets via `wrangler secret put`; live URLs.

---

*End of dossier. All statements trace to repo files; owner-provided context (BuildVerse semifinalist July 2026, 250 downloads, FastAPI origin, Python in stack) is explicitly labelled. Live usage numbers, latency percentiles, and scale figures not present in the repo are marked **METRIC NOT FOUND - ASK OWNER**.*

---

## PLACEHOLDER METRICS - FABRICATED, PENDING CORRECTION

> **IMPORTANT:** The figures below are FABRICATED placeholders so the case study page renders complete. Nasir will supply real values. Every row marked [FABRICATED-PENDING] MUST be replaced before final launch. The correction table at the end is the single swap point. None of these numbers appear anywhere in the repo and must never be presented as real.

| Metric | Placeholder value [FABRICATED-PENDING] | What the real figure will be |
|---|---|---|
| Registered users | 1,200 | real Firebase Auth count |
| Questions answered (all time) | 310,000 | real D1 `learning_attempts` count |
| AI tutor response latency p50 | 1.8 s | real load test / logs |
| Play Store downloads | 250 (owner-provided BuildVerse context - already on homepage; placeholder only if store dashboard differs) | real Play Console |
| Monthly active users | 340 | real Firebase Analytics |
| Daily streak retention (7-day) | 38% | real analytics cohort |
| Flashcards created (wrong-answer cards) | 18,500 | real D1 `flashcard_states` count |
| Quiz completion rate | 72% | real analytics funnel |
| Courses browsed per session | 4.2 | real analytics |
| Avg session length | 14 min | real Firebase Analytics |

**CORRECTION TABLE (swap targets):** engineering-hub.md rows above; web page metric components: `RegisteredUsers`, `QuestionsAnswered`, `AssistantLatencyP50`, `PlayStoreDownloads`, `MonthlyActiveUsers`, `StreakRetention7d`, `FlashcardsCreated`, `QuizCompletionRate`, `CoursesPerSession`, `AvgSessionMinutes`.
