import CaseShell, { HeroDiagram } from "./CaseShell";
import { Section, HeroMetric, PendingChip } from "./primitives";
import { soilingStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// Soiling Detection System: The Instrument Panel (Solar Amber)
// Mono-forward. Ink hero with giant amber headline numbers, dashed
// signal-trace hairlines under section indexes, hardware gallery.
// ---------------------------------------------------------------------------

const GALLERY = [
  {
    src: "/projects/soiling-schematic.jpg",
    alt: "Circuit schematic of the soiling detection prototype",
    caption: "CIRCUIT SCHEMATIC",
  },
  {
    src: "/projects/soiling-breadboard.jpg",
    alt: "Breadboard view of the sensor and control electronics",
    caption: "BREADBOARD VIEW",
  },
  {
    src: "/projects/soiling-prototype.jpg",
    alt: "Assembled prototype on the acrylic chassis with cleaning carriage",
    caption: "PROTOTYPE",
  },
];

export default function SoilingCaseStudy() {
  const study = soilingStudy;
  const paper = study.links.paper;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="case-ink-hero mt-10 -mx-6 px-6 py-[clamp(56px,8vw,88px)] md:-mx-10 md:px-10">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[clamp(0.875rem,2vw,1.125rem)] uppercase tracking-[0.18em] text-case-accent">
              {study.kicker}
            </p>
            <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
              {study.title}
            </h1>
            <p className="case-hero-meta font-mono text-sm uppercase tracking-[0.14em]">
              {study.meta}
            </p>
            <p className="case-hero-desc max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6]">
              {study.description}
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-6">
            {study.hero?.headlineMetrics?.map((m) => (
              <HeroMetric key={m.key} metric={m} light />
            ))}
          </div>
          <HeroDiagram study={study} />
        </section>
      }
      sections={
        <>
          {study.sections.slice(0, 5).map((section) => (
            <Section key={section.index} section={section} layout={{ trace: true }} />
          ))}

          {/* 06 THE LIMITS: instrument-panel honest margins */}
          <Section key="06" section={study.sections[5]} layout={{ trace: true }} />

          {/* 07 THE PAPER + hardware gallery */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">07</p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                The Paper
              </h2>
              <div aria-hidden className="case-signal-trace mt-5 w-full" />
              <p className="mt-6 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                {study.sections[6].body}
              </p>
              <div className="mt-8">
                {paper ? (
                  <a
                    href={paper}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] text-case-accent-deep link-underline after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
                  >
                    Read the Paper →
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    [URL PENDING]
                    <PendingChip />
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Hardware gallery: real repo photos, hairline framed */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">GALLERY</p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                The Build
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {GALLERY.map((img) => (
                  <figure key={img.src}>
                    <div className="overflow-hidden rounded-sm border border-card-border">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
