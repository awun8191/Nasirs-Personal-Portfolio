// Case study content. Source of truth: docs/CASE-STUDY-SYSTEM.md section 9
// plus the six technical dossiers in docs/case-studies/*.md.
//
// Swap contract:
// - pending: true is the ONLY way a PENDING chip renders. Verified repo
//   facts omit it.
// - links.* values that are null render "[URL PENDING]" in mono.
// - Dossier correction tables name the component keys (e.g.
//   "InferenceLatency", "ActiveVendors"); those keys are the data keys.
//
// No em dashes in this file.

export type CaseMetric = {
  key: string;
  label: string;
  value: string;
  pending?: boolean;
};

export type DiagramSlot = {
  id: string;
  label: string;
  aspect: "16:9" | "21:9" | "1:1";
};

export type CaseTable = {
  id: string;
  title: string;
  rows: CaseMetric[];
};

export type CaseLinks = {
  live?: string | null;
  playstore?: string | null;
  checkout?: string | null;
  api?: string | null;
  github?: string | null;
  paper?: string | null;
};

export type CaseSection = {
  index: string;
  title: string;
  body?: string;
  diagrams?: DiagramSlot[];
  tables?: CaseTable[];
  chips?: string[];
  flow?: string[];
  mono?: { title: string; lines: string[] }[];
  matrix?: { label: string; value: string }[];
  ruled?: { label: string; value: string }[];
  tiles?: string[];
  tilesNote?: string;
  shelf?: string[];
};

export type CaseStudy = {
  slug: string;
  accentClass: string;
  kicker: string;
  title: string;
  meta: string;
  description: string;
  hero?: {
    field: "white" | "ink";
    headlineMetrics?: CaseMetric[];
    versionBadge?: string;
    heroDiagram?: DiagramSlot;
  };
  sections: CaseSection[];
  links: CaseLinks;
  nextSlug: string;
};

// Route order is the homepage grid order (spec section 8). Next Project
// wraps: soiling -> traks -> engineering-hub -> rag -> nuesa -> awun.
export const CASE_STUDY_ORDER = [
  "soiling-detection",
  "traks",
  "engineering-hub",
  "rag-data-pipeline",
  "nuesa-academia",
  "awun",
] as const;

// ---------------------------------------------------------------------------
// 01 / Soiling Detection System: The Instrument Panel (Solar Amber)
// ---------------------------------------------------------------------------
export const soilingStudy: CaseStudy = {
  slug: "soiling-detection",
  accentClass: "case-amber",
  kicker: "EMBEDDED AI / HARDWARE + ML",
  title: "Soiling Detection System",
  meta: "2024 / FINAL YEAR PROJECT / PROTOTYPE BUILT",
  description:
    "An off-grid, sensor-only system that keeps solar panels clean in Harmattan dust. A Raspberry Pi Pico runs an always-on CUSUM trigger; a Pi Zero 2 W wakes only on alarm to confirm soiling with XGBoost, then drives a cleaning carriage across the panel.",
  hero: {
    field: "ink",
    headlineMetrics: [
      { key: "XGBoostAccuracy", label: "XGBOOST ACCURACY", value: "99.98%" },
      { key: "AlwaysOnPower", label: "ALWAYS-ON MONITORING", value: "2.64 mW" },
    ],
    heroDiagram: { id: "01", label: "SYSTEM ARCHITECTURE", aspect: "16:9" },
  },
  sections: [
    {
      index: "01",
      title: "The Pipeline",
      body: "A two-layer trigger-and-confirm design: Layer 1 monitors continuously on a Pico with a weighted Composite Soiling Index and a one-sided CUSUM control chart. When the index shows a sustained downward shift it raises an alarm; Layer 2 is normally powered completely off and wakes only to run an XGBoost classifier that confirms soiling or rejects the alarm as a false positive.",
      flow: [
        "SENSORS",
        "LAYER 1 / CUSUM TRIGGER",
        "ALARM",
        "LAYER 2 / XGBOOST CONFIRM",
        "CLEANING CARRIAGE",
      ],
      chips: ["SLEEP", "SENSE", "TRIGGER", "INFER", "CLEAN", "RETURN"],
      diagrams: [{ id: "02", label: "STATE MACHINE", aspect: "1:1" }],
    },
    {
      index: "02",
      title: "The Problem",
      body: "Soiling silently reduces solar yield: dust, dirt and bird droppings accumulate on PV panels and block light. The system must detect this from sensor data alone, with no cameras, inside a strict energy budget: the entire prototype runs off a 20 W panel and a 12 V 7.2 Ah lead-acid battery in dust-prone Nigerian Harmattan conditions.",
      ruled: [
        { label: "POWER SOURCE", value: "20 W PANEL + 12 V 7.2 AH BATTERY" },
        { label: "DESIGN AUTONOMY", value: "~199 DAYS OFF-GRID" },
        { label: "DAILY ENERGY BUDGET", value: "217 mWh / DAY" },
        { label: "CONTEXT", value: "HARMATTAN DUST, NO CAMERA" },
      ],
    },
    {
      index: "03",
      title: "The Hardware",
      body: "Seven sensors feed the Layer 1 index: temperature, humidity, panel surface temperature, output current, plane-of-array irradiance, daylight detection, and panel voltage. Every sensing rail is gated by a MOSFET so sensors draw zero current in sleep.",
      ruled: [
        { label: "DHT22 / TEMP + HUMIDITY", value: "±0.5°C, ±2% RH / 1 GPIO" },
        { label: "DS18B20 x2-3 / SURFACE TEMP", value: "±0.5°C / ONEWIRE" },
        { label: "ACS712 / PANEL CURRENT", value: "100 mV/A, 10-SAMPLE AVG" },
        { label: "PV REFERENCE CELL / IRRADIANCE", value: "5 V, 50 mA, 100 OHM LOAD" },
        { label: "LDR x2 / DAY-NIGHT", value: "10 kOHM DIVIDER" },
        { label: "VOLTAGE DIVIDER / PANEL V", value: "100k / 22k, CALIBRATED" },
        { label: "OLED 128x64 / STATUS", value: "I2C READOUT" },
      ],
      tables: [
        {
          id: "ComputeTier",
          title: "COMPUTE TIER / POWER BEHAVIOUR",
          rows: [
            { key: "PicoDormant", label: "PICO DORMANT (ALWAYS-ON)", value: "2.64 mW" },
            { key: "PicoActive", label: "PICO ACTIVE / SENSE CYCLE", value: "82.5 mW" },
            { key: "PiZeroInfer", label: "PI ZERO 2 W INFERENCE", value: "2250 mW" },
            { key: "StepperClean", label: "NEMA17 CLEANING", value: "4200 mW" },
            { key: "BrushClean", label: "JGA25-370 BRUSH", value: "1800 mW" },
            { key: "TotalDaily", label: "TOTAL AVERAGE DAILY", value: "217.0 mWh" },
          ],
        },
      ],
      diagrams: [{ id: "03", label: "POWER FLOW", aspect: "21:9" }],
    },
    {
      index: "04",
      title: "The ML",
      body: "Layer 1 computes a standardised Composite Soiling Index from five features, weighted by their discriminative power, and runs a one-sided lower CUSUM. Layer 2 is a gradient-boosted tree classifier trained only on Layer 1 triggered events, mirroring embedded operation.",
      mono: [
        {
          title: "COMPOSITE SOILING INDEX",
          lines: [
            "CSI = (SUM s_j * w_j * z_j) / (SUM w_j),  j = 1..5",
            "z_j = (x_j - mu_j) / sigma_j   # standardised feature",
            "w_j = |Cohen's d_j|           # discriminative power",
            "s_j = sign(clean_mean - dirty_mean)",
          ],
        },
        {
          title: "ONE-SIDED LOWER CUSUM",
          lines: [
            "S_i = min(0, S_(i-1) + z_i + k)",
            "alarm when S_i < H   ->   reset S_i = 0",
            "operating point: k = 0.50, H = -0.30",
            "sigma_CSI = 0.743973 (training data only)",
          ],
        },
        {
          title: "XGBOOST CONFIRMER",
          lines: [
            "200 trees, binary:logistic, 10 features",
            "max_depth 7, lr 0.1, subsample 0.8",
            "colsample_bytree 0.8, min_child_weight 3",
            "exported JSON, 359 KiB, embedded runtime",
          ],
        },
      ],
      ruled: [
        { label: "COHEN'S D SEPARATION", value: "0.045 -> 1.123 TRAIN / 0.846 TEST" },
        { label: "HUMIDITY DISCRIMINATION", value: "26x MORE THAN OLD SINGLE SIGNAL" },
        { label: "DATASET", value: "46,293 STATION-DAYS / 60 STATIONS / HK" },
      ],
      diagrams: [{ id: "04", label: "CSI CONSTRUCTION", aspect: "16:9" }],
    },
    {
      index: "05",
      title: "The Results",
      body: "The composite index lifted Layer 1 event recall from 29.4% to 87.3%, a 3.0x gain over the original single-signal CUSUM. Layer 2 confirms triggered events at 99.98% accuracy on the held-out triggered subset.",
      tables: [
        {
          id: "Results",
          title: "MEASURED RESULTS",
          rows: [
            { key: "XGBoostAccuracy", label: "XGBOOST ACCURACY (TRIGGERED SUBSET)", value: "99.98%" },
            { key: "XGBoostPrecision", label: "XGBOOST PRECISION", value: "0.998" },
            { key: "XGBoostRecall", label: "XGBOOST RECALL", value: "0.999" },
            { key: "XGBoostF1", label: "XGBOOST F1", value: "0.912" },
            { key: "CusumEventRecall", label: "CUSUM EVENT RECALL (COMPOSITE)", value: "87.3%" },
            { key: "CusumDayF1", label: "CUSUM DAY-LEVEL F1", value: "63.4%" },
            { key: "CusumFpr", label: "CUSUM FALSE ALARM RATE", value: "49.0%" },
            { key: "InferenceLatency", label: "ARM ON-DEVICE INFERENCE LATENCY", value: "380 ms", pending: true },
            { key: "FieldAccuracy", label: "REAL-WORLD FIELD ACCURACY (EKITI)", value: "94.2%", pending: true },
            { key: "CleanCycleEnergy", label: "CLEANING CYCLE ENERGY", value: "2.1 Wh", pending: true },
            { key: "BrushRPM", label: "BRUSH RPM UNDER LOAD", value: "60 RPM", pending: true },
          ],
        },
      ],
      diagrams: [{ id: "05", label: "RESULTS DASHBOARD", aspect: "16:9" }],
    },
    {
      index: "06",
      title: "The Limits",
      body: "The honest margins: single-day soiling events are structurally hard for CUSUM, the weights use a Cohen's d heuristic rather than an optimal inverse-variance scheme, and the model was trained on subtropical Hong Kong data, so Nigerian transferability needs threshold recalibration.",
      ruled: [
        { label: "SINGLE-DAY EVENTS", value: "33.8% OF EVENTS LAST 1 DAY" },
        { label: "NORMALISATION", value: "FLEET-WIDE BIAS, PER-STATION CALIBRATION TODO" },
        { label: "WEIGHTING", value: "COHEN'S D HEURISTIC, NOT OPTIMAL" },
        { label: "TRANSFERABILITY", value: "HK TRAINING, NG NOT YET VALIDATED" },
      ],
    },
    {
      index: "07",
      title: "The Paper",
      body: "The final year project report documents the architecture, hardware build, dataset methodology and results in full. A shareable link will be added when the report is published.",
    },
  ],
  links: {
    paper: null,
  },
  nextSlug: "traks",
};

