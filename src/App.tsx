import { useEffect } from "react";
import type { ComponentType } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Workbench from "./components/Workbench";
import Projects from "./components/Projects";
import Closing from "./components/Closing";
import SoilingCaseStudy from "./components/case/SoilingCaseStudy";
import TraksCaseStudy from "./components/case/TraksCaseStudy";
import EngineeringHubCaseStudy from "./components/case/EngineeringHubCaseStudy";
import RagCaseStudy from "./components/case/RagCaseStudy";
import NuesaCaseStudy from "./components/case/NuesaCaseStudy";
import AwunCaseStudy from "./components/case/AwunCaseStudy";
import { useRoute } from "./router";

function Hairline() {
  return <div aria-hidden className="h-px w-full bg-hairline" />;
}

// The Swiss homepage (6.1). Hero -> About -> Workbench -> Projects -> Closing.
// AWUN chapter band is the final entry inside the Projects section.
function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Hairline />
        <About />
        {/* Workbench is the black band: it carries its own white/10 top and
            bottom hairlines, so no App-level Hairline sits around it. */}
        <Workbench />
        <Projects />
        <Hairline />
        <Closing />
      </main>
    </>
  );
}

// Route table (CASE-STUDY-SYSTEM.md section 8). The homepage EXPLORE
// PROJECT links already point at these paths; the router intercepts them.
const CASE_ROUTES: Record<string, ComponentType> = {
  "/projects/soiling-detection": SoilingCaseStudy,
  "/projects/traks": TraksCaseStudy,
  "/projects/engineering-hub": EngineeringHubCaseStudy,
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
    return <CasePage />;
  }
  return <HomePage />;
}
