import React from 'react';
import { 
  Code2, Cloud, BrainCircuit, Box, Smartphone, Layout, GitGraph, 
  Shield, Flame, Globe, Cpu, Bot, Workflow, Container, Github, 
  Infinity, Ship, Server, ArrowRight, Hand
} from 'lucide-react';
import { SKILL_SECTIONS } from '../constants';
import ScrollReveal from './ScrollReveal';
import NetworkBackground from './NetworkBackground';

const Skills: React.FC = () => {
  
  const getIcon = (iconName: string, className: string) => {
    // Responsive icon size handled by className usually, or we can just stick to 28 roughly
    const props = { size: 28, className };
    switch(iconName) {
        // Core
        case 'python': return <Code2 {...props} />;
        case 'flutter': return <Smartphone {...props} />;
        case 'layout': return <Layout {...props} />;
        case 'git-graph': return <GitGraph {...props} />;
        
        // Cloud
        case 'aws': return <Server {...props} />;
        case 'cloudflare': return <Cloud {...props} />;
        case 'firebase': return <Flame {...props} />;
        case 'gcp': return <Globe {...props} />;
        
        // AI
        case 'nvidia': return <Cpu {...props} />;
        case 'brain': return <BrainCircuit {...props} />;
        case 'bot': return <Bot {...props} />;
        case 'workflow': return <Workflow {...props} />;
        
        // DevOps
        case 'docker': return <Container {...props} />;
        case 'github': return <Github {...props} />;
        case 'infinity': return <Infinity {...props} />;
        case 'ship': return <Ship {...props} />;
        
        default: return <Box {...props} />;
    }
  };

  return (
    <>
      {SKILL_SECTIONS.map((section, index) => (
        <section 
          key={section.id} 
          id={section.id === 'core' ? 'skills' : undefined}
          className={`relative min-h-[90vh] flex items-center py-20 md:py-32 overflow-hidden transition-colors duration-500 ${section.theme.bg}`}
        >
          {/* --- SIMULATIONS & BACKGROUNDS --- */}
          
          {/* Core: Enhanced Digital Rain & Floating Syntax */}
          {section.id === 'core' && (
             <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {/* Denser Binary Rain */}
                <div className="absolute inset-0 opacity-[0.04] dark:opacity-10 font-mono text-[10px] leading-none">
                   {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} className="absolute -top-full text-dark dark:text-green-500 whitespace-nowrap" style={{ 
                          left: `${i * 3.5}%`, 
                          animation: `matrixRain ${8 + Math.random() * 10}s infinite linear`,
                          animationDelay: `-${Math.random() * 10}s`
                      }}>
                          {Array.from({length: 60}).map(() => Math.random() > 0.5 ? '1' : '0').join(' ')}
                      </div>
                   ))}
                </div>
                {/* Floating Code Snippets */}
                {['def init():', 'class Node:', 'await future', 'Widget build()', 'return Container();', '@override', 'import sys'].map((snippet, i) => (
                    <div key={i} className="absolute text-dark/5 dark:text-green-500/10 font-black font-mono text-4xl md:text-6xl blur-[1px] whitespace-nowrap" 
                         style={{
                             top: `${Math.random() * 80 + 10}%`,
                             left: `${Math.random() * 80 + 10}%`,
                             animation: `float ${8 + Math.random() * 10}s infinite ease-in-out alternate`,
                             animationDelay: `${i * 2}s`
                         }}>
                        {snippet}
                    </div>
                ))}
             </div>
          )}

          {/* Cloud: Sweeping Data Streams & Floating Orbs */}
          {section.id === 'cloud' && (
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <NetworkBackground color="148, 163, 184" count={35} className="opacity-20" />
                
                {/* Sweeping Stream */}
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent skew-y-12 w-[300%] animate-[stream_15s_linear_infinite]"></div>
                
                {/* Atmospheric Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                
                {/* Floating icons */}
                <div className="absolute top-20 left-[10%] opacity-10 animate-[float_6s_ease-in-out_infinite]"><Cloud size={100} /></div>
                <div className="absolute bottom-40 right-[10%] opacity-10 animate-[float_8s_ease-in-out_infinite_reverse]"><Server size={80} /></div>
             </div>
          )}

          {/* AI: Neural Network Pulse & Expansion */}
          {section.id === 'ai' && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <NetworkBackground color="22, 163, 74" count={80} className="opacity-25" />
               <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               
               {/* Pulsing Synapses */}
               {Array.from({ length: 4 }).map((_, i) => (
                   <div key={i} className="absolute rounded-full border border-green-500/20 bg-green-500/5 animate-ping-slow"
                        style={{
                            width: `${200 + Math.random() * 300}px`,
                            height: `${200 + Math.random() * 300}px`,
                            top: `${Math.random() * 90}%`,
                            left: `${Math.random() * 90}%`,
                            animationDuration: `${3 + Math.random() * 3}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                   ></div>
               ))}
               
               {/* Hexagon Pattern */}
                <div className="absolute right-0 top-1/4 opacity-10 animate-spin-slow origin-center">
                    <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-green-800 dark:text-green-500/30">
                        <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" strokeWidth="0.5" />
                        <path d="M50 10 L84.6 30 L84.6 70 L50 90 L15.4 70 L15.4 30 Z" strokeWidth="0.5" />
                    </svg>
                </div>
            </div>
          )}

          {/* DevOps: Infinite 3D Pipeline Grid & Containers */}
          {section.id === 'devops' && (
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 {/* 3D Grid Floor */}
                 <div className="absolute -inset-[100%] opacity-[0.06] dark:opacity-[0.1]" 
                      style={{ 
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                        transform: 'perspective(500px) rotateX(60deg)',
                        animation: 'gridMove 20s linear infinite'
                      }}>
                 </div>
                 
                 {/* Floating "Containers" (Cubes) */}
                 {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute w-12 h-12 border border-dark/10 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-lg shadow-sm"
                         style={{
                             left: `${Math.random() * 100}%`,
                             top: '110%', // Start below screen
                             animation: `floatUp ${15 + Math.random() * 15}s infinite linear`,
                             animationDelay: `-${Math.random() * 20}s`,
                             transform: `scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`
                         }}
                    ></div>
                 ))}
             </div>
          )}

          {/* --- CONTENT --- */}
          <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
            
            <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
               
               {/* Text Content - Sticky for large screens */}
               <div className="lg:w-2/5 lg:sticky lg:top-32 w-full">
                  <ScrollReveal delay={100} animation={index % 2 === 0 ? 'animate-slide-in-right' : 'animate-slide-in-left'}>
                    <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10 ${section.id === 'cloud' ? 'bg-white/10 text-white' : 'bg-dark/5 dark:bg-white/10 text-dark dark:text-white'}`}>
                      <span className={`w-2 h-2 rounded-full ${section.theme.accent}`}></span>
                      Expertise 0{index + 1}
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={200} animation="animate-fade-up">
                    <h2 className={`text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] ${section.theme.text}`}>
                      {section.title}
                    </h2>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={300}>
                    <div className={`h-1.5 w-24 mb-10 rounded-full ${section.theme.accent}`}></div>
                  </ScrollReveal>

                  <ScrollReveal delay={400}>
                    <p className={`text-lg md:text-2xl leading-relaxed font-medium ${section.theme.secondaryText}`}>
                      {section.description}
                    </p>
                  </ScrollReveal>
               </div>

               {/* Cards Grid - Horizontal Scroll on Mobile */}
               <div className="lg:w-3/5 w-full min-w-0">
                  
                  {/* Mobile Scroll Indicator */}
                  <div className="md:hidden flex items-center justify-between mb-4 px-2 opacity-80">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider animate-pulse text-gray-400">
                          <span>Swipe to explore</span>
                          <ArrowRight size={14} />
                      </div>
                      <div className="flex gap-1">
                          {section.items.map((_, i) => (
                             <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? section.theme.accent : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                          ))}
                      </div>
                  </div>

                  {/* Wrapper ScrollReveal for the list itself (single animation for the block on mobile) */}
                  <ScrollReveal delay={200} animation="animate-fade-up">
                    <div className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
                        {section.items.map((item, idx) => (
                        <div key={idx} className="flex-shrink-0 w-[80vw] sm:w-[45vw] md:w-auto snap-center md:snap-align-none h-full">
                            {/* NOTE: We removed ScrollReveal from individual cards to prevent scroll jank on mobile */}
                            <div 
                                className={`group p-7 md:p-10 rounded-3xl md:rounded-[2.5rem] border transition-all duration-300 relative overflow-hidden h-full ${section.theme.card}`}
                            >
                                {/* Hover gradient overlay */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${section.theme.accent}`}></div>

                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px] md:min-h-[220px]">
                                    <div className="flex justify-between items-start mb-6 md:mb-8">
                                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm ${section.theme.iconBg}`}>
                                            {getIcon(item.icon, "")}
                                        </div>
                                        <ArrowRight className={`hidden md:block opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ${section.theme.text}`} size={24} />
                                    </div>
                                    
                                    <div>
                                        <h3 className={`text-2xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight ${section.theme.text}`}>
                                            {item.name}
                                        </h3>
                                        
                                        <p className={`text-sm md:text-base font-medium leading-relaxed ${section.theme.secondaryText}`}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                  </ScrollReveal>
               </div>

            </div>

          </div>
        </section>
      ))}
    </>
  );
};

export default Skills;