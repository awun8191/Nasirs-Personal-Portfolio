import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Ambient light cursor (4.4).
// Desktop only (pointer: fine), disabled under prefers-reduced-motion.
// A 480px amber halo lerps behind the pointer; it illuminates interactive regions.
function isFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

export default function AmbientCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !isFinePointer()) return;

    const el = dotRef.current;
    if (!el) return;

    const target = { x: -9999, y: -9999 };
    const current = { x: -9999, y: -9999 };
    const opacityTarget = { value: 0 };
    const opacityCurrent = { value: 0 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      opacityTarget.value = 0.14;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && typeof t.closest === "function" && t.closest("[data-bloom], a, button")) {
        opacityTarget.value = 0.6;
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && typeof t.closest === "function" && t.closest("[data-bloom], a, button")) {
        opacityTarget.value = 0.14;
      }
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      opacityCurrent.value += (opacityTarget.value - opacityCurrent.value) * 0.08;
      el.style.transform = `translate3d(${current.x - 240}px, ${current.y - 240}px, 0)`;
      el.style.opacity = String(opacityCurrent.value);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [reduce]);

  return <div ref={dotRef} aria-hidden className="ambient-cursor" />;
}
