import Reveal from "./Reveal";
import { PROJECTS } from "../data/site";
import type { ProjectEntry } from "../data/site";

// Projects (3.5, revised 2026-10-31).
// No tags, no metric rows, no pipeline strips, no boxes. Each row is a number,
// a title, two or three sentences, one action, and a media plate. The leading
// edge never moves: the number rail holds the left column on every row.
// Copy is ASD-STE100: short sentences, active voice, facts in prose.

const DISPLAY_ORDER = [
  "vigil",
  "engineering-hub",
  "queen-brique",
  "elegant-radiance-luxe",
  "rag",
  "nuesa-website",
  "nuesa",
  "awun",
] as const;

const pad = (index: number) => String(index + 1).padStart(2, "0");

type SecondaryLink = { label: string; href: string };

function ProjectRow({ entry, index }: { entry: ProjectEntry; index: number }) {
  const isCaseStudy = entry.href.startsWith("/");
  const primaryLabel = isCaseStudy ? "Read the case study" : "Visit the live site";
  const mediaHref = entry.liveUrl ?? entry.href;

  const secondary: SecondaryLink[] = [];
  if (isCaseStudy && entry.liveUrl) secondary.push({ label: "Live site", href: entry.liveUrl });
  if (entry.playStoreUrl) secondary.push({ label: "Play Store", href: entry.playStoreUrl });
  if (entry.githubUrl) secondary.push({ label: "GitHub", href: entry.githubUrl });

  return (
    <article data-project={entry.id} className="project-row group">
      <div className="row-idx" aria-hidden="true">
        <p className="font-mono text-xs tracking-[0.16em] text-accent">{pad(index)}</p>
        <span className="mt-3 block h-11 w-px bg-accent/35" />
      </div>

      <Reveal className="row-text">
        <p className="font-mono text-xs tracking-[0.16em] text-accent md:hidden">
          {pad(index)}
        </p>
        <h3 className="mt-2 font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink md:mt-0">
          {entry.title}
        </h3>
        <p className="mt-4 max-w-[46ch] font-sans text-base leading-[1.6] text-ink-soft md:text-[1.0625rem]">
          {entry.line}
        </p>
      </Reveal>

      <Reveal variant="fade" className="row-actions flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={entry.href}
          target={isCaseStudy ? undefined : "_blank"}
          rel={isCaseStudy ? undefined : "noopener noreferrer"}
          aria-label={
            isCaseStudy ? `Read the ${entry.title} case study` : `Visit the ${entry.title} website`
          }
          className="group/more inline-flex min-h-11 items-center gap-3 text-ink"
        >
          <span className="text-[0.9375rem] font-medium underline-offset-4 group-hover/more:underline">
            {primaryLabel}
          </span>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white transition-transform duration-200 ease-ui group-hover/more:translate-x-1"
          >
            →
          </span>
        </a>

        {secondary.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {secondary.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${link.label} for ${entry.title}`}
                className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </Reveal>

      {entry.visual && (
        <Reveal variant="scale" className="row-media">
          <a
            href={mediaHref}
            target={isCaseStudy ? undefined : "_blank"}
            rel={isCaseStudy ? undefined : "noopener noreferrer"}
            aria-label={`Open ${entry.title}`}
            className="group/img block overflow-hidden bg-plate"
          >
            <img
              src={entry.visual.src}
              alt={entry.visual.alt}
              loading="lazy"
              className={`w-full transition-transform duration-500 ease-ui group-hover/img:scale-[1.02] ${
                entry.visual.contain
                  ? "aspect-[4/3] object-contain p-12 md:p-16"
                  : "aspect-[4/3] object-cover"
              }`}
            />
          </a>
        </Reveal>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal variant="fade">
          <div className="md:pl-[calc(3rem+2.5rem)]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              The Work
            </p>
            <h2 className="mt-4 max-w-[20ch] font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink md:max-w-none md:text-balance">
              Seven systems, built and deployed
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16">
          {DISPLAY_ORDER.map((id, index) => {
            const entry = PROJECTS.find((project) => project.id === id);
            if (!entry) return null;
            return <ProjectRow key={entry.id} entry={entry} index={index} />;
          })}
        </div>
      </div>

      <div className="mt-16 bg-accent-deep text-white md:mt-24">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
              More work
            </p>
            <h2 className="mt-4 max-w-[18ch] font-sans text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white text-balance">
              This page shows seven systems. The repository has more.
            </h2>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">
              Source code, experiments, and current work
            </p>
          </div>

          <a
            href="https://github.com/awun8191"
            target="_blank"
            rel="noopener noreferrer"
            className="group/repo inline-flex min-h-11 items-center gap-3 text-white"
          >
            <span className="text-[0.9375rem] font-medium underline-offset-4 group-hover/repo:underline">
              View all repositories
            </span>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-accent-deep transition-transform duration-200 ease-ui group-hover/repo:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
