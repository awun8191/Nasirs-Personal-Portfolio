import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity,
    FileText, Bot, BookOpen,
    Layers, Zap, Search, Link2,
    GitBranch, Shield
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const RaStDocs: React.FC<DocsProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-[#050914] min-h-screen transition-colors duration-500 pb-32 text-dark dark:text-gray-100 selection:bg-pink-500/30">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-pink-500/10 rounded-full border border-pink-500/20">
                            <Cpu size={12} className="text-pink-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-pink-500">Multi-Agent Architecture</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v1.0.0-Beta</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                RAST <br /><span className="text-pink-600 dark:text-pink-500">ResearchDoi.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                An AI research assistant for academic DOI lookup, PDF analysis, and RAG-based thesis generation - powered by multi-agent orchestration.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:w-2/3 space-y-32">

                        {/* --- OVERVIEW --- */}
                        <section id="overview" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                                        <Bot size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Overview
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    RAST (ResearchDoi) is a sophisticated AI-powered research assistant engineered to eliminate hallucinated citations and produce publishable-quality academic writing. The system accepts a DOI or paper submission, resolves metadata, analyzes PDF content, and generates structured thesis sections - all through a deterministic multi-agent pipeline.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "Deterministic Citations", desc: "Every claim is traceable to its source with no hallucinated references." },
                                        { title: "Multi-Agent Orchestration", desc: "Three specialized agents collaborate through Google ADK for end-to-end processing." },
                                        { title: "Academic-Grade Output", desc: "Generates structured sections (abstract, methodology, results) ready for publication." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-pink-500 mb-2">Design Goal</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ARCHITECTURE FLOW */}
                            <ScrollReveal>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Input Pipeline</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">01</span><span>User submits DOI or uploads academic PDF</span></li>
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">02</span><span>DOI validated and metadata extracted via REST APIs</span></li>
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">03</span><span>PDF routed to text extraction pipeline (PyMuPDF)</span></li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-pink-600 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Output Pipeline</h3>
                                        <ul className="space-y-4 text-sm text-pink-100/80 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-white font-black">01</span><span>Thesis section generated with inline citation links</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">02</span><span>Deterministic references - every claim traceable to source</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">03</span><span>Structured academic format: abstract, methodology, results</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- MULTI-AGENT ARCHITECTURE --- */}
                        <section id="multi-agent" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                                        <GitBranch size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Multi-Agent Architecture
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    RAST employs a three-layer agent system orchestrated by <b>Google ADK (Agent Development Kit)</b>. Each agent is a specialized, independently operable module that communicates through typed interfaces, ensuring deterministic handoffs and reproducible outputs.
                                </p>

                                <div className="space-y-8">
                                    {[
                                        {
                                            agent: "Agent 1 - DOI Resolution",
                                            icon: <Search size={20} />,
                                            desc: "Fetches paper metadata from DOI APIs, validates DOI structure and existence, extracts author, title, publication year, and DOI. Acts as the gateway - no invalid reference passes through.",
                                            items: ["DOI format validation & checksum verification", "Metadata retrieval via CrossRef / DataCite APIs", "Author, title, year, and DOI extraction"]
                                        },
                                        {
                                            agent: "Agent 2 - PDF Analysis",
                                            icon: <FileText size={20} />,
                                            desc: "Extracts text from academic PDFs using PyMuPDF, intelligently chunks content into semantically coherent sections, and generates structured summaries per section.",
                                            items: ["Full-text extraction with PyMuPDF", "Semantic chunking at section boundaries", "Per-chunk summary generation"]
                                        },
                                        {
                                            agent: "Agent 3 - RAG Generation",
                                            icon: <Bot size={20} />,
                                            desc: "Retrieves relevant chunks via vector search in ChromaDB, then generates structured academic text with deterministic citation linking - every in-text reference is a verifiable source anchor.",
                                            items: ["Vector similarity search over embedded chunks", "Structured academic output (abstract, methodology, results)", "Deterministic citation linking with source anchors"]
                                        }
                                    ].map((layer, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-pink-500/30 transition-all group">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 rounded-xl bg-pink-600/10 text-pink-500 group-hover:bg-pink-600 group-hover:text-white transition-all">
                                                    {layer.icon}
                                                </div>
                                                <h3 className="text-xl font-black text-dark dark:text-white uppercase tracking-tight">{layer.agent}</h3>
                                            </div>
                                            <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">{layer.desc}</p>
                                            <ul className="space-y-2 text-sm text-gray-500 font-medium">
                                                {layer.items.map((item, j) => (
                                                    <li key={j} className="flex gap-3"><span className="text-pink-500 font-black">-</span><span>{item}</span></li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ARCHITECTURE DIAGRAM TABLE */}
                            <ScrollReveal>
                                <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-white/5">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-pink-500">Agent Layer</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-pink-500">Role</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-pink-500">Output</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {[
                                                { agent: "DOI Resolution", role: "Validate & Resolve", out: "Structured Paper Metadata" },
                                                { agent: "PDF Analysis", role: "Extract & Chunk", out: "Semantic Text Chunks + Summaries" },
                                                { agent: "RAG Generation", role: "Retrieve & Generate", out: "Thesis Section with Source Links" }
                                            ].map((row, i) => (
                                                <tr key={i} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-5 text-dark dark:text-white font-bold">{row.agent}</td>
                                                    <td className="px-8 py-5">{row.role}</td>
                                                    <td className="px-8 py-5">{row.out}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- DOI RESOLUTION --- */}
                        <section id="doi-resolution" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                                        <Link2 size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        DOI Resolution
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The DOI Resolution Agent acts as the front-line validator. Every submitted DOI passes through a rigorous validation pipeline before any downstream processing begins, ensuring that only verifiable, well-formed references enter the system.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Shield className="text-pink-500" size={20} />
                                            Validation Pipeline
                                        </h4>
                                        <ul className="space-y-3 text-sm text-gray-500 font-medium">
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">01</span><span>DOI format regex validation & checksum verification</span></li>
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">02</span><span>CrossRef REST API lookup for metadata confirmation</span></li>
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">03</span><span>DataCite fallback for cross-referencing</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Database className="text-pink-500" size={20} />
                                            Extracted Metadata
                                        </h4>
                                        <ul className="space-y-3 text-sm text-gray-500 font-medium">
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">-</span><span>Paper title & author list</span></li>
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">-</span><span>Publication year & journal</span></li>
                                            <li className="flex gap-3"><span className="text-pink-500 font-black">-</span><span>Canonical DOI & citation count</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- PDF ANALYSIS --- */}
                        <section id="pdf-analysis" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                                        <FileText size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        PDF Analysis
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The PDF Analysis Agent transforms raw academic PDFs into structured, semantically organized content. Using <b>PyMuPDF</b> for high-fidelity text extraction and intelligent chunking at section boundaries, the agent prepares material for downstream retrieval and generation.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Layers className="text-pink-500" size={20} />
                                            Text Extraction
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            PyMuPDF extracts full-text content with high fidelity, preserving section structure, equation formatting, and reference markers. The extraction pipeline handles multi-column layouts, headers, footers, and footnotes.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Zap className="text-pink-500" size={20} />
                                            Semantic Chunking
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Content is intelligently split at natural section boundaries (abstract, introduction, methodology, results, conclusion). Each chunk receives a summary generated via Google Gemini API for efficient retrieval.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- RAG GENERATION --- */}
                        <section id="rag-generation" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                                        <BookOpen size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        RAG Generation
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The RAG Generation Agent is the final stage of the pipeline. It retrieves semantically relevant chunks from ChromaDB via vector similarity search and synthesizes them into structured academic text - complete with deterministic inline citations that link every claim back to its source chunk.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8 mb-12">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Database className="text-pink-500" size={20} />
                                            Vector Retrieval
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Paper chunks embedded via Google Gemini API and stored in ChromaDB. The retriever scores relevance using cosine similarity and returns the top-k chunks most pertinent to the requested thesis section.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Link2 className="text-pink-500" size={20} />
                                            Citation Linking
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Every generated sentence is linked to its source chunk ID. The output includes a references map at the bottom, making all citations auditable and eliminating hallucinated references entirely.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- DETERMINISTIC CITATIONS --- */}
                        <section id="deterministic-citations" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                                        <Shield size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Deterministic Citations
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The hallmark of RAST is its deterministic citation system - every claim made in generated academic text is associated with a specific source chunk from the analyzed PDF. This eliminates the most common failure mode in academic AI tools: fabricated references.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8 mb-12">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Link2 className="text-pink-500" size={20} />
                                            Source Anchoring
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Generated text is interleaved with source anchors - each factual claim is tagged with the chunk ID from which it was derived. The final output includes a references section mapping every anchor to its original source.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Activity className="text-pink-500" size={20} />
                                            Audit Trail
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Every generation run produces a full provenance log linking each output sentence to source chunks, extraction timestamps, and agent version. This makes RAST suitable for academic peer review validation.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-white/5">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-pink-500">Failure Mode</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-pink-500">Mitigation Strategy</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {[
                                                { mode: "Hallucinated Citations", strat: "Deterministic source anchoring with chunk-level traceability" },
                                                { mode: "Irrelevant Retrieval", strat: "Semantic chunking at section boundaries + cosine re-ranking" },
                                                { mode: "Plagiarism Risk", strat: "Structured paraphrasing with original-source metadata" },
                                                { mode: "Metadata Corruption", strat: "Multi-API DOI validation (CrossRef + DataCite fallback)" }
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

                        {/* --- STATS --- */}
                        <section id="stats" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">System Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-pink-500 mb-2">3</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Agent Layers</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-pink-500 mb-2">100%</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Deterministic Citations</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-pink-500 mb-2">&lt;5s</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">End-to-End Latency</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- STACK SECTION --- */}
                        <section className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-pink-500 mb-4">Development Environment</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Technology Stack</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Frontend", val: "React (Vite) + TS", icon: <Terminal size={24} /> },
                                        { label: "Backend", val: "FastAPI (Python 3.12)", icon: <Bot size={24} /> },
                                        { label: "Agent Framework", val: "Google ADK", icon: <GitBranch size={24} /> },
                                        { label: "Vector DB", val: "ChromaDB", icon: <Database size={24} /> },
                                        { label: "PDF Extraction", val: "PyMuPDF", icon: <FileText size={24} /> },
                                        { label: "AI Model", val: "Google Gemini API", icon: <Cpu size={24} /> },
                                        { label: "Language", val: "Python 3.12", icon: <Activity size={24} /> },
                                        { label: "Server", val: "Uvicorn", icon: <Globe size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-pink-500/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-pink-500 transition-colors mb-4">
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
                                    <h3 className="text-sm font-black uppercase tracking-widest text-pink-500 mb-8">System Integrity</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Deterministic Generation</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Temperature locked at 0.0 with fixed seed values. Every source chunk produces identical citation anchors across runs, guaranteeing reproducible academic output.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Multi-Agent Handoff</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Google ADK orchestrates typed inter-agent communication with schema-validated payloads, preventing data corruption during agent-to-agent transitions.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-pink-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Architectural <br />Summary</h3>
                                    <p className="text-pink-100/80 font-bold text-sm mb-6 relative z-10">A multi-agent academic assistant that treats citation integrity as a first-class constraint rather than an afterthought.</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">RAST • ResearchDoi Multi-Agent Architecture</p>
                    <div className="flex gap-12">
                        {["Determinism", "Multi-Agent", "Citations"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RaStDocs;
