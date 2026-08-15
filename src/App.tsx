import AmbientCursor from "./components/AmbientCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ledger from "./components/Ledger";
import Workbench from "./components/Workbench";
import Chronicle from "./components/Chronicle";
import Closing from "./components/Closing";

function Hairline() {
  return <div aria-hidden className="h-px w-full bg-hairline" />;
}

// The Chronicle homepage (6.1). Hero -> Ledger -> Workbench -> Chronicle -> Closing.
// AWUN chapter band is the final entry inside the Chronicle section.
export default function App() {
  return (
    <>
      <AmbientCursor />
      <div aria-hidden className="grain" />
      <Nav />
      <main>
        <Hero />
        <Hairline />
        <Ledger />
        <Hairline />
        <Workbench />
        <Hairline />
        <Chronicle />
        <Hairline />
        <Closing />
      </main>
    </>
  );
}
