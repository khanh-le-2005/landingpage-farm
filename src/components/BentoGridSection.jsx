import { motion } from 'framer-motion';

// Individual Bento card
function BentoCard({ children, col = 1, row = 1, color = 'var(--green)', style = {}, delay = 0 }) {
  return (
    <motion.div
      className={`glass-card bento-item c-span-${col} r-span-${row}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: row > 1 ? 400 : 200,
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 140, height: 140,
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />
      {children}
    </motion.div>
  );
}

function Tag({ text, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 50,
      background: `${color}15`, border: `1px solid ${color}30`,
      fontSize: '0.68rem', fontWeight: 800,
      color, letterSpacing: '0.08em', textTransform: 'uppercase'
    }}>
      {text}
    </span>
  );
}

function MiniGauge({ value = 75, color = 'var(--green)', label = '', size = 70 }) {
  const r = 24; const circ = 2 * Math.PI * r;
  const pct = value / 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} viewBox="0 0 60 60">
        <circle cx={30} cy={30} r={r} fill="none" stroke="var(--glass-border)" strokeWidth={6} />
        <circle cx={30} cy={30} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round" transform="rotate(-90 30 30)"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
        <text x={30} y={35} textAnchor="middle" fontSize={11} fontWeight={800}
          fill="var(--text-primary)" fontFamily="Space Grotesk">{value}%</text>
      </svg>
      {label && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>}
    </div>
  );
}

export default function BentoGridSection() {
  return (
    <section id="tech" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 56 }}
        >
          <div className="section-label">Công Nghệ Lõi</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, marginBottom: 16,
          }}>
            4 Khu vực giám sát{' '}
            <span className="text-gradient-gold">thông minh</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.7 }}>
            Toàn bộ hệ thống được tích hợp đồng bộ. Từ vi khí hậu UAE đến chỉ số sinh học lá cây — kiểm soát tuyệt đối 24/7.
          </p>
        </motion.div>

        {/* Bento Grid with CSS-based responsive layout */}
        <div className="bento-grid-container">
          
          <BentoCard col={2} color="var(--aqua)" delay={0}>
            <div style={{ marginBottom: 16 }}>
              <Tag text="Zone 0" color="var(--aqua)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: '12px 0 6px' }}>
                🌊 Environment Manager
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Quản lý vi khí hậu Abu Dhabi. Sensor áp suất & độ mặn cập nhật tức thì.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Water', v: '26.4°C' },
                { label: 'Salinity', v: '15.2ppt' },
                { label: 'Flow', v: '420L/h' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', borderRadius: 12, padding: '10px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--aqua)' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard col={2} color="var(--green)" delay={0.05}>
            <Tag text="Zone 1 – Fish" color="var(--green)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: '12px 0 6px' }}>
              🐟 AI Fish Tracking
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 14 }}>
              Nhận diện cá bệnh & đếm cá tự động bằng YOLOv11. Phân tích hành vi 30fps.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <MiniGauge value={87} color="var(--green)" label="Health" />
              <MiniGauge value={72} color="var(--aqua)" label="Density" />
              <MiniGauge value={92} color="var(--gold)" label="AI Score" />
            </div>
          </BentoCard>

          <BentoCard col={2} row={2} color="var(--aqua)" delay={0.1}>
            <Tag text="Zone 2 – Biology" color="var(--aqua)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: '12px 0 6px' }}>
              🌿 Life Support Hub
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 16 }}>
              Hệ thống thần kinh trung ương của trang trại. Cân bằng DO, Nitrate & EC.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'var(--bg-card)', padding: 14, borderRadius: 12, border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>🐟 Aquatic System</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>DO Level</span>
                  <span style={{ fontWeight: 700 }}>6.5 mg/L</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ammonia</span>
                  <span style={{ fontWeight: 700 }}>0.01 ppm</span>
                </div>
              </div>
              <div style={{ background: 'var(--bg-card)', padding: 14, borderRadius: 12, border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>🌱 Terrestrial System</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Nitrate</span>
                  <span style={{ fontWeight: 700 }}>45 ppm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Salinity</span>
                  <span style={{ fontWeight: 700 }}>15.1 ppt</span>
                </div>
              </div>
              <div style={{ padding: 14, background: 'var(--aqua-glow)', borderRadius: 12, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                <strong>🤖 AI Rec:</strong> Tăng EC rau từ 2.3 {'->'} 2.5 cho chu kỳ mới.
              </div>
            </div>
          </BentoCard>

          <BentoCard col={2} color="var(--gold)" delay={0.15}>
            <Tag text="Zone 1 – Plants" color="var(--gold)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, margin: '12px 0 6px' }}>
              🔬 Thermal AI Analysis
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 16 }}>
              Camera nhiệt & đa phổ phân tích NDVI. Phát hiện sớm stress trên lá Salicornia.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ fontSize: '0.8rem', padding: 8, borderLeft: '3px solid var(--gold)', background: 'var(--bg-card)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>NDVI Index</div>
                <div style={{ fontWeight: 700 }}>0.82 Stable</div>
              </div>
              <div style={{ fontSize: '0.8rem', padding: 8, borderLeft: '3px solid var(--green)', background: 'var(--bg-card)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Health Score</div>
                <div style={{ fontWeight: 700 }}>96% Optimal</div>
              </div>
            </div>
          </BentoCard>

          <BentoCard col={1} color="var(--aqua)" delay={0.2}>
            <Tag text="Resources" color="var(--aqua)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: 10 }}>Water Tank</h4>
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              <MiniGauge value={75} color="var(--aqua)" size={70} />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>3,000L Buffer Tank</div>
          </BentoCard>

          <BentoCard col={1} color="var(--gold)" delay={0.25}>
            <Tag text="Power" color="var(--gold)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: 10 }}>Solar SoC</h4>
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              <MiniGauge value={85} color="var(--gold)" size={70} />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>Battery Backup</div>
          </BentoCard>

        </div>
      </div>

      <style>{`
        .bento-grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .c-span-2 { grid-column: span 2; }
        .c-span-1 { grid-column: span 1; }
        .r-span-2 { grid-row: span 2; }
        .r-span-1 { grid-row: span 1; }

        @media (max-width: 1024px) {
          .bento-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .c-span-2 { grid-column: span 2; }
          .c-span-1 { grid-column: span 1; }
        }

        @media (max-width: 640px) {
          .bento-grid-container {
            grid-template-columns: 1fr;
          }
          .c-span-2, .c-span-1 { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}
