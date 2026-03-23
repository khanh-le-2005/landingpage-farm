import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhySection from './components/WhySection';
import BentoGridSection from './components/BentoGridSection';
import UIShowcaseSection from './components/UIShowcaseSection';
import FooterSection from './components/FooterSection';
import HowItWorksSection from './components/HowItWorksSection';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-(--bg-base) text-(--text-primary)">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                <main>
                  <HeroSection />
                  <HowItWorksSection />
                  <WhySection theme={theme} />
                  <BentoGridSection theme={theme} />
                  <UIShowcaseSection theme={theme} />
                </main>
                <FooterSection theme={theme} />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
