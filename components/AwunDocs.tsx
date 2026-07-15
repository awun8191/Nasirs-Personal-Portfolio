import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Database,
    Terminal,
    Share2,
    Globe, Activity,
    Bot,
    Shield,
    CreditCard, Search,
    ShoppingBag, Zap, FileText, Image
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

            {/* TOP NAV */}
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

            {/* HEADER */}
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
                                AI-powered social commerce platform for the next billion sellers. FastAPI backend, Firebase Auth, Cloudflare D1 + R2 for storage, Gemini for CSV parsing, and a multimodal RAG system for product search.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* MAIN CONTENT */}
                    <div className="lg:w-2/3 space-y-32">

                        {/* OVERVIEW */}
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
                                    AWUN is a social commerce platform built for African vendors who sell through chat. The architecture uses FastAPI for the REST API, Firebase Auth for vendor identity, Cloudflare D1 for relational order and inventory data, and Cloudflare R2 for product image and media storage. Gemini API handles CSV catalogue parsing when vendors upload spreadsheet-based inventories. A multimodal RAG system enables searching products by image and text across the catalogue.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-20">
                                    {[
                                        { title: "FastAPI Backend", desc: "Python 3.12 REST API with Pydantic models, async SQL queries to D1, Firebase Auth token verification middleware, and Paystack webhook handlers." },
                                        { title: "Cloudflare D1 + R2", desc: "D1 provides relational storage for vendors, orders, inventory, and transactions. R2 stores product images, catalogue exports, and chat media with public signed URLs." },
                                        { title: "Firebase Auth", desc: "Vendor registration and login using Firebase Authentication. API routes are protected with Firebase ID token verification via FastAPI middleware." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-orange-700 mb-2">Architecture Layer</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* DATA FLOW */}
                            <ScrollReveal>
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-700/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Catalogue Ingestion</h3>
                                        <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-orange-700 font-black">01</span><span>Vendor uploads spreadsheet (CSV/XLSX) or pastes chat-based catalogue</span></li>
                                            <li className="flex gap-3"><span className="text-orange-700 font-black">02</span><span>Gemini API parses unstructured data into structured product entries with categories and pricing</span></li>
                                            <li className="flex gap-3"><span className="text-orange-700 font-black">03</span><span>Products stored in D1 (structured fields) with images uploaded to R2</span></li>
                                        </ul>
                                    </div>
                                    <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-orange-700 text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Transaction Flow</h3>
                                        <ul className="space-y-4 text-sm text-orange-100/80 font-medium relative z-10">
                                            <li className="flex gap-3"><span className="text-white font-black">01</span><span>Buyer selects product via chat interface or search</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">02</span><span>Paystack transaction initiated; webhook confirms payment server-side</span></li>
                                            <li className="flex gap-3"><span className="text-white font-black">03</span><span>Order written to D1; inventory deducted; vendor notified</span></li>
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
                                                { comp: "Auth", tech: "Firebase Auth", role: "Vendor identity, token-based route protection, social login" },
                                                { comp: "Relational Store", tech: "Cloudflare D1 (SQL)", role: "Orders, inventory, transactions, vendor profiles" },
                                                { comp: "Media Storage", tech: "Cloudflare R2", role: "Product images, catalogue files, chat media" },
                                                { comp: "Catalogue Parsing", tech: "Gemini API", role: "CSV/XLSX to structured product entries with auto-categorization" },
                                                { comp: "Multimodal Search", tech: "RAG (Text + Image)", role: "Search products by combined image query and text description" },
                                                { comp: "Payments", tech: "Paystack API", role: "Payment initiation, server-side webhook verification, reconciliation" },
                                                { comp: "Backend API", tech: "FastAPI", role: "REST API with async D1 queries, Firebase middleware, webhook handlers" },
                                                { comp: "Infrastructure", tech: "Cloudflare", role: "D1, R2, Workers (edge functions), DNS, CDN" }
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

                        {/* GEMINI CSV PARSING & RAG SEARCH */}
                        <section id="ai-features" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-700/20">
                                        <FileText size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Gemini CSV Parsing
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Most African vendors manage inventory in spreadsheets or chat logs. AWUN uses the Gemini API to parse these unstructured formats into structured product records.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8 mb-12">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Zap className="text-orange-700" size={20} />
                                            Spreadsheet Ingestion
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Vendors upload CSV or XLSX files with arbitrary column layouts. Gemini parses the header row, identifies product fields (name, price, category, stock), and maps them to the platform's schema. The parsed output is validated and stored in D1 with the original file saved to R2 for audit.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Bot className="text-orange-700" size={20} />
                                            Chat Log Parsing
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Vendors who sell via WhatsApp or Telegram can paste chat transcripts. Gemini extracts product mentions, prices, and availability from the conversation flow. This enables vendors to onboard without reformatting their existing workflow.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-700/20">
                                        <Image size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Multimodal RAG Search
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Product discovery uses a multimodal RAG pipeline that searches by both image and text. Buyers can take a photo of a product or describe what they want, and the system retrieves matching listings from across the vendor catalogue.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { title: "Image Embedding", desc: "Product images in R2 are processed through an embedding model. Query images are encoded and matched against the vector index using cosine similarity." },
                                        { title: "Text Retrieval", desc: "Product descriptions, categories, and vendor tags are indexed in D1 with full-text search. Gemini enhances queries with synonym expansion and Nigerian language support." },
                                        { title: "Fusion Ranking", desc: "Results from image and text searches are fused using reciprocal rank fusion. The combined ranking surfaces the most relevant products regardless of query modality." }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <Search size={20} className="text-orange-700 mb-3" />
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{item.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* PAYSTACK INTEGRATION */}
                        <section id="payment" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-white shadow-xl shadow-orange-700/20">
                                        <CreditCard size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Paystack Integration
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    Paystack handles payment initiation and verification through server-side webhooks. When a buyer pays, Paystack sends a POST request to a FastAPI webhook endpoint. The handler validates the webhook signature, confirms the transaction, and writes the order to D1. Inventory is deducted only after webhook confirmation.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-12">
                                    {[
                                        { title: "Webhook Verification", desc: "FastAPI endpoint validates Paystack HMAC-SHA512 signature on every webhook payload. Only verified events trigger order creation and inventory deduction." },
                                        { title: "Multi-Channel Support", desc: "Card, bank transfer, USSD, and mobile money payments are accepted through Paystack's unified checkout. All channels reconcile to the same D1 order table." },
                                        { title: "Order Reconciliation", desc: "Each webhook event writes a transaction record to D1 with Paystack reference, amount, status, and vendor ID. Failed and reversed transactions are logged separately." }
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
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">Technology Stack</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Backend API", val: "FastAPI (Python 3.12)", icon: <Terminal size={24} /> },
                                        { label: "Auth", val: "Firebase Auth", icon: <Activity size={24} /> },
                                        { label: "Relational DB", val: "Cloudflare D1", icon: <Database size={24} /> },
                                        { label: "Media Storage", val: "Cloudflare R2", icon: <ShoppingBag size={24} /> },
                                        { label: "AI Parsing", val: "Gemini API", icon: <Bot size={24} /> },
                                        { label: "Payments", val: "Paystack", icon: <CreditCard size={24} /> },
                                        { label: "Multimodal Search", val: "RAG Pipeline", icon: <Search size={24} /> },
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

                    {/* SIDEBAR */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-32 space-y-12">
                            <ScrollReveal delay={400}>
                                <div className="bg-dark rounded-[2.5rem] border border-white/10 p-10 shadow-3xl">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-orange-700 mb-8">System Architecture</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">FastAPI + D1</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">FastAPI async endpoints query Cloudflare D1 via the Cloudflare API. Prepared statements prevent SQL injection. Connection pooling is handled through Cloudflare's HTTP-based query interface.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Firebase Auth Middleware</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Every protected route runs a FastAPI dependency that verifies the Firebase ID token from the Authorization header. The decoded payload provides vendor UID and email for downstream authorization checks.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Paystack Webhooks</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">The /webhook/paystack endpoint verifies HMAC-SHA512 signatures before processing. Successful charge.confirm events create D1 order records and trigger inventory deduction in a single transaction.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-orange-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Full Stack <br />Social Commerce</h3>
                                    <p className="text-orange-100/80 font-bold text-sm mb-6 relative z-10">FastAPI + Firebase Auth + Cloudflare D1/R2 + Gemini CSV parsing + multimodal RAG search + Paystack webhooks.</p>
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
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">AWUN - AI-Powered Social Commerce</p>
                    <div className="flex gap-12">
                        {["FastAPI", "D1", "R2", "Gemini"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AwunDocs;
