import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-sage-50 dark:bg-dark text-dark dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default App;