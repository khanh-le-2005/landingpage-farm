import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TICKER = [
  'Waves · 99.2% Efficiency',
  'Vision · 30 FPS · YOLOv11',
  'Sprout · Salicornia NDVI Analysis',
  'Battery · Solar Energy Balanced',
  'Droplets · TEC Water Recovery',
  'Thermometer · Climate Control',
  'Cpu · 24/7 Autonomous Monitoring',
];

const IMAGES = [
  { id: '1', src: '/dashboard/db-env.png',     label: 'Environment Manager',    color: 'var(--green)', d: 'Phân tích realtime cho 6 ao cá Chẽm' },
  { id: '2', src: '/dashboard/db-fish.png',    label: 'AI Fish Tracking',      color: 'var(--aqua)',  d: 'Theo dõi 3 yếu tố: Vận tốc - Quỹ đạo - Mật độ' },
  { id: '3', src: '/dashboard/db-factors.png', label: 'Vegetable Heatmap',     color: 'var(--gold)',  d: 'Bản đồ nhiệt theo dõi độ phủ và quang hợp' },
  { id: '4', src: '/dashboard/db-score.png',   label: 'AI Score: 92%',         color: 'var(--green)', d: 'Tổng hợp sức khỏe: Cá 94% – Rau 90%' },
  { id: '5', src: '/dashboard/db-actions.png', label: 'One-Tap Decision',      color: 'var(--aqua)',  d: 'Áp dụng ngay hoặc Bỏ qua đề xuất AI' },
  { id: '6', src: '/dashboard/db-stats.png',   label: 'Health & Efficiency',   color: 'var(--gold)',  d: 'Phân tích năng lượng và hiệu quả toàn khu' },
];

