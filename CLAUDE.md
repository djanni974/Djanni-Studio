# CLAUDE.md - Djanni Studio (djannistudio.fr)

## Contexte projet

Repo du site djannistudio.fr, vitrine et moteur d'acquisition de Djanni Studio : micro-entreprise de développement web freelance fondée par Gianni Jardin (charpentier-bardeur reconverti dev), basée à Dinard (35). Cible : artisans, commerçants et TPE de la Côte d'Émeraude (Saint-Malo, Dinard, Dinan) + remote France.

Le site lui-même sert de preuve de savoir-faire : ce qui est codé ici doit être exemplaire en perf, accessibilité, SEO, sécurité.

---

## Repo et environnement

| Élément | Valeur |
|---------|--------|
| Repo | `git@github.com:djanni974/Djanni-Studio.git` |
| Prod | https://www.djannistudio.fr |
| Package manager | pnpm 10.30.2 |
| Runtime | Node 20+ |
| Architecture | Monorepo pnpm + Turborepo |

---

## Identité administrative (références rapides)

| Champ | Valeur |
|-------|--------|
| Nom commercial | Djanni Studio |
| Raison sociale | Gianni Jardin (EI) |
| SIRET | 102 087 822 00015 |
| APE | 6201Z (Programmation informatique) |
| Email | contact@djannistudio.fr |
| Téléphone | 07 49 54 74 98 |
| Mail pro hébergé chez | Hostinger |
| Nameservers DNS | Vercel |
| TVA | Non applicable (art. 293B CGI) |
| ACRE | Active jusqu'au 31/12/2026 |
| Facturation | Indy (outil externe, pas dans ce repo) |

Détail admin/fiscal complet : voir skill `djanni-admin-fiscal`.
Détail charte/branding : voir skill `djanni-brand`.

---

## Règles absolues

Ces règles ne sont jamais contournées, quel que soit le contexte.

1. **pnpm uniquement** - jamais npm ni yarn.
2. **Biome** - pas Prettier, pas ESLint. Lancer `pnpm lint:fix && pnpm format` avant tout commit.
3. **i18n obligatoire** - tout texte visible passe par `next-intl`. Toute clé ajoutée dans **les 3 fichiers** : `fr.json`, `en.json`, `br.json`.
4. **Pas de `next/link` direct** - utiliser `Link` de `@/i18n/navigation`.
5. **Pas de `dark:` inline** - le dark mode est géré par CSS custom properties dans `globals.css`.
6. **Pas de force push sur `main`** - branches toujours créées depuis main fresh.
7. **Données statiques dans `constants.ts`** - source unique de vérité, ne jamais dupliquer.
8. **Composants UI partagés dans `@repo/ui`** - Button, Badge, Separator, `cn()`. Import depuis `@repo/ui/components/*` ou `@repo/ui/lib/*`.
9. **ASCII propre dans tout document généré** - pas d'em dashes (toujours tirets simples `-`), pas de guillemets typographiques (toujours `"` et `'`), pas d'espaces insécables, pas d'apostrophes courbes. Les accents français sont OK.
10. **Aucune librairie d'animation JS** - ni Framer Motion, ni motion, ni autre. CSS-first uniquement (keyframes, transitions). Voir `DESIGN.md` section 9.

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
- **Déploiement** : Vercel

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
          realisations/       # Index + [slug] (études de cas)
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
        constants.ts          # Données statiques (~745 lignes) - TOUT est ici
        metadata.ts           # Helper metadata par page
      messages/
        fr.json               # ~815 lignes - français (défaut)
        en.json               # ~800 lignes - anglais
        br.json               # ~807 lignes - breton
    public/
      projects/               # Screenshots réalisations
      icons/                  # PWA icons (192, 512)
      manifest.json           # PWA manifest
      og-image.png            # Image OpenGraph
packages/
  ui/                         # Composants partagés + design tokens
    src/
      components/             # badge, button, separator
      lib/utils.ts            # cn() - class merge helper (clsx + tailwind-merge)
      styles/globals.css      # @theme inline (Tailwind v4) + CSS custom properties
```

