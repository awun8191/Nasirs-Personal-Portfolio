import CaseShell, { CaseHeader, HeroDiagram } from "./CaseShell";
import { Section, Chip, DiagramSlot, HeroMetric, CaseLinksSection } from "./primitives";
import { traksStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// TRAKS: The Ops Console (Safety Red)
// White hero with a flat SOS square motif, status language, alert markers,
// failure-mode matrix as the centerpiece, 8-tile stack grid.
// ---------------------------------------------------------------------------

export default function TraksCaseStudy() {
  const study = traksStudy;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="mt-10">
          <div className="flex items-start gap-6 md:items-start md:gap-12">
            {/* SOS square motif: flat red square, white mono SOS.
                Mobile (spec 7): 48px left of the kicker. Desktop (spec 6.2):
                64px left of the title block. */}
            <div
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-case-accent md:h-16 md:w-16"
            >
              <span className="font-mono text-lg font-bold tracking-[0.1em] text-white">
                SOS
              </span>
            </div>
            <div className="flex-1">
              <CaseHeader study={study} />
            </div>
          </div>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full bg-case-accent"
              />
              STATUS / SYSTEM NOMINAL
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-muted md:inline">
              · V2.3.0-STABLE
            </span>
          </div>
          <div className="mt-8">
            {study.hero?.headlineMetrics?.map((m) => (
              <HeroMetric key={m.key} metric={m} />
            ))}
          </div>
          <HeroDiagram study={study} />
        </section>
      }
      sections={
        <>
          {/* 01 OVERVIEW: three design goals as ruled rows */}
          <Section
            key="01"
            section={study.sections[0]}
            layout={{ indexInline: true, titleClassName: "text-2xl md:text-3xl" }}
          />

          <Section key="02" section={study.sections[1]} />

          {/* 03 THE REPORTING FLOW: 4-step flow strip */}
          <Section key="03" section={study.sections[2]} />

          {/* 04 THE SOS CHANNEL: <2s annotation */}
          <Section key="04" section={study.sections[3]} />

          {/* 05 THE VERIFICATION SYSTEM: the centerpiece matrix */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">05</p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                The Verification System
              </h2>
              <p className="mt-6 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                {study.sections[4].body}
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                    FAILURE MODE / MITIGATION MATRIX
                  </p>
                  <div className="mt-3">
                    {(study.sections[4].matrix ?? []).map((row) => (
                      <div
                        key={row.label}
                        className="grid grid-cols-[auto_1fr] items-start gap-4 border-t border-hairline py-3"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-2 w-2 shrink-0 bg-case-accent"
                        />
                        <div className="flex flex-col gap-0.5 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-6">
                          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                            {row.label}
                          </span>
                          <span className="font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                            {row.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden w-40 shrink-0 flex-col gap-3 pt-8 md:flex">
                  <Chip label="CONFIRMED" variant="accent" />
                  <Chip label="REFUTED" variant="default" />
                  <Chip label="PENDING" variant="pending" />
                </div>
              </div>
              <div className="mt-8">
                {study.sections[4].diagrams?.map((slot) => (
                  <div key={slot.id} className="mt-6 first:mt-0">
                    <DiagramSlot slot={slot} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Section key="06" section={study.sections[5]} />
          <Section key="07" section={study.sections[6]} />
          <Section key="08" section={study.sections[7]} />

          {/* 09 LINKS: pending placeholders driven by links.live/github nulls */}
          <CaseLinksSection key="09" section={study.sections[8]} links={study.links} />
        </>
      }
    />
  );
}
