import { useEffect, useRef, useState } from 'react';
import { Copy, RotateCcw } from 'lucide-react';
import type { Activity, ProposalConfig, TimeOption } from '../types';
import AnimatedCharacter from '../components/AnimatedCharacter';
import FlowerDecoration from '../components/FlowerDecoration';
import ProgressIndicator from '../components/ProgressIndicator';

interface Props {
  config: ProposalConfig;
  activity: Activity | null;
  time: TimeOption | null;
  onRestart: () => void;
}

export default function FinalMessagePage({ config, activity, time, onRestart }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const summary = [
    'Notre petite aventure 💗',
    `Pour : ${config.recipientName} — de la part de ${config.senderName}`,
    activity ? `Activité : ${activity.emoji} ${activity.label}` : 'Activité : à définir',
    time ? `Moment : ${time.emoji} ${time.label}` : 'Moment : à définir',
  ].join('\n');

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      const area = document.createElement('textarea');
      area.value = summary;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative z-10 w-full max-w-[660px] rounded-[34px] border border-[#ffe1ee] bg-white/95 px-5 pb-6 pt-5 text-center shadow-[0_26px_60px_-26px_rgba(190,92,140,0.5)] sm:px-7">
      <ProgressIndicator current={2} />
      <FlowerDecoration variant="rose" position="tl" />
      <FlowerDecoration variant="tulip" position="tr" />
      <FlowerDecoration variant="daisy" position="bl" />
      <FlowerDecoration variant="rose" position="br" />

      <svg className="anim-bob mx-auto w-[190px]" viewBox="0 0 200 150" role="img" aria-label="Bouquet de fleurs animé">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${28 + i * 36} 62)`}>
            <path d="M0 0 L0 42" stroke="#8fc98f" strokeWidth="3" />
            {Array.from({ length: 6 }, (_, k) => (
              <ellipse
                key={k}
                cx="0"
                cy="-11"
                rx="6"
                ry="9"
                fill={['#ff8fb6', '#ff9dc6', '#fffdf6', '#e6c9ff', '#ffb6d5'][i % 5]}
                transform={`rotate(${k * 60})`}
              />
            ))}
            <circle r="5" fill="#f4c463" />
          </g>
        ))}
      </svg>

      <AnimatedCharacter state="hopeful" className="mt-2" />

      <h2 className="font-display text-[1.2rem] leading-tight text-[#7a3f56] sm:text-[1.6rem]">{config.final.title}</h2>
      <p className="mx-auto mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-soft">{config.final.message}</p>

      <div className="mx-auto mt-4 max-w-[420px] rounded-3xl border border-dashed border-[#ffcfe3] bg-[#fff7fb] p-4 text-left">
        <ul className="space-y-1.5 text-[0.92rem]">
          <li>
            <strong>Pour :</strong> {config.recipientName} — <strong>de :</strong> {config.senderName}
          </li>
          <li>
            <strong>Activité :</strong> {activity ? `${activity.emoji} ${activity.label}` : 'à définir'}
          </li>
          <li>
            <strong>Moment :</strong> {time ? `${time.emoji} ${time.label}` : 'à définir'}
          </li>
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={copySummary}
          className="flex items-center gap-2 rounded-full bg-gradient-to-br from-[#ffa8cd] to-strawberry px-7 py-3.5 font-bold text-white shadow-[0_14px_26px_-12px_rgba(255,93,146,0.85)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95"
        >
          <Copy size={17} />
          {copied ? config.final.copied : config.final.copy}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="flex items-center gap-2 rounded-full border-2 border-[#ffd3e5] bg-white px-7 py-3.5 font-bold text-[#a63b63] transition-transform duration-200 hover:-translate-y-1 active:scale-95"
        >
          <RotateCcw size={17} />
          {config.final.restart}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {copied ? config.final.copied : ''}
      </p>
    </div>
  );
}