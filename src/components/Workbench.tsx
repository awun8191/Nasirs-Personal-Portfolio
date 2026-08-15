import Reveal from "./Reveal";
import { TOOLS } from "../data/site";

// Workbench (3.4): SYSTEMS I BUILD. Tools laid on a bench with notes attached.
// NOT a bento grid, NOT a dashboard. Asymmetric staggered widths.
const WIDTHS = ["md:w-[58%]", "md:w-[42%]"];

export default function Workbench() {
  return (
    <section id="workbench" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            The Workbench
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-primary">
            Systems I Build
          </h2>
          {/* Bench table edge: one grounded line under the header */}
          <div
            aria-hidden
            className="mt-10 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-walnut-light), rgba(92, 64, 51, 0.2) 40%, transparent)",
              boxShadow: "0 10px 24px -12px rgba(0, 0, 0, 0.55)",
            }}
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 md:mt-20 md:gap-10">
          {TOOLS.map((tool, i) => {
            const alignRight = i % 2 === 1;
            return (
              <Reveal key={tool.name} delay={0.05 * (i % 2)}>
                <article
                  data-bloom
                  className={`tool-card w-full rounded-surface border border-hairline bg-surface p-6 shadow-card md:p-8 ${
                    alignRight ? "md:ml-auto" : ""
                  } ${WIDTHS[i % WIDTHS.length]}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                    <h3 className="font-serif text-[1.75rem] leading-tight text-primary md:text-[2.25rem]">
                      {tool.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-pill border border-tag-border bg-tag-bg px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-hot"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 max-w-[62ch] font-sans text-[1.0625rem] leading-[1.65] text-secondary">
                    {tool.note}
                  </p>
                  <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    Status / {tool.status}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
