import React, { useState } from 'react';
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