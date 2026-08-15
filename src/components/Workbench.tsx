import Reveal from "./Reveal";
import { TOOLS } from "../data/site";

// Workbench (3.4): SYSTEMS I BUILD. Swiss index list, not cards.
// Each tool is a ruled row: index, name, tags, note, status. Sharp hairlines.
export default function Workbench() {
  return (
    <section id="workbench" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">02 / Workbench</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                Systems I Build
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
                Tools of the trade
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {TOOLS.map((tool, i) => (
            <Reveal key={tool.name} delay={0.04 * (i % 2)}>
              <article className="group grid gap-4 border-t-2 border-ink py-6 md:grid-cols-[10rem_1fr_auto] md:gap-12 md:py-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="font-sans text-2xl font-bold tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-accent md:text-[2rem]">
                      {tool.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-tag-border bg-tag-bg px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-deep"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 max-w-[62ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                    {tool.note}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1 md:text-right">
                  {tool.status}
                </p>
              </article>
            </Reveal>
          ))}
          <div className="border-t-2 border-ink" aria-hidden />
        </div>
      </div>
    </section>
  );
}
