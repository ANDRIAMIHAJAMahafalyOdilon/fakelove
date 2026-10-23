import type { CSSProperties, ReactElement } from 'react';
import type { CharacterState } from '../types';

type EyeKind = 'open' | 'wide' | 'half' | 'happy' | 'sad' | 'sparkle' | 'star';
type MouthKind = 'smile' | 'small' | 'smallopen' | 'open' | 'bigsmile' | 'wave' | 'frown';
type BrowKind = 'neutral' | 'one' | 'soft' | 'worried' | 'sad' | 'up';
type Extra = 'qmark' | 'sweat' | 'tear' | 'sparkle' | 'lines';

interface MoodSpec {
  eyes: EyeKind;
  mouth: MouthKind;
  brows: BrowKind;
  blush: number;
  armL: number;
  armR: number;
  tilt: number;
  extras: Extra[];
  droop?: boolean;
  label: string;
}

const MOODS: Record<CharacterState, MoodSpec> = {
  idle:        { eyes: 'open',    mouth: 'smile',     brows: 'neutral', blush: 0.45, armL: 6,    armR: -6,   tilt: 0,  extras: [],                   label: 'détendu' },
  curious:     { eyes: 'open',    mouth: 'small',     brows: 'one',     blush: 0.5,  armL: 10,   armR: -4,   tilt: -6, extras: ['qmark'],            label: 'curieux' },
  shy:         { eyes: 'half',    mouth: 'small',     brows: 'soft',    blush: 1,    armL: -156, armR: 156,  tilt: 3,  extras: [],                   label: 'timide' },
  nervous:     { eyes: 'wide',    mouth: 'wave',      brows: 'worried', blush: 0.75, armL: -22,  armR: 22,   tilt: -2, extras: ['sweat'],            label: 'nerveux' },
  sad:         { eyes: 'sad',     mouth: 'frown',     brows: 'sad',     blush: 0.35, armL: 9,    armR: -9,   tilt: 4,  extras: ['tear'], droop: true, label: 'triste' },
  hopeful:     { eyes: 'sparkle', mouth: 'smallopen', brows: 'up',      blush: 0.6,  armL: -115, armR: 115,  tilt: -2, extras: ['sparkle'],          label: 'plein d’espoir' },
  happy:       { eyes: 'happy',   mouth: 'bigsmile',  brows: 'up',      blush: 0.9,  armL: -140, armR: 140,  tilt: 0,  extras: [],                   label: 'heureux' },
  excited:     { eyes: 'wide',    mouth: 'open',      brows: 'up',      blush: 0.85, armL: -150, armR: 150,  tilt: 0,  extras: ['lines'],            label: 'enthousiaste' },
  celebration: { eyes: 'star',    mouth: 'open',      brows: 'up',      blush: 1,    armL: -160, armR: 160,  tilt: 0,  extras: ['sparkle', 'lines'], label: 'en pleine célébration' },
};

const EYE_Y = 110;

