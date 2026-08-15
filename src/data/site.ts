// Verified content for the Swiss portfolio homepage.
// Every number here is real and confirmed. See docs/DESIGN-SYSTEM.md section 7.
// Do not add figures that are not in this module.

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Workbench", href: "#workbench" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// About (3.3): one direct statement. His words, polished. No metadata rows.
export const ABOUT_STATEMENT = [
  "My name is Dauda Nasir. I'm an Electrical and Electronics Engineering graduate and a software developer.",
  "I build products. I'm a product-minded developer.",
];

export type Tool = {
  name: string;
  tags: string[];
  note: string;
  status: string;
};

export const TOOLS: Tool[] = [
  {
    name: "Python",
    tags: ["BACKEND", "AI", "DATA"],
    note: "The workhorse behind the AI systems here. The RAG pipeline that turned 2,000+ PDFs into 1M+ semantic chunks is Python end to end.",
    status: "ACTIVE TOOL",
  },
  {
    name: "Flutter",
    tags: ["CROSS-PLATFORM"],
    note: "Android-first clients for Engineering Hub, TRAKS, and NUESA Academia. One codebase, shipped to real users.",
    status: "PRODUCTION",
  },
  {
    name: "FastAPI",
    tags: ["HIGH-PERFORMANCE APIS"],
    note: "Async, typed, measurable. Every API in this portfolio runs on it, including TRAKS vector search that answers in under 500ms.",
    status: "PRODUCTION",
  },
  {
    name: "Cloudflare / GCP",
    tags: ["INFRASTRUCTURE"],
    note: "Edge and cloud that stay cheap: Workers, R2, D1, Cloud Run. The NUESA worker is 461 lines and streams PDFs straight to R2.",
    status: "PRODUCTION",
  },
  {
    name: "AI Systems",
    tags: ["AGENTS", "EMBEDDINGS"],
    note: "Agents and embeddings in production: hybrid OCR transcription, semantic search over 1M+ chunks, and AWUN storefront intelligence.",
    status: "ACTIVE TOOL",
  },
];

export type Metric = {
  value: string;
  label: string;
};

export type ProjectEntry = {
  id: string;
  year: string;
  title: string;
  line: string;
  metrics: Metric[];
  subLine?: string;
  tags: string[];
  href: string;
  variant: "small" | "medium" | "large" | "compact" | "chapter";
  visual?: { src: string; alt: string; caption: string };
};

export const PROJECTS: ProjectEntry[] = [
  {
    id: "soiling",
    year: "2024",
    title: "Soiling Detection System",
    line: "Embedded AI that keeps solar panels clean in off-grid Nigeria.",
    metrics: [
      { value: "3mW", label: "CONTINUOUS MONITORING" },
      { value: "99.98%", label: "XGBOOST ACCURACY" },
    ],
    tags: ["C", "PYTHON", "XGBOOST", "CUSUM"],
    href: "/projects/soiling-detection",
    variant: "small",
  },
  {
    id: "traks",
    year: "2024",
    title: "TRAKS",
    line: "Community safety with real-time alerts and location-aware reporting.",
    metrics: [{ value: "<500ms", label: "VECTOR SEARCH" }],
    subLine: "REAL-TIME ALERTS / GEO + REVERSE GEOCODING",
    tags: ["FLUTTER", "FASTAPI", "GEO"],
    href: "/projects/traks",
    variant: "small",
  },
  {
    id: "engineering-hub",
    year: "2024",
    title: "Engineering Hub",
    line: "A learning platform built for engineering students.",
    metrics: [{ value: "250", label: "DOWNLOADS" }],
    tags: ["FLUTTER", "PYTHON", "FASTAPI", "FIREBASE"],
    href: "/projects/engineering-hub",
    variant: "medium",
  },
  {
    id: "nuesa",
    year: "2024 / 2025",
    title: "NUESA Academia",
    line: "Digital learning platform for the Faculty of Engineering at ABUAD. A 461-line Cloudflare Worker streams PDFs straight to R2.",
    metrics: [
      { value: "800-1,200", label: "STUDENTS MONTHLY" },
      { value: "9", label: "DEPARTMENTS" },
      { value: "2,000+", label: "PDFS PROCESSED" },
    ],
    tags: ["FASTAPI", "WORKERS", "NEXT.JS", "REDIS", "GEMINI"],
    href: "/projects/nuesa-academia",
    variant: "large",
    visual: {
      src: "/projects/nuesa-academia.jpg",
      alt: "NUESA Academia live dashboard showing syllabus coverage across the faculty",
      caption: "LIVE DASHBOARD / SYLLABUS COVERAGE",
    },
  },
  {
    id: "rag",
    year: "2025",
    title: "RAG Data Pipeline",
    line: "Institutional ingestion: PDFs to semantic chunks with hybrid OCR.",
    metrics: [{ value: "1M+", label: "SEMANTIC CHUNKS" }],
    subLine: "2,000+ PDFS INGESTED",
    tags: ["PYTHON", "CHROMADB", "GEMMA 3", "OPENCV"],
    href: "/projects/rag-data-pipeline",
    variant: "compact",
  },
  {
    id: "awun",
    year: "2025 / 2026",
    title: "AWUN",
    line: "AI social commerce. A storefront created by machine intelligence, payments verified, inventory managed, all inside chat.",
    metrics: [],
    tags: ["FASTAPI", "CLOUD RUN", "WORKERS", "AI"],
    href: "/projects/awun",
    variant: "chapter",
  },
];

export const AWUN_FLOW = ["CLIENT", "API", "WORKER", "D1 / R2"];

export const AWUN_FACTS = [
  "AI STOREFRONT CREATION",
  "PAYMENT VERIFICATION",
  "INVENTORY MANAGEMENT",
];

export const AWUN_CHAPTERS = [
  "CH. 01 THE SYSTEM",
  "CH. 02 THE MARKETPLACE",
  "CH. 03 THE INTELLIGENCE LAYER",
  "CH. 04 THE INFRASTRUCTURE",
  "CH. 05 THE DIFFICULT PARTS",
];

export const CONTACTS = [
  { label: "Email", href: "mailto:nasirdaud2015@gmail.com" },
  { label: "GitHub", href: "https://github.com/awun8191" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nasir-dauda-729357361/" },
  { label: "CV", href: "/Dauda_Nasir_Omotola_CV.pdf" },
];

export const CLOSING_SIGN_OFF =
  "Every system begins with a single line.";

export const STATUS_LINE = "STATUS / OPEN TO COLLABORATION";
