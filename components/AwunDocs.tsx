import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity,
    Bot,
    Shield,
    CreditCard, Search,
    ShoppingBag, Zap
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const AwunDocs: React.FC<DocsProps> = ({ onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-[#050914] min-h-screen transition-colors duration-500 pb-32 text-dark dark:text-gray-100 selection:bg-orange-700/30">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-orange-700 dark:hover:text-orange-600 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-orange-700/10 rounded-full border border-orange-700/20">
                            <Cpu size={12} className="text-orange-700" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-700">Social Commerce Platform</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">v2.4.0-Stable</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-700/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-700 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                AWUN <br /><span className="text-orange-700 dark:text-orange-600">Social Commerce.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                AI-powered social commerce platform for the next billion sellers — unifying storefront creation, payment verification, inventory management, and product discovery into a single chat-first ecosystem.
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
                                    <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-700/20">
                                        <Globe size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Overview
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    In Africa's $50B+ social commerce market, 67% of purchases happen via chat — yet sellers juggle 5+ separate tools for catalogues, payments, inventory, and customer management. AWUN replaces this chaos with an AI-powered unified platform: vendors create storefronts in minutes, accept verified payments, manage stock, and get discovered — all within the chat interfaces their customers already use.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "AI-Powered Storefronts", desc: "Vendors create professional storefronts with AI-generated product descriptions, images, and pricing — no technical skills required." },
                                        { title: "Payment Trust & Verification", desc: "Real-time payment verification eliminates fake payment alerts. Every transaction is validated via Paystack before inventory updates." },
                                        { title: "Unified Seller Dashboard", desc: "A single interface for orders, inventory, analytics, and customer management — replacing the 5+ tools sellers currently juggle." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-orange-700 mb-2">Design Goal</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* MARKET — PHASE A & B */}
                            <ScrollReveal>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-700/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Phase A: Vendor Onboarding</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-orange-700 font-black">01</span><span>AI-assisted storefront creation from chat history</span></li>
                                            <li className="flex gap-3"><span className="text-orange-700 font-black">02</span><span>Product catalogue upload with auto-tagging & categorization</span></li>
                                            <li className="flex gap-3"><span className="text-orange-700 font-black">03</span><span>Payment profile setup with Paystack integration</span></li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-orange-700 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Phase B: Transaction Processing</h3>
                                        <ul className="space-y-4 text-sm text-orange-100/80 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-white font-black">01</span><span>Chat-initiated purchase with real-time payment verification</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">02</span><span>Automatic inventory deduction & order confirmation</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">03</span><span>All data persisted — D1 (relational) + R2 (media)</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* ARCHITECTURE TABLE */}
                            <ScrollReveal>
                                <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-white/5">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-orange-700">Component</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-orange-700">Technology</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-orange-700">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {[
                                                { comp: "Auth & Metadata", tech: "Firebase Auth / Firestore", role: "Vendor identity, storefront metadata & product catalogue" },
                                                { comp: "Relational Data", tech: "Cloudflare D1 (SQL)", role: "Orders, transactions, inventory & analytics" },
                                                { comp: "Media Storage", tech: "Cloudflare R2", role: "Product images, storefront assets & chat media" },
                                                { comp: "Payments", tech: "Paystack API", role: "Payment collection, verification & automated reconciliation" },
                                                { comp: "AI Processing", tech: "Cloudflare Workers AI", role: "Product descriptions, auto-tagging, inventory forecasting" },
                                                { comp: "Backend API", tech: "FastAPI", role: "REST API orchestrating commerce flows & AI agents" }
                                            ].map((row, i) => (
                                                <tr key={i} className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-8 py-5 text-dark dark:text-white font-bold">{row.comp}</td>
                                                    <td className="px-8 py-5 text-orange-700 dark:text-orange-600">{row.tech}</td>
                                                    <td className="px-8 py-5">{row.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- AI FEATURES --- */}
                        <section id="ai-features" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-700/20">
                                        <Bot size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        AI Commerce Engine
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Cloudflare Workers AI powers the intelligence layer — from helping vendors create professional product listings to detecting suspicious transactions and forecasting inventory needs.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Zap className="text-orange-700" size={20} />
                                            Product Intelligence
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            AI-generated product descriptions, auto-categorization, and image enhancement. Vendors upload basic photos — Workers AI generates professional listings optimized for chat-based discovery.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Shield className="text-orange-700" size={20} />
                                            Fraud Detection
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Real-time transaction scoring identifies fake payment alerts and suspicious patterns. Workers AI validates payment confirmations against historical seller behaviour and flags anomalies before inventory is updated.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-700/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Platform Scale</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-orange-700 mb-2">$50B+</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Addressable Market</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-orange-700 mb-2">67%</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Chat-First Purchases</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-orange-700 mb-2">Real-Time</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Payment Verification</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-orange-700 mb-2">Paystack</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Payment Processing</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- PAYMENT & TRUST --- */}
                        <section id="payment" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-700/20">
                                        <CreditCard size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Payment Trust
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Fake payment alerts are one of the biggest trust killers in African social commerce. AWUN's Paystack integration eliminates this entirely — every payment is verified server-side before any inventory change or order confirmation is processed.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-12">
                                    {[
                                        { title: "Payment Verification", desc: "Server-side Paystack webhook verification ensures only confirmed payments trigger inventory updates — eliminating fake payment screenshots." },
                                        { title: "Multi-Channel Payments", desc: "Card, bank transfer, USSD, and mobile money — all processed through a single Paystack integration with unified reconciliation." },
                                        { title: "Trust Scores", desc: "Vendors build trust scores based on transaction history and fulfilment rates — visible to buyers during discovery." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <Shield size={20} className="text-orange-700 mb-3" />
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
                                    <h2 className="text-sm font-black uppercase tracking-widest text-orange-700 mb-4">Development Environment</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Commerce Ecosystem</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Backend API", val: "FastAPI", icon: <Terminal size={24} /> },
                                        { label: "Auth & Catalogue", val: "Firebase", icon: <Activity size={24} /> },
                                        { label: "Relational DB", val: "Cloudflare D1", icon: <Database size={24} /> },
                                        { label: "Media Storage", val: "Cloudflare R2", icon: <ShoppingBag size={24} /> },
                                        { label: "AI Engine", val: "Workers AI", icon: <Bot size={24} /> },
                                        { label: "Payments", val: "Paystack", icon: <CreditCard size={24} /> },
                                        { label: "Discovery", val: "Search & Browse", icon: <Search size={24} /> },
                                        { label: "Infrastructure", val: "Cloudflare", icon: <Globe size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-orange-700/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-orange-700 transition-colors mb-4">
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
                                    <h3 className="text-sm font-black uppercase tracking-widest text-orange-700 mb-8">System Integrity</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Payment Verification</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Every payment is verified server-side via Paystack webhooks before inventory is committed. Fake payment screenshots — a $50M+ problem in African commerce — are rendered harmless.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">AI Product Validation</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Workers AI validates every product listing for quality, consistency, and policy compliance — flagging incomplete descriptions, prohibited items, and pricing anomalies before publishing.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Unified Dashboard</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Vendors manage orders, inventory, analytics, and customer communications from a single interface. No more switching between 5+ tools to run a business.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-orange-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Chat-to-Commerce <br />Pipeline</h3>
                                    <p className="text-orange-100/80 font-bold text-sm mb-6 relative z-10">An AI-powered social commerce platform that converts chat conversations into verified transactions — built for Africa's next billion sellers.</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">AWUN • AI-Powered Social Commerce</p>
                    <div className="flex gap-12">
                        {["Chat-First", "Verified", "AI-Powered"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AwunDocs;
