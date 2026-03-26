import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Individual Bento card
// Individual Bento card
function BentoCard({ children, col = 1, row = 1, color = 'var(--color-green)', style = {}, delay = 0 }) {
  const colSpan = col === 2 ? 'col-span-2' : 'col-span-1';
  const rowSpan = row === 2 ? 'row-span-2' : 'row-span-1';

  return (
    <motion.div
      className={`glass-card !p-6 relative overflow-hidden ${colSpan} ${rowSpan} max-[1024px]:col-span-2 max-[640px]:col-span-1`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minHeight: row > 1 ? 400 : 200,
        ...style,
      }}
    >
      <div 
        className="absolute -top-10 -right-10 w-[140px] h-[140px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}26 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
      {children}
    </motion.div>
  );
}

function Tag({ text, color }) {
  return (
    <span 
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.68rem] font-extrabold tracking-widest uppercase"
      style={{ background: `${color}26`, border: `1px solid ${color}4D`, color }}
    >
      {text}
    </span>
  );
}

function MiniGauge({ value = 75, color = 'var(--color-green)', label = '', size = 70 }) {
  const r = 24; const circ = 2 * Math.PI * r;
  const pct = value / 100;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} viewBox="0 0 60 60">
        <circle cx={30} cy={30} r={r} fill="none" stroke="var(--glass-border)" strokeWidth={6} />
        <circle cx={30} cy={30} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round" transform="rotate(-90 30 30)"
          className="transition-[stroke-dashoffset] duration-1000 ease-out" />
        <text x={30} y={35} textAnchor="middle" fontSize={11} fontWeight={800}
          fill="var(--text-primary)" className="font-heading">{value}%</text>
      </svg>
      {label && <span className="text-[0.65rem] text-[var(--text-muted)] font-semibold">{label}</span>}
    </div>
  );
}

