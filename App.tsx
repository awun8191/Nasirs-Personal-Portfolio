import { useState, useEffect } from 'react';
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

function App() {
  const [view, setView] = useState('portfolio');

  useEffect(() => {
    switch (view) {
      case 'portfolio':
        document.title = "Dauda Nasir | Python & Flutter Developer";
        break;
      case 'case-study-hub':
        document.title = "Engineering Hub Case Study | Dauda Nasir";
        break;
      case 'hub-docs':
        document.title = "Engineering Hub Documentation | Dauda Nasir";
        break;
      case 'rag-docs':
        document.title = "RAG Data Pipeline Documentation | Dauda Nasir";
        break;
      case 'nuesa-docs':
        document.title = "NUESA Academia | Dauda Nasir";
        break;
      case 'traks-docs':
        document.title = "TRAKS | Dauda Nasir";
        break;
      case 'awun-docs':
        document.title = "AWUN | Dauda Nasir";
        break;
      case 'soiling-docs':
        document.title = "AI Soiling Detection | Dauda Nasir";
        break;
      case 'rast-docs':
        document.title = "RAST ResearchDoi | Dauda Nasir";
        break;
      default:
        document.title = "Dauda Nasir | Python & Flutter Developer";
    }
  }, [view]);

  return (
    <div className="bg-white dark:bg-dark text-dark dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">
      {view === 'portfolio' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Portfolio
              onViewCaseStudy={(id) => {
                if (id === 1) setView('case-study-hub');
                if (id === 2) setView('nuesa-docs');
                if (id === 3) setView('rag-docs');
                if (id === 4) setView('traks-docs');
                if (id === 5) setView('awun-docs');
                if (id === 6) setView('soiling-docs');
                if (id === 7) setView('rast-docs');
              }}
            />
            <Contact />
          </main>
        </>
      )}
      {view === 'case-study-hub' && (
        <EngineeringHubCaseStudy
          onBack={() => setView('portfolio')}
          onViewDocs={() => setView('hub-docs')}
        />
      )}
      {view === 'hub-docs' && (
        <EngineeringHubDocs
          onBack={() => setView('case-study-hub')}
        />
      )}
      {view === 'rag-docs' && (
        <RagPipelineDocs
          onBack={() => setView('portfolio')}
        />
      )}
      {view === 'nuesa-docs' && (
        <NuesaAcademiaDocs
          onBack={() => setView('portfolio')}
        />
      )}
      {view === 'traks-docs' && (
        <TraksDocs
          onBack={() => setView('portfolio')}
        />
      )}
      {view === 'awun-docs' && (
        <AwunDocs
          onBack={() => setView('portfolio')}
        />
      )}
      {view === 'soiling-docs' && (
        <SoilingDetectionDocs
          onBack={() => setView('portfolio')}
        />
      )}
      {view === 'rast-docs' && (
        <RaStDocs
          onBack={() => setView('portfolio')}
        />
      )}
    </div>
  );
}

export default App;
