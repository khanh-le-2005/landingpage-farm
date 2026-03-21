import { motion } from 'framer-motion';
import GaugeChart from '../components/GaugeChart';
import SparklineChart from '../components/SparklineChart';

// Simulated camera cell
function CameraCell({ cam, index }) {
  const colors = [
    ['#16a34a', '#15803d'],   // green gradient
    ['#1d4ed8', '#1e40af'],   // blue
    ['#7c3aed', '#6d28d9'],   // purple
    ['#d97706', '#b45309'],   // amber
    ['#0891b2', '#0e7490'],   // cyan
    ['#be185d', '#9d174d'],   // pink
  ];
  const [c1, c2] = colors[index % colors.length];

  return (
    <div style={{
      position: 'relative',
      borderRadius: 10,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      aspectRatio: '4/3',
      border: cam.status === 'alert' ? '2px solid #EF4444' : '2px solid transparent',
      boxShadow: cam.status === 'alert' ? '0 0 0 3px #FEE2E2' : undefined,
    }}>
      {/* Simulated fish silhouettes */}
      <svg viewBox="0 0 100 75" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}>
        <ellipse cx={30} cy={35} rx={14} ry={7} fill="#fff" transform="rotate(-15 30 35)" />
        <ellipse cx={60} cy={25} rx={10} ry={5} fill="#fff" transform="rotate(10 60 25)" />
        <ellipse cx={75} cy={55} rx={12} ry={6} fill="#fff" transform="rotate(-30 75 55)" />
      </svg>

      {/* YOLO bounding box overlay */}
      <svg viewBox="0 0 100 75" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x={18} y={25} width={28} height={20} fill="none" stroke="#22FF88" strokeWidth={1.5}
          strokeDasharray="3 2" />
        <text x={19} y={23} fontSize={5} fill="#22FF88" fontFamily="monospace">YOLOv11</text>
        {cam.status === 'alert' && (
          <>
            <rect x={48} y={18} width={22} height={16} fill="none" stroke="#EF4444" strokeWidth={1.5} />
            <text x={49} y={16} fontSize={5} fill="#EF4444" fontFamily="monospace">Lethargy</text>
          </>
        )}
        <rect x={65} y={44} width={20} height={15} fill="none" stroke="#22FF88" strokeWidth={1.5}
          strokeDasharray="3 2" />
        <text x={66} y={42} fontSize={5} fill="#22FF88" fontFamily="monospace">YOLOv11</text>
      </svg>

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        padding: '6px 8px 5px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.66rem', color: '#fff', fontWeight: 600 }}>📹 {cam.label}</span>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: cam.status === 'alert' ? '#EF4444' : '#22FF88',
          animation: 'pulse-dot 1.5s ease-in-out infinite',
          display: 'inline-block',
        }} />
      </div>
    </div>
  );
}

function PlantMetricRow({ metric, index, onAction }) {
  const bgMap = {
    success: 'linear-gradient(90deg, #D1FAE5, #ECFDF5)',
    warning: 'linear-gradient(90deg, #FEF3C7, #FFFBEB)',
    danger:  'linear-gradient(90deg, #FEE2E2, #FFF1F1)',
  };
  const borderMap = { success: '#10B981', warning: '#F59E0B', danger: '#EF4444' };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: bgMap[metric.status],
        borderLeft: `4px solid ${borderMap[metric.status]}`,
        borderRadius: '0 10px 10px 0',
        padding: '10px 14px',
        gap: 10,
      }}
    >
      <div style={{ minWidth: 80 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#475569' }}>{metric.label}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: borderMap[metric.status] }}>
          {metric.value}%
        </div>
      </div>
      {metric.pctRight != null && (
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748B', marginBottom: 2 }}>Patch Yf</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#1E293B' }}>
            {metric.pctRight}%
          </div>
        </div>
      )}
      {metric.pctRight != null ? (
        <button
          className="btn btn-primary"
          style={{ padding: '6px 14px', fontSize: '0.78rem', minHeight: 36 }}
          onClick={() => onAction && onAction(metric.label)}
        >
          ✓ Apply
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['🔧 Nozzle Replace', '🌀 Fan Adjust', '🌿 Nutrient+'].map((a, i) => (
            <button key={i} className="btn btn-ghost"
              style={{ padding: '3px 10px', fontSize: '0.68rem', minHeight: 28 }}>
              {a}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Zone1_VisualHealth({ data }) {
  const handleAction = (label) => console.log('Action applied:', label);

  return (
    <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* LEFT PANEL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Camera grid */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: 16 }}>
          <div className="flex-between" style={{ marginBottom: 12 }}>
            <span className="section-title">🐟 RAS AI Fish Tracking</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block', marginRight: 4 }} />Normal
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block', marginRight: 4 }} />Lethargy
              </span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {data.cameraStatuses.map((cam, i) => (
              <CameraCell key={cam.id} cam={cam} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Fish Gauges */}
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, justifyItems: 'center' }}>
            <GaugeChart value={data.fishVelocity} min={0} max={2}     unit="m/s"    label="Avg Velocity" color="#10B981" size={110} fontSize={20} />
            <GaugeChart value={data.fishDensity}  min={0} max={30}    unit="fish/m³" label="Density"      color="#0EA5E9" size={110} fontSize={20} />
            <GaugeChart value={data.fishTrajectory} min={0} max={25}  unit="m/s"    label="Trajectory"   color="#8B5CF6" size={110} fontSize={20} />
          </div>
        </motion.div>

        {/* Predictive Insights */}
        <motion.div className="card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ padding: '14px 18px' }}>
          <div className="section-title" style={{ marginBottom: 10 }}>📈 Predictive Insights</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div className="metric-label" style={{ marginBottom: 4 }}>Velocity Trend</div>
              <SparklineChart data={data.predictiveInsight} color="#10B981" height={60} />
            </div>
            <div>
              <div className="metric-label" style={{ marginBottom: 4 }}>Behavior Pattern</div>
              <SparklineChart
                data={data.predictiveInsight.map(d => ({ ...d, v: d.v * 0.8 + Math.random() * 0.1 }))}
                color="#0EA5E9" height={60}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL – Thermal / Multispectral AI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* AI Score */}
        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          style={{ padding: '16px 20px' }}>
          <div className="flex-between" style={{ marginBottom: 12 }}>
            <span className="section-title">🌡️ Thermal & Multispectral AI</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="metric-label">AI Score</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: '#10B981' }}>
                {data.aiScore}%
              </span>
            </div>
          </div>
          <div className="metric-label" style={{ marginBottom: 10 }}>
            800 m² Salicornia — Instant Action
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.plantMetrics.map((m, i) => (
              <PlantMetricRow key={i} metric={m} index={i} onAction={handleAction} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
