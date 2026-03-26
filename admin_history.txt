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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // DATA SYNCED FROM PDF "PHỤ LỤC 2"
  const adminAssets = [
    { id: 1, src: '/img/pump.png', title: 'Water Flow Matrix', category: 'Environment', date: '2024-03-23', size: '12 KB', type: 'system', desc: 'Cấu trúc 3 cột nhiệt độ và 2 cột độ mặn liên kết theo thời gian thực: Well → Pre-process → Buffer Tank.' },
    { id: 2, src: '/img/Screenshot 2026-03-22 130631.png', title: 'Climate & Pressure Hub', category: 'Environment', date: '2024-03-23', size: '107 KB', type: 'system', desc: 'Duy trì áp suất dương (ΔP)=+15. Theo dõi biến động môi trường nội bộ vs ngoại vi.' },
    { id: 3, src: '/img/Screenshot 2026-03-22 130613.png', title: 'Growth Hub (AI Analytics)', category: 'Analytics', date: '2024-03-20', size: '2.5 MB', type: 'ai', desc: 'Hệ thống quản lý tăng trưởng tích hợp AI: Giám sát mật độ, vận tốc bơi và sức khỏe sinh học toàn diện.' },
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
        <header className="h-20 bg-(--bg-base)/80 backdrop-blur-md border-b border-(--glass-border) px-8 flex items-center justify-between sticky top-0 z-40 shrink-0 transition-colors">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted) group-focus-within:text-green transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input 
                type="text" 
                placeholder={t('admin.assets.search_placeholder')}
                className="w-full bg-(--bg-card) border border-(--glass-border) rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-green/50 transition-all font-mono"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 ml-6">
            <div className="flex items-center gap-3 pl-6 border-l border-(--glass-border)">
              <div className="text-right">
                <p className="text-sm font-bold leading-none">{user?.email.split('@')[0].toUpperCase()}</p>
                <p className="text-[10px] text-green font-black uppercase tracking-widest mt-1">{t('admin.header.user_role')}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center text-green font-bold text-lg border border-green/20">
                {user?.email[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 pb-20">
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
          {activeTab === 'analytics' && <AnalyticsDetail />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
