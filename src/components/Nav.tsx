import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "../data/site";
import { EASE_EXPO } from "./Reveal";

// Floating pill bar (3.1). Fixed, backdrop blur, hairline border.
// Mobile: wordmark + MENU pill, full-screen overlay with serif links.
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
      <header className="fixed inset-x-4 top-4 z-30">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between rounded-surface border border-hairline bg-[rgba(0,0,0,0.5)] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150 md:px-6">
          <a
            href="#hero"
            data-bloom
            className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-primary link-underline"
          >
            Dauda Nasir<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-bloom
                className="py-2 font-mono text-xs uppercase tracking-[0.18em] text-secondary link-underline hover:text-accent-hot"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="pressable flex h-11 items-center rounded-pill border border-hairline bg-surface px-5 font-mono text-xs uppercase tracking-[0.18em] text-primary shadow-card md:hidden"
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
            transition={{ duration: 0.3, ease: EASE_EXPO }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(700px 500px at 80% 0%, rgba(255, 217, 160, 0.08), transparent 60%)",
              }}
            />
            <div className="flex h-14 items-center justify-between px-5">
              <span className="font-mono text-sm font-medium uppercase tracking-[0.18em] text-primary">
                Dauda Nasir<span className="text-accent">.</span>
              </span>
              <button
                type="button"
                className="pressable flex h-11 w-11 items-center justify-center rounded-pill border border-hairline bg-surface font-mono text-sm text-primary"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="py-3 font-serif text-[clamp(2rem,8vw,3rem)] text-primary"
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.08 * i }}
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
