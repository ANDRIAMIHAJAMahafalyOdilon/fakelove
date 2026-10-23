import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';

interface Props {
  label: string;
  zoneRef: RefObject<HTMLDivElement | null>;
  avoidRef: React.RefObject<HTMLDivElement | null>;
  onRefuse: () => void;
  onDodge: () => void;
  onTaunt: (taunt: string) => void;
  taunts: string[];
  maxDodges: number;
  reducedMotion?: boolean;
}

interface Pos {
  x: number;
  y: number;
}

export default function MovingNoButton({
  label,
  zoneRef,
  avoidRef,
  onRefuse,
  onDodge,
  onTaunt,
  taunts,
  maxDodges,
  reducedMotion = false,
}: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const lastDodge = useRef(0);
  const [pos, setPos] = useState<Pos | null>(null);
  const [dodges, setDodges] = useState(0);
  const [focused, setFocused] = useState(false);
  const [puff, setPuff] = useState<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    if (zone && !pos) setPos({ x: zone.clientWidth * 0.66, y: zone.clientHeight * 0.36 });
  }, [zoneRef, pos]);

  const dodge = useCallback(
    (cursor: { x: number; y: number }) => {
      const zone = zoneRef.current;
      const btn = btnRef.current;
      if (!zone || !btn) return;

      const zoneRect = zone.getBoundingClientRect();
      const bw = btn.offsetWidth;
      const bh = btn.offsetHeight;
      const pad = 12;
      const maxX = Math.max(pad, zone.clientWidth - bw - pad);
      const maxY = Math.max(pad, zone.clientHeight - bh - pad);
      const avoidRect = avoidRef.current ? avoidRef.current.getBoundingClientRect() : null;

      let best: Pos | null = null;
      let bestScore = -Infinity;

      for (let i = 0; i < 26; i++) {
        const x = pad + Math.random() * (maxX - pad);
        const y = pad + Math.random() * (maxY - pad);
        const centerX = zoneRect.left + x + bw / 2;
        const centerY = zoneRect.top + y + bh / 2;

        const distCursor = Math.hypot(centerX - cursor.x, centerY - cursor.y);
        const distPrev = pos ? Math.hypot(x - pos.x, y - pos.y) : 999;

        const overlapsAvoid =
          avoidRect !== null &&
          !(
            zoneRect.left + x > avoidRect.right + 10 ||
            zoneRect.left + x + bw < avoidRect.left - 10 ||
            zoneRect.top + y > avoidRect.bottom + 10 ||
            zoneRect.top + y + bh < avoidRect.top - 10
          );

        const score =
          distCursor +
          Math.min(distPrev, 320) * 0.55 -
          (overlapsAvoid ? 500 : 0) -
          (distCursor < 130 ? 260 : 0);

        if (score > bestScore) {
          bestScore = score;
          best = { x, y };
        }
      }

      if (!best) return;
      setPuff({ x: best.x + bw / 2, y: best.y + bh / 2, id: Date.now() });
      setPos(best);
      setDodges((d) => d + 1);
      onTaunt(taunts[Math.floor(Math.random() * taunts.length)]);
      onDodge();
    },
    [zoneRef, avoidRef, pos, taunts, onTaunt, onDodge],
  );

  const canDodge = !focused && dodges < maxDodges && !reducedMotion;

  const handleEnter = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      const now = Date.now();
      if (canDodge && now - lastDodge.current > 340) {
        lastDodge.current = now;
        dodge({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch') {
      const now = Date.now();
      if (canDodge && now - lastDodge.current > 300) {
        lastDodge.current = now;
        dodge({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'touch') return;
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (inside) onRefuse();
  };

  return (
    <>
      {puff && (
        <span
          key={puff.id}
          className="anim-puff pointer-events-none absolute h-4 w-4 rounded-full border-2 border-rose"
          style={{ left: puff.x, top: puff.y }}
          aria-hidden="true"
        />
      )}
      <button
        ref={btnRef}
        type="button"
        onClick={onRefuse}
        onPointerEnter={handleEnter}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={`${label} — ce bouton peut se déplacer`}
        className="no-btn-transition absolute z-10 rounded-full border-2 border-[#ffc2dc] bg-white px-7 py-3.5 font-bold text-strawberry shadow-[0_10px_22px_-12px_rgba(200,90,140,0.7)] hover:scale-105 active:scale-95"
        style={{
          left: pos ? pos.x : 0,
          top: pos ? pos.y : 0,
          visibility: pos ? 'visible' : 'hidden',
        }}
      >
        {label}
      </button>
    </>
  );
}