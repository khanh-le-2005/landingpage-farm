import { useState, useEffect } from 'react';
import './App.css';
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
    <div className={`app-wrapper ${theme}-theme`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HeroSection />
      <HowItWorksSection />
      <WhySection theme={theme} />
      <BentoGridSection theme={theme} />
      <UIShowcaseSection theme={theme} />
      <FooterSection theme={theme} />
    </div>
  );
}
