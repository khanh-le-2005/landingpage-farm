import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';



export default function HowItWorksSection() {
  const { t } = useTranslation();

  const TECHNICAL_SLIDES = [
    {
      id: 'zone0',
      zone: t('how.s0_zone'),
      title: t('how.s0_title'),
      image: '/anhHD/anh12.png',
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
      image: '/anhHD/anh16.png',
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
      image: '/anhHD/anh15.png',
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
      image: '/anhHD/anh13.png',
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
      image: '/anhHD/anh14.png',
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
      image: '/anhHD/anh8.jpg',
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
    <section id="tech" className="section bg-[var(--bg-base)] relative">
      <div className="container-custom">
        <div className="text-center max-w-[800px] mx-auto mb-20">
          <div className="section-label">{t('how.label')}</div>
          <h2 className="font-heading font-extrabold text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] my-4 sm:my-6">
            {t('how.title1')}{' '}
            <span className="text-gradient-green">{t('how.title2')}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-[1.1rem] leading-relaxed">
            {t('how.desc')}
          </p>
        </div>

        <div className="grid gap-20 sm:gap-30">
          {TECHNICAL_SLIDES.map((slide, index) => (
            <div 
              key={slide.id}
              className={`grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-15 items-center ${index % 2 === 0 ? 'direction-ltr' : 'lg:flex-row-reverse flex-col'}`}
              style={{ direction: index % 2 === 0 ? 'ltr' : 'rtl' }}
            >
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ direction: 'ltr' }}
              >
                <div 
                  className="monitor-frame !p-1 rounded-[20px] shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-[var(--glass-border-strong)]"
                  style={{ background: slide.color }}
                >
                  <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden aspect-[16/10] flex items-center justify-center border border-[#1a1a1a]">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-contain"
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
                <div 
                  className="inline-block px-3 py-1.5 rounded-lg text-[0.8rem] font-extrabold uppercase tracking-widest mb-4 border"
                  style={{ background: `${slide.color}26`, color: slide.color, borderColor: `${slide.color}54` }}
                >
                  {slide.zone}
                </div>
                <h3 className="font-heading font-extrabold text-[1.8rem] mb-5 text-[var(--text-primary)]">
                  {slide.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-7.5">
                  {slide.description}
                </p>

                <div className="grid gap-5">
                  {slide.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div 
                        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" 
                        style={{ background: slide.color, boxShadow: `0 0 10px ${slide.color}` }}
                      />
                      <div>
                        <div className="font-extrabold text-[0.9rem] text-[var(--text-primary)] mb-1">
                          {detail.label}
                        </div>
                        <div className="text-[var(--text-muted)] text-[0.85rem] leading-relaxed">
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
