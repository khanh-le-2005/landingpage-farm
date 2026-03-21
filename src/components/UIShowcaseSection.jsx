import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SLIDES = [
  { id: 1, src: '/dashboard-zone1.png', label: 'Zone 1: AI Analysis' },
  { id: 2, src: '/dashboard-zone2.png', label: 'Zone 2: Energy & Yield' },
  { id: 3, src: '/dashboard-zone3.png', label: 'Zone 3: Core Control' },
];

export default function UIShowcaseSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section id="ui" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bg-gradient-radial" style={{ inset: 0, background: 'linear-gradient(180deg, transparent 0%, var(--aqua-glow) 100%)', opacity: 0.5 }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label" style={{ color: 'var(--gold)', borderColor: 'var(--gold)' }}>
              Trải nghiệm người dùng
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', lineHeight: 1.1,
              margin: '16px 0 20px',
            }}>
              "Desert High-Contrast"{' '}
              <span className="text-gradient-gold">Visual Mode</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 32 }}>
              Được thiết kế riêng cho môi trường <strong style={{color:'var(--text-primary)'}}>cường độ ánh sáng mạnh</strong> vùng Abu Dhabi. Chống chói, độ tương phản cực cao, tối ưu cho Tablet công nghiệp.
            </p>

            <div style={{ display: 'grid', gap: 20 }}>
              {[
                { icon: '🔴', title: 'Hệ thống cảnh báo thông minh', desc: 'Tự động đẩy các chỉ số nguy cấp lên đầu bảng điều khiển.' },
                { icon: '🎯', title: 'Thao tác một chạm', desc: 'Các nút điều khiển lớn, tối ưu cho việc đeo găng tay kỹ thuật.' },
                { icon: '📱', title: 'Tablet First', desc: 'Layout 100% responsive, hoạt động ổn định kể cả khi mất mạng tạm thời.' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ 
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{f.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Carousel Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '4px solid var(--glass-border-strong)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ width: '100%', aspectRatio: '16/10' }}
                >
                  <img 
                    src={SLIDES[activeSlide].src} 
                    alt={SLIDES[activeSlide].label} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '24px 20px 15px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                  }}>
                    {SLIDES[activeSlide].label}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                style={{
                  position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
                }}
              >
                ←
              </button>
              <button 
                onClick={nextSlide}
                style={{
                  position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
                }}
              >
                →
              </button>
            </div>

            {/* Slider Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              {SLIDES.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveSlide(i)}
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: activeSlide === i ? 'var(--gold)' : 'var(--glass-border-strong)',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
