# Djanni Studio

> Studio freelance basé à Dinard (Bretagne). Sites web sur mesure pour artisans, commerçants et petites entreprises locales.

**Prod** : [djannistudio.fr](https://www.djannistudio.fr) · **Stack** : Next.js 16 · React 19 · Tailwind v4 · next-intl · Turborepo

---

## Sommaire

- [À propos](#à-propos)
- [Stack technique](#stack-technique)
- [Structure du monorepo](#structure-du-monorepo)
- [Démarrage rapide](#démarrage-rapide)
- [Scripts](#scripts)
- [Conventions](#conventions)
- [Variables d'environnement](#variables-denvironnement)
- [Design system](#design-system)
- [i18n](#i18n)
- [Déploiement](#déploiement)
- [Checklist avant PR](#checklist-avant-pr)
- [Licence & contact](#licence--contact)

---

## À propos

Djanni Studio est une micro-entreprise fondée par **Gianni Jardin**, ancien charpentier-couvreur reconverti dans le développement web. L'idée : des sites rapides, propres, sans usine à gaz, pensés pour les artisans qui veulent être visibles sur Google sans se ruiner.

Ce dépôt contient le site vitrine officiel du studio, construit en monorepo pnpm + Turborepo.

---

## Stack technique

| Catégorie            | Techno                | Version  | Notes                                           |
|----------------------|-----------------------|----------|-------------------------------------------------|
| Framework            | Next.js (App Router)  | 16.2     | Dev Turbopack, build Webpack (requis Serwist)   |
| UI                   | React                 | 19.2     | Server Components par défaut                    |
| Langage              | TypeScript            | 6.0      | Mode strict                                     |
| Styling              | Tailwind CSS          | 4.2      | `@theme inline` + CSS custom properties         |
| i18n                 | next-intl             | 4.9      | 3 locales : `fr` (défaut), `en`, `br`           |
| Animations           | motion                | 12.x     | CSS-first privilégié depuis DS-009              |
| Linter / Formatter   | Biome                 | 2.4      | Tabs, double quotes, pas de semicolons          |
| Thème                | next-themes           | 0.4      | Défaut : dark, `enableSystem={false}`           |
| PWA                  | Serwist               | 9.5      | Désactivé en dev                                |
| Emails               | Resend                | 6.12     | Formulaire contact                              |
| Rate limiting        | @upstash/ratelimit    | 2.0      | 3 req/min sur `/api/contact`                    |
| Data fetching        | @tanstack/react-query | 5.x      | Client-side uniquement                          |
| Toasts               | sonner                | 2.0      | Bottom-right                                    |
| Analytics            | Plausible             | –        | Proxy via rewrites                              |
| Icônes               | @tabler/icons-react   | 3.41     | Optimisé via `optimizePackageImports`           |
| Monorepo             | Turborepo             | 2.9      | pnpm workspaces                                 |
| Package manager      | pnpm                  | 10.32    | Jamais npm ni yarn                              |

---

## Structure du monorepo

```
.
├── apps/
│   └── website/                Site Next.js 16 (App Router)
│       ├── src/
│       │   ├── app/            Routes, layout, API (/api/contact)
│       │   ├── components/     cards, layout, sections, ui, providers
│       │   ├── i18n/           routing, request, navigation (Link custom)
│       │   ├── lib/            constants.ts (source unique de vérité), metadata.ts
│       │   └── messages/       fr.json, en.json, br.json
│       └── public/             projects/, icons/, manifest.json, og-image.png
└── packages/
    └── ui/                     Composants partagés (Button, Badge, Separator)
        └── src/
            ├── components/
            ├── lib/utils.ts    cn()
            └── styles/globals.css
```

---

## Démarrage rapide

**Prérequis** : Node ≥ 20, pnpm ≥ 10.

```bash
# Installation
pnpm install

# Développement (tout le monorepo, Turbopack)
pnpm dev

# Site seul
pnpm --filter website dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

---

## Scripts

Commandes racine (Turborepo) :

| Script              | Description                                    |
|---------------------|------------------------------------------------|
| `pnpm dev`          | Dev serveur (Turbopack)                        |
| `pnpm build`        | Build prod (Webpack, requis par Serwist)       |
| `pnpm lint`         | Biome check (lecture seule)                    |
| `pnpm lint:fix`     | Biome check --write                            |
| `pnpm format`       | Biome format --write                           |
| `pnpm type-check`   | tsc --noEmit                                   |
| `pnpm checks`       | lint + type-check (à lancer avant chaque push) |

Commandes filtrées sur le site :

```bash
pnpm --filter website dev
pnpm --filter website build
pnpm --filter website start     # Servir le build prod
```

---

## Conventions

- **pnpm uniquement**. Pas de `npm install`, pas de `yarn add`.
- **Biome** gère lint et format. Tabs (affichage 2), double quotes, pas de `;` sauf nécessaire, trailing commas, line width 100.
- **i18n obligatoire** : tout texte visible passe par `next-intl`. Toute clé ajoutée dans les **3 fichiers** (`fr.json`, `en.json`, `br.json`).
- **Pas de `next/link` direct** : importer `Link` depuis `@/i18n/navigation`.
- **Pas de classes `dark:` inline** : le dark mode passe par des CSS custom properties dans `globals.css`.
- **Données statiques dans `constants.ts`** : source unique de vérité, jamais de duplication.
- **Composants UI partagés** : depuis `@repo/ui/components/*` ou `@repo/ui/lib/*`.
- **Pas de force push sur `main`**.

---

## Variables d'environnement

Copier `apps/website/.env.example` en `apps/website/.env.local` puis remplir :

| Variable                       | Requis       | Usage                                           |
|--------------------------------|--------------|-------------------------------------------------|
| `RESEND_API_KEY`               | Prod         | Envoi d'emails (formulaire contact)             |
| `UPSTASH_REDIS_REST_URL`       | Optionnel    | Rate limiting distribué (fallback in-memory)    |
| `UPSTASH_REDIS_REST_TOKEN`     | Optionnel    | Token associé à l'URL Upstash                   |
| `CONTACT_EMAIL`                | Optionnel    | Destinataire interne (défaut : contact@djannistudio.fr) |
| `N8N_WEBHOOK_URL`              | Optionnel    | Notification SMS prospects (désactivé si vide)  |
| `N8N_WEBHOOK_SECRET`           | Optionnel    | Secret partagé avec le workflow n8n             |
| `ANTHROPIC_API_KEY`            | Optionnel    | Chatbot IA                                      |
| `NEXT_PUBLIC_SUPABASE_URL`     | Optionnel    | Stockage leads chatbot                          |
| `SUPABASE_SERVICE_ROLE_KEY`    | Optionnel    | Clé serveur Supabase                            |

Ne jamais committer de fichier `.env*` contenant des secrets.

---

## Design system

**Polices** : `DM Sans` pour le corps (`font-sans`), `Syne` pour les titres (`font-heading`). Google Fonts, `display: swap`.

**Couleurs brand** :

| Token            | Hex       | Usage                   |
|------------------|-----------|-------------------------|
| `--orange`       | `#e8500a` | Primary, CTA            |
| `--orange-light` | `#f07040` | Accent                  |
| `--black`        | `#0c0c0b` | Fond dark, texte light  |
| `--white`        | `#f5f2ec` | Fond light, texte dark  |
| `--cream`        | `#ede9e0` | Fond alternatif         |

**Surfaces** (`surface-a`, `surface-b`, `surface-c`) basculent automatiquement entre light et dark via les CSS custom properties.

**Radius** : `--radius: 0.75rem` (variantes sm, md, lg, xl).

**Dark mode** : thème par défaut. Piloté par `next-themes` via la classe `.dark` sur `<html>`. Pas d'utilitaires `dark:` de Tailwind en inline.

---

## i18n

Trois locales : `fr` (défaut, pas de préfixe d'URL), `en` (`/en/...`), `br` (`/br/...`). Préfixe : `as-needed`. Pas de `middleware.ts` custom, le plugin `next-intl` est branché dans `next.config.ts`.

**Ajouter un texte** :

1. Créer la clé dans `apps/website/src/messages/fr.json`, `en.json` **et** `br.json`.
2. Utiliser côté composant : `const t = useTranslations("namespace")`.

Namespaces principaux : `metadata`, `nav`, `hero`, `stats`, `offres`, `blog`, `realisations`, `contact`, `breadcrumb`, `faq`, `about`, `demandeProjet`.

---

## Déploiement

- **Hébergement** : Vercel.
- **Build prod** : Webpack obligatoire (`next build --webpack`). Serwist ne supporte pas Turbopack en build.
- **Domaine et email pro** : Hostinger.
- **Plausible** : proxifié via rewrites dans `next.config.ts` (`/js/script.js`, `/api/event`).
- **PWA** : `sw.js` généré au build, désactivé en dev, navigation preload activée.

---

## Checklist avant PR

1. `pnpm lint:fix && pnpm format` : zéro erreur Biome.
2. `pnpm type-check` : zéro erreur TypeScript.
3. `pnpm build` : le build Webpack passe.
4. Clés i18n présentes dans `fr.json`, `en.json` **et** `br.json`.
5. Pas de données en dur qui devraient être dans `constants.ts`.
6. Pas de `next/link` direct, uniquement `@/i18n/navigation`.
7. Pas de classes `dark:` inline.
8. Pas de `npm install` ou `yarn add`, uniquement `pnpm add`.

---

## Licence & contact

Projet privé, tous droits réservés.

**Djanni Studio** · Gianni Jardin · Dinard (35800), Bretagne
SIRET : 102 087 822 00000 · APE : 62.01Z
[contact@djannistudio.fr](mailto:contact@djannistudio.fr) · 07 49 54 74 98

*TVA non applicable, art. 293B du CGI.*
