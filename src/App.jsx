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

import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-(--bg-base) text-(--text-primary) transition-colors duration-300">
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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
