import React, { useEffect, useState, useCallback } from 'react';
import {
    ArrowLeft, ArrowRight, Cpu, Brain,
    Layers,
    FileText, Database, Clock,
    Award, MessageSquareCode, Sparkles,
    LucideIcon,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface CaseStudyProps {
    onBack: () => void;
    onViewDocs: () => void;
}

const EngineeringHubCaseStudy: React.FC<CaseStudyProps> = ({ onBack, onViewDocs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    interface Capability {
        title: string;
        icon: LucideIcon;
        hex: string;
        accent: string;
        bgAccent: string;
        description: string;
        items: string[];
        features: { label: string; val: string }[];
    }

    const capabilities: Capability[] = [
        {
            title: "Study & Productivity",
            icon: Clock,
            hex: "#14b8a6",
            accent: "text-teal-500",
            bgAccent: "bg-teal-500/10",
            description: "Intelligent scheduling and consistency tracking for modern engineering students.",
            items: [
                "Smart study scheduling system",
                "Streak & consistency tracking",
                "Home screen productivity widgets",
                "Real-time automated reminders"
            ],
            features: [
                { label: "Uptime", val: "99.9%" },
                { label: "Sync", val: "Instant" }
            ]
        },
        {
            title: "AI & RAG Learning",
            icon: Brain,
            hex: "#3b82f6",
            accent: "text-blue-500",
            bgAccent: "bg-blue-500/10",
            description: "Leveraging RAG pipelines to generate high-fidelity technical assessments.",
            items: [
                "RAG-based dynamic questions",
                "Theoretical & calculation problems",
                "Semantic document retrieval",
                "Cost-aware AI architecture"
            ],
            features: [
                { label: "Accuracy", val: "100%" },
                { label: "Speed", val: "Sub-2s" }
            ]
        },
        {
            title: "Doc Infrastructure",
            icon: Database,
            hex: "#f97316",
            accent: "text-orange-500",
            bgAccent: "bg-orange-500/10",
            description: "Secure, structured, and AI-ready document storage and optimization.",
            items: [
                "Secure storage for notes & PDFs",
                "Course-code based organization",
                "Optimized ingestion pipelines",
                "Isolated multi-tenant data"
            ],
            features: [
                { label: "Format", val: "Multi-PDF" },
                { label: "Security", val: "AES-256" }
            ]
        },
        {
            title: "Full Stack Mastery",
            icon: Award,
            hex: "#ec4899",
            accent: "text-pink-500",
            bgAccent: "bg-pink-500/10",
            description: "Full end-to-end technical delivery across the entire application stack.",
            items: [
                "Architected scalable backend APIs",
                "Custom AI pipeline development",
                "Cross-platform Flutter delivery",
                "Cloud-native infrastructure"
            ],
            features: [
                { label: "Role", val: "Architect" },
                { label: "Ownership", val: "100%" }
            ]
        }
    ];

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % capabilities.length);
    }, [capabilities.length]);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + capabilities.length) % capabilities.length);
    }, [capabilities.length]);

    // Auto-scroll logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused, nextSlide, activeIndex]); // activeIndex dependency ensures timer resets on manual navigation

    const themes = [
        { name: "Teal", bg: "bg-teal-500" },
        { name: "Blue", bg: "bg-blue-500" },
        { name: "Orange", bg: "bg-orange-500" },
        { name: "Pink", bg: "bg-pink-500" },
        { name: "Green", bg: "bg-green-500" },
        { name: "Minimal", bg: "bg-gray-200 dark:bg-gray-700" }
    ];

    return (
        <div className="bg-white dark:bg-dark min-h-screen transition-colors duration-500 pb-24 text-dark dark:text-gray-100 selection:bg-teal-500/30 overflow-x-hidden">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <button
                        onClick={onViewDocs}
                        className="group flex items-center gap-2 text-blue-500 font-black hover:text-blue-600 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-widest">Technical Overview</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Engineering Hub Showcase</span>
                    </div>
                </div>
            </nav>

            {/* --- HERO --- */}
            <header className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -ml-72 -mb-72 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <div className="flex justify-center mb-10">
                            <div className="w-32 h-32 md:w-44 md:h-44 p-4 bg-dark dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-white/10 relative group">
                                <div className="absolute inset-0 bg-teal-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <img
                                    src="/projects/engineering-hub-logo.png"
                                    alt="Engineering Hub Logo"
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <h1 className="text-6xl md:text-9xl font-black text-dark dark:text-white tracking-tighter mb-6 leading-[0.85]">
                            Engineering Hub
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={400}>
                        <p className="text-lg md:text-3xl font-medium text-gray-500 dark:text-teal-400/80 mb-12 tracking-tight">
                            An intelligent study platform for engineering students
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={600}>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Full-stack", "AI/ML", "RAG Pipeline", "Mobile Native"].map(tag => (
                                <span key={tag} className="px-5 py-2.5 rounded-full bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            {/* --- SUMMARY --- */}
            <section className="py-20 md:py-32 bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <ScrollReveal>
                            <div className="grid md:grid-cols-2 gap-16 items-start">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black text-dark dark:text-white mb-8 tracking-tight">
                                        Project Summary
                                    </h2>
                                    <div className="h-2 w-20 bg-teal-500 rounded-full"></div>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-lg md:text-2xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium tracking-tight">
                                        Engineering Hub is a sophisticated education ecosystem designed to help students master complex subjects through intelligent scheduling and AI assistance.
                                    </p>
                                    <p className="text-base md:text-lg leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
                                        Built with a custom design system and scalable RAG pipelines, the platform delivers high-fidelity academic support across mobile and web interfaces.
                                    </p>
                                </div>
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
                                <div className="h-2 w-32 bg-teal-500 rounded-full mb-6"></div>
                                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                                    A high-fidelity academic ecosystem built for performance and scale.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-16 h-16 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-dark dark:text-white hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all transform active:scale-90"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-16 h-16 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-dark dark:text-white hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all transform active:scale-90"
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
                        <div className="overflow-hidden py-10">
                            <div
                                className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                            >
                                {capabilities.map((cap, idx) => (
                                    <div key={idx} className="w-full flex-shrink-0 px-2 md:px-0">
                                        <div className="max-w-5xl mx-auto p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                                            {/* bg gradient accent */}
                                            <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${cap.bgAccent} rounded-full blur-[100px] -mr-40 -mt-40 opacity-50 group-hover:scale-110 transition-transform duration-1000`} />

                                            <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                                                <div>
                                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-white dark:bg-dark border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-xl mb-10">
                                                        <cap.icon className={cap.accent} size={40} />
                                                    </div>
                                                    <h3 className="text-3xl md:text-5xl font-black text-dark dark:text-white mb-6 uppercase tracking-tighter leading-none">{cap.title}</h3>
                                                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 font-medium leading-tight tracking-tight">
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
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-6">Key Implementations</p>
                                                    {cap.items.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-white/5 group/item hover:border-teal-500/30 transition-all">
                                                            <div className={`w-2 h-2 rounded-full ${cap.accent.replace('text-', 'bg-')}`} />
                                                            <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-bold tracking-tight">{item}</span>
                                                            <Sparkles className="ml-auto w-4 h-4 text-teal-500/20 group-hover/item:text-teal-500 transition-colors" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-3 mt-12">
                            {capabilities.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-2.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-12 bg-teal-500' : 'w-2.5 bg-gray-200 dark:bg-white/10'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- AI DEEP DIVE --- */}
            <section className="py-24 md:py-40 bg-dark text-white overflow-hidden relative rounded-[4rem] md:rounded-[6rem] mx-4 lg:mx-12 shadow-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

                <div className="container mx-auto px-12 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <ScrollReveal>
                            <div className="flex flex-col lg:flex-row gap-20 items-center text-left">
                                <div className="lg:w-1/2">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-teal-400 text-[10px] font-black uppercase tracking-widest mb-10">
                                        <Cpu size={14} />
                                        AI INFRASTRUCTURE
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.85] tracking-tighter">RAG Pipelines</h2>
                                    <p className="text-xl md:text-2xl text-gray-400 leading-tight mb-12 font-bold opacity-80 tracking-tight">
                                        Custom-built retrieval logic for high-fidelity technical assessment generation.
                                    </p>

                                    <div className="flex gap-12">
                                        <div>
                                            <p className="text-5xl font-black text-teal-400 tracking-tighter">100%</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Accuracy Rate</p>
                                        </div>
                                        <div>
                                            <p className="text-5xl font-black text-teal-400 tracking-tighter">Sub 2s</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Inference Speed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-black group shadow-3xl">
                                        <div className="absolute inset-0 flex items-center justify-center p-10">
                                            <div className="space-y-6 w-full max-sm:max-w-[200px]">
                                                {[
                                                    { label: "Extraction", icon: <FileText size={20} /> },
                                                    { label: "Embedding", icon: <Layers size={20} /> },
                                                    { label: "Retrieval", icon: <Database size={20} /> },
                                                    { label: "Generation", icon: <MessageSquareCode size={20} /> }
                                                ].map((step, k) => (
                                                    <div key={k} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                                                        <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-dark shadow-sm">
                                                            {step.icon}
                                                        </div>
                                                        <span className="font-bold tracking-tight text-sm md:text-base">{step.label}</span>
                                                        <div className="ml-auto w-2 h-2 rounded-full bg-teal-500/30"></div>
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

            {/* --- DESIGN SYSTEM --- */}
            <section className="py-24 md:py-48">
                <div className="container mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-[8rem] font-black text-dark dark:text-white mb-10 tracking-tighter leading-none">Visual Design</h2>
                        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-20 leading-tight font-bold opacity-80">
                            A bespoke visual language crafted for academic clarity and focus.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {themes.map((theme, i) => (
                            <ScrollReveal key={i} delay={i * 50}>
                                <div className="group cursor-default">
                                    <div className={`aspect-square rounded-[2rem] md:rounded-[3rem] mb-6 transition-all duration-700 group-hover:scale-105 shadow-xl ${theme.bg}`} />
                                    <p className="font-black text-[11px] uppercase tracking-widest text-dark dark:text-white opacity-40 group-hover:opacity-100 transition-opacity">
                                        {theme.name}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <section className="py-24 md:py-48 bg-teal-500 rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-12 mb-12 shadow-2xl relative overflow-hidden group">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ScrollReveal>
                        <h2 className="text-6xl md:text-[10rem] font-black text-dark tracking-tighter mb-12 leading-[0.75]">Full Stack Mastery.</h2>
                        <p className="max-w-xl mx-auto text-dark/70 text-xl md:text-3xl font-black mb-16 leading-none">
                            From UI design to cloud infrastructure, I delivered every line.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={300}>
                        <button
                            onClick={onBack}
                            className="px-16 py-8 bg-dark text-white rounded-[2.5rem] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                            Return to Portfolio
                        </button>
                    </ScrollReveal>
                </div>
            </section>

        </div>
    );
};

export default EngineeringHubCaseStudy;
