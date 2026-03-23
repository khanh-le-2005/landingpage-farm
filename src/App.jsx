import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhySection from './components/WhySection';
import BentoGridSection from './components/BentoGridSection';
import UIShowcaseSection from './components/UIShowcaseSection';
import FooterSection from './components/FooterSection';
import HowItWorksSection from './components/HowItWorksSection';

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhySection theme={theme} />
        <BentoGridSection theme={theme} />
        <UIShowcaseSection theme={theme} />
      </main>
      <FooterSection theme={theme} />
    </div>
  );
}