export default function BentoGridSection() {
  const { t } = useTranslation();
  return (
    <section id="tech" className="section relative">
      <div className="container-custom">
        <motion.div
           initial={{ opacity: 0, y: 16 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-14"
        >
          <div className="section-label">{t('landing.bento.label')}</div>
          <h2 className="font-heading font-extrabold text-[clamp(2.2rem,5vw,3rem)] leading-[1.1] mb-4">
            {t('landing.bento.title_part1')}{' '}
            <span className="text-gradient-gold">{t('landing.bento.title_part2')}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-[1.1rem] max-w-[600px] leading-[1.7]">
            {t('landing.bento.desc')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 gap-4">
          
          <BentoCard col={2} color="var(--color-aqua)" delay={0}>
            <div className="mb-4">
              <Tag text="Zone 0" color="var(--color-aqua)" />
              <h3 className="flex items-center gap-2.5 font-heading text-[1.4rem] font-bold mt-3 mb-1.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.89V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.11a2 2 0 0 0-1.29-1.88L13 9a2 2 0 0 0-2 0l-5.71 1.88A2 2 0 0 0 4 14.89z"/><path d="M12 2v7"/><path d="M8.5 2.5l3.5 1.5 3.5-1.5"/></svg>
                Environment Manager
              </h3>
              <p className="text-[var(--text-secondary)] text-[0.875rem] leading-relaxed">
                {t('landing.bento.zone0_desc')}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Water', v: '26.4°C' },
                { label: 'Salinity', v: '15.2ppt' },
                { label: 'Flow', v: '420L/h' },
              ].map((s, i) => (
                <div key={i} className="bg-[var(--bg-card)] rounded-xl p-2.5 border border-[var(--glass-border)]">
                  <div className="text-[0.65rem] text-[var(--text-muted)] mb-0.5">{s.label}</div>
                  <div className="font-bold text-base text-aqua">{s.v}</div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard col={2} color="var(--color-green)" delay={0.05}>
            <Tag text="Zone 1 – Fish" color="var(--color-green)" />
            <h3 className="flex items-center gap-2.5 font-heading text-[1.4rem] font-bold mt-3 mb-1.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              AI Fish Tracking
            </h3>
            <p className="text-[var(--text-secondary)] text-[0.875rem] leading-relaxed mb-3.5">
              {t('landing.bento.zone1_fish_desc')}
            </p>
            <div className="flex justify-around items-center">
              <MiniGauge value={87} color="var(--color-green)" label="Health" />
              <MiniGauge value={72} color="var(--color-aqua)" label="Density" />
              <MiniGauge value={92} color="var(--color-gold)" label="AI Score" />
            </div>
          </BentoCard>

          <BentoCard col={2} row={2} color="var(--color-aqua)" delay={0.1}>
            <Tag text="Zone 2 – Biology" color="var(--color-aqua)" />
            <h3 className="flex items-center gap-2.5 font-heading text-[1.4rem] font-bold mt-3 mb-1.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Life Support Hub
            </h3>
            <p className="text-[var(--text-secondary)] text-[0.875rem] leading-relaxed mb-4">
              {t('landing.bento.zone2_desc')}
            </p>
            <div className="flex flex-col gap-3">
              <div className="bg-[var(--bg-card)] p-3.5 rounded-xl border border-[var(--glass-border)]">
                <div className="text-[0.75rem] font-bold text-green mb-2">🐟 Aquatic System</div>
                <div className="flex justify-between text-[0.8rem]">
                  <span className="text-[var(--text-muted)]">DO Level</span>
                  <span className="font-bold">6.5 mg/L</span>
                </div>
                <div className="flex justify-between text-[0.8rem] mt-1">
                  <span className="text-[var(--text-muted)]">Ammonia</span>
                  <span className="font-bold">0.01 ppm</span>
                </div>
              </div>
              <div className="bg-[var(--bg-card)] p-3.5 rounded-xl border border-[var(--glass-border)]">
                <div className="text-[0.75rem] font-bold text-gold mb-2">🌱 Terrestrial System</div>
                <div className="flex justify-between text-[0.8rem]">
                  <span className="text-[var(--text-muted)]">Nitrate</span>
                  <span className="font-bold">45 ppm</span>
                </div>
                <div className="flex justify-between text-[0.8rem] mt-1">
                  <span className="text-[var(--text-muted)]">Salinity</span>
                  <span className="font-bold">15.1 ppt</span>
                </div>
              </div>
              <div className="p-3.5 bg-aqua/20 rounded-xl text-[0.8rem] text-[var(--text-primary)]">
                <strong>🤖 {t('landing.bento.ai_rec')}:</strong> {t('landing.bento.ai_rec_desc')}
              </div>
            </div>
          </BentoCard>

          <BentoCard col={2} color="var(--color-gold)" delay={0.15}>
            <Tag text="Zone 1 – Plants" color="var(--color-gold)" />
            <h3 className="flex items-center gap-2.5 font-heading text-[1.4rem] font-bold mt-3 mb-1.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Thermal AI Analysis
            </h3>
            <p className="text-[var(--text-secondary)] text-[0.875rem] leading-relaxed mb-4">
              {t('landing.bento.zone1_plants_desc')}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="text-[0.8rem] p-2 border-l-3 border-gold bg-[var(--bg-card)]">
                <div className="text-[var(--text-muted)] text-[0.7rem]">NDVI Index</div>
                <div className="font-bold">0.82 Stable</div>
              </div>
              <div className="text-[0.8rem] p-2 border-l-3 border-green bg-[var(--bg-card)]">
                <div className="text-[var(--text-muted)] text-[0.7rem]">Health Score</div>
                <div className="font-bold">96% Optimal</div>
              </div>
            </div>
          </BentoCard>

          <BentoCard col={1} color="var(--color-aqua)" delay={0.2}>
            <Tag text="Resources" color="var(--color-aqua)" />
            <h4 className="text-base font-bold mt-2.5">Water Tank</h4>
            <div className="text-center my-2.5">
              <MiniGauge value={75} color="var(--color-aqua)" size={70} />
            </div>
            <div className="text-[0.7rem] text-[var(--text-muted)] text-center">3,000L Buffer Tank</div>
          </BentoCard>

          <BentoCard col={1} color="var(--color-gold)" delay={0.25}>
            <Tag text="Power" color="var(--color-gold)" />
            <h4 className="text-base font-bold mt-2.5">Solar SoC</h4>
            <div className="text-center my-2.5">
              <MiniGauge value={85} color="var(--color-gold)" size={70} />
            </div>
            <div className="text-[0.7rem] text-[var(--text-muted)] text-center">Battery Backup</div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