// ---------------------------------------------------------------------------
// 02 / TRAKS: The Ops Console (Safety Red)
// ---------------------------------------------------------------------------
export const traksStudy: CaseStudy = {
  slug: "traks",
  accentClass: "case-red",
  kicker: "COMMUNITY SAFETY PLATFORM",
  title: "TRAKS",
  meta: "2024 / INCIDENT REPORTING + SOS / V2.3.0-STABLE",
  description:
    "A community-powered incident reporting and SOS platform. Users report incidents with their location, reverse geocoding enriches the report with address metadata, and the community collectively verifies reports instead of a centralized moderation team. Verified incidents become searchable by meaning through Cloudflare Vectorize.",
  hero: {
    field: "white",
    headlineMetrics: [
      { key: "VectorSearch", label: "VECTOR SEARCH", value: "<500ms" },
    ],
    heroDiagram: { id: "01", label: "HERO ARCHITECTURE", aspect: "16:9" },
  },
  sections: [
    {
      index: "01",
      title: "Overview",
      body: "TRAKS is built around three design goals that shape every screen: reporting must be low-barrier, verification must be community-driven, and past incidents must be findable by meaning rather than exact keywords.",
      ruled: [
        { label: "LOW-BARRIER REPORTING", value: "MINIMAL FRICTION + AUTO LOCATION" },
        { label: "COMMUNITY-DRIVEN VERIFICATION", value: "CONFIRM / REFUTE, NO MODERATOR" },
        { label: "SEMANTIC INCIDENT SEARCH", value: "BY MEANING, NOT KEYWORDS" },
      ],
    },
    {
      index: "02",
      title: "The Problem",
      body: "Safety information in a community is fragmented: incidents are reported in scattered channels, false reports dilute real ones, and historical incidents are nearly impossible to find later. TRAKS attacks all three: one low-friction flow, a trust-weighted verification layer, and vector search over verified incidents.",
    },
    {
      index: "03",
      title: "The Reporting Flow",
      body: "A report starts as coordinates and becomes a verified, searchable incident. Reverse geocoding enriches the raw location with address metadata before the report ever enters the verification queue.",
      flow: ["REPORT + COORDS", "REVERSE GEOCODE", "VERIFY QUEUE", "INDEX TO VECTORIZE"],
      diagrams: [{ id: "02", label: "REPORTING FLOW", aspect: "21:9" }],
    },
    {
      index: "04",
      title: "The SOS Channel",
      body: "The emergency path is deliberately separate: one button triggers an instant push from the edge, and nearby users receive a real-time alert with the location, mobilizing the response network within seconds.",
      ruled: [
        { label: "SOS ALERT DELIVERY", value: "<2s FROM TRIGGER (EDGE PUSH)" },
      ],
      diagrams: [{ id: "03", label: "SOS FLOW", aspect: "16:9" }],
    },
    {
      index: "05",
      title: "The Verification System",
      body: "No single moderator controls what gets flagged. Community members near an incident can confirm it, weighted by proximity and reputation; refutes with a reason automatically demote reports that cross the threshold, preventing misinformation spread.",
      matrix: [
        { label: "FALSE REPORTS", value: "COMMUNITY VERIFICATION / CONFIRM-REFUTE VOTING" },
        { label: "SPAM INCIDENTS", value: "REPUTATION WEIGHTING + RATE LIMITING" },
        { label: "OUTDATED INFORMATION", value: "AUTO DEMOTION AFTER REFUTE THRESHOLD" },
        { label: "LOCATION SPOOFING", value: "GEOLOCATION VALIDATION + PROXIMITY CHECKS" },
      ],
      diagrams: [{ id: "04", label: "VERIFICATION SYSTEM", aspect: "16:9" }],
    },
    {
      index: "06",
      title: "The Semantic Search",
      body: "Verified incidents are embedded and indexed into Cloudflare Vectorize. Queries match by cosine similarity over the global edge network, so users can assess whether a situation has been reported before in under 500ms.",
      ruled: [
        { label: "RETRIEVAL", value: "COSINE SIMILARITY ON VECTORIZE" },
      ],
      diagrams: [{ id: "05", label: "SEMANTIC SEARCH", aspect: "16:9" }],
    },
    {
      index: "07",
      title: "The Stack",
      body: "Edge logic, real-time data, and vector search sit on Cloudflare; FastAPI orchestrates the backend pipeline. The Flutter client is the Android-first app, confirmed in the portfolio design system.",
      tiles: [
        "FASTAPI",
        "CLOUDFLARE WORKERS",
        "FIREBASE AUTH",
        "FIRESTORE",
        "CLOUDFLARE VECTORIZE",
        "CLOUDFLARE R2",
        "PYTHON 3.11",
        "GEOLOCATION API",
        "FLUTTER CLIENT",
      ],
      tilesNote:
        "FLUTTER CLIENT: ANDROID-FIRST APP / CONFIRMED IN DESIGN-SYSTEM + OWNER (NOT OLD-SITE STACK GRID)",
    },
    {
      index: "08",
      title: "Performance",
      body: "Verified figures render as-is. Volume and latency numbers awaiting owner confirmation carry the PENDING mark.",
      tables: [
        {
          id: "Performance",
          title: "PERFORMANCE / SCALE",
          rows: [
            { key: "VectorSearch", label: "VECTOR SEARCH LATENCY", value: "<500 ms" },
            { key: "SosDelivery", label: "SOS ALERT DELIVERY", value: "<2s" },
            { key: "Users", label: "REGISTERED USERS", value: "5,200", pending: true },
            { key: "AlertsDelivered", label: "SOS ALERTS DELIVERED", value: "48,000+", pending: true },
            { key: "AlertDeliveryRate", label: "ALERT DELIVERY SUCCESS RATE", value: "99.2%", pending: true },
            { key: "DetectionLatency", label: "END-TO-END DETECTION LATENCY", value: "850 ms", pending: true },
            { key: "VotesCast", label: "CONFIRM / REFUTE VOTES CAST", value: "1.2M", pending: true },
            { key: "TimeToVerification", label: "AVG TIME TO VERIFICATION", value: "4 min", pending: true },
            { key: "EmbeddingDims", label: "EMBEDDING DIMENSION", value: "384 dims", pending: true },
            { key: "GeocodeHitRate", label: "REVERSE-GEOCODING HIT RATE", value: "97.4%", pending: true },
          ],
        },
      ],
    },
    {
      index: "09",
      title: "Links",
      body: "Live site and source links will be added when the owner confirms the URLs and repository.",
    },
  ],
  links: {
    live: null,
    github: null,
  },
  nextSlug: "engineering-hub",
};

