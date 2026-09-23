# Design system — direction visuelle inspirée de delos.so

## Contexte et méthode

`delos.so` reste inaccessible en scraping direct depuis cette session
(policy réseau). Les tokens ci-dessous viennent de captures d'écran réelles
du site (marketing + app.delos.so) partagées dans la conversation : les
couleurs sont donc des **estimations visuelles**, et la mise en page / les
patterns de composants sont observés directement sur ces captures.

Le code, la copy et les visuels de ce repo sont une implémentation
**originale** — aucun texte, image ou code de delos.so n'est repris tel
quel.

## Palette (estimée depuis les captures)

| Token | Hex (estimé) | Usage |
|---|---|---|
| `ink-950` | `#0d0d0e` | Logo, boutons pilule noirs, `theme-color` |
| `ink-900` | `#161618` | Titres, hover des boutons noirs |
| `ink-500` | `#6b6b70` | Texte secondaire |
| `ink-100` | `#ececee` | Bordures hairline |
| `cream-100` | `#f8f5ef` | Fond du hero |
| `brand-600` | `#4449e7` | CTA principal, mot-clé dans le titre |

## Typographie

Sans-serif grotesque partout (`Inter`), pas de serif éditorial — c'est ce
qui se voit sur les captures de delos.so. Titres en `font-bold`,
`tracking-tight`.

## Forme

Boutons et badges systématiquement en `rounded-full` (pilule) — le
changement de forme le plus visible sur les captures.

## Animation

`<Reveal>` (`components/Reveal.tsx`) : fade + `translateY` au scroll via
`IntersectionObserver`, courbe `cubic-bezier(0.16, 1, 0.3, 1)`
(`ease-premium`), délai par prop pour un effet de stagger. **Visible par
défaut** (SSR, JS désactivé, JS cassé, crawler) — n'est masqué en attente
d'animation qu'une fois confirmé côté client qu'IntersectionObserver va
pouvoir le révéler ensuite.

## État actuel

Page d'accueil = fondations du design system posées (couleurs, typo,
formes, animation) sur une structure minimale (Navbar, Hero, 3 blocs
placeholder, Footer). **Le contenu produit réel (fonctionnalités, tarifs,
témoignages, contact...) reste à écrire** — chaque section "à définir"
dans `Hero.tsx` est un emplacement réservé, pas du contenu final.
