import { useState, useEffect, useRef } from 'react';

// Generate realistic random value within range with smooth drift
function drift(current, min, max, step) {
  const change = (Math.random() - 0.5) * 2 * step;
  return Math.min(max, Math.max(min, +(current + change).toFixed(2)));
}

function randInRange(min, max, decimals = 1) {
  return +(Math.random() * (max - min) + min).toFixed(decimals);
}

// Initial state
const initial = {
  // === ZONE 0: Environment ===
  waterTemp: 26.4,
  salinity: 15.2,
  humidity: 68,
  deltaPressure: 8.5,          // < 7 triggers alert
  flowRateMain: 420,
  flowRateBio:  310,
  flowRateGrow: 290,
  airTempGreenhouse: 32.1,

  // === ZONE 1: Visual Health - Fish ===
  fishVelocity: 0.82,
  fishDensity: 15,
  fishTrajectory: 12,
  fishHealthScore: 87,
  predictiveInsight: Array.from({ length: 20 }, (_, i) => ({
    x: i, v: randInRange(0.6, 1.1)
  })),
  cameraStatuses: [
    { id: 1, status: 'normal', label: 'Tank A' },
    { id: 2, status: 'alert',  label: 'Tank B' },
    { id: 3, status: 'normal', label: 'Tank C' },
    { id: 4, status: 'normal', label: 'Tank D' },
    { id: 5, status: 'alert',  label: 'Tank E' },
    { id: 6, status: 'normal', label: 'Tank F' },
  ],

  // === ZONE 1: Visual Health - Plants (Thermal AI) ===
  aiScore: 92,
  plantMetrics: [
    { label: 'Healthy',       value: 92, pctRight: 80,  status: 'success', color: '#10B981' },
    { label: 'NDVI',          value: 37, pctRight: 35,  status: 'warning', color: '#F59E0B' },
    { label: 'Dead Spots',    value: 17, pctRight: 60,  status: 'warning', color: '#F59E0B' },
    { label: 'Yellow/Orange', value: 41, pctRight: 60,  status: 'warning', color: '#F59E0B' },
    { label: 'Issues',        value: 13, pctRight: null, status: 'danger',  color: '#EF4444' },
    { label: 'Multicommy',    value: 92, pctRight: 90,  status: 'success', color: '#10B981' },
  ],

  // === ZONE 2: Aquatic ===
  do: 6.5,              // mg/L, critical < 5
  airPressure: 101.3,   // kPa
  waterTempRAS: 27.2,
  ammonia: 0.5,         // ppm, critical > 1.5
  nitrite: 0.02,        // ppm
  positivePressure: 15, // Dbar
  deltaT: 0.2,
  ballValveOpen: true,
  conductivity: Array.from({ length: 20 }, (_, i) => ({ x: i, v: randInRange(180, 320) })),

  // === ZONE 2: Terrestrial ===
  nitrateHourly: [
    { hour: '14:00', v: 45 },
    { hour: '15:00', v: 52 },
    { hour: '16:00', v: 48 },
    { hour: '17:00', v: 61 },
    { hour: '18:00', v: 55 },
  ],
  ec: 2.5,              // mS/cm
  dripPressure: 2.0,
  substrateHumidity: 60,
  internalHumidity: 70,
  leafTemp: 25,
  salinitySoil: 15,     // ppt
  salinityTrend: Array.from({ length: 20 }, (_, i) => ({ x: i, v: randInRange(12, 18) })),

  // === ZONE 3: Energy ===
  energyData: [
    { label: 'Hr 1', gen: 90, use: 25 },
    { label: 'Hr 2', gen: 22, use: 18 },
    { label: 'Hr 3', gen: 32, use: 55 },
    { label: 'Hr 4', gen: 18, use: 16 },
    { label: 'Hr 5', gen: 16, use: 14 },
  ],
  batterySoC: 85,
  energyDelta: 15,
  alertStatus: 'normal',  // 'normal' | 'warning' | 'critical'

  // === ZONE 3: Water ===
  bufferTankPct: 75,
  tecRecovery: 65,
  waterSourcingRatio: 65,
  tecTasks: [
    { name: 'Flush Drum Filter', completed: true, amount: '500L' },
    { name: 'Neutralize Sludge',  completed: true, amount: '300L' },
    { name: 'RO Pre-filter Flush',  completed: false, amount: '200L' },
  ],

  // === ZONE 3: Yield ===
  biomassData: Array.from({ length: 12 }, (_, i) => ({
    day: `D${(i + 1) * 10}`,
    density: +(1.2 + i * 0.14 + Math.random() * 0.1).toFixed(2),
  })),
  totalFeed: 450,
  fishWeight: 3200,
  plantDensity: 2.5,
  fcrStatus: 'normal',
  fcrAlert: 'FCR Normal – Fish & Plants are developing within the expected cycle.',
};

