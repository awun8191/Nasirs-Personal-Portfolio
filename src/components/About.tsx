import Reveal from "./Reveal";
import { ABOUT_STATEMENT } from "../data/site";

// About (3.3): who I am. Swiss grid: index number left, statement right.
// One direct statement, no cards, no metadata rows. Bold sans, generous space.
export default function About() {
  return (
    <section id="about" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">01 / About</p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="max-w-[30ch]">
              <p className="font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink">
                {ABOUT_STATEMENT[0]}
              </p>
              <p className="mt-6 font-sans text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-[1.4] text-ink-soft">
                {ABOUT_STATEMENT[1]}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
