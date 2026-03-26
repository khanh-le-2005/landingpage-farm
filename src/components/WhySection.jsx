import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function WhySection() {
  const { t } = useTranslation();
  const PROBLEMS = [
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      problem: t('landing.why.p1_prob'),
      solution: t('landing.why.p1_sol'),
      color: 'var(--green)',
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
      problem: t('landing.why.p2_prob'),
      solution: t('landing.why.p2_sol'),
      color: 'var(--aqua)',
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v8a2 2 0 0 0 2 2h8"/><path d="M2 10V2a2 2 0 0 1 2-2h8"/><path d="M7 21a5 5 0 0 0 10 0"/><circle cx="12" cy="13" r="3"/></svg>,
      problem: t('landing.why.p3_prob'),
      solution: t('landing.why.p3_sol'),
      color: 'var(--gold)',
    },
    {
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
      problem: t('landing.why.p4_prob'),
      solution: t('landing.why.p4_sol'),
      color: 'var(--green)',
    },
  ];
  return (
    <section id="why" className="section relative overflow-hidden">
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none -z-10 bg-[radial-gradient(circle,var(--color-aqua-glow)_0%,transparent_70%)]" />

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-15">
          <div className="flex-[1.2]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label">{t('landing.why.label')}</div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-heading font-extrabold text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] mb-5 max-w-[700px]"
            >
              {t('landing.why.title_part1')}{' '}
              <span className="text-gradient-green">{t('landing.why.title_part2')}</span>
            </motion.h2>

            <p className="text-[var(--text-secondary)] text-[1.1rem] leading-[1.7] max-w-[600px] mb-15">
              {t('landing.why.desc')}
            </p>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
              {PROBLEMS.map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card !p-8 relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="mb-5" style={{ color: item.color }}>{item.icon}</div>
                  
                  <div className="mb-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FF4757]/10 border border-[#FF4757]/20 text-[0.7rem] font-extrabold text-[#FF4757] mb-3 uppercase tracking-wider">
                      {t('landing.why.current_problem')}
                    </div>
                    <div className="text-[0.95rem] text-[var(--text-secondary)] font-medium">
                      {item.problem}
                    </div>
                  </div>

                  <div>
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-[0.7rem] font-extrabold mb-3 uppercase tracking-wider"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}33`, color: item.color }}
                    >
                      {t('landing.why.smart_farm_solution')}
                    </div>
                    <div className="text-[1rem] text-[var(--text-primary)] font-bold leading-normal">
                      {item.solution}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex-[0.8] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-[-20px] bg-[var(--color-aqua-glow)] blur-[40px] opacity-50 rounded-full -z-10" />
              <img 
                src="/anhHD/anh7.jpg" 
                alt="Smart Farm Technical Overview" 
                className="relative z-1 w-full h-auto rounded-3xl border border-[var(--glass-border)] shadow-[0_20px_40px_rgba(0,0,0,0.4)] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
