import { motion } from 'framer-motion';
import GaugeChart from '../components/GaugeChart';
import SparklineChart from '../components/SparklineChart';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

function ParameterBar({ label, value, max, unit, color = '#10B981', warning, critical }) {
  const pct = Math.min(100, (value / max) * 100);
  const isWarning  = warning  && value > warning;
  const isCritical = critical && value > critical;
  const barColor   = isCritical ? '#EF4444' : isWarning ? '#F59E0B' : color;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="metric-label">{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: barColor }}>
          {value} <span style={{ fontSize: '0.7rem', fontWeight: 400, color: '#64748B' }}>{unit}</span>
        </span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${pct}%`, background: barColor }} />
      </div>
      {isCritical && (
        <div style={{ fontSize: '0.68rem', color: '#EF4444', marginTop: 2, fontWeight: 600 }}>⚠ Critical!</div>
      )}
    </div>
  );
}

function SimpleMetricCard({ icon, label, value, unit, color, sub }) {
  return (
    <div className="card card-sm" style={{ padding: '12px 16px' }}>
      <div className="metric-label" style={{ marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <div className="metric-value" style={{ fontSize: 22, color: color || 'var(--color-primary)' }}>
          {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
          <span className="metric-unit">{unit}</span>
        </div>
      </div>
      {sub && <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function Zone2_LifeSupport({ data }) {
  const isCritical = data.do < 5 || data.ammonia > 1.5;

  const nitrateColor = (val) => {
    if (val > 60) return '#EF4444';
    if (val > 45) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div className="live-dot" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          💧 Biological System — Life Support
        </h2>
        {isCritical && (
          <span className="badge badge-danger" style={{ animation: 'pulse-dot 0.8s ease-in-out infinite' }}>
            ⚠ CRITICAL
          </span>
        )}
      </motion.div>

      {/* 50/50 Dual Column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* ===== LEFT: AQUATIC SYSTEM ===== */}
        <motion.div
          className={`card${isCritical ? ' critical-alert' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div className="flex-between">
            <span className="section-title">🐟 Aquatic System (RAS)</span>
            <select style={{
              border: '1px solid var(--border-light)', borderRadius: 8,
              padding: '4px 10px', fontSize: '0.78rem', cursor: 'pointer',
              background: '#fff', color: '#64748B',
            }}>
              <option>50/50</option><option>70/30</option>
            </select>
          </div>

          {/* DO + Air Pressure Gauges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, justifyItems: 'center' }}>
            <GaugeChart
              value={data.do} min={0} max={12} unit="mg/L" label="DO"
              color={data.do < 5 ? '#EF4444' : '#10B981'} size={100} fontSize={18}
            />
            <GaugeChart
              value={data.airPressure} min={95} max={110} unit="kPa" label="Air Pressure"
              color="#0EA5E9" size={100} fontSize={18}
            />
            {/* Ball Valve */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              <div className="metric-label">Ball Valve</div>
              <button
                className={`btn${data.ballValveOpen ? ' btn-primary' : ' btn-ghost'}`}
                style={{ width: '100%', minHeight: 48, fontSize: '0.85rem', borderRadius: 12 }}
              >
                {data.ballValveOpen ? '⬤ OPEN' : '○ CLOSED'}
              </button>
            </div>
          </div>

          {/* Water Temp */}
          <SimpleMetricCard icon="🌡️" label="Water Temp" value={data.waterTempRAS} unit="°C" color="#F59E0B" />

          {/* Ammonia + Nitrite bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ParameterBar
              label="Ammonia" value={data.ammonia} max={2} unit="ppm"
              color="#8B5CF6" warning={0.8} critical={1.5}
            />
            <ParameterBar label="Nitrite" value={data.nitrite} max={0.1} unit="ppm" color="#0EA5E9" warning={0.05} critical={0.08} />
          </div>

          {/* Positive Pressure + Delta T */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="card card-sm" style={{ padding: '12px 14px' }}>
              <div className="metric-label" style={{ marginBottom: 6 }}>Positive Pressure</div>
              <GaugeChart value={data.positivePressure} min={0} max={30} unit="Dbar"
                color="#0EA5E9" size={90} fontSize={16} />
            </div>
            <div className="card card-sm" style={{ padding: '12px 14px' }}>
              <div className="metric-label" style={{ marginBottom: 4 }}>Delta T</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: '#10B981' }}>
                Δ {data.deltaT.toFixed(1)}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#0EA5E9' }}>
                ▶ {data.positivePressure} bar
              </div>
              <SparklineChart data={data.conductivity} color="#10B981" height={45} />
            </div>
          </div>
        </motion.div>

        {/* ===== RIGHT: TERRESTRIAL SYSTEM ===== */}
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div className="flex-between">
            <span className="section-title">🌱 Terrestrial System</span>
            <select style={{
              border: '1px solid var(--border-light)', borderRadius: 8,
              padding: '4px 10px', fontSize: '0.78rem', cursor: 'pointer',
              background: '#fff', color: '#64748B',
            }}>
              <option>50/50</option><option>30/70</option>
            </select>
          </div>

          {/* Nitrate bar chart + EC + Drip Nozzle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, alignItems: 'end' }}>
            {/* Nitrate mini bar chart */}
            <div>
              <div className="metric-label" style={{ marginBottom: 4 }}>Nitrate</div>
              <ResponsiveContainer width="100%" height={70}>
                <BarChart data={data.nitrateHourly} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Bar dataKey="v" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                    {data.nitrateHourly.map((entry, i) => (
                      <Cell key={i} fill={nitrateColor(entry.v)} />
                    ))}
                  </Bar>
                  <Tooltip contentStyle={{ fontSize: '0.7rem' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <GaugeChart value={data.ec} min={0} max={5} unit="mS/cm" label="EC" color="#F59E0B" size={90} fontSize={16} />
            <GaugeChart value={data.dripPressure} min={0} max={5} unit="bar" label="Drip Nozzle" color="#EF4444" size={90} fontSize={16} />
          </div>

          {/* Humidity + Leaf Temp */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <SimpleMetricCard icon="💧" label="Substrate Hum." value={data.substrateHumidity} unit="%" color="#0EA5E9" />
            <SimpleMetricCard icon="💧" label="Internal Hum." value={data.internalHumidity} unit="%" color="#0EA5E9" />
            <SimpleMetricCard icon="🌡️" label="Leaf Temp" value={data.leafTemp} unit="°C" color="#8B5CF6" />
          </div>

          {/* Salinity + Trend */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div className="metric-label" style={{ marginBottom: 4 }}>Salinity</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🧂</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: '#0EA5E9' }}>
                  {data.salinitySoil.toFixed(1)}<span style={{ fontSize: '0.75rem', color: '#64748B' }}> ppt</span>
                </span>
              </div>
              <SparklineChart data={data.salinityTrend} color="#0EA5E9" height={45} />
            </div>

            {/* AI Recommendations */}
            <div className="card card-sm" style={{ padding: '12px 14px', background: 'var(--bg-panel)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
                🤖 AI Recommendations
              </div>
              {[
                { icon: '💧', text: 'Nutrient EC 2.5→3.0', color: '#0EA5E9' },
                { icon: '🌡️', text: 'Leaf Temp normal', color: '#10B981' },
                { icon: '⚠️', text: 'Salinity rising', color: '#F59E0B' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span>{r.icon}</span>
                  <span style={{ fontSize: '0.7rem', color: r.color, fontWeight: 500 }}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
