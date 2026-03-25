import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, ResponsiveContainer
} from 'recharts';

/* --- ICONS --- */
const TempIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-success)] text-[#10B981]">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    <path d="M11.5 6.5v6" />
  </svg>
);

const DropIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-success)] text-[#10B981]">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const LeafDropIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-success)] text-[#10B981]">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    <path d="M12 12s-2-2-2-4" />
  </svg>
);

/* --- COMPONENTS --- */

// Card Wrapper for grid items
const MetricCard = ({ children, className = "" }) => (
  <div className={`bg-[var(--dashboard-bg-item)] bg-white dark:bg-[#1C1F26] border border-gray-200 dark:border-gray-800 rounded-xl p-3 flex flex-col relative shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-colors ${className}`}>
    {children}
  </div>
);

// Large Arc Gauge (DO)
const LargeArcGauge = ({ title, value, unit }) => (
  <MetricCard className="items-center justify-center">
    <div className="absolute top-3 left-3 text-[12px] font-black text-gray-800 dark:text-gray-100 z-10">{title}</div>
    <div className="relative w-[110px] h-[55px] mt-4">
      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="10" strokeLinecap="round" />
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-success)" strokeWidth="10" strokeDasharray="126" strokeDashoffset={126 - (0.65 * 126)} strokeLinecap="round" style={{ stroke: 'var(--color-success)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
        <span className="text-3xl font-black text-gray-900 dark:text-gray-100 leading-none tracking-tighter drop-shadow-sm">{value}</span>
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wide mt-1">{unit}</span>
      </div>
    </div>
  </MetricCard>
);

// Dial Gauge (Air Pressure, Positive Pressure, Drip Nozzle)
const DialGauge = ({ title, value, unit, min = 0, max = 100, pct = 0.5, hasTrack = false }) => {
  const angle = pct * 180 - 90;
  return (
    <MetricCard className="items-center justify-between">
      <div className="w-full flex justify-between items-start mb-2">
        <div className="text-[12px] font-black text-gray-800 dark:text-gray-100 z-10 truncate pr-2">{title}</div>
      </div>
      <div className="relative w-[90px] h-[45px]">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          {/* Base Track */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth="8" strokeLinecap="round" strokeDasharray="2 4" />
          {/* Active Track (optional) */}
          {hasTrack && (
            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-warning)" strokeWidth="8" strokeDasharray="126" strokeDashoffset={126 - (pct * 126)} strokeLinecap="round" style={{ stroke: 'var(--color-warning)' }} />
          )}
          {/* Ticks */}
          <text x="5" y="55" fontSize="10" fill="currentColor" className="text-gray-400 dark:text-gray-500" fontWeight="bold">0</text>
          <text x="45" y="4" fontSize="10" fill="currentColor" className="text-gray-400 dark:text-gray-500" fontWeight="bold">40</text>
          <text x="85" y="30" fontSize="10" fill="currentColor" className="text-gray-400 dark:text-gray-500" fontWeight="bold">10</text>
        </svg>
        {/* Needle */}
        <motion.div 
          className="absolute bottom-0 left-[50%] w-[3px] h-[36px] bg-gray-800 dark:bg-gray-200 origin-bottom rounded-full z-10 shadow-sm"
          style={{ x: '-50%' }}
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ duration: 1.5, type: 'spring' }}
        >
          <div className="absolute top-[-2px] left-[-2px] w-[7px] h-[7px] rounded-full bg-gray-800 dark:bg-gray-200" />
        </motion.div>
        {/* Center pin */}
        <div className="absolute bottom-[-3px] left-[50%] ml-[-5px] w-[10px] h-[10px] rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-gray-800 dark:border-gray-200 z-20" />
      </div>
      <div className="text-center mt-2 flex flex-col items-center">
        <span className="text-xl font-black text-gray-900 dark:text-gray-100 leading-none tracking-tight">{value}</span>
        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{unit}</span>
      </div>
    </MetricCard>
  )
};

