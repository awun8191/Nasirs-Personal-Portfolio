import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Slow restraint reveal (4.1): rise + blur fade, 700-900ms expo-out, once.
// Reduced motion: opacity-only, max 300ms.
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.3 : 0.8,
        ease: EASE_EXPO,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
