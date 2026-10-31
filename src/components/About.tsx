import Reveal from "./Reveal";
import { ABOUT_STATEMENT } from "../data/site";

// About (3.3): who I am. The section opens with a hairline rule, not a
// numbered kicker: the rails are reserved for the project index, which is a
// real sequence. One direct statement, no cards, no metadata rows.
export default function About() {
  return (
    <section id="about" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="border-t border-hairline pt-10 md:pt-14">
            <p className="max-w-[46rem] font-sans text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink text-pretty">
              {ABOUT_STATEMENT[0]}
            </p>
            <p className="mt-6 max-w-[46rem] font-sans text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-[1.4] text-ink-soft">
              {ABOUT_STATEMENT[1]}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
