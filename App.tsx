import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import EngineeringHubCaseStudy from './components/EngineeringHubCaseStudy';
import EngineeringHubDocs from './components/EngineeringHubDocs';
import RagPipelineDocs from './components/RagPipelineDocs';
import NuesaAcademiaDocs from './components/NuesaAcademiaDocs';
import TraksDocs from './components/TraksDocs';
import AwunDocs from './components/AwunDocs';
import SoilingDetectionDocs from './components/SoilingDetectionDocs';
import RaStDocs from './components/RaStDocs';

const HASH_ROUTES: Record<string, string> = {
  'home': 'portfolio',
  'engineering-hub': 'case-study-hub',
  'hub-docs': 'hub-docs',
  'nuesa-academia': 'nuesa-docs',
  'rag-pipeline': 'rag-docs',
  'traks': 'traks-docs',
  'awun': 'awun-docs',
  'soiling-detection': 'soiling-docs',
  'rast': 'rast-docs',
};

const VIEW_TITLES: Record<string, string> = {
  portfolio: "Dauda Nasir | Python & Flutter Developer",
  'case-study-hub': "Engineering Hub Case Study | Dauda Nasir",
  'hub-docs': "Engineering Hub Documentation | Dauda Nasir",
  'rag-docs': "RAG Data Pipeline Documentation | Dauda Nasir",
  'nuesa-docs': "NUESA Academia | Dauda Nasir",
  'traks-docs': "TRAKS | Dauda Nasir",
  'awun-docs': "AWUN | Dauda Nasir",
  'soiling-docs': "AI Soiling Detection | Dauda Nasir",
  'rast-docs': "RAST ResearchDoi | Dauda Nasir",
};

function viewToHash(view: string): string {
  for (const [hash, v] of Object.entries(HASH_ROUTES)) {
    if (v === view) return hash;
  }
  return 'home';
}

function App() {
  const [view, setView] = useState('portfolio');
  const isInternalNav = useRef(false);

  // Read hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    const mappedView = HASH_ROUTES[hash] || 'portfolio';
    setView(mappedView);
  }, []);

  // Listen for hash changes (back/forward buttons)
  useEffect(() => {
    const onHashChange = () => {
      if (isInternalNav.current) {
        isInternalNav.current = false;
        return;
      }
      const hash = window.location.hash.replace('#', '') || 'home';
      const mappedView = HASH_ROUTES[hash] || 'portfolio';
      setView(mappedView);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Update hash when view changes (user clicks a button)
  const navigate = (newView: string) => {
    setView(newView);
    const hash = viewToHash(newView);
    if (hash !== window.location.hash.replace('#', '')) {
      isInternalNav.current = true;
      window.location.hash = hash;
    }
  };

  // Update document title
  useEffect(() => {
    document.title = VIEW_TITLES[view] || "Dauda Nasir | Python & Flutter Developer";
  }, [view]);

  return (
    <div className="bg-white dark:bg-dark text-dark dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">
      {view === 'portfolio' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Portfolio
              onViewCaseStudy={(id) => {
                if (id === 1) navigate('case-study-hub');
                if (id === 2) navigate('nuesa-docs');
                if (id === 3) navigate('rag-docs');
                if (id === 4) navigate('traks-docs');
                if (id === 5) navigate('awun-docs');
                if (id === 6) navigate('soiling-docs');
                if (id === 7) navigate('rast-docs');
              }}
            />
            <About />
            <Skills />
            <Contact />
          </main>
        </>
      )}
      {view === 'case-study-hub' && (
        <EngineeringHubCaseStudy
          onBack={() => navigate('portfolio')}
          onViewDocs={() => navigate('hub-docs')}
        />
      )}
      {view === 'hub-docs' && (
        <EngineeringHubDocs
          onBack={() => navigate('case-study-hub')}
        />
      )}
      {view === 'rag-docs' && (
        <RagPipelineDocs
          onBack={() => navigate('portfolio')}
        />
      )}
      {view === 'nuesa-docs' && (
        <NuesaAcademiaDocs
          onBack={() => navigate('portfolio')}
        />
      )}
      {view === 'traks-docs' && (
        <TraksDocs
          onBack={() => navigate('portfolio')}
        />
      )}
      {view === 'awun-docs' && (
        <AwunDocs
          onBack={() => navigate('portfolio')}
        />
      )}
      {view === 'soiling-docs' && (
        <SoilingDetectionDocs
          onBack={() => navigate('portfolio')}
        />
      )}
      {view === 'rast-docs' && (
        <RaStDocs
          onBack={() => navigate('portfolio')}
        />
      )}
    </div>
  );
}

export default App;
