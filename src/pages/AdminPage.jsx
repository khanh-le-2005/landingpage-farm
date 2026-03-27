import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/admin/Sidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import AssetManagement from '../components/admin/AssetManagement';
import AnalyticsDetail from '../components/admin/AnalyticsDetail';
import Settings from '../components/admin/Settings';

const AdminPage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  // DATA SYNCED FROM PDF "APPENDIX 2"
  const adminAssets = [
    { id: 1, src: '/anhHD/anh13.png', title: 'Biological System', category: 'Environment', date: '2024-03-23', size: '12 KB', type: 'system', desc: 'Structure of 3 temperature columns and 2 salinity columns linked in real-time: Well → Pre-process → Buffer Tank.' },
    { id: 2, src: '/anhHD/anh14.png', title: 'RAS Fish AI Analysis', category: 'Environment', date: '2024-03-23', size: '107 KB', type: 'system', desc: 'Maintains positive pressure (ΔP)=+15. Monitors internal vs. external environmental fluctuations.' },
    { id: 3, src: '/anhHD/anh15.png', title: 'Resource Governance', category: 'Analytics', date: '2024-03-20', size: '2.5 MB', type: 'ai', desc: 'AI-integrated growth management system: Comprehensive monitoring of density, velocity, and biological health.' },
  ];

  const categories = ['All'];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAssets = adminAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-(--bg-base) text-(--text-primary) overflow-hidden transition-colors duration-300">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden overflow-y-auto">
        <header className="h-16 md:h-20 bg-(--bg-base)/80 backdrop-blur-md border-b border-(--glass-border) px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0 transition-colors">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-(--text-primary) md:hidden hover:bg-(--bg-card-hover) rounded-lg transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isSidebarOpen ? (
                  <line x1="18" y1="6" x2="6" y2="18" />
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>

            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted) group-focus-within:text-green transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                  type="text"
                  placeholder={t('admin.assets.search_placeholder')}
                  className="w-full bg-(--bg-card) border border-(--glass-border) rounded-2xl py-2 pl-10 md:py-2.5 md:pl-12 pr-4 text-xs md:text-sm focus:outline-none focus:border-green/50 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 ml-4">
            <div className="flex items-center gap-2 md:gap-3 pl-4 md:pl-6 border-l border-(--glass-border)">
              <div className="text-right hidden sm:block">
                <p className="text-xs md:text-sm font-bold leading-none">{user?.email.split('@')[0].toUpperCase()}</p>
                <p className="text-[9px] md:text-[10px] text-green font-black uppercase tracking-widest mt-1">{t('admin.header.user_role')}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-green/10 flex items-center justify-center text-green font-bold text-base md:text-lg border border-green/20">
                {user?.email[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 pb-20">
          {activeTab === 'dashboard' && <DashboardOverview filteredAssets={filteredAssets} />}
          {activeTab === 'assets' && (
            <AssetManagement
              filteredAssets={filteredAssets}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
          )}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
