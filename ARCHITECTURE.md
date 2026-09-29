# Architecture — Cap+ (dashboard client de Cap Entreprendre France)

## Où ça se situe dans l'écosystème de Maëlle

Il y a **deux dashboards distincts**, volontairement séparés :

1. **`capia-assistants-dashboard`** (repo séparé) — le cockpit **interne** de
   Maëlle : 48 assistants qu'elle utilise elle-même pour piloter son agence.
   Pas touché par ce repo.
2. **`Cap+` (ce repo)** — le dashboard **client** : un compte nominatif par
   client de Cap Entreprendre France, avec le(s) assistant(s) métier que
   Maëlle lui assigne après sa commande (offre « Assistants métier »,
   ~2 500 € en forfait installation — voir `Pricing.tsx`). C'est ce repo qui
   correspond à la demande initiale de clonage du design de delos.so.

Le dashboard client doit être accessible depuis le site public de Cap
Entreprendre France (`cap-visibility-forge.lovable.app`) — un lien de
connexion à ajouter là-bas une fois ce dashboard déployé (pas encore fait,
ce repo n'est pas déployé).

## Ce qui existe maintenant dans ce repo

- **Page marketing** (`/`) — présentation de l'offre, inspirée du design
  observé sur delos.so (voir `DESIGN_SYSTEM.md`).
- **Dashboard client réel**, backé par Supabase :
  - `/login` — connexion email + mot de passe (pas d'auto-inscription).
  - `/dashboard` — un client connecté voit uniquement ses propres
    assistants (isolation par Row Level Security), et peut converser avec
    chacun (`/api/chat`, backend OpenAI).
  - `/admin` — réservé aux comptes `is_admin = true` : formulaire pour
    créer un nouveau client + lui assigner un premier assistant après sa
    commande. C'est le geste « ajoute suivant la commande » dont tu as
    parlé.

## Projet Supabase

- Nom : `capia-espace-client`, région `eu-west-1`, id `eplatvjvvseoybvikxaa`.
- Tables : `profiles` (1 par utilisateur, `is_admin` distingue toi vs un
  client) et `assistants` (assignés à un `owner_id`, avec leur
  `system_prompt`). RLS activée : un client ne voit jamais les données d'un
  autre.
- Ce projet est **séparé** de tes projets Supabase existants
  (`Immoexpert`, et ton projet par défaut) — pas de mélange de données.

## Variables d'environnement à configurer (jamais dans le dépôt)

Dans Vercel (ou `.env.local` en dev, déjà gitignored) :

| Variable | Où la trouver |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Déjà connue : `https://eplatvjvvseoybvikxaa.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API (clé publique, sans risque) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API > `service_role` — **secrète**, je n'y ai pas accès, à toi de la copier |
| `OPENAI_API_KEY` | platform.openai.com — nécessaire pour que les assistants répondent |
| `BOOTSTRAP_SECRET` | Un secret que tu inventes toi-même (ex. mot de passe long aléatoire) |

## Créer ton propre compte admin (une seule fois)

Une fois les variables ci-dessus configurées et le site déployé :

```bash
curl -X POST https://<ton-domaine>/api/admin/bootstrap \
  -H "Content-Type: application/json" \
  -H "x-bootstrap-secret: <BOOTSTRAP_SECRET>" \
  -d '{"email":"toi@exemple.com","password":"un-mot-de-passe-solide","name":"Maëlle"}'
```

Cette route se désactive automatiquement dès qu'un admin existe déjà — elle
ne peut pas servir à en créer un deuxième par erreur.

Ensuite, connecte-toi sur `/login` avec cet email/mot de passe, va sur
`/admin`, et crée tes premiers comptes clients.

## Ce qui n'est PAS encore fait

- Déploiement (Vercel) — pas encore fait, ce repo n'existe qu'en local pour
  l'instant côté exécution (le code est poussé sur GitHub).
- Lien depuis `cap-visibility-forge.lovable.app` vers `/login` de ce
  dashboard.
- Pas de flux de réinitialisation de mot de passe pour les clients (à
  ajouter si besoin — Supabase Auth le permet nativement).
- Pas d'email de bienvenue automatique envoyé au client à la création de
  son compte (le formulaire `/admin` crée juste le compte ; c'est à toi de
  communiquer ses identifiants pour l'instant).
