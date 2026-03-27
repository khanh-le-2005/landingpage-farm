import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function UIShowcaseSection() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const SLIDES = [
    { id: 1, src: '/anhHD/anh12.png',    label: t('hero.img1_label'),    d: t('hero.img1_desc') },
    { id: 2, src: '/anhHD/anhai2.png', label: t('hero.img2_label'),    d: t('hero.img2_desc') },
    { id: 3, src: '/anhHD/anhai3.png',    label: t('hero.img3_label'), d: t('hero.img3_desc') },
    { id: 4, src: '/anhHD/anh2.jpg',    label: t('hero.img4_label'),       d: t('hero.img4_desc') },
    { id: 5, src: '/anhHD/anhai1.png', label: t('hero.img5_label'),      d: t('hero.img5_desc') },
    { id: 6, src: '/anhHD/anh11.jpg',   label: t('hero.img6_label'),   d: t('hero.img6_desc') },
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section id="ui" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--color-aqua-glow)_100%)] opacity-50 pointer-events-none" />

      <div className="container-custom relative z-1">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-15 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label !text-gold !border-gold">
              {t('landing.ui.ux_label')}
            </div>
            <h2 className="font-heading font-extrabold text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.1] my-4 sm:my-5">
              "Desert High-Contrast"{' '}
              <span className="text-gradient-gold">{t('landing.ui.title')}</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-[1.05rem] leading-relaxed mb-8">
              {t('landing.ui.desc')}
            </p>

            <div className="grid gap-5">
              {[
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, title: t('landing.ui.f1_title'), desc: t('landing.ui.f1_desc') },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>, title: t('landing.ui.f2_title'), desc: t('landing.ui.f2_desc') },
                { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, title: t('landing.ui.f3_title'), desc: t('landing.ui.f3_desc') },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div 
                    className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center border bg-[var(--bg-card)] border-[var(--glass-border)]"
                    style={{ color: i === 0 ? '#FF4757' : (i === 1 ? 'var(--color-gold)' : 'var(--color-aqua)') }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[0.95rem] mb-0.5">{f.title}</div>
                    <div className="text-[var(--text-secondary)] text-[0.85rem] leading-[1.4]">{f.desc}</div>
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
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-[var(--glass-border-strong)] bg-[#0a0a0a]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full aspect-[16/10] flex items-center justify-center relative"
                >
                  <img 
                    src={SLIDES[activeSlide].src} 
                    alt={SLIDES[activeSlide].label} 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-10 bg-gradient-to-t from-black/80 to-transparent text-white text-[0.85rem] font-semibold">
                    {SLIDES[activeSlide].label}
                    <div className="text-[0.7rem] font-normal opacity-80 mt-1">{SLIDES[activeSlide].d}</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xl cursor-pointer z-10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous Slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xl cursor-pointer z-10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next Slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {SLIDES.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${activeSlide === i ? 'bg-[var(--color-gold)] w-6' : 'bg-[var(--glass-border-strong)]'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