function StatCard({ value, unit, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card"
      style={{
        textAlign: 'center',
        padding: '12px 8px',
        flex: 1,
        minWidth: '85px',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: 'clamp(1rem, 3.5vw, 1.8rem)',
        lineHeight: 1,
        color,
        marginBottom: 2,
      }}>
        {value}<span style={{ fontSize: '0.7rem', fontWeight: 500, marginLeft: 1, color: 'var(--text-muted)' }}>{unit}</span>
      </div>
      <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [activeImg, setActiveImg] = useState(0); 

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '70px',
        paddingBottom: '60px',
      }}
    >
      {/* Background glow effects */}
      <div className="bg-gradient-radial" style={{ top: '15%', left: '10%', width: 'min(500px, 80vw)', height: 'min(500px, 80vw)', background: 'radial-gradient(circle, var(--green-glow) 0%, transparent 70%)' }} />
      <div className="bg-gradient-radial" style={{ top: '30%', right: '8%', width: 'min(400px, 70vw)', height: 'min(400px, 70vw)', background: 'radial-gradient(circle, var(--aqua-glow) 0%, transparent 70%)' }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(var(--glass-border) 1px, transparent 1px),
          linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
        >
          <div className="section-label" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.75rem)', padding: '6px 12px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'pulse-glow 2s ease-in-out infinite', display: 'inline-block' }} />
            KEZAD, Abu Dhabi · Smart Farm · 1,500 m²
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.4rem, 8vw, 3.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            maxWidth: 900,
            margin: '0 auto 16px',
            padding: '0 10px',
            overflowWrap: 'anywhere',
          }}
        >
          Hệ Thống IoT Giám Sát{' '}
          <span className="text-gradient-green">Smart Farm Aquaponics</span>{' '}
          Thông Minh
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 700,
            margin: '0 auto 28px',
            padding: '0 20px',
          }}
        >
          Tối ưu hóa năng suất, kiểm soát tài nguyên <strong style={{ color: 'var(--text-primary)' }}>24/7</strong> với công nghệ&nbsp;
          <strong style={{ color: 'var(--green)' }}>AI Deep Learning</strong> tại vùng khí hậu Abu Dhabi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}
        >
          <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Khám phá dự án
          </button>
          <button className="btn-ghost" style={{ padding: '10px 18px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Yêu cầu Demo
          </button>
        </motion.div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          maxWidth: 900,
          margin: '0 auto 40px',
          padding: '0 5px',
        }}>
          <StatCard value="1,500" unit="m²"  label="Diện Tích"    color="var(--green)"  delay={0.5} />
          <StatCard value="1,000" unit="m²"  label="Nhà Màng"           color="var(--aqua)"   delay={0.55} />
          <StatCard value="30"    unit="fps" label="Camera"         color="var(--gold)"   delay={0.6} />
          <StatCard value="92"    unit="%"   label="AI Score"          color="var(--green)"  delay={0.65} />
          <StatCard value="24/7"  unit=""    label="Live"        color="var(--aqua)"  delay={0.7} />
        </div>

        {/* Multi-Image Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            maxWidth: 980,
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Floating Status card */}
          <div className="system-status-badge hide-on-tiny" style={{
            position: 'absolute', 
            top: -65, right: '2%',
            background: 'var(--bg-surface)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border) ', borderRadius: 16,
            padding: '8px 12px', minWidth: 120,
            zIndex: 10,
            boxShadow: 'var(--shadow-card)',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: 2 }}>System Status</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--green)', lineHeight: 1 }}>
              99.2%
            </div>
            <div style={{ fontSize: '0.55rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)' }} /> AI Efficiency
            </div>
          </div>

          {/* Monitor frame */}
          <div className="monitor-frame" style={{
            background: 'var(--bg-surface)',
            borderRadius: 16,
            padding: '10px 10px 35px',
            border: '2px solid var(--glass-border-strong)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            position: 'relative',
            zIndex: 2,
            width: '100%', 
            boxSizing: 'border-box',
          }}>
            {/* Top bar dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, paddingLeft: 6 }}>
              <div style={{ display: 'flex', gap: 5, flexShrink: 0, opacity: 0.8 }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ 
                marginLeft: 'auto', fontSize: 'clamp(7px, 1.6vw, 10px)', color: 'var(--text-muted)', fontWeight: 700, 
                paddingRight: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '75%',
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                {IMAGES[activeImg].label}
              </div>
            </div>

            {/* Image Container with Transition */}
            <div style={{ 
              position: 'relative', 
              borderRadius: 6, 
              overflow: 'hidden', 
              background: '#000',
              aspectRatio: '16/10', // Slightly taller for dashboard details
              maxHeight: '70vh',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <img
                    src={IMAGES[activeImg].src}
                    alt={IMAGES[activeImg].label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain', // Changed to contain to see full dashboard
                    }}
                  />
                  {/* Subtle caption overlay for more context */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '12px 15px', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    color: '#fff', fontSize: '0.7rem', textAlign: 'left', fontWeight: 500,
                  }}>
                    {IMAGES[activeImg].d}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector Tabs (Integrated in monitor) */}
            <div style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 4, padding: '3px', background: 'rgba(0,0,0,0.5)',
              borderRadius: 30, backdropFilter: 'blur(10px)',
              zIndex: 10,
              maxWidth: '94%',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}>
              {IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(idx)}
                  style={{
                    padding: '4px 10px', borderRadius: 20, fontSize: '0.55rem', fontWeight: 800,
                    background: activeImg === idx ? img.color : 'transparent',
                    color: activeImg === idx ? '#fff' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {img.id}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ticker strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--glass-border)',
        padding: '10px 0',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', gap: 60, whiteSpace: 'nowrap',
          animation: 'ticker-move 40s linear infinite',
        }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ 
              fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 700, 
              display: 'flex', alignItems: 'center', gap: 6,
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              <span style={{ color: 'var(--green)', fontSize: '1.2rem' }}>•</span> {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .system-status-badge { 
             left: 10% !important; 
             top: -10px !important;
             scale: 0.85;
             transform-origin: top left;
          }
          .monitor-frame { padding-bottom: 35px !important; }
        }
      `}</style>
    </section>
  );
}
