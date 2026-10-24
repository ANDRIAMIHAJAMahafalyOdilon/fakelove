import { useRef, useState } from 'react';
import type { CharacterState, ProposalConfig } from '../types';
import AnimatedCharacter from './AnimatedCharacter';
import FlowerDecoration from './FlowerDecoration';
import MovingNoButton from './MovingNoButton';

interface Props {
  config: ProposalConfig;
  mood: CharacterState;
  onYes: () => void;
  onRefuse: () => void;
  onDodge: () => void;
  onHoverYes: () => void;
  reducedMotion?: boolean;
  sad?: boolean;
}

export default function ProposalCard({
  config,
  mood,
  onYes,
  onRefuse,
  onDodge,
  onHoverYes,
  reducedMotion = false,
  sad = false,
}: Props) {
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const yesRef = useRef<HTMLDivElement | null>(null);
  const [taunt, setTaunt] = useState('');

  return (
    <div className="relative z-10 w-full max-w-[660px] rounded-[34px] border border-[#ffe1ee] bg-white/95 px-5 pb-5 pt-6 text-center shadow-[0_26px_60px_-26px_rgba(190,92,140,0.5)] backdrop-blur-sm sm:px-7">
      <div className="pointer-events-none absolute inset-[9px] rounded-[26px] border border-dashed border-blush" />
      <FlowerDecoration variant="rose" position="tl" sad={sad} />
      <FlowerDecoration variant="tulip" position="tr" sad={sad} />
      <FlowerDecoration variant="daisy" position="bl" sad={sad} />
      <FlowerDecoration variant="rose" position="br" sad={sad} />

      <span className="inline-block rounded-full bg-[#fff0f6] px-3.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-strawberry">
        Une question pour {config.recipientName}
      </span>

      <AnimatedCharacter state={mood} className="mt-1" />

      <h1 className="font-display text-[1.35rem] leading-tight text-[#7a3f56] sm:text-[1.8rem]">
        {config.welcome.title}
      </h1>
      <p className="mx-auto mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-soft">
        {config.welcome.message}
      </p>

      <div ref={zoneRef} className="relative mt-4 min-h-[252px] rounded-[26px] border border-dashed border-[#ffd2e4] bg-gradient-to-b from-[#fff8fc] to-[#fff1f8]">
        <p
          className={`absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[0.85rem] font-bold text-strawberry shadow-[0_8px_20px_-10px_rgba(200,90,140,0.7)] transition-opacity duration-300 ${
            taunt ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          {taunt}
        </p>

        <div ref={yesRef} className="absolute bottom-9 left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={onYes}
            onMouseEnter={onHoverYes}
            onFocus={onHoverYes}
            className="rounded-full bg-gradient-to-br from-[#ffa8cd] to-strawberry px-8 py-3.5 font-bold text-white shadow-[0_14px_26px_-12px_rgba(255,93,146,0.85)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            {config.welcome.yesLabel}
          </button>
        </div>

        <MovingNoButton
          label={config.welcome.noLabel}
          zoneRef={zoneRef}
          avoidRef={yesRef}
          onRefuse={onRefuse}
          onDodge={onDodge}
          onTaunt={setTaunt}
          taunts={config.taunts}
          maxDodges={config.animation.dodgeMaxCount}
          reducedMotion={reducedMotion}
        />

        
      </div>

    </div>
  );
}