// ---------------------------------------------------------------------------
// 03 / Engineering Hub: The Study Workbook (Study Violet)
// ---------------------------------------------------------------------------
export const engineeringHubStudy: CaseStudy = {
  slug: "engineering-hub",
  accentClass: "case-violet",
  kicker: "ADAPTIVE STUDY PLATFORM",
  title: "Engineering Hub",
  meta: "2024 / WEB + ANDROID / LIVE",
  description:
    "An adaptive study platform for engineering students. Uses Bayesian Knowledge Tracing and spaced repetition to schedule exactly what a student should see next: question banks, flashcards, quizzes, schedules and learning analytics in one mobile-first workflow.",
  hero: {
    field: "white",
  },
  sections: [
    {
      index: "01",
      title: "Overview",
      body: "Bayesian Knowledge Tracing plus spaced repetition, server-authoritative, shared across a React web SPA and a Flutter Android app over one Worker API. The platform is live: web and API run on Cloudflare, the Android app is in release builds.",
      ruled: [
        { label: "DEPARTMENTS", value: "9" },
        { label: "COURSES", value: "426" },
        { label: "QUESTIONS", value: "~142K" },
        { label: "ANDROID DOWNLOADS", value: "250" },
      ],
    },
    {
      index: "02",
      title: "The Problem",
      body: "The v1 heuristic combined Ebbinghaus curves with an HMM and was rejected as crude and not good at all. BKT replaced it because it is pedagogically validated, its P(L) is interpretable as mastery, its P(T) / P(S) / P(G) parameters are configurable per knowledge component, and it produces genuine spaced-repetition behavior: massed practice flattens mastery, spaced reviews grow stability.",
      ruled: [
        { label: "REJECTED", value: "EBBINGHAUS + HMM HEURISTIC" },
        { label: "SHIPPED", value: "4-PARAMETER BAYESIAN KNOWLEDGE TRACING" },
      ],
    },
    {
      index: "03",
      title: "The Product",
      body: "Four surfaces carry the study loop: searchable question banks with full answer explanations, flashcards built from the exact questions a student got wrong, an AI tutor that explains any card or question, and streaks that keep the habit.",
      ruled: [
        { label: "QUESTION BANKS", value: "MCQ + THEORY + CALCULATION, KATEX RENDERED" },
        { label: "FLASHCARDS", value: "WRONG ANSWERS RETURN SOONER, SM-2 EASE" },
        { label: "AI TUTOR", value: "GEMMA 4 31B, RATE LIMITED, 1024 TOKENS" },
        { label: "STREAKS", value: "DAILY ENGAGEMENT, CALENDAR VIEW" },
      ],
      diagrams: [{ id: "01", label: "FLASHCARD LIFECYCLE", aspect: "21:9" }],
    },
    {
      index: "04",
      title: "The Adaptive Engine",
      body: "Every graded answer updates a per-user knowledge state in D1 through a Durable Object. The BKT math is pure and stateless: P(L0) is the prior mastery, P(T) the learning transition, P(S) the slip probability, P(G) the guess probability. Stability S doubles on correct qualified reviews and halves on incorrect ones.",
      mono: [
        {
          title: "BKT PARAMETERS (DEFAULTS)",
          lines: [
            "P(L0) = 0.15   # prior mastery",
            "P(T)  = 0.12   # learning transition",
            "P(S)  = 0.10   # slip",
            "P(G)  = 0.25   # guess",
            "S0    = 1.0, S+ x2.0 on correct, S- x0.5 on incorrect",
          ],
        },
        {
          title: "INTERVAL + READINESS",
          lines: [
            "I = max(minSpacing, S * ln(P(L) / threshold))",
            "minSpacing = 0.25 days, threshold = 0.75",
            "R = P(L) * exp(-dt / S)   # review priority",
            "retention target = 0.8",
          ],
        },
      ],
      diagrams: [
        { id: "02", label: "ADAPTIVE GRADING FLOW", aspect: "16:9" },
        { id: "03", label: "BKT STATE MACHINE", aspect: "1:1" },
      ],
    },
    {
      index: "05",
      title: "The Architecture",
      body: "One Worker API serves both clients. Firebase Auth verifies the ID token, Firestore holds profiles and schedules, D1 is the authoritative learning store, and Gemini powers the assistant. The content pipeline generates questions from textbooks through OCR, chunking, embeddings and Gemini generation.",
      ruled: [
        { label: "WEB", value: "REACT 19 + VITE 8 + TS" },
        { label: "ANDROID", value: "FLUTTER, BLOC + GETX" },
        { label: "API", value: "CLOUDFLARE WORKER + DURABLE OBJECT" },
        { label: "DATA", value: "D1 (SQLITE) + FIRESTORE" },
        { label: "AI", value: "GEMINI /ASSISTANT" },
      ],
      diagrams: [
        { id: "04", label: "SYSTEM ARCHITECTURE", aspect: "16:9" },
        { id: "05", label: "CONTENT PIPELINE", aspect: "16:9" },
      ],
    },
    {
      index: "06",
      title: "Performance",
      body: "Three layers of caching keep the catalog reads cheap: Worker Cache-Control at the edge, one-year immutable asset caching, and a React Query layer with targeted invalidation. Usage numbers await owner confirmation.",
      ruled: [
        { label: "WORKER CACHE", value: "PUBLIC max-age=300 / CDN s-maxage 3600-86400" },
        { label: "ASSET CACHE", value: "1 YEAR IMMUTABLE" },
        { label: "REACT QUERY", value: "staleTime 5 / 2 / 1 min, INVALIDATE ON WRITE" },
      ],
      tables: [
        {
          id: "Performance",
          title: "SCALE / USAGE (PENDING)",
          rows: [
            { key: "RegisteredUsers", label: "REGISTERED USERS", value: "1,200", pending: true },
            { key: "QuestionsAnswered", label: "QUESTIONS ANSWERED (ALL TIME)", value: "310,000", pending: true },
            { key: "AssistantLatencyP50", label: "AI TUTOR RESPONSE LATENCY P50", value: "1.8 s", pending: true },
            { key: "MonthlyActiveUsers", label: "MONTHLY ACTIVE USERS", value: "340", pending: true },
            { key: "StreakRetention7d", label: "STREAK RETENTION (7-DAY)", value: "38%", pending: true },
            { key: "FlashcardsCreated", label: "FLASHCARDS CREATED", value: "18,500", pending: true },
            { key: "QuizCompletionRate", label: "QUIZ COMPLETION RATE", value: "72%", pending: true },
            { key: "AvgSessionMinutes", label: "AVG SESSION LENGTH", value: "14 min", pending: true },
          ],
        },
      ],
      diagrams: [{ id: "06", label: "CACHING LAYERS", aspect: "16:9" }],
    },
    {
      index: "07",
      title: "Lessons",
      body: "The hardest parts were the integrity decisions, not the features.",
      ruled: [
        { label: "SERVER-AUTHORITATIVE GRADING", value: "NO ANSWER KEYS SHIPPED; NO OPTIMISTIC UI" },
        { label: "MASSED-PRACTICE GUARD", value: "S ONLY GROWS ON QUALIFIED REVIEWS" },
        { label: "D1 500MB CONSTRAINT", value: "rag_sources DROPPED TO STAY UNDER LIMIT" },
        { label: "REVIEW BUFFER BUG", value: "10-MIN HARDCODE -> 0.25-DAY MINIMUM" },
        { label: "CREDENTIAL HYGIENE", value: "R2 KEYS STRIPPED, UPLOADS RETIRED" },
        { label: "DEDUP BY ID", value: "DUPLICATE attemptId RETURNS CACHED RESULT" },
      ],
    },
    {
      index: "08",
      title: "Links",
      body: "Web and API are live on Cloudflare. The repository link will be added when the owner confirms it is public.",
    },
  ],
  links: {
    live: "https://engineeringhub.nuesaabuad.ng/",
    playstore: "https://play.google.com/store/apps/details?id=com.engineeringhub.engineeringhub&pcampaignid=web_share",
    api: "https://engineeringhub-api.nasurf25.workers.dev",
    github: null,
  },
  nextSlug: "elegant-radiance-luxe",
};

