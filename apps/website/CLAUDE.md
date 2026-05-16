# apps/website/CLAUDE.md

Site vitrine Djanni Studio (djannistudio.fr). Next.js 16 App Router multilingue (fr/en/br), Tailwind v4 + composants `@repo/ui`, deploiement Vercel.

Lecture : ce fichier complete le `CLAUDE.md` racine (non-negociables transverses + workflow Git) et `DESIGN.md` (source de verite design). Lire les trois avant toute modif structurante.

---

## 1. Stack effective dans apps/website

Versions verifiees dans `apps/website/package.json` :

- Next.js 16.2.4 (App Router, segment racine `[locale]`)
- TypeScript strict
- next-intl 4.9 (3 locales : fr, en, br)
- Tailwind v4 + composants `@repo/ui` (Button, Badge, Separator, `cn()`, `globals.css`)
- Resend 6.12 (email : notif interne + confirmation prospect)
- Upstash Redis + Ratelimit (rate limit avec fallback memoire si vars manquent)
- n8n webhook async (fire-and-forget pour SMS Free Mobile)
- Supabase ssr 0.10 + supabase-js 2.104 (clients server + admin pour audits, projects, testimonials)
- Sonner 2.0 (toasts client)
- next-themes 0.4 (dark mode via CSS custom properties, voir DESIGN.md)
- Serwist 9.5 via `@serwist/next` (Service Worker PWA)
- `@vercel/speed-insights` + Plausible (analytics RGPD-friendly, sans cookies)

**[ECART vs stack racine]** :
- tRPC declare en stack racine mais 0 occurrence dans `apps/website` (verifie sur le code). Probablement reserve a un futur back-office ou `packages/api` non extrait
- Zod declare en stack racine mais 0 occurrence dans `apps/website`. Validation manuelle partout (voir section 6)

A clarifier dans le CLAUDE.md racine pour reduire l'ambiguite.

---

## 2. Arborescence apps/website/src

```
src/
  app/
    [locale]/
      (city-pages)/         # route group, pages SEO locales
      a-propos/
      avis/
      blog/                 # index + [slug]
      cgv/
      demande-projet/       # formulaire long
      maintenance/
      mentions-legales/
      offres/
      options/
      plan-du-site/
      politique-de-confidentialite/
      realisations/         # index + [slug]
      error.tsx             # error boundary route-level
      layout.tsx            # Navbar, Footer, FloatingCta
      template.tsx          # transitions de page
      page.tsx              # accueil
    api/
      admin/audits/         # POST/GET, auth admin requise
      audits/[slug]/        # GET, supabase admin + view tracking
      contact/              # POST, Resend + Upstash + n8n
      projects/             # GET, supabase RLS
      testimonials/         # GET, supabase RLS
    audit/[slug]/           # page audit (hors [locale], URL directe)
    globals.css
    layout.tsx              # Root layout (fonts, metadata, JSON-LD)
    robots.ts
    sitemap.ts
    sw.ts                   # Serwist service worker
  components/
    analytics/              # plausible-script
    cards/                  # 6 fichiers, metier-specifique par type de donnee
    layout/                 # navbar, footer, language-switcher
    sections/               # 21 fichiers, blocs de page complets
    seo/                    # json-ld
    ui/                     # 13 fichiers, primitives reutilisables
    providers.tsx
  i18n/
    navigation.ts           # Link, useRouter, usePathname, getPathname
    request.ts              # chargement messages par locale
    routing.ts              # locales config (fr, en, br) + prefix as-needed
  lib/
    constants.ts            # source unique de verite donnees (960 lignes)
    json-ld.ts              # helpers Schema.org
    metadata.ts             # helper generateMetadata par page
    supabase/
      admin.ts              # createSupabaseAdminClient (bypass RLS, server only)
      server.ts             # createSupabaseServerClient (RLS, Server Components)
      types.ts              # types DB
  messages/
    fr.json                 # ~815 lignes (defaut)
    en.json                 # ~800 lignes
    br.json                 # ~807 lignes
```

---

## 3. Internationalisation (i18n)

34 namespaces dans `messages/{fr,en,br}.json`, **camelCase systematique**.