export function useIoTData() {
  const [data, setData] = useState(initial);
  const dataRef = useRef(data);
  dataRef.current = data;

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const d = prev;
        const deltaP = drift(d.deltaPressure, 4, 12, 0.3);
        const doVal  = drift(d.do, 4.0, 9.0, 0.2);
        const amm    = drift(d.ammonia, 0.1, 2.0, 0.08);

        // Append new sparkline point
        const appendPoint = (arr, minV, maxV) => {
          const next = [...arr.slice(-19), { x: arr[arr.length - 1].x + 1, v: randInRange(minV, maxV) }];
          return next;
        };

        return {
          ...d,
          deltaPressure: deltaP,
          waterTemp: drift(d.waterTemp, 24, 30, 0.2),
          salinity: drift(d.salinity, 12, 20, 0.15),
          humidity: Math.round(drift(d.humidity, 55, 85, 1.5)),
          flowRateMain: Math.round(drift(d.flowRateMain, 350, 500, 10)),
          flowRateBio:  Math.round(drift(d.flowRateBio,  250, 380, 8)),
          flowRateGrow: Math.round(drift(d.flowRateGrow, 230, 340, 8)),
          airTempGreenhouse: drift(d.airTempGreenhouse, 28, 38, 0.3),

          fishVelocity: drift(d.fishVelocity, 0.4, 1.5, 0.05),
          fishDensity: Math.round(drift(d.fishDensity, 10, 22, 0.5)),
          fishTrajectory: Math.round(drift(d.fishTrajectory, 8, 18, 0.8)),
          predictiveInsight: appendPoint(d.predictiveInsight, 0.6, 1.1),

          do: doVal,
          airPressure: drift(d.airPressure, 99, 104, 0.15),
          waterTempRAS: drift(d.waterTempRAS, 24, 30, 0.2),
          ammonia: amm,
          nitrite: drift(d.nitrite, 0.01, 0.08, 0.005),
          positivePressure: Math.round(drift(d.positivePressure, 10, 20, 0.5)),
          deltaT: drift(d.deltaT, 0.1, 0.5, 0.03),
          conductivity: appendPoint(d.conductivity, 180, 320),
          ballValveOpen: Math.random() > 0.97 ? !d.ballValveOpen : d.ballValveOpen,

          ec: drift(d.ec, 1.5, 4.0, 0.05),
          dripPressure: drift(d.dripPressure, 1.5, 3.0, 0.05),
          substrateHumidity: Math.round(drift(d.substrateHumidity, 45, 80, 2)),
          internalHumidity: Math.round(drift(d.internalHumidity, 55, 85, 2)),
          leafTemp: drift(d.leafTemp, 22, 30, 0.2),
          salinitySoil: drift(d.salinitySoil, 10, 22, 0.2),
          salinityTrend: appendPoint(d.salinityTrend, 12, 18),

          batterySoC: Math.min(100, Math.max(10, Math.round(drift(d.batterySoC, 20, 100, 1.5)))),
          bufferTankPct: Math.min(100, Math.max(10, Math.round(drift(d.bufferTankPct, 30, 95, 2)))),

          // Derived status
          alertStatus: doVal < 5 || amm > 1.5 ? 'critical' : deltaP < 7 ? 'warning' : 'normal',
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