function Eye({ kind, cx }: { kind: EyeKind; cx: number }) {
  const cy = EYE_Y;
  const blinks = kind === 'open' || kind === 'wide' || kind === 'sparkle';

  let inner: ReactElement | null = null;

  if (kind === 'open' || kind === 'wide') {
    const rx = kind === 'wide' ? 9.8 : 8.5;
    const ry = kind === 'wide' ? 12.6 : 10.5;
    inner = (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#4a2f3a" />
        <circle cx={cx - 3} cy={cy - 4} r={kind === 'wide' ? 3.4 : 3} fill="#fff" opacity=".95" />
      </g>
    );
  } else if (kind === 'half') {
    inner = (
      <g>
        <path d={`M${cx - 8.5} ${cy} A 8.5 10.5 0 0 0 ${cx + 8.5} ${cy} Z`} fill="#4a2f3a" />
        <line x1={cx - 9} y1={cy - 1} x2={cx + 9} y2={cy - 1} stroke="#4a2f3a" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  } else if (kind === 'happy') {
    inner = (
      <path
        d={`M${cx - 9} ${cy + 2} Q ${cx} ${cy - 10} ${cx + 9} ${cy + 2}`}
        stroke="#4a2f3a"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    );
  } else if (kind === 'sad') {
    inner = (
      <path
        d={`M${cx - 9} ${cy - 3} Q ${cx} ${cy + 7} ${cx + 9} ${cy - 3}`}
        stroke="#4a2f3a"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    );
  } else if (kind === 'sparkle') {
    inner = (
      <g>
        <circle cx={cx} cy={cy} r="13" fill="none" stroke="#f4c463" strokeWidth="1.5" opacity=".7" />
        <ellipse cx={cx} cy={cy} rx="9" ry="11" fill="#4a2f3a" />
        <circle cx={cx - 3.5} cy={cy - 4} r="3.6" fill="#fff" opacity=".95" />
      </g>
    );
  } else {
    inner = (
      <path
        d={`M${cx} ${cy - 12} L${cx + 3} ${cy - 3} L${cx + 12} ${cy} L${cx + 3} ${cy + 3} L${cx} ${cy + 12} L${cx - 3} ${cy + 3} L${cx - 12} ${cy} L${cx - 3} ${cy - 3} Z`}
        fill="#4a2f3a"
      />
    );
  }

  return <g className={blinks ? 'anim-blink' : undefined}>{inner}</g>;
}

function Mouth({ kind }: { kind: MouthKind }) {
  const cy = 139;
  switch (kind) {
    case 'smile':
      return <path d={`M88 ${cy} Q100 ${cy + 11} 112 ${cy}`} stroke="#c4708e" strokeWidth="3.6" fill="none" strokeLinecap="round" />;
    case 'small':
      return <ellipse cx="100" cy={cy} rx="6" ry="4.6" fill="#c4708e" />;
    case 'smallopen':
      return (
        <g>
          <ellipse cx="100" cy={cy} rx="7.5" ry="6" fill="#c4708e" />
          <ellipse cx="100" cy={cy + 2} rx="4" ry="2.6" fill="#ff9dc6" />
        </g>
      );
    case 'open':
      return (
        <g>
          <ellipse cx="100" cy={cy} rx="11" ry="10" fill="#b8637f" />
          <ellipse cx="100" cy={cy + 3.5} rx="7" ry="4.6" fill="#ff9dc6" />
        </g>
      );
    case 'bigsmile':
      return (
        <g>
          <path d={`M86 ${cy - 2} Q100 ${cy + 17} 114 ${cy - 2} Z`} fill="#b8637f" />
          <ellipse cx="100" cy={cy + 7} rx="7" ry="4" fill="#ff9dc6" />
        </g>
      );
    case 'wave':
      return <path d={`M89 ${cy} q5 -6 10 0 q5 6 10 0`} stroke="#c4708e" strokeWidth="3.4" fill="none" strokeLinecap="round" />;
    default:
      return <path d={`M89 ${cy + 4} Q100 ${cy - 5} 111 ${cy + 4}`} stroke="#c4708e" strokeWidth="3.6" fill="none" strokeLinecap="round" />;
  }
}

const BROW_PATHS: Record<BrowKind, [number, number, number, number][]> = {
  neutral: [[68, 89, 88, 87], [112, 87, 132, 89]],
  one:     [[68, 82, 88, 80], [112, 89, 132, 87]],
  soft:    [[68, 86, 88, 85], [112, 85, 132, 86]],
  worried: [[68, 83, 88, 90], [112, 90, 132, 83]],
  sad:     [[68, 84, 88, 91], [112, 91, 132, 84]],
  up:      [[68, 83, 88, 81], [112, 81, 132, 83]],
};

function Brows({ kind }: { kind: BrowKind }) {
  return (
    <g>
      {BROW_PATHS[kind].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d187a3" strokeWidth="3.4" strokeLinecap="round" />
      ))}
    </g>
  );
}

interface Props {
  state?: CharacterState;
  className?: string;
}

