import Reveal from "./Reveal";
import { LEDGER_STATEMENT } from "../data/site";

// Ledger (3.3): who I am. One direct statement, no cards, no ruled rows,
// no metadata table. Serif display, generous whitespace.
export default function Ledger() {
  return (
    <section id="ledger" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="max-w-[34ch]">
            {LEDGER_STATEMENT.map((para) => (
              <p
                key={para}
                className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.15] tracking-[-0.01em] text-primary"
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
