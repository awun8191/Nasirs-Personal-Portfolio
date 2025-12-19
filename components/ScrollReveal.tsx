import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: string; // We keep the prop name for compatibility, but map it to transforms
  duration?: string;
  delay?: number;
  className?: string;
  threshold?: number;
  enableBlur?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'animate-fade-up', 
  duration = '0.8s',
  delay = 0,
  className = '',
  threshold = 0.1,
  enableBlur = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Map the animation names to starting transform states
  const getInitialState = () => {
    switch (animation) {
      case 'animate-fade-up': return 'opacity-0 translate-y-8';
      case 'animate-fade-down': return 'opacity-0 -translate-y-8';
      case 'animate-slide-in-right': return 'opacity-0 -translate-x-8';
      case 'animate-slide-in-left': return 'opacity-0 translate-x-8';
      case 'animate-zoom-in': return 'opacity-0 scale-95';
      case 'animate-fade-in': return 'opacity-0';
      default: return 'opacity-0 translate-y-8';
    }
  };

  const getVisibleState = () => {
    switch (animation) {
      case 'animate-zoom-in': return 'opacity-100 scale-100';
      default: return 'opacity-100 translate-y-0 translate-x-0';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '50px' // Pre-load slightly before it hits view to reduce "pop"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`
        transition-all ease-out-expo
        gpu-accelerated
        ${className} 
        ${isVisible ? getVisibleState() : getInitialState()}
        ${enableBlur && !isVisible ? 'blur-sm' : 'blur-0'}
      `}
      style={{ 
        transitionDuration: duration,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;