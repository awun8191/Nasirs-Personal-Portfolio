import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity, Box,
    FileText, MapPin, Shield,
    Layers, Zap, Search, CheckCircle, AlertTriangle
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const TraksDocs: React.FC<DocsProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-[#050914] min-h-screen transition-colors duration-500 pb-32 text-dark dark:text-gray-100 selection:bg-orange-500/30">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                            <Cpu size={12} className="text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Community Safety Platform</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v2.3.0-Stable</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                TRAKS <br /><span className="text-orange-600 dark:text-orange-500">Platform.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                A community-powered incident reporting and SOS platform with real-time alerts, geolocation, and semantic search.
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
                                    <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                                        <Globe size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Overview
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    TRAKS is a community incident reporting and SOS platform designed for low-barrier reporting. Users submit incidents with their location, reverse geocoding enriches the data, and the community collectively verifies reports through a confirm/refute system. Verified incidents become searchable through vector-based semantic search powered by Cloudflare Vectorize.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "Low-Barrier Reporting", desc: "Minimal friction to submit an incident with automatic location enrichment." },
                                        { title: "Community-Driven Verification", desc: "Reduces false reports through collective confirm/refute mechanisms." },
                                        { title: "Semantic Incident Search", desc: "Find past incidents by meaning, not just keywords." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2">Design Goal</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- GEOLOCATION & SOS PIPELINE --- */}
                        <section id="geolocation-sos" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                                        <MapPin size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Geolocation & SOS Pipeline
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The core of TRAKS is its real-time geolocation pipeline. When a user reports an incident, their location is captured and reverse geocoded to enrich the report with address and area metadata. The SOS mode triggers an emergency alert that instantly notifies nearby users.
                                </p>

                                <div className="space-y-12">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Reporting Flow</h3>
                                            <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">01</span><span>User submits incident with geolocation coordinates</span></li>
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">02</span><span>Reverse geocoding enriches report with address metadata</span></li>
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">03</span><span>Report enters community verification queue</span></li>
                                            </ul>
                                        </div>
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-orange-600 text-white relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">SOS Mode</h3>
                                            <ul className="space-y-4 text-sm text-orange-100/80 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-white font-black">01</span><span>Emergency button triggers instant push notification</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">02</span><span>Nearby users receive real-time alert with location</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">03</span><span>Response network mobilized within seconds</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- VERIFICATION SYSTEM --- */}
                        <section id="verification" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                                        <Shield size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Verification System
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    To maintain information integrity, TRAKS employs a community-driven verification system. Instead of a centralized moderation team, the community collectively confirms or refutes each reported incident, naturally filtering false reports and surfacing credible threats.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <CheckCircle className="text-orange-500" size={20} />
                                            Confirm Mechanism
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Community members near the incident location can <b>confirm</b> a report, adding credibility weight. Each confirmation is tied to the user's proximity and reputation, ensuring that only relevant, trustworthy validations affect incident status.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <AlertTriangle className="text-orange-500" size={20} />
                                            Refute Mechanism
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Users can <b>refute</b> false or outdated reports, providing a reason for disagreement. Reports that accumulate sufficient refutes relative to confirms are automatically demoted, preventing misinformation from spreading through the platform.
                                        </p>
                                    </div>
                                </div>

                                {/* MITIGATION TABLE */}
                                <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-white/5">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-orange-500">Failure Mode</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-orange-500">Mitigation Strategy</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {[
                                                { mode: "False Reports", strat: "Community Verification with Confirm/Refute Voting" },
                                                { mode: "Spam Incidents", strat: "Reputation-Based Weighting & Rate Limiting" },
                                                { mode: "Outdated Information", strat: "Automatic Demotion After Refute Threshold" },
                                                { mode: "Location Spoofing", strat: "Geolocation Validation & Proximity Checks" }
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

                        {/* --- SEMANTIC SEARCH WITH VECTORIZE --- */}
                        <section id="semantic-search" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                                        <Search size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Semantic Search with Vectorize
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Verified incidents are indexed into <b>Cloudflare Vectorize</b>, enabling semantic vector-based search across the entire incident history. Users can find past reports by describing what happened, not just by matching keywords.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Zap className="text-orange-500" size={20} />
                                            Vector Embedding Pipeline
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Incident descriptions and metadata are converted into vector embeddings and stored in Cloudflare Vectorize. Queries are matched against the vector index using cosine similarity, returning the most semantically relevant incidents regardless of exact keyword overlap.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Activity className="text-orange-500" size={20} />
                                            Sub-500ms Retrieval
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Leveraging Cloudflare's global edge network, vector search queries return results in <b>under 500 milliseconds</b>. This enables real-time lookup of historical incident patterns, helping users assess whether a situation has been reported before.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- ARCHITECTURE --- */}
                        <section id="architecture" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                                        <Layers size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Architecture
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    TRAKS follows a distributed architecture where Cloudflare Workers handle edge logic, Firebase manages authentication and real-time data, and Cloudflare R2 stores incident media assets. FastAPI orchestrates the backend pipeline.
                                </p>

                                <div className="space-y-12">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Data Flow</h3>
                                            <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">01</span><span>User reports incident with location via FastAPI</span></li>
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">02</span><span>Reverse geocoding enriches coordinate data</span></li>
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">03</span><span>Community verifies — confirms or refutes</span></li>
                                                <li className="flex gap-3"><span className="text-orange-500 font-black">04</span><span>Verified incidents indexed into Vectorize for semantic search</span></li>
                                            </ul>
                                        </div>
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-orange-600 text-white relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Service Layers</h3>
                                            <ul className="space-y-4 text-sm text-orange-100/80 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-white font-black">01</span><span>FastAPI Backend — Core pipeline orchestration</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">02</span><span>Cloudflare Workers — Edge logic & API routing</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">03</span><span>Firebase — Auth & real-time Firestore storage</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">04</span><span>Cloudflare R2 — Incident media & file storage</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* STATS SECTION */}
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Platform Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-orange-500 mb-2">&lt;500ms</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Search Latency</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-orange-500 mb-2">Real-Time</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Alerts</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-orange-500 mb-2">100K+</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Incidents Indexed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- STACK --- */}
                        <section className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-orange-500 mb-4">Development Environment</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Platform Ecosystem</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Backend", val: "FastAPI", icon: <Terminal size={24} /> },
                                        { label: "Auth", val: "Firebase Auth", icon: <Shield size={24} /> },
                                        { label: "Database", val: "Firestore", icon: <Database size={24} /> },
                                        { label: "Edge Logic", val: "Cloudflare Workers", icon: <Cpu size={24} /> },
                                        { label: "Vector Search", val: "Cloudflare Vectorize", icon: <Zap size={24} /> },
                                        { label: "Storage", val: "Cloudflare R2", icon: <Box size={24} /> },
                                        { label: "Runtime", val: "Python 3.11", icon: <FileText size={24} /> },
                                        { label: "Location", val: "Geolocation API", icon: <Globe size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-orange-500/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-orange-500 transition-colors mb-4">
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
                                    <h3 className="text-sm font-black uppercase tracking-widest text-orange-500 mb-8">System Integrity</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Community Trust</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Verification is decentralized — no single moderator controls what gets flagged. The confirm/refute ratio ensures democratic information quality.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Real-Time Edge</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Cloudflare Workers push alerts from the edge, minimizing latency. SOS notifications reach nearby users in under 2 seconds from trigger.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-orange-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Architectural <br />Summary</h3>
                                    <p className="text-orange-100/80 font-bold text-sm mb-6 relative z-10">A distributed, community-trusted incident reporting ecosystem designed for speed, accuracy, and democratic information verification.</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">TRAKS • Community Safety Platform</p>
                    <div className="flex gap-12">
                        {["Speed", "Trust", "Scale"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TraksDocs;
