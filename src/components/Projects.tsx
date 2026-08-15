import Reveal from "./Reveal";
import ExploreLink from "./ExploreLink";
import { PROJECTS, AWUN_FACTS, AWUN_CHAPTERS, AWUN_FLOW } from "../data/site";
import type { ProjectEntry, Metric } from "../data/site";

function Tag({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <span
      className={`rounded-sm border px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] ${
        light
          ? "border-white/40 text-white/90"
          : "border-tag-border bg-tag-bg text-accent-deep"
      }`}
    >
      {label}
    </span>
  );
}

function MetricInline({ metric, light = false }: { metric: Metric; light?: boolean }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span
        className={`metric-num font-sans text-2xl font-bold leading-none tracking-[-0.01em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {metric.value}
      </span>
      <span
        className={`font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${
          light ? "text-white/80" : "text-muted"
        }`}
      >
        {metric.label}
      </span>
    </span>
  );
}

function MetricBig({ metric, light = false }: { metric: Metric; light?: boolean }) {
  return (
    <div>
      <div
        className={`metric-num font-sans text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {metric.value}
      </div>
      <div
        className={`mt-2 font-mono text-xs uppercase tracking-[0.14em] ${
          light ? "text-white/80" : "text-muted"
        }`}
      >
        {metric.label}
      </div>
    </div>
  );
}

function MetricBand({ metrics, light = false }: { metrics: Metric[]; light?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-6">
      {metrics.map((m) => (
        <div key={m.label}>
          <div
            className={`metric-num font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[0.95] tracking-[-0.02em] ${
              light ? "text-white" : "text-ink"
            }`}
          >
            {m.value}
          </div>
          <div
            className={`mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${
              light ? "text-white/80" : "text-muted"
            }`}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Real architecture flow for Engineering Hub (client -> API -> data).
function FlowStrip({ layers }: { layers: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
      {layers.map((layer, i) => (
        <span key={layer} className="contents">
          <span>{layer}</span>
          {i < layers.length - 1 && <span className="text-accent">→</span>}
        </span>
      ))}
    </div>
  );
}

// Standard Swiss project card. Sharp corners, thick border, hard shadow
// that lifts on hover (hard shadow replaces the old amber bloom).
function ProjectCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article className="hard-card flex h-full flex-col border-2 border-ink bg-surface p-6 shadow-hard md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{entry.year}</p>
        </div>

        <h3 className="mt-5 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-[2rem]">
          {entry.title}
        </h3>
        <p className="mt-3 max-w-[56ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
          {entry.line}
        </p>

        {entry.id === "engineering-hub" && (
          <div className="mt-6 border-t border-hairline pt-4">
            <FlowStrip layers={["Flutter Client", "FastAPI API", "PostgreSQL", "Gemini"]} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {entry.metrics.length === 1 ? (
            <MetricBig metric={entry.metrics[0]} />
          ) : (
            entry.metrics.map((m) => <MetricInline key={m.label} metric={m} />)
          )}
          {entry.subLine && (
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              {entry.subLine}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="mt-auto pt-8">
          <ExploreLink href={entry.href} />
        </div>
      </article>
    </Reveal>
  );
}

// NUESA carries the verified dashboard image; the card is a full-bleed spread.
function LargeCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article className="hard-card flex h-full flex-col border-2 border-ink bg-surface shadow-hard md:p-10">
        <div className="flex items-baseline justify-between gap-4 p-6 md:p-0">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{entry.year}</p>
        </div>

        <div className="flex flex-1 flex-col gap-8 p-6 md:flex-row md:items-center md:p-0">
          <div className="md:max-w-[45%]">
            <h3 className="font-sans text-3xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-[2.5rem]">
              {entry.title}
            </h3>
            <p className="mt-4 max-w-[52ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
              {entry.line}
            </p>
            <div className="mt-8">
              <MetricBand metrics={entry.metrics} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
            <div className="mt-6">
              <ExploreLink href={entry.href} />
            </div>
          </div>
          {entry.visual && (
            <figure className="md:flex-1">
              <div className="overflow-hidden rounded-sm border-2 border-ink">
                <img
                  src={entry.visual.src}
                  alt={entry.visual.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {entry.visual.caption}
              </figcaption>
            </figure>
          )}
        </div>
      </article>
    </Reveal>
  );
}

// AWUN: the capstone chapter. Blue band, no user metrics (none exist).
// System facts and chapter index only. The one saturated accent moment.
function ChapterCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article className="hard-card relative flex h-full flex-col border-2 border-ink bg-accent p-8 text-white shadow-hard md:p-14">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/90">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            {entry.year}
          </p>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/80">
          The Capstone
        </p>
        <h3 className="mt-3 font-sans text-[clamp(3.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">
          {entry.title}
        </h3>
        <p className="mt-5 max-w-[58ch] font-sans text-[1.0625rem] leading-[1.6] text-white/90">
          {entry.line}
        </p>

        <div className="mt-8 hidden flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-white/80 md:flex">
          {AWUN_FLOW.map((node, i) => (
            <span key={node} className="contents">
              <span>{node}</span>
              {i < AWUN_FLOW.length - 1 && <span className="text-white">→</span>}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {AWUN_FACTS.map((fact) => (
            <div key={fact} className="border-t border-white/40 pt-3">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-white">
                {fact}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {AWUN_CHAPTERS.map((ch) => (
            <Tag key={ch} label={ch} light />
          ))}
        </div>

        <div className="mt-8">
          <ExploreLink href={entry.href} label="Explore the Documentary" light />
        </div>
      </article>
    </Reveal>
  );
}

// Projects (3.5): six verified projects in a Swiss grid with index numbers.
// Order and metrics match the data module exactly. AWUN closes as the chapter.
export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">03 / Projects</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                The Work
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
                Selected systems, built and shipped
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-12 md:gap-8">
          {PROJECTS.map((entry, i) => {
            const span =
              entry.variant === "large" || entry.variant === "chapter"
                ? "md:col-span-12"
                : "md:col-span-6";
            return (
              <div key={entry.id} className={span}>
                {entry.variant === "large" ? (
                  <LargeCard entry={entry} index={i} />
                ) : entry.variant === "chapter" ? (
                  <ChapterCard entry={entry} index={i} />
                ) : (
                  <ProjectCard entry={entry} index={i} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
