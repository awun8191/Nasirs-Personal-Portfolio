import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Shield, Zap,
    Layers, Terminal,
    Share2, GitMerge, Server,
    Globe, Activity, Box,
    FileText, Bot
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const EngineeringHubDocs: React.FC<DocsProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const architectureSections = [
        {
            id: "edge-layer",
            title: "Edge & Storage Layer",
            icon: Globe,
            content: "Cloudflare plays a central role in the architecture for cost control and performance. Documents are served with zero egress fees using R2 and a custom Worker Proxy, eliminating infrastructure inflation and minimizing backend load.",
            features: ["Zero Egress Cost", "R2 Storage", "Edge Caching"]
        },
        {
            id: "ai-pipe",
            title: "RAG-lite Pipeline",
            icon: Bot,
            content: "Uses scoped, course-specific documents and structured context injection rather than full corpus-wide semantic search, prioritizing accuracy and cost efficiency in technical assessment generation.",
            features: ["Context Injection", "Hybrid Search", "Sub-2s Inference"]
        },
        {
            id: "sanitization",
            title: "LaTeX & AI Sanitization",
            icon: Activity,
            content: "To ensure LLM reliability, we implement a multi-stage sanitization pipeline that strips markdown wrappers, double-escapes LaTeX backslashes for JSON safety, and handles response truncation gracefully.",
            features: ["Regex Sanitization", "LaTeX Rendering", "JSON Schema Safety"]
        }
    ];

    return (
        <div className="bg-gray-50 dark:bg-[#050914] min-h-screen transition-colors duration-500 pb-32 text-dark dark:text-gray-100 selection:bg-blue-500/30">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Case Study</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                            <Terminal size={12} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Architecture Manifest</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v2.1.0-Stable</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Technical Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                Engineering Hub <br /><span className="text-blue-600 dark:text-blue-500">Internal Specs.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                An intentional, serverless-first architecture optimized for performance, cost-efficiency, and high-fidelity AI support.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:w-2/3 space-y-32">

                        {/* PHILOSOPHY SECTION */}
                        <section className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-4">Architectural Philosophy</h2>
                                    <p className="text-3xl md:text-4xl font-black text-dark dark:text-white tracking-tight leading-none uppercase">Intentional Infrastructure</p>
                                    <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">The system was designed with a cost-first mindset, leveraging edge storage and caching to minimize backend load and eliminate document egress fees.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <Zap className="text-blue-500 mb-6" size={32} />
                                        <h3 className="text-xl font-black text-dark dark:text-white mb-4 uppercase">AI Orchestration</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                            Gemini models are orchestrated via secure Firebase Cloud Functions rather than direct client-side calls, ensuring robust validation and API key security.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <Layers className="text-blue-500 mb-6" size={32} />
                                        <h3 className="text-xl font-black text-dark dark:text-white mb-4 uppercase">Serverless Scalability</h3>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                            Every component, from processing pipelines to database queries, is designed to scale horizontally without the overhead of manual server maintenance.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* DEEP DIVE SECTIONS */}
                        {architectureSections.map((section, idx) => (
                            <section key={section.id} id={section.id} className="scroll-mt-32">
                                <ScrollReveal delay={idx * 50}>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                            <section.icon size={28} />
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                            {section.title}
                                        </h2>
                                    </div>

                                    <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                        {section.content}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-12">
                                        {section.features.map(f => (
                                            <span key={f} className="px-4 py-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Visual Placeholder for docs - Styled Content */}
                                    <div className="p-8 md:p-12 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden group shadow-3xl">
                                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />

                                        <div className="relative z-10 grid md:grid-cols-3 gap-10 items-center text-center">
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="space-y-4">
                                                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 mx-auto flex items-center justify-center">
                                                        <FileText className="text-blue-500/40" size={20} />
                                                    </div>
                                                    <div className="h-1 w-8 bg-blue-600 mx-auto rounded-full" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Service Node {i + 1}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>
                        ))}

                        {/* --- TECHNOLOGY STACK GRID --- */}
                        <section className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12 text-center md:text-left">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-4">Ecosystem Hub</h2>
                                    <p className="text-4xl md:text-6xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Integrated Tech</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Frontend", val: "Flutter / Dart", icon: <Box size={24} /> },
                                        { label: "Backend", val: "Firebase / Python", icon: <Server size={24} /> },
                                        { label: "Storage", val: "Cloudflare R2", icon: <Database size={24} /> },
                                        { label: "AI Engine", val: "Google Gemini", icon: <Cpu size={24} /> },
                                        { label: "State Mgmt", val: "flutter_bloc", icon: <Activity size={24} /> },
                                        { label: "Caching", val: "Hive / Workers", icon: <Layers size={24} /> },
                                        { label: "Security", val: "App Check", icon: <Shield size={24} /> },
                                        { label: "Hosting", val: "Firebase Hosting", icon: <Globe size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-blue-500/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-blue-500 transition-colors mb-4">
                                                {t.icon}
                                            </div>
                                            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1">{t.label}</p>
                                            <p className="text-sm font-bold text-dark dark:text-white">{t.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>
                    </div>

                    {/* --- SIDEBAR --- */}
                    <aside className="lg:w-1/3 space-y-12">
                        <div className="sticky top-32 space-y-12">

                            {/* IDIOSYNCRASIES HIGHLIGHT */}
                            <ScrollReveal delay={400}>
                                <div className="bg-dark rounded-[2.5rem] border border-white/10 p-10 shadow-3xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-8">Technical Sophistication</h3>

                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Secure AI Integration</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Firebase-managed integration with Google Gemini models for secure server-side inference, bypassing direct client-side API exposure.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">LaTeX Rendering</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Custom regex logic ensures backslashes are double-escaped for JSON decoding stability in mathematical quiz generation.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">R2 Cache Proxy</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Handles Range-Request support for large PDFs, allowing the viewer to load only required pages via edge Workers.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* ARCHITECTURE OUTCOME */}
                            <ScrollReveal delay={600}>
                                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group cursor-pointer active:scale-95 transition-transform">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Architectural <br />Outcome</h3>
                                    <p className="text-blue-100/80 font-bold text-sm mb-6 relative z-10 leading-relaxed">A sustainable, high-scale system that delivers AI value without infrastructure inflation.</p>
                                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 relative z-10">
                                        Download Whitepaper <Share2 size={12} />
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="text-center">
                                <GitMerge className="text-gray-200 dark:text-gray-800 mx-auto mb-4" size={40} />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Build Hash: 7fb2a1d</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="py-24 border-t border-gray-200 dark:border-white/5 mt-32">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Engineering Hub • Architecture Documentation Package</p>
                    <div className="flex gap-12">
                        {["Performance", "Scalability", "Security"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EngineeringHubDocs;
