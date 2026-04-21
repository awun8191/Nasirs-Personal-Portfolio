import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import EngineeringHubCaseStudy from './components/EngineeringHubCaseStudy';
import EngineeringHubDocs from './components/EngineeringHubDocs';
import RagPipelineDocs from './components/RagPipelineDocs';

function App() {
  const resolveHashToView = useCallback((rawHash: string) => {
    const hash = rawHash.replace(/^#/, '');
    switch (hash) {
      case '/case-study/hub':
        return 'case-study-hub';
      case '/case-study/hub/docs':
        return 'hub-docs';
      case '/case-study/rag':
        return 'rag-docs';
      default:
        return 'portfolio';
    }
  }, []);
  
  const [view, setView] = useState(() => {
    if (typeof window === 'undefined') return 'portfolio';
    return resolveHashToView(window.location.hash);
  });

  const getViewFromHash = useCallback(() => {
    return resolveHashToView(window.location.hash);
  }, [resolveHashToView]);

  useEffect(() => {
    const syncViewWithHash = () => {
      setView(getViewFromHash());
    };

    syncViewWithHash();
    window.addEventListener('hashchange', syncViewWithHash);
    return () => window.removeEventListener('hashchange', syncViewWithHash);
  }, [getViewFromHash]);

  const navigateTo = useCallback((nextView: string) => {
    const routeByView: Record<string, string> = {
      portfolio: '#/',
      'case-study-hub': '#/case-study/hub',
      'hub-docs': '#/case-study/hub/docs',
      'rag-docs': '#/case-study/rag'
    };

    const nextHash = routeByView[nextView] ?? '#/';
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
      return;
    }
    setView(nextView);
  }, []);

  return (
    <div className="relative bg-white dark:bg-dark text-dark dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-500/20" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/20" />
      </div>
      {view === 'portfolio' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Portfolio
              onViewCaseStudy={(id) => {
                if (id === 1) navigateTo('case-study-hub');
                if (id === 3) navigateTo('rag-docs');
              }}
            />
            <Contact />
          </main>
        </>
      )}
      {view === 'case-study-hub' && (
        <EngineeringHubCaseStudy
          onBack={() => navigateTo('portfolio')}
          onViewDocs={() => navigateTo('hub-docs')}
        />
      )}
      {view === 'hub-docs' && (
        <EngineeringHubDocs
          onBack={() => navigateTo('case-study-hub')}
        />
      )}
      {view === 'rag-docs' && (
        <RagPipelineDocs
          onBack={() => navigateTo('portfolio')}
        />
      )}
    </div>
  );
}

export default App;
