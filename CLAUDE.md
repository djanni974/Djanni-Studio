# CLAUDE.md - Djanni Studio (djannistudio.fr)

> Reference complete pour Claude sur ce repo. Tout le detail operationnel (stack,
> scripts, conventions) est aussi dans `README.md`. Lire `DESIGN.md` avant toute
> modification UI.

---

## Contexte projet

Repo du site djannistudio.fr, vitrine et moteur d'acquisition de Djanni Studio : micro-entreprise de developpement web freelance fondee par Gianni Jardin (charpentier-bardeur reconverti dev), basee a Dinard (35). Cible : artisans, commercants et TPE de la Cote d'Emeraude (Saint-Malo, Dinard, Dinan) + remote France.

Le site lui-meme sert de preuve de savoir-faire : ce qui est code ici doit etre exemplaire en perf, accessibilite, SEO, securite.

---

## Repo et environnement

| Element | Valeur |
|---------|--------|
| Repo | `git@github.com:djanni974/Djanni-Studio.git` |
| Prod | https://www.djannistudio.fr |
| Package manager | pnpm 10.30.2 (jamais npm ni yarn) |
| Runtime | Node 20+ |
| Architecture | Monorepo pnpm + Turborepo |
| Apps | `apps/website` (seul app actuellement) |
| Packages | `packages/ui` (seul package actuellement) |

---

## Sources de verite externes

| Document | Quand le lire | Niveau de confiance |
|----------|---------------|---------------------|
| `README.md` | Stack precise, scripts, variables d'env, design system, i18n, checklist PR | Source de verite |
| `DESIGN.md` | Toute decision UI/visuelle. Section 7 (CSS-first), section 9 (no JS animation lib) | Source de verite |
| `apps/website/CLAUDE.md` | Conventions specifiques au site (App Router, sections, constants.ts) | Source de verite (a creer DS-XXX) |
| `packages/ui/CLAUDE.md` | Conventions composants partages, design tokens | Source de verite (a creer DS-XXX) |
| Skills `djanni-*` | Taches metier (devis, prospection, blog, brand, etc) - chargement automatique | Source de verite |

---

## Identite administrative (references rapides)

| Champ | Valeur |
|-------|--------|
| Nom commercial | Djanni Studio |
| Raison sociale | Gianni Jardin (EI) |
| SIRET | 102 087 822 00015 |
| APE | 6201Z (Programmation informatique) |
| Email | contact@djannistudio.fr |
| Telephone | 07 49 54 74 98 |
| Mail pro heberge chez | Hostinger |
| Nameservers DNS | Vercel |
| TVA | Non applicable (art. 293B CGI) |
| ACRE | Active jusqu'au 31/12/2026 |
| Facturation | Indy (outil externe, pas dans ce repo) |

Detail admin/fiscal complet : voir skill `djanni-admin-fiscal`.
Detail charte/branding : voir skill `djanni-brand`.

---

## Regles absolues

Non negociables, quel que soit le contexte ou la pression.

1. **pnpm uniquement** - jamais npm ni yarn
2. **Biome** pour lint + format - pas Prettier, pas ESLint. `pnpm lint:fix && pnpm format` avant tout commit
3. **i18n obligatoire** - tout texte visible passe par `next-intl`. Toute cle ajoutee dans LES 3 FICHIERS : `fr.json`, `en.json`, `br.json`
4. **Pas de `next/link` direct** - utiliser `Link` de `@/i18n/navigation`
5. **Pas de `dark:` inline** - dark mode via CSS custom properties dans `globals.css`
6. **Pas de force push sur `main`** - branches creees depuis main fresh, jamais depuis une autre feature
7. **Donnees statiques dans `constants.ts`** - source unique de verite, ne jamais dupliquer
8. **Composants UI partages dans `@repo/ui`** - Button, Badge, Separator, `cn()`. Import depuis `@repo/ui/components/*` ou `@repo/ui/lib/*`
9. **ASCII propre dans tout document genere** - tirets simples `-`, guillemets droits `"` `'`, pas d'espaces insecables, pas d'apostrophes courbes. Accents francais OK
10. **Aucune librairie d'animation JS** - ni Framer Motion, ni motion, ni autre. CSS-first uniquement (keyframes, transitions). Voir DESIGN.md section 9

---

## Stack technique

- **Framework** : Next.js 16.2.3 (App Router)
- **Runtime** : Node 20+
- **Langage** : TypeScript (strict)
- **Package manager** : pnpm 10.30.2
- **Architecture** : Monorepo Turborepo
- **Style** : Tailwind CSS v4 (`@theme inline` + CSS custom properties dans `packages/ui/src/styles/globals.css`)
- **Animations** : CSS-first (keyframes, transitions CSS)
- **Linter / formatter** : Biome
- **i18n** : next-intl (locales : fr, en, br)
- **Analytics** : Plausible (sans cookies, RGPD-friendly)
- **Email transactionnel** : Resend
- **Rate limit** : Upstash
- **Service Worker** : Serwist
- **CI** : GitHub Actions
- **Deploiement** : Vercel

