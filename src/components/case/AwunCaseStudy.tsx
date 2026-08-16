import { motion, useReducedMotion } from "framer-motion";
import CaseShell, { CaseHeader } from "./CaseShell";
import { FlowBand, RuledRows, MetricTable, Chip, DiagramSlot } from "./primitives";
import { awunStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// AWUN: The Technical Documentary (Terracotta, capstone)
// Progressive-reveal documentary in five chapters. Giant chapter numerals
// as the left spine, system-flow chevron strips, ledger rows, order state
// chips. No user metrics: AWUN publishes system facts only.
// ---------------------------------------------------------------------------

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Chapter reveal: one chapter per viewport beat, opacity + rise once.
function Chapter({ index, children }: { index: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.3 : 0.6, ease: EASE_EXPO }}
      id={`ch-${index.replace("CH. ", "0")}`}
      className="scroll-mt-24"
    >
      {children}
    </motion.div>
  );
}

export default function AwunCaseStudy() {
  const study = awunStudy;
  const chapters = study.sections;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="mt-10">
          {/* Mobile chapter rail: horizontal chip row above the hero (spec 7) */}
          <div className="mb-8 flex flex-wrap gap-2 md:hidden">
            {chapters.map((ch) => (
              <a
                key={ch.index}
                href={`#ch-${ch.index.replace("CH. ", "0")}`}
                className="flex min-h-11 items-center rounded-sm border border-case-accent/40 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-case-accent-deep"
              >
                {ch.index}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <CaseHeader study={study} />
              {/* System facts as ruled rows (no metrics) */}
              <div className="mt-8">
                <RuledRows
                  rows={[
                    { label: "SYSTEM FACT 01", value: "AI STOREFRONT CREATION" },
                    { label: "SYSTEM FACT 02", value: "PAYMENT VERIFICATION" },
                    { label: "SYSTEM FACT 03", value: "INVENTORY MANAGEMENT" },
                  ]}
                />
              </div>
              {/* Flow strip motif */}
              <div className="mt-8">
                <FlowBand segments={["CLIENT", "API", "WORKER", "D1 / R2"]} />
              </div>
            </div>
          {/* Desktop sticky chapter rail */}
          <nav
            aria-label="Chapters"
            className="sticky top-24 hidden w-40 shrink-0 flex-col gap-2 self-start md:flex"
          >
            {chapters.map((ch) => (
              <a
                key={ch.index}
                href={`#ch-${ch.index.replace("CH. ", "0")}`}
                className="relative py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted link-underline hover:text-case-accent-deep"
              >
                {ch.index} / {ch.title}
              </a>
            ))}
          </nav>
        </div>
      </section>
      }
      sections={
        <>
          {chapters.map((ch, i) => (
            <Chapter key={ch.index} index={ch.index}>
              <div className="grid gap-6 md:grid-cols-[minmax(0,6rem)_1fr] md:gap-10">
                {/* Giant chapter numeral spine */}
                <div className="md:pt-1">
                  <p className="metric-num font-sans text-[clamp(4rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-case-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-case-accent-deep">
                      {ch.index}
                    </p>
                    <h2 className="font-sans text-3xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-4xl">
                      {ch.title}
                    </h2>
                  </div>
                  {ch.body && (
                    <p className="max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                      {ch.body}
                    </p>
                  )}
                  {ch.flow && (
                    <div>
                      <FlowBand segments={ch.flow} />
                    </div>
                  )}
                  {ch.chips && (
                    <div className="flex flex-wrap gap-2">
                      {ch.chips.map((c) => (
                        <Chip key={c} label={c} variant="default" />
                      ))}
                    </div>
                  )}
                  {ch.ruled && (
                    <div>
                      <RuledRows rows={ch.ruled} />
                    </div>
                  )}
                  {ch.tables && (
                    <div className="grid gap-8">
                      {ch.tables.map((t) => (
                        <MetricTable key={t.id} table={t} />
                      ))}
                    </div>
                  )}
                  {ch.diagrams && (
                    <div className="grid gap-6">
                      {ch.diagrams.map((slot) => (
                        <DiagramSlot key={slot.id} slot={slot} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Chapter>
          ))}

          {/* Links section (epilogue) */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">LINKS</p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                The System Is Live
              </h2>
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
                {study.links.live && (
                  <a
                    href={study.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-case-accent-deep link-underline after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
                  >
                    Live Site →
                  </a>
                )}
                {study.links.checkout && (
                  <a
                    href={study.links.checkout}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-case-accent-deep link-underline after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
                  >
                    Checkout →
                  </a>
                )}
                {study.links.api && (
                  <a
                    href={study.links.api}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-case-accent-deep link-underline after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
                  >
                    API →
                  </a>
                )}
                <span className="inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-muted">
                  GitHub [URL PENDING]
                </span>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