// ---------------------------------------------------------------------------
// 04 / Elegant Radiance Luxe: Hybrid Cloud E-Commerce (Luxury Rose)
// ---------------------------------------------------------------------------
export const elegantRadianceStudy: CaseStudy = {
  slug: "elegant-radiance-luxe",
  accentClass: "case-rose",
  kicker: "HYBRID CLOUD E-COMMERCE DOSSIER",
  title: "Elegant Radiance Luxe",
  meta: "2024 / 2025 / SINGLE-VENDOR COMMERCE / CLOUD RUN + CLOUDFLARE D1",
  description:
    "A zero-maintenance, single-vendor luxury beauty e-commerce platform built on a hybrid cloud topology. A Python FastAPI monolith on Google Cloud Run handles business logic and Paystack verification, while an authenticated TypeScript Data Worker interfaces natively with Cloudflare D1 SQL, and an asynchronous Cloudflare Queue and Images pipeline processes high-resolution product media.",
  hero: {
    field: "white",
    versionBadge: "V4.0-PRODUCTION",
    headlineMetrics: [
      { key: "InfraCost", label: "BASELINE INFRA COST", value: "$0.00 / MO" },
      { key: "ReservationPolicy", label: "INVENTORY RESERVATION", value: "1-HOUR ATOMIC" },
      { key: "PaymentSecurity", label: "PAYSTACK WEBHOOK", value: "HMAC-SHA512" },
    ],
  },
  sections: [
    {
      index: "01",
      title: "The Hybrid Topology",
      body: "The store separates business logic from persistence and media via a multi-cloud boundary: Google Cloud Run hosts the containerized FastAPI application with zero-scale economics and 60-minute execution headroom; Cloudflare D1 provides the relational SQL source of truth; Cloudflare R2 and Queues handle asynchronous image transformations without consuming Cloud Run compute.",
      flow: [
        "REACT STOREFRONT",
        "FASTAPI / CLOUD RUN",
        "AUTH D1 DATA WORKER",
        "CLOUDFLARE D1 SQL",
        "PAYSTACK GATEWAY",
      ],
      chips: ["FASTAPI", "CLOUD RUN", "CLOUDFLARE D1", "R2 STORAGE", "QUEUES", "PAYSTACK", "FIREBASE"],
    },
    {
      index: "02",
      title: "The D1 Data Worker Boundary",
      body: "Cloud Run cannot bind natively to Cloudflare D1. Rather than exposing a raw SQL endpoint or relying on the rate-limited D1 REST control-plane API, an internal authenticated TypeScript Data Worker exposes coarse-grained domain operations with HMAC-SHA256 request signatures, timestamps, and replay validation.",
      ruled: [
        { label: "PROTOCOL", value: "INTERNAL HTTPS + SIGNED COARSE COMMANDS" },
        { label: "SIGNATURE", value: "HMAC-SHA256 WITH SHORT REPLAY WINDOW" },
        { label: "DATA BOUNDARY", value: "ZERO RAW SQL EXPOSURE ACROSS PROVIDERS" },
        { label: "QUERY EFFICIENCY", value: "SINGLE RPC PER COMMERCE USE-CASE" },
      ],
      mono: [
        {
          title: "COARSE-GRAINED RPC CONTRACT",
          lines: [
            "POST /v1/checkout/create-and-reserve",
            "POST /v1/checkout/commit-payment",
            "POST /v1/checkout/release-expired",
            "GET  /v1/catalog/storefront",
          ],
        },
        {
          title: "REQUEST AUTHENTICATION HEADERS",
          lines: [
            "X-ERL-Signature: <hmac-sha256-hex>",
            "X-ERL-Timestamp: <iso-8601-unix>",
            "X-ERL-Request-Id: <uuidv4-nonce>",
            "X-ERL-Body-Digest: <sha256-payload>",
          ],
        },
      ],
    },
    {
      index: "03",
      title: "Atomic Stock Reservation & 1-Hour Hold",
      body: "To prevent overselling without distributed database locking, stock reservations execute as single conditional SQL updates that verify available stock and increment reserved units in one atomic step. Checkouts maintain a deterministic 1-hour reservation window with automatic reconciliation.",
      ruled: [
        { label: "RESERVATION WINDOW", value: "FIXED 1 HOUR FROM CHECKOUT CREATION" },
        { label: "RACE CONDITION PREVENTION", value: "ATOMIC CONDITIONAL UPDATE + AFFECTED ROWS" },
        { label: "EARLY RELEASE", value: "TRIGGERED ON VERIFIED PAYMENT FAILURE" },
        { label: "LATE PAYMENT EXCEPTION", value: "GRACEFUL PAYMENT_REVIEW ROUTING" },
      ],
      mono: [
        {
          title: "ATOMIC CONDITIONAL RESERVATION QUERY",
          lines: [
            "UPDATE inventory",
            "SET reserved_quantity = reserved_quantity + ?",
            "WHERE variant_id = ?",
            "  AND (stock_quantity - reserved_quantity) >= ?;",
            "-- rows_affected === 0 triggers atomic compensation rollback",
          ],
        },
        {
          title: "INVENTORY LIFECYCLE TRANSITIONS",
          lines: [
            "RESERVE:  reserved_quantity += QTY",
            "RELEASE:  reserved_quantity -= QTY",
            "COMMIT:   stock_quantity -= QTY, reserved_quantity -= QTY",
          ],
        },
      ],
    },
    {
      index: "04",
      title: "Paystack Verification & Payment State Machine",
      body: "Payment confirmation combines asynchronous signed webhooks with server-side API verification. The webhook handler verifies raw request bytes with HMAC-SHA512 before JSON parsing, guaranteeing tamper-proof execution. A durable outbox pattern ensures customer notifications fire reliably after database commit.",
      matrix: [
        {
          label: "WEBHOOK TIMEOUT",
          value: "FASTAPI CONFIRMS IDEMPOTENTLY BEFORE QUEUING NOTIFICATIONS",
        },
        {
          label: "DUPLICATE WEBHOOK",
          value: "UNIQUE PROVIDER EVENT KEYS PREVENT DOUBLE-COMMIT",
        },
        {
          label: "LATE SUCCESSFUL CHARGE",
          value: "RE-CHECKS PHYSICAL INVENTORY; MOVES TO MANUAL REVIEW IF STOCK DEPLETED",
        },
        {
          label: "CALLBACK INTERRUPT",
          value: "SERVER-SIDE VERIFY API FALLBACK RECOVERS ORDER ON BUYER RETURN",
        },
      ],
    },
    {
      index: "05",
      title: "Two-Tier Asynchronous Media Pipeline",
      body: "Product images are uploaded directly from the vendor's browser to a private R2 staging bucket via short-lived presigned authorizations. A Cloudflare Queue triggers a lightweight Image Worker that resizes, optimizes, and encodes WebP assets using native Cloudflare Images bindings, writing outputs to the production R2 bucket.",
      ruled: [
        { label: "ORIGINAL UPLOAD", value: "DIRECT BROWSER-TO-R2 VIA PRESIGNED URL" },
        { label: "IMAGE PROCESSING", value: "CLOUDFLARE IMAGES BINDING (WEBP / RESIZE)" },
        { label: "COMPUTE CONSUMPTION", value: "ZERO CLOUD RUN CPU USED FOR MEDIA ENCODING" },
        { label: "EDGE CACHING", value: "GLOBAL CLOUDFLARE CDN CACHE RULES" },
      ],
    },
    {
      index: "06",
      title: "Guest Privacy & Storefront Security",
      body: "Buyers check out as guests without compulsory account creation. Minimal order status lookup uses cryptographically random, high-entropy public order references rather than sequential IDs, preventing enumeration attacks and protecting buyer contact details and delivery addresses.",
      ruled: [
        { label: "BUYER AUTH", value: "GUEST CHECKOUT (NO COMPULSORY ACCOUNTS)" },
        { label: "ADMIN AUTH", value: "FIREBASE AUTHENTICATION (VENDOR ONLY)" },
        { label: "PUBLIC TRACKING", value: "HIGH-ENTROPY OPAQUE REFERENCE" },
        { label: "PII SANITIZATION", value: "PUBLIC STATUS REDACTS SENSITIVE DATA" },
      ],
    },
    {
      index: "07",
      title: "Reliability, Reconciliation & Cost",
      body: "At baseline volume (300 monthly visitors / 12,000 requests), the hybrid infrastructure runs at $0.00/month by operating comfortably within the free allowances of Google Cloud Run, Cloudflare D1, R2, Queues, and Firebase. A scheduled reconciliation cron cleans abandoned checkouts and checks dangling transactions.",
      ruled: [
        { label: "CLOUD RUN FREE TIER", value: "2,000,000 REQUESTS / MONTH" },
        { label: "CLOUDFLARE D1 FREE TIER", value: "5,000,000 ROWS READ / DAY" },
        { label: "R2 STORAGE FREE TIER", value: "10 GB STORAGE, 1M CLASS A WRITES" },
        { label: "INFRASTRUCTURE COST", value: "$0.00 / MONTH AT BASELINE TRAFFIC" },
      ],
    },
    {
      index: "08",
      title: "Links",
      body: "The online storefront is live with full catalog browsing, cart, and Paystack integration.",
    },
  ],
  links: {
    live: "https://elegantradianceluxe.com/",
    github: null,
  },
  nextSlug: "rag-data-pipeline",
};

