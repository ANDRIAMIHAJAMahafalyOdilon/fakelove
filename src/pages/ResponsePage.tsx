import type { ProposalConfig } from '../types';
import AnimatedCharacter from '../components/AnimatedCharacter';
import FlowerDecoration from '../components/FlowerDecoration';

interface Props {
  config: ProposalConfig;
  onRestart: () => void;
  onReread: () => void;
}

export default function ResponsePage({ config, onRestart, onReread }: Props) {
  return (
    <div className="relative z-10 w-full max-w-[660px] rounded-[34px] border border-[#ffe1ee] bg-white/95 px-5 pb-6 pt-6 text-center shadow-[0_26px_60px_-26px_rgba(190,92,140,0.5)] sm:px-7">
      <div className="pointer-events-none absolute inset-[9px] rounded-[26px] border border-dashed border-blush" />
      <FlowerDecoration variant="rose" position="tl" />
      <FlowerDecoration variant="tulip" position="tr" />
      <FlowerDecoration variant="daisy" position="bl" />
      <FlowerDecoration variant="rose" position="br" />

      <AnimatedCharacter state="happy" />

      <h2 className="font-display text-[1.25rem] leading-tight text-[#7a3f56] sm:text-[1.6rem]">
        {config.refusal.headline}
      </h2>
      <p className="mx-auto mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-soft">{config.refusal.message}</p>

      <p className="mt-3 text-[0.8rem] text-ink-soft opacity-80">
        Tu peux revenir découvrir ton petit cadeau quand tu voudras. 🌷
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border-2 border-[#ffd3e5] bg-white px-7 py-3.5 font-bold text-[#a63b63] transition-transform duration-200 hover:-translate-y-1 active:scale-95"
        >
          {config.refusal.back}
        </button>
        <button
          type="button"
          onClick={onReread}
          className="rounded-full bg-gradient-to-br from-[#ffa8cd] to-strawberry px-7 py-3.5 font-bold text-white shadow-[0_14px_26px_-12px_rgba(255,93,146,0.85)] transition-transform duration-200 hover:-translate-y-1 active:scale-95"
        >
          {config.refusal.reread}
        </button>
      </div>
    </div>
  );
}
