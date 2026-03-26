import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Custom SVG Gauge for Pressure Difference
const GaugeChart = ({ value }) => {
  const radius = 65; // Balanced size
  const strokeWidth = 20;
  const circumference = Math.PI * radius;
  // Map 0-15 to angle 0-180
  const angle = (value / 15) * 180;
  const rot = -180 + angle; // -180 is left, 0 is right

  return (
    <div className="relative flex flex-col items-center justify-end w-44 h-28 overflow-visible mb-2">
      <svg className="absolute top-0 w-44 h-44 pointer-events-none" viewBox="0 0 200 200">
        {/* Rainbow Arc (Green -> Yellow -> Orange -> Red) */}
        {/* Red (Right) */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#ef4444" strokeWidth={strokeWidth} strokeDasharray={`${circumference / 4} ${circumference}`} strokeDashoffset={-circumference * 0.75} transform="rotate(180 100 100)" />
        {/* Orange */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#f97316" strokeWidth={strokeWidth} strokeDasharray={`${circumference / 4} ${circumference}`} strokeDashoffset={-circumference * 0.5} transform="rotate(180 100 100)" />
        {/* Yellow */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#eab308" strokeWidth={strokeWidth} strokeDasharray={`${circumference / 4} ${circumference}`} strokeDashoffset={-circumference * 0.25} transform="rotate(180 100 100)" />
        {/* Green (Left) */}
        <circle cx="100" cy="100" r={radius} fill="none" stroke="#22c55e" strokeWidth={strokeWidth} strokeDasharray={`${circumference / 4} ${circumference}`} strokeDashoffset={0} transform="rotate(180 100 100)" />

        {/* Needle */}
        <g transform={`rotate(${rot} 100 100)`}>
          <polygon points="99,100 101,100 100,30" fill="#facc15" />
          <circle cx="100" cy="100" r={7} fill="#facc15" />
          <circle cx="100" cy="100" r={3} fill="#a16207" />
        </g>
      </svg>
      <div className="relative font-bold text-3xl text-white outline-none z-10 translate-y-[-32px]">{value}</div>
    </div>
  );
};

const DashboardOverview = ({ filteredAssets }) => {
  const { t } = useTranslation();
  const [pressureDelta, setPressureDelta] = useState(6.5);
  const isPressureAlert = pressureDelta < 7;

  return (
    <div className="space-y-4 mx-auto p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] mt-2 shadow-2xl bg-(--dashboard-bg-deep)">
      {/* 1. Header */}
      <div className="text-center pt-2 pb-2">
        <h2 className="text-lg md:text-xl font-bold text-(--text-primary) uppercase tracking-wide leading-tight px-2">
          {t('dashboard.header_main')}<br />
          <div className="mt-1 flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs md:text-base font-bold tracking-widest md:tracking-[0.2em] opacity-80 decoration-(--text-muted)">{t('dashboard.real_time')}</span> 
            <span className="font-normal text-(--text-muted) text-xs md:text-sm">02108:</span> 
            <span className="bg-[#4ade80] text-[#0f172a] px-2 py-0.5 rounded text-[11px] md:text-xs font-black shadow-lg shadow-green/20">ONLINE</span>
          </div>
        </h2>
      </div>

      {/* 2. CỤM WATER FLOW MATRIX (Horizontal on md+) */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* WELL */}
        <div className="flex-1 bg-(--dashboard-bg-card) rounded-2xl border border-(--dashboard-stroke) p-4 md:p-6 flex flex-col items-center text-center relative overflow-hidden group">
          <h3 className="text-xs md:text-sm font-black text-(--text-muted) mb-4 md:mb-6 tracking-[0.2em] uppercase font-mono">WELL</h3>
          <div className="h-16 md:h-20 flex items-center mb-4 md:mb-6">
             <svg width="50" height="50" viewBox="0 0 24 24" fill="#60a5fa" stroke="#3b82f6" strokeWidth="0.5" className="md:scale-125 group-hover:scale-135 transition-transform duration-500"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <div className="text-3xl md:text-4xl text-(--text-primary) font-black tracking-tight mb-2">25.5°C</div>
          <div className="flex items-center gap-2 opacity-30 mb-4 text-(--text-muted)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            <div className="text-[8px] md:text-[10px] tracking-[2px] md:tracking-[4px]">--------</div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M12 2l3 9h9l-7 5 3 9-8-7-8 7 3-9-7-5h9z"/></svg>
          </div>
          <div className="text-2xl md:text-3xl text-(--text-primary) font-black tracking-tight font-mono">30.2 ppt</div>
          
          <div className="absolute top-1/4 -right-2 z-10 text-(--text-muted) opacity-50 hidden lg:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14l-4-4 1.4-1.4L18.8 12l-6.4 6.4L11 17l4-4H5v-2z"/></svg>
          </div>
        </div>

        {/* PRE-PROCESS */}
        <div className="flex-1 bg-(--dashboard-bg-card) rounded-2xl border border-(--dashboard-stroke) p-4 md:p-6 flex flex-col items-center text-center relative overflow-hidden group">
          <h3 className="text-xs md:text-sm font-black text-(--text-muted) mb-2 md:mb-3 tracking-[0.2em] uppercase font-mono">PRE-PROCESS</h3>
          <p className="text-[10px] md:text-xs font-black text-(--text-muted) opacity-50 mb-3 md:mb-4 tracking-[0.3em] leading-none">HDPE</p>
          <div className="h-14 md:h-16 flex items-center mb-4 md:mb-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
            <svg width="70" height="25" viewBox="0 0 100 40" fill="#94a3b8" className="md:scale-110"><path d="M0,20 Q50,0 100,20 V30 Q50,10 0,30 Z" /></svg>
          </div>
          <div className="text-3xl md:text-4xl text-(--text-primary) font-black tracking-tight mb-2">27.0°C</div>
          <div className="flex items-center gap-2 opacity-30 mb-4 text-(--text-primary)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <div className="text-[10px] md:text-xs tracking-[2px] md:tracking-[4px]">--------</div>
            <div className="text-lg md:text-xl leading-none font-bold">∞</div>
          </div>
          <div className="text-xs md:text-lg text-(--text-muted) opacity-50 font-black leading-tight uppercase font-mono">No measurement</div>
          
          <div className="absolute top-1/4 -right-2 z-10 text-(--text-muted) opacity-50 hidden lg:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14l-4-4 1.4-1.4L18.8 12l-6.4 6.4L11 17l4-4H5v-2z"/></svg>
          </div>
        </div>

        {/* BUFFER TANK */}
        <div className="flex-1 bg-(--dashboard-bg-card) rounded-2xl border border-(--dashboard-stroke) p-4 md:p-6 flex flex-col items-center text-center relative overflow-hidden group">
          <h3 className="text-xs md:text-sm font-black text-(--text-muted) mb-4 md:mb-6 tracking-[0.2em] uppercase font-mono">BUFFER TANK</h3>
          <div className="h-16 md:h-20 flex items-center mb-4 md:mb-6">
            <svg width="50" height="50" viewBox="0 0 100 100" className="md:scale-125 group-hover:scale-135 transition-transform duration-500">
              <path d="M20,20 h60 v60 Q50,90 20,80 Z" fill="#3b82f6" opacity="0.8" />
              <rect x="25" y="15" width="50" height="6" fill="#60a5fa" rx="2" />
            </svg>
          </div>
          <div className="text-3xl md:text-4xl text-(--text-primary) font-black tracking-tight mb-2">26.8°C</div>
          <div className="flex items-center gap-2 opacity-30 mb-4 text-(--text-muted)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            <div className="text-[8px] md:text-[10px] tracking-[2px] md:tracking-[4px]">--------</div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M12 2l3 9h9l-7 5 3 9-8-7-8 7 3-9-7-5h9z"/></svg>
          </div>
          <div className="text-2xl md:text-3xl text-(--text-primary) font-black tracking-tight font-mono">30.1 ppt</div>
        </div>
      </div>

      {/* 3. CLIMATE & PRESSURE HUB (Wide Card, stacks on mobile) */}
      <div className="bg-(--dashboard-bg-card) rounded-3xl md:rounded-3xl border border-(--dashboard-stroke) p-6 md:p-8 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-8 md:gap-4">
          {/* INSIDE GREENHOUSE */}
          <div className="w-full lg:flex-1 text-center lg:text-left space-y-4 md:space-y-6">
            <h3 className="text-xs md:text-sm font-black text-(--text-primary) uppercase tracking-[0.2em] opacity-80 mb-2 font-mono">INSIDE GREENHOUSE</h3>
            <div>
              <p className="text-[10px] md:text-xs font-black text-(--text-muted) uppercase mb-1 tracking-widest">TEMPERATURE</p>
              <p className="text-3xl md:text-4xl font-black text-(--text-primary) leading-tight">25.5°C</p>
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-black text-(--text-muted) uppercase mb-1 tracking-widest">HUMIDITY</p>
              <p className="text-3xl md:text-4xl font-black text-(--text-primary) leading-tight">60%</p>
            </div>
             <div>
              <p className="text-[10px] md:text-xs font-black text-(--text-muted) uppercase mb-1 tracking-widest">PRESSURE</p>
              <p className="text-3xl md:text-4xl font-black text-(--text-primary) leading-tight font-mono">7.5 Pa <span className="text-[11px] md:text-sm font-black text-[#22c55e] ml-2">7a</span></p>
            </div>
          </div>

          {/* PRESSURE DIFFERENCE (Center Hub) */}
          <div className="w-full lg:flex-1 flex flex-col items-center justify-start pt-2 md:pt-4">
             <h3 className="text-[11px] md:text-[15px] font-black text-(--text-primary) uppercase tracking-[0.2em] opacity-80 mb-4 md:mb-6 whitespace-nowrap font-mono">PRESSURE DIFFERENCE</h3>
             <div className="scale-90 md:scale-100 origin-bottom">
               <GaugeChart value={pressureDelta} />
             </div>
             
             <div className="flex items-center justify-between w-full max-w-[200px] px-4 md:px-8 pb-4 py-8">
                <span className="text-2xl md:text-3xl font-black text-[#22c55e] font-mono">7a</span>
                <span className="text-2xl md:text-3xl font-black text-(--text-muted) opacity-60 font-mono">Pa</span>
             </div>

             {/* Red Siren Overlay Style */}
             <div className="flex flex-col items-center mt-2 group-hover:scale-110 transition-transform duration-500">
               <div className="w-8 h-12 md:w-10 md:h-14 bg-red-600 rounded-t-2xl shadow-[0_0_80px_rgba(220,38,38,1)] border border-red-500/50 animate-pulse" />
               <div className="w-10 h-2 md:w-12 bg-gray-800 rounded mx-auto -mt-1 shadow-inner" />
             </div>
          </div>

          {/* OUTSIDE GREENHOUSE */}
          <div className="w-full lg:flex-1 text-center lg:text-right space-y-4 md:space-y-6">
            <h3 className="text-xs md:text-sm font-black text-(--text-primary) uppercase tracking-[0.2em] opacity-80 mb-2 font-mono">OUTSIDE GREENHOUSE</h3>
            <div>
              <p className="text-[10px] md:text-xs font-black text-(--text-muted) uppercase mb-1 tracking-widest">TEMPERATURE</p>
              <p className="text-3xl md:text-4xl font-black text-(--text-primary) leading-tight">28.0°C</p>
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-black text-(--text-muted) uppercase mb-1 tracking-widest">HUMIDITY</p>
              <p className="text-3xl md:text-4xl font-black text-(--text-primary) opacity-80 leading-tight">65%</p>
            </div>
             <div>
              <p className="text-[10px] md:text-xs font-black text-(--text-muted) uppercase mb-1 tracking-widest">PRESSURE</p>
              <p className="text-3xl md:text-4xl font-black text-(--text-primary) opacity-60 leading-tight font-mono">7.0 Pa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
