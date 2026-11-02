import CaseShell, { CaseHeader } from "./CaseShell";
import { Section, HeroMetric, CaseLinksSection } from "./primitives";
import { vigilStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// Vigil: The Quiet Machine (Graphite)
// White hero with the real web client screenshot, three counters, flow band
// for the run loop, ruled rows for the queue, memory, sandbox and limits.
// ---------------------------------------------------------------------------

export default function VigilCaseStudy() {
  const study = vigilStudy;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="mt-10">
          <div className="flex flex-col-reverse gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <CaseHeader study={study} />
              <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
                {study.hero?.headlineMetrics?.map((m) => (
                  <HeroMetric key={m.key} metric={m} />
                ))}
              </div>
            </div>
            <figure className="w-full max-w-[560px] shrink-0 md:max-w-[46%]">
              <div className="overflow-hidden rounded-sm border border-card-border">
                <img
                  src="/projects/vigil.webp"
                  alt="Vigil web client showing the daily briefing with action cards and run limits"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                WEB CLIENT / DAILY BRIEFING
              </figcaption>
            </figure>
          </div>
        </section>
      }
      sections={
        <>
          <Section
            key="01"
            section={study.sections[0]}
            layout={{ indexInline: true, titleClassName: "text-2xl md:text-3xl" }}
          />

          <Section key="02" section={study.sections[1]} studySlug={study.slug} />
          <Section key="03" section={study.sections[2]} studySlug={study.slug} />
          <Section key="04" section={study.sections[3]} studySlug={study.slug} />
          <Section key="05" section={study.sections[4]} studySlug={study.slug} />
          <Section key="06" section={study.sections[5]} studySlug={study.slug} />
          <Section key="07" section={study.sections[6]} studySlug={study.slug} />
          <Section key="08" section={study.sections[7]} studySlug={study.slug} />

          <CaseLinksSection key="09" section={study.sections[8]} links={study.links} />
        </>
      }
    />
  );
}
