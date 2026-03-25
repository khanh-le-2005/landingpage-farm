import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

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
  const [pressureDelta, setPressureDelta] = useState(6.5);
  const isPressureAlert = pressureDelta < 7;

  return (
    <div className="space-y-4 max-w-5xl mx-auto bg-[#13161f] p-6 rounded-[2.5rem] mt-2 shadow-2xl border border-white/5">
      {/* 1. Header */}
      <div className="text-center pt-2 pb-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide leading-tight">
          HỆ THỐNG GIẢM SỐT NHÀ MÀNG & DƯỠNG CHẠY TRÀM<br />
          <span className="text-sm font-medium tracking-[0.2em] opacity-80">X - THỜI GIAN THỰC</span> 
          <span className="ml-4 font-normal text-white/40 text-xs">02108:</span> 
          <span className="bg-[#4ade80] text-[#0f172a] px-2 py-0.5 rounded text-[10px] font-black ml-1.5 shadow-lg shadow-green/20">ONLINE</span>
        </h2>
      </div>

      {/* 2. CỤM WATER FLOW MATRIX (Vertical Stack as in image) */}
      <div className="flex gap-4">
        {/* WELL */}
        <div className="flex-1 bg-[#1e2330] rounded-2xl border border-white/5 p-6 flex flex-col items-center text-center relative overflow-hidden group">
          <h3 className="text-xs font-black text-white/50 mb-6 tracking-[0.2em] uppercase">WELL</h3>
          <div className="h-20 flex items-center mb-6">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="#60a5fa" stroke="#3b82f6" strokeWidth="0.5" className="group-hover:scale-110 transition-transform duration-500"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <div className="text-4xl text-white font-black tracking-tight mb-2">25.5°C</div>
          <div className="flex items-center gap-2 opacity-30 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            <div className="text-[10px] tracking-[4px]">--------</div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M12 2l3 9h9l-7 5 3 9-8-7-8 7 3-9-7-5h9z"/></svg>
          </div>
          <div className="text-3xl text-white font-black tracking-tight">30.2 ppt</div>
          
          <div className="absolute top-1/4 -right-2 z-10 text-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14l-4-4 1.4-1.4L18.8 12l-6.4 6.4L11 17l4-4H5v-2z"/></svg>
          </div>
        </div>

        {/* PRE-PROCESS */}
        <div className="flex-1 bg-[#1e2330] rounded-2xl border border-white/5 p-6 flex flex-col items-center text-center relative overflow-hidden group">
          <h3 className="text-xs font-black text-white/50 mb-3 tracking-[0.2em] uppercase">PRE-PROCESS</h3>
          <p className="text-[10px] font-black text-white/20 mb-4 tracking-[0.3em] leading-none">HDPE</p>
          <div className="h-16 flex items-center mb-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
            <svg width="80" height="30" viewBox="0 0 100 40" fill="#94a3b8"><path d="M0,20 Q50,0 100,20 V30 Q50,10 0,30 Z" /></svg>
          </div>
          <div className="text-4xl text-white font-black tracking-tight mb-2">27.0°C</div>
          <div className="flex items-center gap-2 opacity-30 mb-4 text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <div className="text-[10px] tracking-[4px]">--------</div>
            <div className="text-xl leading-none font-bold">∞</div>
          </div>
          <div className="text-base text-white/30 font-black leading-tight uppercase">No measurement</div>
          
          <div className="absolute top-1/4 -right-2 z-10 text-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14l-4-4 1.4-1.4L18.8 12l-6.4 6.4L11 17l4-4H5v-2z"/></svg>
          </div>
        </div>

        {/* BUFFER TANK */}
        <div className="flex-1 bg-[#1e2330] rounded-2xl border border-white/5 p-6 flex flex-col items-center text-center relative overflow-hidden group">
          <h3 className="text-xs font-black text-white/50 mb-6 tracking-[0.2em] uppercase">BUFFER TANK</h3>
          <div className="h-20 flex items-center mb-6">
            <svg width="60" height="60" viewBox="0 0 100 100" className="group-hover:scale-110 transition-transform duration-500">
              <path d="M20,20 h60 v60 Q50,90 20,80 Z" fill="#3b82f6" opacity="0.8" />
              <rect x="25" y="15" width="50" height="6" fill="#60a5fa" rx="2" />
            </svg>
          </div>
          <div className="text-4xl text-white font-black tracking-tight mb-2">26.8°C</div>
          <div className="flex items-center gap-2 opacity-30 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            <div className="text-[10px] tracking-[4px]">--------</div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M12 2l3 9h9l-7 5 3 9-8-7-8 7 3-9-7-5h9z"/></svg>
          </div>
          <div className="text-3xl text-white font-black tracking-tight">30.1 ppt</div>
        </div>
      </div>

      {/* 3. CLIMATE & PRESSURE HUB (Wide Card) */}
      <div className="bg-[#1e2330] rounded-3xl border border-white/5 p-8 relative overflow-hidden group">
        <div className="flex justify-between items-start w-full">
          {/* INSIDE GREENHOUSE */}
          <div className="flex-1 text-left space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] opacity-80 mb-2 font-mono">INSIDE GREENHOUSE</h3>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">TEMPERATURE</p>
              <p className="text-4xl font-black text-white leading-tight">25.5°C</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">HUMIDITY</p>
              <p className="text-4xl font-black text-white leading-tight">60%</p>
            </div>
             <div>
              <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">PRESSURE</p>
              <p className="text-4xl font-black text-white leading-tight">7.5 Pa <span className="text-xs font-black text-[#22c55e] ml-2">7a</span></p>
            </div>
          </div>

          {/* PRESSURE DIFFERENCE (Center Hub) */}
          <div className="flex-1 flex flex-col items-center justify-start h-full pt-4">
             <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] opacity-80 mb-6 whitespace-nowrap">PRESSURE DIFFERENCE</h3>
             <GaugeChart value={pressureDelta} />
             
             <div className="flex items-center justify-between w-full px-8 pb-4">
                <span className="text-3xl font-black text-[#22c55e]">7a</span>
                <span className="text-3xl font-black text-white/60">Pa</span>
             </div>

             {/* Red Siren Overlay Style */}
             <div className="flex flex-col items-center mt-2 group-hover:scale-110 transition-transform duration-500">
               <div className="w-10 h-14 bg-red-600 rounded-t-2xl shadow-[0_0_80px_rgba(220,38,38,1)] border border-red-500/50 animate-pulse" />
               <div className="w-12 h-2 bg-gray-800 rounded mx-auto -mt-1 shadow-inner" />
             </div>
          </div>

          {/* OUTSIDE GREENHOUSE */}
          <div className="flex-1 text-right space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] opacity-80 mb-2 font-mono">OUTSIDE GREENHOUSE</h3>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">TEMPERATURE</p>
              <p className="text-4xl font-black text-white leading-tight">28.0°C</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">HUMIDITY</p>
              <p className="text-4xl font-black text-white/80 leading-tight">65%</p>
            </div>
             <div>
              <p className="text-[10px] font-black text-white/30 uppercase mb-1 tracking-widest">PRESSURE</p>
              <p className="text-4xl font-black text-white/60 leading-tight">7.0 Pa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
