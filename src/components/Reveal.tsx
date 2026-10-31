import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Motion (4.1): one reveal system, three expressions. Bind the expression to
// the content it reveals. A paragraph rises, a media card settles from 0.98,
// a heading fades in place. Never the same entrance for every section
// (auteur ban 11). Reduced motion is opacity only, 300ms, never zero.
type Variant = "rise" | "scale" | "fade";

const FROM: Record<Variant, { opacity: number; y?: number; scale?: number }> = {
  rise: { opacity: 0, y: 16 },
  scale: { opacity: 0, scale: 0.98 },
  fade: { opacity: 0 },
};

const TO: Record<Variant, { opacity: number; y?: number; scale?: number }> = {
  rise: { opacity: 1, y: 0 },
  scale: { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
};

// Swiss minimal reveal (4.1): short rise + fade, 500-700ms expo-out, once.
// Reduced motion: opacity-only, max 300ms.
export default function Reveal({
  children,
  delay = 0,
  className,
  variant = "rise",
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : FROM[variant]}
      whileInView={reduce ? { opacity: 1 } : TO[variant]}
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
