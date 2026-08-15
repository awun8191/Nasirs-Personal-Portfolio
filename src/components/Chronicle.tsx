import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll } from "framer-motion";
import Reveal from "./Reveal";
import ExploreLink from "./ExploreLink";
import { CHRONICLE_ENTRIES, AWUN_FACTS, AWUN_CHAPTERS, AWUN_FLOW } from "../data/site";
import type { ChronicleEntry, Metric } from "../data/site";

function scrollToEntry(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Timeline milestone dot (4.2): terracotta ring, blooms when the entry is in view.
function Milestone({ id }: { id: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Scroll to ${id}`}
      onClick={() => scrollToEntry(id)}
      className={`mt-2 h-3 w-3 rounded-full border transition-all duration-300 ease-ui ${
        inView
          ? "scale-100 border-accent-hot bg-accent-hot shadow-bloom-sm"
          : "scale-95 border-accent-edge bg-surface"
      }`}
    />
  );
}

// Each chronicle row carries its own rail cell so dots align with the entry start.
function TimelineRow({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div id={id} className={`relative flex gap-5 md:gap-10 ${className}`}>
      <div className="flex w-10 shrink-0 justify-center">
        <Milestone id={id} />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-pill border border-tag-border bg-tag-bg px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-hot">
      {label}
    </span>
  );
}

function MetricInline({ metric }: { metric: Metric }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2">
      <span className="metric-num font-serif text-2xl leading-none text-accent-hot">
        {metric.value}
      </span>
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        {metric.label}
      </span>
    </span>
  );
}

function MetricBig({ metric }: { metric: Metric }) {
  return (
    <div>
      <div className="metric-num font-serif text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.02em] text-primary">
        {metric.value}
      </div>
      <div className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {metric.label}
      </div>
    </div>
  );
}

// Real architecture sketch for Engineering Hub (client -> API -> data).
function StackDiagram({ layers }: { layers: string[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2.5">
      {layers.map((layer, i) => (
        <div key={layer} className="contents">
          <div className="flex items-center gap-3 rounded-small border border-hairline bg-surface px-4 py-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-primary">
              {layer}
            </span>
          </div>
          {i < layers.length - 1 && (
            <div className="mx-auto h-2.5 w-px bg-walnut-light" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

function SmallEntry({ entry }: { entry: ChronicleEntry }) {
  return (
    <TimelineRow id={entry.id} className="border-t border-hairline py-8 md:py-10">
      <div className="grid gap-3 md:grid-cols-[7rem_1fr] md:gap-8">
        <div className="font-mono text-xl tracking-[0.02em] text-muted">{entry.year}</div>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h3 className="font-serif text-2xl leading-snug text-primary">{entry.title}</h3>
            <ExploreLink href={entry.href} />
          </div>
          <p className="mt-2 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.65] text-secondary">
            {entry.line}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {entry.metrics.map((m) => (
              <MetricInline key={m.label} metric={m} />
            ))}
            {entry.subLine && (
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {entry.subLine}
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </TimelineRow>
  );
}

function MediumEntry({ entry }: { entry: ChronicleEntry }) {
  return (
    <TimelineRow id={entry.id} className="border-t border-hairline py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {entry.year}
          </div>
          <h3 className="mt-3 font-serif text-4xl leading-[1.05] text-primary md:text-5xl">
            {entry.title}
          </h3>
          <p className="mt-4 max-w-[56ch] font-sans text-[1.0625rem] leading-[1.65] text-secondary">
            {entry.line}
          </p>
          <div className="mt-8">
            <MetricBig metric={entry.metrics[0]} />
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
        <div data-bloom className="rounded-surface border border-hairline bg-surface-raised p-6 shadow-card md:p-8">
          <StackDiagram layers={["Flutter Client", "FastAPI API", "PostgreSQL", "Gemini"]} />
          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            System stack / client → API → data
          </p>
        </div>
      </div>
    </TimelineRow>
  );
}

function MetricBand({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 md:gap-x-10">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={i > 0 ? "border-l border-hairline pl-8 md:pl-10" : ""}
        >
          <div className="metric-num font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-primary">
            {m.value}
          </div>
          <div className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function LargeEntry({ entry }: { entry: ChronicleEntry }) {
  return (
    <TimelineRow id={entry.id} className="border-t border-hairline py-12 md:py-16">
      <div>
        <div className="font-mono text-[clamp(3rem,6vw,5rem)] leading-none text-muted">
          {entry.year}
        </div>
        <h3 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-primary">
          {entry.title}
        </h3>
        <p className="mt-5 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.65] text-secondary">
          {entry.line}
        </p>
        <div className="mt-10">
          <MetricBand metrics={entry.metrics} />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="mt-8">
          <ExploreLink href={entry.href} />
        </div>
        {entry.visual && (
          <figure className="mt-12">
            <div className="overflow-hidden rounded-surface border border-hairline bg-surface-raised shadow-card">
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
    </TimelineRow>
  );
}

function CompactEntry({ entry }: { entry: ChronicleEntry }) {
  return (
    <TimelineRow id={entry.id} className="py-6">
      <div data-bloom className="rounded-surface border border-hairline bg-surface p-6 shadow-card md:ml-auto md:max-w-[42%] md:p-8">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {entry.year}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-snug text-primary">{entry.title}</h3>
        <p className="mt-3 font-sans text-[0.9375rem] leading-[1.6] text-secondary">
          {entry.line}
        </p>
        <div className="mt-6">
          <MetricBig metric={entry.metrics[0]} />
        </div>
        {entry.subLine && (
          <div className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {entry.subLine}
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="mt-5">
          <ExploreLink href={entry.href} />
        </div>
      </div>
    </TimelineRow>
  );
}

function ChapterEntry({ entry }: { entry: ChronicleEntry }) {
  return (
    <TimelineRow id={entry.id} className="pt-12 md:pt-16">
      <div
        data-bloom
        className="relative overflow-hidden rounded-surface border border-hairline bg-surface p-8 shadow-card md:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 400px at 85% 0%, rgba(255, 217, 160, 0.08), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              The Capstone
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {entry.year}
            </p>
          </div>
          <h3 className="mt-6 font-serif text-[clamp(4rem,10vw,8rem)] leading-[0.95] tracking-[-0.02em] text-primary">
            {entry.title}
          </h3>
          <p className="mt-5 max-w-[58ch] font-sans text-[1.0625rem] leading-[1.65] text-secondary">
            {entry.line}
          </p>

          <div className="mt-8 hidden flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-muted md:flex">
            {AWUN_FLOW.map((node, i) => (
              <span key={node} className="contents">
                <span>{node}</span>
                {i < AWUN_FLOW.length - 1 && <span className="text-accent">→</span>}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {AWUN_FACTS.map((fact) => (
              <div key={fact} className="border-t border-hairline pt-3">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent-hot">
                  {fact}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {AWUN_CHAPTERS.map((ch) => (
              <span
                key={ch}
                className="rounded-pill border border-[rgba(201,111,74,0.5)] bg-tag-bg px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-hot"
              >
                {ch}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ExploreLink href={entry.href} label="Explore the Documentary" />
          </div>
        </div>
      </div>
    </TimelineRow>
  );
}

function Entry({ entry }: { entry: ChronicleEntry }) {
  switch (entry.variant) {
    case "small":
      return <SmallEntry entry={entry} />;
    case "medium":
      return <MediumEntry entry={entry} />;
    case "large":
      return <LargeEntry entry={entry} />;
    case "compact":
      return <CompactEntry entry={entry} />;
    case "chapter":
      return <ChapterEntry entry={entry} />;
  }
}

// Chronicle (3.5): journal entries scaled by sophistication, drawn on a timeline.
export default function Chronicle() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.6"],
  });

  const first = CHRONICLE_ENTRIES[0];
  const rest = CHRONICLE_ENTRIES.slice(1);

  return (
    <section id="chronicle" ref={sectionRef} className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            The Chronicle
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.01em] text-primary">
            Work, logged like a journal
          </h2>
          <div className="mt-10 h-px w-full bg-hairline" aria-hidden />
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          {/* Timeline track + amber progress fill (4.2) */}
          <div aria-hidden className="absolute inset-y-0 left-[19px] w-[2px] bg-[rgba(92,64,51,0.4)]" />
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute inset-y-0 left-[19px] w-[2px] origin-top bg-gradient-to-b from-accent-hot via-accent to-accent-edge"
              style={{ scaleY: scrollYProgress }}
            />
          )}

          <div className="flex flex-col">
            <SmallEntry entry={first} />
            {rest.map((entry) => (
              <Entry key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
