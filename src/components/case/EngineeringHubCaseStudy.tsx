import CaseShell, { CaseHeader } from "./CaseShell";
import { Section, Chip } from "./primitives";
import { engineeringHubStudy } from "../../data/caseStudies";

// ---------------------------------------------------------------------------
// Engineering Hub: The Study Workbook (Study Violet)
// White hero with a preview quiz card, workbook rhythm, the wrong-answer
// card motif, BKT formulas up front.
// ---------------------------------------------------------------------------

// Hero quiz preview: hairline card, mono question, four mono options,
// correct one in violet.
function QuizPreview() {
  return (
    <div className="mt-8 w-full max-w-[420px] border border-card-border md:mt-0 md:max-w-[340px] md:shrink-0">
      <div className="border-b border-hairline px-4 py-2">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          QUESTION 0142 / EEE 201
        </span>
      </div>
      <div className="px-4 py-4">
        <p className="font-mono text-[0.8125rem] leading-[1.6] text-ink">
          Which theorem reduces a linear circuit to a single voltage source
          and a single series resistance?
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <span className="font-mono text-[0.75rem] leading-[1.5] text-ink-soft">
            A. Norton's theorem
          </span>
          <span className="font-mono text-[0.75rem] leading-[1.5] text-case-accent-deep">
            B. Thevenin's theorem
          </span>
          <span className="font-mono text-[0.75rem] leading-[1.5] text-ink-soft">
            C. Superposition theorem
          </span>
          <span className="font-mono text-[0.75rem] leading-[1.5] text-ink-soft">
            D. Maximum power transfer theorem
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline pt-3">
          <Chip label="AGAIN" variant="default" />
          <Chip label="HARD" variant="default" />
          <Chip label="GOOD" variant="default" />
          <Chip label="EASY" variant="accent" />
        </div>
      </div>
    </div>
  );
}

const APP_SCREENS = [
  { src: "/projects/1.png", label: "01 / HOME DASHBOARD" },
  { src: "/projects/2.png", label: "02 / ADAPTIVE QUIZ" },
  { src: "/projects/3.png", label: "03 / QUESTION REVIEW" },
  { src: "/projects/4.png", label: "04 / STUDY WORKBOOK" },
  { src: "/projects/5.png", label: "05 / PERFORMANCE ANALYTICS" },
  { src: "/projects/6.png", label: "06 / COURSE SYLLABUS" },
  { src: "/projects/7.png", label: "07 / DISCUSSION HUB" },
  { src: "/projects/8.png", label: "08 / USER PROFILE" },
];

function AppScreensGallery() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
        {APP_SCREENS.map((screen) => (
          <div
            key={screen.src}
            className="group overflow-hidden rounded-sm border border-card-border bg-canvas/30 transition-all duration-300 hover:border-case-accent"
          >
            <div className="relative overflow-hidden">
              <img
                src={screen.src}
                alt={screen.label}
                loading="lazy"
                className="aspect-[9/19.5] w-full object-cover transition-transform duration-500 ease-ui group-hover:scale-[1.03]"
              />
            </div>
            <div className="border-t border-hairline px-3 py-2">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted transition-colors group-hover:text-case-accent-deep">
                {screen.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EngineeringHubCaseStudy() {
  const study = engineeringHubStudy;

  return (
    <CaseShell
      slug={study.slug}
      hero={
        <section className="mt-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <CaseHeader study={study} />
            </div>
            <QuizPreview />
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

          {/* 02 THE PROBLEM: why BKT over the rejected heuristic */}
          <Section key="02" section={study.sections[1]} />

          <Section key="03" section={study.sections[2]} />

          {/* 04 THE ADAPTIVE ENGINE: formula panel + wrong-answer card */}
          <Section key="04" section={study.sections[3]} />

          {/* Wrong-answer card motif (6.3): struck-through wrong answer,
              violet correct answer, review rating chips */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-card-border">
              <div className="border-b border-hairline px-4 py-2">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  WRONG-ANSWER CARD / RELEVANT REVIEW
                </span>
              </div>
              <div className="px-4 py-4">
                <p className="font-mono text-[0.8125rem] leading-[1.6] text-ink">
                  What does P(L) represent in Bayesian Knowledge Tracing?
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="font-mono text-[0.75rem] leading-[1.5] text-ink-soft line-through decoration-red-600/70">
                    The probability a student guesses correctly
                  </span>
                  <span className="font-mono text-[0.75rem] leading-[1.5] text-case-accent-deep">
                    The probability the skill is already learned
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline pt-3">
                  <Chip label="LEARNING" variant="accent" />
                  <Chip label="REVIEWING" variant="default" />
                </div>
              </div>
            </div>
          </div>

          {/* 05 Mobile Application Interface Gallery */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                05
              </p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                Production Mobile Interface
              </h2>
              <p className="mt-4 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                Production Flutter mobile client published on Google Play. Demonstrating live adaptive quiz execution, formula sheet integration, real-time BKT updates, syllabus navigation, and discussion streams.
              </p>
              <AppScreensGallery />
            </div>
          </section>

          <Section key="05-data" section={study.sections[4]} />
          <Section key="06-arch" section={study.sections[5]} />

          {/* 07 LESSONS */}
          <Section key="07" section={study.sections[6]} />

          {/* 08 LINKS */}
          <section>
            <div className="border-t border-hairline pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">08</p>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-[-0.01em] text-ink md:text-3xl">
                Links
              </h2>
              <p className="mt-6 max-w-[68ch] font-sans text-[1.0625rem] leading-[1.6] text-ink-soft">
                {study.sections[7].body}
              </p>
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
                {study.links.playstore && (
                  <a
                    href={study.links.playstore}
                    target="_blank"
                    rel="noreferrer"
                    className="relative inline-flex items-center gap-2 py-2 font-mono text-sm uppercase tracking-[0.14em] text-case-accent-deep link-underline after:absolute after:inset-x-0 after:-inset-y-[10px] after:content-['']"
                  >
                    Google Play Store →
                  </a>
                )}
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
