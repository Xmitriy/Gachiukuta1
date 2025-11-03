import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import StoryWorld from './components/StoryWorld';
import Characters from './components/Characters';
import Media from './components/Media';
import Studio from './components/Studio';
import Navigation from './components/Navigation';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navigation />
        <Hero scrollY={scrollY} />
        <StoryWorld scrollY={scrollY} />
        <Characters />
        <Media />
        <Studio />
      </div>
    </LanguageProvider>
  );
}

export default App;
