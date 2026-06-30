import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { HERO_IMAGE } from '../constants';
import ScrollReveal from './ScrollReveal';
import NetworkBackground from './NetworkBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-tl from-yellow-400 via-orange-100 to-white dark:from-yellow-900/20 dark:via-[#151a15] dark:to-[#151a15] flex flex-col pt-32 overflow-hidden rounded-b-[4rem] transition-colors duration-500">
      
      {/* Interactive Background - Updated to Gold/Yellow color */}
      <NetworkBackground color="234, 179, 8" count={50} className="z-0 opacity-40 dark:opacity-20" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Massive Background Text */}
        <ScrollReveal animation="animate-fade-in" duration="1.5s" className="absolute top-20 left-0 right-0 text-center pointer-events-none select-none z-0">
          <div aria-hidden="true" role="presentation" className="text-[18vw] leading-none font-black text-yellow-900/5 dark:text-white/5 tracking-tighter mix-blend-overlay">
            NASIR
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 relative z-10 items-end">
          
          {/* Left Content */}
          <div className="lg:col-span-7 pb-12">
            <ScrollReveal delay={100} animation="animate-fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-full mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-inset ring-black/5 dark:ring-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-dark dark:text-white">Available for projects</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h1 className="text-5xl md:text-8xl font-black text-dark dark:text-white tracking-tighter mb-8 leading-[0.9] drop-shadow-sm text-balance">
                Dauda Nasir — <br className="md:hidden" /> Python & Flutter Engineer
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-xl text-gray-800 dark:text-gray-300 max-w-lg leading-relaxed mb-10 font-medium">
                Dauda Nasir is a full-stack software engineer specialising in Python, Flutter, AI-powered systems, backend development, and cross-platform applications.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400} className="flex flex-wrap gap-4">
                <motion.a 
                  href="#work" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-dark dark:bg-white text-white dark:text-dark rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark outline-none"
                >
                    View My Work <ArrowRight size={18} />
                </motion.a>
                {/* Updated Download CV button for better visibility/glassy feel */}
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/30 dark:bg-white/5 backdrop-blur-md text-dark dark:text-white rounded-full font-bold flex items-center gap-2 hover:bg-white/50 dark:hover:bg-white/10 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.05)] ring-1 ring-inset ring-white/40 dark:ring-white/10 z-20 focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark outline-none"
                >
                    <Download size={18} /> Download CV
                </motion.a>
            </ScrollReveal>
          </div>

          {/* Right Image Area */}
          <div className="lg:col-span-5 relative h-[500px] md:h-[700px] flex items-end justify-center">
             
             {/* Main Image with blob background - Updated to Yellow/Orange blob */}
             <div className="absolute inset-0 bg-yellow-400 dark:bg-sage-500/20 rounded-full blur-[80px] opacity-30 transform scale-75 translate-y-10 animate-blob mix-blend-multiply dark:mix-blend-normal"></div>
             
             <ScrollReveal delay={300} animation="animate-zoom-in" className="relative z-10 w-full h-full">
               <img 
                 src={HERO_IMAGE} 
                 alt="Dauda Nasir"
                 fetchPriority="high"
                 decoding="sync"
                 width="1000"
                 height="1491"
                 className="w-full h-full object-cover object-center rounded-t-[3rem] drop-shadow-2xl mask-image-b grayscale hover:grayscale-0 transition-all duration-700"
               />
             </ScrollReveal>

             {/* Tech Stack Floating Card */}
             <ScrollReveal delay={600} animation="animate-fade-up" className="absolute bottom-[10%] -left-8 z-20">
               <motion.div 
                 whileHover={{ y: -5 }}
                 className="bg-white/80 dark:bg-dark/80 backdrop-blur-md p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-inset ring-black/5 dark:ring-white/10 max-w-xs transition-shadow duration-300"
               >
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Current Stack</div>
                  <div className="flex flex-wrap gap-2">
                      {['Python', 'Flutter', 'TensorFlow', 'AWS'].map(tech => (
                          <span key={tech} className="px-3 py-1 bg-white/50 dark:bg-white/10 rounded-md text-xs font-bold text-dark dark:text-white ring-1 ring-inset ring-black/5 dark:ring-white/10 shadow-sm">
                              {tech}
                          </span>
                      ))}
                  </div>
               </motion.div>
             </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;