// Dial with Center Text (EC)
const CenterDialGauge = ({ title, value, unit, pct = 0.5 }) => {
  const angle = pct * 180 - 90;
  return (
    <MetricCard className="items-center justify-between">
      <div className="w-full flex border-b border-transparent">
        <div className="text-[12px] font-black text-gray-800 dark:text-gray-100 z-10 w-full flex justify-between">
           {title} <span className="text-[10px] text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
      </div>
      <div className="relative w-[80px] h-[40px] mt-2">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth="6" strokeLinecap="round" strokeDasharray="3 4" />
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-success)" strokeWidth="6" strokeDasharray="126" strokeDashoffset={126 - (pct * 126)} strokeLinecap="round" style={{ stroke: 'var(--color-success)' }} />
        </svg>
        {/* Needle */}
        <motion.div 
          className="absolute bottom-0 left-[50%] w-[3px] h-[30px] origin-bottom rounded-full z-10 shadow-sm"
          style={{ x: '-50%', backgroundColor: 'var(--color-success)' }}
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ duration: 1.5 }}
        />
      </div>
      <div className="text-center mt-1">
        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black block mb-0.5">P/B</span>
        <span className="text-xl font-black text-gray-900 dark:text-gray-100 leading-none tracking-tight">{value}</span>
        <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200">/cm</span>
      </div>
    </MetricCard>
  )
};

// Large solid button / block
const SolidBlock = ({ title, statusText, active = true }) => (
  <MetricCard className="justify-between">
    <div className="text-[12px] font-black text-gray-800 dark:text-gray-100">{title}</div>
    <div 
      className="flex-1 rounded-xl flex items-center justify-center text-xl font-black mt-2 shadow-sm border border-black/10 dark:border-white/10 transition-all drop-shadow-sm text-black"
      style={active ? { backgroundColor: 'var(--color-success, #10B981)' } : { backgroundColor: '#e5e7eb', color: '#6b7280' }}
    >
      {statusText}
    </div>
  </MetricCard>
);

// Horizontal Bar Chart
const BarChartBlock = ({ title }) => (
  <MetricCard className="justify-between">
    <div className="text-[12px] font-black text-gray-800 dark:text-gray-100">{title}</div>
    <div className="flex items-end justify-between h-[45px] mt-2 px-2 gap-1.5">
       {[0.6, 1.0, 0.4, 0.8, 0.5].map((h, i) => (
         <motion.div 
           key={i} 
           className="w-full rounded-t-sm shadow-sm"
           style={{ backgroundColor: 'var(--color-success, #10B981)' }}
           initial={{ height: 0 }}
           animate={{ height: `${h * 100}%` }}
           transition={{ duration: 1, delay: i * 0.1 }}
         />
       ))}
    </div>
    <div className="w-full h-1 mt-1 rounded-full opacity-100" style={{ backgroundColor: 'var(--color-success, #10B981)' }} />
  </MetricCard>
);

// Horizontal Level Metrics (Ammonia / Nitrite)
const LevelMetric = ({ title, value, unit, pct }) => (
  <MetricCard className="justify-center gap-3">
     <div className="flex justify-between items-center w-full">
       <span className="text-[12px] font-black text-gray-800 dark:text-gray-100">{title}</span>
       <DropIcon />
     </div>
     <div className="flex flex-col gap-1 w-full pl-2 pr-6 relative">
        <div className="h-[5px] w-[80%] rounded-full shadow-sm" style={{ backgroundColor: 'var(--color-success, #10B981)' }} />
        <div className="h-[5px] w-[60%] rounded-full shadow-sm" style={{ backgroundColor: 'var(--color-success, #10B981)' }} />
        
        {/* Indicator */}
        <div className="absolute top-[-8px] right-[10px] text-center">
           <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-success)" stroke="var(--dashboard-bg-item)" strokeWidth="2" className="mx-auto mb-0.5" style={{ fill: 'var(--color-success, #10B981)' }}>
             <path d="M12 21l-12-18h24z"></path>
           </svg>
           <div className="text-base font-black text-gray-900 dark:text-gray-100 leading-none mt-1 whitespace-nowrap">{value} <span className="text-[9px] text-gray-500 dark:text-gray-400 font-black">{unit}</span></div>
        </div>
     </div>
  </MetricCard>
);