---

## Structure du monorepo

```
apps/
  website/                    # Next.js 16 (App Router) - site principal
    src/
      app/
        globals.css           # Imports UI globals + animations + noise overlay
        layout.tsx            # Root layout (fonts, metadata, JSON-LD, Plausible)
        robots.ts             # SEO (disallow /api/)
        sitemap.ts            # Sitemap dynamique (locales + projets + blog)
        sw.ts                 # Service Worker Serwist
        api/
          contact/route.ts    # POST - formulaire contact (Resend + rate limit Upstash)
        [locale]/
          layout.tsx          # Navbar, Footer, FloatingCta
          template.tsx        # Animations de transition
          page.tsx            # Accueil
          a-propos/
          avis/
          blog/               # Index + [slug]
          cgv/
          demande-projet/     # Formulaire de demande de projet
          mentions-legales/
          offres/
          politique-de-confidentialite/
          realisations/       # Index + [slug] (etudes de cas)
      components/
        cards/                # pricing-card, project-card, testimonial-card, process-step-card
        layout/               # navbar, footer, language-switcher
        sections/             # hero, offres, realisations, faq, blog, contact-form,
                              # project-request-form, about-content, case-study-content, etc.
        ui/                   # animated-section, aurora-background, browser-mockup, floating-cta,
                              # lamp, accordion, section-header, section-divider,
                              # text-hover-effect, profile-card
        providers.tsx         # ThemeProvider + QueryClient + Sonner
      i18n/
        routing.ts            # Locales config (fr, en, br) + prefix as-needed
        request.ts            # Chargement des messages par locale
        navigation.ts         # Link, redirect, usePathname, useRouter, getPathname
      lib/
        constants.ts          # Donnees statiques (~745 lignes) - TOUT est ici
        metadata.ts           # Helper metadata par page
      messages/
        fr.json               # ~815 lignes - francais (defaut)
        en.json               # ~800 lignes - anglais
        br.json               # ~807 lignes - breton
    public/
      projects/               # Screenshots realisations
      icons/                  # PWA icons (192, 512)
      manifest.json           # PWA manifest
      og-image.png            # Image OpenGraph
packages/
  ui/                         # Composants partages + design tokens
    src/
      components/             # badge, button, separator
      lib/utils.ts            # cn() - class merge helper (clsx + tailwind-merge)
      styles/globals.css      # @theme inline (Tailwind v4) + CSS custom properties
```

---

## Source de verite design

`DESIGN.md` a la racine du repo est LA reference pour toute decision visuelle ou UI.

Sections cles :
- Section 7 : approche CSS-first (toujours prioriser CSS natif avant JS)
- Section 9 : interdiction Framer Motion et librairies d'animation JS
- Tokens couleurs, typographie, spacing, breakpoints

Avant toute modification de composant ou de page, lire `DESIGN.md` si ce n'est pas deja fait dans la session.

---

## Gotchas critiques (deja coute du temps)

Patterns appris a la dure. Ne pas re-tomber dedans.

- **Gitignore qui cache les regles techniques** - resolu en avril 2026. Verifier que `CLAUDE.md`, `DESIGN.md` et tout `*.md` racine ne sont pas ignores avant commit
- **Conflit DNS Hostinger vs Vercel** - resolu en mars 2026. Nameservers chez Vercel, mail pro chez Hostinger. Ne pas re-migrer sans plan
- **Caracteres non-ASCII reintroduits par copier-coller** - depuis Notion, Word ou editeur "intelligent". Em dash, apostrophe courbe, guillemets s'infiltrent. Toujours verifier avant commit
- **Webhook n8n Bearer auth** - si la cle est ratee, silent fail cote n8n. Tester en bout en bout apres tout changement
- **Supabase RLS** - ajouter une table sans RLS = donnees publiques. Coder le RLS en reflexe avant le premier insert
- **shadcn registry sous Tailwind v4** - v4 a casse les conventions v3 (couleurs HSL -> oklch, config en CSS au lieu de JS). Ne pas appliquer aveuglement les snippets shadcn trouves en ligne
- **Build prod Webpack obligatoire** - Serwist ne supporte pas Turbopack en build. Dev en Turbopack OK, build en Webpack obligatoire
- **Plausible et previews Vercel** - ne pas tracker les preview URLs

---

## Workflow Git

- Toujours creer les branches depuis `main` fresh (jamais depuis une autre feature)
- Un ticket Linear = une branche = une PR
- Format nom de branche : `ds-NNN-slug-court` (ex: `ds-019-a-propos-v2`)
- Messages de commit : francais, imperatif present, concis
- Jamais de force-push sur `main`
- PR toujours passee par review avant merge

---

## Tickets Linear

- Equipe : **Djanni Studio**
- Format ID : `DS-XXX` (numerotation continue)
- Avant de creer un nouveau ticket, toujours lister les tickets existants (`list_issues`) pour eviter les doublons

---

## Numerotation devis

