import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: t('admin.sidebar.overview'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { id: 'analytics', label: t('admin.sidebar.ai_analysis'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4"/></svg> },
    { id: 'assets', label: t('admin.sidebar.assets'), icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg> },
    // { id: 'settings', label: t('admin.sidebar.settings'), icon: (
    //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //     <circle cx="12" cy="12" r="3"/>
    //     <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    //   </svg>
    // ) },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : (window.innerWidth < 768 ? 280 : 80),
          x: isSidebarOpen ? 0 : (window.innerWidth < 768 ? -280 : 0)
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed md:relative h-full bg-(--bg-card) border-r border-(--glass-border) flex flex-col z-[60] overflow-hidden"
      >
      <div className="p-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-linear-to-br from-green to-green-soft rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" /></svg>
        </div>
        <AnimatePresence>
          {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg whitespace-nowrap text-(--text-primary)"
              >
                Farm Admin
              </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
              ? 'bg-linear-to-r from-green to-green-soft text-white shadow-lg' 
              : 'text-(--text-secondary) hover:bg-(--bg-card-hover) hover:text-(--text-primary)'
            }`}
          >
            <span className="shrink-0">{item.icon}</span>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-(--glass-border)">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center gap-4 px-4 py-3 text-(--text-secondary) hover:bg-(--bg-card-hover) rounded-xl transition-all"
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
          {isSidebarOpen && <span className="font-medium">{t('admin.sidebar.theme')}</span>}
        </button>

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="w-full flex items-center gap-4 px-4 py-3 text-(--text-secondary) hover:bg-(--bg-card-hover) rounded-xl transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          {isSidebarOpen && <span className="font-medium uppercase">{i18n.language}</span>}
        </button>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          {isSidebarOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>

      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute -right-3 top-20 w-10 h-10 bg-linear-to-b from-green to-green-soft flex items-center justify-center rounded-full text-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}
        >
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
    </motion.aside>
  </>
);
};

export default Sidebar;
