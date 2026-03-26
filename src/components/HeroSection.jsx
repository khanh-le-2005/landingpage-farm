import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';

  const { t } = useTranslation();
  const TICKER = t('hero.ticker', { returnObjects: true }) || [];

function StatCard({ value, unit, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card text-center px-2 py-3 flex-1 min-w-[85px]"
    >
      <div
        className="font-heading font-extrabold text-[clamp(1rem,3.5vw,1.8rem)] leading-none mb-0.5"
        style={{ color }}
      >
        {value}<span className="text-[0.7rem] font-medium ml-0.5 text-[var(--text-muted)]">{unit}</span>
      </div>
      <div className="text-[0.55rem] text-[var(--text-muted)] font-bold uppercase tracking-tight">{label}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  const [activeImg, setActiveImg] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Trạng thái dừng khi hover

  const IMAGES = [
    { id: '1', src: '/anhHD/anh1.jpg', label: t('hero.img1_label'), color: 'var(--color-green)', d: t('hero.img1_desc') },
    { id: '2', src: '/anhHD/anhai2.png', label: t('hero.img2_label'), color: 'var(--color-aqua)', d: t('hero.img2_desc') },
    { id: '3', src: '/anhHD/anhai3.png', label: t('hero.img3_label'), color: 'var(--color-gold)', d: t('hero.img3_desc') },
    { id: '4', src: '/anhHD/anh9.jpg', label: t('hero.img4_label'), color: 'var(--color-green)', d: t('hero.img4_desc') },
    { id: '5', src: '/anhHD/anhai1.png', label: t('hero.img5_label'), color: 'var(--color-aqua)', d: t('hero.img5_desc') },
    { id: '6', src: '/anhHD/anh11.jpg', label: t('hero.img6_label'), color: 'var(--color-gold)', d: t('hero.img6_desc') },
  ];

  // Logic Auto-play
  const nextImg = useCallback(() => {
    setActiveImg((prev) => (prev + 1) % IMAGES.length);
  }, [IMAGES.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextImg();
    }, 4000); // Chuyển ảnh mỗi 3 giây
    return () => clearInterval(timer);
  }, [nextImg, isPaused]);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden pt-[120px] pb-[80px] h-fit"
    >
      {/* Background glow effects */}
      <div className="absolute top-[15%] left-[10%] w-[min(500px,80vw)] h-[min(500px,80vw)] rounded-full blur-[80px] pointer-events-none -z-10 bg-[radial-gradient(circle,var(--color-green-glow)_0%,transparent_70%)]" />
      <div className="absolute top-[30%] right-[8%] w-[min(400px,70vw)] h-[min(400px,70vw)] rounded-full blur-[80px] pointer-events-none -z-10 bg-[radial-gradient(circle,var(--color-aqua-glow)_0%,transparent_70%)]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--glass-border)_1px,transparent_1px),linear-gradient(90deg,var(--glass-border)_1px,transparent_1px)] bg-[length:80px_80px] pointer-events-none opacity-50" />

      <div className="container-custom relative z-1 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <div className="section-label !text-[clamp(0.6rem,2vw,0.75rem)] !px-3 !py-1.5 flex items-center gap-2">
            <span className="w-1.75 h-1.75 rounded-full bg-green animate-[pulse-glow_2s_ease-in-out_infinite] inline-block" />
            {t('hero.badge')}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold text-[clamp(1.4rem,8vw,3.8rem)] leading-[1.1] tracking-[-0.02em] mb-4 max-w-[900px] mx-auto px-2.5"
        >
          {t('hero.title')}<br />
          <span className="text-gradient-green text-[0.6em] block mt-2">{t('hero.subtitle')}</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[clamp(0.9rem,2.5vw,1.25rem)] text-[var(--text-secondary)] leading-normal max-w-[800px] mx-auto mb-8 px-5 font-medium"
        >
          <Trans i18nKey="hero.description" components={{ 1: <strong className="text-[var(--text-primary)]" />, 2: <strong className="text-green" /> }} />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex gap-3 justify-center flex-wrap mb-10"
        >
          <button className="btn-primary !px-4.5 !py-2.5" onClick={() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('hero.cta_discover')}
          </button>
          <button className="btn-ghost !px-4.5 !py-2.5" onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('hero.cta_demo')}
          </button>
        </motion.div>

        {/* Stats row */}
        <div className="hero-stats-grid grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-[900px] mx-auto mb-12 px-5">
          <StatCard value="1,500" unit="m²" label={t('hero.stat_area')} color="var(--color-green)" delay={0.5} />
          <StatCard value="1,000" unit="m²" label={t('hero.stat_greenhouse')} color="var(--color-aqua)" delay={0.55} />
          <StatCard value="30" unit="fps" label={t('hero.stat_camera')} color="var(--color-gold)" delay={0.6} />
          <StatCard value="92" unit="%" label={t('hero.stat_score')} color="var(--color-green)" delay={0.65} />
          <StatCard value="24/7" unit="" label={t('hero.stat_monitoring')} color="var(--color-aqua)" delay={0.7} />
        </div>
      </div>

      {/* --- MONITOR MOCKUP (CHIẾM ~80% WIDTH) --- */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[80vw] mx-auto h-fit" // Chiếm 80% màn hình, chiều cao vừa đủ
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Floating Status card */}
        <div className="absolute -top-[30px] right-[8%] bg-[var(--bg-surface)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl px-5 py-3 z-10 shadow-2xl text-left hidden sm:block">
          <div className="text-[0.6rem] text-[var(--text-muted)] uppercase font-black mb-1">{t('hero.system_load')}</div>
          <div className="font-heading font-black text-2xl text-green leading-none">99.2%</div>
          <div className="text-[0.6rem] text-green flex items-center gap-1.5 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" /> {t('hero.ai_processing')}
          </div>
        </div>

        {/* Monitor frame */}
        <div className="monitor-frame bg-[#0a0a0a] rounded-[2rem] p-2 sm:p-3 border-[3px] border-[var(--glass-border-strong)] shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative z-2 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2 opacity-50">
            <div className="flex gap-1.5">
              {['#FF5F57', '#FFBD2E', '#28CA41'].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
              {IMAGES[activeImg].label}
            </div>
            <div className="w-10" />
          </div>

          {/* Screen Content */}
          <div className="relative rounded-xl overflow-hidden bg-black h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="w-full h-auto flex"
              >
                <img
                  src={IMAGES[activeImg].src}
                  alt={IMAGES[activeImg].label}
                  className="w-full h-auto object-cover max-h-[75vh]" // Lấp đầy bề ngang, chiều cao tự động theo tỉ lệ ảnh
                />
                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-left">
                  <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                    <p className="text-white text-sm font-bold tracking-wide italic">{IMAGES[activeImg].d}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selector Dots (Hòa quyện vào khung) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full border-none cursor-pointer ${activeImg === idx ? 'bg-green w-8' : 'bg-white/20 w-3 hover:bg-white/40'}`}
              />
            ))}
          </div>

          {/* Auto-play Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
            <motion.div
              key={activeImg}
              initial={{ width: 0 }}
              animate={{ width: isPaused ? 'inherit' : '100%' }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-green/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Ticker strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/5 py-3 overflow-hidden">
        <div className="flex gap-15 whitespace-nowrap animate-[ticker-move_40s_linear_infinite]">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="text-[0.7rem] text-white/40 font-black flex items-center gap-2 uppercase tracking-widest">
              <span className="text-green text-lg">•</span> {t}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}