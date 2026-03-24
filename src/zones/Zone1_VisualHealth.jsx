import { motion } from 'framer-motion';
import SparklineChart from '../components/SparklineChart';

// Simulated Holographic Camera cell - HUD Style
function CameraCell({ cam, index }) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-black aspect-video border border-green-500/20 shadow-[0_0_15px_rgba(34,255,136,0.05)]">
      {/* HUD Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500/60" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500/60" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500/60" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500/60" />

      {/* Scanning effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
         <div className="w-full h-px bg-green-400 absolute top-0 animate-[scan_4s_linear_infinite]" />
      </div>

      {/* Simulated fish silhouettes with HUD */}
      <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full opacity-60">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <ellipse cx={30} cy={35} rx={12} ry={6} fill="rgba(34, 255, 136, 0.2)" transform="rotate(-15 30 35)" />
        <ellipse cx={60} cy={25} rx={9} ry={4} fill="rgba(34, 255, 136, 0.2)" transform="rotate(10 60 25)" />
        
        {/* Bounding boxes */}
        <rect x={18} y={25} width={25} height={18} fill="none" stroke="#22FF88" strokeWidth={0.5} strokeDasharray="1.5 1" filter="url(#glow)" />
        <text x={19} y={24} fontSize={3} fill="#22FF88" className="font-mono opacity-80" style={{ fontSize: '3px' }}>F_0{index+1} / 0.8m/s</text>
        
        {cam.status === 'alert' && (
          <g>
            <rect x={48} y={18} width={20} height={14} fill="rgba(239, 68, 68, 0.1)" stroke="#EF4444" strokeWidth={0.8} />
            <text x={49} y={16} fontSize={3} fill="#EF4444" className="font-mono font-bold" style={{ fontSize: '3px' }}>⚠ STRESS</text>
          </g>
        )}
      </svg>

      {/* Camera ID Overlay */}
      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 border border-green-500/30 rounded">
         <span className="text-[8px] font-black text-green uppercase tracking-widest">CAM_0{index+1}</span>
      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-1 right-2 flex items-center gap-1.5">
         <div className={`w-1 h-1 rounded-full ${cam.status === 'alert' ? 'bg-red-500 animate-pulse' : 'bg-green'}`} />
         <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter italic">{cam.label}</span>
      </div>
    </div>
  );
}

function PlantMetricRow({ metric, index }) {
  const colorMap = { good: '#10B981', warning: '#F59E0B', alert: '#EF4444' };
  const color = colorMap[metric.status] || '#10B981';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between"
    >
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{metric.label}</span>
        <span className="text-xl font-black italic mt-0.5" style={{ color }}>{metric.val}%</span>
      </div>
      <div className="flex flex-col items-end">
         <span className="text-[7px] font-bold opacity-30 uppercase">Status</span>
         <span className={`text-[10px] font-black uppercase tracking-tighter ${metric.status === 'good' ? 'text-green' : 'text-amber-500'}`}>
           {metric.status}
         </span>
      </div>
    </motion.div>
  );
}

export default function Zone1_VisualHealth({ data }) {
  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-[#0a0a0c] text-[#e2e8f0] font-mono">
      {/* Header with Project Metadata */}
      <div className="flex justify-between items-end border-b border-white/10 pb-4 shrink-0">
         <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
              VISUAL <span className="text-green">HEALTH</span> AI
            </h2>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time Stream | 30 FPS | YOLOv11 Engine</p>
            </div>
         </div>
         <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-black text-gray-500 uppercase">AI Reliability Score</span>
            <div className="flex items-center gap-3">
               <span className="text-4xl font-black italic text-green underline decoration-green/30 underline-offset-8">92.4%</span>
            </div>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 overflow-y-auto pr-2">
        {/* LEFT PANEL: FISH AI */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <div className="w-16 h-16 border-t-4 border-r-4 border-white" />
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-widest">🐟 AQUATIC ANALYTICS</h3>
              <div className="flex gap-4">
                 <div className="text-right">
                    <span className="text-[8px] font-black text-gray-500 uppercase">Density</span>
                    <div className="text-sm font-black text-green">14.2 /m³</div>
                 </div>
                 <div className="text-right">
                    <span className="text-[8px] font-black text-gray-500 uppercase">Temp Bias</span>
                    <div className="text-sm font-black text-amber-500">+0.2°C</div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {data.cameraStatuses.map((cam, i) => (
                <CameraCell key={cam.id} cam={cam} index={i} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="bg-[#111114] border border-white/10 rounded-2xl p-5">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Velocity Trajectory</span>
                <SparklineChart data={data.predictiveInsight} color="#10B981" height={70} />
                <div className="mt-4 flex justify-between items-center text-[9px] font-black uppercase italic">
                   <span className="text-gray-500">Avg Speed</span>
                   <span className="text-green">0.82 m/s</span>
                </div>
             </div>
             <div className="bg-[#111114] border border-white/10 rounded-2xl p-5">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 block">Biomass Prediction</span>
                <SparklineChart data={data.biomassData} color="#8B5CF6" height={70} />
                <div className="mt-4 flex justify-between items-center text-[9px] font-black uppercase italic">
                   <span className="text-gray-500">Est. Growth</span>
                   <span className="text-purple-500">+1.2 kg/day</span>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT PANEL: THERMAL & PLANT AI */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#111114] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6">🌡️ THERMAL GRID OVERLAY</h3>
            
            {/* Thermal Map mockup */}
            <div className="aspect-video bg-gradient-to-br from-red-900/40 via-amber-900/40 to-green-900/40 rounded-xl relative overflow-hidden border border-white/5 shadow-inner mb-6 flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,100,0,0.2),transparent)]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,255,100,0.1),transparent)]" />
               <div className="relative text-center">
                   <span className="text-6xl font-black italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">{data.leafTemp}°C</span>
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mt-2">LEAF CANOPY TEMP</p>
               </div>
               {/* Hotspot tracking */}
               <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full border-2 border-red-500 shadow-[0_0_15px_red]" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">NDVI Index</span>
                  <div className="text-3xl font-black text-green italic mt-1">0.85</div>
                  <div className="mt-2 text-[8px] font-bold text-green/60 uppercase">Optimal Hydration</div>
               </div>
               <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Internal RH</span>
                  <div className="text-3xl font-black text-blue-400 italic mt-1">{data.internalHumidity}%</div>
                  <div className="mt-2 text-[8px] font-bold text-blue-400/60 uppercase">Stable Vapor Pressure</div>
               </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1">● Plant Health Metrics</span>
              {data.plantMetrics.map((m, i) => (
                <PlantMetricRow key={i} metric={m} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
