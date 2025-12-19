
import { Project } from './types';

export const HERO_IMAGE = "/image.png";

export const ABOUT_TEXT = "I am a Senior Software Engineer with a deep focus on building scalable systems. My expertise bridges the gap between robust Python backends and fluid Flutter mobile experiences. Recently, I've pivoted towards the cutting edge of AI, specializing in RAG systems and AI Agent development, backed by Nvidia certification.";

export const SKILL_SECTIONS = [
  {
    id: 'core',
    title: "Core Engineering",
    description: "The foundation of my work lies in writing clean, type-safe, and maintainable code. I specialize in bridging the gap between high-performance backends and fluid mobile experiences.",
    theme: {
      bg: "bg-white dark:bg-dark",
      text: "text-dark dark:text-white",
      secondaryText: "text-gray-500 dark:text-gray-400",
      card: "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-500/30 hover:shadow-xl",
      iconBg: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      accent: "bg-blue-600"
    },
    items: [
      { name: "Python Development", icon: "python", desc: "FastAPI, Django, Type Hints" },
      { name: "Flutter & Dart", icon: "flutter", desc: "Cross-platform, BLoC Pattern" },
      { name: "Clean Architecture", icon: "layout", desc: "SOLID Principles, Modular Design" },
      { name: "System Design", icon: "git-graph", desc: "Microservices, Event-Driven" }
    ]
  },
  {
    id: 'cloud',
    title: "Cloud Infrastructure",
    description: "I architect scalable, serverless, and global solutions. My multi-cloud strategy leverages the best services from AWS and GCP to ensure 99.99% uptime and low latency.",
    theme: {
      bg: "bg-[#0B1120] dark:bg-[#050914]",
      text: "text-white",
      secondaryText: "text-slate-400",
      card: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm",
      iconBg: "bg-indigo-500/20 text-indigo-300",
      accent: "bg-indigo-500"
    },
    items: [
      { name: "AWS Ecosystem", icon: "aws", desc: "Lambda, ECS, DynamoDB" },
      { name: "Global Edge", icon: "cloudflare", desc: "Cloudflare Workers, CDN" },
      { name: "Firebase", icon: "firebase", desc: "Auth, Firestore, Analytics" },
      { name: "Google Cloud", icon: "gcp", desc: "Cloud Run, Vertex AI" }
    ]
  },
  {
    id: 'ai',
    title: "AI & Intelligence",
    description: "Certified by Nvidia, I integrate cutting-edge AI into practical business applications. From RAG pipelines to autonomous agents, I build systems that think.",
    theme: {
      bg: "bg-[#F0FDF4] dark:bg-[#064e3b]/20",
      text: "text-[#14532D] dark:text-[#4ade80]",
      secondaryText: "text-[#166534] dark:text-[#86efac]",
      card: "bg-white dark:bg-gray-900 border-green-100 dark:border-green-900 hover:border-green-300 shadow-sm hover:shadow-green-900/5",
      iconBg: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
      accent: "bg-green-600"
    },
    items: [
      { name: "Nvidia Certified", icon: "nvidia", desc: "Deep Learning Specialist" },
      { name: "RAG Systems", icon: "brain", desc: "Vector Search, LangChain" },
      { name: "AI Agents", icon: "bot", desc: "Autonomous Task Execution" },
      { name: "LLM Integration", icon: "workflow", desc: "Prompt Engineering, Fine-tuning" }
    ]
  },
  {
    id: 'devops',
    title: "DevOps & Delivery",
    description: "Code is only as good as its delivery pipeline. I implement rigorous CI/CD workflows and containerization strategies to ensure rapid, reliable deployments.",
    theme: {
      bg: "bg-[#FAFAFA] dark:bg-neutral-900",
      text: "text-dark dark:text-gray-100",
      secondaryText: "text-gray-500 dark:text-gray-400",
      card: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-dark dark:hover:border-gray-500 hover:shadow-none transition-all duration-200",
      iconBg: "bg-gray-100 dark:bg-gray-700 text-dark dark:text-white",
      accent: "bg-dark dark:bg-white"
    },
    items: [
      { name: "Docker & Containers", icon: "docker", desc: "Multi-stage builds, Optimization" },
      { name: "GitHub Actions", icon: "github", desc: "Automated Testing, CD" },
      { name: "Orchestration", icon: "ship", desc: "Kubernetes, ECS" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Engineering Hub",
    category: "Platform Development",
    image: "https://picsum.photos/id/60/800/600",
    description: "A comprehensive collaboration platform for engineering teams, featuring real-time blueprint sharing and version control.",
    tags: ["Flutter", "Python", "WebSockets"]
  },
  {
    id: 2,
    title: "Academia",
    category: "EdTech Solution",
    image: "https://picsum.photos/id/201/800/600",
    description: "An advanced learning management system aimed at university research departments for publishing and peer review.",
    tags: ["Django", "React", "PostgreSQL"]
  },
  {
    id: 3,
    title: "RAG Data Pipeline",
    category: "AI Infrastructure",
    image: "https://picsum.photos/id/532/800/600",
    description: "A high-throughput data processing pipeline designed to ingest, chunk, and embed documents for Retrieval-Augmented Generation systems.",
    tags: ["Python", "LangChain", "Pinecone", "Docker"]
  }
];

export const SOCIAL_LINKS = [
  { platform: "LinkedIn", url: "#", label: "Connect on LinkedIn" },
  { platform: "WhatsApp", url: "https://wa.me/2349153002715", label: "09153002715" },
  { platform: "Email", url: "mailto:nasirdaud2015@gmail.com", label: "nasirdaud2015@gmail.com" }
];

export const SYSTEM_INSTRUCTION = `You are an AI assistant for Dauda Nasir, a Senior Software Engineer.
Your goal is to answer questions about Dauda's skills, experience, and projects in a professional yet engaging tone.

Here is some information about Dauda:
- Role: Senior Software Engineer
- Focus: Scalable systems, Python backends, Flutter mobile apps, AI Agent development, RAG systems.
- Experience: 4+ years.
- Location: San Francisco, CA.

Skills:
- Core: Python, Flutter, Dart, Clean Architecture, System Design.
- Cloud: AWS, GCP, Firebase, Cloudflare.
- AI: Nvidia Certified Deep Learning, RAG Systems, AI Agents, LLMs, Vector Databases.
- DevOps: Docker, GitHub Actions, CI/CD.

Projects:
- Engineering Hub: Collaboration platform (Flutter, Python).
- Academia: EdTech LMS (Django, React).
- RAG Data Pipeline: AI Infrastructure (Python, LangChain, Pinecone).

Contact: nasirdaud2015@gmail.com
Socials: LinkedIn, WhatsApp.

If asked about something not in this list, politely say you don't have that specific information but can forward a message to Dauda.
Keep responses concise and helpful.`;
