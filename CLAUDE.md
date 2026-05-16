# CLAUDE.md - Djanni Studio (djannistudio.fr)

> Reference seche pour Claude. Tout le detail (stack, conventions, scripts) est dans
> `README.md`. Ce fichier liste UNIQUEMENT les pointeurs, les regles absolues et les
> gotchas qui ont deja coute du temps. Lire `README.md` en parallele a la premiere session.

---

## Contexte une ligne

Site vitrine et moteur d'acquisition de Djanni Studio (micro-entreprise dev web freelance, Dinard, fondee par Gianni Jardin). Le site lui-meme sert de preuve de savoir-faire : perf, accessibilite, SEO et securite doivent etre exemplaires.

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
| `apps/website/CLAUDE.md` | Conventions specifiques au site (App Router, i18n, sections, constants.ts, API routes, gestion d'erreurs) | Source de verite (DS-72) |
| `packages/ui/CLAUDE.md` | Decision DS-72 : non cree (3 primitives, DESIGN.md couvre les tokens). Conventions `@repo/ui` documentees dans apps/website/CLAUDE.md section 9 | N/A |
| Skills `djanni-*` | Taches metier (devis, prospection, blog, brand, etc) - chargement automatique | Source de verite |

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
8. **Composants UI partages dans `@repo/ui`** - import depuis `@repo/ui/components/*` ou `@repo/ui/lib/*`
9. **ASCII propre dans tout document genere** - tirets simples `-`, guillemets droits `"` `'`, pas d'espaces insecables, pas d'apostrophes courbes. Accents francais OK
10. **Aucune librairie d'animation JS** - ni Framer Motion, ni motion, ni autre. CSS-first uniquement (keyframes, transitions). Voir DESIGN.md section 9

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

## Workflow Git, Linear, devis (condense)

- Branches depuis `main` fresh, format `ds-NNN-slug-court` (ex: `ds-019-a-propos-v2`)
- Un ticket Linear = une branche = une PR. Equipe Linear : `Djanni Studio` (DS-XXX)
- Commits : francais, imperatif present, concis. Jamais de force-push sur main
- Avant de creer un ticket : `list_issues` pour eviter doublons
- Devis : format `DS-YYYY-NNN`, validite 30 jours, acompte 50/50 (sauf Presence 495/495)
- Mention obligatoire commerciale : `TVA non applicable, art. 293B du CGI`

Detail clauses devis : skill `djanni-devis`. Detail admin/fiscal : skill `djanni-admin-fiscal`.

---

## Ce que ce repo N'EST PAS

- Pas un site client (djannistudio.fr = vitrine de Djanni Studio lui-meme)
- Pas le GOAF Companion App (autre projet, autre repo, autre stack)
- Pas un site WordPress ou page builder (pur Next.js, code ecrit a la main)
- Pas un monorepo apps/api + apps/web (architecture actuelle : `apps/website` + `packages/ui` uniquement)

---

## Check avant chaque session

1. Lire `DESIGN.md` si on touche a l'UI
2. Verifier branche creee depuis `main` fresh
3. Identifier le ticket DS-XXX cible
4. Charger le skill Djanni pertinent pour les taches metier
5. i18n : toute cle ajoutee dans LES 3 fichiers de messages
6. `pnpm lint:fix && pnpm format` avant commit, `pnpm checks` avant push

---

## TODO - Ecarts, inconnus, choix en attente

A traiter au fil des sessions. Mis a jour par stop hook (a configurer en etape 3).

### [ECART vs cible]

- **DS-22** (CGV + AME CONSO mediator refonte) en draft - DOIT merger avant prochaine signature client pour conformite L.215-1 / L.221-5 / L.612-1
- **`motion` 12.x liste dans README** mais regle absolue n.10 interdit toute lib d'animation JS - soit retirer la dep du package.json, soit retirer la regle. Trancher
- **Stack declaree vs stack utilisee dans apps/website** (verifie code reel, DS-72) :
  - tRPC et Zod : declares dans la stack potentielle, 0 occurrence dans apps/website. API routes Next directes, validation manuelle (voir `apps/website/CLAUDE.md` section 6)
  - Drizzle : non utilise. Supabase : utilise via `@supabase/supabase-js` pour le CRM, pas dans `/api/contact` (route email-only)
  - Pas de `packages/db` ni `packages/api` dans le repo. Architecture monolithique cote app. A reconsiderer si un 2e app arrive (back-office, etc.)

### [INCONNU - a verifier en CLI]

- Version pnpm exacte : CLAUDE dit 10.30.2, README dit 10.32 - lancer `pnpm --version`
- SIRET reel : CLAUDE.md dit 102 087 822 00015, README dit 00000 - probablement README a un placeholder, a corriger
- Pipeline CI exact : `cat .github/workflows/*.yml` pour confirmer Biome lint + format check + Security Audit + Tests + TS strict typecheck + CodeQL
- Branches protegees et required checks : verifier dans GitHub settings du repo
- Convention de commit exacte : Conventional Commits (`feat:`, `fix:`, `chore:`) ou plus libre ? `git log --oneline -20` pour deduire

### [CHOIX EN ATTENTE]

- **Audience CLAUDE.md** confirmee : toi + Claude exclusivement. Si un freelance arrive un jour, creer `CONTRIBUTING.md` separe (pas ici)
- **Niveau de detail** confirme : reference seche au racine, detail dans les sous-CLAUDE.md
- **MCP servers a connecter par defaut** sur ce repo : a trancher en etape 4 (extension A3). Candidats : Linear DS, Supabase, Vercel, n8n
- **Strategie subagents** : a definir en etape 4

---

*Source de verite repo Djanni Studio - v4 index sec - mai 2026. Iteration sur v4 fusionnee (DS-70).*
