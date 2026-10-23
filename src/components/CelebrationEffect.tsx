import { useMemo } from 'react';
import type { CSSProperties } from 'react';

const COLORS = ['#ff9dc6', '#ff5d92', '#f4c463', '#c9a7ff', '#ffd9b9', '#ffffff'];
const GLYPHS = ['💗', '💖', '🌸', '✨', '💞'];

export default function CelebrationEffect({ active }: { active: boolean }) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 46 }, () => ({
        left: Math.random() * 100,
        duration: 2.4 + Math.random() * 2.6,
        delay: Math.random() * 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 7 + Math.random() * 8,
      })),
    [],
  );

  const burst = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 18;
        return {
          tx: Math.cos(angle) * (90 + Math.random() * 110),
          ty: Math.sin(angle) * (70 + Math.random() * 100),
          rot: `${Math.random() * 360}deg`,
          glyph: GLYPHS[i % GLYPHS.length],
          delay: Math.random() * 0.18,
        };
      }),
    [],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      {confetti.map((c, i) => (
        <span
          key={`c-${i}`}
          className="anim-conf absolute top-[-24px] rounded-[3px]"
          style={{
            left: `${c.left}%`,
            background: c.color,
            width: `${c.width}px`,
            height: '14px',
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
      {burst.map((b, i) => (
        <span
          key={`b-${i}`}
          className="anim-burst absolute left-1/2 top-[42%] text-[22px]"
          style={
            {
              '--tx': `${b.tx}px`,
              '--ty': `${b.ty}px`,
              '--rot': b.rot,
              animationDelay: `${b.delay}s`,
            } as CSSProperties
          }
        >
          {b.glyph}
        </span>
      ))}
    </div>
  );
}