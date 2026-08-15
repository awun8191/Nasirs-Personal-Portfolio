import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Swiss minimal reveal (4.1): short rise + fade, 500-700ms expo-out, once.
// Reduced motion: opacity-only, max 300ms.
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? 0.3 : 0.6,
        ease: EASE_EXPO,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