// Simple Icon + Value block
const IconValueBlock = ({ title, value, Icon }) => (
  <MetricCard className="justify-center items-center gap-2">
     <div className="text-[11px] font-black text-gray-800 dark:text-gray-100 absolute top-3 left-3 w-full">{title}</div>
     <div className="flex items-center justify-center gap-3 mt-4 w-full h-full">
       <div className="scale-125"><Icon /></div>
       <span className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">{value}</span>
     </div>
  </MetricCard>
);

// Graph + Value block (Salinity)
const GraphValueBlock = ({ title, value, unit, data }) => (
  <MetricCard className="justify-between">
    <div className="text-[12px] font-black text-gray-800 dark:text-gray-100">{title}</div>
    <div className="flex items-center gap-2 mt-1">
      <LeafDropIcon />
      <span className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">{value}</span>
      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black">{unit}</span>
    </div>
    <div className="h-[30px] w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="val" stroke="var(--color-success)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-success)' }} style={{ stroke: 'var(--color-success, #10B981)' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </MetricCard>
);

// Selkart Grid Component (Discrete Bar Chart)
const SelkartGrid = () => {
  const columns = [
    { height: 0, color: '' },
    { height: 4, color: 'var(--color-success, #10B981)' },
    { height: 4, color: 'var(--color-success, #10B981)' },
    { height: 7, color: 'var(--color-gold, #F59E0B)' },
    { height: 7, color: 'var(--color-gold, #F59E0B)' },
    { height: 4, color: 'var(--color-warning, #EF4444)' },
    { height: 0, color: '' },
    { height: 0, color: '' },
    { height: 0, color: '' },
  ];

  return (
    <MetricCard className="col-span-1 flex flex-col justify-between p-2 lg:p-3">
      <div className="flex justify-between w-full text-[10px] font-black text-gray-800 dark:text-gray-100 mb-1">
         <span>Selkart</span>
         <span>Veallap</span>
      </div>
      <div className="flex-1 flex gap-[2px] items-end mt-2 relative pb-[18px] pl-[20px] border-l-2 border-b-2 border-gray-300 dark:border-gray-600">
         {/* Y-axis labels */}
         <div className="absolute left-[-18px] top-0 bottom-4 flex flex-col justify-between text-[8px] text-gray-500 dark:text-gray-400 font-mono font-bold tracking-tighter">
            <span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
         </div>
         {/* Columns */}
         {columns.map((col, idx) => (
            <div key={idx} className="flex-1 flex flex-col-reverse gap-[2px] h-full justify-start">
               {Array.from({ length: 7 }).map((_, rowIdx) => (
                  <div 
                    key={rowIdx} 
                    className={`w-full aspect-square rounded-[2px] ${rowIdx >= col.height ? 'bg-black/5 dark:bg-white/10' : ''}`} 
                    style={rowIdx < col.height ? { backgroundColor: col.color } : {}}
                  />
               ))}
            </div>
         ))}
         {/* X-axis labels */}
         <div className="absolute bottom-[-14px] left-[20px] right-0 flex justify-between text-[8px] text-gray-500 dark:text-gray-400 font-mono font-bold pr-1 tracking-wider">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
         </div>
      </div>
    </MetricCard>
  )
}


