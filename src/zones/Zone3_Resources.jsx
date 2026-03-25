import { motion } from 'framer-motion';
import GaugeChart from '../components/GaugeChart';
import {
  BarChart, Bar, XAxis, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line,
} from 'recharts';

function BatterySoC({ value }) {
  const color = value > 50 ? '#10B981' : value > 20 ? '#F59E0B' : '#EF4444';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span className="text-[12px] font-black text-(--text-primary)">Thanh trạng thái Pin (Battery SoC)</span>
      </div>
      <div className="progress-bar-wrap relative" style={{ height: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          className="progress-bar-fill flex items-center justify-center font-black text-xs"
          style={{
            height: '100%',
            width: `${value}%`,
            background: color,
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: `0 0 10px ${color}88`,
            color: '#000'
          }}
        >
          {value}%
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        borderRadius: 12,
        background: 'transparent',
      }}
    >
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{task.name}</span>
      <span style={{
        fontSize: '0.8rem', fontWeight: 600,
        color: 'var(--text-primary)',
      }}>
        [Đã hoàn thành - {task.amount}]
      </span>
    </motion.div>
  );
}

export default function Zone3_Resources({ data }) {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 8 }}>
        <h2 className="text-2xl font-black text-(--text-primary) tracking-tighter">
          Dashboard Area 3: NĂNG LƯỢNG & HIỆU QUẢ
        </h2>
      </motion.div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ===== COL 1: ENERGY ===== */}
        <motion.div className="glass-card bg-(--dashboard-bg-card)" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div className="text-center w-full">
            <span className="text-2xl font-black text-(--text-primary) uppercase tracking-tighter">NĂNG LƯỢNG</span>
            <div className="text-sm text-(--text-primary)">(Power Balance)</div>
          </div>

          <div className="mt-2">
            <div className="text-center mb-4">
               <span className="text-xs font-bold text-(--text-primary) leading-relaxed block">Biểu đồ Cột kép thống kê theo giờ (Energy Bar Chart per)<br/>hiển thị 5 giờ gần đây nhất</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data.energyData} margin={{ top: 10, right: 0, bottom: 0, left: -25 }}>
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'var(--text-primary)', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: '10px', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', border: 'none', color: '#fff' }} />
                <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }} formatter={(value) => <span className="text-(--text-primary) font-bold">{value === 'gen' ? 'Thu được' : 'Tiêu thụ'}</span>} />
                <Bar dataKey="gen" fill="#38BDF8" radius={[2,2,0,0]} name="Thu được" />
                <Bar dataKey="use" fill="#EF4444" radius={[2,2,0,0]} name="Tiêu thụ" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-right">
                <span className="text-xs font-black text-(--text-primary)">Delta (Δ): <span className="text-(--text-primary)">+{data.energyDelta}</span></span>
            </div>
          </div>

          <div className="border-t border-(--dashboard-stroke) pt-6 pb-2">
            <BatterySoC value={data.batterySoC} />
          </div>

          {/* Smart Alert Solar */}
          <div className="pt-2">
             <span className="text-[14px] font-bold text-(--text-primary) block mb-2">Hệ cảnh báo thông minh:</span>
             <div className="flex gap-3 mb-2">
               <div className="text-2xl text-amber-500">⚠️</div>
               <div className="text-xs font-bold leading-relaxed text-(--text-primary)">
                 Biểu tượng [!]: Tam giác vàng xuất hiện khi hiệu suất Solar giảm &gt;15% so với cùng kỳ bức xạ hôm qua.
               </div>
             </div>
             <div className="text-xs leading-relaxed font-bold text-(--text-primary)">
                Status Ticker:<br/>
                Hiệu suất giảm 18% do bụi cát - Tự động kích hoạt Robot vệ sinh Dry-Cleaning
             </div>
          </div>
        </motion.div>

        {/* ===== COL 2: QUẢN TRỊ NƯỚC ===== */}
        <motion.div className="glass-card bg-(--dashboard-bg-card)" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div className="text-center w-full">
            <span className="text-2xl font-black text-(--text-primary) uppercase tracking-tighter">QUẢN TRỊ NƯỚC</span>
            <div className="text-sm text-(--text-primary)">(Water Governance)</div>
          </div>

          <div className="flex flex-col items-center justify-center pt-2">
            <div className="text-center mb-2 mt-2">
              <span className="text-sm font-bold text-(--text-primary)">Buffer Tank</span>
              <span className="text-2xl font-black block mt-1 text-(--text-primary)">3,000L</span>
            </div>
            <GaugeChart value={data.bufferTankPct} size={190} color="#38BDF8" showValue={true} />
          </div>

          <div className="text-xs font-bold leading-relaxed">
            <span className="text-(--text-primary) block">Khả năng thu hồi (TEC Recovery):</span>
            <span className="text-(--text-primary)">Hôm nay (L/h) so với hôm qua (+5%)</span>
          </div>

          <div className="text-xs font-bold leading-relaxed mt-1">
            <span className="text-(--text-primary) block">Hiệu quả sourcing (Water Sourcing Ratio):</span>
            <span className="text-(--text-primary)">Thu hồi (65%) / Tiêu thụ (100%), RO sử dụng (35%)</span>
          </div>

          {/* TEC Task Manager */}
          <div className="mt-4">
             <div className="text-center text-sm font-bold mb-4">TEC Task Manager</div>
             <div className="flex justify-between text-[11px] font-black text-(--text-primary) px-4 mb-2">
               <span>Name</span>
               <span>Completed</span>
             </div>
             <div className="flex flex-col border-t border-(--dashboard-stroke) pt-2">
               {data.tecTasks.map((t, i) => <TaskRow key={i} task={t} index={i} />)}
             </div>
          </div>
        </motion.div>

        {/* ===== COL 3: YIELD & FCR ===== */}
        <motion.div className="glass-card bg-(--dashboard-bg-card)" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div className="text-center w-full">
            <span className="text-2xl font-black text-(--text-primary) uppercase tracking-tighter">DỰ BÁO SẢN LƯỢNG</span>
            <div className="text-sm text-(--text-primary)">(Yield & FCR)</div>
          </div>

          <div className="mt-2">
             <span className="text-sm font-bold text-(--text-primary)">Biomass Monitor</span>
             <div className="mt-2 mb-1 flex justify-end text-[10px] text-(--text-primary)">Plant Density (/m)</div>
             <div className="custom-chart h-32 w-full relative border-t border-b border-l border-(--dashboard-stroke) p-3">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={data.biomassData}>
                     <Line type="monotone" dataKey="density" stroke="#38BDF8" strokeWidth={2} dot={false} />
                     <XAxis dataKey="time" hide />
                     <Tooltip contentStyle={{ background: '#000', border: 'none', borderRadius: 8, fontSize: '10px', color: '#fff' }} />
                   </LineChart>
                </ResponsiveContainer>
                {/* Y-Axis mock labels based on image */}
                <div className="absolute left-[-25px] top-0 text-[10px] text-(--text-primary) flex flex-col justify-between h-full py-1 z-10">
                  <span>26%</span><span>23%</span><span>18%</span><span>12%</span><span className="opacity-0">0</span>
                </div>
                {/* X-Axis labels based on image */}
                <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-[10px] text-(--text-primary)">
                  <span>0</span><span>100</span><span>240</span><span>150</span><span>12100</span>
                </div>
             </div>
             <div className="text-xs font-bold mt-8 leading-relaxed text-(--text-primary)">
               Tổng thức ăn: {data.totalFeed} kg / Trọng lượng cá: {data.fishWeight} kg / <br/>Mật độ rau: {data.plantDensity || 2.5} kg/m2
             </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
             <span className="text-green text-sm">▼</span>
             <span className="text-sm font-bold text-green">Trạng thái ổn định</span>
          </div>

          {/* FCR Alerts */}
          <div className="mt-2">
            <span className="text-[14px] font-bold block mb-3 text-(--text-primary)">FCR Alerts</span>
            <div className="flex gap-3 mb-4">
               <div className="text-3xl text-amber-500">⚠️</div>
               <div className="text-[11px] leading-relaxed font-bold text-(--text-primary)">
                 Cảnh báo [!]: Tam giác vàng xuất hiện khi FCR vọt lên (Cá ăn nhiều nhưng không tăng trọng tương ứng hoặc thức ăn bị lãng phí).
               </div>
            </div>
            <div className="text-[11px] font-bold leading-relaxed text-(--text-primary)">
               Phân tích AI: {data.fcrAlert}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

