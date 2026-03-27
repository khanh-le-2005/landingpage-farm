import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  LineChart, Line, ResponsiveContainer
} from 'recharts';

// --- FIX LỖI 1: THÊM LẠI COMPONENT ARCGAUGE ---
const ArcGauge = ({ title, value, unit, sub, pct, color }) => (
  <div className="flex flex-col items-center flex-1">
    <span className="text-xs xl:text-sm font-bold text-white mb-1.5 tracking-wide text-center drop-shadow-sm">{title}</span>
    <div className="relative w-[85px] xl:w-[100px] h-[48px] xl:h-[55px] overflow-hidden">
      <svg viewBox="0 0 100 55" className="w-full h-full">
        {/* Đường nền - dùng màu xám cố định nếu chưa có biến CSS */}
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" />
        {/* Đường màu tiến độ */}
        <path 
          d="M10 50 A40 40 0 0 1 90 50" 
          fill="none" 
          stroke={color} 
          strokeWidth="6" 
          strokeDasharray="126" 
          strokeDashoffset={126 - (pct * 126)} 
          strokeLinecap="round" 
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
         <span className="text-xl xl:text-2xl font-black text-white leading-none tracking-tighter flex items-end drop-shadow">
           {value}
           <span className="text-[10px] xl:text-xs font-medium ml-0.5 text-gray-400 mb-0.5">{unit}</span>
         </span>
         <span className="text-[9px] xl:text-[10px] text-gray-500 mt-1">{sub}</span>
      </div>
    </div>
  </div>
);

