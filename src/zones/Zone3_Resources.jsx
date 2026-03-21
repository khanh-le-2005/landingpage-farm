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
        <span className="metric-label">🔋 Battery SoC</span>
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
        background: task.completed ? 'linear-gradient(90deg, #D1FAE5, #ECFDF5)' : 'var(--bg-panel)',
        border: `1px solid ${task.completed ? '#A7F3D0' : 'var(--border-light)'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>{task.completed ? '✅' : '⏳'}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1E293B' }}>{task.name}</span>
      </div>
      <span style={{
        fontSize: '0.75rem', fontWeight: 600,
        color: task.completed ? '#10B981' : '#94A3B8',
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
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="live-dot" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          ⚡ Resource & Efficiency
        </h2>
      </motion.div>

      {/* 3-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>

        {/* ===== COL 1: ENERGY ===== */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="section-title">☀️ Power Balance (Năng Lượng)</div>

          {/* Energy bar chart */}
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: 8 }}>
              Energy Per Hour (5 gần nhất)
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data.energyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, fontSize: '0.75rem', border: '1px solid #E2E8F0' }}
                  formatter={(v, n) => [`${v} kWh`, n === 'gen' ? 'Thu (Generated)' : 'Chi (Consumed)']}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '0.75rem' }}
                  formatter={(v) => v === 'gen' ? 'Thu được' : 'Tiêu thụ'} />
                <Bar dataKey="gen" fill="#10B981" radius={[4,4,0,0]} name="gen" isAnimationActive={false} />
                <Bar dataKey="use" fill="#F59E0B" radius={[4,4,0,0]} name="use" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
              Δ +{data.energyDelta} kWh surplus
            </div>
          </div>

          <BatterySoC value={data.batterySoC} />

          {/* Alert */}
          <div style={{
            background: '#FEF3C7', borderRadius: 10, padding: '10px 14px',
            border: '1px solid #FDE68A',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: 4 }}>
              ⚠️ Hệ cảnh báo thông minh
            </div>
            <div style={{ fontSize: '0.70rem', color: '#78350F', lineHeight: 1.5 }}>
              Tam giác vàng: Hiệu suất Solar giảm &gt;15% — Tự kích hoạt Robot vệ sinh Dry-Cleaning.
            </div>
          </div>
        </motion.div>

        {/* ===== COL 2: WATER ===== */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="section-title" style={{ textAlign: 'center' }}>💧 Quản Trị Nước</div>

          {/* Buffer Tank Gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Buffer Tank — 3,000L</div>
            <GaugeChart
              value={data.bufferTankPct} min={0} max={100}
              unit="%" label="" color={tankColor}
              size={140} fontSize={30}
            />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: tankColor }}>
              {Math.round(data.bufferTankPct * 30)}L / 3,000L
            </div>
          </div>

          {/* TEC Recovery */}
          <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '12px 14px', border: '1px solid #A7F3D0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', marginBottom: 6 }}>
              ♻️ TEC Recovery (Thu hồi)
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#1E293B' }}>
              <span>Hôm nay (L/h)</span>
              <span style={{ fontWeight: 700, color: '#10B981' }}>+5% vs hôm qua</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 4 }}>
              Thu hồi {data.tecRecovery}% / Tiêu thụ 100% / RO 35%
            </div>
          </div>

          {/* TEC Task Manager */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              📋 TEC Task Manager
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.tecTasks.map((t, i) => <TaskRow key={i} task={t} index={i} />)}
            </div>
          </div>
        </motion.div>

        {/* ===== COL 3: YIELD ===== */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="section-title">📊 Dự Báo Sản Lượng (Yield & FCR)</div>

          {/* Biomass chart */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Biomass Monitor</span>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Plant Density (m)</span>
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <LineChart data={data.biomassData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 9, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ fontSize: '0.72rem', borderRadius: 8 }} />
                <Line type="monotone" dataKey="density" stroke="#0EA5E9" strokeWidth={2}
                  dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Total Feed', value: `${data.totalFeed} kg`, icon: '🌾' },
              { label: 'Fish Weight', value: `${data.fishWeight} kg`, icon: '🐟' },
              { label: 'Plant Density', value: `${data.plantDensity} kg/m²`, icon: '🌱' },
              { label: 'Status', value: '▼ Ổn định', icon: '✅', color: '#10B981' },
            ].map((s, i) => (
              <div key={i} className="card card-sm"
                style={{ padding: '10px 12px', background: 'var(--bg-panel)' }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: s.color || '#1E293B' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* FCR Alert */}
          <div style={{
            background: '#FFFBEB', borderRadius: 10, padding: '12px 14px',
            border: '1px solid #FDE68A',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: 6 }}>
              ⚠️ FCR Alerts
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🔺</span>
              <div style={{ fontSize: '0.70rem', color: '#78350F', lineHeight: 1.5 }}>
                Tam giác vàng khi FCR vọt lên — Cá ăn nhiều nhưng không tăng trọng lượng. Kiểm tra sức khỏe cá ao số 3.
              </div>
            </div>
            <div style={{ marginTop: 8, padding: '8px 10px', background: '#FEF9C3', borderRadius: 8, fontSize: '0.7rem', color: '#713F12' }}>
              🤖 Phân tích AI: {data.fcrAlert}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
