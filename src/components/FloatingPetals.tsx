import { useMemo } from 'react';

const COLORS = ['#ffb6d5', '#ff9dc6', '#f9c2dd', '#f4c463', '#e2c9ff'];

export default function FloatingPetals({ count = 16, slow = false }: { count?: number; slow?: boolean }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        duration: 11 + Math.random() * 9,
        delay: -Math.random() * 14,
        size: 9 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="anim-fall absolute top-[-40px] rounded-[60%_0_60%_0]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDuration: `${slow ? p.duration * 1.4 : p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}