import React from 'react';
import ScrollReveal from './ScrollReveal';
import Terminal from './Terminal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-sage-50 dark:bg-dark relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent dark:from-white/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
                <ScrollReveal animation="animate-fade-in" duration="1s" className="absolute -top-10 -left-10 select-none pointer-events-none z-0">
                  <div className="text-[120px] md:text-[200px] font-black text-white dark:text-white/5 leading-none drop-shadow-sm text-outline opacity-70">
                      ABOUT
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200} animation="animate-slide-in-right" className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white uppercase tracking-tight mb-8">
                      Behind the <br/> Code
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={300}>
                  <div className="w-16 h-1 bg-dark dark:bg-sage-500 mb-8"></div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                   <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-md">
                     Passionate about creating digital experiences that live at the intersection of clean design and complex engineering.
                   </p>
                </ScrollReveal>

                <div className="flex gap-8">
                    <ScrollReveal delay={500} animation="animate-zoom-in">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="text-3xl font-black text-dark dark:text-white">4+</div>
                            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Years Exp</div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={600} animation="animate-zoom-in">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="text-3xl font-black text-dark dark:text-white">20+</div>
                            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects</div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div className="relative h-full flex items-center justify-center">
                <ScrollReveal delay={400} animation="animate-fade-up" className="w-full">
                  <Terminal />
                </ScrollReveal>
                
                {/* Decorative Elements around terminal */}
                <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-sage-200 dark:bg-sage-900 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -z-10 top-10 -left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-3xl opacity-50"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;