// ---------------------------------------------------------------------------
// 05 / RAG Data Pipeline: The Pipeline Manifest (Electric Cyan)
// ---------------------------------------------------------------------------
export const ragStudy: CaseStudy = {
  slug: "rag-data-pipeline",
  accentClass: "case-cyan",
  kicker: "AI INFRASTRUCTURE MANIFEST",
  title: "RAG Data Pipeline",
  meta: "2025 / INGESTION + RETRIEVAL / V1.4.2-STABLE",
  description:
    "A high-throughput, semantically aware ingestion engine designed for deterministic RAG at scale. 2,000+ PDFs become 1M+ semantic chunks through hybrid OCR and BGE-M3 embeddings, and retrieval is deliberately scoped to known domains so AI output stays reproducible.",
  hero: {
    field: "ink",
    versionBadge: "V1.4.2-STABLE",
    headlineMetrics: [
      { key: "SemanticChunks", label: "SEMANTIC CHUNKS", value: "1M+" },
      { key: "PdfsIngested", label: "PDFS INGESTED", value: "2,000+" },
    ],
    heroDiagram: { id: "01", label: "HERO ARCHITECTURE", aspect: "21:9" },
  },
  sections: [
    {
      index: "01",
      title: "Overview",
      body: "Three design goals govern the pipeline: accuracy over breadth, cost awareness, and determinism. The engine strictly reflects only uploaded academic materials, minimizes repeated embedding and token usage via caching, and ensures reproducible AI outputs for consistency.",
      ruled: [
        { label: "ACCURACY OVER BREADTH", value: "STRICTLY UPLOADED ACADEMIC MATERIALS" },
        { label: "COST AWARENESS", value: "CHUNK-LEVEL HASH CACHING" },
        { label: "DETERMINISTIC", value: "REPRODUCIBLE AI OUTPUTS" },
      ],
    },
    {
      index: "02",
      title: "The Problem",
      body: "Naive chatbots hallucinate, return different answers for the same question, and burn tokens re-embedding the same documents. The pipeline treats AI as stable infrastructure rather than an unpredictable chatbot: scoped retrieval, deterministic generation, and caching that makes multi-versioned documents cheap to re-ingest.",
    },
    {
      index: "03",
      title: "Phase A / Ingestion",
      body: "Documents are normalized before they ever reach an embedding model: OpenCV detects and corrects page orientation, a bi-stage OCR tier handles tables and low-resolution scans, and text is chunked and embedded with local caching.",
      flow: [
        "PDF",
        "OPENCV ORIENTATION",
        "BI-STAGE OCR",
        "NORMALIZE",
        "CHUNK",
        "BGE-M3 EMBED",
        "VECTOR DB + FIRESTORE",
      ],
      diagrams: [{ id: "02", label: "PHASE A INGESTION", aspect: "21:9" }],
    },
    {
      index: "04",
      title: "Phase B / Retrieval",
      body: "Queries are scoped by metadata before semantic search, context is deduplicated and trimmed to a token budget, and generation is controlled by JSON schema templates.",
      flow: [
        "QUERY",
        "METADATA-FILTERED SEARCH",
        "DEDUP CONTEXT ASSEMBLY",
        "TOKEN TRIM",
        "JSON-SCHEMA GENERATION",
      ],
      diagrams: [{ id: "03", label: "PHASE B RETRIEVAL", aspect: "21:9" }],
    },
    {
      index: "05",
      title: "The OCR Tier",
      body: "A bi-stage decision: lightweight EasyOCR takes the fast path, and low-confidence text (complex tables, math notation, low-resolution scans) falls through to a Gemma 3:27b fallback. Orientation correction happens first so skewed pages never poison the pipeline.",
      diagrams: [{ id: "04", label: "BI-STAGE OCR DECISION", aspect: "1:1" }],
    },
    {
      index: "06",
      title: "The Determinism",
      body: "Generation is locked at temperature 0.0 with specialized seeding, and chunk-level hashes make identical chunk IDs across shards for the same source material. The same cache also blocks redundant embedding calls, reducing pipeline cost by up to 70% for multi-versioned documents.",
      ruled: [
        { label: "TEMPERATURE", value: "0.0 (LOCKED)" },
        { label: "CHUNK IDS", value: "IDENTICAL ACROSS SHARDS FOR SAME SOURCE" },
        { label: "COST REDUCTION", value: "UP TO 70% FOR MULTI-VERSIONED DOCS" },
      ],
      diagrams: [
        { id: "05", label: "DETERMINISM MECHANISM", aspect: "16:9" },
        { id: "06", label: "COST-EFFICIENCY FLOW", aspect: "16:9" },
      ],
    },
    {
      index: "07",
      title: "Performance",
      body: "The headline scale figures are confirmed. Latency percentiles and throughput await owner measurement.",
      tables: [
        {
          id: "Performance",
          title: "PERFORMANCE / SCALE",
          rows: [
            { key: "PdfsProcessed", label: "PDFS PROCESSED", value: "2,000+" },
            { key: "SemanticChunks", label: "SEMANTIC CHUNKS", value: "1M+" },
            { key: "SearchLatency", label: "SEARCH LATENCY (AGGREGATE)", value: "<2s" },
            { key: "IngestionThroughput", label: "INGESTION THROUGHPUT", value: "12,000 PDFS/DAY", pending: true },
            { key: "ChunkGenerationRate", label: "CHUNK GENERATION RATE", value: "4,500 / MIN", pending: true },
            { key: "QueryLatencyP50", label: "QUERY LATENCY P50", value: "850 ms", pending: true },
            { key: "QueryLatencyP95", label: "QUERY LATENCY P95", value: "1,900 ms", pending: true },
            { key: "EndToEndAnswerTime", label: "END-TO-END ANSWER TIME", value: "3.2 s", pending: true },
            { key: "RecallAt5", label: "CHUNK RETRIEVAL RECALL@5", value: "91%", pending: true },
            { key: "RetrievalPrecision", label: "CHUNK RETRIEVAL PRECISION", value: "87%", pending: true },
            { key: "OcrFallbackThreshold", label: "OCR FALLBACK CONFIDENCE THRESHOLD", value: "0.80", pending: true },
            { key: "EmbeddingCacheHitRate", label: "EMBEDDING CACHE HIT RATE", value: "34%", pending: true },
            { key: "VectorIndexSize", label: "VECTOR INDEX SIZE", value: "1.2 GB", pending: true },
            { key: "MonthlyApiCost", label: "MONTHLY API COST", value: "$45 USD", pending: true },
          ],
        },
      ],
    },
    {
      index: "08",
      title: "Failure Modes",
      body: "Every failure mode has a designed mitigation, mapped explicitly rather than left to the model.",
      matrix: [
        { label: "HALLUCINATED CONTENT", value: "STRICT CONTEXT SCOPING + DOMAIN-BOUNDED SEARCH" },
        { label: "TRUNCATED OUTPUTS", value: "DETECTION LOGIC + RECURSIVE PROMPT REDUCTION" },
        { label: "INVALID JSON SCHEMA", value: "MULTI-STAGE SANITIZATION + REPAIR PIPELINE" },
        { label: "TOKEN OVERFLOW", value: "METADATA-WEIGHTED PRIORITY CONTEXT TRIMMING" },
      ],
    },
    {
      index: "09",
      title: "Links",
      body: "Live deployment and repository links will be added when the owner confirms the URLs.",
    },
  ],
  links: {
    live: null,
    github: null,
  },
  nextSlug: "nuesa-academia",
};

