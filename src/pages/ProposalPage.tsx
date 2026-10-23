import { motion } from 'framer-motion';
import type { ProposalConfig } from '../types';
import AnimatedCharacter from '../components/AnimatedCharacter';
import FlowerDecoration from '../components/FlowerDecoration';

interface Props {
  config: ProposalConfig;
  celebrating: boolean;
  onContinue: () => void;
}

export default function ProposalPage({ config, celebrating, onContinue }: Props) {
  return (
    <div className="relative z-10 w-full max-w-[660px] rounded-[34px] border border-[#ffe1ee] bg-white/95 px-5 pb-6 pt-6 text-center shadow-[0_26px_60px_-26px_rgba(190,92,140,0.5)] sm:px-7">
      <div className="pointer-events-none absolute inset-[9px] rounded-[26px] border border-dashed border-blush" />
      <FlowerDecoration variant="rose" position="tl" />
      <FlowerDecoration variant="tulip" position="tr" />
      <FlowerDecoration variant="daisy" position="bl" />
      <FlowerDecoration variant="rose" position="br" />

      <div className="anim-heart-pop text-[84px] leading-none" aria-hidden="true">
        💗
      </div>

      <AnimatedCharacter state={celebrating ? 'celebration' : 'excited'} />

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-[1.4rem] leading-tight text-[#7a3f56] sm:text-[1.9rem]"
      >
        {config.celebration.headline}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-2 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink-soft"
      >
        {config.celebration.subline}
      </motion.p>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-full bg-gradient-to-br from-[#ffa8cd] to-strawberry px-8 py-3.5 font-bold text-white shadow-[0_14px_26px_-12px_rgba(255,93,146,0.85)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
        >
          {config.celebration.cta}
        </button>
      </div>
    </div>
  );
}