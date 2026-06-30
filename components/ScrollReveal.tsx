import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: string;
  duration?: string;
  delay?: number;
  className?: string;
  threshold?: number;
  enableBlur?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'animate-fade-up', 
  delay = 0,
  className = '',
  threshold = 0.1,
  enableBlur = false
}) => {
  // Map old tailwind classes to framer-motion variants
  const getVariants = (): Variants => {
    const baseTransition = {
      type: 'spring' as const,
      damping: 25,
      stiffness: 120,
      mass: 0.8,
      delay: delay / 1000,
    };

    switch (animation) {
      case 'animate-fade-up':
        return {
          hidden: { opacity: 0, y: 30, filter: enableBlur ? 'blur(8px)' : 'blur(0px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: baseTransition }
        };
      case 'animate-fade-down':
        return {
          hidden: { opacity: 0, y: -30, filter: enableBlur ? 'blur(8px)' : 'blur(0px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: baseTransition }
        };
      case 'animate-slide-in-right':
        return {
          hidden: { opacity: 0, x: -40, filter: enableBlur ? 'blur(8px)' : 'blur(0px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: baseTransition }
        };
      case 'animate-slide-in-left':
        return {
          hidden: { opacity: 0, x: 40, filter: enableBlur ? 'blur(8px)' : 'blur(0px)' },
          visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: baseTransition }
        };
      case 'animate-zoom-in':
        return {
          hidden: { opacity: 0, scale: 0.9, filter: enableBlur ? 'blur(8px)' : 'blur(0px)' },
          visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { ...baseTransition, stiffness: 150 } }
        };
      case 'animate-fade-in':
      default:
        return {
          hidden: { opacity: 0, filter: enableBlur ? 'blur(8px)' : 'blur(0px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: baseTransition }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: threshold }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;