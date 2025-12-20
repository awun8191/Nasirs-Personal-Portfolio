import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Github, FolderOpen } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Internal component for handling parallax logic
const ParallaxImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId: number;

    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate if the element is near the viewport
      if (rect.top < viewportHeight + 100 && rect.bottom > -100) {
        // Calculate distance from the center of the viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        // Parallax factor
        setOffset(distanceFromCenter * 0.15);
      }
    };

    const loop = () => {
      updatePosition();
      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div
        className="absolute w-full h-[120%] -top-[10%] left-0 will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out-expo"
        />
      </div>
    </div>
  );
};

const Portfolio: React.FC<{ onViewCaseStudy: (id: number) => void }> = ({ onViewCaseStudy }) => {
  return (
    <section id="work" className="py-24 bg-sage-50 dark:bg-dark relative transition-colors duration-500">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-white/50 to-transparent dark:from-white/5" />
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-white/80 to-transparent dark:from-black/50" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16 md:mb-24 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-widest text-dark dark:text-white mb-6 shadow-sm">
              <FolderOpen size={14} className="text-sage-500" />
              <span>Selected Works</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2 className="text-4xl md:text-5xl font-black text-dark dark:text-white tracking-tight mb-6">
              Featured Projects
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="max-w-xl text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              A collection of technical challenges solved with Python, Flutter, and AI.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects List */}
        <div className="flex flex-col relative pb-24 md:gap-24">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              // STICKY STACK LOGIC IMPROVED:
              // 1. Dynamic 'top' offset creates a nice visible stack (tabs effect)
              // 2. Added z-index to ensure correct layering
              className="sticky md:static w-full flex flex-col items-center"
              style={{
                // Base top offset + incremental offset per card
                // This creates the "Folder Stack" visual
                top: `calc(5rem + ${index * 3}rem)`,
                zIndex: index + 10
              }}
            >
              {/* 
                  Wrapper to create spacing. 
                  Min-height on mobile ensures user has to scroll significantly before the next card overlaps,
                  solving the "appears too quickly" issue.
                */}
              <div className="w-full md:min-h-0 min-h-[75vh] md:mb-0 mb-12 flex flex-col relative">

                {/* Mobile Index Tab (Visible when stacked) */}
                <div className="md:hidden absolute -top-8 left-0 right-0 flex justify-center z-0 transition-opacity duration-300 opacity-100">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-1.5 rounded-t-xl border border-b-0 border-gray-200 dark:border-gray-700 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Project 0{index + 1}
                    </span>
                  </div>
                </div>

                <ScrollReveal delay={index * 50} animation="animate-fade-up" className="w-full h-full flex-grow">
                  <div
                    className="group bg-white dark:bg-gray-800 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl transition-all duration-500 h-full flex flex-col md:grid md:grid-cols-2"
                    style={{
                      // Deeper shadow for better separation in stack
                      boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    {/* Image Section */}
                    <div className={`relative h-[30vh] md:h-[500px] w-full overflow-hidden bg-gray-100 dark:bg-gray-900 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="absolute inset-0 bg-dark/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                      <ParallaxImage src={project.image} alt={project.title} />

                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                        <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/90 dark:bg-dark/90 backdrop-blur-md rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider text-dark dark:text-white shadow-lg">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-12 lg:p-16 flex flex-col flex-grow justify-center items-start text-left bg-white dark:bg-gray-800 relative z-30">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-3 md:mb-6 group-hover:text-sage-600 dark:group-hover:text-sage-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-6 lg:mb-8 leading-relaxed font-medium line-clamp-4 md:line-clamp-none">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8 lg:mb-10 mt-auto md:mt-0">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-sage-50 dark:bg-white/5 rounded-lg text-[10px] md:text-xs font-bold text-gray-600 dark:text-gray-300 border border-sage-100 dark:border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onViewCaseStudy(project.id)}
                        className="w-full md:w-auto px-6 py-3.5 lg:px-8 lg:py-4 bg-dark dark:bg-white text-white dark:text-dark rounded-full font-bold shadow-xl hover:bg-sage-600 dark:hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm lg:text-base">
                        View Case Study
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-12 md:mt-0 text-center relative z-20">
          <ScrollReveal delay={200}>
            <a href="https://github.com" className="inline-flex items-center gap-2 text-dark dark:text-white font-bold hover:text-sage-600 dark:hover:text-sage-400 transition-colors border-b-2 border-transparent hover:border-sage-600 dark:hover:border-sage-400 pb-1 text-base lg:text-lg">
              <Github size={20} />
              <span>Explore full archive on GitHub</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;