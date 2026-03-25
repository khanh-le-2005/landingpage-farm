import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';

// A more realistic and beautiful fish shape
const FishIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    {/* Body */}
    <path d="M55 30 C80 30, 95 45, 98 50 C95 55, 80 70, 55 70 C30 70, 15 58, 12 50 C15 42, 30 30, 55 30 Z" />
    {/* Tail */}
    <path d="M13 50 C8 40, 2 32, 2 32 C6 45, 6 55, 2 68 C2 68, 8 60, 13 50 Z" />
    {/* Top Fin */}
    <path d="M45 32 C50 18, 65 18, 70 35 C60 30, 50 30, 45 32 Z" />
    {/* Bottom Fin */}
    <path d="M45 68 C50 82, 60 82, 65 65 C55 70, 45 70, 45 68 Z" />
    {/* Eye */}
    <circle cx="80" cy="45" r="3" fill="rgba(0,0,0,0.4)" stroke="none" />
    <path d="M85 53 C80 55, 75 55, 70 53" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArcGauge = ({ title, value, unit, sub, pct, color }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[10px] xl:text-[11px] font-bold text-[--text-primary] mb-1.5 tracking-wide text-center drop-shadow-sm">{title}</span>
      <div className="relative w-[85px] xl:w-[100px] h-[48px] xl:h-[55px] overflow-hidden">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="currentColor" className="text-[--dashboard-stroke-strong]" strokeWidth="6" strokeLinecap="round" />
          <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="6" strokeDasharray="126" strokeDashoffset={126 - (pct * 126)} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
           <span className="text-[1rem] xl:text-lg font-black text-[--text-primary] leading-none tracking-tighter flex items-end drop-shadow">
             {value}
             <span className="text-[8px] xl:text-[9px] font-medium ml-0.5 text-[--text-secondary] tracking-normal mb-0.5">{unit}</span>
           </span>
           <span className="text-[7px] xl:text-[8px] text-[--text-muted] mt-1">{sub}</span>
        </div>
      </div>
    </div>
  )
};