const ThermalHeatMap = () => {
  const gridData = React.useMemo(() => {
    return Array.from({ length: 15 * 25 }).map(() => {
      const rand = Math.random();
      let color, glow;
      if (rand > 0.6) { color = '#00E676'; glow = 'rgba(0, 230, 118, 0.4)'; }
      else if (rand > 0.3) { color = '#FFD600'; glow = 'rgba(255, 214, 0, 0.3)'; }
      else { color = '#FF1744'; glow = 'rgba(255, 23, 68, 0.5)'; }
      return { color, glow, opacity: 0.4 + Math.random() * 0.6 };
    });
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-15 grid-rows-25 h-full w-full gap-[2px] filter blur-[2px] opacity-60">
        {gridData.map((item, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [item.opacity, item.opacity * 0.6, item.opacity] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.glow}` }}
            className="w-full h-full rounded-sm"
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40" />

        <div className="flex justify-between items-start z-30">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-lg font-mono text-[8px] text-green-500 uppercase">
            Lat: 24.4539° N<br />Lon: 54.3773° E<br />Alt: 120m
          </div>
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 p-2 rounded-lg font-mono text-[8px] text-red-500 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            LIVE ANALYSIS
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-[40%] left-[10%] w-[45%] h-[25%] border-2 border-red-500 shadow-[0_0_20px_rgba(255,23,68,0.4)]"
        >
          <div className="bg-red-500 text-black text-[9px] font-black px-2 py-0.5 absolute -top-5 left-0">
            SECTOR_STRESSED_3.52ac
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-white/5 to-transparent z-30 pointer-events-none"
      />
    </div>
  );
};

export default function Zone2_LifeSupport({ data }) {
  const { t } = useTranslation();

  const videoIds = ['5f0ZgR1OTnM', 'StKNK5TB9fU', 'iwxdSxDtVZI', '2oeqv-0Ylfc'];
  const videoMapping = { 1: 0, 2: 1, 4: 2, 5: 3 };

  const predictiveData = [
    { val: 12 }, { val: 14 }, { val: 13 }, { val: 16 }, { val: 15 }, { val: 18 }
  ];

  return (
    <div className="min-h-full flex flex-col gap-4 p-4 xl:p-6 bg-[#080C14] text-white font-sans overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2">
        <h2 className="text-xl xl:text-2xl font-black tracking-widest uppercase flex items-center gap-2">
          Desert<span className="text-gray-500">"</span> High-Contrast
        </h2>
        <div className="text-xl xl:text-2xl font-black text-gray-400">65/00</div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        {/* LEFT COLUMN: RAS AI FISH TRACKING */}
        <div className="flex-[1.1] flex flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-lg xl:text-xl font-black uppercase tracking-widest text-white">RAS AI FISH TRACKING</h3>
            <div className="flex gap-4 text-xs xl:text-sm font-bold">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"></div> Normal</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> Lethargy</div>
            </div>
          </div>

          {/* Camera Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const vIdx = videoMapping[i];
              const hasVideo = vIdx !== undefined;

              return (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="text-[10px] text-gray-500 font-extrabold px-1 uppercase tracking-wider">
                    {i === 5 ? 'Clicked Diagnosis' : 'Live Camera'}
                  </div>
                  <div className="border border-white/10 rounded-xl bg-black relative aspect-[4/3] overflow-hidden shadow-sm">
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-[9px] rounded border border-white/20 text-white font-mono z-30">
                      YOLOv11
                    </div>

                    {/* FIX LỖI 2: SỬA CÚ PHÁP SRC CHO IFRAME */}
                    {hasVideo ? (
                      <div className="absolute inset-0 z-10">
                        <iframe
                          className="w-full h-full object-cover pointer-events-none scale-110"
                          src={`https://www.youtube.com/embed/${videoIds[vIdx]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoIds[vIdx]}&modestbranding=1&rel=0`}
                          title={`Video ${i}`}
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                        ></iframe>
                        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center opacity-30 z-10 text-[10px] font-black tracking-widest text-center h-full gap-2">
                        <span>NO TARGET</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Gauges */}
          <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4 mt-1 backdrop-blur-md">
            {/* FIX LỖI 3: DÙNG MÀU HEX CỐ ĐỊNH ĐỂ TRÁNH LỖI CSS VARIABLE */}
            <ArcGauge title="Average Velocity" value="0.82" unit="m/s" sub="vs standard" pct={0.82} color="#00E676" />
            <ArcGauge title="Density" value="15" unit="fish/m³" sub="vs standard" pct={0.6} color="#00E676" />
            <ArcGauge title="Trajectory" value="15" unit="m/s" sub="vs standard" pct={0.5} color="#FFD600" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="h-14 w-full bg-white/5 border border-white/10 rounded-lg p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictiveData}><Line type="monotone" dataKey="val" stroke="#FFD600" strokeWidth={2} dot={false} /></LineChart>
              </ResponsiveContainer>
            </div>
            <div className="h-14 w-full bg-white/5 border border-white/10 rounded-lg p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictiveData}><Line type="monotone" dataKey="val" stroke="#00E676" strokeWidth={2} dot={false} /></LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-[1px] bg-white/10"></div>

        {/* RIGHT COLUMN: THERMAL AI ANALYSIS */}
        <div className="flex-[0.9] flex flex-col gap-4">
          <div className="flex justify-between items-center px-2 text-sm font-black uppercase tracking-widest text-white">
            THERMAL AI ANALYSIS
          </div>

          <ThermalHeatMap />

          <div className="mt-4 p-5 bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Spectral Legend</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-red-500">LOW</span>
                  <div className="h-2 w-48 bg-gradient-to-r from-red-600 via-orange-400 via-yellow-400 to-green-500 rounded-full border border-white/10" />
                  <span className="text-[9px] font-bold text-green-500">HIGH</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="flex flex-col text-white">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Estimated Biomass</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black italic">14.2</span>
                  <span className="text-[10px] text-green-500 font-bold">TONS/HA</span>
                </div>
              </div>
              <div className="flex flex-col text-white">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">Water Stress Index</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-red-500 italic">0.24</span>
                  <span className="text-[10px] text-red-500/60 font-bold uppercase">Critical</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-green-500 text-black font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-green-500/20 hover:bg-green-400 transition-all mt-auto cursor-pointer">
            Auto-Dose Nutrient
          </button>
        </div>
      </div>
    </div>
  );
}