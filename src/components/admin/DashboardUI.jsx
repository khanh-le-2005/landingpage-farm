import { motion } from 'framer-motion';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-(--bg-card) border border-(--glass-border) rounded-[2.5rem] p-6 flex flex-col relative overflow-hidden transition-all duration-500 hover:bg-(--bg-card-hover) hover:border-(--glass-border-strong) ${className}`}>
    <div className="absolute top-0 right-0 p-3 opacity-[0.2]">
      <div className="w-1.5 h-1.5 rounded-full bg-(--text-primary) mb-2" />
      <div className="w-1.5 h-1.5 rounded-full bg-(--text-primary) opacity-40 ml-3" />
    </div>
    {children}
  </div>
);

export const CardHeader = ({ title, subTitle }) => (
  <div className="flex flex-col mb-4 relative z-10">
    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-(--text-primary) leading-none mb-1">{title}</h4>
    {subTitle && <span className="text-xs font-black text-(--text-muted) uppercase tracking-[0.2em] italic">{subTitle}</span>}
  </div>
);

export const VisualGauge = ({ value, unit, type, orange, small }) => {
  if (type === 'circle') return (
    <div className="flex-1 flex flex-col items-center justify-center scale-90">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--dashboard-stroke)" strokeWidth="8" strokeLinecap="round" />
          <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#69bf64" strokeWidth="10" strokeLinecap="round" strokeDasharray="282" initial={{ strokeDashoffset: 282 }} animate={{ strokeDashoffset: 282 - (75 * 2.82) }} transition={{ duration: 2 }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black italic tracking-tighter text-(--text-primary)">{value}</span>
          <span className="text-xs font-black text-(--text-muted) uppercase mt-1">{unit}</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className={`flex-1 flex flex-col items-center justify-center ${small ? 'scale-75' : 'pt-2'}`}>
      <div className="relative w-36 h-28">
        <svg className="w-full h-full" viewBox="0 0 100 60">
          <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="var(--dashboard-stroke)" strokeWidth={small ? '12' : '10'} strokeLinecap="round" />
          <motion.line x1="50" y1="55" x2="50" y2="15" stroke={orange ? '#f97316' : 'var(--text-primary)'} strokeWidth="3" strokeLinecap="round" initial={{ rotate: -90 }} animate={{ rotate: 10 }} transition={{ duration: 1.5, type: "spring" }} style={{ originX: '50px', originY: '55px' }} />
        </svg>
        <div className="flex flex-col items-center mt-[-10px]">
          <span className={`${small ? 'text-2xl' : 'text-[2.2rem]'} font-black tracking-tighter italic text-(--text-primary)`}>{value}</span>
          <span className="text-xs font-black text-(--text-muted) uppercase tracking-widest">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export const Thermometer = ({ value }) => (
  <div className="h-28 w-10 bg-black/5 rounded-full relative p-1.5 border border-(--dashboard-stroke)">
    <motion.div initial={{ height: 0 }} animate={{ height: '65%' }} transition={{ duration: 2 }} className="absolute bottom-1.5 left-1.5 right-1.5 bg-green rounded-full shadow-[0_0_20px_rgba(105,191,100,0.4)]" />
    {[...Array(5)].map((_, i) => <div key={i} className="absolute left-[-4px] right-[-4px] h-px bg-(--dashboard-stroke)" style={{ top: `${20 * i}%` }} />)}
  </div>
);

export const IndicatorIcon = ({ type, className = "" }) => {
  if (type === 'drop') return <svg width="22" height="22" viewBox="0 0 24 24" fill="#69bf64" className={className}><path d="M12 21.5c-4.14 0-7.5-3.36-7.5-7.5 0-4.14 7.5-12.5 7.5-12.5s7.5 8.36 7.5 12.5c0 4.14-3.36 7.5-7.5 7.5z" /></svg>;
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="#69bf64" className={className}><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="6" fill="currentColor" /></svg>;
};

export const ProgressBar = ({ val, display, unit, icon }) => (
  <div className="flex-1 flex flex-col justify-center gap-4 px-4">
    <div className="relative h-2 w-full bg-black/5 rounded-full overflow-hidden border border-(--dashboard-stroke)">
      <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1.5 }} className="h-full bg-green" />
    </div>
    <div className="flex items-center justify-end gap-3 translate-y-2 text-2xl font-black italic text-(--text-primary)">
      <IndicatorIcon type={icon} className="translate-y-[-2px]" /> {display} <span className="text-sm font-bold text-(--text-muted) uppercase">{unit}</span>
    </div>
  </div>
);

export const BigValue = ({ val, unit }) => (
  <div className="flex items-center">
    <span className="text-[4rem] font-black leading-none italic tracking-tighter text-(--text-primary)">{val}</span>
    <span className="text-2xl font-bold text-(--text-muted) ml-2 mt-2">{unit}</span>
  </div>
);
