import React from 'react';

const WIDTH = 600;
const HEIGHT = 180;
const PAD_X = 12;
const PAD_TOP = 24;

/** Builds a smooth cubic-bezier line through evenly-spaced points. */
function buildSmoothLine(points) {
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function RevenueWaveChart({ byDay, maxDayRevenue, formatPrice }) {
  const n = byDay.length;
  const usableWidth = WIDTH - PAD_X * 2;
  const usableHeight = HEIGHT - PAD_TOP;

  const points = byDay.map((d, i) => ({
    x: PAD_X + (n === 1 ? usableWidth / 2 : (i / (n - 1)) * usableWidth),
    y: PAD_TOP + usableHeight - (d.revenue / maxDayRevenue) * usableHeight,
    ...d
  }));

  const linePath = buildSmoothLine(points);
  const areaPath = `${linePath} L ${points[n - 1].x} ${HEIGHT} L ${points[0].x} ${HEIGHT} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="revenueWaveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff3f6c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ff3f6c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#revenueWaveFill)" />
        <path d={linePath} fill="none" stroke="#ff3f6c" strokeWidth="2.5" strokeLinecap="round" />
        {points.map((p) => (
          <circle key={p.date} cx={p.x} cy={p.y} r="3.5" fill="#ff3f6c" stroke="white" strokeWidth="1.5">
            <title>{`${p.date}: ${formatPrice(p.revenue)}`}</title>
          </circle>
        ))}
      </svg>
      <div className="flex justify-between text-[9px] text-gray-400 mt-1 px-1">
        {byDay.map((d) => (
          <span key={d.date}>{d.date}</span>
        ))}
      </div>
    </div>
  );
}
