import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FooterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSent(true); }
  };

  return (
    <footer id="footer" className="relative overflow-hidden pt-30 pb-15 bg-[var(--bg-surface)]">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_50%_0%,var(--color-green-glow)_0%,transparent_70%)]" />

      <div className="container-custom relative z-1">
        {/* Final CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[800px] mx-auto mb-20"
        >
          <div className="section-label mb-6 mx-auto">{t('landing.footer.cta_label')}</div>
          <h2 className="font-heading font-extrabold text-[clamp(2.2rem,6vw,3.6rem)] leading-none mb-5">
            {t('landing.footer.cta_title_part1')}{' '}
            <span className="text-gradient-green">AI Aquaponics</span>{' '}
            {t('landing.footer.cta_title_part2')}
          </h2>
          <p className="text-[var(--text-secondary)] text-[1.15rem] leading-relaxed mb-10 max-w-[640px] mx-auto">
            {t('landing.footer.cta_desc')}
          </p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-[520px] mx-auto mb-8 flex-wrap justify-center">
              <input
                type="email"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-[260px] px-6 py-4 rounded-full bg-[var(--bg-card)] border border-[var(--glass-border-strong)] text-[var(--text-primary)] text-base outline-none focus:border-[var(--color-green)] transition-all"
              />
              <button type="submit" className="btn-primary flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                {t('landing.footer.request_demo')}
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="section-label !text-green !border-green flex items-center gap-2 px-8 py-4 mx-auto text-base"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
               {t('landing.footer.received')}
            </motion.div>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-ghost flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
               {t('landing.footer.tech_docs')}
            </button>
            <button className="btn-ghost flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
               {t('landing.footer.consulting')}
            </button>
          </div>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 py-15 border-t border-[var(--glass-border)] mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="nav-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green"><path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17"/></svg>
              </div>
              <span className="font-heading font-extrabold text-[1.2rem]">
                Farm Aquaponics
              </span>
            </div>
            <p className="text-[var(--text-muted)] text-[0.9rem] leading-relaxed">
              {t('landing.footer.brand_desc')}
            </p>
          </div>

          {[
            {
              title: t('landing.footer.col_system'),
              links: ['Zone 0 - Environment', 'Zone 1 - Visual AI', 'Zone 2 - Life Support', 'Zone 3 - Resources']
            },
            {
              title: t('landing.footer.col_tech'),
              links: ['Deep Learning YOLOv11', 'Thermal AI Scan', 'MQTT Real-time', 'TEC Water Recovery']
            },
            {
              title: t('landing.footer.col_info'),
              links: ['KEZAD, Abu Dhabi', t('landing.footer.info_area'), t('landing.footer.info_yield'), '24/7 Monitoring']
            }
          ].map((col, idx) => (
            <div key={idx}>
              <div className="font-extrabold text-[0.8rem] mb-6 text-[var(--text-primary)] uppercase tracking-widest">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link, i) => (
                  <li key={i} className="text-[var(--text-muted)] text-[0.85rem]">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-8 border-t border-[var(--glass-border)] flex-wrap gap-5">
          <div className="text-[0.8rem] text-[var(--text-muted)]">
            {t('landing.footer.copy')}
          </div>
          <div className="flex gap-2">
            {['English', 'Tiếng Việt', 'Arabic'].map((lang, i) => (
              <span key={i} className={`text-[0.75rem] cursor-pointer ${i === 1 ? 'text-green font-bold' : 'text-[var(--text-muted)]'}`}>{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
