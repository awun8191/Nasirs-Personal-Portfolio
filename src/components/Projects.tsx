import Reveal from "./Reveal";
import ExploreLink from "./ExploreLink";
import { PROJECTS, AWUN_FACTS, AWUN_FLOW } from "../data/site";
import type { ProjectEntry, Metric } from "../data/site";

// Icon mapping for tech stack tags
const TECH_ICONS: Record<string, string> = {
  REACT: "/logos/react.svg",
  PYTHON: "/logos/python.svg",
  FASTAPI: "/logos/fastapi.svg",
  FLUTTER: "/logos/flutter.svg",
  POSTGRESQL: "/logos/postgresql.svg",
  FIREBASE: "/logos/firebase.svg",
  DOCKER: "/logos/docker.svg",
  CLOUDFLARE: "/logos/cloudflare.svg",
  WORKERS: "/logos/cloudflare.svg",
  "CLOUD RUN": "/logos/google-cloud.svg",
  "GOOGLE CLOUD RUN": "/logos/google-cloud.svg",
  GCP: "/logos/google-cloud.svg",
  AWS: "/logos/aws.svg",
  AI: "/logos/ai.svg",
  GEMINI: "/logos/ai.svg",
  "GEMMA 3": "/logos/ai.svg",
  CHROMADB: "/logos/ai.svg",
  OPENCV: "/logos/ai.svg",
  "ACADEMIA API": "/logos/ai.svg",
  TAILWIND: "/logos/react.svg",
};

