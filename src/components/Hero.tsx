import Reveal from "./Reveal";

// Hero (3.2). Swiss poster.
// min-height 100dvh. Content anchored toward the BOTTOM of the viewport.
// Subtitle ABOVE the name, then the name in giant bold blue. Nothing else:
// no quote, no image, no buttons. Discipline is the ornament.
export default function Hero() {
  return (
    <section id="hero" className="hero-min relative flex flex-col justify-end overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-[clamp(48px,8vh,96px)] md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft md:text-sm">
            Full Stack Software Developer
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-sans text-[clamp(3.5rem,12vw,11rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-accent">
            Dauda
            <br />
            Nasir
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
