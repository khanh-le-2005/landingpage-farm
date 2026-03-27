import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardOverview = ({ filteredAssets }) => {
  const stats = [
    { label: 'Total HD Assets', value: '7', trend: 'Synced with PDF', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> },
    { label: 'System Health', value: '98%', trend: 'Optimal', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
    { label: 'Active Sensors', value: '142', trend: 'Online', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> },
    { label: 'AI Score', value: '92%', trend: 'High Performance', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="10"/><path d="M12 16h.01M12 8h.01M12 12h.01"/></svg> },
  ];

  const chartData = [
    { name: 'Mon', temp: 24, humidity: 65 },
    { name: 'Tue', temp: 26, humidity: 62 },
    { name: 'Wed', temp: 25, humidity: 68 },
    { name: 'Thu', temp: 27, humidity: 60 },
    { name: 'Fri', temp: 28, humidity: 58 },
    { name: 'Sat', temp: 26, humidity: 64 },
    { name: 'Sun', temp: 25, humidity: 66 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Administrator</h2>
          <p className="text-(--text-secondary) mt-1">Here's what's happening with your aquaponics system today.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-6 py-3 bg-green text-white rounded-2xl font-bold shadow-lg shadow-green/20 hover:scale-105 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          System Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-(--bg-card) border border-(--glass-border) rounded-3xl shadow-sm hover:shadow-xl hover:shadow-green/5 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="bg-(--bg-base) p-3 rounded-2xl border border-(--glass-border) group-hover:bg-green/5 group-hover:border-green/20 transition-colors">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green/10 text-green">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-(--text-muted) font-medium">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-(--bg-card) border border-(--glass-border) p-8 rounded-3xl">
            <h3 className="font-bold text-lg mb-8">System Metrics Analytics</h3>
            <div className="h-[350px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minHeight={320} minWidth={0}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00e676" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00e676" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#00e676" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-(--bg-card) border border-(--glass-border) rounded-3xl overflow-hidden">
            <div className="p-8 pb-4">
              <h3 className="font-bold text-lg">Recent HD Asset Activity</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-(--bg-base)/50 text-left border-y border-(--glass-border)">
                    <th className="px-8 py-4 text-xs font-bold text-(--text-muted) uppercase">Asset</th>
                    <th className="px-8 py-4 text-xs font-bold text-(--text-muted) uppercase">Type</th>
                    <th className="px-8 py-4 text-xs font-bold text-(--text-muted) uppercase">Date</th>
                    <th className="px-8 py-4 text-xs font-bold text-(--text-muted) uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--glass-border)">
                  {filteredAssets.slice(0, 5).map((item, i) => (
                    <tr key={i} className="hover:bg-(--bg-card-hover) transition-colors group">
                      <td className="px-8 py-4 flex items-center gap-4">
                        <img src={item.src} className="w-10 h-10 rounded-lg object-cover" alt="" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </td>
                      <td className="px-8 py-4">
                        <span className="px-2 py-1 rounded-md text-[10px] bg-green/10 text-green font-bold uppercase">{item.category}</span>
                      </td>
                      <td className="px-8 py-4 text-sm text-(--text-muted)">{item.date}</td>
                      <td className="px-8 py-4 text-right">
                        <button className="text-(--text-muted) hover:text-green">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-(--bg-card) border border-(--glass-border) p-8 rounded-3xl">
            <h3 className="font-bold text-lg mb-6">Device Status</h3>
            <div className="space-y-6">
              {[
                { name: 'Water Pump A', status: 'Active', color: 'bg-green' },
                { name: 'Sensor Array B', status: 'Warning', color: 'bg-orange-500' },
                { name: 'Oxygen Vent', status: 'Active', color: 'bg-green' },
                { name: 'Feeding System', status: 'Inactive', color: 'bg-red-500' },
              ].map((device, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${device.color}`}></div>
                    <span className="text-sm font-medium">{device.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-(--text-muted)">{device.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-linear-to-br from-green to-green-soft p-8 rounded-3xl text-white shadow-xl shadow-green/20">
            <h3 className="font-bold text-lg mb-4">AI Optimization</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">Efficiency increased by 15% due to automatic pH adjustments.</p>
            <button className="bg-white text-green font-bold text-xs px-4 py-2 rounded-lg">Apply Auto-Correct</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
