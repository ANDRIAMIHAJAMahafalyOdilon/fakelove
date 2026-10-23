import { useMemo } from 'react';

const COLORS = ['#ffb6d5', '#e6c9ff', '#ffd9b9'];

export default function Butterflies({ count = 3 }: { count?: number }) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: 14 + i * 30,
        top: 18 + i * 22,
        duration: 16 + i * 6,
        delay: -i * 5,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {flies.map((f, i) => (
        <div
          key={i}
          className="anim-fly absolute"
          style={{ left: `${f.left}%`, top: `${f.top}%`, animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}
        >
          <svg width="34" height="26" viewBox="0 0 40 30">
            <g fill={f.color} opacity=".9">
              <ellipse className="anim-wing" cx="13" cy="12" rx="11" ry="8" />
              <ellipse className="anim-wing" cx="27" cy="12" rx="11" ry="8" />
              <ellipse className="anim-wing" cx="14" cy="21" rx="7" ry="5" />
              <ellipse className="anim-wing" cx="26" cy="21" rx="7" ry="5" />
            </g>
            <rect x="19" y="8" width="2" height="15" rx="1" fill="#8d6d79" />
          </svg>
        </div>
      ))}
    </div>
  );
}