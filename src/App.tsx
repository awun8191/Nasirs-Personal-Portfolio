import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Workbench from "./components/Workbench";
import Projects from "./components/Projects";
import Closing from "./components/Closing";

function Hairline() {
  return <div aria-hidden className="h-px w-full bg-hairline" />;
}

// The Swiss homepage (6.1). Hero -> About -> Workbench -> Projects -> Closing.
// AWUN chapter band is the final entry inside the Projects section.
export default function App() {
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
