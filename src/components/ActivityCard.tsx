import { Check } from 'lucide-react';
import type { Activity } from '../types';

interface Props {
  activity: Activity;
  selected: boolean;
  onSelect: () => void;
  onHover?: () => void;
}

export default function ActivityCard({ activity, selected, onSelect, onHover }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-pressed={selected}
      className={`relative text-center rounded-3xl border-2 px-3 pt-5 pb-4 transition-all duration-300 will-change-transform ${
        selected
          ? 'border-strawberry bg-blush-soft -translate-y-1 scale-[1.02] shadow-[0_18px_32px_-18px_rgba(255,93,146,0.9)]'
          : 'border-blush bg-white hover:-translate-y-2 hover:shadow-[0_18px_30px_-18px_rgba(200,90,140,0.8)]'
      }`}
    >
      {selected && (
        <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-strawberry text-white">
          <Check size={14} strokeWidth={3} />
        </span>
      )}
      <span className="block text-3xl leading-none" aria-hidden="true">
        {activity.emoji}
      </span>
      <span className="mt-2 block text-sm font-bold leading-snug">{activity.label}</span>
      <span className="mt-1 block text-[0.7rem] leading-snug text-ink-soft">{activity.description}</span>
    </button>
  );
}