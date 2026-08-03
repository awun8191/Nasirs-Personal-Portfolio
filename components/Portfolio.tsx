import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Desktop-only parallax. On mobile the image is a plain <img> —
// motion-on-motion inside a sticky card was disorienting and costly.
const ParallaxImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to Y translation
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Respect prefers-reduced-motion (the old parallax had no guard)
  if (reduce) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div
        className="absolute w-full h-[120%] -top-[10%] left-0 will-change-transform"
        style={{ y }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

const Portfolio: React.FC<{ onViewCaseStudy: (id: number) => void }> = ({ onViewCaseStudy }) => {
  // Desktop check: parallax only runs on md+ screens
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

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

          <ScrollReveal delay={200}>
            <h2 className="text-5xl md:text-7xl font-black text-dark dark:text-white tracking-tighter mb-6 leading-[0.85]">
              Featured Projects
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
              Production systems I've built end-to-end - from embedded firmware to cloud AI pipelines.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects List — simple vertical stack on mobile; 2-col grid on desktop */}
        <div className="flex flex-col relative pb-24 md:gap-24">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="w-full flex flex-col items-center mb-12 md:mb-0 last:mb-0"
            >
              <ScrollReveal animation="animate-fade-up-soft" className="w-full h-full">
                <div
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm md:shadow-xl flex flex-col md:grid md:grid-cols-2 transition-colors duration-500"
                >
                  {/* Image Section */}
                  <div className={`relative h-[30vh] md:h-full w-full overflow-hidden bg-gray-100 dark:bg-gray-900 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="absolute inset-0 bg-dark/5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                    {isDesktop ? (
                      <ParallaxImage src={project.image} alt={project.title} />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
                      <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/90 dark:bg-dark/90 backdrop-blur-md rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider text-dark dark:text-white shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-12 lg:p-16 flex flex-col flex-grow justify-center items-start text-left bg-white dark:bg-gray-800 relative z-30">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark dark:text-white mb-3 md:mb-6 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-sage-600 dark:[@media(hover:hover)_and_(pointer:fine)]:group-hover:text-sage-400 transition-colors">
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
                      className="w-full md:w-auto px-6 py-3.5 lg:px-8 lg:py-4 bg-dark dark:bg-white text-white dark:text-dark rounded-full font-bold shadow-xl hover:bg-sage-600 dark:hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-colors flex items-center justify-center gap-2 group/btn text-sm lg:text-base"
                    >
                      View Case Study
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-12 md:mt-0 text-center relative z-20">
          <ScrollReveal delay={200}>
            <a href="https://github.com/awun8191" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-dark dark:text-white font-bold hover:text-sage-600 dark:hover:text-sage-400 transition-colors border-b-2 border-transparent hover:border-sage-600 dark:hover:border-sage-400 pb-1 text-base lg:text-lg">
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
