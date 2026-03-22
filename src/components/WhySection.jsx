import { motion } from 'framer-motion';

const PROBLEMS = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    problem: 'Cảm biến truyền thống chậm',
    solution: 'Camera AI 30fps phát hiện sự cố trước 30–60 giây',
    color: 'var(--green)',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    problem: 'Lãng phí nước & năng lượng',
    solution: 'TEC Recovery tái sử dụng 65% nước, Solar tự cân bằng',
    color: 'var(--aqua)',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v8a2 2 0 0 0 2 2h8"/><path d="M2 10V2a2 2 0 0 1 2-2h8"/><path d="M7 21a5 5 0 0 0 10 0"/><circle cx="12" cy="13" r="3"/></svg>,
    problem: 'Chẩn đoán bệnh thủ công',
    solution: 'AI YOLOv11 + CNN tự động phân loại, cảnh báo tức thì',
    color: 'var(--gold)',
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    problem: 'Dữ liệu phân tán, khó tổng hợp',
    solution: 'Dashboard tập trung toàn bộ 4 khu vực, cập nhật 3 giây',
    color: 'var(--green)',
  },
];

export default function WhySection() {
  return (
    <section id="why" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bg-gradient-radial" style={{ top: '20%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, var(--aqua-glow) 0%, transparent 70%)' }} />

      <div className="container">
        <div className="why-layout">
          <div className="why-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-label">Tại sao chọn chúng tôi</div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            lineHeight: 1.1, marginBottom: 20,
            maxWidth: 700,
          }}
        >
          Vấn đề{' '}
          <span className="text-gradient-green">chúng tôi đã giải quyết</span>
        </motion.h2>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 600, marginBottom: 60 }}>
          Nông nghiệp truyền thống tại vùng sa mạc gặp rất nhiều thách thức. Hệ thống của chúng tôi giải quyết từng vấn đề bằng AI và IoT.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {PROBLEMS.map((item, i) => (
            <motion.div
              key={i}
              className="glass-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ padding: '32px', position: 'relative' }}
            >
              <div style={{ color: item.color, marginBottom: 20 }}>{item.icon}</div>
              
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 50,
                  background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)',
                  fontSize: '0.7rem', fontWeight: 800, color: '#FF4757', marginBottom: 12, textTransform: 'uppercase'
                }}>
                  Vấn đề hiện tại
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {item.problem}
                </div>
              </div>

              <div>
                <div style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 50,
                  background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
                  fontSize: '0.7rem', fontWeight: 800, color: item.color, marginBottom: 12, textTransform: 'uppercase'
                }}>
                  Giải pháp Smart Farm
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.5 }}>
                  {item.solution}
                </div>
              </div>
            </motion.div>
          ))}
            </div>
          </div>
          
          <div className="why-image-wrapper">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', inset: -20, background: 'var(--aqua-glow)',
                filter: 'blur(40px)', opacity: 0.5, borderRadius: '50%', zIndex: 0
              }} />
              <img 
                src="/anhHD/anh7.jpg" 
                alt="Smart Farm Technical Overview" 
                style={{ 
                  position: 'relative', zIndex: 1,
                  width: '100%', height: 'auto', 
                  borderRadius: 24, 
                  border: '1px solid var(--glass-border)', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  objectFit: 'cover'
                }} 
              />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .why-layout {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .why-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .why-layout {
            flex-direction: row;
            align-items: center;
            gap: 60px;
          }
          .why-content {
            flex: 1.2;
          }
          .why-image-wrapper {
            flex: 0.8;
          }
        }
      `}</style>
    </section>
  );
}
