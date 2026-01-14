
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Services from './components/Services';
import Community from './components/Community';
import GlobalChat from './components/GlobalChat';
import UsefulLinks from './components/UsefulLinks';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Services />
        <Community />
        <GlobalChat />
        <UsefulLinks />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating AI Assistant for workers */}
      <Assistant />
    </div>
  );
};

export default App;
