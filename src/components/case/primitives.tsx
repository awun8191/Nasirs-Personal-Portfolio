import { Fragment } from "react";
import type { CaseMetric, DiagramSlot, CaseTable, CaseSection } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// Shared primitives for the six case study pages.
// All content comes from src/data/caseStudies.ts; these components only
// render. The page accent is set by the .case-<slug> wrapper class on the
// shell, so every accent-aware rule below resolves per page.
// ---------------------------------------------------------------------------

const ASPECT_CLASS: Record<DiagramSlot["aspect"], string> = {
  "16:9": "ar-16x9",
  "21:9": "ar-21x9",
  "1:1": "ar-1x1",
};

// Diagram slot contract (spec 4): dashed accent border, mono two-line label,
// aspect ratio per slot, collapses to min-height on mobile.
export function DiagramSlot({ slot, ink = false }: { slot: DiagramSlot; ink?: boolean }) {
  return (
    <div
      className={`diagram-slot ${ASPECT_CLASS[slot.aspect]} ${ink ? "diagram-slot-ink" : ""}`}
      aria-label={`Diagram slot ${slot.id}`}
    >
      <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-case-accent-deep">
        DIAGRAM {slot.id} / {slot.label} (SLOT)
      </p>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        REPLACE WITH REAL SVG LATER
      </p>
    </div>
  );
}

// PENDING chip (spec 5.2): dashed gray border, mono micro text.
export function PendingChip() {
  return (
    <span className="rounded-sm border border-dashed border-[rgba(107,114,128,0.5)] px-1 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
      PENDING
    </span>
  );
}

