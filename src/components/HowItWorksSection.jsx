import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';



export default function HowItWorksSection() {
  const { t } = useTranslation();

  const TECHNICAL_SLIDES = [
    {
      id: 'zone0',
      zone: t('how.s0_zone'),
      title: t('how.s0_title'),
      image: '/anhHD/anh1.jpg',
      description: t('how.s0_desc'),
      details: [
        { label: t('how.s0_d0_lbl'), text: t('how.s0_d0_txt') },
        { label: t('how.s0_d1_lbl'), text: t('how.s0_d1_txt') },
        { label: t('how.s0_d2_lbl'), text: t('how.s0_d2_txt') }
      ],
      color: 'var(--aqua)'
    },
    {
      id: 'zone1-fish',
      zone: t('how.s1_zone'),
      title: t('how.s1_title'),
      image: '/anhHD/anh2.jpg',
      description: t('how.s1_desc'),
      details: [
        { label: t('how.s1_d0_lbl'), text: t('how.s1_d0_txt') },
        { label: t('how.s1_d1_lbl'), text: t('how.s1_d1_txt') },
        { label: t('how.s1_d2_lbl'), text: t('how.s1_d2_txt') }
      ],
      color: 'var(--green)'
    },
    {
      id: 'zone1-plants',
      zone: t('how.s2_zone'),
      title: t('how.s2_title'),
      image: '/anhHD/anhai3.png',
      description: t('how.s2_desc'),
      details: [
        { label: t('how.s2_d0_lbl'), text: t('how.s2_d0_txt') },
        { label: t('how.s2_d1_lbl'), text: t('how.s2_d1_txt') },
        { label: t('how.s2_d2_lbl'), text: t('how.s2_d2_txt') }
      ],
      color: 'var(--gold)'
    },
    {
      id: 'zone2-core',
      zone: t('how.s3_zone'),
      title: t('how.s3_title'),
      image: '/anhHD/anh9.jpg',
      description: t('how.s3_desc'),
      details: [
        { label: t('how.s3_d0_lbl'), text: t('how.s3_d0_txt') },
        { label: t('how.s3_d1_lbl'), text: t('how.s3_d1_txt') },
        { label: t('how.s3_d2_lbl'), text: t('how.s3_d2_txt') }
      ],
      color: 'var(--aqua)'
    },
    {
      id: 'predictive',
      zone: t('how.s4_zone'),
      title: t('how.s4_title'),
      image: '/anhHD/anhai1.png',
      description: t('how.s4_desc'),
      details: [
        { label: t('how.s4_d0_lbl'), text: t('how.s4_d0_txt') },
        { label: t('how.s4_d1_lbl'), text: t('how.s4_d1_txt') },
        { label: t('how.s4_d2_lbl'), text: t('how.s4_d2_txt') }
      ],
      color: 'var(--green)'
    },
    {
      id: 'zone3-efficiency',
      zone: t('how.s5_zone'),
      title: t('how.s5_title'),
      image: '/anhHD/anh11.jpg',
      description: t('how.s5_desc'),
      details: [
        { label: t('how.s5_d0_lbl'), text: t('how.s5_d0_txt') },
        { label: t('how.s5_d1_lbl'), text: t('how.s5_d1_txt') },
        { label: t('how.s5_d2_lbl'), text: t('how.s5_d2_txt') }
      ],
      color: 'var(--gold)'
    }
  ];

  return (
    <section id="tech" className="section" style={{ background: 'var(--bg-base)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 80px' }}>
          <div className="section-label">{t('how.label')}</div>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', fontWeight: 800, 
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, margin: '16px 0 24px' 
          }}>
            {t('how.title1')}{' '}
            <span className="text-gradient-green">{t('how.title2')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {t('how.desc')}
          </p>
        </div>

        <div style={{ display: 'grid', gap: 120 }}>
          {TECHNICAL_SLIDES.map((slide, index) => (
            <div 
              key={slide.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 60,
                alignItems: 'center',
                direction: index % 2 === 0 ? 'ltr' : 'rtl'
              }}
            >
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ direction: 'ltr' }}
              >
                <div className="monitor-frame" style={{
                  background: slide.color,
                  padding: '4px',
                  borderRadius: 20,
                  boxShadow: `0 30px 60px ${slide.color}22`,
                  border: '1px solid var(--glass-border-strong)'
                }}>
                  <div style={{
                    background: '#0a0a0a',
                    borderRadius: 16,
                    overflow: 'hidden',
                    aspectRatio: '16/10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #1a1a1a'
                  }}>
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ direction: 'ltr' }}
              >
                <div style={{ 
                  display: 'inline-block', padding: '6px 12px', borderRadius: 8, 
                  background: `${slide.color}15`, color: slide.color, 
                  fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', 
                  letterSpacing: '0.1em', marginBottom: 16, border: `1px solid ${slide.color}33`
                }}>
                  {slide.zone}
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)', fontWeight: 800, 
                  fontSize: '1.8rem', marginBottom: 20 , color: 'var(--text-primary)'
                }}>
                  {slide.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 30 }}>
                  {slide.description}
                </p>

                <div style={{ display: 'grid', gap: 20 }}>
                  {slide.details.map((detail, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 16 }}>
                      <div style={{ 
                        width: 10, height: 10, borderRadius: '50%', background: slide.color, 
                        marginTop: 6, flexShrink: 0, boxShadow: `0 0 10px ${slide.color}`
                      }} />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                          {detail.label}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                          {detail.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
