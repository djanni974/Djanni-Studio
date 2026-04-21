# Supabase - Integration Phase 3

Pipeline public (CRM + audits partageables + case studies + temoignages) branche sur Supabase.

- 3 helpers : server anon (cookies session), admin service_role (bypass RLS), types
- 4 routes API : `/api/testimonials`, `/api/projects`, `/api/audits/[slug]`, `/api/admin/audits`
- Next.js 16 App Router (cookies async) + `@supabase/ssr`

Projet Supabase : `Chatbot DjanniStudio` (ref `isrtvgenawcutmoqscud`, region `eu-north-1`).

---

## 1) Structure

```
apps/website/src/
  lib/supabase/
    types.ts      # types du domaine (Testimonial, Project, Audit, ...)
    server.ts     # client anon + cookies session, requireAdmin()
    admin.ts      # client service_role (bypass RLS)
  app/api/
    testimonials/route.ts       # GET public
    projects/route.ts           # GET public
    audits/[slug]/route.ts      # GET public + tracking vue
    admin/audits/route.ts       # GET + POST admin
```

---

## 2) Dependances

```bash
pnpm --filter @repo/website add @supabase/ssr @supabase/supabase-js
```

`node:crypto` (hash IP RGPD) est dispo via `@types/node` (deja dev dep).

---

## 3) Variables d environnement

A ajouter dans `apps/website/.env.local` en dev et dans Vercel en prod :

```env
# Publiques (exposees cote client)
NEXT_PUBLIC_SUPABASE_URL=https://isrtvgenawcutmoqscud.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<cle anon>
NEXT_PUBLIC_SITE_URL=https://djannistudio.fr

# Privees (server-side uniquement, jamais commit)
SUPABASE_SERVICE_ROLE_KEY=<cle service_role>
AUDIT_VIEW_IP_SALT=<openssl rand -hex 32>
```

Cles : [dashboard Supabase](https://app.supabase.com) > Chatbot DjanniStudio > Settings > API.

**SECURITE** : `SUPABASE_SERVICE_ROLE_KEY` bypass toutes les RLS. Jamais dans un nom prefixe `NEXT_PUBLIC_`, jamais commit, jamais renvoye dans une reponse API.

---

## 4) Auth admin

Les routes `/api/admin/*` s appuient sur `requireAdmin()` (dans `lib/supabase/server.ts`) qui :

1. Lit la session Supabase Auth via cookies.
2. Verifie que `user.id` est present dans la table `public.admin_users`.

Pour devenir admin :

1. Creer un compte via Supabase Auth (email/password ou OAuth).
2. Inserer manuellement son `user_id` dans `admin_users` (table whitelist).

Aucun email hardcode dans le code.

---

## 5) Tester les routes

Public :

```bash
# Temoignages publies
curl https://djannistudio.fr/api/testimonials
curl 'https://djannistudio.fr/api/testimonials?featured=true&limit=3'

# Case studies publiees
curl https://djannistudio.fr/api/projects
curl 'https://djannistudio.fr/api/projects?offer=vitrine'

# Audit partageable (une fois cree)
curl https://djannistudio.fr/api/audits/vincent-carreleur-a7x
```

Admin (requiert cookies session Supabase pour un user present dans `admin_users`) :

```bash
# Lister tous les audits
curl https://djannistudio.fr/api/admin/audits -H "Cookie: <cookies supabase>"

# Creer un audit
curl -X POST https://djannistudio.fr/api/admin/audits \
  -H "Content-Type: application/json" \
  -H "Cookie: <cookies supabase>" \
  -d '{
    "slug": "vincent-carreleur-a7x",
    "target_url": "https://exemple-carreleur.fr",
    "target_business_name": "Masson Carrelages",
    "target_business_activity": "carreleur",
    "target_city": "Saint-Malo",
    "scores": { "lighthouse": 45, "seo": 60, "design": 40, "mobile": 35 },
    "findings": [
      {
        "category": "performance",
        "severity": "high",
        "title": "Images non optimisees",
        "description": "Les images pesent plus de 5 MB chacune.",
        "recommendation": "Passer en WebP/AVIF et redimensionner."
      }
    ],
    "proposal": {
      "offer": "vitrine",
      "amount_ht": 1490,
      "delay_weeks": 3,
      "pitch": "Un site moderne et rapide pour convertir les recherches locales en demandes de devis."
    },
    "status": "published"
  }'
```

---

## 6) Consommation cote front

Server Component (page d accueil avec temoignages featured) :

```tsx
// apps/website/src/app/[locale]/page.tsx
import type { TestimonialPublic } from "@/lib/supabase/types"

async function getFeaturedTestimonials(): Promise<TestimonialPublic[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/testimonials?featured=true&limit=3`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) return []
  const json = (await res.json()) as { data: TestimonialPublic[] }
  return json.data
}
```

Page publique audit partageable :

```tsx
// apps/website/src/app/[locale]/audit/[slug]/page.tsx
import { notFound } from "next/navigation"
import type { AuditPublic } from "@/lib/supabase/types"

export default async function AuditPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/audits/${slug}`, {
    cache: "no-store",
  })
  if (res.status === 404 || res.status === 410) notFound()
  const { data: audit } = (await res.json()) as { data: AuditPublic }

  return (
    <article>
      <h1>Audit de {audit.target_business_name ?? audit.target_url}</h1>
      {/* rendu scores / findings / proposal */}
    </article>
  )
}
```

---

## 7) Tables Supabase exposees

| Table         | Rows | Policy publique                                                 |
|---------------|------|-----------------------------------------------------------------|
| `testimonials`| -    | `published = TRUE` via `public_read_published_testimonials`     |
| `projects`    | -    | `published_as_case_study = TRUE` via `public_read_published_projects` |
| `audits`      | -    | Pas de policy publique : lecture via `/api/audits/[slug]` (service_role) |
| `audit_views` | -    | Insert via service_role uniquement (RGPD : ip hashee)           |
| `contacts`    | -    | Privee (admin only)                                             |
| `interactions`| -    | Privee (admin only)                                             |
| `admin_users` | -    | Whitelist user_id (lecture/ecriture service_role)               |

---

## 8) Prochaines etapes (phase 4)

- Dashboard `/admin` : liste prospects, CRUD audits, stats de vues
- Capture email newsletter (DS-020)
- Migration progressive Notion -> `contacts`
- Chatbot de qualification rebranche sur `contacts` + `interactions`