// ---------------------------------------------------------------------------
// 05 / NUESA Academia: The Library Index (Institutional Green)
// ---------------------------------------------------------------------------
export const nuesaStudy: CaseStudy = {
  slug: "nuesa-academia",
  accentClass: "case-green",
  kicker: "INSTITUTIONAL STUDY MATERIALS",
  title: "NUESA Academia",
  meta: "2024 / 2025 / DIGITAL TEXTBOOK REPOSITORY / LIVE",
  description:
    "The digital textbook, handout and past-question repository of the NUESA chapter at ABUAD. Search, upload, management and coverage analytics over a portable FastAPI boundary and a private Cloudflare data service.",
  hero: {
    field: "white",
    headlineMetrics: [
      { key: "Departments", label: "DEPARTMENTS", value: "9" },
      { key: "Courses", label: "COURSES", value: "426" },
      { key: "Pdfs", label: "PDFS", value: "2,111" },
    ],
  },
  sections: [
    {
      index: "01",
      title: "Overview",
      body: "A FastAPI public API, a private Cloudflare Worker that owns every SQL and object access, D1 for relational data and R2 for immutable PDF objects. Students search by keyword, level, department, semester and course code; past questions live in a first-class PQ mode; admins track syllabus coverage across the faculty.",
    },
    {
      index: "02",
      title: "The Problem",
      body: "Study materials were scattered: handouts lived in group chats and personal drives, there was no central repository, and nobody could see which of the 426 syllabus courses actually had published materials. The platform centralizes search, upload and coverage in one place.",
    },
    {
      index: "03",
      title: "The Platform",
      body: "Four surfaces cover the workflow: search across the whole repository, a dedicated past-question mode, direct-to-edge PDF upload, and coverage analytics that expose underserved courses.",
      ruled: [
        { label: "SEARCH", value: "KEYWORD + LEVEL + DEPT + SEMESTER + COURSE" },
        { label: "PQ MODE", value: "PAST-QUESTION ARCHIVES, TOGGLABLE" },
        { label: "UPLOAD", value: "SINGLE-PDF MULTIPART STRAIGHT TO EDGE" },
        { label: "ANALYTICS", value: "COVERAGE %, BUCKETS, HEATMAP, ORPHANS" },
      ],
    },
    {
      index: "04",
      title: "The Architecture",
      body: "The same ASGI app runs as a Uvicorn container or a Cloudflare Python Worker. The data Worker is reachable only through signed internal calls, except the deliberate exception of the public upload path, because large multipart bodies are unreliable in the Python Worker runtime.",
      ruled: [
        { label: "PUBLIC API", value: "FASTAPI, DUAL RUNTIME (CONTAINER / WORKER)" },
        { label: "DATA SERVICE", value: "TYPESCRIPT WORKER, OWNS D1 + R2" },
        { label: "AUTH", value: "FIREBASE ID TOKENS + HMAC-SHA256 INTERNAL" },
        { label: "ANALYTICS CACHE", value: "CLOUDFLARE CACHE API, 5 MIN" },
      ],
      diagrams: [
        { id: "01", label: "SYSTEM ARCHITECTURE", aspect: "16:9" },
        { id: "02", label: "DATA MODEL", aspect: "16:9" },
        { id: "03", label: "MIGRATION FLOW", aspect: "21:9" },
      ],
    },
    {
      index: "05",
      title: "The Upload Pipeline",
      body: "Ten steps from browser to published, with every guard in place: origin check, size precheck, idempotency, Firebase verification, file validation including magic bytes, SHA-256 checksum at ingress, course-scoped dedup, R2 put, publish with audit event, and analytics cache bust.",
      flow: [
        "ORIGIN CHECK",
        "MULTIPART",
        "IDEMPOTENCY",
        "FIREBASE",
        "VALIDATION",
        "SHA-256",
        "D1 UPLOADING",
        "R2 PUT",
        "PUBLISHED",
        "CACHE BUST",
      ],
      diagrams: [{ id: "04", label: "UPLOAD PIPELINE", aspect: "21:9" }],
    },
    {
      index: "06",
      title: "Coverage and Analytics",
      body: "The repository is measured against the full ABUAD engineering syllabus: 426 courses across 9 departments and 5 levels, with 2,111 PDF objects (about 13.8 GB) migrated and independently verified. Analytics are cached for five minutes and invalidated on every mutation.",
      ruled: [
        { label: "DEPARTMENTS", value: "9 (AAE, BME, CHE, CVL, COE, EEE, MEE, MCT, PTE)" },
        { label: "SYLLABUS COURSES", value: "426 / LEVELS 100-500" },
        { label: "PDF OBJECTS", value: "2,111 / ~13.8 GB MIGRATED" },
        { label: "UPLOAD CAP", value: "25 MiB / COURSE-SCOPED DEDUP" },
      ],
      shelf: [
        "AAE",
        "BME",
        "CHE",
        "CVL",
        "COE",
        "EEE",
        "MEE",
        "MCT",
        "PTE",
        "100 / 200 / 300 / 400 / 500",
      ],
      diagrams: [
        { id: "05", label: "SEARCH FLOW", aspect: "16:9" },
        { id: "06", label: "ANALYTICS FLOW", aspect: "16:9" },
        { id: "07", label: "COVERAGE HEATMAP", aspect: "16:9" },
      ],
    },
    {
      index: "07",
      title: "Performance",
      body: "Verified constraints render as-is. Live usage and latency figures await owner measurement.",
      tables: [
        {
          id: "Performance",
          title: "PERFORMANCE / USAGE (PENDING)",
          rows: [
            { key: "MonthlyActiveStudents", label: "MONTHLY ACTIVE STUDENTS", value: "950", pending: true },
            { key: "PdfsProcessedPerDay", label: "PDFS PROCESSED PER DAY", value: "40", pending: true },
            { key: "SearchLatencyP95", label: "SEARCH LATENCY P95", value: "320 ms", pending: true },
            { key: "OcrThroughput", label: "OCR THROUGHPUT", value: "12 PDFS/HR", pending: true },
            { key: "UploadSuccessRate", label: "UPLOAD SUCCESS RATE", value: "99.2%", pending: true },
            { key: "AnalyticsCacheHitRate", label: "ANALYTICS CACHE HIT RATE", value: "85%", pending: true },
            { key: "MonthlySearchQueries", label: "MONTHLY SEARCH QUERIES", value: "18,000", pending: true },
            { key: "Uptime90d", label: "UPTIME (90 DAYS)", value: "99.9%", pending: true },
            { key: "PageLoad", label: "PAGE LOAD (SPA, CDN)", value: "1.4 s", pending: true },
            { key: "ActiveContributors", label: "ACTIVE CONTRIBUTORS / UPLOADERS", value: "25", pending: true },
          ],
        },
      ],
    },
    {
      index: "08",
      title: "Trade-offs",
      body: "The honest list: the search is LIKE-based with no full-text index, deploys are manual by design with no CI/CD, roles are scaffolded but every authenticated user currently gets full access, and the analytics staleness of five minutes is accepted.",
      ruled: [
        { label: "SEARCH", value: "LIKE-BASED, NO RELEVANCE RANKING, NO COUNT" },
        { label: "DEPLOYS", value: "MANUAL BY DESIGN, NO CI/CD" },
        { label: "ROLES", value: "SCAFFOLDED, FULL ACCESS FOR NOW" },
        { label: "AUTH WALL", value: "ZERO PUBLIC CONTENT TODAY" },
        { label: "CACHE", value: "5-MIN STALENESS ACCEPTED" },
      ],
    },
    {
      index: "09",
      title: "Links",
      body: "The platform and API are live. The repository link will be added when the owner confirms it is public.",
    },
  ],
  links: {
    live: "https://academia.nuesaabuad.ng",
    api: "https://api.academia.nuesaabuad.ng",
    github: null,
  },
  nextSlug: "awun",
};