export default function Zone2_LifeSupport({ data }) {
  const thermalBars = [
    { label: 'Healthy (Nhiệt độ lá 28.5°C)', value: 92, bg: 'var(--color-green)', action: 'Bỏ qua' },
    { label: 'NDVI & Chlorophyll (85%)', value: 85, bg: 'var(--color-green-soft)', action: 'Áp dụng ngay' },
    { label: 'Độ mặn & Độ ẩm (RH 75%)', value: 75, bg: 'var(--color-warning)', action: 'Chỉnh quạt xả #2' },
    { label: 'Vòi tưới nghẹt (Cảnh báo)', value: 41, bg: 'var(--color-gold)', action: 'Rửa vòi tưới' },
    { label: 'Thiếu dinh dưỡng (Cảnh báo)', value: 13, bg: 'var(--color-danger)', action: 'Bổ sung Nitrat' },
    { label: 'Mức độ ổn định tổng thể', value: 92, bg: 'var(--color-danger)', action: 'Bỏ qua' },
  ];

  const predictiveData = [
    { time: '1', val: 12 }, { time: '2', val: 14 }, { time: '3', val: 13 },
    { time: '4', val: 16 }, { time: '5', val: 15 }, { time: '6', val: 18 }
  ];

  return (
    <div className="min-h-full flex flex-col gap-4 p-4 xl:p-6 bg-[--dashboard-bg-deep] text-[--text-primary] font-sans overflow-y-auto transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
         <h2 className="text-xl xl:text-2xl font-black text-[--text-primary] tracking-widest uppercase flex items-center gap-2">
           Desert<span className="text-[--text-muted]">"</span> High-Contrast
         </h2>
         <div className="text-xl xl:text-2xl font-black text-[--text-secondary]">
           65/00
         </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* =========================================================
            LEFT COLUMN: RAS AI FISH TRACKING 
        ========================================================= */}
        <div className="flex-[1.1] flex flex-col gap-4">
           {/* Top Info */}
           <div className="flex justify-between items-center px-2">
             <h3 className="text-base xl:text-lg font-black uppercase tracking-widest text-[--text-primary]">RAS AI FISH TRACKING</h3>
             <div className="flex gap-4 text-[9px] xl:text-[10px] font-bold text-[--text-secondary]">
               <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[--color-success]"></div> Piping<br/><span className="text-[--text-muted]">Normal</span></div>
               <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[--color-danger]"></div> Flashing<br/><span className="text-[--text-muted]">Lethargy</span></div>
             </div>
           </div>

           {/* Camera Grid (3x2) */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const hasFish = i !== 3 && i !== 6;
                return (
                  <div key={i} className="flex flex-col gap-1.5">
                     <div className="text-[10px] text-[--text-muted] font-bold px-1 uppercase tracking-wider">
                       {i === 1 || i === 2 ? 'Live Camera' : i === 5 ? 'Clicked Diagnosis' : 'Live Camera'}
                     </div>
                     <div className="border border-[--dashboard-stroke] rounded-xl bg-[--dashboard-bg-item] relative aspect-[4/3] flex flex-col items-center justify-center overflow-hidden hover:border-[--dashboard-stroke-strong] transition-all cursor-pointer shadow-sm">
                       
                       <div className="absolute top-2 left-2 bg-black/70 px-1.5 py-0.5 text-[8px] rounded border border-[--dashboard-stroke-strong] text-white font-mono z-20 shadow-sm backdrop-blur-md">YOLOv11</div>
                       
                       {/* Background texture for all cameras */}
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                       
                       {!hasFish && (
                          <div className="flex flex-col items-center justify-center opacity-40 z-10 text-[9px] font-bold text-[--text-muted] tracking-widest text-center mt-2 px-4 gap-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/><path d="m4.93 4.93 14.14 14.14"/></svg>
                            <span>NO TARGET<br/>ACQUIRED</span>
                          </div>
                       )}

                       {/* Dynamic YOLO Bounding Box with Fish */}
                       {hasFish && (
                         <motion.div 
                           initial={{ opacity: 0 }}
                           animate={
                             i === 2 ? {
                               opacity: [0.8, 1, 0.8],
                               top: [`${20 + i*5}%`, `${40 + i*3}%`, `${60 - i*4}%`, `${30 + i*5}%`, `${20 + i*5}%`], 
                               left: [`${20 + i*5}%`, `${60 - i*2}%`, `${40 + i*6}%`, `${70 - i*3}%`, `${20 + i*5}%`],
                               width: [`${25 + i}%`, `${30 + i}%`, `${20 + i}%`, `${30 + i}%`, `${25 + i}%`],
                               height: [`${35 + i}%`, `${40 + i}%`, `${25 + i}%`, `${40 + i}%`, `${35 + i}%`],
                               borderColor: ['var(--color-success)', 'var(--color-danger)', 'var(--color-danger)', 'var(--color-danger)', 'var(--color-success)'],
                               backgroundColor: ['rgba(0,230,118,0.1)', 'rgba(255,71,87,0.15)', 'rgba(255,71,87,0.2)', 'rgba(255,71,87,0.1)', 'rgba(0,230,118,0.1)'],
                               color: ['var(--color-success)', 'var(--color-danger)', 'var(--color-danger)', 'var(--color-danger)', 'var(--color-success)']
                             } : {
                               opacity: [0.8, 1, 0.8],
                               top: [`${20 + i*5}%`, `${40 + i*3}%`, `${60 - i*4}%`, `${30 + i*5}%`, `${20 + i*5}%`], 
                               left: [`${20 + i*5}%`, `${60 - i*2}%`, `${40 + i*6}%`, `${70 - i*3}%`, `${20 + i*5}%`],
                               width: [`${25 + i}%`, `${30 + i}%`, `${30 + i}%`, `${25 + i}%`, `${25 + i}%`],
                               height: [`${35 + i}%`, `${40 + i}%`, `${40 + i}%`, `${35 + i}%`, `${35 + i}%`],
                               borderColor: ['var(--color-success)', 'var(--color-success)'],
                               backgroundColor: ['rgba(0,230,118,0.1)', 'rgba(0,230,118,0.1)'],
                               color: ['var(--color-success)', 'var(--color-success)']
                             }
                           }
                           transition={{ 
                             duration: 12 + i*2, 
                             repeat: Infinity, 
                             ease: 'linear' 
                           }}
                           className={`absolute border-[1.5px] flex items-center justify-center z-10 pointer-events-none`}
                           style={{ transform: 'translate(-50%, -50%)', boxSizing: 'border-box' }}
                         >
                            {/* Detailed Fish Shape Icon inside Bounding Box */}
                            <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="w-[75%] h-[75%] opacity-90">
                              <FishIcon className="w-full h-full" />
                            </motion.div>
  
                            {/* Crosshairs at corners */}
                            <div className="absolute -top-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-t-[2px] border-l-[2px] border-current"></div>
                            <div className="absolute -top-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-t-[2px] border-r-[2px] border-current"></div>
                            <div className="absolute -bottom-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-b-[2px] border-l-[2px] border-current"></div>
                            <div className="absolute -bottom-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-b-[2px] border-r-[2px] border-current"></div>
                            
                            {/* Label */}
                            <motion.div 
                              className="absolute -top-[14px] left-[-1.5px] text-[6.5px] font-mono px-1 py-0.5 whitespace-nowrap font-bold tracking-wider text-[var(--bg-base)] bg-current drop-shadow-sm"
                            >
                               {i === 2 ? 'Lethargy DETECTED' : `FISH 9${i}%`}
                            </motion.div>
                            
                            {/* Extra blur effect for the diagnosis box */}
                            {i === 5 && (
                               <div className="absolute inset-0 bg-[var(--color-success)]/10 backdrop-blur-[1px] shadow-[0_0_15px_var(--color-success)] opacity-40 pointer-events-none"></div>
                            )}
                         </motion.div>
                       )}
                       
                       {/* Secondary floating box for multi-tracking effect to make it busy */}
                       {i === 1 && (
                         <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ 
                             opacity: [0.6, 0.9, 0.6],
                             top: ['60%', '30%', '80%', '60%'], 
                             left: ['70%', '40%', '30%', '70%'],
                             width: ['20%', '25%', '20%', '20%'],
                             height: ['30%', '35%', '30%', '30%'],
                             color: ['var(--color-success)', 'var(--color-success)']
                           }}
                           transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                           className="absolute border-[1px] border-current bg-[var(--color-success)]/5 text-[var(--color-success)] z-10 pointer-events-none flex items-center justify-center"
                           style={{ transform: 'translate(-50%, -50%)', boxSizing: 'border-box' }}
                         >
                            <FishIcon className="w-[60%] h-[60%] opacity-60" />
                            <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t-[1.5px] border-l-[1.5px] border-current"></div>
                            <div className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] border-current"></div>
                            <div className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b-[1.5px] border-l-[1.5px] border-current"></div>
                            <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] border-current"></div>
                            <div className="absolute -top-[12px] left-[-1px] text-[5px] font-mono px-1 py-0.5 whitespace-nowrap font-bold tracking-wider bg-current text-[var(--bg-base)]">
                               FISH 87%
                            </div>
                         </motion.div>
                       )}
                     </div>
                  </div>
                )
              })}
           </div>
           
           {/* 3 Gauges Row */}
           <div className="flex justify-between items-center bg-[var(--bg-card)] border border-[--dashboard-stroke] rounded-2xl p-3 xl:p-4 mt-1 backdrop-blur-md shadow-sm">
             <ArcGauge title="Average Velocity" value="0.82" unit="m/s" sub="vs standard" pct={0.82} color="var(--color-success)" />
             <ArcGauge title="Density" value="15" unit="fish/m³" sub="vs standard" pct={0.6} color="var(--color-success)" />
             <ArcGauge title="Trajectory" value="15" unit="m/s" sub="vs standard" pct={0.5} color="var(--color-warning)" />
           </div>

           {/* Predictive Insights */}
           <div className="flex flex-col gap-2 mt-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[--text-muted] tracking-wide">Predictive Insights</span>
                  <div className="h-16 w-full bg-[var(--bg-card)] border border-[--dashboard-stroke] rounded-lg p-2 shadow-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={predictiveData}>
                        <Line type="monotone" dataKey="val" stroke="var(--color-warning)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[--text-muted] tracking-wide flex justify-between">Predictive Insights <div className="flex gap-2"><span className="text-[--color-success] text-[8px]">Normal</span><span className="text-[--text-muted] text-[8px]">Abnormal</span></div></span>
                  <div className="h-16 w-full bg-[var(--bg-card)] border border-[--dashboard-stroke] rounded-lg p-2 relative shadow-sm overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={predictiveData}>
                        <Line type="monotone" dataKey="val" stroke="var(--color-success)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-success)] to-transparent opacity-10 pointer-events-none" />
                  </div>
                </div>
             </div>

             {/* AI Alerts Texts from Prompt */}
             <div className="flex flex-col gap-2 mt-2">
                <div className="bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20 p-2.5 xl:p-3 rounded-xl flex gap-3 text-[10px] xl:text-[11px] text-[--text-primary] shadow-sm">
                  <span className="text-lg">🤖</span>
                  <div className="flex flex-col gap-0.5 font-bold leading-relaxed w-full">
                    <span><strong className="text-[--color-warning]">Cảnh báo:</strong> Ngộ độc NH3/NO2- hoặc ký sinh trùng (Flashing) - Cá tách đàn.</span>
                    <div className="text-[--color-success] tracking-wide">➡ Dự báo 15 phút tới: Ao 2 có nguy cơ DO giảm 0.8 mg/L.</div>
                  </div>
                </div>
                <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 p-2.5 xl:p-3 rounded-xl flex items-center justify-between text-[10px] xl:text-[11px] text-[--text-primary] shadow-sm">
                  <span className="font-bold"><strong className="text-[--color-success]">AI tự động:</strong> Tăng khí Air-lift Ao 3 +15% (Trước khi DO đỏ).</span>
                  <button className="px-3 py-1.5 bg-[#00E676] text-[#080C14] rounded-lg font-black shrink-0 hover:bg-[#10B981] cursor-pointer text-[9px] xl:text-[10px] uppercase shadow-[0_2px_10px_rgba(0,230,118,0.4)] transition-all active:scale-95 drop-shadow-md border-0 ring-0 focus:outline-none">TỰ ĐỘNG HOÁ: BẬT</button>
                </div>
             </div>
           </div>
        </div>

        {/* Vertical Divider on Desktop */}
        <div className="hidden xl:block w-[1px] bg-[--dashboard-stroke] mx-2"></div>

        {/* =========================================================
            RIGHT COLUMN: THERMAL & MULTISPECTRAL AI
        ========================================================= */}
        <div className="flex-[0.9] flex flex-col gap-4">
           {/* Top Info */}
           <div className="flex justify-between items-center px-2">
             <h3 className="text-base xl:text-lg font-black uppercase tracking-widest text-[--text-primary]">THERMAL & MULTISPECTRAL AI</h3>
             <div className="text-xs xl:text-sm font-bold text-[--text-secondary]">
               AI Score <span className="text-xl xl:text-2xl font-black text-[--text-primary] ml-2">92%</span>
             </div>
           </div>

           {/* Sub Headers */}
           <div className="flex justify-between items-center px-2 text-[10px] text-[--text-muted] font-bold uppercase tracking-wider">
             <span>800 m² Salicornia</span>
             <span>Instant Action</span>
           </div>

           {/* Thermal Bar List */}
           <div className="flex flex-col gap-3 flex-1">
             {thermalBars.map((item, i) => (
               <div key={i} className="flex gap-2 xl:gap-3 h-[60px] xl:h-[68px]">
                 {/* Left Bar */}
                 <div 
                   className="flex-1 rounded-xl xl:rounded-2xl px-4 xl:px-5 py-2 flex justify-between items-center relative overflow-hidden group shadow-md"
                   style={{ backgroundColor: item.bg }}
                 >
                    {/* Thermal background overlay mock */}
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent"></div>
                    
                    <div className="relative z-10 flex flex-col justify-center h-full">
                      <div className="text-[9px] xl:text-[10.5px] font-bold text-white/95 drop-shadow-sm">{item.label}</div>
                      <div className="text-xl xl:text-2xl font-black text-white drop-shadow-md leading-none mt-1">{item.value}%</div>
                    </div>
                    <div className="relative z-10 text-[9px] font-bold text-white/60 bg-black/20 px-2 py-1 rounded-md hidden sm:block">
                      AI_CONF: 0.{item.value}
                    </div>
                 </div>

                 {/* Right Action Button */}
                 <div 
                   className="w-[100px] xl:w-[120px] rounded-xl xl:rounded-2xl flex items-center justify-center cursor-pointer hover:brightness-110 active:scale-95 transition-all text-[10px] xl:text-[11px] font-black px-1.5 text-center shadow-md border border-white/20"
                   style={{ backgroundColor: item.bg, color: 'white' }}
                 >
                   {item.action}
                 </div>
               </div>
             ))}
           </div>
           
        </div>

      </div>
    </div>
  );
}
