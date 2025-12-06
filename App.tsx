import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import BackgroundLights from './components/BackgroundLights';
import { useLocomotiveScroll } from './hooks/useLocomotiveScroll';

const App: React.FC = () => {
  useLocomotiveScroll();

  return (
    <div className="bg-dark-bg text-white min-h-screen selection:bg-neon selection:text-black relative">
      <CustomCursor />
      <BackgroundLights />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
};

export default App;