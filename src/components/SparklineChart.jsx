import {
  AreaChart, Area, ResponsiveContainer, Tooltip,
} from 'recharts';

export default function SparklineChart({ data = [], dataKey = 'v', color = '#10B981', height = 50, showTooltip = false }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#spark-${color.replace('#', '')})`}
          dot={false}
          activeDot={showTooltip ? { r: 3, fill: color } : false}
          isAnimationActive={false}
        />
        {showTooltip && <Tooltip contentStyle={{ fontSize: '0.72rem', padding: '4px 8px' }} />}
      </AreaChart>
    </ResponsiveContainer>
  );
}
