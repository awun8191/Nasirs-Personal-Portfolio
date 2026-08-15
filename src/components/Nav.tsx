import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "../data/site";
import { EASE_EXPO } from "./Reveal";

// Swiss bar (3.1). Fixed, white, hairline bottom border, sharp corners.
// Mobile: wordmark + MENU button, full-screen overlay with bold sans links.
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-hairline bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">
          <a
            href="#hero"
            className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-ink link-underline"
          >
            Dauda Nasir<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft link-underline hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="pressable flex h-11 items-center rounded-sm border border-card-border bg-canvas px-4 font-mono text-xs uppercase tracking-[0.18em] text-ink hover:border-card-border-hover md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[45] flex flex-col bg-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_EXPO }}
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-ink">
                Dauda Nasir<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                className="pressable flex h-11 w-11 items-center justify-center rounded-sm border border-card-border bg-canvas font-mono text-sm text-ink hover:border-card-border-hover"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="py-3 font-sans text-[clamp(2.5rem,10vw,4rem)] font-bold uppercase leading-none tracking-[-0.02em] text-ink"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.06 * i }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
