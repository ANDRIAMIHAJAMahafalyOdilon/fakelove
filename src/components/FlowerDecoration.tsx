interface Props {
  variant?: 'rose' | 'tulip' | 'daisy';
  position?: 'tl' | 'tr' | 'bl' | 'br';
  sad?: boolean;
}

const POSITIONS: Record<NonNullable<Props['position']>, string> = {
  tl: '-top-6 -left-5',
  tr: '-top-7 -right-5',
  bl: '-bottom-6 -left-4',
  br: '-bottom-7 -right-5',
};

function petals(count: number, distance: number, fill: string, rx: number, ry: number) {
  return Array.from({ length: count }, (_, i) => (
    <ellipse
      key={i}
      cx="50"
      cy={50 - distance}
      rx={rx}
      ry={ry}
      fill={fill}
      transform={`rotate(${(360 / count) * i} 50 50)`}
    />
  ));
}

export default function FlowerDecoration({ variant = 'rose', position = 'tl', sad = false }: Props) {
  const delay = { tl: '0s', tr: '-1.4s', bl: '-2.6s', br: '-3.6s' }[position];

  return (
    <svg
      className={`pointer-events-none absolute w-[58px] sm:w-[76px] z-10 ${
        sad ? 'anim-sway-sad' : 'anim-sway'
      } ${POSITIONS[position]}`}
      style={{ animationDelay: delay }}
      viewBox="0 0 100 130"
      aria-hidden="true"
    >
      <path d="M50 70 C50 88 46 100 42 116" stroke="#8fc98f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M50 92 C62 88 70 94 68 104 C58 108 50 100 50 92 Z" fill="#a8d8a0" />
      {variant === 'rose' && (
        <g>
          {petals(6, 9, '#ff8fb6', 8, 12)}
          <circle cx="50" cy="50" r="11" fill="#ff6fa4" />
          <circle cx="47" cy="47" r="4" fill="#ffd0e2" opacity=".8" />
        </g>
      )}
      {variant === 'tulip' && (
        <g>
          <path d="M34 34 C34 20 42 12 50 22 C58 12 66 20 66 34 C66 48 58 56 50 56 C42 56 34 48 34 34 Z" fill="#ff9dc6" />
          <path d="M50 22 C46 34 46 46 50 56 C54 46 54 34 50 22 Z" fill="#ff7fae" />
        </g>
      )}
      {variant === 'daisy' && (
        <g>
          {petals(9, 12, '#fffdf6', 7, 14)}
          <circle cx="50" cy="50" r="10" fill="#f4c463" />
        </g>
      )}
    </svg>
  );
}