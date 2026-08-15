import Reveal from "./Reveal";
import { TOOLS } from "../data/site";

// Workbench (3.4): SYSTEMS I BUILD. Swiss index list, not cards.
// Each tool is a ruled row: index, name, tags, note, status. Sharp hairlines.
// Section rhythm (2026-08-15): the Workbench is the page's black band, a
// full-bleed ink field between white About and white Projects. Every color
// inverts to light-on-dark (white text, accent-bright on ink), the row rules
// become white/20, and the section carries its own white/10 top and bottom
// hairlines so the band reads cleanly against the white sections.
export default function Workbench() {
  return (
    <section
      id="workbench"
      className="border-y border-white/10 bg-ink py-[clamp(96px,12vw,160px)]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              02 / Workbench
            </p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-bright">
                Systems I Build
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
                Tools of the trade
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {TOOLS.map((tool, i) => (
            <Reveal key={tool.name} delay={0.04 * (i % 2)}>
              <article className="group grid gap-4 border-t border-white/20 py-6 md:grid-cols-[10rem_1fr_auto] md:gap-12 md:py-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="font-sans text-2xl font-bold tracking-[-0.01em] text-white transition-colors duration-200 group-hover:text-accent-bright md:text-[2rem]">
                      {tool.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-white/40 px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 max-w-[62ch] font-sans text-[1.0625rem] leading-[1.6] text-white/85">
                    {tool.note}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/70 md:pt-1 md:text-right">
                  {tool.status}
                </p>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-white/20" aria-hidden />
        </div>
      </div>
    </section>
  );
}
