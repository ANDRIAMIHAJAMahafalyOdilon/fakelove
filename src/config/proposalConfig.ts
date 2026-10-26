import type { ProposalConfig } from '../types';

/**
 * ⚙️  TOUT SE PERSONNALISE ICI.
 * Change les prénoms, les textes, les activités et les réglages d'animation.
 */
export const proposalConfig: ProposalConfig = {
  recipientName: 'Ashley Samarhte',
  senderName: 'Odilon Roch',

  welcome: {
    title: 'J’ai une petite surprise pour toi, Ashley Samarhte…',
    message:
      'Juste un petit cadeau pour te rappeler combien tu comptes pour moi. Tu veux bien l’ouvrir ?',
    yesLabel: 'Ouvrir mon cadeau 💝',
    noLabel: 'Garder la surprise 🙈',
  },

  taunts: [
    'Hé hé, le cadeau attend son heure ! 🙈',
    'Oups, tu as failli découvrir la surprise !',
    'Un tout petit clic et c’est à toi 💗',
    'Prête à découvrir ton petit mot ? 🌸',
    'La surprise est presque à toi ! 😂',
    'À toi de choisir, mon cœur 💌',
  ],

  celebration: {
    headline: 'Une petite surprise rien que pour toi 💗',
    subline: 'Parce que tu rends ma vie plus belle, chaque jour.',
    cta: 'Découvrir la suite 💌',
  },

  activity: {
    title: 'Pour notre prochain moment à deux, quand je viendrai chez toi… 💕',
    message: 'Rehefa tonga aty aminao aho, qu’est-ce qui te ferait plaisir ? Choisis notre petit moment à deux, mon cœur.',
    cta: 'Choisir le moment 💌',
    options: [
      {
        id: 'cafe',
        emoji: '🍽️',
        label: 'Un dîner en tête-à-tête',
        description: 'Un bon repas, une jolie soirée et toi près de moi.',
      },
      {
        id: 'parc',
        emoji: '🌳',
        label: 'Une balade main dans la main',
        description: 'Prendre notre temps et profiter d’être ensemble.',
      },
      {
        id: 'glace',
        emoji: '🍦',
        label: 'Un goûter gourmand',
        description: 'Une douceur à partager avec mon amoureuse.',
      },
      {
        id: 'cinema',
        emoji: '🎬',
        label: 'Un film et du pop-corn',
        description: 'Bien installés, tout près l’un de l’autre.',
      },
      {
        id: 'soleil',
        emoji: '🎤',
        label: 'Karaoké et un verre ensemble',
        description: 'Chanter, rire et trinquer à nos beaux moments.',
      },
      {
        id: 'surprise',
        emoji: '💌',
        label: 'Me laisser te surprendre',
        description: 'Je prépare quelque chose rien que pour nous.',
      },
    ],
  },

  time: {
    title: 'Et quand aimerais-tu qu’on en profite ? 🕰️',
    message: 'Choisis le moment qui te ferait plaisir, mon cœur.',
    cta: 'Voir notre petit programme 💗',
    options: [
      { id: 'before-defense', emoji: '💌', label: 'Avant ma soutenance' },
      { id: 'during-defense', emoji: '🎓', label: 'Pendant ma soutenance' },
      { id: 'after-defense', emoji: '🌸', label: 'Après ma soutenance' },
    ],
  },

  final: {
    title: 'Le plus beau, c’est d’être avec toi 💗',
    message:
      'Merci d’être ma personne préférée. Je t’aime fort, Ashley, et j’ai hâte de créer encore plein de beaux souvenirs avec toi. 🌸',
    restart: 'Revoir ma surprise 💝',
    copy: 'Garder notre petit programme',
    copied: 'Notre programme est copié ! 📋',
  },

  refusal: {
    headline: 'Pas de souci, mon cœur 💗',
    message: 'La surprise reste là pour toi. Ouvre-la quand tu en auras envie. Je t’aime fort.',
    back: 'Revoir ma surprise',
    reread: 'Relire mon petit mot',
  },

  animation: {
    dodgeMaxCount: 3,
    heartCount: 12,
    petalCount: 16,
    sparkleCount: 14,
  },
};