export default function Zone1_VisualHealth() {

  const trendData = [
    { time: '1', val: 10 }, { time: '2', val: 15 }, { time: '3', val: 13 },
    { time: '4', val: 18 }, { time: '5', val: 19 }, { time: '6', val: 24 }
  ];

  const salinityData = [
    { time: '1', val: 15 }, { time: '2', val: 15.2 }, { time: '3', val: 15.1 },
    { time: '4', val: 15.5 }, { time: '5', val: 15.4 }, { time: '6', val: 15 }
  ];

  return (
    <div className="min-h-full flex flex-col p-4 xl:p-6 bg-gray-50 dark:bg-[--dashboard-bg-deep] text-gray-900 dark:text-gray-100 font-sans overflow-x-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-2 gap-4">
         <h1 className="text-xl xl:text-2xl font-black tracking-widest uppercase drop-shadow-sm border-b-2 pb-1" style={{ color: 'var(--color-gold, #F59E0B)', borderColor: 'var(--color-gold, #F59E0B)30' }}>Camera Live</h1>
         <h2 className="text-2xl xl:text-3xl font-black tracking-widest text-gray-900 dark:text-white uppercase drop-shadow-sm text-center">BIOLOGICAL SYSTEM GROUPING</h2>
         <div className="text-base xl:text-lg font-black text-gray-800 dark:text-gray-200 bg-white dark:bg-[#1C1F26] px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-2">
           Desert High-Contrast
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
         </div>
      </div>

      {/* Central AI Recommendation */}
      <div className="border border-red-200 dark:border-red-900/50 rounded-2xl p-3 xl:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-md mb-4 gap-4 bg-red-50/50 dark:bg-red-900/10">
         <div className="flex items-center gap-4">
           <div className="p-2.5 rounded-full border border-red-300 dark:border-red-500 flex items-center justify-center bg-red-100 dark:bg-red-900/40">
             <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
           </div>
           <div className="flex flex-col">
             <span className="text-[11px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest drop-shadow-sm">Ưu tiên Hệ thống - AI Recommendation Alert</span>
             <span className="text-base xl:text-lg font-black text-gray-900 dark:text-white mt-1 drop-shadow-sm">Ưu tiên: Tăng Oxy Ao 3 trước khi điều chỉnh dinh dưỡng rau</span>
           </div>
         </div>
         <button className="text-white px-6 py-3 rounded-xl text-[11px] xl:text-[12px] font-black uppercase hover:bg-red-600 transition-all shadow-md active:scale-95 shrink-0 border border-white/20" style={{ backgroundColor: 'var(--color-danger, #EF4444)' }}>
            Khắc Phục Tự Động
         </button>
      </div>

      {/* DUAL COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 flex-1">
        
        {/* =======================
            LEFT: AQUATIC SYSTEM
        ======================= */}
        <div className="flex flex-col gap-4">
           {/* Section Header */}
           <div className="flex justify-between items-center bg-white dark:bg-[#1C1F26] px-4 py-2 border-l-[5px] border-red-500 rounded-r-xl shadow-sm gap-2">
             <h3 className="text-base sm:text-lg xl:text-xl font-black uppercase text-gray-900 dark:text-white tracking-widest flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
               AQUATIC SYSTEM
               <span className="text-[10px] sm:text-[11px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-md border border-red-200 dark:border-red-800 uppercase tracking-wider">Cấp thiết – Cá Chẽm</span>
             </h3>
             <div className="flex gap-2 shrink-0">
               <button className="hidden sm:flex bg-gray-50 dark:bg-gray-800 px-4 py-1.5 text-[11px] font-black rounded-lg border items-center gap-1 cursor-pointer transition-colors shadow-sm bg-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 text-[#10B981]" style={{ color: 'var(--color-success, #10B981)' }}>
                 Chi tiết
               </button>
               <div className="bg-gray-50 dark:bg-gray-800 px-4 py-1.5 text-[11px] font-black text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-1 cursor-pointer transition-colors shadow-sm">
                 50/50
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
               </div>
             </div>
           </div>

           {/* Metrics Grid 3x3 */}
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 xl:gap-4 flex-1 auto-rows-fr">
             {/* R1 */}
             <LargeArcGauge title="DO" value="6.5" unit="mg/L" />
             <DialGauge title="Air Pressure" value="101.3" unit="KPa" pct={0.65} />
             <SolidBlock title="Electric Ball Valve" statusText="OPEN" active={true} />
             
             {/* R2 */}
             <IconValueBlock title="Water Temp" value="25 °C" Icon={TempIcon} />
             <LevelMetric title="Ammonia" value="0.5" unit="ppm" pct={0.3} />
             <LevelMetric title="Nitrite" value="0.02" unit="ppm" pct={0.1} />

             {/* R3 */}
             <DialGauge title="Positive Pressure" value="15" unit="Dbar" pct={0.8} hasTrack={true} />
             <MetricCard className="justify-between">
                <div className="text-[12px] font-black text-gray-800 dark:text-gray-100">Delta T</div>
                <div className="flex flex-col justify-end h-full mt-2">
                  <div className="text-4xl font-black flex items-center gap-2" style={{ color: 'var(--color-success, #10B981)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18L12 3 3 21Z"></path></svg>
                    0.2
                  </div>
                  <div className="text-xl font-black text-gray-900 dark:text-white mt-2 flex items-center gap-1">
                     <span style={{ color: 'var(--color-success, #10B981)' }}>»</span> 15 bar
                  </div>
                </div>
             </MetricCard>
             <MetricCard className="justify-between">
                <div className="text-[12px] font-black text-gray-800 dark:text-gray-100">Montica (µS)</div>
                <div className="h-[45px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <Line type="monotone" dataKey="val" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-success, #10B981)' }} style={{ stroke: 'var(--color-success, #10B981)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between w-full mt-2 px-1">
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">00</span>
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">480</span>
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">1000</span>
                </div>
             </MetricCard>
           </div>
        </div>

        {/* =======================
            RIGHT: TERRESTRIAL
        ======================= */}
        <div className="flex flex-col gap-4">
           {/* Section Header */}
           <div className="flex justify-between items-center bg-white dark:bg-[#1C1F26] px-4 py-2 border-l-[5px] border-blue-500 rounded-r-xl shadow-sm gap-2">
             <h3 className="text-base sm:text-lg xl:text-xl font-black uppercase text-gray-900 dark:text-white tracking-widest flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
               TERRESTRIAL SYSTEM
               <span className="text-[10px] sm:text-[11px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-md border border-blue-200 dark:border-blue-800 uppercase tracking-wider">Tối ưu RS – 800m²</span>
             </h3>
             <div className="flex gap-2 shrink-0">
               <button className="hidden sm:flex bg-gray-50 dark:bg-gray-800 px-4 py-1.5 text-[11px] font-black rounded-lg border items-center gap-1 cursor-pointer transition-colors shadow-sm bg-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 text-[#10B981]" style={{ color: 'var(--color-success, #10B981)' }}>
                 Chi tiết
               </button>
               <div className="bg-gray-50 dark:bg-gray-800 px-4 py-1.5 text-[11px] font-black text-gray-600 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-1 cursor-pointer transition-colors shadow-sm">
                 50/50
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
               </div>
             </div>
           </div>

           {/* Metrics Grid 3x3 */}
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 xl:gap-4 flex-1 auto-rows-fr">
             {/* R1 */}
             <BarChartBlock title="Nitrate" />
             <CenterDialGauge title="EC" value="2.5" unit="mS/cm" pct={0.5} />
             <DialGauge title="Drip Nozzle Pressure" value="2.0" unit="" pct={0.2} hasTrack={true} />

             {/* R2 */}
             <IconValueBlock title="Substrate Humidity" value="60%" Icon={LeafDropIcon} />
             <IconValueBlock title="Internal Humidity" value="70%" Icon={DropIcon} />
             <IconValueBlock title="Leaf Temperature" value="25 °C" Icon={TempIcon} />

             {/* R3 */}
             <GraphValueBlock title="Salinity" value="15" unit="ppt" data={salinityData} />
             
             <MetricCard className="col-span-1 border-gray-200 dark:border-gray-700">
                <div className="text-[12px] font-black text-gray-500 dark:text-gray-400 tracking-wide mb-1 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  AI-Driven
                </div>
                <div className="text-[13px] font-black text-gray-900 dark:text-gray-100 leading-tight mb-2 uppercase">Recommendations</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed border-t border-gray-200 dark:border-gray-800 pt-3 font-bold dropdown">
                  {"Cole 20%  700k\n5.00 40\nThe recommended rate\nGrowing to smilk at\nControl of in part A"}
                </div>
             </MetricCard>

             <SelkartGrid />
           </div>
        </div>

      </div>
    </div>
  );
}