---

## Source de vérité design

`DESIGN.md` à la racine du repo est LA référence pour toute décision visuelle ou UI.

Sections clés :
- Section 7 : approche CSS-first (toujours prioriser CSS natif avant JS)
- Section 9 : interdiction Framer Motion et librairies d'animation JS
- Tokens couleurs, typographie, spacing, breakpoints

Avant toute modification de composant ou de page, lire `DESIGN.md` si ce n'est pas déjà fait dans la session.

---

## Workflow Git

- Toujours créer les branches depuis `main` fresh (jamais depuis une autre feature)
- Un ticket Linear = une branche = une PR
- Format nom de branche : `ds-NNN-slug-court` (ex: `ds-019-a-propos-v2`)
- Messages de commit : français, impératif présent, concis
- Jamais de force-push sur `main`
- PR toujours passée par review avant merge

---

## Tickets Linear

- Équipe : **Djanni Studio**
- Format ID : `DS-XXX` (numérotation continue)
- Avant de créer un nouveau ticket, toujours lister les tickets existants (`list_issues`) pour éviter les doublons

---

## Numérotation devis

- Format : `DS-YYYY-NNN` (ex: `DS-2026-001`)
- Validité standard : **30 jours**
- Acompte : **50% signature / 50% livraison**, sauf offre Présence = 495 EUR / 495 EUR
- Pénalités de retard : 3x taux légal
- Mention obligatoire sur tout document commercial : `TVA non applicable, art. 293B du CGI`

Détail complet des clauses : voir skill `djanni-devis`.

---

## Skills Djanni disponibles (pointeur)

Claude charge le skill pertinent avant toute tâche métier. `djanni-brand` se charge automatiquement en complément des autres skills Djanni.

| Skill | Usage |
|-------|-------|
| `djanni-brand` | Source de vérité ton/voix/identité - chargé avec les autres |
| `djanni-presence` | Offre Présence (990 EUR, 1 page, 2 semaines) |
| `djanni-vitrine` | Offre Vitrine (1 490 EUR, jusqu'à 5 pages, 3 semaines) |
| `djanni-sur-mesure` | Offre Sur mesure (1 990 EUR+, jusqu'à 8 pages, 3-5 semaines) |
| `djanni-devis` | Devis, propositions commerciales, bons de commande |
| `djanni-prospection` | Recherche prospects, scripts cold call, objections |
| `djanni-relance` | Relance prospect/client silencieux |
| `djanni-onboarding-client` | Process post-signature jusqu'à livraison |
| `djanni-case-study` | Études de cas (/realisations, contenu social) |
| `djanni-social-posts` | Posts Instagram / LinkedIn / Facebook |
| `djanni-web-audit` | Audit sites prospects ou concurrents |
| `djanni-review` | Review interne pages (juridique, copy, cohérence) |
| `djanni-admin-fiscal` | URSSAF, ACRE, déclarations, échéances |
| `djanni-brainstorm` | Brainstorming stratégique et déblocage |
| `pcg-traducteur` | Comptabilité PCG (compte pour une opération) |

---

## Ce que ce repo N'EST PAS

- **Pas un site client** : djannistudio.fr est la vitrine de Djanni Studio lui-même
- **Pas le GOAF Companion App** : autre projet, autre repo, autre stack
- **Pas un site WordPress ou page builder** : pur Next.js, code écrit à la main

---

## Check rapide avant chaque session

1. Lire `DESIGN.md` si on touche à l'UI
2. Vérifier qu'on est sur une branche créée depuis `main` fresh
3. Identifier le ticket DS-XXX cible avant de coder
4. Charger le skill Djanni pertinent avant une tâche métier
5. i18n : toute clé ajoutée dans les 3 fichiers (`fr.json`, `en.json`, `br.json`)
6. `pnpm lint:fix && pnpm format` avant commit
7. Formater les outputs en ASCII propre (pas d'em dashes, pas de guillemets typographiques)

---

*Source de vérité repo Djanni Studio - avril 2026*