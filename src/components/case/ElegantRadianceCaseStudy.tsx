import CaseShell, { CaseHeader } from "./CaseShell";
import { Section, HeroMetric } from "./primitives";
import { elegantRadianceStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// 04 / Elegant Radiance Luxe: The Hybrid Cloud Commerce Engine (Luxury Rose)
// White hero with the production storefront screenshot, topology flow,
// atomic SQL reservation formulas, and webhook failure matrix.
// ---------------------------------------------------------------------------

export default function ElegantRadianceCaseStudy() {
  const study = elegantRadianceStudy;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="mt-10">
          <div className="flex flex-col-reverse gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <CaseHeader study={study} />
              <div className="mt-10 grid gap-8 sm:grid-cols-3 md:gap-6">
                {study.hero?.headlineMetrics?.map((m) => (
                  <HeroMetric key={m.key} metric={m} />
                ))}
              </div>
            </div>
            <figure className="w-full max-w-[560px] shrink-0 md:max-w-[46%]">
              <div className="overflow-hidden rounded-sm border border-card-border">
                <img
                  src="/projects/elegant-radiance-luxe.png"
                  alt="Elegant Radiance Luxe luxury e-commerce storefront"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                LIVE STOREFRONT / LUXURY BEAUTY COMMERCE
              </figcaption>
            </figure>
          </div>
        </section>
      }
      sections={
        <>
          {/* 01 THE HYBRID TOPOLOGY */}
          <Section
            key="01"
            section={study.sections[0]}
            layout={{ indexInline: true, titleClassName: "text-2xl md:text-3xl" }}
          />

          {/* 02 THE D1 DATA WORKER BOUNDARY */}
          <Section key="02" section={study.sections[1]} />

          {/* 03 ATOMIC STOCK RESERVATION & 30-MINUTE HOLD */}
          <Section key="03" section={study.sections[2]} />

          {/* 04 PAYSTACK VERIFICATION & PAYMENT STATE MACHINE */}
          <Section key="04" section={study.sections[3]} />

          {/* 05 TWO-TIER ASYNCHRONOUS MEDIA PIPELINE */}
          <Section key="05" section={study.sections[4]} />

          {/* 06 GUEST PRIVACY & STOREFRONT SECURITY */}
          <Section key="06" section={study.sections[5]} />

          {/* 07 RELIABILITY, RECONCILIATION & COST */}
          <Section key="07" section={study.sections[6]} />

          {/* 08 LINKS */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                08
              </p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                Links
              </h2>
              <p className="mt-6 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                {study.sections[7].body}
              </p>
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
                {study.links.live && (
                  <a
                    href={study.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-case-accent-deep link-underline after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
                  >
                    Live Storefront →
                  </a>
                )}
                <span className="inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-muted">
                  GitHub [CLIENT PRIVATE REPO]
                </span>
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