- Format : `DS-YYYY-NNN` (ex: `DS-2026-001`)
- Validite standard : **30 jours**
- Acompte : **50% signature / 50% livraison**, sauf offre Presence = 495 EUR / 495 EUR
- Penalites de retard : 3x taux legal
- Mention obligatoire sur tout document commercial : `TVA non applicable, art. 293B du CGI`

Detail complet des clauses : voir skill `djanni-devis`.

---

## Skills Djanni disponibles (pointeur)

Claude charge le skill pertinent avant toute tache metier. `djanni-brand` se charge automatiquement en complement des autres skills Djanni.

| Skill | Usage |
|-------|-------|
| `djanni-brand` | Source de verite ton/voix/identite - charge avec les autres |
| `djanni-presence` | Offre Presence (990 EUR, 1 page, 2 semaines) |
| `djanni-vitrine` | Offre Vitrine (1 490 EUR, jusqu'a 5 pages, 3 semaines) |
| `djanni-sur-mesure` | Offre Sur mesure (1 990 EUR+, jusqu'a 8 pages, 3-5 semaines) |
| `djanni-devis` | Devis, propositions commerciales, bons de commande |
| `djanni-prospection` | Recherche prospects, scripts cold call, objections |
| `djanni-relance` | Relance prospect/client silencieux |
| `djanni-onboarding-client` | Process post-signature jusqu'a livraison |
| `djanni-case-study` | Etudes de cas (/realisations, contenu social) |
| `djanni-social-posts` | Posts Instagram / LinkedIn / Facebook |
| `djanni-web-audit` | Audit sites prospects ou concurrents |
| `djanni-review` | Review interne pages (juridique, copy, coherence) |
| `djanni-admin-fiscal` | URSSAF, ACRE, declarations, echeances |
| `djanni-brainstorm` | Brainstorming strategique et deblocage |
| `pcg-traducteur` | Comptabilite PCG (compte pour une operation) |

---

## Ce que ce repo N'EST PAS

- **Pas un site client** : djannistudio.fr est la vitrine de Djanni Studio lui-meme
- **Pas le GOAF Companion App** : autre projet, autre repo, autre stack
- **Pas un site WordPress ou page builder** : pur Next.js, code ecrit a la main
- **Pas un monorepo apps/api + apps/web** : architecture actuelle = `apps/website` + `packages/ui` uniquement

---

## Check rapide avant chaque session

1. Lire `DESIGN.md` si on touche a l'UI
2. Verifier qu'on est sur une branche creee depuis `main` fresh
3. Identifier le ticket DS-XXX cible avant de coder
4. Charger le skill Djanni pertinent avant une tache metier
5. i18n : toute cle ajoutee dans les 3 fichiers (`fr.json`, `en.json`, `br.json`)
6. `pnpm lint:fix && pnpm format` avant commit, `pnpm checks` avant push
7. Formater les outputs en ASCII propre (pas d'em dashes, pas de guillemets typographiques)

---

## TODO - Ecarts, inconnus, choix en attente

A traiter au fil des sessions. Mis a jour par stop hook (a configurer en etape 3).

### [ECART vs cible]

- **DS-22** (CGV + AME CONSO mediator refonte) en draft - DOIT merger avant prochaine signature client pour conformite L.215-1 / L.221-5 / L.612-1
- **`motion` 12.x liste dans README** mais regle absolue n.10 interdit toute lib d'animation JS - soit retirer la dep du package.json, soit retirer la regle. Trancher
- **Pas de packages/db ni packages/api** alors que le projet utilise Supabase et a un router tRPC potentiel - actuellement tout dans `apps/website`. A statuer : extraire dans des packages ou rester monolithique cote app

### [INCONNU - a verifier en CLI]

- Version pnpm exacte : CLAUDE dit 10.30.2, README dit 10.32 - lancer `pnpm --version`
- SIRET reel : CLAUDE.md dit 102 087 822 00015, README dit 00000 - probablement README a un placeholder, a corriger
- Pipeline CI exact : `cat .github/workflows/*.yml` pour confirmer Biome lint + format check + Security Audit + Tests + TS strict typecheck + CodeQL
- Branches protegees et required checks : verifier dans GitHub settings du repo
- Convention de commit exacte : Conventional Commits (`feat:`, `fix:`, `chore:`) ou plus libre ? `git log --oneline -20` pour deduire

### [CHOIX EN ATTENTE]

- **Audience CLAUDE.md** confirmee : toi + Claude exclusivement. Si un freelance arrive un jour, creer `CONTRIBUTING.md` separe (pas ici)
- **Niveau de detail** confirme : reference complete au racine, conventions specifiques dans les sous-CLAUDE.md
- **MCP servers a connecter par defaut** sur ce repo : a trancher en etape 4 (extension A3). Candidats : Linear DS, Supabase, Vercel, n8n
- **Strategie subagents** : a definir en etape 4

---

*Source de verite repo Djanni Studio - v4 fusionnee - mai 2026. Iteration sur v3 (avril 2026).*
