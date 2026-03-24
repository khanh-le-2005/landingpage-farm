import { motion } from 'framer-motion';
import {
  BarChart, Bar, ResponsiveContainer
} from 'recharts';

export default function Zone2_LifeSupport({ data }) {
  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-[#0a0a0c] text-[#e2e8f0] font-mono">
      {/* Header Row */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
        <h2 className="text-2xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
          <div className="w-3 h-3 bg-amber-500 animate-pulse rounded-sm" /> 
          CAMERA <span className="text-amber-500">LIVE</span>
        </h2>
        <h2 className="text-2xl font-black tracking-tighter uppercase text-white opacity-80">
          BIOLOGICAL SYSTEM GROUPING
        </h2>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <span className="text-[8px] font-black opacity-40 uppercase tracking-[0.2em] block">Preset</span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Desert High-Contrast</span>
           </div>
           <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto pr-2">
        
        {/* --- LEFT: AQUATIC SYSTEM --- */}
        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white/90">AQUATIC SYSTEM</h3>
            <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-black tracking-widest text-white/60">50/50 ▾</div>
          </div>

          <div className="grid grid-cols-3 gap-4 flex-1 content-start">
            {/* DO Gauge */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 self-start tracking-widest">DO</span>
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#222" strokeWidth="8" />
                  <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#69bf64" strokeWidth="10" strokeLinecap="round" strokeDasharray="264" initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (data.do * 26.4) }} transition={{ duration: 1 }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black italic tracking-tighter">{data.do}</span>
                  <span className="text-[10px] font-black opacity-30 mt-1">mg/L</span>
                </div>
              </div>
            </div>

            {/* Air Pressure */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Air Pressure</span>
              <div className="relative h-28 flex items-center justify-center">
                 <svg viewBox="0 0 100 70" className="w-full h-full">
                    <path d="M10 60 A40 40 0 0 1 90 60" fill="none" stroke="#222" strokeWidth="8" strokeLinecap="round" strokeDasharray="1 4" />
                    <motion.line x1="50" y1="60" x2="50" y2="20" stroke="white" strokeWidth="3" strokeLinecap="round" initial={{ rotate: -70 }} animate={{ rotate: 10 }} style={{ originX: '50px', originY: '60px' }} />
                 </svg>
                 <div className="absolute bottom-0 text-center">
                    <div className="text-2xl font-black italic tracking-tighter">101.3</div>
                    <div className="text-[10px] font-black opacity-30 uppercase tracking-widest">KPa</div>
                 </div>
              </div>
            </div>

            {/* Ball Valve */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Electric Ball Valve</span>
              <div className="bg-[#69bf64] text-black font-black text-center py-6 rounded-2xl text-2xl tracking-tighter shadow-[0_0_30px_rgba(105,191,100,0.3)] border-b-4 border-green-800 active:translate-y-1 active:border-b-0 transition-all cursor-pointer">
                OPEN
              </div>
            </div>

            {/* Water Temp */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Water Temp</span>
              <div className="flex items-center gap-4">
                 <div className="w-5 h-20 bg-black/40 rounded-full relative p-0.5 border border-white/10">
                    <motion.div initial={{ height: 0 }} animate={{ height: '75%' }} transition={{ duration: 1.5 }} className="absolute bottom-0.5 left-0.5 right-0.5 bg-[#69bf64] rounded-full shadow-[0_0_15px_#69bf64]" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-4xl font-black italic tracking-tighter">{data.waterTempRAS}</span>
                    <span className="text-xl font-bold opacity-30 mt-[-4px]">°C</span>
                 </div>
              </div>
            </div>

            {/* Ammonia */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col col-span-2">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Ammonia / Toxic</span>
              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-black/40 rounded-full overflow-hidden relative border border-white/5">
                       <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 1 }} className="h-full bg-green" />
                       <span className="absolute right-2 top-0 text-[10px] opacity-20">💧</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-black/40 rounded-full overflow-hidden relative border border-white/5">
                       <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1.2 }} className="h-full bg-green" />
                       <span className="absolute right-2 top-0 text-[10px] opacity-20">💧</span>
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter whitespace-nowrap">{data.ammonia} <span className="text-xs font-bold opacity-30 ml-2">ppm</span></span>
                 </div>
              </div>
            </div>

            {/* Positive Pressure Gauge */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
               <span className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Positive Pressure</span>
               <div className="h-28 flex items-center justify-center relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                     <circle cx="50" cy="50" r="42" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2 4" />
                     <motion.line x1="50" y1="50" x2="80" y2="20" stroke="#f97316" strokeWidth="4" strokeLinecap="round" initial={{ rotate: -90 }} animate={{ rotate: 10 }} style={{ originX: '50px', originY: '50px' }} />
                     <circle cx="50" cy="50" r="4" fill="#f97316" />
                  </svg>
                  <span className="absolute bottom-2 text-[10px] font-black tracking-[0.2em] uppercase text-gray-500">Dbar</span>
               </div>
            </div>

            {/* Delta T */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center">
               <div className="flex items-baseline gap-2 text-green mb-1">
                  <span className="text-xl font-bold opacity-40">Δ</span>
                  <span className="text-3xl font-black italic tracking-tighter">0.2</span>
               </div>
               <div className="flex items-baseline gap-2 text-green">
                  <span className="text-xl font-bold opacity-40">»</span>
                  <span className="text-3xl font-black italic tracking-tighter uppercase">15 bar</span>
               </div>
            </div>

            {/* Min Chart */}
            <div className="bg-[#000] border border-white/5 rounded-2xl p-4 flex flex-col">
               <span className="text-[8px] font-black text-white/20 uppercase mb-3 text-center tracking-[0.2em]">Montica (μS) Sensor Grid</span>
               <div className="flex-1 flex gap-1 items-end">
                  {[30, 60, 45, 80, 55, 95].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className="flex-1 bg-green/20 border-t border-green/40" />
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: TERRESTRIAL SYSTEM --- */}
        <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black uppercase tracking-tight text-white/90">TERRESTRIAL SYSTEM</h3>
            <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-black tracking-widest text-white/60">50/50 ▾</div>
          </div>

          <div className="grid grid-cols-3 gap-4 flex-1 content-start">
            {/* Nitrate Chart */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Nitrate</span>
              <div className="flex-1 flex items-end gap-2 px-2 py-1">
                 {[40, 60, 40, 95, 60].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className={`flex-1 ${i === 3 ? 'bg-green animate-pulse' : 'bg-green/40'} rounded-t-sm`} />
                 ))}
              </div>
            </div>

            {/* EC Gauge */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 self-start tracking-widest">EC</span>
              <div className="relative w-32 h-24 flex flex-col items-center justify-center">
                 <svg viewBox="0 0 100 70" className="w-full h-full">
                    <path d="M10 60 A40 40 0 0 1 90 60" fill="none" stroke="#222" strokeWidth="6" strokeDasharray="0.5 3" />
                    <motion.line x1="50" y1="60" x2="50" y2="25" stroke="#69bf64" strokeWidth="3" initial={{ rotate: -90 }} animate={{ rotate: 10 }} style={{ originX: '50px', originY: '60px' }} />
                 </svg>
                 <div className="text-center mt-[-10px]">
                    <span className="text-3xl font-black italic tracking-tighter">2.5</span>
                    <span className="text-[10px] font-black opacity-30 ml-2 uppercase">mS/cm</span>
                 </div>
              </div>
            </div>

            {/* Drip Nozzle Pressure */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col items-center">
               <span className="text-[10px] font-black text-gray-400 uppercase mb-2 self-start tracking-widest">Drip Nozzle</span>
               <div className="h-28 flex items-center justify-center relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
                     <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 4" />
                     <motion.line x1="50" y1="50" x2="80" y2="30" stroke="white" strokeWidth="4" />
                  </svg>
                  <span className="absolute bottom-4 text-3xl font-black italic tracking-tighter">2.0</span>
               </div>
            </div>

            {/* Substrate Humidity */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Substrate Humidity</span>
              <div className="flex items-center gap-4">
                 <div className="text-3xl filter grayscale opacity-60">💧</div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black italic tracking-tighter">60</span>
                    <span className="text-xl font-bold opacity-20">%</span>
                 </div>
              </div>
            </div>

            {/* Internal Humidity */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Internal Humidity</span>
              <div className="flex items-center gap-4">
                 <div className="text-3xl text-green drop-shadow-[0_0_8px_#69bf6499]">💧</div>
                 <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black italic tracking-tighter">{data.internalHumidity}</span>
                    <span className="text-xl font-bold opacity-20">%</span>
                 </div>
              </div>
            </div>

            {/* Leaf Temperature - Thermal Grid Overlay */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-6 relative col-span-2">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                🌡️ THERMAL GRID OVERLAY
              </h3>
              
              <div className="aspect-2/1 bg-linear-to-br from-[#1a0f0a] via-[#1a1505] to-[#0a1a0a] rounded-xl relative overflow-hidden border border-white/5 shadow-inner flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,100,0,0.15),transparent)]" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,100,0.05),transparent)]" />
                 
                 <div className="relative z-10 text-center">
                     <span className="text-5xl font-black italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{data.leafTemp}°C</span>
                     <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.4em] mt-3">LEAF CANOPY TEMP</p>
                 </div>
                 
                 {/* Hotspot tracking */}
                 <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }} 
                   transition={{ duration: 1.5, repeat: Infinity }} 
                   className="absolute top-[35%] left-[25%] w-3 h-3 rounded-full border border-red-500 shadow-[0_0_10px_red]" 
                 />
              </div>
            </div>
            {/* Salinity */}
            <div className="bg-[#1a1a1e] border border-white/5 rounded-2xl p-5 flex flex-col">
               <span className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-widest">Salinity</span>
               <div className="flex items-center gap-4">
                  <div className="text-3xl opacity-50">🧂</div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black italic tracking-tighter">{data.salinitySoil}</span>
                    <span className="text-sm font-bold opacity-20 uppercase">ppt</span>
                  </div>
               </div>
            </div>

            {/* AI Indicators Heatmap */}
            <div className="bg-black border border-white/10 rounded-2xl p-4 col-span-2 overflow-hidden relative">
               <div className="absolute top-3 left-4 flex gap-6 text-[8px] font-black uppercase text-gray-500 tracking-[0.3em]">
                  <span>Selkart Grid</span>
                  <span>Veallap Overlay</span>
               </div>
               <div className="mt-8 flex gap-1 h-20 items-end">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`flex-1 border-t ${i % 4 === 0 ? 'bg-amber-500/40 border-amber-500' : 'bg-green/20 border-green/40'}`} style={{ height: `${30 + Math.random() * 70}%` }} />
                  ))}
               </div>
               <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green" />
                     <span className="text-[8px] font-black text-green uppercase tracking-widest">AI-Driven Indicators Active</span>
                  </div>
                  <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Recom. V-08.2</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
