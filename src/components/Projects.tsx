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

// Standard Swiss project card. Hairline border, flat surface, no shadow.
// Hover deepens the border and nudges up 2px (.swiss-card in index.css).
function ProjectCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article className="swiss-card flex h-full flex-col border border-card-border bg-surface p-6 md:p-8">
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

// NUESA carries the verified dashboard image; the card is a full-width spread.
function LargeCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article className="swiss-card flex h-full flex-col border border-card-border bg-surface md:p-10">
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
              <div className="overflow-hidden rounded-sm border border-card-border">
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

// AWUN: the capstone chapter. Flat blue band, no border, no shadow.
// System facts and chapter index only. The one saturated accent moment.
function ChapterCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article className="flex h-full flex-col bg-accent p-8 text-white md:p-14">
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

// Projects (3.5): six verified projects on a structured 12-col Swiss grid.
//
// Grid rationale (the composition is deliberate, not masonry):
//   - 12 fixed columns, ONE gap value (24px) everywhere, no orphan columns.
//   - Pair 1: Soiling (7) + TRAKS (5)  - two small entries, asymmetric split.
//   - Pair 2: Engineering Hub (8) + RAG (4) - the medium (flow strip) gets
//     more width, the compact entry less.
//   - Full width: NUESA (12) large spread with the dashboard image, then
//     AWUN (12) chapter band as the capstone close.
//   - Index numbers 01-06 follow display order, so they always read top-left
//     to bottom-right.
// Order and metrics match the data module; AWUN closes as the chapter.
const DISPLAY_ORDER = ["soiling", "traks", "engineering-hub", "rag", "nuesa", "awun"] as const;

const GRID_SPANS: Record<string, string> = {
  soiling: "md:col-span-7",
  traks: "md:col-span-5",
  "engineering-hub": "md:col-span-8",
  rag: "md:col-span-4",
  nuesa: "md:col-span-12",
  awun: "md:col-span-12",
};

export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted md:col-span-3">
              03 / Projects
            </p>
            <div className="md:col-span-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                The Work
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
                Selected systems, built and shipped
              </h2>
            </div>
          </div>
        </Reveal>

        <div aria-hidden className="mt-10 border-t border-card-border md:mt-14" />

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-12 md:gap-6">
          {DISPLAY_ORDER.map((id, i) => {
            const entry = PROJECTS.find((p) => p.id === id);
            if (!entry) return null;
            const span = GRID_SPANS[id];
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
