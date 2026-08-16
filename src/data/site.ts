// Verified content for the Swiss portfolio homepage.
// Every number here is real and confirmed. See docs/DESIGN-SYSTEM.md section 7.
// Do not add figures that are not in this module.

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Workbench", href: "#workbench" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// About (3.3): value proposition and scope.
export const ABOUT_STATEMENT = [
  "I help businesses, organizations, and startups build high-impact digital products.",
  "Covering scalable backends, responsive web platforms, cross-platform mobile apps, and intelligent AI integrations.",
];

export type Tool = {
  name: string;
  tags: string[];
  note: string;
  status: string;
  logo?: string;
};

export const TOOLS: Tool[] = [
  {
    name: "Python",
    tags: ["BACKEND", "AI", "DATA"],
    note: "The workhorse behind the AI systems here. The RAG pipeline that turned 2,000+ PDFs into 1M+ semantic chunks is Python end to end.",
    status: "ACTIVE TOOL",
    logo: "/logos/python.svg",
  },
  {
    name: "FastAPI",
    tags: ["HIGH-PERFORMANCE APIS"],
    note: "Async, typed, measurable. Every API in this portfolio runs on it, including TRAKS vector search that answers in under 500ms.",
    status: "PRODUCTION",
    logo: "/logos/fastapi.svg",
  },
  {
    name: "React",
    tags: ["FRONTEND", "UI SYSTEMS"],
    note: "Modern, responsive client interfaces, interactive state systems, and component architectures. Fast, fluid web applications.",
    status: "PRODUCTION",
    logo: "/logos/react.svg",
  },
  {
    name: "Flutter",
    tags: ["CROSS-PLATFORM", "MOBILE"],
    note: "Android-first clients for Engineering Hub, TRAKS, and NUESA Academia. One codebase, shipped to real users.",
    status: "PRODUCTION",
    logo: "/logos/flutter.svg",
  },
  {
    name: "PostgreSQL",
    tags: ["RELATIONAL DB", "SQL"],
    note: "Structured data persistence, complex relations, ACID transactions, and optimized indexing for heavy production workloads.",
    status: "PRODUCTION",
    logo: "/logos/postgresql.svg",
  },
  {
    name: "Firebase",
    tags: ["BAAS", "REALTIME", "AUTH"],
    note: "Rapid application infrastructure: Firestore realtime synchronization, authentication, cloud storage, and push messaging.",
    status: "PRODUCTION",
    logo: "/logos/firebase.svg",
  },
  {
    name: "Docker",
    tags: ["CONTAINERS", "DEVOPS"],
    note: "Reproducible container environments, multi-stage builds, and standardized deployments across development and cloud hosts.",
    status: "PRODUCTION",
    logo: "/logos/docker.svg",
  },
  {
    name: "Cloudflare",
    tags: ["EDGE", "WORKERS", "R2"],
    note: "Ultra-low latency edge compute and storage: Workers, R2, and D1. The NUESA worker is 461 lines and streams PDFs straight to R2.",
    status: "PRODUCTION",
    logo: "/logos/cloudflare.svg",
  },
  {
    name: "Google Cloud (GCP)",
    tags: ["CLOUD RUN", "CONTAINERS"],
    note: "Containerized deployments and microservices via Cloud Run, managed storage pipelines, and automated cloud workloads.",
    status: "PRODUCTION",
    logo: "/logos/google-cloud.svg",
  },
  {
    name: "AWS",
    tags: ["CLOUD INFRASTRUCTURE", "S3"],
    note: "Resilient cloud infrastructure: EC2 compute, S3 object storage pipelines, IAM policies, and production server environments.",
    status: "PRODUCTION",
    logo: "/logos/aws.svg",
  },
  {
    name: "AI Systems",
    tags: ["AGENTS", "EMBEDDINGS"],
    note: "Agents and embeddings in production: hybrid OCR transcription, semantic search over 1M+ chunks, and AWUN storefront intelligence.",
    status: "ACTIVE TOOL",
    logo: "/logos/ai.svg",
  },
];

export type Metric = {
  value: string;
  label: string;
};

export type ProjectEntry = {
  id: string;
  year?: string;
  title: string;
  line: string;
  metrics: Metric[];
  subLine?: string;
  tags: string[];
  href: string;
  liveUrl?: string;
  playStoreUrl?: string;
  screenshots?: string[];
  variant: "small" | "medium" | "large" | "compact" | "chapter";
  visual?: { src: string; alt: string; caption: string };
};

