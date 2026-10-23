# Love Quest 💗🌸

Une carte d'amour interactive : un personnage animé, un bouton « Non » qui fuit, une célébration
et un petit parcours en 4 étapes pour organiser un premier rendez-vous.

## Lancer le projet

    npm install
    npm run dev

Puis ouvrir http://localhost:5173

## Vérifier / compiler

    npm run typecheck
    npm run build
    npm run preview

## Personnaliser

Tout se passe dans `src/config/proposalConfig.ts` :
prénoms, titres, messages, activités, moments, textes des boutons, nombre de cœurs/pétales,
et `animation.dodgeMaxCount` (nombre de fuites du bouton « Non »).

## Déploiement gratuit

### Vercel
    npm i -g vercel
    vercel

### Netlify
    npm run build
    # puis glisser-déposer le dossier dist/ sur https://app.netlify.com/drop

### GitHub Pages
1. `npm run build`
2. pousser `dist/` sur la branche `gh-pages`
3. `base: './'` est déjà configuré dans `vite.config.ts`, ça fonctionne tel quel.

## Accessibilité

Navigation clavier complète, `aria-live` pour les messages, libellés explicites,
et respect de `prefers-reduced-motion`.