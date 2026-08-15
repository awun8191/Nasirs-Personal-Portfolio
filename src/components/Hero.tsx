import Reveal from "./Reveal";

// Hero (3.2). The Provocation.
// min-height 100dvh (svh fallback in CSS), quote + attribution only.
// No kicker, no badges, no scroll cue. One hot-amber word max.
// The .hero-bg layer is the reserved slot for Nasir's warm interior image later.
export default function Hero() {
  return (
    <section id="hero" className="hero-min relative flex items-center overflow-hidden">
      <div aria-hidden className="hero-bg" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h1 className="max-w-[16ch] font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.015em] text-primary">
            The <span className="text-accent-hot">beginning</span> is the most important part of
            any work.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-muted">
            Plato, Republic, Book II
          </p>
        </Reveal>
      </div>
    </section>
  );
}
