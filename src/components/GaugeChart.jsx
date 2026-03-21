import {
  RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';

export default function GaugeChart({
  value = 0, min = 0, max = 100,
  unit = '', label = '', size = 120,
  color = '#10B981',
  showValue = true,
  fontSize = 22,
}) {
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const angleFill = pct * 240; // 240 degree sweep
  const data = [{ value: pct * 100 }];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <div style={{ position: 'relative', width: size, height: size * 0.75 }}>
        <RadialBarChart
          width={size} height={size}
          cx={size / 2} cy={size / 2}
          innerRadius={size * 0.34} outerRadius={size * 0.48}
          startAngle={210} endAngle={-30}
          data={data}
          style={{ overflow: 'visible' }}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          {/* Track */}
          <RadialBar
            background={{ fill: '#E2E8F0' }}
            dataKey="value"
            cornerRadius={8}
            fill={color}
            angleAxisId={0}
          />
        </RadialBarChart>
        {showValue && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: size * 0.12,
          }}>
            <span style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700,
              fontSize,
              color: '#1E293B',
              lineHeight: 1,
            }}>
              {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : value}
            </span>
            {unit && (
              <span style={{ fontSize: size * 0.11, color: '#64748B', fontWeight: 500 }}>{unit}</span>
            )}
          </div>
        )}
      </div>
      {label && (
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500, textAlign: 'center' }}>
          {label}
        </span>
      )}
    </div>
  );
}
