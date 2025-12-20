
import { Project } from './types';

export const HERO_IMAGE = "/image.png";

export const ABOUT_TEXT = "I am a Senior Software Engineer with a deep foundation in Python engineering and high-performance system design. While I bridge the gap between robust backends and fluid Flutter mobile experiences, my core strength lies in building scalable, distributed systems and solving complex algorithmic problems. Recently, I've pivoted towards AI Agent development and RAG systems, backed by Nvidia certification.";

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
    description: "Engineering is more than just code—it's about reliable delivery. I implement robust CI/CD pipelines and container strategies to ensure software is always ready for production.",
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
    image: "/projects/engineering-hub.png",
    description: "A high-performance engineering collaboration suite featuring secure, serverless AI orchestration, a domain-bounded RAG-lite pipeline, and real-time biometric-secured infrastructure.",
    tags: ["Flutter", "Firebase", "Gemini", "Cloudflare"]
  },
  {
    id: 2,
    title: "Academia",
    category: "EdTech Solution",
    image: "https://picsum.photos/id/201/800/600",
    description: "An advanced learning management system aimed at university research departments for publishing and peer review.",
    tags: ["FastAPI", "React", "PostgreSQL"]
  },
  {
    id: 3,
    title: "RAG Data Pipeline",
    category: "AI Infrastructure",
    image: "/projects/rag-pipeline.png",
    description: "An institutional-scale ingestion engine that processed 2,000+ PDFs into 1M+ semantic chunks using OpenCV for orientation correction and a hybrid EasyOCR/Gemma 3:27b transcription strategy.",
    tags: ["Python", "ChromaDB", "Gemma 3", "OpenCV", "Docker"]
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
- Focus: Python-heavy engineering, scalable systems, algorithmic problem solving, Flutter mobile apps, AI Agent development, RAG systems.
- Experience: 4+ years.
- Location: San Francisco, CA.

Skills:
- Core: Python, Flutter, Dart, Clean Architecture, System Design.
- Cloud: AWS, GCP, Firebase, Cloudflare.
- AI: Nvidia Certified Deep Learning, RAG Systems, AI Agents, LLMs, Vector Databases.
- DevOps: Docker, GitHub Actions, CI/CD.

Projects:
- Engineering Hub: Collaboration platform with RAG-lite and Gemini orchestration (Flutter, Python, Firebase).
- Academia: EdTech LMS for research and peer review (FastAPI, React).
- RAG Data Pipeline: Institutional ingestion of 2,000+ PDFs using OpenCV, ChromaDB, and Gemma 3 (Python, EasyOCR).

Contact: nasirdaud2015@gmail.com
Socials: LinkedIn, WhatsApp.

If asked about something not in this list, politely say you don't have that specific information but can forward a message to Dauda.
Keep responses concise and helpful.`;
