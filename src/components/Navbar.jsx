import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Giải pháp', id: 'why' },
    { label: 'Công nghệ', id: 'tech' },
    { label: 'Giao diện', id: 'ui' },
    { label: 'Liên hệ', id: 'footer' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">🌾</div>
          <div className="nav-text">
            <div className="nav-name">Farm Aquaponics</div>
            <div className="nav-sub">KEZAD · Abu Dhabi · Smart IoT</div>
          </div>
        </div>

        <ul className="nav-links">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          {/* Theme Toggle Button */}
          <button 
            className="btn-theme-toggle"
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              transition: 'all 0.3s'
            }}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

          <button className="btn-ghost d-mobile-none" style={{ padding: '10px 20px', fontSize: '0.82rem' }}
            onClick={() => scrollTo('footer')}>
            Liên hệ
          </button>
          
          <button className="btn-primary d-mobile-none" style={{ padding: '10px 22px', fontSize: '0.82rem' }}
            onClick={() => scrollTo('why')}>
            Khám phá ↓
          </button>

          {/* Hamburger Menu Icon */}
          <button 
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none', // Shown via media query in App.css / custom style
              background: 'transparent',
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <ul className="mobile-links">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 280 }}>
              <button className="btn-primary" onClick={() => scrollTo('why')}>Khám phá ngay</button>
              <button className="btn-ghost" onClick={() => scrollTo('footer')}>Liên hệ tư vấn</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .hamburger-btn { display: block !important; }
          .d-mobile-none { display: none !important; }
        }
      `}</style>
    </>
  );
}
