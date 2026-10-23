export type CharacterState =
  | 'idle'
  | 'curious'
  | 'shy'
  | 'nervous'
  | 'sad'
  | 'hopeful'
  | 'happy'
  | 'excited'
  | 'celebration';

export type Step = 'welcome' | 'proposal' | 'activity' | 'time' | 'final' | 'refusal';

export interface Activity {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface TimeOption {
  id: string;
  emoji: string;
  label: string;
}

export interface ProposalAnswers {
  activityId: string | null;
  timeId: string | null;
}

export interface ProposalConfig {
  recipientName: string;
  senderName: string;
  welcome: { title: string; message: string; yesLabel: string; noLabel: string };
  taunts: string[];
  celebration: { headline: string; subline: string; cta: string };
  activity: { title: string; message: string; cta: string; options: Activity[] };
  time: { title: string; message: string; cta: string; options: TimeOption[] };
  final: {
    title: string;
    message: string;
    restart: string;
    copy: string;
    copied: string;
  };
  refusal: { headline: string; message: string; back: string; reread: string };
  animation: {
    dodgeMaxCount: number;
    heartCount: number;
    petalCount: number;
    sparkleCount: number;
  };
}