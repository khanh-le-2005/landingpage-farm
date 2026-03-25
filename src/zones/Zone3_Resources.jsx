import { motion } from 'framer-motion';
import GaugeChart from '../components/GaugeChart';
import SparklineChart from '../components/SparklineChart';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, CartesianGrid,
} from 'recharts';

function BatterySoC({ value }) {
  const color = value > 50 ? '#10B981' : value > 20 ? '#F59E0B' : '#EF4444';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span className="metric-label text-(--text-muted)">🔋 Battery SoC</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color }}>{value}%</span>
      </div>
      <div className="progress-bar-wrap" style={{ height: 16 }}>
        <div
          className="progress-bar-fill"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}, ${color}BB)`,
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

function TaskRow({ task, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: 10,
        background: task.completed ? 'var(--color-green-glow)' : 'var(--dashboard-bg-item)',
        border: `1px solid ${task.completed ? 'var(--color-green)' : 'var(--dashboard-stroke)'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>{task.completed ? '✅' : '⏳'}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>{task.name}</span>
      </div>
      <span style={{
        fontSize: '0.75rem', fontWeight: 600,
        color: task.completed ? 'var(--color-green)' : 'var(--text-muted)',
      }}>
        {task.completed ? `✓ ${task.amount}` : `Pending`}
      </span>
    </motion.div>
  );
}

