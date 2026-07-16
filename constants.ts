
import { Project } from './types';

export const HERO_IMAGE = "/image.webp";

export const ABOUT_TEXT = "I am a Software Engineer and final year Electrical Engineering student at ABUAD. I build production systems that serve real users, with deep experience in Python backend engineering, Flutter mobile development, and cloud infrastructure. My work spans scalable APIs, AI pipelines, and cross-platform applications. I hold an NVIDIA Deep Learning certification and actively develop RAG systems and AI agents.";

export const SKILL_SECTIONS = [
  {
    id: 'core',
    title: "Core Engineering",
    description: "The foundation of my work lies in writing clean, type-safe, and maintainable code. I specialize in building high-performance systems where every line counts.",
    theme: {
      bg: "bg-white dark:bg-dark",
      text: "text-dark dark:text-white",
      secondaryText: "text-gray-500 dark:text-gray-400",
      card: "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-500/30 hover:shadow-xl",
      iconBg: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      accent: "bg-blue-600"
    },
    items: [
      {
        name: "Python Development",
        icon: "python",
        desc: "Scalable Systems, Algorithms, FastAPI",
        details: "My primary specialization. I build highly scalable, distributed systems and solve complex architectural challenges through rigorous algorithmic problem solving. Expert in Python's asynchronous ecosystem, specifically FastAPI and Pydantic, for building mission-critical backends.",
        practicality: "Provides the logic and efficiency needed for high-load platforms, ensuring that software doesn't just work, but performs optimally under extreme conditions."
      },
      {
        name: "Java Development",
        icon: "java",
        desc: "Enterprise Applications, Spring Boot",
        details: "Building enterprise-grade backend systems with Java. Experienced in object-oriented design patterns, multithreading, and Spring Boot for production services. Actively expanding into the Java ecosystem for fintech applications.",
        practicality: "Enables integration with enterprise systems and opens opportunities in the Nigerian fintech sector where Java is the dominant backend language."
      },
      {
        name: "Flutter & Dart",
        icon: "flutter",
        desc: "Cross-platform, BLoC Pattern",
        details: "Designing pixel-perfect, high-performance mobile experiences for iOS and Android from a single codebase. I utilize the BLoC pattern for predictable state management and complex event-driven logic.",
        practicality: "Significantly reduces development cycles and maintenance costs while providing a native look and feel that delights users."
      },
      {
        name: "Clean Architecture",
        icon: "layout",
        desc: "SOLID Principles, Modular Design",
        details: "Applying industry-leading architectural patterns to ensure codebases remain maintainable and testable over their entire lifecycle. I focus on keeping business logic decoupled from external dependencies.",
        practicality: "Minimizes technical debt and allows teams to swap out infrastructure components (like databases or APIs) with minimal impact on the core system."
      },
      {
        name: "Database Systems",
        icon: "database",
        desc: "PostgreSQL, MySQL, Firestore",
        details: "Designing and optimizing database schemas for production applications. Experienced with PostgreSQL for relational data, MySQL for transactional workloads, and Firestore for real-time NoSQL storage. Focus on query optimization, indexing strategies, and data integrity.",
        practicality: "Ensures applications handle data efficiently at scale, with proper normalization, indexing, and backup strategies for production reliability."
      },
      {
        name: "System Design",
        icon: "git-graph",
        desc: "Microservices, Distributed Systems",
        details: "Architecting distributed systems that are designed for high availability and fault tolerance. Expertise in designing API gateways, message queues, and optimized data workflows.",
        practicality: "Ensures that digital platforms can handle massive traffic spikes and remain operational even when individual components fail."
      }
    ]
  },
  {
    id: 'cloud',
    title: "Cloud Infrastructure",
    description: "I architect resilient, serverless, and globally distributed solutions. My multi-cloud approach leverages the best of AWS and GCP to ensure peak performance and localized low latency.",
    theme: {
      bg: "bg-[#0B1120] dark:bg-[#050914]",
      text: "text-white",
      secondaryText: "text-slate-400",
      card: "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm",
      iconBg: "bg-indigo-500/20 text-indigo-300",
      accent: "bg-indigo-500"
    },
    items: [
      {
        name: "AWS Ecosystem",
        icon: "aws",
        desc: "Lambda, ECS, DynamoDB",
        details: "Deep expertise in AWS serverless and containerized environments. I design workflows that utilize Lambda for event-driven logic and ECS for scalable container orchestration.",
        practicality: "Provides a highly flexible and cost-effective infrastructure that automatically scales with user demand, reducing operational overhead."
      },
      {
        name: "Global Edge",
        icon: "cloudflare",
        desc: "Cloudflare Workers, CDN",
        details: "Executing logic at the edge to minimize latency and improve security. Utilizing Cloudflare Workers for global deployments and advanced traffic management.",
        practicality: "Reduces time-to-first-byte for users worldwide while protecting core infrastructure from DDoS attacks and malicious traffic."
      },
      {
        name: "Firebase",
        icon: "firebase",
        desc: "Auth, Firestore, Real-time Sync",
        details: "Building real-time applications with seamless data synchronization. Expertise in Firebase Auth for secure identity management and Firestore for scalable NoSQL storage.",
        practicality: "Accelerates the development of collaborative, real-time features that keep users engaged and data always up-to-date."
      },
      {
        name: "Google Cloud",
        icon: "gcp",
        desc: "Cloud Run, Vertex AI",
        details: "Leveraging GCP's powerful machine learning and compute services. Expert in deploying containerized apps on Cloud Run and integrating AI models through Vertex AI.",
        practicality: "Integrates cutting-edge intelligence and high-performance computing directly into application workflows with minimal setup."
      }
    ]
  },
  {
    id: 'ai',
    title: "AI & Intelligence",
    description: "Certified by Nvidia, I bridge the gap between complex AI research and practical business implementations. I build systems that don't just process data, but understand it.",
    theme: {
      bg: "bg-[#F0FDF4] dark:bg-[#064e3b]/20",
      text: "text-[#14532D] dark:text-[#4ade80]",
      secondaryText: "text-[#166534] dark:text-[#86efac]",
      card: "bg-white dark:bg-gray-900 border-green-100 dark:border-green-900 hover:border-green-300 shadow-sm hover:shadow-green-900/5",
      iconBg: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
      accent: "bg-green-600"
    },
    items: [
      {
        name: "Nvidia Certified",
        icon: "nvidia",
        desc: "Deep Learning Practitioner",
        details: "Formally recognized expertise in designing, training, and deploying deep neural networks. Specialized in optimizing model performance for real-world production environments.",
        practicality: "Translates advanced AI concepts into tangible products that can automate visual inspection, natural language understanding, and predictive modeling."
      },
      {
        name: "RAG Systems",
        icon: "brain",
        desc: "Vector Search, Knowledge Pipelines",
        details: "Building Retrieval-Augmented Generation systems that connect LLMs to private datasets. Expertise in vector databases, semantic search, and document chunking strategies.",
        practicality: "Eliminates AI hallucinations by providing models with accurate, context-aware information, making AI reliable for enterprise knowledge management."
      },
      {
        name: "AI Agents",
        icon: "bot",
        desc: "Autonomous Multi-Agent Flows",
        details: "Developing autonomous agents capable of complex task execution and reasoning. I design systems where agents can interact with tools, APIs, and other agents to solve problems.",
        practicality: "Automates multi-step workflows that previously required manual human intervention, significantly increasing operational efficiency."
      },
      {
        name: "LLM Integration",
        icon: "workflow",
        desc: "Prompt Engineering, Optimization",
        details: "Deep integration of Large Language Models into software products. Focusing on advanced prompt engineering, fine-tuning, and performance monitoring.",
        practicality: "Enables the creation of intuitive, natural-language interfaces and intelligent features that dramatically enhance the user experience."
      }
    ]
  },
  {
    id: 'devops',
    title: "DevOps & Delivery",
    description: "Engineering is more than just code-it's about reliable delivery. I implement robust CI/CD pipelines and container strategies to ensure software is always ready for production.",
    theme: {
      bg: "bg-[#FAFAFA] dark:bg-neutral-900",
      text: "text-dark dark:text-gray-100",
      secondaryText: "text-gray-500 dark:text-gray-400",
      card: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-dark dark:hover:border-gray-500 hover:shadow-none transition-all duration-200",
      iconBg: "bg-gray-100 dark:bg-gray-700 text-dark dark:text-white",
      accent: "bg-dark dark:bg-white"
    },
    items: [
      {
        name: "Docker & Containers",
        icon: "docker",
        desc: "Multi-stage builds, Optimization",
        details: "Streamlining application deployment through containerization. I specialize in creating lightweight, secure Docker images that run consistently across all environments.",
        practicality: "Eliminates the 'works on my machine' problem and enables rapid, repeatable deployments at any scale."
      },
      {
        name: "GitHub Actions",
        icon: "github",
        desc: "Automated Testing, CI/CD",
        details: "Automating the software development lifecycle. I build pipelines that automatically test, build, and deploy code changes, ensuring high quality and fast feedback loops.",
        practicality: "Reduces manual effort and prevents regressions, allowing teams to deliver new features to users more frequently and with higher confidence."
      },
      {
        name: "Linux & Networking",
        icon: "terminal",
        desc: "Arch Linux, System Administration, TCP/IP",
        details: "Daily driver of Arch Linux for over 2 years. Deep understanding of Linux systems administration, shell scripting, and networking fundamentals including TCP/IP, DNS, load balancing, and firewall configuration.",
        practicality: "Provides the underlying infrastructure knowledge needed to deploy and troubleshoot applications in any environment, from cloud VMs to embedded systems."
      },
      {
        name: "Orchestration",
        icon: "ship",
        desc: "AWS ECS, Infrastructure as Code",
        details: "Managing containerized applications at scale using AWS Elastic Container Service (ECS). Focus on high availability and seamless rolling updates.",
        practicality: "Provides a reliable foundation for running microservices in production, ensuring that applications stay online even during updates or traffic spikes."
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Engineering Hub",
    category: "Platform Development",
    image: "/projects/engineering-hub.webp",
    description: "A high-performance engineering collaboration suite featuring secure, serverless AI orchestration, a domain-bounded RAG-lite pipeline, and real-time biometric-secured infrastructure.",
    tags: ["Flutter", "Firebase", "Gemini", "Cloudflare"]
  },
  {
    id: 2,
    title: "NUESA Academia",
    category: "EdTech Platform",
    image: "https://picsum.photos/id/24/800/600",
    description: "Digital learning resource management system serving 800 to 1,200 engineering students monthly across 9 departments at ABUAD. Three-layer architecture with FastAPI backend, Cloudflare Workers for direct R2 file operations, Next.js 16 admin portal, and an AI pipeline processing 2,000+ PDFs through OCR to vector embeddings for semantic search and automated course outline/MCQ generation.",
    tags: ["FastAPI", "Next.js 16", "TypeScript", "Cloudflare Workers", "Redis", "ChromaDB", "Gemini API"]
  },
  {
    id: 3,
    title: "RAG Data Pipeline",
    category: "AI Infrastructure",
    image: "/projects/rag-pipeline.webp",
    description: "An institutional-scale ingestion engine that processed 2,000+ PDFs into 1M+ semantic chunks using OpenCV for orientation correction and a hybrid EasyOCR/Gemma 3:27b transcription strategy.",
    tags: ["Python", "ChromaDB", "Gemma 3", "OpenCV", "Docker"]
  },
  {
    id: 4,
    title: "TRAKS",
    category: "Community Platform",
    image: "https://picsum.photos/id/48/800/600",
    description: "Community incident reporting and SOS platform with semantic search via Cloudflare Vectorize. Features real-time alerts, geolocation with reverse geocoding, community verification (confirm/refute), and vector-based post search.",
    tags: ["FastAPI", "Firebase", "Cloudflare", "Python"]
  },
  {
    id: 5,
    title: "AWUN",
    category: "Social Commerce",
    image: "https://picsum.photos/id/26/800/600",
    description: "AI-powered social commerce platform enabling vendors to sell via chat with AI storefront creation, payment verification, inventory management, and product discovery. Built for the $50B+ African social commerce market.",
    tags: ["FastAPI", "Firebase", "Cloudflare D1", "R2", "Paystack", "Workers AI"]
  },
  {
    id: 6,
    title: "Soiling Detection System",
    category: "Embedded AI",
    image: "https://picsum.photos/id/15/800/600",
    description: "Final year project in Electrical and Electronics Engineering. A two-layer embedded system for solar panel soiling detection: CUSUM control chart on Pi Pico (always-on at 3mW) triggers XGBoost classifier on Pi Zero 2W (99.98% accuracy). Mechanical cleaning via stepper motor. Designed for Nigerian off-grid deployment.",
    tags: ["C", "Python", "XGBoost", "CUSUM", "Raspberry Pi"]
  },
  {
    id: 7,
    title: "RAST",
    category: "AI Research",
    image: "https://picsum.photos/id/201/800/600",
    description: "AI research assistant for DOI lookup, PDF analysis, retrieval-augmented generation, and thesis generation with deterministic citation linking. Multi-agent architecture using Google ADK.",
    tags: ["React", "FastAPI", "Google ADK", "ChromaDB"]
  }
];

export const SOCIAL_LINKS = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/nasir-dauda-729357361/", label: "Connect on LinkedIn" },
  { platform: "WhatsApp", url: "https://wa.me/2349153002715", label: "09153002715" },
  { platform: "Email", url: "mailto:nasirdaud2015@gmail.com", label: "nasirdaud2015@gmail.com" }
];

export const SYSTEM_INSTRUCTION = `You are an AI assistant for Dauda Nasir, a Software Engineer.
Your goal is to answer questions about Dauda's skills, experience, and projects in a professional yet engaging tone.

Here is some information about Dauda:
- Role: Software Engineer
- Focus: Python backend engineering, scalable systems, Flutter mobile development, cloud infrastructure, AI Agent development, RAG systems.
- Background: Final year Electrical Engineering student at ABUAD.
- Location: Lagos, Nigeria.

Skills:
- Core: Python, Java, Flutter, Dart, Database Systems (PostgreSQL, MySQL), Clean Architecture, System Design.
- Cloud: AWS, GCP, Firebase, Cloudflare (Workers, R2, D1, Vectorize).
- AI: NVIDIA Certified Deep Learning, RAG Systems, AI Agents, Gemini API, TensorFlow.
- DevOps: Docker, GitHub Actions, CI/CD, Linux Administration, Networking.

Projects:
- NUESA Academia: Digital learning resource management system for engineering students at ABUAD. 800-1,200 monthly users. FastAPI, Next.js 16, Cloudflare Workers, Redis, ChromaDB, Gemini API.
- Engineering Hub: Flutter collaboration platform with AI document analysis and RAG pipeline.
- RAG Data Pipeline: Ingestion of 2,000+ PDFs with OCR, vector embeddings, ChromaDB.
- TRAKS: Community incident reporting and SOS platform with vector search.
- AWUN: AI-powered social commerce platform for African vendors selling via chat. Paystack payments, AI storefront creation, inventory management.
- RAST: AI research assistant with DOI lookup, RAG, thesis generation.

Contact: nasirdaud2015@gmail.com
Socials: LinkedIn, WhatsApp.

If asked about something not in this list, politely say you don't have that specific information but can forward a message to Dauda.
Keep responses concise and helpful.`;
