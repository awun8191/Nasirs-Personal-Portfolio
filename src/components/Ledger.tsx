import Reveal from "./Reveal";
import { LEDGER_METADATA, LEDGER_STATEMENT } from "../data/site";

// Ledger (3.3): who I am. Mono metadata left, serif statement right,
// ruled lines, entry number top right.
export default function Ledger() {
  return (
    <section id="ledger" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                The Engineer's Ledger
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-primary">
                Who I Am
              </h2>
            </div>
            <span className="pt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Entry 001
            </span>
          </div>
          <div className="mt-10 h-px w-full bg-hairline" aria-hidden />
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          <Reveal delay={0.05}>
            <dl className="border-t border-hairline">
              {LEDGER_METADATA.map((row) => (
                <div
                  key={row.field}
                  className="flex flex-col gap-1 border-b border-hairline py-4 md:py-5"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {row.field}
                  </dt>
                  <dd className="font-mono text-sm leading-[1.6] tracking-[0.02em] text-primary">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-[60ch] font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] text-primary">
              {LEDGER_STATEMENT}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
