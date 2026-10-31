// Verified content for the Swiss portfolio homepage.
// Every number here is real and confirmed. See docs/DESIGN-SYSTEM.md section 7.
// Do not add figures that are not in this module.
// Project copy is ASD-STE100: short sentences, active voice, no tags.

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Workbench", href: "#workbench" },
  { label: "Contact", href: "#contact" },
];

// About (3.3): value proposition and scope.
export const ABOUT_STATEMENT = [
  "I build production backends, web platforms, and mobile apps for startups and institutions.",
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
    tags: ["AI INTEGRATIONS", "LLM INTEGRATIONS", "RAG SYSTEMS", "DECISION MODELS"],
    note: "I implement language models into products: retrieval augmented generation systems, embeddings, and the decision models behind user-facing features.",
    status: "ACTIVE TOOL",
    logo: "/logos/ai.svg",
  },
];

// The projects carry prose, not metadata rows. No metrics, no tags, no
// pipeline strips: every fact lives in a sentence a reader can scan.
export type ProjectEntry = {
  id: string;
  title: string;
  line: string;
  href: string;
  liveUrl?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  screenshots?: string[];
  visual?: { src: string; alt: string; contain?: boolean };
};

export const PROJECTS: ProjectEntry[] = [
  {
    id: "engineering-hub",
    title: "Engineering Hub",
    line: "Engineering Hub gives each student an adaptive quiz. The quiz selects the next question from the last answer. More than 250 students use it across the faculty.",
    href: "/projects/engineering-hub",
    liveUrl: "https://engineeringhub.nuesaabuad.ng/",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.engineeringhub.engineeringhub&pcampaignid=web_share",
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
    visual: {
      src: "/projects/engineering-hub-logo.png",
      alt: "Engineering Hub platform logo",
      contain: true,
    },
  },
  {
    id: "queen-brique",
    title: "QueenBrique",
    line: "QueenBrique makes bridal and ceremonial clothes in Abuja. The site shows the collection and the services. A client books a fitting through WhatsApp.",
    href: "https://www.queenbrique.com/",
    liveUrl: "https://www.queenbrique.com/",
    visual: {
      src: "/projects/queen-brique.png",
      alt: "QueenBrique website interface",
    },
  },
  {
    id: "elegant-radiance-luxe",
    title: "Elegant Radiance Luxe",
    line: "Elegant Radiance Luxe is a website that sells clothes and beauty products. It holds stock for 30 minutes while the buyer pays. The infrastructure has a baseline cost of zero.",
    href: "/projects/elegant-radiance-luxe",
    liveUrl: "https://elegantradianceluxe.com/",
    visual: {
      src: "/projects/elegant-radiance-luxe.webp",
      alt: "Elegant Radiance Luxe online storefront hero",
    },
  },
  {
    id: "rag",
    title: "RAG Data Pipeline",
    line: "The pipeline reads academic PDF documents. It corrects the page orientation with OpenCV and extracts the text with OCR. It made one million text chunks from 2,000 documents.",
    href: "/projects/rag-data-pipeline",
    githubUrl: "https://github.com/awun8191/CourseGen",
    visual: {
      src: "/projects/rag-pipeline.png",
      alt: "RAG Data Pipeline ingestion diagram",
      contain: true,
    },
  },
  {
    id: "nuesa-website",
    title: "NUESA Engineering Portal",
    line: "The portal is the website for the Faculty of Engineering at ABUAD. It holds a digital library of 2,000 textbooks for nine departments. Cloudflare sends each book to the reader.",
    href: "https://nuesaabuad.ng/",
    liveUrl: "https://nuesaabuad.ng/",
    visual: {
      src: "/projects/nuesa-website.png",
      alt: "NUESA ABUAD website and digital library",
    },
  },
  {
    id: "nuesa",
    title: "NUESA Academia Engine",
    line: "The engine is the learning backend for the Faculty of Engineering at ABUAD. A Cloudflare Worker of 461 lines sends each document to R2 storage. Gemini indexes the syllabus and Redis caches the result.",
    href: "/projects/nuesa-academia",
    visual: {
      src: "/projects/nuesa-academia.jpg",
      alt: "NUESA Academia dashboard with syllabus coverage",
    },
  },
  {
    id: "awun",
    title: "AWUN",
    line: "AWUN sells goods in a chat. A seller writes a request and the system builds the sales page. The system checks each payment and tracks the stock.",
    href: "/projects/awun",
    liveUrl: "https://www.awun.dev/",
    visual: {
      src: "/projects/awun.webp",
      alt: "AWUN storefront landing page",
    },
  },
];

export const CONTACTS = [
  { label: "Email", href: "mailto:nasirdaud2015@gmail.com" },
  { label: "GitHub", href: "https://github.com/awun8191" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nasir-dauda-729357361/" },
];

export const CLOSING_SIGN_OFF =
  "Every system begins with a single line.";

export const STATUS_LINE = "STATUS / OPEN TO COLLABORATION";