function TechPill({ label, light = false }: { label: string; light?: boolean }) {
  const icon = TECH_ICONS[label.toUpperCase()];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors duration-200 ${
        light
          ? "border-white/25 bg-white/10 text-white hover:border-white/40"
          : "border-hairline bg-surface text-ink-soft hover:border-ink/30"
      }`}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 object-contain"
          loading="lazy"
        />
      )}
      <span>{label}</span>
    </span>
  );
}

function MetricGroup({ metrics, light = false }: { metrics: Metric[]; light?: boolean }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono">
      {metrics.map((m, idx) => (
        <div key={m.label} className="inline-flex items-baseline gap-2">
          <span
            className={`text-sm md:text-[0.9375rem] font-bold tracking-tight ${
              light ? "text-white" : "text-ink"
            }`}
          >
            {m.value}
          </span>
          <span
            className={`text-[0.6875rem] uppercase tracking-[0.12em] ${
              light ? "text-white/70" : "text-muted"
            }`}
          >
            {m.label}
          </span>
          {idx < metrics.length - 1 && (
            <span className="ml-4 text-hairline" aria-hidden="true">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowStrip({ layers }: { layers: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
      {layers.map((layer, i) => (
        <span key={layer} className="contents">
          <span>{layer}</span>
          {i < layers.length - 1 && <span className="text-accent">→</span>}
        </span>
      ))}
    </div>
  );
}

// Clean unboxed alternating project showcase
function ShowcaseRow({
  entry,
  index,
  reversed,
}: {
  entry: ProjectEntry;
  index: number;
  reversed: boolean;
}) {
  const targetUrl = entry.liveUrl || entry.href;

  return (
    <Reveal>
      <article data-project={entry.id} className="group relative">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          {/* Info Column */}
          <div
            className={`flex flex-col ${
              reversed ? "md:col-span-6 lg:col-span-5 md:order-2" : "md:col-span-6 lg:col-span-6 md:order-1"
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")} / PROJECT
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {entry.year}
              </p>
            </div>

            <h3 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-4xl md:text-[2.5rem]">
              {entry.title}
            </h3>

            <p className="mt-4 font-sans text-base leading-[1.65] text-ink-soft md:text-[1.0625rem]">
              {entry.line}
            </p>

            {entry.id === "engineering-hub" && (
              <div className="mt-4">
                <FlowStrip
                  layers={["Flutter Client", "FastAPI API", "PostgreSQL", "Gemini"]}
                />
              </div>
            )}

            {entry.metrics && entry.metrics.length > 0 && (
              <div className="mt-6 border-t border-hairline pt-4">
                <MetricGroup metrics={entry.metrics} />
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <TechPill key={tag} label={tag} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 pt-2">
              {entry.playStoreUrl && (
                <a
                  href={entry.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link relative inline-flex items-center gap-1.5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-accent link-underline hover:text-accent-deep"
                >
                  Play Store
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-ui group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              )}
              {entry.liveUrl && (
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link relative inline-flex items-center gap-1.5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-accent link-underline hover:text-accent-deep"
                >
                  Live Site
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-ui group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              )}
              {entry.href && !entry.href.startsWith("http") && (
                <ExploreLink href={entry.href} label="Case Study" />
              )}
            </div>
          </div>

          {/* Visual Column */}
          <div
            className={`${
              reversed ? "md:col-span-6 lg:col-span-6 md:order-1" : "md:col-span-6 lg:col-span-6 md:order-2"
            }`}
          >
            {entry.visual ? (
              <a
                href={targetUrl}
                target={entry.liveUrl || entry.playStoreUrl ? "_blank" : undefined}
                rel={entry.liveUrl || entry.playStoreUrl ? "noreferrer" : undefined}
                className="group/img block overflow-hidden"
              >
                <img
                  src={entry.visual.src}
                  alt={entry.visual.alt}
                  loading="lazy"
                  className={`w-full transition-transform duration-500 ease-ui group-hover/img:scale-[1.02] ${
                    entry.id === "engineering-hub"
                      ? "aspect-[16/10] object-contain p-6 md:p-10"
                      : "aspect-[16/10] object-cover"
                  }`}
                />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// AWUN Capstone Section (Editorial Showcase)
function ChapterCard({ entry, index }: { entry: ProjectEntry; index: number }) {
  return (
    <Reveal>
      <article data-project={entry.id} className="group relative">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          <div className="flex flex-col md:col-span-6 lg:col-span-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")} / THE CAPSTONE
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {entry.year}
              </p>
            </div>

            <h3 className="mt-4 font-sans text-3xl font-bold leading-tight tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-4xl md:text-[2.75rem]">
              {entry.title}
            </h3>

            <p className="mt-4 font-sans text-base leading-[1.65] text-ink-soft md:text-[1.0625rem]">
              {entry.line}
            </p>

            <div className="mt-6 hidden flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-muted md:flex">
              {AWUN_FLOW.map((node, i) => (
                <span key={node} className="contents">
                  <span>{node}</span>
                  {i < AWUN_FLOW.length - 1 && <span className="text-accent">→</span>}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-t border-hairline pt-4 sm:grid-cols-3">
              {AWUN_FACTS.map((fact) => (
                <div key={fact} className="flex flex-col">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink">
                    {fact}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <TechPill key={tag} label={tag} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 pt-2">
              {entry.liveUrl && (
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link relative inline-flex items-center gap-1.5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-accent link-underline hover:text-accent-deep"
                >
                  Live Platform
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-ui group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              )}
              <ExploreLink
                href={entry.href}
                label="Explore the Documentary"
              />
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-6">
            {entry.visual && (
              <a
                href={entry.liveUrl || entry.href}
                target={entry.liveUrl ? "_blank" : undefined}
                rel={entry.liveUrl ? "noreferrer" : undefined}
                className="group/cap block overflow-hidden"
              >
                <img
                  src={entry.visual.src}
                  alt={entry.visual.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-ui group-hover/cap:scale-[1.02]"
                />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const DISPLAY_ORDER = [
  "engineering-hub",
  "queen-brique",
  "elegant-radiance-luxe",
  "rag",
  "nuesa-website",
  "nuesa",
  "awun",
] as const;

export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(96px,12vw,160px)]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted md:col-span-3">
              03 / Projects
            </p>
            <div className="md:col-span-9">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                The Work
              </p>
              <h2 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
                Selected systems, built and deployed
              </h2>
            </div>
          </div>
        </Reveal>

        <div aria-hidden className="mt-10 border-t border-card-border md:mt-14" />

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-32 lg:gap-36">
          {DISPLAY_ORDER.map((id, i) => {
            const entry = PROJECTS.find((p) => p.id === id);
            if (!entry) return null;
            const isReversed = i % 2 !== 0;

            return (
              <div key={entry.id} className="relative">
                {entry.variant === "chapter" ? (
                  <ChapterCard entry={entry} index={i} />
                ) : (
                  <ShowcaseRow
                    entry={entry}
                    index={i}
                    reversed={isReversed}
                  />
                )}
                {i < DISPLAY_ORDER.length - 1 && (
                  <div
                    aria-hidden
                    className="mt-20 h-px w-full bg-hairline md:mt-32 lg:mt-36"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
