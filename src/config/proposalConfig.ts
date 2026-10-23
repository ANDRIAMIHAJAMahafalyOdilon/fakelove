import type { ProposalConfig } from '../types';

/**
 * ⚙️  TOUT SE PERSONNALISE ICI.
 * Change les prénoms, les textes, les activités et les réglages d'animation.
 */
export const proposalConfig: ProposalConfig = {
  recipientName: 'Camille',
  senderName: 'Léo',

  welcome: {
    title: 'J’ai une petite question pour toi...',
    message:
      'Il y a quelque chose que j’aimerais te demander depuis un petit moment. Tu veux bien m’écouter ?',
    yesLabel: 'Oui 💗',
    noLabel: 'Non 🙈',
  },

  taunts: [
    'Hé hé, pas celui-là ! 🙈',
    'Oups, tu m’as presque eu !',
    'Ce n’est pas le bon bouton ! 💗',
    'Attends, réfléchis encore un peu...',
    'Je ne suis pas facile à attraper ! 😂',
    'Tu es sûr de vouloir dire non ? 🌸',
  ],

  celebration: {
    headline: 'AAAAAH, TU AS DIT OUI ! 💗🌸',
    subline: 'Tu viens de rendre cette journée encore plus spéciale !',
    cta: 'Continuer notre histoire 💌',
  },

  activity: {
    title: 'Alors... on organise notre premier rendez-vous ? 🌷',
    message: 'J’aimerais passer un moment avec toi. Qu’est-ce qui te ferait plaisir ?',
    cta: 'Continuer',
    options: [
      {
        id: 'cafe',
        emoji: '☕',
        label: 'Un petit café ensemble',
        description: 'Une table tranquille et des heures de discussion',
      },
      {
        id: 'parc',
        emoji: '🌳',
        label: 'Une promenade dans un joli parc',
        description: 'De l’air frais et des fleurs partout',
      },
      {
        id: 'glace',
        emoji: '🍦',
        label: 'Une sortie pour manger une glace',
        description: 'Deux boules, trois parfums, zéro raison',
      },
      {
        id: 'cinema',
        emoji: '🎬',
        label: 'Une séance cinéma',
        description: 'Grand écran et pop-corn partagé',
      },
      {
        id: 'soleil',
        emoji: '🌅',
        label: 'Admirer le coucher du soleil',
        description: 'Le ciel qui devient rose, comme par hasard',
      },
      {
        id: 'surprise',
        emoji: '💌',
        label: 'Une surprise à découvrir',
        description: 'Tu verras bien, c’est mon petit secret',
      },
    ],
  },

  time: {
    title: 'Et... tu préférerais quand ? 🕰️',
    message: 'Rien n’est imposé, dis-moi simplement ce qui t’arrange le plus.',
    cta: 'Continuer',
    options: [
      { id: 'weekend', emoji: '🌸', label: 'Ce week-end' },
      { id: 'nextweek', emoji: '🌿', label: 'La semaine prochaine' },
      { id: 'other', emoji: '📅', label: 'Un autre jour' },
      { id: 'together', emoji: '🤝', label: 'À décider ensemble' },
    ],
  },

  final: {
    title: 'Peu importe le programme...',
    message:
      'Je voulais surtout te dire que ça me ferait plaisir de partager un joli moment avec toi. 🌸',
    restart: 'Recommencer 💗',
    copy: 'Copier le résumé',
    copied: 'Résumé copié ! 📋',
  },

  refusal: {
    headline: 'Oh... je comprends. 💗',
    message: 'Merci d’avoir pris le temps de me répondre.',
    back: 'Retour à l’accueil',
    reread: 'Relire mon petit message',
  },

  animation: {
    dodgeMaxCount: 3,
    heartCount: 12,
    petalCount: 16,
    sparkleCount: 14,
  },
};