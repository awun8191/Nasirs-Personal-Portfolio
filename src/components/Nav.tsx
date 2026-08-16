import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "../data/site";
import { EASE_EXPO } from "./Reveal";
import { useRoute } from "../router";

// Swiss bar (3.1). Fixed, white, hairline bottom border, sharp corners.
// Mobile: wordmark + animated arrow button, full-screen overlay with bold sans links.
// On case study pages (route !== "/") the links anchor back to the homepage
// sections with an absolute path (/#about), per CASE-STUDY-SYSTEM.md 1.1.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduce = useReducedMotion();
  const route = useRoute();
  const isCase = route !== "/" && route.startsWith("/projects/");
  const hrefFor = (href: string) => (isCase ? `/${href}` : href);

  // Scroll-spy: the section crossing the upper third of the viewport
  // becomes the active nav link. Homepage only; case pages have no sections.
  useEffect(() => {
    if (isCase) return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1)));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [isCase]);

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
            href={isCase ? "/" : "#hero"}
            className="relative inline-flex min-h-11 items-center font-mono text-sm font-medium tracking-[0.18em] text-ink after:absolute after:inset-x-0 after:inset-y-0 after:content-['']"
          >
            raregazzetto<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={hrefFor(link.href)}
                className={`py-2 font-mono text-xs uppercase tracking-[0.18em] link-underline hover:text-accent ${
                  active === link.href ? "text-accent" : "text-ink-soft"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="pressable flex h-11 w-11 items-center justify-center rounded-sm border border-card-border bg-canvas text-ink hover:border-card-border-hover hover:text-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: EASE_EXPO }}
            >
              <path d="M9 6l6 6-6 6" />
            </motion.svg>
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
              <span className="font-mono text-sm font-medium tracking-[0.18em] text-ink">
                raregazzetto<span className="text-accent">.</span>
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
                  href={hrefFor(link.href)}
                  className={`py-3 font-sans text-[clamp(2.5rem,10vw,4rem)] font-bold uppercase leading-none tracking-[-0.02em] ${
                    active === link.href ? "text-accent" : "text-ink"
                  }`}
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
