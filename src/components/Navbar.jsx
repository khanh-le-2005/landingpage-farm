import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const scrollTo = (id) => {
    // If not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/#' + id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: t('nav.solution'), id: 'why' },
    { label: t('nav.technology'), id: 'tech' },
    { label: t('nav.interface'), id: 'ui' },
    { label: t('nav.contact'), id: 'footer' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-2100 px-6 py-3 flex items-center justify-between bg-(--bg-base)/95 backdrop-blur-xl border-b border-(--glass-border) transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-[38px] h-[38px] rounded-lg bg-linear-to-br from-green to-green-soft flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-[0_0_15px_rgba(0,230,118,0.3)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" /></svg>
          </div>
          <div className="flex flex-col">
            <div className="font-heading font-bold text-[0.95rem] text-(--text-primary) tracking-tight leading-tight">Farm Aquaponics</div>
            <div className="text-[0.65rem] text-(--text-muted) tracking-wider">KEZAD · Abu Dhabi · Smart IoT</div>
          </div>
        </div>

        <ul className="flex items-center gap-8 list-none max-[900px]:hidden">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }} 
                className="text-(--text-secondary) no-underline text-sm font-medium transition-colors hover:text-(--text-primary)"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            className="border border-(--glass-border) rounded-full px-2.5 py-1 text-[0.75rem] font-bold text-(--text-primary) transition-all duration-300 cursor-pointer hover:border-aqua hover:text-aqua"
            onClick={toggleLanguage}
          >
            {i18n.language === 'en' ? 'EN' : 'VI'}
          </button>

          {/* Theme Toggle Button */}
          <button
            className="bg-(--bg-card) border border-(--glass-border) rounded-full w-[38px] h-[38px] flex items-center justify-center text-lg text-(--text-primary) transition-all duration-300 cursor-pointer hover:bg-(--bg-card-hover)"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          <button 
            className="btn-ghost px-5 py-2.5 text-[0.82rem] min-h-0 max-[900px]:hidden"
            onClick={() => scrollTo('footer')}
          >
            {t('nav.contact')}
          </button>

          <button 
            className="btn-primary px-5.5 py-2.5 text-[0.82rem] min-h-0 max-[900px]:hidden"
            onClick={() => scrollTo('why')}
          >
            {t('nav.discover')} ↓
          </button>

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <Link 
                to="/admin" 
                className="text-sm font-medium text-green hover:text-green-soft transition-colors max-[900px]:hidden"
              >
                Admin
              </Link>
              <button 
                onClick={logout}
                className="btn-ghost px-4 py-2 text-[0.82rem] min-h-0 text-red-500 hover:text-red-400 max-[900px]:hidden"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              className="btn-ghost px-5 py-2.5 text-[0.82rem] min-h-0 border border-(--glass-border) ml-2 max-[900px]:hidden"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}

          {/* Hamburger Menu Icon */}
          <button
            className="hidden max-[900px]:block bg-transparent text-3xl text-(--text-primary) cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-2000 bg-(--bg-base) px-6 pt-24 pb-10 flex flex-col items-center gap-10 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <ul className="list-none flex flex-col items-center gap-6">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                    className="font-heading text-3xl font-bold text-(--text-primary) no-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 w-full max-w-[280px]">
              <button className="btn-primary w-full" onClick={() => scrollTo('why')}>{t('nav.discover')}</button>
              {user ? (
                <>
                  <button className="btn-ghost w-full text-green" onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}>Admin Panel</button>
                  <button className="btn-ghost w-full text-red-500" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
                </>
              ) : (
                <button className="btn-ghost w-full" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login Admin</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
