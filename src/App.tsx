import { lazy, Suspense, useEffect } from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Workbench from "./components/Workbench";
import Projects from "./components/Projects";
import Closing from "./components/Closing";
import { useRoute } from "./router";

// Case study routes load on demand. They carry most of the JS, and nobody
// needs them to paint the homepage hero.
const SoilingCaseStudy = lazy(() => import("./components/case/SoilingCaseStudy"));
const VigilCaseStudy = lazy(() => import("./components/case/VigilCaseStudy"));
const TraksCaseStudy = lazy(() => import("./components/case/TraksCaseStudy"));
const EngineeringHubCaseStudy = lazy(() => import("./components/case/EngineeringHubCaseStudy"));
const ElegantRadianceCaseStudy = lazy(() => import("./components/case/ElegantRadianceCaseStudy"));
const RagCaseStudy = lazy(() => import("./components/case/RagCaseStudy"));
const NuesaCaseStudy = lazy(() => import("./components/case/NuesaCaseStudy"));
const AwunCaseStudy = lazy(() => import("./components/case/AwunCaseStudy"));

function Hairline() {
  return <div aria-hidden className="h-px w-full bg-hairline" />;
}

// The Swiss homepage (6.1). Hero -> About -> Projects -> Workbench -> Closing.
// Projects is the work and holds the peak. The ink Workbench band is a coda
// after the work, not a second anchor before it. AWUN is the final entry
// inside the Projects section.
function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink focus:bg-canvas focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Hairline />
        <About />
        <Projects />
        {/* Workbench is the black band: it carries its own white/10 top and
            bottom hairlines, so no App-level Hairline sits around it. */}
        <Workbench />
        <Closing />
      </main>
    </>
  );
}

// Route table (CASE-STUDY-SYSTEM.md section 8). The homepage EXPLORE
// PROJECT links already point at these paths; the router intercepts them.
const CASE_ROUTES: Record<string, LazyExoticComponent<ComponentType>> = {
  "/projects/vigil": VigilCaseStudy,
  "/projects/soiling-detection": SoilingCaseStudy,
  "/projects/traks": TraksCaseStudy,
  "/projects/engineering-hub": EngineeringHubCaseStudy,
  "/projects/elegant-radiance-luxe": ElegantRadianceCaseStudy,
  "/projects/rag-data-pipeline": RagCaseStudy,
  "/projects/nuesa-academia": NuesaCaseStudy,
  "/projects/awun": AwunCaseStudy,
};

export default function App() {
  const path = useRoute();
  const CasePage = CASE_ROUTES[path];

  // Scroll restoration (spec 8): every route change scrolls to top.
  // Hash navigation (/#projects etc.) is handled natively by the browser
  // once the home sections exist, so only scroll when the pathname itself
  // changes (client-side case route navigation).
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [path]);

  if (CasePage) {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Loading
            </p>
          </div>
        }
      >
        <CasePage />
      </Suspense>
    );
  }
  return <HomePage />;
}
