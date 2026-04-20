# CLAUDE.md - Djanni Studio (djannistudio.fr)

## Contexte projet

Repo du site djannistudio.fr, vitrine et moteur d'acquisition de Djanni Studio : micro-entreprise de developpement web freelance fondee par Gianni Jardin (charpentier-bardeur reconverti dev), basee a Dinard (35). Cible : artisans, commercants et TPE de la Cote d'Emeraude (Saint-Malo, Dinard, Dinan) + remote France.

Le site lui-meme sert de preuve de savoir-faire : ce qui est code ici doit etre exemplaire en perf, accessibilite, SEO, securite.

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
| Site | https://www.djannistudio.fr |
| Mail pro heberge chez | Hostinger |
| Nameservers DNS | Vercel |
| TVA | Non applicable (art. 293B CGI) |
| ACRE | Active jusqu'au 31/12/2026 |
| Facturation | Indy (outil externe, pas dans ce repo) |

Detail admin/fiscal complet : voir skill `djanni-admin-fiscal`.
Detail charte/branding : voir skill `djanni-brand`.

---

## Stack technique

- **Framework** : Next.js 16.2.3 (App Router)
- **Runtime** : Node 20+
- **Langage** : TypeScript (mode strict)
- **Style** : Tailwind CSS
- **Animations** : CSS-first (keyframes, transitions CSS). **Aucune librairie d'animation JS autorisee** (ni Framer Motion, ni motion, ni autre). Voir DESIGN.md section 9.
- **Linter / formatter** : Biome (pas ESLint, pas Prettier)
- **Analytics** : Plausible (sans cookies, RGPD-friendly)
- **Email transactionnel** : Resend
- **CI** : GitHub Actions
- **Deploiement** : Vercel

---

## Source de verite design

**DESIGN.md** a la racine du repo est LA reference pour toute decision visuelle ou UI.

Sections cles :
- Section 7 : approche **CSS-first** (toujours prioriser CSS natif avant JS)
- Section 9 : interdiction Framer Motion et toutes librairies d'animation JS
- Tokens couleurs, typographie, spacing, breakpoints

Avant toute modification de composant ou de page, Claude doit lire DESIGN.md si ce n'est pas deja fait dans la session.

---

## Workflow Git

- Toujours creer les branches depuis `main` (jamais depuis une autre branche feature)
- Un ticket Linear = une branche = une PR
- Format nom de branche : `DS-XXX` (ex: `DS-XXX | à-propos-V2`)
- Messages de commit : francais, imperatif present, concis
- Jamais de force-push sur `main`
- PR toujours passee par review avant merge

---

## Tickets Linear

Equipe Linear : **Djanni Studio**
Format ID : `DS-XXX` (numerotation continue)

Avant de creer un nouveau ticket, toujours lister les tickets existants (`list_issues`) pour eviter les doublons.

---

## Regles de formatage des outputs

Regle standing **ASCII strict** pour tout document genere par Claude (markdown inclus) :

- **Em dashes** (caractere long) bannis. Toujours tirets simples (`-`)
- **Guillemets typographiques** (double et simples courbes) bannis. Toujours guillemets droits (`"` et `'`)
- **Espaces insecables** bannis. Espaces normales
- **Apostrophes typographiques** (courbes) bannies. Apostrophes droites (`'`)

S'applique a 100% des fichiers generes : code, commentaires, docs, posts sociaux, devis, factures, emails.

Pour les PDF et Word specifiquement : voir le template bons de commande dans `djanni-devis` (colonnes Ref / Designation / Qte / PU / Montant, colonne Ref large, lignes CL-REF optionnelles).

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

Claude doit charger le skill pertinent avant toute tache specifique. `djanni-brand` se charge automatiquement en complement des autres skills Djanni.

| Skill | Usage |
|-------|-------|
| `djanni-brand` | Source de verite ton/voix/identite - toujours charge avec les autres |
| `djanni-presence` | Offre Presence (990 EUR, 1 page, 2 semaines) |
| `djanni-vitrine` | Offre Vitrine (1 490 EUR, jusqu'a 5 pages, 3 semaines) |
| `djanni-sur-mesure` | Offre Sur mesure (1 990 EUR+, jusqu'a 8 pages, 3-5 semaines) |
| `djanni-devis` | Generation devis, propositions commerciales, bons de commande |
| `djanni-prospection` | Recherche prospects, scripts cold call, objections |
| `djanni-relance` | Relance prospect/client silencieux (devis, V1, solde) |
| `djanni-onboarding-client` | Process post-signature jusqu'a livraison |
| `djanni-case-study` | Redaction etudes de cas (/realisations, contenu social) |
| `djanni-social-posts` | Posts Instagram / LinkedIn / Facebook |
| `djanni-web-audit` | Audit sites prospects ou concurrents |
| `djanni-review` | Review interne pages Djanni (juridique, copy, coherence) |
| `djanni-admin-fiscal` | URSSAF, ACRE, declarations, echeances, facturation electronique |
| `djanni-brainstorm` | Brainstorming strategique et deblocage |
| `pcg-traducteur` | Comptabilite PCG (compte comptable pour une operation) |

---

## Ce que ce repo N'EST PAS

- **Pas un site client** : djannistudio.fr est la vitrine de Djanni Studio lui-meme, pas un projet livre
- **Pas le GOAF Companion App** : autre projet, autre repo, autre stack (Next.js 14 + tRPC + Drizzle + Supabase)
- **Pas un site WordPress ou page builder** : pur Next.js, code ecrit a la main

---

## Check rapide avant chaque session

1. Lire DESIGN.md si on touche a l'UI
2. Verifier qu'on est sur une branche creee depuis `main`
3. Identifier le ticket DS-XXX cible avant de coder
4. Charger le skill pertinent avant une tache specifique
5. Formatter les outputs en ASCII strict

---

*Source de verite repo Djanni Studio - avril 2026*