Liste exhaustive (alphabetique) :
`about`, `avisPage`, `blogPage`, `blogPost`, `breadcrumb`, `caseStudy`, `cityPages`, `contact`, `contactFaq`, `ctaContact`, `faq`, `footer`, `hero`, `legal`, `maintenance`, `metadata`, `nav`, `notFound`, `offrePresence`, `offreSurMesure`, `offreVitrine`, `offres`, `options`, `pourquoi`, `pricing`, `pricingNote`, `process`, `profileCard`, `projectRequest`, `realisationsHome`, `realisationsPage`, `sitemap`, `stats`, `temoignages`.

Regles strictes :

- **camelCase obligatoire** (pas kebab-case, pas snake_case) - exemples : `offrePresence`, `realisationsHome`, `projectRequest`, `demandeProjet` (cle dans namespace `metadata`)
- **Tout ajout = 3 fichiers modifies en meme temps** (fr + en + br). Une cle manquante = erreur de build a corriger, pas un fallback a tolerer
- **Fallback locale** : locale invalide -> `fr` (default, via `i18n/routing.ts`)
- **Pas de fallback de cle** : next-intl leve une erreur si la cle est absente. Volontaire pour eviter le drift silencieux

Usage :

- **Server** : `const t = await getTranslations({ locale, namespace: "metadata" })` dans `generateMetadata` et Server Components
- **Client** : `const t = useTranslations("hero")` en top du composant client

Verifier le drift inter-locales :
```sh
diff <(jq -S 'keys' apps/website/src/messages/fr.json) <(jq -S 'keys' apps/website/src/messages/en.json)
```

---

## 4. Pattern d'ajout d'une page

Pas de doc explicite jusqu'a present. Pattern reel observe :

1. **Slug FR sans accents**, kebab-case URL (`/realisations`, pas `/realisations`)
2. **`app/[locale]/<slug>/page.tsx`** comme entry
3. **`generateMetadata` async** dans le fichier, via helper `lib/metadata.ts` (factorisation alternates + OG + Twitter card)
4. **Nouveau namespace i18n** dans les 3 fichiers `messages/{fr,en,br}.json` (camelCase)
5. **Sitemap** (`app/sitemap.ts`) :
   - Auto pour CityPage / Project / BlogPost (iteration depuis `constants.ts`)
   - Manuel pour pages statiques (lignes 18-31, edition directe)
6. **Lien navbar / footer** si top-level : modifier `NAV_LINKS` dans `constants.ts`
7. **error.tsx au `[locale]/`** couvre automatiquement les pages enfants. Pas de `global-error.tsx` actuellement (a creer si une erreur racine devient capturable)

---

## 5. constants.ts (960 lignes, source de verite des donnees)

23 exports nommes. Tout ce qui est reutilise dans 2+ endroits passe ici.

**Ordre des sections** (verrouille, suit le flux de lecture du site, ne pas reordonner sans raison forte) :

Cal.com -> Cities -> Nav -> Stats -> Projects -> GoogleReviews -> Blog -> Pricing -> Process -> Why -> Skills -> Testimonials -> FAQ

Regles :

- **Separateur de section** : `// ----- Nom -----` (ASCII pur, regle 9 racine)
- **Pas d'ordre alphabetique force** : ordre logique
- **Nouveau domaine** = nouvelle section ajoutee en fin de fichier, sauf dependance logique amont
- **Types colocates** avec leur constante (`type Project` juste avant `export const PROJECTS: Project[]`)
- **Exports nommes uniquement**, jamais `export default`

---

## 6. API routes : validation et flux

### Routes existantes (5)

| Route | Methode | Description |
|-------|---------|-------------|
| `/api/contact` | POST | Formulaire contact : Resend notif + confirmation + n8n webhook |
| `/api/projects` | GET | Case studies publies (Supabase RLS) |
| `/api/testimonials` | GET | Temoignages publies (Supabase RLS) |
| `/api/audits/[slug]` | GET | Audit publie + view tracking (Supabase admin) |
| `/api/admin/audits` | POST/GET | Create/list audits (auth admin requise) |

### Pattern general

- **Validation manuelle**, PAS Zod (0 occurrence dans `apps/website`)
- **Try/catch GLOBAL** par handler (un seul, pas par etape)
- **Side effects** en aval : Resend en parallel via `Promise.all`, puis n8n fire-and-forget

