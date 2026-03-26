import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GaugeChart from '../components/GaugeChart';

// Animated Water Flow SVG
function WaterPipeline({ data }) {
  const { t } = useTranslation();
  const flowColor = '#0EA5E9';
  const pipeColor = '#E2E8F0';
  const nodes = [
    { id: 'well',   label: t('dashboard.zones.zone0.source'),     x: 80,  y: 80,  icon: '🚰', flow: `T: ${data.tempWell}°C`, sub: `S: ${data.salinityWell}ppt`, color: '#0EA5E9' },
    { id: 'hdpe',   label: t('dashboard.zones.zone0.process'),     x: 320, y: 80,  icon: '🛡️', flow: `T: ${data.tempHDPE}°C`, sub: 'Pre-process', color: '#10B981' },
    { id: 'buffer', label: t('dashboard.zones.zone0.target'),    x: 560, y: 80,  icon: '⛱',  flow: `T: ${data.tempTarget}°C`, sub: `S: ${data.salinityTarget}ppt`, color: '#8B5CF6' },
  ];

  return (
    <div style={{ padding: '20px 0 10px' }}>
      <svg viewBox="0 0 640 160" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Pipes */}
        {[180, 420].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={80} x2={x + 60} y2={80} stroke={pipeColor} strokeWidth={8} strokeLinecap="round" />
            <line
              x1={x} y1={80} x2={x + 60} y2={80}
              stroke={flowColor}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="12 20"
              style={{ animation: 'flow-water 1.2s linear infinite' }}
            />
            <polygon points={`${x+62},74 ${x+74},80 ${x+62},86`} fill={flowColor} opacity={0.7} />
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            {/* Circle */}
            <circle cx={n.x} cy={n.y} r={44} fill="var(--dashboard-bg-card)" stroke={n.color} strokeWidth={2.5}
              style={{ filter: `drop-shadow(0 4px 8px ${n.color}30)` }} />
            {/* Icon */}
            <text x={n.x} y={n.y - 8} textAnchor="middle" fontSize={28}>{n.icon}</text>
            {/* Label */}
            <text x={n.x} y={n.y + 14} textAnchor="middle" fontSize={11} fontWeight="700"
              fill="var(--text-primary)" fontFamily="Inter, sans-serif">{n.label}</text>
            {/* Flow */}
            <text x={n.x} y={n.y + 28} textAnchor="middle" fontSize={10}
              fill="var(--text-primary)" fontWeight="800" fontFamily="Inter, sans-serif">{n.flow}</text>
            <text x={n.x} y={n.y + 40} textAnchor="middle" fontSize={9}
              fill="var(--text-muted)" fontFamily="Inter, sans-serif">{n.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ClimateCard({ icon, label, value, unit, color = 'var(--color-primary)', delay = 0 }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div className="metric-label font-bold text-sm">{label}</div>
        <div className="metric-value font-black" style={{ fontSize: 32, color }}>
          {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
          <span className="metric-unit text-base ml-1">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Zone0_Environment({ data }) {
  const { t } = useTranslation();
  const deltaP = data.deltaPressure;
  const isAlertDP = deltaP < 7;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="live-dot" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            🌿 Environment Manager
          </h2>
          <span className="badge badge-success">LIVE</span>
        </div>
        <div className="ml-auto flex gap-2">
          <span className="text-xs font-black uppercase text-(--text-muted) tracking-widest bg-(--dashboard-bg-item) px-3 py-1.5 rounded-lg border border-(--dashboard-stroke)">KEZAD, Abu Dhabi</span>
          <span className="text-xs font-black uppercase text-(--text-muted) tracking-widest bg-(--dashboard-bg-item) px-3 py-1.5 rounded-lg border border-(--dashboard-stroke)">Total: 1,500 m²</span>
        </div>
      </motion.div>

      {/* Water Flow Pipeline */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '20px 24px' }}
      >
        <div className="section-title text-(--text-primary)" style={{ marginBottom: 8 }}>💧 Water Flow Matrix</div>
        <WaterPipeline data={data} />
      </motion.div>

      {/* Climate and Pressure Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: INTERNAL environment */}
        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-black uppercase text-green pl-2 tracking-widest">● Internal Environment</div>
          <ClimateCard icon="🌡️" label="Internal Temp" value={data.airTempGreenhouse} unit="°C" color="#10B981" delay={0.1} />
          <ClimateCard icon="💦" label="Internal Humidity" value={data.humidity} unit="%" color="#0EA5E9" delay={0.15} />
        </div>

        {/* Column 2: EXTERNAL forecast */}
        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-black uppercase text-amber-500 pl-2 tracking-widest">● External Forecast</div>
          <ClimateCard icon="☀️" label="External Temp" value={data.outerTemp || 42.5} unit="°C" color="#F59E0B" delay={0.2} />
          <ClimateCard icon="💨" label="External Humidity" value={data.outerHumidity || 15} unit="%" color="#64748B" delay={0.25} />
        </div>

        {/* Column 3: Delta Pressure */}
        <motion.div
          className={`card${isAlertDP ? ' critical-alert' : ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ padding: '20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="text-xs font-black uppercase tracking-widest text-(--text-muted)">ΔP Positive Pressure</span>
            {isAlertDP
              ? <span className="badge badge-danger text-xs scale-110">⚠ ALERT</span>
              : <span className="badge badge-success text-xs scale-110">NORMAL</span>
            }
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <GaugeChart value={deltaP} min={0} max={25} unit="bar" size={140} color={isAlertDP ? '#EF4444' : '#10B981'} />
            <div className="text-center mt-4">
              <div className="text-5xl font-black italic text-(--text-primary)">
                {deltaP > 0 ? '+' : ''}{deltaP.toFixed(1)} <span className="text-2xl font-bold opacity-30">Pa</span>
              </div>
              <p className="text-[11px] font-bold text-(--text-muted) uppercase mt-3 tracking-widest">Target: +15 Pa | Warning: &lt;7 Pa</p>
              {isAlertDP && <p className="text-xs font-black text-red-500 uppercase mt-4 animate-pulse">{t('dashboard.zones.zone0.alert_fan')}</p>}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main flow rate summary */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ padding: '18px 24px' }}
      >
        <div className="section-title text-(--text-primary)" style={{ marginBottom: 12 }}>📊 Flow Rate Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Main Intake', value: data.flowRateMain, color: '#10B981' },
            { label: 'Biofilter Output', value: data.flowRateBio, color: '#0EA5E9' },
            { label: 'Grow Bed Feed', value: data.flowRateGrow, color: '#8B5CF6' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div className="metric-label">{item.label}</div>
              <div className="progress-bar-wrap" style={{ marginTop: 6, marginBottom: 6 }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${((item.value - 200) / 350) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: item.color }}>
                {item.value} <span style={{ fontSize: '0.7rem', fontWeight: 400, color: '#64748B' }}>L/h</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
