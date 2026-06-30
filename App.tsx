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
                if (id === 3) setView('rag-docs');
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
    </div>
  );
}

export default App;