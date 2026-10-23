import type { Activity, CharacterState, ProposalConfig } from '../types';
import AnimatedCharacter from '../components/AnimatedCharacter';
import ProgressIndicator from '../components/ProgressIndicator';

interface Props {
  config: ProposalConfig;
  mood: CharacterState;
  selectedId: string | null;
  activity: Activity | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
  onHover: () => void;
}

export default function DateTimePage({ config, mood, selectedId, activity, onSelect, onContinue, onHover }: Props) {
  return (
    <div className="relative z-10 w-full max-w-[660px] rounded-[34px] border border-[#ffe1ee] bg-white/95 px-5 pb-6 pt-5 text-center shadow-[0_26px_60px_-26px_rgba(190,92,140,0.5)] sm:px-7">
      <ProgressIndicator current={1} />
      <AnimatedCharacter state={mood} />
      <h2 className="font-display text-[1.2rem] leading-tight text-[#7a3f56] sm:text-[1.6rem]">{config.time.title}</h2>
      <p className="mx-auto mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-ink-soft">{config.time.message}</p>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {config.time.options.map((option) => {
          const selected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              onMouseEnter={onHover}
              onFocus={onHover}
              aria-pressed={selected}
              className={`rounded-full border-2 px-5 py-3 font-semibold transition-all duration-200 ${
                selected
                  ? 'border-strawberry bg-gradient-to-br from-[#ffd9e9] to-blush-soft text-[#a63b63]'
                  : 'border-blush bg-white hover:-translate-y-1'
              }`}
            >
              <span aria-hidden="true">{option.emoji}</span> {option.label}
            </button>
          );
        })}
      </div>

      {activity && (
        <p className="mt-4 text-[0.92rem] italic text-ink-soft">
          Notre petite aventure commence peut-être par {activity.label.toLowerCase()}... {activity.emoji}💗
        </p>
      )}

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedId}
          className="rounded-full bg-gradient-to-br from-[#ffa8cd] to-strawberry px-8 py-3.5 font-bold text-white shadow-[0_14px_26px_-12px_rgba(255,93,146,0.85)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
        >
          {config.time.cta}
        </button>
      </div>
    </div>
  );
}