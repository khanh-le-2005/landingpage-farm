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
          <div className="nav-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--green)'}}><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
          </div>
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
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
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
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
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
