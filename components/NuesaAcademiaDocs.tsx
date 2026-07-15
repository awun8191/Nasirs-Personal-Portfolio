import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity, Box,
    FileText, Bot,
    Cloud, Hash,
    BookMarked, Network, Lock,
    Search, Upload, Layers, Zap, Shield
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const NuesaAcademiaDocs: React.FC<DocsProps> = ({ onBack }) => {
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
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                            <Cpu size={12} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Digital Learning Platform</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v2.0-Production</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                NUESA <br /><span className="text-blue-600 dark:text-blue-500">Academia.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                A digital learning resource management system serving 800–1,200 engineering students monthly at ABUAD with a three-tier architecture spanning edge delivery, AI content pipelines, and real-time generation.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:w-2/3 space-y-32">

                        {/* --- ARCHITECTURE OVERVIEW --- */}
                        <section id="architecture" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                        <Layers size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Architecture Overview
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    NUESA Academia is engineered as a <b>three-layer architecture</b> that separates content storage, AI processing, and user-facing delivery into independently scalable tiers — enabling rapid feature iteration without compromising system stability.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "Storage & Delivery Layer", desc: "Cloudflare R2 object storage with Firestore metadata indexing, Redis caching, and edge CDN for low-latency global content delivery." },
                                        { title: "AI Content Pipeline", desc: "Tesseract OCR + Gemini Vision transcription, BGE-M3 embeddings via Cloudflare Workers AI, and ChromaDB vector storage for semantic retrieval." },
                                        { title: "Frontend Delivery", desc: "Next.js 16 with React 19, TypeScript, Tailwind CSS 4, and TanStack React Query for real-time data synchronisation and optimistic UI updates." }
                                    ].map((layer, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Layer {i + 1}</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{layer.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{layer.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* PHASE A & B */}
                            <ScrollReveal>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Phase A: OCR & Vectors</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-blue-500 font-black">01</span><span>Tesseract OCR with Gemini Vision fallback for low-confidence or math-heavy pages</span></li>
                                            <li className="flex gap-3"><span className="text-blue-500 font-black">02</span><span>BGE-M3 embedding generation via Cloudflare Workers AI with local dedup caching</span></li>
                                            <li className="flex gap-3"><span className="text-blue-500 font-black">03</span><span>ChromaDB vector ingestion with Firestore course-code namespacing for scoped retrieval</span></li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-blue-600 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Phase B: Retrieval + Generation</h3>
                                        <ul className="space-y-4 text-sm text-blue-100/80 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-white font-black">01</span><span>Metadata-filtered vector search scoped to specific courses & departments</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">02</span><span>Gemini-powered course outline generation: 8–12 modules, 5 learning objectives each</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">03</span><span>MCQ bank generation: 20 questions per subtopic — 10 theory + 10 calculation with LaTeX</span></li>
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
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-blue-500">Failure Mode</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-blue-500">Mitigation Strategy</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {[
                                                { mode: "Hallucinated Course Content", strat: "Domain-bounded vector search + Gemini structured output schemas" },
                                                { mode: "Stale Syllabus Data", strat: "14,319-line courses.json with SHA-256 hash dedup and virtual course creation" },
                                                { mode: "Concurrent Upload Conflicts", strat: "Cloudflare Workers atomic Firestore writes + API key auth middleware" },
                                                { mode: "OCR Quality Degradation", strat: "Tesseract primary + Gemini Vision fallback for sub-85% confidence pages" }
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
                        </section>

                        {/* --- EDGE WORKERS --- */}
                        <section id="edge-workers" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                        <Cloud size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Edge Workers
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    A 461-line TypeScript Cloudflare Worker acts as the platform's edge compute layer, directly serving R2 file operations and Firestore writes — bypassing the main API for latency-critical operations and reducing backend load by over 40%.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Search className="text-blue-500" size={20} />
                                            Direct R2 File Search
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            The worker performs efficient object listing and retrieval directly against the <b>study-materials</b> R2 bucket (public at study-materials.nuesaabuad.ng), enabling instant file discovery without round-tripping through the FastAPI backend.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Upload className="text-blue-500" size={20} />
                                            Edge Upload & Firestore Sync
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Uploads flow directly from the client to R2 via signed URLs, with the worker writing metadata to Firestore (<code className="text-blue-500">all_courses/{'{code}'}/textbooks/{'{id}'}</code>) in a single atomic operation — eliminating intermediate staging.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Firebase Cloud Functions</h3>
                                        <p className="text-sm text-gray-400 font-medium mb-8 max-w-2xl">
                                            Three serverless endpoints extend the edge layer: an <b>analytics_trigger</b> (Firestore <code>on_document_written</code> event), and dedicated HTTP endpoints for textbook deletion and metadata updates — providing a complete CRUD surface at the edge.
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                            <div>
                                                <p className="text-lg font-black text-blue-400 mb-1">analytics_trigger</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">on_document_written</p>
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-blue-400 mb-1">DELETE /textbook</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">HTTP Endpoint</p>
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-blue-400 mb-1">PATCH /metadata</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">HTTP Endpoint</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- AI PIPELINE --- */}
                        <section id="ai-pipeline" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                        <Bot size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        AI Content Pipeline
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The CourseGen pipeline transforms raw textbook PDFs into structured, pedagogically sound course material through a two-phase AI process — OCR extraction paired with Gemini-powered generation — all orchestrated through Cloudflare's edge infrastructure.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                                                <FileText size={20} />
                                            </div>
                                            <h4 className="text-lg font-black text-dark dark:text-white uppercase">OCR Layer</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            <b>Tesseract</b> provides fast, offline OCR for standard textbook pages. When confidence drops below 85% — common with mathematical notation, tables, or low-resolution scans — the pipeline escalates to <b>Gemini Vision</b> for high-fidelity transcription, ensuring zero silent data loss.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                                                <Network size={20} />
                                            </div>
                                            <h4 className="text-lg font-black text-dark dark:text-white uppercase">Embedding Pipeline</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Transcribed text is chunked and embedded using <b>BGE-M3</b> via Cloudflare Workers AI. A SHA-256 hash deduplication layer prevents redundant embedding calls — identical textbook versions across semesters reuse existing vectors, reducing pipeline costs by up to 60%.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                                                <BookMarked size={20} />
                                            </div>
                                            <h4 className="text-lg font-black text-dark dark:text-white uppercase">Course Outline Generation</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Gemini generates comprehensive course outlines from extracted material — <b>8–12 modules</b> per course, each with <b>5 learning objectives</b>. The syllabus is cross-referenced against the 14,319-line <code className="text-blue-500">courses.json</code> covering 9 engineering departments plus General Studies.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                                                <Zap size={20} />
                                            </div>
                                            <h4 className="text-lg font-black text-dark dark:text-white uppercase">MCQ Bank Generation</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Per subtopic, the pipeline generates <b>20 questions</b> — split evenly between <b>10 theory questions</b> and <b>10 calculation questions</b> with full LaTeX rendering. Questions are structured for programmatic validation and can be served via the frontend as timed quizzes or practice sets.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- INGESTION STATISTICS --- */}
                        <section id="statistics" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                                        <Activity size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Platform Statistics
                                    </h2>
                                </div>

                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden mb-12">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Ingestion & Usage</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-blue-400 mb-2">1,200+</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Monthly Active Users</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-blue-400 mb-2">14,319</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Courses.json Lines</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-blue-400 mb-2">9</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Engineering Depts</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-blue-400 mb-2">461</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Worker TS Lines</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { dept: "AAE", name: "Aeronautical Engineering" },
                                        { dept: "BME", name: "Biomedical Engineering" },
                                        { dept: "CHE", name: "Chemical Engineering" },
                                        { dept: "CVL", name: "Civil Engineering" },
                                        { dept: "COE", name: "Computer Engineering" },
                                        { dept: "EEE", name: "Electrical Engineering" },
                                        { dept: "MEE", name: "Mechanical Engineering" },
                                        { dept: "MCT", name: "Mechatronics Engineering" },
                                        { dept: "PTE", name: "Petroleum Engineering" },
                                        { dept: "GST", name: "General Studies" }
                                    ].map((d, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center gap-3">
                                            <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{d.dept}</span>
                                            <span className="text-xs text-gray-500">{d.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- TECH STACK --- */}
                        <section className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-4">Technology</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Full Stack Ecosystem</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Frontend", val: "Next.js 16 / React 19", icon: <Terminal size={24} /> },
                                        { label: "Styling", val: "Tailwind CSS 4", icon: <Layers size={24} /> },
                                        { label: "State", val: "TanStack React Query", icon: <Activity size={24} /> },
                                        { label: "Backend", val: "FastAPI / Python 3.12", icon: <Database size={24} /> },
                                        { label: "Hosting", val: "Google Cloud Run", icon: <Globe size={24} /> },
                                        { label: "Cache", val: "Redis", icon: <Zap size={24} /> },
                                        { label: "Vector DB", val: "ChromaDB", icon: <Network size={24} /> },
                                        { label: "Embeddings", val: "BGE-M3 (Workers AI)", icon: <Cpu size={24} /> },
                                        { label: "Object Store", val: "Cloudflare R2", icon: <Cloud size={24} /> },
                                        { label: "Metadata", val: "Firestore", icon: <Activity size={24} /> },
                                        { label: "AI Model", val: "Gemini / Tesseract", icon: <Bot size={24} /> },
                                        { label: "Auth", val: "Firebase Auth + API Key", icon: <Lock size={24} /> },
                                        { label: "Edge Compute", val: "Cloudflare Workers", icon: <Cloud size={24} /> },
                                        { label: "Auth Middleware", val: "FastAPI Depends", icon: <Shield size={24} /> },
                                        { label: "Dedup", val: "SHA-256 Hashing", icon: <Hash size={24} /> },
                                        { label: "Deploy", val: "Cloud Run + Workers", icon: <Box size={24} /> }
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
                    <aside className="lg:w-1/3">
                        <div className="sticky top-32 space-y-12">
                            <ScrollReveal delay={400}>
                                <div className="bg-dark rounded-[2.5rem] border border-white/10 p-10 shadow-3xl">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-blue-500 mb-8">System Integrity</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">SHA-256 Deduplication</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Every textbook chunk is hashed before embedding — identical content from multi-semester uploads reuses cached vectors, eliminating redundant Gemini API calls and reducing pipeline costs by up to 60%.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Virtual Course Creation</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Courses can be assembled dynamically from existing materials without duplicating storage. Virtual courses reference shared textbook blobs via Firestore pointers, enabling curated reading lists across departments.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Dual Auth Middleware</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Firebase Auth handles user sessions while API key authentication protects backend endpoints. The Cloudflare Worker validates tokens at the edge before any Firestore write, maintaining end-to-end security.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Deployment <br />Details</h3>
                                    <p className="text-blue-100/80 font-bold text-sm mb-6 relative z-10">Live at textbooks-1093886938384.europe-west1.run.app — serving engineering education at ABUAD with sub-200ms p95 response times.</p>
                                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 relative z-10">
                                        Production Release <Share2 size={12} />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="py-24 border-t border-gray-200 dark:border-white/5 mt-32">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">NUESA Academia • Digital Learning Platform</p>
                    <div className="flex gap-12">
                        {["Scale", "Security", "Education"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NuesaAcademiaDocs;
