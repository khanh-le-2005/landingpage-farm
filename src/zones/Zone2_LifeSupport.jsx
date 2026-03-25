import { motion } from 'framer-motion';

export default function Zone2_LifeSupport({ data }) {
  return (
    <div className="min-h-full flex flex-col gap-6 p-6 bg-(--dashboard-bg-deep) text-(--text-primary) font-sans">
      {/* Header Row */}
      <div className="flex justify-between items-center shrink-0 mb-2">
        <h2 className="text-3xl font-bold tracking-tight text-[#facc15] flex items-center gap-3">
          <span className="text-(--text-primary)">CAMERA</span> LIVE
        </h2>
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary)">
          BIOLOGICAL SYSTEM GROUPING
        </h2>
        <div className="flex items-center gap-4">
           <span className="text-lg font-medium text-(--text-primary)">Desert High-Contrast</span>
           <div className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-white/10 rounded border border-white/20">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        
        {/* --- LEFT: AQUATIC SYSTEM --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-(--dashboard-bg-item) px-4 py-3 rounded-lg border border-(--dashboard-stroke)">
            <h3 className="text-[1.35rem] font-bold text-(--text-primary)">AQUATIC SYSTEM</h3>
            <div className="bg-(--bg-card-hover) px-3 py-1.5 rounded-md text-sm font-medium text-(--text-secondary) cursor-pointer flex items-center gap-2 border border-(--dashboard-stroke)">
              50/50
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 flex-1 auto-rows-fr">
            {/* R1: DO */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke)">
              <span className="text-lg font-semibold text-(--text-primary) mb-2">DO</span>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#2a2a2d" strokeWidth="8" />
                  <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#4ade80" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (0.65 * 264) }} transition={{ duration: 1 }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-2">
                  <span className="text-4xl font-bold text-(--text-primary) tracking-tight leading-none">{data?.do || '6.5'}</span>
                  <span className="text-sm font-medium text-(--text-muted) mt-1">mg/L</span>
                </div>
              </div>
            </div>

            {/* R1: Air Pressure */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke)">
              <span className="text-lg font-semibold text-(--text-primary) mb-2">Air Pressure</span>
              <div className="flex-1 flex flex-col items-center justify-center relative mt-2">
                 <svg viewBox="0 0 100 60" className="w-[120px] h-[70px]">
                    <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#3f3f46" strokeWidth="4" strokeDasharray="2 4" />
                    <motion.line x1="50" y1="50" x2="50" y2="10" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" initial={{ rotate: -70 }} animate={{ rotate: 10 }} style={{ originX: '50px', originY: '50px' }} />
                    <circle cx="50" cy="50" r="4" fill="var(--text-primary)" />
                 </svg>
                 <div className="text-center mt-[-5px]">
                    <div className="text-3xl font-bold text-(--text-primary) tracking-tight">101.3</div>
                    <div className="text-sm font-medium text-(--text-muted)">KPa</div>
                 </div>
              </div>
            </div>

            {/* R1: Electric Ball Valve */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke)">
              <span className="text-lg font-semibold text-(--text-primary) mb-4">Electric Ball Valve</span>
              <div className="flex-1 flex items-center justify-center">
                 <div className="w-full h-[70px] bg-[#4ade80] rounded-[0.8rem] flex items-center justify-center text-[#1a1a1e] text-3xl font-bold tracking-wide cursor-pointer transition-transform hover:scale-105 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4)]">
                   OPEN
                 </div>
              </div>
            </div>

            {/* R2: Water Temp */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col items-center justify-center gap-6 border border-(--dashboard-stroke) text-center relative">
              <span className="text-lg font-semibold text-(--text-primary) top-5 absolute w-full left-0">Water Temp</span>
              <div className="flex items-center gap-3 mt-10">
                 <div className="w-7 h-[65px] border-[3px] border-(--dashboard-stroke-strong) rounded-full relative p-[2px] rounded-b-[20px]">
                   <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-11 h-11 border-[3px] border-(--dashboard-stroke-strong) rounded-full flex flex-col items-center justify-end p-[3px] z-0 bg-(--dashboard-bg-item)">
                      <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-[#4ade80] rounded-full z-10" />
                   </div>
                   <div className="w-full bg-[#4ade80] absolute bottom-6 left-0 right-0 z-10 mx-auto w-[12px] rounded-full" style={{ height: '35px' }} />
                 </div>
                 <span className="text-3xl font-bold text-(--text-primary) tracking-tighter ml-6 self-start mt-2">°C</span>
              </div>
            </div>

            {/* R2: Ammonia */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke) relative">
              <span className="text-lg font-semibold text-(--text-primary) w-full">Ammonia</span>
              <div className="absolute top-5 right-5 text-[#4ade80]/40">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.5c-4.14 0-7.5-3.36-7.5-7.5 0-4.14 7.5-12.5 7.5-12.5s7.5 8.36 7.5 12.5c0 4.14-3.36 7.5-7.5 7.5z" /></svg>
              </div>
              <div className="space-y-4 mt-8 flex-1 flex flex-col items-center justify-center">
                 <div className="h-3 bg-[#4ade80] rounded-full w-full shadow-[0_0_10px_rgba(74,222,128,0.3)]" />
                 <div className="h-3 bg-[#4ade80] rounded-full w-[45%] self-start shadow-[0_0_10px_rgba(74,222,128,0.3)]" />
              </div>
              <div className="text-right text-3xl font-bold text-(--text-primary) mt-auto tracking-tighter">
                 {data?.ammonia || '0.5'} <span className="text-sm font-medium text-(--text-muted)">ppm</span>
              </div>
            </div>

            {/* R2: Nitrite */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke) relative">
              <span className="text-lg font-semibold text-(--text-primary) w-full">Nitrite</span>
              <div className="absolute top-5 right-5 text-zinc-500">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.5c-4.14 0-7.5-3.36-7.5-7.5 0-4.14 7.5-12.5 7.5-12.5s7.5 8.36 7.5 12.5c0 4.14-3.36 7.5-7.5 7.5z" /></svg>
              </div>
              <div className="space-y-4 mt-8 flex-1 flex flex-col items-center justify-center relative">
                 <div className="h-3 bg-[#4ade80] rounded-full w-full shadow-[0_0_10px_rgba(74,222,128,0.3)]" />
                 <div className="h-3 bg-[#4ade80] rounded-full w-[35%] self-start shadow-[0_0_10px_rgba(74,222,128,0.3)]" />
              </div>
              <div className="text-right text-3xl font-bold text-(--text-primary) mt-auto tracking-tighter">
                 0.02 <span className="text-sm font-medium text-(--text-muted)">ppm</span>
              </div>
            </div>

            {/* R3: Positive Pressure */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke) text-center">
               <span className="text-lg font-semibold text-(--text-primary) mb-2 text-left">Positive Pressure</span>
               <div className="flex-1 flex items-center justify-center relative w-[130px] h-[75px] mx-auto overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-[140px] h-[140px] mt-10">
                     <circle cx="50" cy="50" r="42" fill="none" stroke="#2a2a2d" strokeWidth="8" strokeDasharray="3 5" />
                     <motion.line x1="50" y1="50" x2="80" y2="20" stroke="#f97316" strokeWidth="4" strokeLinecap="round" initial={{ rotate: -90 }} animate={{ rotate: 30 }} style={{ originX: '50px', originY: '50px' }} />
                     <circle cx="50" cy="50" r="5" fill="var(--text-primary)" />
                  </svg>
                  <span className="absolute bottom-[-5px] right-[25%] text-sm font-bold text-(--text-primary) tracking-widest">Dbar</span>
               </div>
            </div>

            {/* R3: Delta T */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke)">
               <span className="text-lg font-semibold text-(--text-primary) mb-6 w-full">Delta T</span>
               <div className="flex flex-col gap-2 relative h-full justify-center">
                 <div className="flex items-center gap-2 text-[#4ade80]">
                    <span className="text-4xl font-bold">Δ</span>
                    <span className="text-4xl font-bold tracking-tighter">0.2</span>
                 </div>
                 <div className="flex items-center gap-2 text-[#4ade80] mt-1 pl-1">
                    <span className="text-3xl font-bold tracking-tighter">»</span>
                    <span className="text-3xl font-bold tracking-tighter text-(--text-primary)">15 <span className="text-xl font-medium tracking-normal text-(--text-secondary)">bar</span></span>
                 </div>
               </div>
            </div>

            {/* R3: Montica Chart */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke) overflow-hidden">
               <span className="text-lg font-semibold text-(--text-primary) mb-4">Montica (μS)</span>
               <div className="flex-1 w-full relative">
                  {/* Mockup Line Chart */}
                  <svg viewBox="0 0 100 60" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <line x1="0" y1="5" x2="100" y2="5" stroke="#3f3f46" strokeWidth="0.5" />
                    <line x1="0" y1="15" x2="100" y2="15" stroke="#3f3f46" strokeWidth="0.5" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#3f3f46" strokeWidth="0.5" />
                    <line x1="0" y1="35" x2="100" y2="35" stroke="#3f3f46" strokeWidth="0.5" />
                    <line x1="0" y1="45" x2="100" y2="45" stroke="#3f3f46" strokeWidth="0.5" />
                    <line x1="0" y1="55" x2="100" y2="55" stroke="#3f3f46" strokeWidth="0.5" />
                    
                    <path d="M0,45 L15,35 L40,30 L65,30 L85,25 L100,15 L100,60 L0,60 Z" fill="rgba(74,222,128,0.15)" />
                    <polyline points="0,45 15,35 40,30 65,30 85,25 100,15" fill="none" stroke="#4ade80" strokeWidth="2" />
                    
                    <circle cx="15" cy="35" r="2.5" fill="#4ade80" />
                    <circle cx="40" cy="30" r="2.5" fill="#4ade80" />
                    <circle cx="65" cy="30" r="2.5" fill="#4ade80" />
                    <circle cx="85" cy="25" r="2.5" fill="#4ade80" />
                  </svg>
                  
                  {/* Y Axis values */}
                  <div className="absolute left-[-5px] top-[-5px] bottom-6 flex flex-col justify-between text-[8px] text-(--text-muted)">
                     <span>24</span><span>20</span><span>20</span><span>25</span><span>10</span><span>0</span>
                  </div>

                  <div className="absolute bottom-[-10px] left-4 right-[-5px] flex justify-between text-[8px] text-(--text-muted) overflow-hidden">
                    <span>00</span><span>200</span><span>400</span><span>400</span><span>1000</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT: TERRESTRIAL SYSTEM --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-(--dashboard-bg-item) px-4 py-3 rounded-lg border border-(--dashboard-stroke)">
            <h3 className="text-[1.35rem] font-bold text-(--text-primary)">TERRESTRIAL SYSTEM</h3>
            <div className="bg-(--bg-card-hover) px-3 py-1.5 rounded-md text-sm font-medium text-(--text-secondary) cursor-pointer flex items-center gap-2 border border-(--dashboard-stroke)">
              50/50
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 flex-1 auto-rows-fr h-[620px]">
             
            {/* R1: Nitrate */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke)">
              <span className="text-lg font-semibold text-(--text-primary) mb-2">Nitrate</span>
              <div className="flex-1 flex items-end justify-between gap-2.5 px-3 pb-2 mt-4">
                 {[45, 80, 50, 95, 20].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} className={`w-full ${i===3 ? 'bg-[#94a3b8]' : 'bg-[#4ade80]'} rounded-t-sm`} />
                 ))}
              </div>
            </div>

            {/* R1: EC */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke) relative">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-semibold text-(--text-primary)">EC</span>
                <span className="text-sm font-medium text-(--text-primary)">mS/cm</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center relative mt-4">
                 <svg viewBox="0 0 100 60" className="w-[124px] h-[72px]">
                    <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#22c55e" strokeWidth="6" />
                    <path d="M50 10 A40 40 0 0 1 90 50" fill="none" stroke="#f59e0b" strokeWidth="6" />
                    <motion.line x1="50" y1="50" x2="80" y2="20" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" style={{ originX: '50px', originY: '50px' }} />
                    <circle cx="50" cy="50" r="4" fill="var(--text-primary)" />
                 </svg>
                 <div className="absolute top-[40%] text-(--text-primary) text-[12px] font-bold">P/B</div>
                 <div className="text-center mt-[-5px] text-[2.2rem] font-bold text-(--text-primary) tracking-tighter leading-none">
                    2.5<span className="text-lg font-normal tracking-normal text-(--text-secondary)">/cm</span>
                 </div>
              </div>
            </div>

            {/* R1: Drip Nozzle */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col border border-(--dashboard-stroke) relative">
              <span className="text-lg font-semibold text-(--text-primary) mb-2 z-10 w-[120%] text-center ml-[-10px]">Drip Nozzle Pressure</span>
              <div className="flex-1 flex flex-col items-center justify-center relative mt-2">
                 <svg viewBox="0 0 100 60" className="w-[120px] h-[70px]">
                    <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#3f3f46" strokeWidth="6" strokeDasharray="3 4" />
                    <path d="M75 25 A40 40 0 0 1 90 50" fill="none" stroke="#f97316" strokeWidth="6" />
                    <motion.line x1="50" y1="50" x2="70" y2="25" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="4" fill="var(--text-primary)" />
                 </svg>
                 <div className="text-center mt-[-5px]">
                    <span className="text-3xl font-bold text-(--text-primary) tracking-tight">2.0</span>
                 </div>
              </div>
            </div>

            {/* R2: Substrate Humidity */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col items-center justify-center gap-6 border border-(--dashboard-stroke)">
              <span className="text-lg font-semibold text-(--text-primary) text-center">Substrate Humidity</span>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 border-[3px] border-[#4ade80] rounded-[50%_100%_100%_100%] rotate-45 flex items-center justify-center border-solid">
                    <div className="w-5 h-5 bg-[#4ade80] rounded-[50%_100%_100%_100%] -rotate-[0deg] transform ml-1 mt-1" />
                 </div>
                 <span className="text-[2.2rem] font-bold text-(--text-primary) tracking-tighter">60%</span>
              </div>
            </div>

            {/* R2: Internal Humidity */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col items-center justify-center gap-6 border border-(--dashboard-stroke)">
              <span className="text-lg font-semibold text-(--text-primary) text-center">Internal Humidity</span>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 border-[3px] border-[#4ade80] rounded-[50%_100%_100%_100%] rotate-45 flex items-center justify-center border-solid bg-[#4ade80]/20">
                    <div className="w-5 h-5 bg-[#4ade80] rounded-[50%_100%_100%_100%] ml-1 mt-1 shadow-[0_0_10px_#4ade80]" />
                 </div>
                 <span className="text-[2.2rem] font-bold text-(--text-primary) tracking-tighter">70%</span>
              </div>
            </div>

            {/* R2: Leaf Temperature */}
            <div className="bg-(--dashboard-bg-item) rounded-lg p-5 flex flex-col items-center justify-center gap-6 border border-(--dashboard-stroke) relative">
              <span className="text-lg font-semibold text-(--text-primary) text-center absolute top-5 left-0 w-full">Leaf Temperature</span>
              <div className="flex items-center gap-3 mt-10">
                 <div className="w-7 h-[65px] border-[3px] border-(--dashboard-stroke-strong) rounded-full relative p-[2px] rounded-b-[20px]">
                   <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-11 h-11 border-[3px] border-(--dashboard-stroke-strong) rounded-full flex flex-col items-center justify-end p-[3px] z-0 bg-(--dashboard-bg-item)">
                      <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-[#4ade80] rounded-full z-10" />
                   </div>
                   <div className="w-full bg-[#4ade80] absolute bottom-6 left-0 right-0 z-10 mx-auto w-[12px] rounded-full" style={{ height: '35px' }} />
                 </div>
                 <span className="text-[2.2rem] font-bold text-(--text-primary) tracking-tighter ml-6 pt-2">25 °C</span>
              </div>
            </div>

            {/* R3: Custom Full Spanning Box for Salinity & AI */}
            <div className="col-span-3 bg-(--dashboard-bg-item) rounded-lg p-5 border border-(--dashboard-stroke) flex h-full min-h-[180px]">
               {/* Left Half: Salinity and Text Blocks */}
               <div className="flex-[1.2] flex flex-col justify-between pr-4 h-full">
                  <div className="flex items-start justify-between w-full pr-10">
                     <div className="flex items-center gap-4 mt-2">
                       <span className="text-2xl font-semibold text-(--text-primary)">Salinity</span>
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#38bdf8] rotate-45 rounded-[2px]" />
                          <div className="text-[2.5rem] leading-none font-bold text-(--text-primary) tracking-tighter ml-1">15 <span className="text-lg text-(--text-secondary)">ppt</span></div>
                       </div>
                     </div>
                     <div className="h-[40px] w-[140px] relative mt-2 ml-4">
                        <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d">
                          <circle cx="10" cy="20" r="2.5" fill="#4ade80" />
                          <circle cx="30" cy="18" r="2.5" fill="#4ade80" />
                          <circle cx="50" cy="20" r="2.5" fill="#4ade80" />
                          <circle cx="70" cy="15" r="2.5" fill="#4ade80" />
                          <circle cx="90" cy="20" r="2.5" fill="#4ade80" />
                          <path d="M0,40 L10,20 L30,18 L50,20 L70,15 L90,20 L100,40 Z" fill="rgba(74,222,128,0.2)" />
                          <polyline points="0,25 10,20 30,18 50,20 70,15 90,20 100,20" fill="none" stroke="#4ade80" strokeWidth="2" />
                        </svg>
                        <div className="absolute bottom-[-15px] left-[10px] right-[-5px] flex justify-between text-[10px] text-(--text-muted)">
                          <span>0</span><span>0</span><span>0</span><span>3</span><span>10</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                     <div className="flex flex-col">
                        <span className="text-[1.1rem] font-medium text-(--text-primary) mb-2">AI-Driven</span>
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <div className="w-4 h-4 rounded-full border border-[#4ade80] flex items-center justify-center bg-[#4ade80]/10">
                            <span className="text-[#4ade80] transform rotate-45 text-[10px]">&uarr;</span>
                          </div>
                          Mutical<br/>Indicators
                        </div>
                     </div>
                     
                     <div className="flex flex-col max-w-[200px] mb-[-5px]">
                        <span className="text-[1.1rem] font-medium text-(--text-primary) mb-2">Recommendations</span>
                        <p className="text-[11px] text-(--text-muted) leading-[1.3] font-medium">
                          Code 212% 722%<br/>
                          5.00 40<br/>
                          This recommendation assumes no<br/>
                          manual overrides in profile A
                        </p>
                     </div>
                  </div>
               </div>
               
               {/* Right Half: Selkart Veallap Heatmap Bar Chart */}
               <div className="flex-[0.8] border-l border-(--dashboard-stroke) pl-8 pt-0 flex flex-col relative justify-between h-full">
                  <div className="flex w-full gap-8 text-[11px] font-bold text-(--text-muted) tracking-[0.2em] uppercase">
                     <span>Selkart Grid</span>
                     <span>Veallap Overlay</span>
                  </div>
                  
                  <div className="flex-1 mt-6 mb-4 relative w-full h-[120px] flex items-end gap-1.5 px-0">
                     {[
                       { h: 50, o: true }, { h: 25, o: false }, { h: 23, o: false }, { h: 70, o: true },
                       { h: 18, o: false }, { h: 20, o: false }, { h: 55, o: false }, { h: 30, o: true },
                       { h: 45, o: false }, { h: 50, o: false }, { h: 40, o: true }, { h: 25, o: false },
                       { h: 90, o: false }, { h: 48, o: false }, { h: 60, o: true }, { h: 55, o: false },
                       { h: 45, o: false }, { h: 60, o: false }
                     ].map((bar, i) => (
                       <div key={i} className={`flex-1 ${bar.o ? 'bg-[#b45309]' : 'bg-[#064e3b]'} rounded-[1px]`} style={{ height: `${bar.h}%` }} />
                     ))}
                  </div>

                  <div className="w-full flex justify-between items-center text-[10px] font-bold tracking-widest mt-2 mb-1">
                     <div className="flex items-center gap-2 text-[#22c55e]">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                        <span>AI-DRIVEN INDICATORS ACTIVE</span>
                     </div>
                     <span className="text-(--text-muted)">RECOM. V-08.2</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
