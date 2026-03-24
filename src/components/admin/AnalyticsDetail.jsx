const AnalyticsDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-(--bg-card) border border-(--glass-border) rounded-3xl border-dashed">
      <div className="w-16 h-16 bg-linear-to-br from-green/20 to-green-soft/20 rounded-full flex items-center justify-center text-green mb-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
      </div>
      <h3 className="text-xl font-bold text-(--text-primary)">Full Analytics Engine</h3>
      <p className="text-(--text-muted) text-center max-w-sm mt-2">Deep learning and predictive modeling data integration in progress.</p>
    </div>
  );
};

export default AnalyticsDetail;
