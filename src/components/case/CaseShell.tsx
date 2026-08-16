import Nav from "../Nav";
import Closing from "../Closing";
import Reveal from "../Reveal";
import { CASE_STUDIES } from "../../data/caseStudies";
import type { CaseStudy } from "../../data/caseStudies";
import { DiagramSlot } from "./primitives";

// ---------------------------------------------------------------------------
// Shared shell for all six case study pages (CASE-STUDY-SYSTEM.md section 1).
// Identical chrome on every page: nav, back link, header pattern, footer with
// Next Project row. Only the interior content area switches language.
// ---------------------------------------------------------------------------

// Back link (1.2): mono, uppercase, muted, accent on hover, 44px hit area.
function BackLink() {
  return (
    <a
      href="/#projects"
      className="relative inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.18em] text-muted link-underline hover:text-accent after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
    >
      ← Back to Projects
    </a>
  );
}

// Header pattern (1.3): kicker, title, meta, description.
export function CaseHeader({ study }: { study: CaseStudy }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-case-accent-deep">
        {study.kicker}
      </p>
      <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
        {study.title}
      </h1>
      <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted">
        {study.meta}
      </p>
      <p className="max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
        {study.description}
      </p>
    </div>
  );
}

// Ink-band variant of the header (Workbench pattern, 1.3).
export function CaseHeaderInk({ study }: { study: CaseStudy }) {
  return (
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
  );
}

// Next Project row (1.4): mono label left, next title + arrow right.
function NextProject({ next }: { next: CaseStudy }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-card-border pt-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Next Project
      </span>
      <a
        href={`/projects/${next.slug}`}
        className="group relative inline-flex items-baseline gap-2 py-2 font-sans text-xl font-bold tracking-[-0.01em] text-ink link-underline hover:text-case-accent-deep after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-[''] md:text-2xl"
      >
        {next.title}
        <span
          aria-hidden
          className="transition-transform duration-300 ease-ui group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
}

// The shell: accent wrapper -> Nav -> main -> Next Project -> Closing.
export default function CaseShell({
  slug,
  hero,
  sections,
}: {
  slug: string;
  hero: React.ReactNode;
  sections: React.ReactNode;
}) {
  const study = CASE_STUDIES[slug];
  const next = CASE_STUDIES[study.nextSlug];

  return (
    <div className={study.accentClass}>
      <Nav />
      <main className="pt-16">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <div className="pt-10">
            <BackLink />
          </div>
          {hero}
          <div className="mt-[clamp(64px,8vw,96px)] flex flex-col gap-[clamp(56px,8vw,88px)]">
            {sections}
          </div>
          <div className="mt-[clamp(72px,10vw,120px)]">
            <NextProject next={next} />
          </div>
        </div>
        <div className="mt-[clamp(64px,8vw,96px)]">
          <Closing />
        </div>
      </main>
    </div>
  );
}

// Hero architecture slot helper (diagram 01 lives in the hero band per spec).
export function HeroDiagram({ study }: { study: CaseStudy }) {
  const slot = study.hero?.heroDiagram;
  if (!slot) return null;
  return (
    <Reveal>
      <div className="mt-10">
        <DiagramSlot slot={slot} ink={study.hero?.field === "ink"} />
      </div>
    </Reveal>
  );
}
