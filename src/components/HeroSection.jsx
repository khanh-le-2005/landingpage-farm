import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const TICKER = [
  'Waves · 99.2% Efficiency',
  'Vision · 30 FPS · YOLOv11',
  'Sprout · Salicornia NDVI Analysis',
  'Battery · Solar Energy Balanced',
  'Droplets · TEC Water Recovery',
  'Thermometer · Climate Control',
  'Cpu · 24/7 Autonomous Monitoring',
];



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

  const IMAGES = [
    { id: '1', src: '/anhHD/anh1.jpg',    label: t('hero.img1_label'), color: 'var(--color-green)', d: t('hero.img1_desc') },
    { id: '2', src: '/anhHD/anhai2.png',  label: t('hero.img2_label'), color: 'var(--color-aqua)',  d: t('hero.img2_desc') },
    { id: '3', src: '/anhHD/anhai3.png',    label: t('hero.img3_label'), color: 'var(--color-gold)',  d: t('hero.img3_desc') },
    { id: '4', src: '/anhHD/anh2.jpg',    label: t('hero.img4_label'), color: 'var(--color-green)', d: t('hero.img4_desc') },
    { id: '5', src: '/anhHD/anhai1.png',  label: t('hero.img5_label'), color: 'var(--color-aqua)',  d: t('hero.img5_desc') },
    { id: '6', src: '/anhHD/anh11.jpg',   label: t('hero.img6_label'), color: 'var(--color-gold)',  d: t('hero.img6_desc') },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[70px] pb-[60px]"
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
          className="font-heading font-extrabold text-[clamp(1.4rem,8vw,3.8rem)] leading-[1.1] tracking-[-0.02em] mb-4 max-w-[900px] mx-auto px-2.5 overflow-anywhere"
        >
          {t('hero.title')}<br/>
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
          <button 
            className="btn-primary !px-4.5 !py-2.5 !text-[0.8rem] flex items-center gap-2" 
            onClick={() => document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            {t('hero.cta_discover')}
          </button>
          <button 
            className="btn-ghost !px-4.5 !py-2.5 !text-[0.8rem] flex items-center gap-2" 
            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            {t('hero.cta_demo')}
          </button>
        </motion.div>

        {/* Stats row */}
        <div className="hero-stats-grid grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] max-[480px]:grid-cols-2 gap-3 max-w-[900px] mx-auto mb-12 px-5">
          <StatCard value="1,500" unit="m²"  label={t('hero.stat_area')}    color="var(--color-green)"  delay={0.5} />
          <StatCard value="1,000" unit="m²"  label={t('hero.stat_greenhouse')} color="var(--color-aqua)"   delay={0.55} />
          <StatCard value="30"    unit="fps" label={t('hero.stat_camera')}  color="var(--color-gold)"   delay={0.6} />
          <StatCard value="92"    unit="%"   label={t('hero.stat_score')}   color="var(--color-green)"  delay={0.65} />
          <StatCard value="24/7"  unit=""    label={t('hero.stat_monitoring')} color="var(--color-aqua)"  delay={0.7} />
        </div>

        {/* Multi-Image Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[980px] mx-auto w-full"
        >
          {/* Floating Status card */}
          <div className="status-badge-mobile-adjust absolute -top-[45px] right-[5%] max-sm:relative max-sm:top-[-20px] max-sm:right-auto max-sm:left-[10px] max-sm:mb-5 max-sm:w-fit bg-[var(--bg-surface)] backdrop-blur-[20px] border border-[var(--glass-border)] rounded-2xl px-4 py-2.5 min-w-[140px] z-10 shadow-card text-left">
            <div className="text-[0.55rem] text-[var(--text-muted)] mb-0.5">System Status</div>
            <div className="font-heading font-bold text-xl text-green leading-none">
              99.2%
            </div>
            <div className="text-[0.55rem] text-green flex items-center gap-1 mt-1">
              <span className="w-1.25 h-1.25 rounded-full bg-green" /> AI Efficiency
            </div>
          </div>

          {/* Monitor frame */}
          <div className="monitor-frame bg-[var(--bg-surface)] rounded-2xl px-2.5 pt-2.5 pb-9 sm:pb-6.5 border-2 border-[var(--glass-border-strong)] shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative z-2 w-full box-border">
            {/* Top bar dots */}
            <div className="flex items-center gap-1.5 mb-2.5 pl-1.5">
              <div className="flex gap-1.25 shrink-0 opacity-80">
                {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
                  <div key={i} className="w-2.25 h-2.25 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="ml-auto text-[clamp(7px,1.6vw,10px)] text-[var(--text-muted)] font-bold pr-2.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[75%] uppercase tracking-wider">
                {IMAGES[activeImg].label}
              </div>
            </div>

            {/* Image Container with Transition */}
            <div className="relative rounded-md overflow-hidden bg-black aspect-[16/10] max-h-[70vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <img
                    src={IMAGES[activeImg].src}
                    alt={IMAGES[activeImg].label}
                    className="w-full h-full object-contain"
                  />
                  {/* Subtle caption overlay for more context */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent)] text-white text-[0.7rem] text-left font-medium">
                    {IMAGES[activeImg].d}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector Tabs (Integrated in monitor) */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 p-[3px] bg-black/50 rounded-full backdrop-blur-md z-10 max-w-[94%] overflow-x-auto scrollbar-none">
              {IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(idx)}
                  className={`px-2.5 py-1 rounded-full text-[0.55rem] font-extrabold transition-all duration-300 whitespace-nowrap border-none cursor-pointer ${activeImg === idx ? 'text-white' : 'text-white/60'}`}
                  style={{ background: activeImg === idx ? img.color : 'transparent' }}
                >
                  {img.id}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ticker strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-surface)] border-t border-[var(--glass-border)] py-2.5 overflow-hidden">
        <div className="flex gap-15 whitespace-nowrap animate-[ticker-move_40s_linear_infinite]">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="text-[0.72rem] text-[var(--text-secondary)] font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <span className="text-green text-xl">•</span> {t}
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
