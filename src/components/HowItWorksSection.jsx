import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'AI Fish Tracking (6 Ponds)',
    desc: 'Hệ thống AI xử lý 30 khung hình/giây giúp phân tích cùng lúc 6 ao nuôi cá Chẽm. Tự động nhận diện cá thể, đếm mật độ và phát hiện sớm các dấu hiệu dịch bệnh.',
    img: '/dashboard/db-fish.png',
    tags: ['YOLOv11', 'Real-time Analytics'],
    side: 'left'
  },
  {
    title: 'Ba yếu tố cốt lõi (Velocity - Trajectory - Density)',
    desc: 'Không chỉ là tracking, AI phân tích Quỹ đạo bơi, Vận tốc và Mật độ để đưa ra cảnh báo về stress hoặc nhu cầu oxy tức thì trong môi trường khắc nghiệt UAE.',
    img: '/dashboard/db-factors.png',
    tags: ['Kinetic Analysis', 'Stress Detection'],
    side: 'right'
  },
  {
    title: 'Thermal & Heatmap Analysis',
    desc: 'Theo dõi khu vực trồng rau thông qua bản đồ nhiệt và chỉ số NDVI. Giúp tối ưu hóa lượng nước tưới và phát hiện sớm hiện tượng héo lá do nhiệt độ cao vùng KEZAD.',
    img: '/dashboard/db-env.png',
    tags: ['NDVI Index', 'Precision Irrigation'],
    side: 'left'
  },
  {
    title: 'AI Health Score: 92%',
    desc: 'Chỉ số sức khỏe tổng thể được tính toán từ dữ liệu đa nguồn: Cá 94% và Rau 90%. AI tự động cân bằng dinh dưỡng giữa hai hệ thống cộng sinh.',
    img: '/dashboard/db-score.png',
    tags: ['Biometric Score', 'Yield Target'],
    side: 'right'
  },
  {
    title: 'Hỗ trợ ra quyết định (Apply/Skip)',
    desc: 'Hệ thống cung cấp các đề xuất can thiệp thông minh. Người vận hành chỉ cần "Một chạm" để thực thi hoặc bỏ qua, tối ưu hóa thời gian xử lý sự cố.',
    img: '/dashboard/db-actions.png',
    tags: ['Decision Support', 'One-Tap Action'],
    side: 'left'
  },
  {
    title: 'Năng lượng & Hiệu năng',
    desc: 'Theo dõi hiệu suất pin Solar và mức tiêu thụ năng lượng của hệ thống lọc. Đảm bảo trang trại hoạt động bền vững với hiệu suất tài nguyên lên tới 99.2%.',
    img: '/dashboard/db-stats.png',
    tags: ['Solar Efficiency', 'Resource Tracking'],
    side: 'right'
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-label">Hệ thống vận hành</div>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', fontWeight: 800, 
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 
          }}>
            Giải mã công nghệ{' '}
            <span className="text-gradient-green">Smart Farm</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 700, margin: '20px auto 0' }}>
            Chúng tôi đưa dữ liệu vào từng quyết định. Dashboard không chỉ là hình ảnh, nó là trí tuệ nhân tạo hỗ trợ sản xuất thực tế.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: 120 }}>
          {FEATURES.map((f, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: 60,
                flexWrap: 'wrap'
              }}
            >
              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ flex: '1 1 500px', position: 'relative' }}
              >
                <div style={{
                   position: 'absolute', inset: -20,
                   background: i % 2 === 0 ? 'var(--green-glow)' : 'var(--aqua-glow)',
                   borderRadius: '40px', opacity: 0.15, filter: 'blur(30px)',
                   zIndex: -1
                }} />
                <div className="monitor-frame" style={{ 
                  borderRadius: 20, overflow: 'hidden', border: '2px solid var(--glass-border-strong)',
                  boxShadow: 'var(--shadow-card)', background: '#000'
                }}>
                  <img src={f.img} alt={f.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </motion.div>

              {/* Text side */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ flex: '1 1 400px' }}
              >
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                   {f.tags.map((t, idx) => (
                     <span key={idx} style={{ 
                       padding: '4px 10px', background: 'var(--bg-card)', 
                       border: '1px solid var(--glass-border)', borderRadius: 20,
                       fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)',
                       textTransform: 'uppercase'
                     }}>
                       {t}
                     </span>
                   ))}
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: 20,
                  lineHeight: 1.2
                }}>
                  {f.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                  {f.desc}
                </p>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ width: 40, height: 1, background: 'var(--glass-border-strong)' }} />
                   <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--green)' }}>Precision Agriculture</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