// ---------------------------------------------------------------------------
// 06 / AWUN: The Technical Documentary (Terracotta)
// ---------------------------------------------------------------------------
export const awunStudy: CaseStudy = {
  slug: "awun",
  accentClass: "case-terracotta",
  kicker: "AI SOCIAL COMMERCE / THE CAPSTONE",
  title: "AWUN",
  meta: "2025 / 2026 / VENDOR-FIRST SOCIAL COMMERCE / LIVE",
  description:
    "AI social commerce for Nigerian side-hustle sellers. A vendor manages a catalog, generates checkout links, shares them over WhatsApp, and the buyer pays on a public no-login page via Paystack. Storefront creation by machine intelligence, payments verified, inventory managed, all inside chat. AWUN publishes system facts only; no user metrics.",
  hero: {
    field: "white",
  },
  sections: [
    {
      index: "CH. 01",
      title: "The System",
      body: "AWUN is vendor-first: no marketplace listings, no buyer accounts. The vendor runs everything from one dashboard: catalog, checkout links, orders, settings. Three rules never regress: money is in kobo across the entire stack, out-of-stock blocks checkout link creation with HTTP 409, and link creation reserves stock while payment consumes it and cancel releases it.",
      ruled: [
        { label: "MONEY", value: "MINOR UNITS (KOBO) EVERYWHERE" },
        { label: "OUT-OF-STOCK", value: "HTTP 409 OUT_OF_STOCK" },
        { label: "RESERVATION", value: "RESERVE ON LINK, CONSUME ON PAY, RELEASE ON CANCEL" },
      ],
      chips: ["NEW", "PROCESSING", "FULFILLED", "CANCELLED"],
      diagrams: [
        { id: "01", label: "SYSTEM ARCHITECTURE", aspect: "16:9" },
        { id: "02", label: "ORDER STATE MACHINE", aspect: "1:1" },
      ],
    },
    {
      index: "CH. 02",
      title: "The Marketplace",
      body: "There is no cart. The flow is link-first: the vendor picks a product or enters an ad-hoc item, a checkout link is created with stock reserved, the vendor shares it over WhatsApp (copy link, templated message, or wa.me deep link), the buyer pays on Paystack, a webhook or verify marks the checkout paid, an order is created, and funds settle to the vendor through their own subaccount.",
      flow: [
        "VENDOR PICKS",
        "LINK + STOCK RESERVED",
        "WHATSAPP SHARE",
        "BUYER PAYS",
        "WEBHOOK / VERIFY",
        "ORDER",
        "PAYOUT",
      ],
      diagrams: [{ id: "03", label: "MARKETPLACE FLOW", aspect: "21:9" }],
    },
    {
      index: "CH. 03",
      title: "The Intelligence Layer",
      body: "Multimodal search fuses text and image into one 256-dimension vector, manually L2-normalized because the embedding model does not auto-normalize below 3072 dimensions. The index self-heals on boot: a deleted index is recreated, a dimension mismatch triggers delete and recreate. CSV ingestion uses Gemma 4 26B to map columns, infer types and flag junk, with a spreadsheet-like draft review.",
      ruled: [
        { label: "EMBEDDING", value: "GEMINI 256-DIM, L2 NORMALIZED" },
        { label: "FUSION", value: "TEXT + IMAGE AVERAGED AND RE-NORMALIZED" },
        { label: "ACCURACY", value: "MTEB 66.19 @ 256 vs 68.17 @ 1536" },
        { label: "SELF-HEALING", value: "INDEX RECREATED ON BOOT" },
      ],
      diagrams: [
        { id: "04", label: "SEARCH PIPELINE", aspect: "16:9" },
        { id: "05", label: "DATA MODEL", aspect: "16:9" },
      ],
    },
    {
      index: "CH. 04",
      title: "The Infrastructure",
      body: "One home stack: FastAPI on Cloud Run, D1 for relational data, R2 for images, Vectorize for search, Firebase for identity, Paystack for payments, Resend for email. Because the D1 gateway makes one HTTP round trip per SQL statement, statement count is latency: the query budgets below were measured and are enforced by tests.",
      flow: ["CLIENT", "API", "WORKER", "D1 / R2"],
      tables: [
        {
          id: "StatementBudget",
          title: "D1 STATEMENT BUDGETS (BEFORE -> AFTER)",
          rows: [
            { key: "DashboardLoad", label: "DASHBOARD LOAD (3 CALLS -> 1)", value: "23-24 -> 10" },
            { key: "InventoryList", label: "INVENTORY LIST, 20 PRODUCTS", value: "62 -> 5" },
            { key: "PaystackWebhook", label: "PAYSTACK WEBHOOK, NEW PAYMENT", value: "14 -> 12" },
            { key: "VerifyPaidCommit", label: "VERIFY PAID-COMMIT", value: "13 -> 10" },
          ],
        },
      ],
      ruled: [
        { label: "COST AT LAUNCH", value: "~$0-2 / MONTH" },
        { label: "COST AT 500 VENDORS", value: "~$2-15 / MONTH" },
        { label: "COST AT 5,000 VENDORS", value: "~$15-65 / MONTH" },
        { label: "CLOUD RUN", value: "minScale 0 / maxScale 3 / 512 MiB" },
      ],
      diagrams: [
        { id: "06", label: "STATEMENT BUDGET CHART", aspect: "16:9" },
        { id: "07", label: "COST CURVE", aspect: "16:9" },
        { id: "08", label: "WEBHOOK SEQUENCE", aspect: "16:9" },
      ],
    },
    {
      index: "CH. 05",
      title: "The Difficult Parts",
      body: "The documented trade-offs are the real product. Each one cost real debugging time and shipped with a guard so it does not regress.",
      ruled: [
        { label: "VECTOR SEARCH SILENT DEGRADATION", value: "INDEX WAS 410; SEARCH RAN FALLBACK, INVISIBLY" },
        { label: "EMBEDDING DIMENSION TRADE-OFF", value: "256 DIMS VS 10x COST AT 3072" },
        { label: "PAYMENT CANCELLATION TRAPS", value: "NULL paystack_url TREATED AS SUCCESS; ONE-SHOT CLAIM" },
        { label: "WEBHOOK / VERIFY RACE", value: "changes=0 GUARD PREVENTS DOUBLE ORDERS" },
        { label: "CROSS-VENDOR CACHE PII LEAK", value: "60s CACHE SURVIVED 401 LOGOUT; CLEARED ON EVERY PATH" },
        { label: "INGESTION ALL-OR-NOTHING", value: "ONE BAD ROW FAILED THE WHOLE IMPORT" },
        { label: "SPA HARD-RELOAD REGRESSION", value: "SEO 404.html BROKE RELOADS; MIDDLEWARE RE-EMITS" },
      ],
    },
  ],
  links: {
    live: "https://www.awun.dev",
    checkout: "https://checkout.awun.dev",
    api: "https://api.awun.dev",
    github: null,
  },
  nextSlug: "soiling-detection",
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "soiling-detection": soilingStudy,
  traks: traksStudy,
  "engineering-hub": engineeringHubStudy,
  "elegant-radiance-luxe": elegantRadianceStudy,
  "rag-data-pipeline": ragStudy,
  "nuesa-academia": nuesaStudy,
  awun: awunStudy,
};
