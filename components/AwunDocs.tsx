import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity,
    Bot,
    Layers, Zap, Shield,
    CheckCircle, Smartphone
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const AwunDocs: React.FC<DocsProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-[#050914] min-h-screen transition-colors duration-500 pb-32 text-dark dark:text-gray-100 selection:bg-purple-500/30">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
                            <Cpu size={12} className="text-purple-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">Field Operations Platform</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v2.1.0-Stable</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                AWUN <br /><span className="text-purple-600 dark:text-purple-500">Field Ops.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                A checkout-first field operations platform for engineering subcontractors — combining closeout templates, real-time field reporting, and Paystack payment integration into a single mobile-first system.
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
                                    <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                                        <Globe size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Overview
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    AWUN is a checkout-first field operations platform purpose-built for engineering subcontractors. It digitises the entire field workflow — from site checkout and templated closeout reports to office reconciliation and payment — eliminating paper-based processes that slow down project delivery.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "Mobile-First", desc: "Field workers operate entirely from their phones — checkouts, templates, signatures, and photo capture on-site." },
                                        { title: "Offline Capable", desc: "Reports sync in real-time when connectivity is available; offline queue prevents data loss in the field." },
                                        { title: "Automated Reconciliation", desc: "Paystack integration handles payment collection and reconciliation without manual intervention." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">Design Goal</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* ARCHITECTURE FLOW — PHASE A & B */}
                            <ScrollReveal>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Phase A: Field Intake</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-purple-500 font-black">01</span><span>Mobile checkout initiation by field worker on-site</span></li>
                                            <li className="flex gap-3"><span className="text-purple-500 font-black">02</span><span>Closeout template selection & dynamic form filling</span></li>
                                            <li className="flex gap-3"><span className="text-purple-500 font-black">03</span><span>Photo capture, signatures, and offline queue sync</span></li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-purple-600 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Phase B: Payment & Office</h3>
                                        <ul className="space-y-4 text-sm text-purple-100/80 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-white font-black">01</span><span>Real-time report sync to office dashboard</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">02</span><span>Paystack payment initiation & automated reconciliation</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">03</span><span>All data persisted — D1 (relational) + R2 (files)</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* ARCHITECTURE DIAGRAM TABLE */}
                            <ScrollReveal>
                                <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-white/5">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-purple-500">Component</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-purple-500">Technology</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-purple-500">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {[
                                                { comp: "Auth & Metadata", tech: "Firebase Auth / Firestore", role: "User authentication & metadata indexing" },
                                                { comp: "Relational Data", tech: "Cloudflare D1 (SQL)", role: "Structured checkout records & templates" },
                                                { comp: "File Storage", tech: "Cloudflare R2", role: "Photo, signature & document storage" },
                                                { comp: "Payments", tech: "Paystack API", role: "Payment collection & automated reconciliation" },
                                                { comp: "AI Processing", tech: "Cloudflare Workers AI", role: "Intelligent form processing & validation" },
                                                { comp: "Backend API", tech: "FastAPI", role: "REST API orchestrating all services" }
                                            ].map((row, i) => (
                                                <tr key={i} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-5 text-dark dark:text-white font-bold">{row.comp}</td>
                                                    <td className="px-8 py-5 text-purple-600 dark:text-purple-400">{row.tech}</td>
                                                    <td className="px-8 py-5">{row.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- FIELD OPERATIONS PIPELINE --- */}
                        <section id="field-operations" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                                        <HardDrive size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Field Ops Pipeline
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The core operational flow moves work from site checkout through to office reconciliation. Every stage is designed for mobile-first interaction with offline resilience — ensuring field workers stay productive regardless of connectivity.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Layers className="text-purple-500" size={20} />
                                            Closeout Templates
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Dynamic form templates built for engineering closeout documentation. Field workers select the relevant template on arrival, fill structured fields, attach photos, and capture digital signatures — all from a mobile browser or app interface.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Zap className="text-purple-500" size={20} />
                                            Real-Time Reporting
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Completed field reports sync in real-time to the office dashboard. Data flows through FastAPI into Cloudflare D1 for relational storage and R2 for file attachments, giving the office team immediate visibility into site progress.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Pipeline Performance</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-purple-500 mb-2">273</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Automated Tests</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-purple-500 mb-2">&lt;1s</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Report Sync</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-purple-500 mb-2">Real-Time</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Field Sync</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-purple-500 mb-2">Paystack</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Payments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- PAYMENT INTEGRATION --- */}
                        <section id="payment" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                                        <CreditCard size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Payment Integration
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Paystack handles all payment processing — from invoice generation through to automated reconciliation. The integration ensures that field-completed work flows directly into the payment pipeline without manual data entry or delayed billing cycles.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-12">
                                    {[
                                        { title: "Invoice Generation", desc: "Completed field checkouts automatically generate Paystack invoices linked to project records." },
                                        { title: "Multi-Channel Payments", desc: "Card, bank transfer, USSD, and mobile money — all processed through a single Paystack integration." },
                                        { title: "Automated Reconciliation", desc: "Payment confirmations sync back to the project record, matching invoices to payments without manual intervention." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <CheckCircle size={20} className="text-purple-500 mb-3" />
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{item.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- TESTING & RELIABILITY --- */}
                        <section id="testing" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/20">
                                        <Shield size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Testing & Reliability
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    With <b>273 automated tests</b>, the AWUN test suite is a key differentiator — ensuring that field operations, payment flows, and data sync pipelines remain reliable under production conditions. Testing coverage spans unit, integration, and end-to-end scenarios.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { title: "Unit Tests", desc: "Individual service validation — FastAPI endpoints, Firebase rules, D1 queries, and Paystack webhook handlers tested in isolation." },
                                        { title: "Integration Tests", desc: "Cross-service scenarios — field checkout → report creation → payment flow → reconciliation, verifying end-to-end data consistency." },
                                        { title: "Offline Resilience", desc: "Simulated connectivity loss tests ensure the offline queue correctly buffers reports and replays them on reconnection without data loss." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-2">Test Tier</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{item.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* STACK SECTION */}
                        <section id="stack" className="scroll-mt-32">
                            <ScrollReveal>
                                <div className="mb-12">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-purple-500 mb-4">Development Environment</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Platform Ecosystem</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Backend API", val: "FastAPI", icon: <Terminal size={24} /> },
                                        { label: "Auth & Metadata", val: "Firebase", icon: <Activity size={24} /> },
                                        { label: "Relational DB", val: "Cloudflare D1", icon: <Database size={24} /> },
                                        { label: "File Storage", val: "Cloudflare R2", icon: <HardDrive size={24} /> },
                                        { label: "AI Processing", val: "Workers AI", icon: <Bot size={24} /> },
                                        { label: "Payments", val: "Paystack", icon: <CreditCard size={24} /> },
                                        { label: "Mobile", val: "Mobile-First Web", icon: <Smartphone size={24} /> },
                                        { label: "Infrastructure", val: "Cloudflare", icon: <Globe size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-purple-500/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-purple-500 transition-colors mb-4">
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
                                    <h3 className="text-sm font-black uppercase tracking-widest text-purple-500 mb-8">System Integrity</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Offline-First Queue</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">All field reports are written to a local offline queue before attempting network sync. On reconnection, the queue replays in order with conflict resolution — ensuring zero data loss in remote job sites.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">273-Pass CI Suite</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Every deployment runs the full 273-test suite across unit, integration, and offline-resilience categories. The suite must pass clean before any production release is promoted.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Workers AI Validation</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Cloudflare Workers AI inspects every form submission for completeness and data quality — flagging missing fields, inconsistent values, and potential errors before they reach the office.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-purple-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Field-to-Office <br />Pipeline</h3>
                                    <p className="text-purple-100/80 font-bold text-sm mb-6 relative z-10">A mobile-first operations platform that closes the gap between site work and office reconciliation.</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">AWUN • Field Operations Platform</p>
                    <div className="flex gap-12">
                        {["Mobile", "Reliable", "Automated"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AwunDocs;
