import CaseShell, { HeroDiagram } from "./CaseShell";
import { Section, HeroMetric, CaseLinksSection } from "./primitives";
import { ragStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// RAG Data Pipeline: The Pipeline Manifest (Electric Cyan)
// Ink hero with version stamp, giant white numbers, chevron flow bands.
// ---------------------------------------------------------------------------

export default function RagCaseStudy() {
  const study = ragStudy;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="case-ink-hero mt-10 -mx-6 px-6 py-[clamp(56px,8vw,88px)] md:-mx-10 md:px-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[clamp(1.1875rem,2vw,1.375rem)] font-bold uppercase tracking-[0.18em] text-case-accent">
                {study.kicker}
              </p>
              <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
                {study.title}
              </h1>
              <p className="case-hero-meta font-mono text-sm uppercase tracking-[0.14em]">
                {study.meta}
              </p>
            </div>
            {study.hero?.versionBadge && (
              <span className="hidden shrink-0 rounded-sm border border-case-accent/60 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/90 md:inline">
                {study.hero.versionBadge}
              </span>
            )}
          </div>
          <p className="case-hero-desc mt-6 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6]">
            {study.description}
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-6">
            {study.hero?.headlineMetrics?.map((m) => (
              <HeroMetric key={m.key} metric={m} light />
            ))}
          </div>
          {study.hero?.versionBadge && (
            <span className="mt-6 inline-block rounded-sm border border-case-accent/60 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/90 md:hidden">
              {study.hero.versionBadge}
            </span>
          )}
          <HeroDiagram study={study} />
        </section>
      }
      sections={
        <>
          <Section
            key="01"
            section={study.sections[0]}
            layout={{ indexInline: true, titleClassName: "text-2xl md:text-3xl" }}
          />

          <Section key="02" section={study.sections[1]} />

          {/* 03 PHASE A: chevron flow band */}
          <Section key="03" section={study.sections[2]} />

          {/* 04 PHASE B: chevron flow band */}
          <Section key="04" section={study.sections[3]} />

          <Section key="05" section={study.sections[4]} />

          {/* 06 THE DETERMINISM: = motif rows */}
          <Section key="06" section={study.sections[5]} />

          <Section key="07" section={study.sections[6]} />

          {/* 08 FAILURE MODES: matrix */}
          <Section key="08" section={study.sections[7]} />

          {/* 09 LINKS: pending placeholders driven by links.live/github nulls */}
          <CaseLinksSection key="09" section={study.sections[8]} links={study.links} />
        </>
      }
    />
  );
}
