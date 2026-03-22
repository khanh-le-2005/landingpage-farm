import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSent(true); }
  };

  return (
    <footer id="footer" style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 60, background: 'var(--bg-surface)' }}>
      {/* Top glow */}
      <div className="bg-gradient-radial" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 300, background: 'radial-gradient(ellipse at 50% 0%, var(--green-glow) 0%, transparent 70%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Final CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 auto 80px',
          }}
        >
          <div className="section-label" style={{ marginBottom: 24 }}>Hành động ngay hôm nay</div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 6vw, 3.6rem)', lineHeight: 1,
            marginBottom: 20,
          }}>
            Sẵn sàng đem{' '}
            <span className="text-gradient-green">AI Aquaponics</span>{' '}
            vào dự án của bạn?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: 40, maxWidth: 640, margin: '0 auto 40px' }}>
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ triển khai giải pháp IoT thông minh cho mọi quy mô dự án.
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} style={{
              display: 'flex', gap: 12, maxWidth: 520, margin: '0 auto 32px', flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <input
                type="email"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1, minWidth: 260, padding: '16px 24px', borderRadius: 50,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--glass-border-strong)',
                  color: 'var(--text-primary)', fontSize: '1rem',
                  outline: 'none', transition: 'all 0.3s'
                }}
              />
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                Yêu cầu Demo
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="section-label" 
              style={{ display:'flex', alignItems:'center', gap:8, padding: '16px 32px', color: 'var(--green)', fontSize: '1rem', borderColor: 'var(--green)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Chúng tôi đã nhận được! Sẽ phản hồi trong 24h.
            </motion.div>
          )}

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              Tài liệu kỹ thuật
            </button>
            <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Tư vấn giải pháp
            </button>
          </div>
        </motion.div>

        {/* Info grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 40, padding: '60px 0',
          borderTop: '1px solid var(--glass-border)',
          marginBottom: 40,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div className="nav-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--green)'}}><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem' }}>
                Farm Aquaponics
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Hệ thống giám sát nông nghiệp thông minh tiên phong tại KEZAD, Abu Dhabi. Tích hợp AI & IoT Deep Learning.
            </p>
          </div>

          {[
            {
              title: 'Hệ thống',
              links: ['Zone 0 - Environment', 'Zone 1 - Visual AI', 'Zone 2 - Life Support', 'Zone 3 - Resources']
            },
            {
              title: 'Công nghệ',
              links: ['Deep Learning YOLOv11', 'Thermal AI Scan', 'MQTT Real-time', 'TEC Water Recovery']
            },
            {
              title: 'Thông tin',
              links: ['KEZAD, Abu Dhabi', '1,500 m² Tổng diện tích', 'Sản lượng 20 tấn/năm', '24/7 Monitoring']
            }
          ].map((col, idx) => (
            <div key={idx}>
              <div style={{ fontWeight: 800, fontSize: '0.8rem', marginBottom: 24, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((link, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 32, borderTop: '1px solid var(--glass-border)',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 Smart Farm Aquaponics · KEZAD Project
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['English', 'Tiếng Việt', 'Arabic'].map((lang, i) => (
              <span key={i} style={{ fontSize: '0.75rem', color: i === 1 ? 'var(--green)' : 'var(--text-muted)', fontWeight: i === 1 ? 700 : 400, cursor: 'pointer' }}>{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