export const PROJECTS: ProjectEntry[] = [
  {
    id: "engineering-hub",
    title: "Engineering Hub",
    line: "An interactive learning platform and adaptive quiz engine for engineering students across the faculty.",
    metrics: [
      { value: "250+", label: "STUDENTS" },
      { value: "BKT", label: "QUIZ ENGINE" },
    ],
    tags: ["FLUTTER", "FASTAPI", "POSTGRESQL", "FIREBASE"],
    href: "/projects/engineering-hub",
    liveUrl: "https://engineeringhub.nuesaabuad.ng/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.engineeringhub.engineeringhub&pcampaignid=web_share",
    screenshots: [
      "/projects/1.png",
      "/projects/2.png",
      "/projects/3.png",
      "/projects/4.png",
      "/projects/5.png",
      "/projects/6.png",
      "/projects/7.png",
      "/projects/8.png",
    ],
    variant: "medium",
    visual: {
      src: "/projects/engineering-hub-logo.png",
      alt: "Engineering Hub official platform logo",
      caption: "ENGINEERING HUB / ABUAD FACULTY PLATFORM",
    },
  },
  {
    id: "queen-brique",
    title: "QueenBrique",
    line: "Digital platform and storefront for sustainable brick manufacturing, engineered with React and hosted on Cloudflare.",
    metrics: [
      { value: "100%", label: "EDGE DEPLOYED" },
      { value: "<50ms", label: "TTFB" },
    ],
    tags: ["REACT", "CLOUDFLARE", "TAILWIND"],
    href: "https://www.queenbrique.com/",
    liveUrl: "https://www.queenbrique.com/",
    variant: "small",
    visual: {
      src: "/projects/queen-brique.png",
      alt: "QueenBrique platform website interface",
      caption: "PLATFORM INTERFACE / CLOUDFLARE EDGE",
    },
  },
  {
    id: "elegant-radiance-luxe",
    title: "Elegant Radiance Luxe",
    line: "Full-stack luxury beauty e-commerce store. React client on Cloudflare with a FastAPI backend running on Google Cloud Run and Firebase authentication.",
    metrics: [
      { value: "$0.00", label: "INFRA BASELINE" },
      { value: "30-MIN", label: "ATOMIC HOLD" },
    ],
    tags: ["REACT", "CLOUDFLARE", "CLOUD RUN", "FASTAPI", "FIREBASE"],
    href: "/projects/elegant-radiance-luxe",
    liveUrl: "https://elegantradianceluxe.com/",
    variant: "medium",
    visual: {
      src: "/projects/elegant-radiance-luxe.png",
      alt: "Elegant Radiance Luxe online beauty store interface",
      caption: "ONLINE STOREFRONT & CLOUD RUN API",
    },
  },
  {
    id: "rag",
    title: "RAG Data Pipeline",
    line: "Institutional AI ingestion infrastructure: 2,000+ academic PDFs parsed into 1M+ semantic chunks with OpenCV orientation correction and hybrid OCR.",
    metrics: [
      { value: "1M+", label: "CHUNKS" },
      { value: "2,000+", label: "PDFS" },
    ],
    subLine: "2,000+ PDFS INGESTED",
    tags: ["PYTHON", "CHROMADB", "GEMMA 3", "OPENCV"],
    href: "/projects/rag-data-pipeline",
    variant: "compact",
    visual: {
      src: "/projects/rag-pipeline.png",
      alt: "RAG Data Pipeline ingestion architecture",
      caption: "SEMANTIC INGESTION / 1M+ CHUNKS",
    },
  },
  {
    id: "nuesa-website",
    title: "NUESA Engineering Portal",
    line: "Official web portal for the Faculty of Engineering at ABUAD. Built with React, the integrated digital library runs on Cloudflare and streams course textbooks obtained from Academia.",
    metrics: [
      { value: "9", label: "DEPARTMENTS" },
      { value: "2,000+", label: "TEXTBOOKS" },
    ],
    tags: ["REACT", "CLOUDFLARE", "ACADEMIA API", "TAILWIND"],
    href: "https://nuesaabuad.ng/",
    liveUrl: "https://nuesaabuad.ng/",
    variant: "large",
    visual: {
      src: "/projects/nuesa-website.png",
      alt: "NUESA ABUAD official website portal and digital library",
      caption: "OFFICIAL FACULTY PORTAL & DIGITAL LIBRARY",
    },
  },
  {
    id: "nuesa",
    title: "NUESA Academia Engine",
    line: "Digital learning backend for the Faculty of Engineering at ABUAD. A 461-line Cloudflare Worker streams PDFs straight to R2 with Redis caching and Gemini syllabus indexing.",
    metrics: [
      { value: "9", label: "DEPARTMENTS" },
      { value: "2,000+", label: "DOCUMENTS" },
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
    id: "awun",
    title: "AWUN",
    line: "AI social commerce. A storefront created by machine intelligence, payments verified, inventory managed, all inside chat.",
    metrics: [
      { value: "AI", label: "STOREFRONT" },
      { value: "100%", label: "AUTOMATED" },
    ],
    tags: ["FASTAPI", "CLOUD RUN", "WORKERS", "AI"],
    href: "/projects/awun",
    liveUrl: "https://www.awun.dev/",
    variant: "chapter",
    visual: {
      src: "/projects/awun.png",
      alt: "AWUN AI social commerce platform",
      caption: "AI STOREFRONT & CHAT COMMERCE",
    },
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
