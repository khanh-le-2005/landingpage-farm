import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AssetManagement = ({ filteredAssets, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  return (
    <div className="min-h-full">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">HD Asset Library</h2>
          <p className="text-(--text-secondary) mt-1 font-medium italic opacity-70">Project technical inventory & system telemetry.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-(--bg-card) border border-(--glass-border) px-6 py-3 rounded-2xl text-xs font-black hover:bg-white/5 transition-all text-white/60 tracking-widest cursor-pointer">EXPORT DATA</button>
          <button className="btn-primary flex items-center gap-2 px-8 py-3 bg-green text-white rounded-2xl font-black shadow-lg shadow-green/20 hover:scale-105 transition-all tracking-widest cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
            NEW SYSTEM
          </button>
        </div>
      </div>

      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all cursor-pointer uppercase ${selectedCategory === cat ? 'bg-green text-white shadow-xl shadow-green/20' : 'bg-(--bg-card) text-(--text-muted) border border-(--glass-border) hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="FILTER SYSTEMS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-(--bg-card) border border-(--glass-border) rounded-2xl py-4 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-green/50 transition-all shadow-inner uppercase tracking-widest placeholder:text-white/20"
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
                <h3 className="font-bold text-xl text-white group-hover:text-green transition-colors line-clamp-1 mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-[11px] text-(--text-muted) leading-relaxed line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity italic flex-1">
                  {item.desc}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex flex-col">
                    <span className="text-white/20">Modified</span>
                    <span className="text-white/60 mt-0.5">{item.date}</span>
                  </div>
                  <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-green">{item.size}</div>
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
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full h-[98vh] max-w-[1700px] bg-[#0d0d0d] text-white flex flex-col font-mono rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden"
      >
        {/* --- COMMON TOP BAR --- */}
        <div className="px-10 py-6 flex items-center justify-between shrink-0 relative bg-black/20">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-black italic text-white uppercase tracking-tighter">
              {asset.id === 1 ? 'BIOLOGICAL' : asset.id === 2 ? 'AI VISION' : 'RESOURCES'} <span className="text-yellow-400">SYNC</span>
            </span>
            <h1 className="text-xl font-black uppercase tracking-[0.3em] text-white/90 hidden md:block">
              {asset.id === 1 ? 'Biological System Grouping' : asset.id === 2 ? 'RAS AI Fish Tracking' : 'Power & Efficiency Monitor'}
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end opacity-60">
              <span className="text-xs font-bold uppercase tracking-widest">Desert High-Contrast</span>
              <span className="text-[8px] font-black mt-1">#ZONE-{asset.id} PROFILE-6500</span>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* --- CONDITIONAL DASHBOARD BODY --- */}
        <div className="flex-1 overflow-y-auto">
          {asset.id === 2 && <Zone1Dashboard />}
          {asset.id === 1 && <Zone2Dashboard />}
          {asset.id === 3 && <Zone3Dashboard />}
        </div>
      </motion.div>
    </div>
  );
};

// --- ZONE 1: AI FISH & THERMAL (dashboard-zone1.png) ---
const Zone1Dashboard = () => (
  <div className="p-8 grid grid-cols-12 gap-8 h-full">
    {/* Left: AI CAMERA GRID */}
    <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black uppercase tracking-[0.2em]">RAS AI FISH TRACKING</h2>
        <div className="flex gap-4 text-[10px] items-center font-black">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green animate-pulse" /> Normal</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Lethargy</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`aspect-4/3 bg-black/40 rounded-xl overflow-hidden relative border ${i === 1 || i === 4 ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/5'}`}>
            <div className="absolute top-2 left-3 text-[9px] font-bold text-white/40 uppercase tracking-widest">Live Camera</div>
            <div className="absolute top-6 left-3 text-[10px] font-black text-white/90">YOLOV11</div>
            <div className="w-full h-full flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1"><path d="M12 2v20m-10-10h20" /></svg>
            </div>
            {i === 4 && <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Clicked Diagnosis</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-auto">
        {['Average Velocity', 'Density', 'Trajectory'].map((t, i) => (
          <Card key={i} className="py-8">
            <CardHeader title={t} />
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-24 mb-2">
                <svg className="w-full h-full" viewBox="0 0 100 60">
                  <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" />
                  <motion.path
                    d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke={i === 2 ? '#f97316' : '#69bf64'} strokeWidth="6" strokeLinecap="round"
                    initial={{ strokeDasharray: "0 282" }} animate={{ strokeDasharray: `${[75, 45, 60][i] * 1.3} 282` }} transition={{ duration: 2 }}
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-4 text-center">
                  <span className="text-3xl font-black italic">{[0.82, 15, 15][i]}</span>
                  <span className="text-[10px] font-bold opacity-30 ml-2">{['m/s', 'fish/m3', 'm/s'][i]}</span>
                </div>
              </div>
              <span className="text-[9px] font-black text-white/20 uppercase">vs standard</span>
            </div>
          </Card>
        ))}
      </div>
    </div>

    {/* Right: THERMAL AI & ACTIONS */}
    <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black uppercase tracking-[0.2em]">THERMAL & MULTISPECTRAL AI</h2>
        <span className="text-amber-400 font-extrabold text-2xl">AI Score <span className="text-white">92%</span></span>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {[
          { l: 'Healthy', v: 92, c: 'bg-green' },
          { l: 'NDVI', v: 37, c: 'bg-green/60' },
          { l: 'Dead Spots', v: 17, c: 'bg-yellow-500' },
          { l: 'Yellow/Orange', v: 41, c: 'bg-orange-500' },
          { l: 'Issues', v: 13, c: 'bg-red-500' },
          { l: 'Dead Spots', v: 12, c: 'bg-red-700' },
          { l: 'Multicorry', v: 92, c: 'bg-red-900' }
        ].map((item, i) => (
          <div key={i} className="flex-1 bg-white/3 border border-white/5 rounded-2xl flex items-center overflow-hidden group">
            <div className="w-32 px-6 flex flex-col shrink-0">
              <span className="text-[10px] font-black text-white/40 uppercase">{item.l}</span>
              <span className="text-2xl font-black">{item.v}%</span>
            </div>
            <div className="flex-1 h-full bg-linear-to-r from-black/40 to-transparent relative px-4 flex items-center">
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(item.v * 1.5, 60)}%` }} className={`h-1.5 rounded-full ${item.c} shadow-[0_0_15px_rgba(34,197,94,0.3)]`} />
              <div className="ml-auto flex items-center gap-6 pr-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black italic">80%</span>
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none mt-1">Patch W/</span>
                </div>
                <button className="px-5 py-2.5 bg-green/10 border border-green/30 rounded-xl text-[10px] font-black text-green hover:bg-green hover:text-white transition-all whitespace-nowrap uppercase cursor-pointer">
                  Rửa vòi tưới
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#151515] rounded-4xl p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute top-2 right-4 text-white/20">×</div>
        <h4 className="text-[10px] font-black uppercase text-white/40 mb-4 tracking-widest pl-2">Instant Alerts</h4>
        <div className="space-y-4">
          {[
            { l: 'Nozzle Replacement', c: 'bg-yellow-500' },
            { l: 'Fan Adjustment', c: 'bg-green' },
            { l: 'Nutrient Supplement', c: 'bg-red-500' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white/2 rounded-xl border border-white/5">
              <div className={`w-3 h-3 rounded-full ${item.c}`} />
              <span className="text-xs font-bold text-white/80 uppercase">{item.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- ZONE 2: BIOLOGICAL SYSTEM (dashboard-zone2.png) ---
const Zone2Dashboard = () => (
  <div className="p-8 grid grid-cols-12 gap-8 h-full">
    {/* AQUATIC SYSTEM (Column spans 6/12) */}
    <div className="col-span-12 xl:col-span-6 flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black uppercase tracking-[0.2em]">AQUATIC SYSTEM</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 cursor-pointer">
          <span className="text-sm font-bold">50/50</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardHeader title="DO" /><VisualGauge value={6.5} unit="mg/L" type="circle" /></Card>
        <Card><CardHeader title="Air Pressure" /><VisualGauge value={101.3} unit="kPa" type="dial" /></Card>
        <Card><CardHeader title="Electric Ball Valve" /><div className="flex-1 flex flex-col items-center justify-center"><div className="w-full py-6 bg-green rounded-2xl flex items-center justify-center text-white font-black text-2xl tracking-widest">OPEN</div></div></Card>
        <Card><CardHeader title="Water Temp" /><div className="flex-1 flex items-center gap-6 px-4"><Thermometer value={26} /><BigValue val={26} unit="°C" /></div></Card>
        <Card><CardHeader title="Ammonia" /><ProgressBar val={45} display="0.5" unit="ppm" icon="drop" /></Card>
        <Card><CardHeader title="Nitrite" /><ProgressBar val={20} display="0.02" unit="ppm" icon="drop" /></Card>
        <Card><CardHeader title="Positive Pressure" /><VisualGauge value={50} unit="Dbar" type="dial" orange /></Card>
        <Card><CardHeader title="Delta T" /><div className="flex-1 flex flex-col items-center justify-center"><span className="text-5xl font-black text-green italic">△ 0.2</span><span className="text-xl font-black text-green/60 uppercase tracking-widest mt-2 italic">» 15 bar</span></div></Card>
        <Card><CardHeader title="Montica (μS)" /><div className="flex-1 pt-4 px-2"><svg className="w-full h-full" viewBox="0 0 100 80"><path d="M0 75 Q10 70 20 78 Q30 70 40 50 Q50 60 60 70 Q70 40 80 50 Q90 30 100 25" fill="none" stroke="#69bf64" strokeWidth="3" /></svg></div></Card>
      </div>
    </div>
    {/* TERRESTRIAL SYSTEM */}
    <div className="col-span-12 xl:col-span-6 flex flex-col gap-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black uppercase tracking-[0.2em]">TERRESTRIAL SYSTEM</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 cursor-pointer">
          <span className="text-sm font-bold">50/50</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardHeader title="Nitrate" /><div className="flex-1 flex items-end justify-center gap-3 px-4 pb-4">{[40, 80, 55, 100, 60].map((h, i) => <div key={i} style={{ height: `${h}%` }} className={`w-5 rounded-t-lg ${i % 2 ? 'bg-green' : 'bg-white/5'}`} />)}</div></Card>
        <Card><CardHeader title="EC" subTitle="mS/cm" /><VisualGauge value={2.5} unit="/cm" type="dial" small /></Card>
        <Card><CardHeader title="Drip Nozzle Pressure" /><div className="flex-1 flex items-center justify-center"><div className="relative w-28 h-28 flex items-center justify-center"><svg className="w-full h-full" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="4" /><circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="6" strokeDasharray="180 300" strokeLinecap="round" /></svg><span className="absolute text-2xl font-black italic">2.0</span></div></div></Card>
        <Card><CardHeader title="Substrate Humidity" /><div className="flex-1 flex items-center justify-center gap-4"><IndicatorIcon type="drop" /><span className="text-4xl font-black italic">60%</span></div></Card>
        <Card><CardHeader title="Internal Humidity" /><div className="flex-1 flex items-center justify-center gap-4"><IndicatorIcon type="target" /><span className="text-4xl font-black italic">70%</span></div></Card>
        <Card><CardHeader title="Leaf Temperature" /><div className="flex-1 flex items-center justify-center gap-6"><div className="h-16 w-6 bg-white/5 rounded-full relative p-1"><div className="absolute inset-x-1 bottom-1 h-1/2 bg-green rounded-full" /></div><span className="text-4xl font-black italic">25 <span className="text-xl opacity-40">°C</span></span></div></Card>
        <div className="flex flex-col gap-4">
          <div className="bg-white/3 border border-white/10 rounded-4xl p-5 h-36 flex flex-col justify-center gap-2">
            <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Salinity</span>
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 capitalize"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" /></svg></div><span className="text-3xl font-black italic">15 <span className="text-xs opacity-30">ppt</span></span></div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3 border border-green/20"><div className="w-2 h-2 rounded-full bg-green" /><span className="text-[9px] font-black uppercase tracking-widest">Medical Indicators</span></div>
        </div>
        <div className="col-span-2 bg-black/40 border border-white/5 rounded-[2.5rem] grid grid-cols-2 p-6 gap-6">
          <div className="flex flex-col gap-2">
            <svg className="w-full h-12" viewBox="0 0 100 40"><path d="M0 30 Q25 15 50 10 Q75 12 100 8" fill="none" stroke="#69bf64" strokeWidth="3" /></svg>
            <h4 className="text-[10px] font-black uppercase opacity-20 tracking-widest mt-4">Recommendations</h4>
            <p className="text-[8px] font-bold opacity-40 uppercase leading-none">DO AO 3 LOW: TRIGGER AIR-LIFT</p>
          </div>
          <div className="grid grid-cols-10 grid-rows-8 gap-px bg-white/5 p-px h-full">
            {[...Array(80)].map((_, i) => <div key={i} className={`w-full h-full ${i % 7 === 0 ? 'bg-green/40' : i % 11 === 0 ? 'bg-yellow-500/40' : 'bg-black/40'}`} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- ZONE 3: ENERGY & WATER (dashboard-zone3.png) ---
const Zone3Dashboard = () => (
  <div className="p-8 grid grid-cols-3 gap-8 h-full">
    {/* Column 1: NĂNG LƯỢNG */}
    <div className="col-span-1 flex flex-col gap-6">
      <Card className="flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-[0.2em]">NĂNG LƯỢNG</h2>
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">(Power Balance)</span>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex-1 flex items-end justify-around gap-2 px-4">
            {[
              { t: 90, c: 85 }, { t: 30, c: 25 }, { t: 55, c: 65 }, { t: 25, c: 20 }, { t: 20, c: 15 }
            ].map((pair, i) => (
              <div key={i} className="flex gap-1 h-full items-end flex-1 max-w-[40px]">
                <motion.div initial={{ height: 0 }} animate={{ height: `${pair.t}%` }} className="w-1/2 bg-blue-500 rounded-t-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <motion.div initial={{ height: 0 }} animate={{ height: `${pair.c}%` }} className="w-1/2 bg-red-500 rounded-t-sm shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-[9px] font-black uppercase px-2 mb-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm" /> Thu được</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm" /> Tiêu thụ</div>
            <div className="text-green italic">Delta (Δ): +15</div>
          </div>
        </div>
      </Card>
      <Card>
        <CardHeader title="Thanh trạng thái Pin" subTitle="(Battery SoC)" />
        <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden relative">
          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-linear-to-r from-green to-emerald-400" />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">85%</span>
        </div>
      </Card>
      <div className="bg-white/3 border border-red-500/20 rounded-[2.5rem] p-8 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500 font-black text-xl">!</div>
          <h4 className="text-[12px] font-black uppercase tracking-widest">Hệ cảnh báo thông minh</h4>
        </div>
        <p className="text-[10px] font-bold leading-relaxed text-white/60 uppercase">Hiệu suất Solar giảm &gt;15% so với cùng kỳ bức xạ hôm qua.</p>
        <div className="mt-2 text-[9px] font-black text-orange-400/80 leading-relaxed uppercase">
          Status Ticker: Hiệu suất giảm 18% do bụi cát - Tự động kích hoạt Robot vệ sinh Dry-Cleaning.
        </div>
      </div>
    </div>

    {/* Column 2: QUẢN TRỊ NƯỚC */}
    <div className="col-span-1 flex flex-col gap-6">
      <Card className="flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-[0.2em]">QUẢN TRỊ NƯỚC</h2>
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">(Water Governance)</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center pt-10">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black text-white/40 uppercase mb-2 block">Buffer Tank</span>
            <span className="text-5xl font-black italic tracking-tighter">3,000L</span>
          </div>
          <div className="relative w-72 h-44 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 60">
              <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#222" strokeWidth="12" strokeLinecap="round" />
              <motion.path
                d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"
                strokeDasharray="282" initial={{ strokeDashoffset: 282 }} animate={{ strokeDashoffset: 282 - (75 * 1.3) }} transition={{ duration: 2 }}
              />
            </svg>
            <span className="absolute bottom-4 text-4xl font-black italic">75%</span>
          </div>
        </div>
        <div className="px-8 flex flex-col gap-6 pb-10">
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase">Khả năng thu hồi (TEC Recovery):</span>
            <span className="text-xs font-bold text-white/40 mt-1 uppercase tracking-widest">Hôm nay (L/h) so với hôm qua (+5%)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase">Hiệu quả sourcing (Water Sourcing Ratio):</span>
            <span className="text-xs font-bold text-white/40 mt-1 uppercase tracking-widest">Thu hồi (65%) / Tiêu thụ (100%), RO sử dụng (35%)</span>
          </div>
        </div>
      </Card>
      <div className="bg-white/3 border border-white/5 rounded-[2.5rem] p-8">
        <h4 className="text-center text-[12px] font-black uppercase tracking-widest mb-6">TEC Task Manager</h4>
        <div className="space-y-4">
          {['Xịt rửa Drum Filter', 'Trung hòa dịch bùn'].map((task, i) => (
            <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase py-3 border-b border-white/5 last:border-0">
              <span>{task}</span>
              <span className="text-blue-400">[Đã hoàn thành - {i ? 300 : 500} lít]</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Column 3: DỰ BÁO SẢN LƯỢNG */}
    <div className="col-span-1 flex flex-col gap-6">
      <Card className="flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-[0.2em]">DỰ BÁO SẢN LƯỢNG</h2>
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">(Yield & FCR)</span>
        </div>
        <div className="flex-1 flex flex-col gap-4 px-6">
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-black uppercase tracking-widest">Biomass Monitor</span>
            <span className="text-[8px] font-bold opacity-30 text-white uppercase">Plant Density (m)</span>
          </div>
          <div className="flex-1 relative pt-10">
            <svg className="w-full h-full" viewBox="0 0 100 80">
              <path d="M0 60 L24 65 L48 60 L72 55 L100 20" fill="none" stroke="#2563eb" strokeWidth="4" />
              {[0, 24, 48, 72, 100].map((x, i) => <circle key={i} cx={x} cy={[60, 65, 60, 55, 20][i]} r="2" fill="white" />)}
            </svg>
          </div>
          <div className="flex justify-between text-[7px] font-black text-white/20 uppercase tracking-widest mb-4">
            <span>0</span><span>100</span><span>240</span><span>150</span><span>12100</span>
          </div>
          <div className="py-6 border-t border-white/5 text-[11px] font-black uppercase leading-relaxed text-white/60">
            Tổng thức ăn: 450 kg / Tổng lượng cá: 3,200 kg / Mật độ rau: 2.5 kg/m2
          </div>
          <div className="flex items-center gap-3 px-6 py-4 bg-green/10 border border-green/30 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-[12px] font-black text-green uppercase italic tracking-widest">Trạng thái ổn định</span>
          </div>
        </div>
      </Card>
      <div className="bg-red-500/10 border border-red-500/30 rounded-[2.5rem] p-8 flex flex-col gap-4">
        <h4 className="text-[12px] font-black uppercase tracking-widest flex items-center gap-3">
          <span className="text-red-500 text-xl font-black">!</span> FCR Alerts
        </h4>
        <p className="text-[10px] font-bold leading-relaxed opacity-80 uppercase">Cảnh báo [I]: Tam giác vàng xuất hiện khi FCR vọt lên (Cá ăn nhiều nhưng không tăng trọng cùng hoặc thức ăn bị lãng phí).</p>
        <div className="mt-2 text-[9px] font-black text-red-400 uppercase leading-relaxed italic">
          Phân tích AI: Cảnh báo; FCR bất thường tại ao số 3 - Kiểm tra sức khỏe cá hoặc điều chỉnh lượng thức ăn.
        </div>
      </div>
    </div>
  </div>
);

// --- SHARED UI COMPONENTS (ZONE-SPECIFIC HELPERS) ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white/3 border border-white/10 rounded-[2.5rem] p-6 flex flex-col relative overflow-hidden transition-all duration-500 hover:bg-white/6 hover:border-white/20 ${className}`}>
    <div className="absolute top-0 right-0 p-3 opacity-[0.2]">
      <div className="w-1.5 h-1.5 rounded-full bg-white mb-2" />
      <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 ml-3" />
    </div>
    {children}
  </div>
);

const CardHeader = ({ title, subTitle }) => (
  <div className="flex flex-col mb-4 relative z-10">
    <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white leading-none mb-1">{title}</h4>
    {subTitle && <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic">{subTitle}</span>}
  </div>
);

const VisualGauge = ({ value, unit, type, orange, small }) => {
  if (type === 'circle') return (
    <div className="flex-1 flex flex-col items-center justify-center scale-90">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="8" strokeLinecap="round" />
          <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#69bf64" strokeWidth="10" strokeLinecap="round" strokeDasharray="282" initial={{ strokeDashoffset: 282 }} animate={{ strokeDashoffset: 282 - (75 * 2.82) }} transition={{ duration: 2 }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black italic tracking-tighter">{value}</span>
          <span className="text-[10px] font-black text-white/40 uppercase mt-1">{unit}</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className={`flex-1 flex flex-col items-center justify-center ${small ? 'scale-75' : 'pt-2'}`}>
      <div className="relative w-36 h-28">
        <svg className="w-full h-full" viewBox="0 0 100 60">
          <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="#222" strokeWidth={small ? '12' : '10'} strokeLinecap="round" />
          <motion.line x1="50" y1="55" x2="50" y2="15" stroke={orange ? '#f97316' : 'white'} strokeWidth="3" strokeLinecap="round" initial={{ rotate: -90 }} animate={{ rotate: 10 }} transition={{ duration: 1.5, type: "spring" }} style={{ originX: '50px', originY: '55px' }} />
        </svg>
        <div className="flex flex-col items-center mt-[-10px]">
          <span className={`${small ? 'text-2xl' : 'text-[2.2rem]'} font-black tracking-tighter italic`}>{value}</span>
          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const Thermometer = ({ value }) => (
  <div className="h-28 w-10 bg-[#151515] rounded-full relative p-1.5 border border-white/5">
    <motion.div initial={{ height: 0 }} animate={{ height: '65%' }} transition={{ duration: 2 }} className="absolute bottom-1.5 left-1.5 right-1.5 bg-green rounded-full shadow-[0_0_20px_rgba(105,191,100,0.4)]" />
    {[...Array(5)].map((_, i) => <div key={i} className="absolute left-[-4px] right-[-4px] h-px bg-white/20" style={{ top: `${20 * i}%` }} />)}
  </div>
);

const ProgressBar = ({ val, display, unit, icon }) => (
  <div className="flex-1 flex flex-col justify-center gap-4 px-4">
    <div className="relative h-2 w-full bg-[#151515] rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1.5 }} className="h-full bg-green" />
    </div>
    <div className="flex items-center justify-end gap-3 translate-y-2 text-2xl font-black italic">
      <IndicatorIcon type={icon} className="translate-y-[-2px]" /> {display} <span className="text-xs font-bold text-white/30 uppercase">{unit}</span>
    </div>
  </div>
);

const BigValue = ({ val, unit }) => (
  <div className="flex items-center">
    <span className="text-[4rem] font-black leading-none italic tracking-tighter">{val}</span>
    <span className="text-2xl font-bold text-white/40 ml-2 mt-2">{unit}</span>
  </div>
);

const IndicatorIcon = ({ type, className = "" }) => {
  if (type === 'drop') return <svg width="22" height="22" viewBox="0 0 24 24" fill="#69bf64" className={className}><path d="M12 21.5c-4.14 0-7.5-3.36-7.5-7.5 0-4.14 7.5-12.5 7.5-12.5s7.5 8.36 7.5 12.5c0 4.14-3.36 7.5-7.5 7.5z" /></svg>;
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="#69bf64" className={className}><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="6" fill="currentColor" /></svg>;
};

export default AssetManagement;