// Metric table (spec 5): [label | value | chip] rows on hairline rules.
// pending: true renders the asterisk suffix + PENDING chip + footnote.
export function MetricTable({ table }: { table: CaseTable }) {
  const hasPending = table.rows.some((r) => r.pending);
  const wide = table.rows.length > 6;
  return (
    <div className="min-w-0">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        {table.title}
      </p>
      {wide && (
        <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted md:hidden">
          SCROLL
        </p>
      )}
      <div className={`mt-3 ${wide ? "overflow-x-auto" : ""}`}>
        <div className={wide ? "min-w-[560px]" : ""}>
          {table.rows.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-hairline py-3 md:grid-cols-[minmax(0,1fr)_auto_auto]"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                {row.label}
              </span>
              <span className="metric-num font-sans text-lg font-semibold text-ink md:text-right">
                {row.value}
                {row.pending && <span className="text-case-accent">*</span>}
              </span>
              {row.pending && (
                <span className="hidden justify-self-end md:inline-flex">
                  <PendingChip />
                </span>
              )}
              {row.pending && (
                <span className="col-span-2 inline-flex pt-1 md:hidden">
                  <PendingChip />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {hasPending && (
        <p className="mt-3 font-mono text-[0.6875rem] text-muted">
          * PENDING: placeholder value awaiting owner correction
        </p>
      )}
    </div>
  );
}

// Mono chip: state names, report states, review ratings.
export function Chip({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "accent" | "pending" | "light";
}) {
  if (variant === "light") {
    return (
      <span className="rounded-sm border border-white/40 px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/90">
        {label}
      </span>
    );
  }
  if (variant === "accent") {
    return (
      <span className="rounded-sm border border-case-accent/40 bg-case-accent/5 px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-case-accent-deep">
        {label}
      </span>
    );
  }
  if (variant === "pending") {
    return (
      <span className="rounded-sm border border-dashed border-[rgba(107,114,128,0.5)] px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-sm border border-card-border px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-soft">
      {label}
    </span>
  );
}

// Chevron flow band (spec 6.4 motif): mono segment blocks joined by accent
// chevrons. Vertical stack with down chevrons on mobile.
export function FlowBand({ segments }: { segments: string[] }) {
  return (
    <div className="flex flex-col items-start gap-y-2 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-3">
      {segments.map((segment, i) => (
        <Fragment key={segment}>
          <span className="border border-card-border px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-soft">
            {segment}
          </span>
          {i < segments.length - 1 && (
            <span
              aria-hidden
              className="font-mono text-[0.75rem] text-case-accent md:hidden"
            >
              ↓
            </span>
          )}
          {i < segments.length - 1 && (
            <span
              aria-hidden
              className="hidden font-mono text-[0.75rem] text-case-accent md:inline"
            >
              {">"}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

// Failure-mode / trade-off matrix (spec 6.2, 6.4): label over value stacked
// on mobile, side by side on desktop. Never a scroll container.
export function MatrixTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <div className="mt-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 border-t border-hairline py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-6"
          >
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
              {row.label}
            </span>
            <span className="font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Ruled rows (spec 6.6 ledger): mono label left, value right, hairline rules.
export function RuledRows({
  rows,
}: {
  rows: { label: string; value: string }[];
}) {
  return (
    <div>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-1 border-t border-hairline py-3 md:flex-row md:items-baseline md:justify-between md:gap-6"
        >
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            {row.label}
          </span>
          <span className="font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-ink md:text-right">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// Mono formula / code block (spec 6.1, 6.3).
export function MonoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="min-w-0 border border-card-border">
      <p className="border-b border-card-border bg-canvas px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <pre className="max-w-full overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-[1.7] text-ink-soft">
        {lines.join("\n")}
      </pre>
    </div>
  );
}

// Tile grid (spec 6.2 stack): hairline-bordered mono tiles.
export function TileGrid({ tiles }: { tiles: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-px border border-card-border bg-card-border md:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile}
          className="flex min-h-11 items-center bg-canvas px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-soft"
        >
          {tile}
        </div>
      ))}
    </div>
  );
}

// Shelf rows (spec 6.5 motif): mono call-number labels in a hairline row.
export function Shelf({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-hairline pt-4">
      {items.map((item) => (
        <span key={item} className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-case-accent-deep">
          {item}
        </span>
      ))}
    </div>
  );
}

// Big hero metric (spec 1.3 header pattern): giant number + mono label.
export function HeroMetric({
  metric,
  light = false,
}: {
  metric: CaseMetric;
  light?: boolean;
}) {
  return (
    <div>
      <div
        className={`metric-num font-sans text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {metric.value}
        {metric.pending && <span className="text-case-accent">*</span>}
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

// Generic section wrapper. Layout knobs let each page bend the spine to its
// own language (index placement, trace line, title size).
export function Section({
  section,
  layout = {},
}: {
  section: CaseSection;
  layout?: {
    indexInline?: boolean;
    trace?: boolean;
    titleClassName?: string;
    bodyClassName?: string;
    contentGap?: string;
  };
}) {
  const {
    indexInline = false,
    trace = false,
    titleClassName = "text-2xl md:text-3xl",
    bodyClassName = "max-w-[68ch]",
    contentGap = "mt-6",
  } = layout;
  return (
    <section>
      <div className="border-t border-hairline pt-6">
        {indexInline ? (
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {section.index}
            </p>
            <h2
              className={`font-sans font-bold leading-tight tracking-[-0.01em] text-ink ${titleClassName}`}
            >
              {section.title}
            </h2>
          </div>
        ) : (
          <>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {section.index}
            </p>
            <h2
              className={`mt-3 font-sans font-bold leading-tight tracking-[-0.01em] text-ink ${titleClassName}`}
            >
              {section.title}
            </h2>
          </>
        )}
        {trace && <div aria-hidden className="case-signal-trace mt-5 w-full" />}
        {section.body && (
          <p className={`${contentGap} font-sans text-[1.0625rem] leading-[1.6] text-ink-soft ${bodyClassName}`}>
            {section.body}
          </p>
        )}
        {section.chips && (
          <div className="mt-6 flex flex-wrap gap-2">
            {section.chips.map((chip) => (
              <Chip key={chip} label={chip} variant="default" />
            ))}
          </div>
        )}
        {section.flow && (
          <div className="mt-8">
            <FlowBand segments={section.flow} />
          </div>
        )}
        {section.mono && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {section.mono.map((block) => (
              <MonoBlock key={block.title} title={block.title} lines={block.lines} />
            ))}
          </div>
        )}
        {section.ruled && (
          <div className="mt-8">
            <RuledRows rows={section.ruled} />
          </div>
        )}
        {section.matrix && (
          <div className="mt-8">
            <MatrixTable title="FAILURE MODE / MITIGATION" rows={section.matrix} />
          </div>
        )}
        {section.tiles && (
          <div className="mt-8">
            <TileGrid tiles={section.tiles} />
          </div>
        )}
        {section.shelf && (
          <div className="mt-8">
            <Shelf items={section.shelf} />
          </div>
        )}
        {section.tables && (
          <div className="mt-8 grid gap-10">
            {section.tables.map((table) => (
              <MetricTable key={table.id} table={table} />
            ))}
          </div>
        )}
        {section.diagrams && (
          <div className="mt-8">
            <div className="grid gap-6">
              {section.diagrams.map((slot) => (
                <DiagramSlot key={slot.id} slot={slot} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
