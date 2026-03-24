import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Import Zones
import Zone0_Environment from '../../zones/Zone0_Environment';
import Zone1_VisualHealth from '../../zones/Zone1_VisualHealth';
import Zone2_LifeSupport from '../../zones/Zone2_LifeSupport';
import Zone3_Resources from '../../zones/Zone3_Resources';
import { Card, CardHeader, VisualGauge, Thermometer, IndicatorIcon, ProgressBar, BigValue } from './DashboardUI';


const AssetManagement = ({ filteredAssets, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  const { t } = useTranslation();
  const [selectedAsset, setSelectedAsset] = useState(null);

  const categoryLabels = {
    'All': t('admin.assets.total'),
    'Environment': t('admin.assets.infra'),
    'Analytics': t('admin.assets.aquatic')
  };

  return (
    <div className="min-h-full">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-(--text-primary) uppercase tracking-tighter">{t('admin.assets.title')}</h2>
            <div className="flex gap-2">
              <span className="text-[9px] font-black uppercase text-green bg-green/10 px-3 py-1 rounded-lg border border-green/20">Abu Dhabi</span>
              <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">1,500 m²</span>
            </div>
          </div>
          <p className="text-(--text-secondary) mt-1 font-medium italic opacity-70">Project technical inventory & system telemetry.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-(--bg-card) border border-(--glass-border) px-6 py-3 rounded-2xl text-xs font-black hover:bg-(--bg-card-hover) transition-all text-(--text-muted) tracking-widest cursor-pointer">EXPORT DATA</button>
          <button className="btn-primary flex items-center gap-2 px-8 py-3 bg-green text-white rounded-2xl font-black shadow-lg shadow-green/20 hover:scale-105 transition-all tracking-widest cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
            {t('admin.assets.add_new')}
          </button>
        </div>
      </div>

      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all cursor-pointer uppercase ${selectedCategory === cat ? 'bg-green text-white shadow-xl shadow-green/20' : 'bg-(--bg-card) text-(--text-muted) border border-(--glass-border) hover:text-(--text-primary)'}`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder={t('admin.assets.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-(--bg-card) border border-(--glass-border) rounded-2xl py-4 pl-14 pr-6 text-xs font-bold text-(--text-primary) focus:outline-none focus:border-green/50 transition-all shadow-inner uppercase tracking-widest placeholder:text-(--text-muted)/50"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-(--text-muted) group-focus-within:text-green transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredAssets.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedAsset(item)}
            className="group relative bg-(--bg-card) rounded-[3rem] overflow-hidden border border-(--glass-border) hover:border-green/50 transition-all shadow-sm hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] flex flex-col cursor-pointer"
          >
            <div className="aspect-4/3 overflow-hidden relative bg-black/40">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-green uppercase tracking-[0.2em]">{item.category}</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green/20" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-(--text-primary) group-hover:text-green transition-colors line-clamp-1 mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-[11px] text-(--text-muted) leading-relaxed line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity italic flex-1">
                  {item.desc}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-(--dashboard-stroke) pt-6 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex flex-col">
                    <span className="text-(--text-muted)/30">Modified</span>
                    <span className="text-(--text-muted) mt-0.5">{item.date}</span>
                  </div>
                  <div className="px-3 py-1 bg-(--dashboard-bg-item) rounded-lg border border-(--dashboard-stroke) text-green">{item.size}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAsset && (
          <DashboardModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
// --- CORE MODAL DISPATCHER ---
const DashboardModal = ({ asset, onClose }) => {
  const { t } = useTranslation();
  const [liveData, setLiveData] = useState({
    cameraStatuses: [
      { id: 1, label: 'Ao cá Chẽm #1', status: 'normal' },
      { id: 2, label: 'Ao cá Chẽm #2', status: 'alert' },
      { id: 3, label: 'Ao cá Chẽm #3', status: 'normal' },
      { id: 4, label: 'Dải Rau #1', status: 'normal' },
      { id: 5, label: 'Dải Rau #2', status: 'alert' },
      { id: 6, label: 'Dải Rau #3', status: 'normal' },
    ],
    predictiveInsight: Array.from({ length: 10 }, (_, i) => ({ v: 0.7 + Math.random() * 0.2 })),
    plantMetrics: [
      { label: 'Leaf Hydration', val: 92, status: 'good' },
      { label: 'NDVI Score', val: 85, status: 'good' },
      { label: 'Stomatal Cond.', val: 12, status: 'alert' }
    ],
    biomassData: Array.from({ length: 7 }, (_, i) => ({ density: 10 + Math.random() * 5 })),
    energyData: [
       { label: '08:00', gen: 80, use: 70 },
       { label: '10:00', gen: 120, use: 90 },
       { label: '12:00', gen: 150, use: 110 },
       { label: '14:00', gen: 130, use: 100 },
       { label: '16:00', gen: 90, use: 80 }
    ],
    bufferTankPct: 75,
    energyDelta: 15,
    totalWeight: 3200,
    ph: 6.8,
    temp: 24.5,
    waterTempRAS: 24.5,
    do: 6.5,
    ammonia: 0.01,
    nitrate: 85,
    internalHumidity: 72,
    leafTemp: 28.2,
    salinitySoil: 18,
    // Zone 0 & Environment
    deltaPressure: 15.2,
    airTempGreenhouse: 28.5,
    humidity: 65,
    outerTemp: 42.5,
    outerHumidity: 15,
    flowRateMain: 450,
    flowRateBio: 420,
    flowRateGrow: 380,
    tempWell: 22,
    tempHDPE: 24,
    tempTarget: 25,
    salinityWell: 35,
    salinityTarget: 35,
    // Zone 3
    batterySoC: 82,
    tecTasks: [
       { name: 'Gieo hạt mùng tơi', amount: '2,000 hạt', completed: true },
       { name: 'Pha dinh dưỡng B', amount: '50L', completed: false }
    ],
    biomassData: Array.from({ length: 7 }, (_, i) => ({ density: 10 + Math.random() * 5 })),
    totalFeed: 125,
    fishWeight: 3200,
    fcrAlert: "Normal"
  });

  // Live Simulation: Update every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        predictiveInsight: [...prev.predictiveInsight.slice(1), { v: 0.7 + Math.random() * 0.2 }],
        bufferTankPct: Math.min(100, Math.max(0, prev.bufferTankPct + (Math.random() - 0.5) * 2)),
        temp: parseFloat((prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1)),
        waterTempRAS: parseFloat(((prev.waterTempRAS || prev.temp) + (Math.random() - 0.5) * 0.2).toFixed(1)),
        do: parseFloat(Math.min(8, Math.max(3, prev.do + (Math.random() - 0.5) * 0.3)).toFixed(1)),
        ph: parseFloat(Math.min(8, Math.max(5, prev.ph + (Math.random() - 0.5) * 0.1)).toFixed(1)),
        ammonia: parseFloat(Math.max(0.005, Math.min(0.1, prev.ammonia + (Math.random() - 0.5) * 0.005)).toFixed(3)),
        nitrate: parseFloat(Math.max(50, Math.min(150, prev.nitrate + (Math.random() - 0.5) * 5)).toFixed(1)),
        internalHumidity: parseFloat(Math.max(50, Math.min(95, prev.internalHumidity + (Math.random() - 0.5) * 2)).toFixed(0)),
        leafTemp: parseFloat(Math.max(20, Math.min(35, prev.leafTemp + (Math.random() - 0.5) * 0.5)).toFixed(1)),
        salinitySoil: parseFloat(Math.max(10, Math.min(30, prev.salinitySoil + (Math.random() - 0.5) * 0.5)).toFixed(0)),
        deltaPressure: parseFloat(Math.max(5, Math.min(25, prev.deltaPressure + (Math.random() - 0.5) * 1)).toFixed(1)),
        batterySoC: parseFloat(Math.max(0, Math.min(100, prev.batterySoC - 0.1)).toFixed(1)),
        fishWeight: parseFloat((prev.fishWeight + Math.random() * 0.5).toFixed(1))
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full h-[98vh] max-w-[1700px] bg-(--dashboard-bg-card) text-(--text-primary) flex flex-col font-mono rounded-[2.5rem] border border-(--dashboard-stroke) shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden"
      >
        {/* --- COMMON TOP BAR --- */}
        <div className="px-10 py-6 flex items-center justify-between shrink-0 relative bg-black/20">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-black italic text-(--text-primary) uppercase tracking-tighter">
              {asset.id === 1 ? 'BIOLOGICAL' : asset.id === 2 ? 'AI VISION' : 'RESOURCES'} <span className="text-yellow-400 animate-pulse">LIVE</span>
            </span>
            <div className="flex items-center gap-4">
               <h2 className="text-xl font-black uppercase tracking-[0.3em] text-(--text-primary)/90 hidden md:block">
                 {asset.id === 1 ? t('dashboard.zones.bio_sync') : asset.id === 2 ? t('dashboard.zones.ras_ai') : t('dashboard.zones.resource_sync')}
               </h2>
               <div className="flex gap-2">
                 <span className="text-[9px] font-black uppercase text-green bg-green/10 px-3 py-1 rounded-lg border border-green/20">Abu Dhabi</span>
                 <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">1,500 m²</span>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end opacity-60">
              <span className="text-xs font-bold uppercase tracking-widest">Desert High-Contrast</span>
              <span className="text-[8px] font-black mt-1 uppercase tracking-widest">Update 5s sync enabled</span>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-(--dashboard-bg-item) border border-(--dashboard-stroke) flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* --- DASHBOARD BODY (Refactored to external components) --- */}
        <div className="flex-1 overflow-y-auto bg-(--dashboard-bg-deep)">
          {asset.id === 2 && <Zone1_VisualHealth data={liveData} />}
          {asset.id === 1 && <Zone2_LifeSupport data={liveData} />}
          {asset.id === 3 && <Zone3_Resources data={liveData} />}
          {asset.id === 0 && <Zone0_Environment data={liveData} />}
        </div>
      </motion.div>
    </div>
  );
};

export default AssetManagement;