### Ordre canonique `/api/contact` (11 etapes)

1. Content-Type check [415]
2. Body size <10KB [413]
3. CSRF check (origin/referer) [403]
4. Rate limit Upstash + fallback memoire [429]
5. Parse JSON safe
6. Honeypot field [200 silent si rempli]
7. Bot time <3s [200 silent si trop rapide]
8. Trim des inputs
9. Validation custom des champs (manuelle, pas Zod) [400]
10. Resend notif interne + confirmation prospect via `Promise.all` [500 si echec]
11. n8n webhook fire-and-forget (`.catch(warn)`, n'attend pas)

**Persistance contacts** : aucune dans Supabase, aucune en local. Les donnees partent uniquement vers Resend (mails) et n8n (webhook cloud). Si n8n est down ou mal configure, les soumissions sont perdues apres l'envoi mail. A surveiller cote n8n.

### Choix transverses a trancher

**[CHOIX 1]** Validation manuelle vs Zod pour les NOUVELLES routes ?
- Garder manuelle : coherent avec l'existant, pas de dep en plus
- Migrer Zod : type-safety, erreurs structurees, maintenance long terme

**[CHOIX 2]** Try/catch global vs par etape ?
- Global (actuel) : code compact, log unique
- Par etape : diagnostic precis, contexte d'erreur granulaire

**[CHOIX 3]** Console.error/warn vs logger structure (Pino) ?
- Console (actuel) : simple, lisible dans logs Vercel
- Pino : levels, JSON, plus exploitable a l'echelle

**[CHOIX 4]** Webhook erreurs critiques (paiement, contact, signature) ?
- Aucun (actuel) : base sur logs Vercel
- Discord ou email-self : alerte temps reel

---

## 7. Composants : sections / ui / cards / layout

Repartition actuelle : 21 sections, 13 ui, 6 cards, 3 layout. Dossiers complementaires : `analytics/` (plausible-script), `seo/` (json-ld).

Regle d'arbitrage : **metier-specifique Djanni vs generique reutilisable**. Le critere "consomme i18n ou pas" n'est PAS pertinent (ex : `vat-notice` est dans `ui/` et consomme `useTranslations("legal")`, c'est volontaire car transverse).

| Dossier | Role | Exemples |
|---------|------|----------|
| `sections/` | Blocs de page autonomes, un par viewport. Fond + spacing definis | HeroSection, OffresSection, FAQ, ContactForm, ProjectRequestForm |
| `ui/` | Primitives reutilisables generiques. Peuvent consommer i18n si transverses (legal, Cal.com) | Accordion, Breadcrumb, AnimatedSection, AuroraBackground, VatNotice, CalPopupButton |
| `cards/` | Composants metier-specifiques composes. Recoivent data en props | PricingCard, ProjectCard, TestimonialCard, MaintenanceCard, OptionCard, ProcessStepCard |
| `layout/` | Structure globale du site | Navbar, Footer, LanguageSwitcher |

**Test de placement** d'un nouveau composant :

1. Bloc de viewport complet sur une page ? -> `sections/`
2. Specifique au business Djanni (offre, article, realisation) ? -> `cards/`
3. Primitive generique (bouton, notice, popup) ? -> `ui/`
4. Structure globale du site ? -> `layout/`

---

## 8. Gestion d'erreurs (convention en place)

Pattern actuel codifie ici pour la premiere fois :

- **Serveur** : `console.error("[<route-name>] <context>:", err)` avec prefix `[namespace]` SYSTEMATIQUE (utilise pour grep dans Vercel logs). `console.warn(...)` pour fire-and-forget non bloquants
- **Client** : `toast.error(msg)` via Sonner pour echec. `toast.success(msg)` apres action reussie
- **error.tsx** au `[locale]/` couvre les pages enfants. Pas de `global-error.tsx`
- **try/catch** : un seul, global, par handler de route
- 13 occurrences `console.error/warn` actuelles dans le code

Interdictions :

- `alert()` (jamais)
- `console.log` en prod (uniquement debug local, retirer avant commit)
- Exposition de stack trace ou message d'erreur brut au client (risque leak)
- `Error.message` retourne au client sans filtrage

CHOIX 3 et 4 (section 6) impactent cette section a terme.

---

## 9. Imports et packages internes

- **Workspace** : `@repo/ui` est la seule dep workspace actuelle. Imports depuis `@repo/ui/components/*` (Button, Badge, Separator) et `@repo/ui/lib/utils` (`cn()`)
- **Navigation i18n** : `import { Link, usePathname, useRouter } from "@/i18n/navigation"` - JAMAIS `next/link`
- **Constants** : `import { PROJECTS, NAV_LINKS } from "@/lib/constants"`
- **Metadata** : helper dans `@/lib/metadata`
- **Supabase** : `createSupabaseServerClient` (RLS, Server Components) ou `createSupabaseAdminClient` (bypass RLS, **server only**, jamais cote client)

Regles Turborepo :

- Pas d'import `apps/` vers `apps/`
- Pas d'import `packages/` vers `apps/`
- Les types partages remontent dans un package, jamais dupliques

---

## 10. PWA / Manifest / Robots / Sitemap

- **`public/manifest.json`** : "Djanni Studio", FR, icons 192 et 512 (PNG + SVG), theme dark
- **`public/icons/`** : `icon-192.{png,svg}`, `icon-512.{png,svg}`
- **`src/app/robots.ts`** : disallow `/api/` + `/demande-projet` (formulaire prive), sitemap publie
- **`src/app/sitemap.ts`** : iteration auto sur CITY_PAGES, PROJECTS, BLOG_POSTS + pages statiques codees l.18-31
- **`src/app/sw.ts`** : Serwist v9.5 via `@serwist/next`. **Build prod Webpack obligatoire** (Serwist ne supporte pas Turbopack en build). Dev Turbopack OK

---

## 11. Variables d'environnement (apps/website)

Liste complete (voir `apps/website/.env.example`) :

| Var | Usage |
|-----|-------|
| `RESEND_API_KEY` | Envoi mails contact (notif interne + confirmation) |
| `UPSTASH_REDIS_REST_URL` | Rate limit (optionnel, fallback memoire si absent) |
| `UPSTASH_REDIS_REST_TOKEN` | idem |
| `N8N_WEBHOOK_URL` | Webhook async pour SMS Free Mobile (optionnel) |
| `N8N_WEBHOOK_SECRET` | Bearer token n8n (optionnel, si auth activee cote n8n) |
| `ANTHROPIC_API_KEY` | API Anthropic (audits genere via Claude) |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (bypass RLS, server only) |
| `NEXT_PUBLIC_SITE_URL` | URL site (canonical, OG, sitemap) |
| `AUDIT_VIEW_IP_SALT` | Salt pour hash IP dans tracking views audit |

---

## 12. Commandes specifiques apps/website

```sh
pnpm --filter=website dev          # Turbopack, port 3000
pnpm --filter=website build        # Webpack (obligatoire pour Serwist)
pnpm --filter=website start        # serveur prod local
pnpm --filter=website type-check   # tsc --noEmit
```

Commandes racine qui couvrent aussi le site :

```sh
pnpm lint:fix                      # Biome check --write (tout le monorepo)
pnpm format                        # Biome format --write
pnpm checks                        # lint + typecheck + tests (a lancer avant push)
```

---

## 13. Recap [ECART vs cible] et [CHOIX EN ATTENTE]

### Ecarts a corriger (ouvrir tickets si non traites)

- **ECART 1** : separateurs box-drawing dans `constants.ts` corriges dans ce PR (regle 9 racine : ASCII propre)
- **ECART 2** : tRPC declare en stack racine, non utilise dans `apps/website` -> clarifier perimetre dans CLAUDE.md racine
- **ECART 3** : Zod declare en stack racine, 0 occurrence dans `apps/website` -> meme clarification

### Choix transverses a trancher (impactent l'evolution future)

- **CHOIX 1** : Validation manuelle vs Zod pour nouvelles routes API (section 6)
- **CHOIX 2** : Try/catch global vs par etape (section 6)
- **CHOIX 3** : Console vs logger structure (Pino) (section 8)
- **CHOIX 4** : Webhook erreurs critiques (Discord ou email-self) oui/non (section 6 / section 8)

---

*Source de verite specifique apps/website - mai 2026 - DS-72. Iteration sur le CLAUDE.md racine v4 (DS-71).*
