import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const TICKER = [
  '🌊 Water Recirculation · 99.2% Efficiency',
  '🐟 AI Fish Tracking · 30 FPS · YOLOv11',
  '🌱 Salicornia NDVI Analysis · Real-time',
  '☀️ Solar Energy Balanced · 85% Battery SoC',
  '💧 TEC Water Recovery · 65% Recycle Rate',
  '🌡️ Climate Control · Desert-Proof System',
  '🤖 Deep Learning · 24/7 Autonomous Monitoring',
];

const IMAGES = [
  { id: 'zone1', src: '/dashboard-zone1.png', label: 'Zone 1: Visual AI', color: 'var(--green)' },
  { id: 'zone2', src: '/dashboard-zone2.png', label: 'Zone 2: Life Support', color: 'var(--aqua)' },
  { id: 'zone3', src: '/dashboard-zone3.png', label: 'Zone 3: Resources', color: 'var(--gold)' },
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
        padding: '16px 12px',
        flex: 1,
        minWidth: '100px',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: 'clamp(1.2rem, 4vw, 2rem)',
        lineHeight: 1,
        color,
        marginBottom: 4,
      }}>
        {value}<span style={{ fontSize: '0.8rem', fontWeight: 500, marginLeft: 2, color: 'var(--text-muted)' }}>{unit}</span>
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [activeImg, setActiveImg] = useState(1); // Default to zone 2

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
        paddingTop: '80px',
        paddingBottom: '80px',
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
            fontSize: 'clamp(1.5rem, 8vw, 3.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
            maxWidth: 900,
            margin: '0 auto 20px',
            padding: '0 15px',
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
            fontSize: 'clamp(0.85rem, 2.8vw, 1.1rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 700,
            margin: '0 auto 32px',
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
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}
        >
          <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.8rem' }} onClick={() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })}>
            🌿 Khám phá dự án
          </button>
          <button className="btn-ghost" style={{ padding: '10px 18px', fontSize: '0.8rem' }} onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}>
            📋 Yêu cầu Demo
          </button>
        </motion.div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
          gap: 8,
          maxWidth: 900,
          margin: '0 auto 48px',
          padding: '0 10px',
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
            maxWidth: 940,
            margin: '0 auto',
          }}
        >
          {/* Floating Status card - repositioned for responsiveness */}
          <div className="system-status-badge" style={{
            position: 'absolute', 
            top: -65, right: '5%',
            background: 'var(--bg-surface)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border) ', borderRadius: 16,
            padding: '12px 16px', minWidth: 140,
            zIndex: 10,
            boxShadow: 'var(--shadow-card)',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>System Status</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--green)', lineHeight: 1 }}>
              99.2%
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} /> Efficient
            </div>
          </div>

          {/* Monitor frame */}
          <div className="monitor-frame" style={{
            background: 'var(--bg-surface)',
            borderRadius: 20,
            padding: '12px 12px 40px',
            border: '2px solid var(--glass-border-strong)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* Top bar dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, paddingLeft: 6 }}>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0, opacity: 0.8 }}>
                {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ 
                marginLeft: 'auto', fontSize: 'clamp(8px, 1.8vw, 11px)', color: 'var(--text-muted)', fontWeight: 600, 
                paddingRight: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '75%',
              }}>
                {IMAGES[activeImg].label} – Live Dashboard
              </div>
            </div>

            {/* Image Container with Transition */}
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={IMAGES[activeImg].src}
                  alt={IMAGES[activeImg].label}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Selector Tabs (Integrated in monitor) */}
            <div style={{
              position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 8, padding: '4px', background: 'rgba(0,0,0,0.4)',
              borderRadius: 30, backdropFilter: 'blur(10px)',
              zIndex: 10,
            }}>
              {IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(idx)}
                  style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: '0.65rem', fontWeight: 800,
                    background: activeImg === idx ? img.color : 'transparent',
                    color: activeImg === idx ? '#fff' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {img.id.toUpperCase()}
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
            <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.02em' }}>
              {t}
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