export default function AnimatedCharacter({ state = 'idle', className = '' }: Props) {
  const m = MOODS[state] ?? MOODS.idle;
  const jumping = state === 'celebration' || state === 'excited';

  const armStyle = (deg: number, originX: number): CSSProperties => ({
    transform: `rotate(${deg}deg)`,
    transformOrigin: `${originX}px 170px`,
    transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
  });

  return (
    <div
      className={`w-[150px] sm:w-[168px] mx-auto ${m.droop ? 'anim-bob-slow' : 'anim-bob'} ${
        jumping ? 'anim-jump' : ''
      } ${className}`}
      role="img"
      aria-label={`Personnage de dessin animé, ${m.label}`}
    >
      <svg viewBox="0 0 200 236" width="100%" height="100%">
        <ellipse cx="100" cy="226" rx="44" ry="8" fill="#e9b7cc" opacity=".35" />
        <g
          style={{
            transform: `rotate(${m.tilt}deg) translateY(${m.droop ? 5 : 0}px)`,
            transformOrigin: '100px 200px',
            transition: 'transform 0.55s ease',
          }}
        >
          <line x1="64" y1="170" x2="64" y2="212" stroke="#ffd3bd" strokeWidth="12" strokeLinecap="round" style={armStyle(m.armL, 64)} />
          <line x1="136" y1="170" x2="136" y2="212" stroke="#ffd3bd" strokeWidth="12" strokeLinecap="round" style={armStyle(m.armR, 136)} />
          <path d="M100 148 C74 148 60 168 56 200 C54 216 66 224 100 224 C134 224 146 216 144 200 C140 168 126 148 100 148 Z" fill="#ffb3d1" />
          <path d="M92 148 Q100 158 108 148" stroke="#fff" strokeWidth="4" fill="none" />
          <ellipse cx="100" cy="104" rx="60" ry="57" fill="#ffe6d5" />
          <ellipse cx="66" cy="123" rx="13" ry="8" fill="#ff9dc6" opacity={m.blush} />
          <ellipse cx="134" cy="123" rx="13" ry="8" fill="#ff9dc6" opacity={m.blush} />
          <path d="M40 98 C36 46 68 28 100 28 C132 28 164 46 160 98 C150 78 138 72 128 84 C120 68 110 64 100 78 C90 64 80 68 72 84 C62 72 50 78 40 98 Z" fill="#f9bcd3" />
          <path d="M38 100 C32 120 34 140 40 150 C44 132 42 112 46 100 Z" fill="#f9bcd3" />
          <path d="M162 100 C168 120 166 140 160 150 C156 132 158 112 154 100 Z" fill="#f9bcd3" />
          <g transform="translate(150 60)">
            <circle r="6" fill="#fffdf6" />
            <circle cx="0" cy="-8" r="5" fill="#ffd0e2" />
            <circle cx="7" cy="-3" r="5" fill="#ffd0e2" />
            <circle cx="5" cy="6" r="5" fill="#ffd0e2" />
            <circle cx="-5" cy="6" r="5" fill="#ffd0e2" />
            <circle cx="-7" cy="-3" r="5" fill="#ffd0e2" />
            <circle r="3" fill="#f4c463" />
          </g>
          <Brows kind={m.brows} />
          <Eye kind={m.eyes} cx={78} />
          <Eye kind={m.eyes} cx={122} />
          <path d="M100 124 q3 4 0 6" stroke="#e3b39f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <Mouth kind={m.mouth} />
          {m.extras.includes('sweat') && (
            <g className="anim-blink">
              <path d="M152 74 c6 8 6 14 0 14 c-6 0 -6 -6 0 -14 z" fill="#a8d8f0" opacity=".95" />
            </g>
          )}
          {m.extras.includes('tear') && (
            <g className="anim-blink">
              <ellipse cx="66" cy="128" rx="4.5" ry="6.5" fill="#a8d8f0" opacity=".95" />
            </g>
          )}
          {m.extras.includes('qmark') && (
            <text x="164" y="70" fontSize="26" fontWeight="700" fill="#ff5d92">?</text>
          )}
          {m.extras.includes('sparkle') && (
            <g fill="#f4c463">
              <text x="150" y="60" fontSize="18">✦</text>
              <text x="34" y="76" fontSize="14">✦</text>
            </g>
          )}
          {m.extras.includes('lines') && (
            <g stroke="#ff9dc6" strokeWidth="3" strokeLinecap="round" opacity=".8">
              <line x1="24" y1="150" x2="12" y2="142" />
              <line x1="22" y1="164" x2="8" y2="164" />
              <line x1="176" y1="150" x2="188" y2="142" />
              <line x1="178" y1="164" x2="192" y2="164" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}