import React, { useEffect } from 'react';
import {
    ArrowLeft, Cpu, Zap,
    Thermometer,
    Wind,
    Sun,
    Activity,
    Box,
    Bot, BookOpen,
    Layers, Gauge,
    Disc3, Cog, Wrench,
    BarChart3,
    Terminal,
    Share2
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DocsProps {
    onBack: () => void;
}

const SoilingDetectionDocs: React.FC<DocsProps> = ({ onBack }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-[#050914] min-h-screen transition-colors duration-500 pb-32 text-dark dark:text-gray-100 selection:bg-amber-500/30">

            {/* --- TOP NAV --- */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-dark dark:text-white font-bold hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Portfolio</span>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                            <Cpu size={12} className="text-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Embedded AI Systems</span>
                        </div>
                        <span className="text-xs font-black uppercase tracking-tighter text-gray-400">FYP • v2.0-Release</span>
                    </div>
                </div>
            </nav>

            {/* --- HEADER --- */}
            <header className="pt-40 pb-20 bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                                Project Specification
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.85]">
                                AI Soiling<br /><span className="text-amber-600 dark:text-amber-500">Detection.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl leading-relaxed tracking-tight">
                                A two-layer embedded system for solar panel soiling detection and autonomous cleaning, designed for off-grid Nigerian solar deployment.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </header>

            <main className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:w-2/3 space-y-32">

                        {/* --- ARCHITECTURE --- */}
                        <section id="architecture" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                                        <Layers size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Two-Layer Architecture
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The system employs a dual-layer wake architecture that separates always-on anomaly detection from
                                    high-accuracy classification. Layer 1 runs continuously at ~3mW on a Raspberry Pi Pico RP2040;
                                    Layer 2 remains powered OFF and boots only when Layer 1 triggers — a deliberate design that
                                    eliminates false-positive-driven mechanical cleaning cycles.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-20">
                                    {[
                                        { title: "Ultra-Low Power", desc: "Always-on CUSUM layer at ~3mW — suitable for battery-backed solar installations." },
                                        { title: "False-Positive Immunity", desc: "Two-stage wake architecture prevents unnecessary cleaning from transient sensor noise." },
                                        { title: "High Precision", desc: "XGBoost classifier achieves 99.98% accuracy on triggered events before mechanical actuation." },
                                        { title: "Cost-Effective", desc: "Complete system at ~$170 USD — viable for distributed off-grid African solar deployments." }
                                    ].map((goal, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Design Goal</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{goal.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{goal.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            {/* LAYER 1 & LAYER 2 */}
                            <div className="space-y-12">
                                <ScrollReveal>
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black text-dark dark:text-white uppercase tracking-tighter mb-6 relative z-10">Layer 1: CUSUM Trigger</h3>
                                            <ul className="space-y-4 text-sm text-gray-500 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-amber-500 font-black">01</span><span>CUSUM control chart on Raspberry Pi Pico RP2040 — always-on at ~3mW</span></li>
                                                <li className="flex gap-3"><span className="text-amber-500 font-black">02</span><span>Composite Soiling Index (CSI) computed from 5 environmental features weighted by Cohen's d</span></li>
                                                <li className="flex gap-3"><span className="text-amber-500 font-black">03</span><span>Features: temperature, humidity, irradiance, panel current — 87.3% event recall</span></li>
                                            </ul>
                                        </div>
                                        <div className="md:w-1/2 p-10 rounded-[2.5rem] bg-amber-600 text-white relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 relative z-10">Layer 2: XGBoost</h3>
                                            <ul className="space-y-4 text-sm text-amber-100/80 font-medium relative z-10">
                                                <li className="flex gap-3"><span className="text-white font-black">01</span><span>XGBoost classifier on Raspberry Pi Zero 2W — normally powered OFF (deep sleep)</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">02</span><span>Boots only when CUSUM triggers — 99.98% accuracy on triggered events</span></li>
                                                <li className="flex gap-3"><span className="text-white font-black">03</span><span>Decision-tree ensemble validates soiling event before activating mechanical cleaning</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* FAILURE MODE MITIGATION TABLE */}
                                <ScrollReveal>
                                    <div className="p-1 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-white/5">
                                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-amber-500">Failure Mode</th>
                                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-amber-500">Mitigation Strategy</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                {[
                                                    { mode: "False-Positive Trigger", strat: "Two-Layer Wake — XGBoost validates CUSUM alerts before mechanical actuation" },
                                                    { mode: "Sensor Drift / Noise", strat: "Cohen's d weighted CSI — statistical effect-size weighting desensitizes to baseline drift" },
                                                    { mode: "Power Drain Idle", strat: "Layer 2 deep-sleep at near-zero draw; only Layer 1 always-on at ~3mW" },
                                                    { mode: "Mechanical Wear from Redundant Cycles", strat: "99.98% classifier precision ensures cleaning runs only on genuine soiling events" }
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

                        {/* --- MECHANICAL CLEANING & SENSORS --- */}
                        <section id="mechanical-cleaning" className="scroll-mt-32 space-y-20">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                                        <Cog size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Mechanical Cleaning
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    When the XGBoost classifier confirms a soiling event, the system actuates a dual-motor
                                    mechanical cleaning carriage. The cleaning cycle runs for <b>120–180 seconds</b>, traversing
                                    the panel surface with a rotating brush driven by a DC gearmotor.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Disc3 className="text-amber-500" size={20} />
                                            Linear Carriage
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            A <b>NEMA17 stepper motor</b> drives a lead screw linear carriage that travels the
                                            full length of the solar panel. Stepper control enables precise, repeatable
                                            positioning and adjustable traversal speed for different panel sizes.
                                        </p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <h4 className="text-xl font-black text-dark dark:text-white uppercase mb-4 flex items-center gap-2">
                                            <Wrench className="text-amber-500" size={20} />
                                            Rotating Brush
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            A <b>JGA25-370 DC motor</b> spins a rotating paint roller brush mounted on the
                                            carriage. The brush applies mechanical abrasion to dislodge accumulated dust and
                                            grime without requiring water or cleaning fluids.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Sensor Suite</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
                                            <div>
                                                <Thermometer className="text-amber-500 mb-2 mx-auto md:mx-0" size={28} />
                                                <p className="text-lg font-black text-white mb-1">DHT22</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Ambient Humidity &amp; Temp</p>
                                            </div>
                                            <div>
                                                <Thermometer className="text-amber-500 mb-2 mx-auto md:mx-0" size={28} />
                                                <p className="text-lg font-black text-white mb-1">DS18B20 ×2</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Panel Temperature Sensors</p>
                                            </div>
                                            <div>
                                                <Activity className="text-amber-500 mb-2 mx-auto md:mx-0" size={28} />
                                                <p className="text-lg font-black text-white mb-1">ACS712</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Panel Current Sensor</p>
                                            </div>
                                            <div>
                                                <Sun className="text-amber-500 mb-2 mx-auto md:mx-0" size={28} />
                                                <p className="text-lg font-black text-white mb-1">PV Reference</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Reference Solar Cell</p>
                                            </div>
                                            <div>
                                                <Wind className="text-amber-500 mb-2 mx-auto md:mx-0" size={28} />
                                                <p className="text-lg font-black text-white mb-1">LDR Array</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Irradiance Sensors</p>
                                            </div>
                                            <div>
                                                <Gauge className="text-amber-500 mb-2 mx-auto md:mx-0" size={28} />
                                                <p className="text-lg font-black text-white mb-1">Composite CSI</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Soiling Index (Weighted)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </section>

                        {/* --- DATASET & TRAINING --- */}
                        <section id="dataset" className="scroll-mt-32 space-y-12">
                            <ScrollReveal>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                                        <BarChart3 size={28} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter uppercase leading-none">
                                        Dataset &amp; Training
                                    </h2>
                                </div>

                                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-12 tracking-tight">
                                    The XGBoost classifier was trained on the public <b>HKUST Solar Panel Soiling Dataset</b>,
                                    collected from 60 monitoring stations across Hong Kong's subtropical climate — yielding
                                    46,293 station-days of labeled environmental and performance data with rainfall-based
                                    soiling ground truth.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mb-12">
                                    {[
                                        { title: "60 Stations", desc: "Distributed monitoring sites across Hong Kong's diverse microclimates." },
                                        { title: "46,293 Station-Days", desc: "Dense temporal coverage capturing seasonal and weather-driven soiling dynamics." },
                                        { title: "Rainfall Proxy", desc: "Labels derived from rainfall events — natural cleaning provides ground truth for soiling state transitions." }
                                    ].map((point, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Training Data</p>
                                            <h4 className="text-sm font-black text-dark dark:text-white uppercase mb-2">{point.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">{point.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>

                            <ScrollReveal>
                                <div className="p-10 rounded-[3rem] bg-gray-950 border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">System Performance</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                                            <div>
                                                <p className="text-4xl font-black text-amber-500 mb-2">87.3%</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">CUSUM Event Recall</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-amber-500 mb-2">99.98%</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">XGBoost Accuracy</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-amber-500 mb-2">3mW</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Always-On Power</p>
                                            </div>
                                            <div>
                                                <p className="text-4xl font-black text-amber-500 mb-2">~$170</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Per-Unit Cost</p>
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
                                    <h2 className="text-sm font-black uppercase tracking-widest text-amber-500 mb-4">Development Environment</h2>
                                    <p className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tighter leading-none uppercase">System Stack</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: "Layer 1 Firmware", val: "C (RP2040 SDK)", icon: <Terminal size={24} /> },
                                        { label: "Layer 2 Classifier", val: "Python / XGBoost", icon: <Bot size={24} /> },
                                        { label: "Trigger Algorithm", val: "CUSUM Control Chart", icon: <Activity size={24} /> },
                                        { label: "Microcontroller", val: "Pi Pico RP2040", icon: <Cpu size={24} /> },
                                        { label: "Compute Module", val: "Pi Zero 2W", icon: <Box size={24} /> },
                                        { label: "Stepper Motor", val: "NEMA17", icon: <Cog size={24} /> },
                                        { label: "DC Motor", val: "JGA25-370", icon: <Zap size={24} /> },
                                        { label: "Protocol", val: "GPIO / I²C", icon: <Share2 size={24} /> }
                                    ].map((t, k) => (
                                        <div key={k} className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 group hover:border-amber-500/30 transition-all text-center">
                                            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 inline-flex text-gray-400 group-hover:text-amber-500 transition-colors mb-4">
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
                                    <h3 className="text-sm font-black uppercase tracking-widest text-amber-500 mb-8">Design Philosophy</h3>
                                    <div className="space-y-10">
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Power-Proportional Compute</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">Always-on anomaly detection at 3mW; high-compute classifier stays off until needed. No wasted cycles, no battery drain during clear-sky periods.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Statistical Rigor Before ML</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">CUSUM control chart with Cohen's d weighting provides a statistically grounded trigger — ML only validates, never hallucinates a cleaning event from noise.</p>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase tracking-tight text-lg mb-2">Off-Grid Economics</p>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">At ~$170 per unit, the system targets Nigerian off-grid solar deployments where manual panel cleaning is costly and inconsistent.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={600}>
                                <div className="bg-amber-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 relative z-10 leading-none uppercase">Final Year <br />Project</h3>
                                    <p className="text-amber-100/80 font-bold text-sm mb-6 relative z-10">Electrical &amp; Electronics Engineering — ABUAD. A production-grade embedded AI system for autonomous solar panel maintenance in distributed off-grid deployments.</p>
                                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 relative z-10">
                                        Research Publication <BookOpen size={12} />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="py-24 border-t border-gray-200 dark:border-white/5 mt-32">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">AI Soiling Detection System • Embedded AI FYP</p>
                    <div className="flex gap-12">
                        {["CUSUM", "XGBoost", "Autonomous"].map(f => (
                            <span key={f} className="text-[10px] font-black uppercase tracking-widest text-dark dark:text-white opacity-40">{f}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SoilingDetectionDocs;