export default function Zone3_Resources({ data }) {
  const tankColor = data.bufferTankPct > 60 ? '#0EA5E9'
                  : data.bufferTankPct > 30 ? '#F59E0B' : '#EF4444';

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header - Shrunk */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="live-dot" />
        <h2 className="text-lg font-black text-(--text-primary) uppercase tracking-tighter">
          ⚡ Khu vực III: Resources & Efficiency
        </h2>
      </motion.div>

      {/* 3-Column Grid - reduced gap */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

        {/* ===== COL 1: ENERGY (Năng Lượng) ===== */}
        <motion.div className="glass-card bg-(--dashboard-bg-card)" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="flex-between">
            <div className="flex flex-col">
              <span className="text-lg font-black text-(--text-primary) uppercase tracking-tighter">Power Balance</span>
              <span className="text-[9px] font-bold text-amber-500 uppercase mt-0.5">Solar vs Load</span>
            </div>
          </div>

          {/* Energy Bar Chart (Cột kép) - Shrunk */}
          <div className="bg-[var(--glass-border-strong)] p-3 rounded-2xl border border-(--dashboard-stroke)">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] font-black text-(--text-muted) uppercase">Production vs Consumption</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-green">Δ +{data.energyDelta}</span>
                <span className="text-[8px] animate-bounce">↗</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={data.energyData} margin={{ top: 0, right: 0, bottom: 0, left: -25 }}>
                <XAxis dataKey="label" tick={{ fontSize: 8, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: '9px', fontWeight: 'bold' }} />
                <Bar dataKey="gen" fill="#10B981" radius={[4,4,0,0]} name="Thu (Solar)" />
                <Bar dataKey="use" fill="#F59E0B" radius={[4,4,0,0]} name="Tiêu thụ" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <BatterySoC value={data.batterySoC} />

          {/* Smart Alert Solar */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
             <div className="text-2xl">⚠️</div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-amber-600 uppercase">Hiệu suất Solar giảm &gt;15%</span>
                <span className="text-[10px] font-bold text-(--text-primary) mt-1 leading-relaxed">
                  Tự động kích hoạt Robot vệ sinh Dry-Cleaning do bụi cát.
                </span>
             </div>
          </div>
        </motion.div>

        {/* ===== COL 2: WATER (Quản Trị Nước) ===== */}
        <motion.div className="glass-card bg-(--dashboard-bg-card)" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="flex-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-(--text-primary) uppercase">Water Governance</span>
              <span className="text-[10px] font-bold text-blue-500 uppercase mt-1">Quản trị tài nguyên</span>
            </div>
          </div>

          {/* 3D Buffer Tank representation */}
          <div className="h-44 bg-[var(--glass-border-strong)] rounded-3xl border border-(--dashboard-stroke) relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-blue-500/10" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-32 border-2 border-white/20 rounded-xl relative overflow-hidden bg-black/20">
                 <motion.div 
                   className="absolute bottom-0 left-0 right-0 bg-blue-500/80"
                   initial={{ height: '0%' }}
                   animate={{ height: `${data.bufferTankPct}%` }}
                   transition={{ duration: 2, ease: "easeOut" }}
                 >
                   <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 animate-pulse" />
                 </motion.div>
              </div>
              <span className="text-2xl font-black mt-3 italic">{typeof data.bufferTankPct === 'number' ? data.bufferTankPct.toFixed(1) : data.bufferTankPct}%</span>
              <span className="text-[9px] font-bold opacity-30 uppercase">Buffer Tank — 3,000L</span>
            </div>
          </div>

          {/* Water Sourcing Ratio */}
          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-blue-600 uppercase">Water Sourcing Ratio</span>
                <span className="text-[10px] font-black text-green uppercase">TEC +5%</span>
             </div>
             <div className="flex h-2 rounded-full overflow-hidden bg-black/10">
                <div className="h-full bg-blue-500" style={{ width: '65%' }} title="Tự chủ (TEC)" />
                <div className="h-full bg-amber-500" style={{ width: '35%' }} title="Phụ thuộc (RO)" />
             </div>
             <div className="flex justify-between mt-2 text-[8px] font-black uppercase text-(--text-muted)">
                <span>Tự chủ (TEC): 65%</span>
                <span>Phụ thuộc (RO): 35%</span>
             </div>
          </div>

          {/* TEC Task Manager */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-(--text-muted) pl-2">📋 TEC Task Manager</span>
            {data.tecTasks.map((t, i) => <TaskRow key={i} task={t} index={i} />)}
          </div>
        </motion.div>

        {/* ===== COL 3: YIELD & FCR (Sản Lượng) ===== */}
        <motion.div className="glass-card bg-(--dashboard-bg-card)" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="flex-between">
            <div className="flex flex-col">
              <span className="text-xl font-black text-(--text-primary) uppercase">Yield & FCR</span>
              <span className="text-[10px] font-bold text-green uppercase mt-1">Dự báo sản lượng</span>
            </div>
          </div>

          <div className="bg-[var(--glass-border-strong)] p-4 rounded-2xl border border-(--dashboard-stroke)">
            <span className="text-[10px] font-black text-(--text-muted) uppercase mb-3 block">Biomass Monitor</span>
            <ResponsiveContainer width="100%" height={100}>
               <LineChart data={data.biomassData}>
                 <Line type="monotone" dataKey="density" stroke="#10B981" strokeWidth={3} dot={false} />
                 <Tooltip contentStyle={{ borderRadius: 12, fontSize: '10px' }} />
               </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-3 bg-[var(--glass-border-strong)] rounded-2xl border border-(--dashboard-stroke)">
                <span className="text-[9px] font-black text-(--text-muted) uppercase">Total Feed</span>
                <div className="text-xl font-black italic mt-1">{data.totalFeed}<span className="text-[9px] font-bold opacity-30 ml-1">kg</span></div>
             </div>
             <div className="p-3 bg-[var(--glass-border-strong)] rounded-2xl border border-(--dashboard-stroke)">
                <span className="text-[9px] font-black text-(--text-muted) uppercase">Estimated Weight</span>
                <div className="text-xl font-black italic mt-1 text-green">{data.fishWeight}<span className="text-[9px] font-bold opacity-30 ml-1">kg</span></div>
             </div>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚠️</span>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">FCR Alerts (Bất thường)</span>
             </div>
             <p className="text-[10px] font-bold text-(--text-primary) leading-relaxed">
               "Cảnh báo: FCR bất thường tại ao số 3 - Kiểm tra sức khỏe cá hoặc máy cho ăn."
             </p>
             <div className="mt-4 p-3 bg-(--dashboard-stroke-strong) rounded-xl text-[9px] font-black uppercase text-amber-700 italic">
               🤖 AI analysis: {data.fcrAlert || "Cá ăn nhiều nhưng không tăng trọng tương ứng."}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
