import { useMemo } from 'react';

const GLYPHS = ['💗', '💖', '🌸', '💞', '🌷', '💕'];

interface Props {
  count?: number;
  dimmed?: boolean;
}

export default function FloatingHearts({ count = 12, dimmed = false }: Props) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        duration: 9 + Math.random() * 8,
        delay: -Math.random() * 12,
        size: 12 + Math.random() * 16,
        glyph: GLYPHS[i % GLYPHS.length],
      })),
    [count],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 90,
        duration: 2.6 + Math.random() * 2.4,
        delay: -Math.random() * 5,
        size: 6 + Math.random() * 10,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={`h-${i}`}
          className="anim-rise absolute bottom-[-40px]"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: dimmed ? 0.5 : 1,
          }}
        >
          {h.glyph}
        </span>
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`s-${i}`}
          className="anim-twinkle absolute text-gold"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}