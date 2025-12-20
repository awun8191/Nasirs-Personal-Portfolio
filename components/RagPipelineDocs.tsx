import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity, Box,
    FileText, Bot, BookOpen,
    Layers, Zap
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const RagPipelineDocs: React.FC<DocsProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                            <Cpu size={12} className="text-green-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-500">AI Infrastructure Manifest</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v1.4.2-Stable</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                RAG Data <br /><span className="text-green-600 dark:text-green-500">Pipeline.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                A high-throughput, semantically aware ingestion engine designed for deterministic RAG at scale.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:w-2/3 space-y-32">

                        {/* --- RAG DATA PIPELINE DEEP DIVE --- */}
                        <section id="rag-pipeline" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center text-white shadow-xl shadow-green-500/20">
                                        <Bot size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        RAG Data Pipeline
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The RAG Data Pipeline is designed to generate accurate, context-aware content while remaining cost-efficient, scalable, and deterministic. Rather than performing unrestricted semantic search across all documents, the pipeline deliberately scopes retrieval to known domains, reducing hallucinations and unnecessary compute.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "Accuracy over breadth", desc: "Strictly reflects only uploaded academic materials." },
                                        { title: "Cost Awareness", desc: "Minimizes repeated embedding and token usage via caching." },
                                        { title: "Deterministic", desc: "Ensures reproducible AI outputs for consistency." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mb-2">Design Goal</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* PHASE A & B */}
                            <div className="space-y-12">
                                <ScrollReveal>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Phase A: Ingestion</h3>
                                            <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-green-500 font-black">01</span><span>Cloudflare R2 Storage & Firestore Metadata Indexing</span></li>
                                                <li className="flex gap-3"><span className="text-green-500 font-black">02</span><span>EasyOCR core with Gemma 3:27b fallback for low-confidence text</span></li>
                                                <li className="flex gap-3"><span className="text-green-500 font-black">03</span><span>BGE-M3 (bg3) Embedding Generation with local caching</span></li>
                                            </ul>
                                        </div>
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-green-600 text-white relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Phase B: Retrieval</h3>
                                            <ul className="space-y-4 text-sm text-green-100/80 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-white font-black">01</span><span>Metadata-Filtered Scoped Search (RAG-lite)</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">02</span><span>Deduplicated Context Assembly & Token Budget Trimming</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">03</span><span>Controlled Generation via JSON Schema System Templates</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* MITIGATION TABLE */}
                                <ScrollReveal>
                                    <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-white/5">
                                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-green-500">Failure Mode</th>
                                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-green-500">Mitigation Strategy</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                {[
                                                    { mode: "Hallucinated Content", strat: "Strict Context Scoping & Domain-Bounded Search" },
                                                    { mode: "Truncated Outputs", strat: "Detection Logic & Recursive Prompt Reduction" },
                                                    { mode: "Invalid JSON Schema", strat: "Multi-Stage Sanitization & Repair Pipeline" },
                                                    { mode: "Token Overflow", strat: "Metadata-Weighted Priority Context Trimming" }
                                                ].map((row, i) => (
                                                    <tr key={i} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                                        <td className="px-8 py-5 text-dark dark:text-white font-bold">{row.mode}</td>
                                                        <td className="px-8 py-5">{row.strat}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </section>

                        {/* --- MASS INGESTION & TRANSCRIPTION --- */}
                        <section id="mass-ingestion" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center text-white shadow-xl shadow-green-500/20">
                                        <BookOpen size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Mass Ingestion Tier
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    To support institutional-scale deployment, the pipeline facilitates the automated ingestion of <b>2,000+ PDF documents</b>. This involves a specialized transcription layer that converts raw, multi-format sources into clean, semantically structured context shippable to AI agents.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Layers className="text-green-500" size={20} />
                                            Text Normalization
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            The pipeline utilizes <b>OpenCV</b> to automatically detect and correct the orientation of PDF pages before processing. This ensures that the transcription engine receives perfectly aligned text, eliminating noise from skewed or rotated source material.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Zap className="text-green-500" size={20} />
                                            High-Conf Transcription
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            A bi-stage OCR strategy combines lightweight <b>EasyOCR</b> for speed with <b>Gemma 3:27b</b> fallback for complex tables, math notations, or low-resolution scans, ensuring maximum precision across the entire library.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Ingestion Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-green-500 mb-2">2,000+</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">PDFs Processed</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-green-500 mb-2">1M+</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Semantic Chunks</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-green-500 mb-2">&lt;2s</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Search Latency</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* STACK SECTION */}
                        <section className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-green-500 mb-4">Development Environment</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Pipeline Ecosystem</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Core Logic", val: "Python 3.12", icon: <Terminal size={24} /> },
                                        { label: "AI Model", val: "Google Gemini", icon: <Bot size={24} /> },
                                        { label: "Vector DB", val: "Chroma / Vectorize", icon: <Database size={24} /> },
                                        { label: "Embeddings", val: "BGE-M3 (bg3)", icon: <Cpu size={24} /> },
                                        { label: "Ingestion", val: "EasyOCR / Gemma 3", icon: <FileText size={24} /> },
                                        { label: "Metadata", val: "Firestore", icon: <Activity size={24} /> },
                                        { label: "Deployment", val: "Docker (EC2)", icon: <Box size={24} /> },
                                        { label: "Cloud", val: "AWS / Cloudflare", icon: <Globe size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-green-500/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-green-500 transition-colors mb-4">
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
                    <aside className="lg:w-1/3">
                        <div className="sticky top-32 space-y-12">
                            <ScrollReveal delay={400}>
                                <div className="bg-dark rounded-[2.5rem] border border-white/10 p-10 shadow-3xl">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-green-500 mb-8">System Integrity</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Deterministic Generation</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Temperature is locked at 0.0 with specialized seeding to ensure that the same source material produces identical chunk IDs across shards.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Efficient Token Reuse</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Chunk-level hashes prevent redundant embedding calls to Gemini/Cloudflare APIs, reducing pipeline costs by up to 70% for multi-versioned docs.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-green-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Architectural <br />Summary</h3>
                                    <p className="text-green-100/80 font-bold text-sm mb-6 relative z-10">A professional knowledge-aware engine that treats AI as stable infrastructure rather than an unpredictable chatbot.</p>
                                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 relative z-10">
                                        Source Code <Share2 size={12} />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="py-24 border-t border-gray-200 dark:border-white/5 mt-32">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">RAG Data Pipeline • AI Infrastructure Package</p>
                    <div className="flex gap-12">
                        {["Determinism", "Scale", "Efficiency"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RagPipelineDocs;
