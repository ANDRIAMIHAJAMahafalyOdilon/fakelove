import { motion } from 'framer-motion';
import type { ProposalConfig } from '../types';
import AnimatedCharacter from '../components/AnimatedCharacter';
import FlowerDecoration from '../components/FlowerDecoration';
import ashleyPhoto from '../sary/WhatsApp Image 2026-10-26 at 08.43.36 (2).jpeg';
import ashleySunsetPhoto from '../sary/WhatsApp Image 2026-10-26 at 08.43.36.jpeg';
import ashleyPinkPhoto from '../sary/WhatsApp Image 2026-10-26 at 08.43.37.jpeg';

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

      <div className="relative mx-auto mt-3 h-[360px] w-[280px] sm:h-[420px] sm:w-[390px]">
        <figure className="absolute left-[14px] top-[220px] z-0 h-[128px] w-[105px] rotate-[-9deg] rounded-2xl bg-white p-2 pb-3 shadow-[0_12px_28px_-12px_rgba(132,64,94,0.55)] sm:left-[52px] sm:top-[270px] sm:h-[150px] sm:w-[125px]">
          <img src={ashleySunsetPhoto} alt="Ashley devant un coucher de soleil" className="h-full w-full rounded-xl object-cover" />
        </figure>
        <figure className="absolute right-[14px] top-[220px] z-0 h-[128px] w-[105px] rotate-[9deg] rounded-2xl bg-white p-2 pb-3 shadow-[0_12px_28px_-12px_rgba(132,64,94,0.55)] sm:right-[52px] sm:top-[270px] sm:h-[150px] sm:w-[125px]">
          <img src={ashleyPinkPhoto} alt="Ashley avec une tenue rose" className="h-full w-full rounded-xl object-cover" />
        </figure>
        <figure className="absolute left-1/2 top-0 z-10 h-[250px] w-[184px] -translate-x-1/2 rotate-[-2deg] rounded-[28px] bg-white p-2 pb-4 shadow-[0_18px_38px_-12px_rgba(132,64,94,0.6)] ring-2 ring-[#ffc6dd] sm:h-[310px] sm:w-[228px]">
          <img
            src={ashleyPhoto}
            alt="Ashley, au cœur de ma surprise"
            className="h-full w-full rounded-[22px] object-cover object-[center_35%]"
          />
        </figure>
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          {[
            ['💗', '4%', '12%', 'text-3xl', 0],
            ['💕', '78%', '4%', 'text-2xl', 0.15],
            ['💖', '0%', '48%', 'text-2xl', 0.3],
            ['💘', '83%', '41%', 'text-3xl', 0.45],
            ['💞', '12%', '77%', 'text-2xl', 0.6],
            ['💓', '76%', '79%', 'text-2xl', 0.75],
          ].map(([heart, left, top, size, delay]) => (
            <motion.span
              key={heart}
              className={`absolute ${size}`}
              style={{ left, top }}
              initial={{ scale: 0, rotate: -18 }}
              animate={{ scale: [0.85, 1.1, 0.95], y: [0, -7, 0], rotate: [0, 9, 0] }}
              transition={{ delay: Number(delay), duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {heart}
            </motion.span>
          ))}
        </div>
      </div>

      <p className="font-display text-[1.45rem] font-bold leading-tight text-[#d94f83] sm:text-[1.8rem]">
        Je t’aime fort, Ashley 💗
      </p>

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
