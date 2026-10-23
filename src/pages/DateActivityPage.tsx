import type { CharacterState, ProposalConfig } from '../types';
import ActivityCard from '../components/ActivityCard';
import AnimatedCharacter from '../components/AnimatedCharacter';
import ProgressIndicator from '../components/ProgressIndicator';

interface Props {
  config: ProposalConfig;
  mood: CharacterState;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
  onHover: () => void;
}

export default function DateActivityPage({ config, mood, selectedId, onSelect, onContinue, onHover }: Props) {
  return (
    <div className="relative z-10 w-full max-w-[660px] rounded-[34px] border border-[#ffe1ee] bg-white/95 px-5 pb-6 pt-5 text-center shadow-[0_26px_60px_-26px_rgba(190,92,140,0.5)] sm:px-7">
      <ProgressIndicator current={0} />
      <AnimatedCharacter state={mood} />
      <h2 className="font-display text-[1.2rem] leading-tight text-[#7a3f56] sm:text-[1.6rem]">
        {config.activity.title}
      </h2>
      <p className="mx-auto mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-ink-soft">
        {config.activity.message}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {config.activity.options.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            selected={selectedId === activity.id}
            onSelect={() => onSelect(activity.id)}
            onHover={onHover}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedId}
          className="rounded-full bg-gradient-to-br from-[#ffa8cd] to-strawberry px-8 py-3.5 font-bold text-white shadow-[0_14px_26px_-12px_rgba(255,93,146,0.85)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
        >
          {config.activity.cta}
        </button>
      </div>
    </div>
  );
}