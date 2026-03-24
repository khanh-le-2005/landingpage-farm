import { motion } from 'framer-motion';
import GaugeChart from '../components/GaugeChart';

// Animated Water Flow SVG
function WaterPipeline({ data }) {
  const flowColor = '#0EA5E9';
  const pipeColor = '#E2E8F0';
  const nodes = [
    { id: 'fish', label: 'Fish Tanks', x: 60,  y: 80,  icon: '🐟', flow: `${data.flowRateMain} L/h`, color: '#10B981' },
    { id: 'bio',  label: 'Biofilter',  x: 220, y: 80,  icon: '🔬', flow: `${data.flowRateBio} L/h`,  color: '#0EA5E9' },
    { id: 'grow', label: 'Grow Beds',  x: 380, y: 80,  icon: '🌱', flow: `${data.flowRateGrow} L/h`, color: '#8B5CF6' },
    { id: 'sump', label: 'Sump Tank',  x: 540, y: 80,  icon: '💧', flow: '→ Recirculate',           color: '#F59E0B' },
  ];

  return (
    <div style={{ padding: '20px 0 10px' }}>
      <svg viewBox="0 0 640 160" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {/* Pipes */}
        {[130, 290, 450].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={80} x2={x + 80} y2={80} stroke={pipeColor} strokeWidth={8} strokeLinecap="round" />
            {/* Animated flow */}
            <line
              x1={x} y1={80} x2={x + 80} y2={80}
              stroke={flowColor}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="12 20"
              style={{ animation: 'flow-water 1.2s linear infinite' }}
            />
            {/* Arrow */}
            <polygon
              points={`${x+82},74 ${x+94},80 ${x+82},86`}
              fill={flowColor}
              opacity={0.7}
            />
          </g>
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            {/* Circle */}
            <circle cx={n.x} cy={n.y} r={44} fill="var(--dashboard-bg-card)" stroke={n.color} strokeWidth={2.5}
              style={{ filter: `drop-shadow(0 4px 8px ${n.color}30)` }} />
            {/* Icon */}
            <text x={n.x} y={n.y - 6} textAnchor="middle" fontSize={22}>{n.icon}</text>
            {/* Label */}
            <text x={n.x} y={n.y + 12} textAnchor="middle" fontSize={9} fontWeight="600"
              fill="var(--text-primary)" fontFamily="Inter, sans-serif">{n.label}</text>
            {/* Flow */}
            <text x={n.x} y={n.y + 24} textAnchor="middle" fontSize={8}
              fill="var(--text-muted)" fontFamily="Inter, sans-serif">{n.flow}</text>
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
        width: 48, height: 48, borderRadius: 12,
        background: `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div className="metric-label">{label}</div>
        <div className="metric-value" style={{ fontSize: 26, color }}>
          {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
          <span className="metric-unit">{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Zone0_Environment({ data }) {
  const deltaP = data.deltaPressure;
  const isAlertDP = deltaP < 7;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="live-dot" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          🌿 Environment Manager
        </h2>
        <span className="badge badge-success">LIVE</span>
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

      {/* Climate cards + Delta Pressure */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        <ClimateCard icon="🌡️" label="Water Temp"       value={data.waterTemp}          unit="°C"   color="var(--color-primary)"   delay={0.1} />
        <ClimateCard icon="🧂" label="Salinity"          value={data.salinity}           unit=" ppt" color="var(--color-secondary)"  delay={0.15} />
        <ClimateCard icon="💦" label="Greenhouse Humidity" value={data.humidity}         unit="%"    color="#8B5CF6"                 delay={0.2} />
        <ClimateCard icon="🌤️" label="Air Temp"          value={data.airTempGreenhouse} unit="°C"   color="#F59E0B"                 delay={0.25} />

        {/* Delta Pressure — alerts if < 7 */}
        <motion.div
          className={`card${isAlertDP ? ' critical-alert' : ''}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ padding: '16px 20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span className="metric-label">ΔP Pressure</span>
            {isAlertDP
              ? <span className="badge badge-danger" style={{ animation: 'pulse-dot 0.8s ease-in-out infinite' }}>⚠ ALERT</span>
              : <span className="badge badge-success">NORMAL</span>
            }
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <GaugeChart
              value={deltaP} min={0} max={15}
              unit="bar" size={100}
              color={isAlertDP ? '#EF4444' : '#10B981'}
            />
            <div style={{ flex: 1 }}>
              <div className="metric-value" style={{ fontSize: 28, color: isAlertDP ? '#EF4444' : '#10B981' }}>
                {deltaP.toFixed(1)}<span className="metric-unit">bar</span>
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Threshold: &gt;7 bar
              </div>
              {isAlertDP && (
                <div style={{ fontSize: '0.73rem', color: '#EF4444', fontWeight: 600, marginTop: 4 }}>
                  ● Positive pressure low!
                </div>
              )}
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
