import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    ArrowLeft, ArrowRight, Cpu, Brain,
    Layers,
    FileText, Database, Clock,
    Award, Sparkles,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Workflow,
    Loader,
    Bot,
    BookOpen,
    Zap,
    Globe,
    Box,
    Terminal
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface CaseStudyProps {
    onBack: () => void;
}

const CourseGenCaseStudy: React.FC<CaseStudyProps> = ({ onBack }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const capabilities = [
        {
            title: "Multi-Engine OCR",
            icon: FileText,
            hex: "#6366f1",
            accent: "text-indigo-500",
            bgAccent: "bg-indigo-500/10",
            description: "Resilient OCR pipeline with automatic fallback across four engines for maximum extraction fidelity.",
            items: [
                "Gemini Batch OCR (primary, 3 images/call)",
                "EasyOCR fallback (PyTorch, GPU-ready)",
                "PaddleOCR for structured layouts",
                "Tesseract as last-resort fallback"
            ],
            features: [
                { label: "Engines", val: "4-Tier" },
                { label: "Coverage", val: "99%+" }
            ]
        },
        {
            title: "RAG Course Generation",
            icon: Brain,
            hex: "#8b5cf6",
            accent: "text-violet-500",
            bgAccent: "bg-violet-500/10",
            description: "Semantic retrieval pipelines that transform raw PDFs into structured academic content.",
            items: [
                "BGE-M3 embeddings via Cloudflare Workers AI",
                "ChromaDB vector store with metadata filtering",
                "Gemini-powered course outline generation",
                "Domain-bounded retrieval for hallucination control"
            ],
            features: [
                { label: "Chunks", val: "1M+" },
                { label: "Latency", val: "Sub-2s" }
            ]
        },
        {
            title: "Question Intelligence",
            icon: Bot,
            hex: "#ec4899",
            accent: "text-pink-500",
            bgAccent: "bg-pink-500/10",
            description: "Dual-mode question generation producing both theoretical and calculation-based assessments.",
            items: [
                "Theory questions with rubric-graded answers",
                "Calculation questions with LaTeX-rendered solutions",
                "Parallel worker pool for batch generation",
                "8-strategy JSON repair for malformed LLM output"
            ],
            features: [
                { label: "Types", val: "2-Mode" },
                { label: "Output", val: "Validated" }
            ]
        },
        {
            title: "Production Infrastructure",
            icon: ShieldCheck,
            hex: "#f97316",
            accent: "text-orange-500",
            bgAccent: "bg-orange-500/10",
            description: "Enterprise-grade deployment architecture with built-in cost tracking and API governance.",
            items: [
                "Docker multi-stage builds with ECR/EC2 deploy",
                "API key load balancer with rate-limit tracking",
                "Granular progress checkpointing at every stage",
                "Cost tracking per-file (embedding tokens)"
            ],
            features: [
                { label: "Deploy", val: "Docker" },
                { label: "Resume", val: "Granular" }
            ]
        }
    ];

    const scrollToIndex = useCallback((index: number) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            container.scrollTo({
                left: index * container.clientWidth,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    }, []);

    const nextSlide = useCallback(() => {
        scrollToIndex((activeIndex + 1) % capabilities.length);
    }, [activeIndex, capabilities.length, scrollToIndex]);

    const prevSlide = useCallback(() => {
        scrollToIndex((activeIndex - 1 + capabilities.length) % capabilities.length);
    }, [activeIndex, capabilities.length, scrollToIndex]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const index = Math.round(container.scrollLeft / container.clientWidth);
            if (index !== activeIndex && index >= 0 && index < capabilities.length) {
                setActiveIndex(index);
            }
        }
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    return (
        <div className="bg-white dark:bg-dark min-h-screen transition-colors duration-500 pb-24 text-dark dark:text-gray-100 selection:bg-indigo-500/30 overflow-x-hidden">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">CourseGen Pipeline</span>
                    </div>
                </div>
            </nav>

            {/* --- HERO --- */}
            <header className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] -ml-96 -mt-96 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] -mr-72 -mb-72 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal delay={200}>
                        <h1 className="text-6xl md:text-9xl font-black text-dark dark:text-white tracking-tighter mb-6 leading-[0.85]">
                            Course<span className="text-indigo-600 dark:text-indigo-400">Gen</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={400}>
                        <p className="text-lg md:text-3xl font-medium text-gray-500 dark:text-indigo-400/80 mb-12 tracking-tight">
                            Educational PDF-to-course pipeline with multi-engine OCR and RAG
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={600}>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Python", "Gemini", "RAG", "Docker", "ChromaDB", "Firebase"].map(tag => (
                                <span key={tag} className="px-5 py-2.5 rounded-full bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            {/* --- PIPELINE OVERVIEW --- */}
            <section className="py-20 md:py-32 bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <ScrollReveal>
                            <div className="grid md:grid-cols-2 gap-16 items-start">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black text-dark dark:text-white mb-8 tracking-tight">
                                        Pipeline Overview
                                    </h2>
                                    <div className="h-2 w-20 bg-indigo-500 rounded-full"></div>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-lg md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium tracking-tight">
                                        CourseGen converts raw educational PDFs into structured, AI-ready course content through a resilient multi-stage pipeline.
                                    </p>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
                                        From OCR extraction to RAG-powered question generation, every stage is checkpointed, resumable, and gracefully degrades across providers. Built for Engineering Hub integration.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="mt-20 grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-8">
                                {[
                                    { step: "01", label: "Extract", desc: "Multi-engine OCR" },
                                    { step: "02", label: "Chunk", desc: "Semantic segments" },
                                    { step: "03", label: "Embed", desc: "BGE-M3 vectors" },
                                    { step: "04", label: "Generate", desc: "RAG outlines + Q&A" }
                                ].map((s, i) => (
                                    <div key={i} className="text-center">
                                        <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                                            <span className="text-lg md:text-3xl font-black text-indigo-600 dark:text-indigo-400">{s.step}</span>
                                        </div>
                                        <p className="text-sm md:text-xl font-black text-dark dark:text-white uppercase tracking-tight">{s.label}</p>
                                        <p className="text-[9px] md:text-xs text-gray-500 dark:text-gray-400 font-bold mt-1">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* --- CORE CAPABILITIES CAROUSEL --- */}
            <section className="py-24 md:py-40 bg-white dark:bg-dark relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-7xl font-black text-dark dark:text-white mb-4 tracking-tighter uppercase leading-none">Core Capabilities</h2>
                                <div className="h-2 w-32 bg-indigo-500 rounded-full mb-6"></div>
                                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                                    Production-grade infrastructure for educational content generation.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-16 h-16 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-dark dark:text-white hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all transform active:scale-90"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-16 h-16 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-dark dark:text-white hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all transform active:scale-90"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="overflow-x-auto overflow-y-hidden py-10 flex scroll-smooth snap-x snap-mandatory scrollbar-hide"
                        >
                            {capabilities.map((cap, idx) => (
                                <div key={idx} className="w-full flex-shrink-0 px-2 md:px-0 snap-center">
                                    <div className="max-w-5xl mx-auto p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                                        <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${cap.bgAccent} rounded-full blur-[100px] -mr-40 -mt-40 opacity-50 group-hover:scale-110 transition-transform duration-1000`} />

                                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
                                            <div>
                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-white dark:bg-dark border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-xl mb-10">
                                                    <cap.icon className={cap.accent} size={40} />
                                                </div>
                                                <h3 className="text-2xl md:text-5xl font-black text-dark dark:text-white mb-4 md:mb-6 uppercase tracking-tighter leading-none">{cap.title}</h3>
                                                <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 mb-8 md:mb-10 font-medium leading-tight tracking-tight">
                                                    {cap.description}
                                                </p>

                                                <div className="flex gap-8">
                                                    {cap.features.map((f, i) => (
                                                        <div key={i}>
                                                            <p className={`text-3xl md:text-4xl font-black ${cap.accent} tracking-tighter`}>{f.val}</p>
                                                            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">{f.label}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-6">Key Implementations</p>
                                                {cap.items.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-white/5 group/item hover:border-indigo-500/30 transition-all">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${cap.accent.replace('text-', 'bg-')}`} />
                                                        <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-bold tracking-tight">{item}</span>
                                                        <Sparkles className="ml-auto w-4 h-4 text-indigo-500/20 group-hover/item:text-indigo-500 transition-colors" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-3 mt-12">
                            {capabilities.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToIndex(i)}
                                    className={`h-2.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-12 bg-indigo-500' : 'w-2.5 bg-gray-200 dark:bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- RESILIENCY DEEP DIVE --- */}
            <section className="py-16 md:py-40 bg-dark text-white overflow-hidden relative rounded-[3rem] md:rounded-[6rem] mx-4 lg:mx-12 shadow-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="flex flex-col lg:flex-row gap-20 items-center text-left">
                                <div className="lg:w-1/2">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-10">
                                        <ShieldCheck size={14} />
                                        PRODUCTION RESILIENCE
                                    </div>
                                    <h2 className="text-3xl md:text-7xl font-black mb-6 md:mb-8 leading-[0.85] tracking-tighter">Multi-Provider <br/>Resilience</h2>
                                    <p className="text-xl md:text-2xl text-gray-400 leading-tight mb-12 font-bold opacity-80 tracking-tight">
                                        The pipeline degrades gracefully across OCR engines, embedding services, and API keys without losing state.
                                    </p>

                                    <div className="flex gap-12">
                                        <div>
                                            <p className="text-5xl font-black text-indigo-400 tracking-tighter">4</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">OCR Engines</p>
                                        </div>
                                        <div>
                                            <p className="text-5xl font-black text-indigo-400 tracking-tighter">3</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Embedding Providers</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-black group shadow-3xl">
                                        <div className="absolute inset-0 flex items-center justify-center p-10">
                                            <div className="space-y-4 w-full max-sm:max-w-[200px]">
                                                {[
                                                    { label: "OCR: Gemini → EasyOCR → PaddleOCR → Tesseract", icon: <FileText size={16} /> },
                                                    { label: "Embeddings: Cloudflare → Gemini → Ollama", icon: <Layers size={16} /> },
                                                    { label: "API Keys: Round-robin with exhaustion detection", icon: <Loader size={16} /> },
                                                    { label: "Progress: Checkpointed at every stage", icon: <Clock size={16} /> }
                                                ].map((step, k) => (
                                                    <div key={k} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                                                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-dark shadow-sm">
                                                            {step.icon}
                                                        </div>
                                                        <span className="font-bold tracking-tight text-xs md:text-sm">{step.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* --- ARCHITECTURE STATS --- */}
            <section className="py-24 md:py-48">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-[8rem] font-black text-dark dark:text-white mb-10 tracking-tighter leading-none">Pipeline Stats</h2>
                            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-8 leading-tight font-bold opacity-80">
                                Built for scale, hardened for production.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { value: "4", label: "OCR Engines", sub: "Graceful fallback" },
                            { value: "1M+", label: "Chunks", sub: "Vector store capacity" },
                            { value: "8", label: "JSON Strategies", sub: "Malformed output repair" },
                            { value: "100%", label: "Resumable", sub: "Checkpointed pipeline" }
                        ].map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="text-center group">
                                    <div className="aspect-square rounded-[2rem] md:rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:border-indigo-500/30 transition-all shadow-xl">
                                        <div className="text-center">
                                            <p className={`text-4xl md:text-7xl font-black ${i === 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-dark dark:text-white'} tracking-tighter`}>{stat.value}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{stat.label}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400">{stat.sub}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- STACK GRID --- */}
            <section className="py-20 md:py-32 bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-black uppercase tracking-widest text-indigo-500 mb-4">Technology</h2>
                            <p className="text-4xl md:text-6xl font-black text-dark dark:text-white tracking-tighter uppercase">Pipeline Ecosystem</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {[
                                { label: "Core Logic", val: "Python 3.12", icon: <Terminal size={24} /> },
                                { label: "AI Model", val: "Gemini 2.0 Flash", icon: <Bot size={24} /> },
                                { label: "Vector DB", val: "ChromaDB", icon: <Database size={24} /> },
                                { label: "Embeddings", val: "BGE-M3 (bg3)", icon: <Cpu size={24} /> },
                                { label: "OCR Engine", val: "4-Tier Fallback", icon: <FileText size={24} /> },
                                { label: "Storage", val: "Firestore", icon: <Database size={24} /> },
                                { label: "Deployment", val: "Docker + EC2", icon: <Box size={24} /> },
                                { label: "Edge", val: "Cloudflare", icon: <Globe size={24} /> }
                            ].map((t, k) => (
                                <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-indigo-500/30 transition-all text-center">
                                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-indigo-500 transition-colors mb-4">
                                        {t.icon}
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">{t.label}</p>
                                    <p className="text-sm font-bold text-dark dark:text-white">{t.val}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-16 md:py-48 bg-indigo-600 rounded-[3rem] md:rounded-[6rem] mx-4 md:mx-12 mb-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/30 to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-[10rem] font-black text-white tracking-tighter mb-8 md:mb-12 leading-[0.75]">
                            PDF to Course.
                        </h2>
                        <p className="max-w-xl mx-auto text-indigo-200 text-lg md:text-3xl font-black mb-10 md:mb-16 leading-none">
                            From raw textbooks to structured, AI-generated course material.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={300}>
                        <button
                            onClick={onBack}
                            className="px-16 py-8 bg-white text-indigo-600 rounded-[2.5rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            Return to Portfolio
                        </button>
                    </ScrollReveal>
                </div>
            </section>

        </div>
    );
};

export default CourseGenCaseStudy;
