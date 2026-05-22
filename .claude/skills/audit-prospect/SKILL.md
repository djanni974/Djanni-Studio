---
name: audit-prospect
description: Lance un audit complet d'un prospect Djanni Studio. Mode AVEC site (URL fournie) - analyse HTML, meta SEO, Lighthouse, schema.org, NAP, mobile. Mode SANS site - audit de la presence digitale (Instagram, Google Business Profile, PagesJaunes, Facebook). Genere un rapport structure exploitable en RDV commercial. Trigger phrases : /audit-prospect, "audit ce prospect", "audit ce site", "regarde ce site", "evalue ce prospect", "audit presence digitale".
---

# /audit-prospect - Audit prospect Djanni Studio

Workflow d'audit complet pour qualifier un prospect, identifier les pains, et preparer un pitch commercial. Compatible avec OU sans site web existant.

## Argument attendu

`$ARGUMENTS` peut etre :

- Une URL : `https://example.com` ou `example.com` -> mode AVEC site
- Un nom de prospect ou activite + ville : "Vincent Masson carreleur Saint-Malo" -> mode SANS site

Si argument vide ou ambigu, demander a Gianni : URL connue ? nom du prospect ? activite + ville ?

## Etape 0 - Detecter le mode

Si l'argument matche un pattern URL (contient `.` et `/` ou commence par `http`), c'est le mode AVEC site. Sinon mode SANS site.

Charger en complement le skill `djanni-web-audit` (definit le format de rapport, la methode d'estimation de CA perdu, les criteres de qualification). Ce slash command orchestre, le skill nourrit le contenu narratif.

---

## MODE AVEC SITE

### Etape 1 - Fetch initial

```bash
curl -sIL -A "Mozilla/5.0 (compatible; DjanniAudit/1.0)" "$URL"
```

Verifier :
- Status code final apres redirections (200, 301/302 chains, 404, 5xx)
- Headers utiles : `cache-control`, `content-encoding`, `server`, `strict-transport-security`
- HTTPS actif ou pas (drapeau rouge si pas de HTTPS en 2026)

```bash
curl -sL -A "Mozilla/5.0 (compatible; DjanniAudit/1.0)" "$URL" -o /tmp/audit-page.html
wc -c /tmp/audit-page.html
```

Si le HTML pese moins de 5 KB, c'est probablement une SPA qui charge tout en JS. Le note et passe Lighthouse pour avoir le rendu reel.

### Etape 2 - Extraction meta et SEO

Parser `/tmp/audit-page.html` pour extraire :

- `<title>` : presence, longueur (50-60 char ideal), pertinence locale
- `<meta name="description">` : presence, longueur (150-160 char ideal)
- `<meta name="viewport">` : present ? si absent, mobile casse
- Open Graph : og:title, og:description, og:image, og:url
- Schema.org : chercher `application/ld+json` dans le HTML, parser les types declares (LocalBusiness, Organization, BreadcrumbList, etc.)
- `<html lang="...">` : presence et coherence
- Robots : `<meta name="robots">` si present (noindex serait un drapeau rouge majeur)
- Hreflang : presence ou absence (probleme si multilingue)

Commandes utiles :

```bash
grep -oE '<title>[^<]+</title>' /tmp/audit-page.html | head -1
grep -oE '<meta[^>]*description[^>]*>' /tmp/audit-page.html | head -1
grep -c 'application/ld+json' /tmp/audit-page.html
```

### Etape 3 - Robots.txt et sitemap

```bash
curl -sI "$URL/robots.txt"
curl -sI "$URL/sitemap.xml"
```

Reporter : presence, accessibilite, et si robots.txt est trop restrictif (Disallow: / serait dramatique).

### Etape 4 - NAP consistency (Name, Address, Phone)

Le NAP est la base du SEO local. Chercher dans le HTML :

- Numero de telephone (regex `\\+?33[\\s.]?[1-9]([\\s.]?\\d{2}){4}` ou `0[1-9]([\\s.]?\\d{2}){4}`)
- Adresse postale (chercher code postal `35\\d{3}` pour l'Ille-et-Vilaine, ou pattern adresse generale)
- Email de contact

Si presence du NAP : check coherence avec Google Business Profile (etape 6).

### Etape 5 - Lighthouse audit (perfs + SEO + a11y)

Tente d'utiliser Lighthouse via npx. Si pas dispo, le signaler :

```bash
npx --yes lighthouse "$URL" \
  --quiet \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path=/tmp/audit-lighthouse.json
```

Si Lighthouse echoue (Chrome pas installe, timeout), passer a un check manuel via curl uniquement et le mentionner dans le rapport.

Si OK, extraire :
- Score Performance, Accessibilite, Best Practices, SEO (0-100 chacun)
- LCP (Largest Contentful Paint) : viser < 2.5s
- CLS (Cumulative Layout Shift) : viser < 0.1
- TBT (Total Blocking Time) : viser < 200ms

```bash
node -e "const r=require('/tmp/audit-lighthouse.json'); console.log(JSON.stringify({perf:r.categories.performance.score*100,a11y:r.categories.accessibility.score*100,bp:r.categories['best-practices'].score*100,seo:r.categories.seo.score*100,lcp:r.audits['largest-contentful-paint'].numericValue,cls:r.audits['cumulative-layout-shift'].numericValue,tbt:r.audits['total-blocking-time'].numericValue},null,2));"
```

### Etape 6 - Presence Google Business Profile

Demander a Gianni s'il a une URL Google Business Profile ou s'il veut chercher la fiche. Si oui, web_fetch ou recherche manuelle pour verifier :

- Fiche existe et est verifiee
- Photos > 5
- Horaires renseignes
- Avis : combien, note moyenne, derniere reponse du proprio (engagement)
- NAP coherent avec le site

### Etape 7 - Verdict et estimation de pain

Suivre la methode du skill `djanni-web-audit` pour :

- Lister les pains classes par severite (CRITIQUE / MAJEUR / MINEUR)
- Estimer le CA potentiellement perdu (methode du skill)
- Proposer l'offre Djanni adaptee (Presence / Vitrine / Sur mesure)
- Suggerer un angle d'attaque pour le pitch ("votre site n'a pas de schema LocalBusiness donc Google ne sait pas que vous etes a Saint-Malo")

---

## MODE SANS SITE

### Etape 1 - Identifier les canaux digitaux

Demander a Gianni les canaux connus du prospect :

- Instagram handle ?
- Facebook page ?
- Google Business Profile URL ou nom exact ?
- PagesJaunes profil ?
- Site marketplace (Houzz, MyOryx, plateforme metier) ?

Si Gianni ne sait pas, lancer une recherche web rapide via web_search :

```
"[nom prospect] [activite] [ville]"
```

### Etape 2 - Audit canal par canal

Pour chaque canal trouve, evaluer (criteres du skill djanni-web-audit) :

**Google Business Profile** :
- Verifie ? Photos ? Horaires ? Avis ? Reponses aux avis ?
- Categorie principale bien choisie ?
- Posts recents ?

**Instagram** :
- Bio claire avec CTA ?
- Lien cliquable (Linktree ou site) ?
- Frequence de post ?
- Highlights organises ?
- Nombre de followers et taux d'engagement approximatif

**Facebook page** :
- Page pro ou profil perso (gros drapeau rouge si perso) ?
- Infos legales completes ?
- Activite recente ?

**PagesJaunes** :
- Fiche existe ?
- Visible en haut des resultats locaux ?

### Etape 3 - Estimation du CA perdu

Sans site web en 2026 pour un artisan local, perte estimee : 30-60% des demandes potentielles ne vont jamais arriver jusqu'a lui (filtre Google, manque de credibilite, pas d'accroche pour les decideurs B2B).

Methode du skill djanni-web-audit pour chiffrer en EUR concret selon l'activite et la zone geo.

### Etape 4 - Pitch recommande

Pour un prospect sans site, pousser l'offre **Presence** (990 EUR / 1 page / 2 semaines) comme entree de gamme low-friction. Si l'activite a un fort potentiel (paysagisme, renovation, salons), suggerer **Vitrine** (1490 EUR) avec galerie.

---

## ETAPE FINALE - Rapport structure

Format ASCII strict, exportable tel quel pour preparation RDV ou note Notion.

```
## Audit prospect Djanni Studio - [date du jour YYYY-MM-DD]

Prospect : [nom ou URL]
Mode     : [AVEC site | SANS site]
Activite : [carreleur, paysagiste, coiffeur, etc.]
Zone     : [Saint-Malo, Dinard, Dinan, etc.]

### Resume executif
[3 lignes max : etat general, pain principal, offre recommandee]

### Pains identifies

CRITIQUE :
- [pain] -> [impact business chiffre si possible]

MAJEUR :
- [pain] -> [impact]

MINEUR :
- [pain] -> [impact]

### Score global
[Si site : SEO X/100, Perfs Y/100, Mobile Z/100]
[Si pas de site : presence digitale globale faible/moyenne/correcte]

### Estimation CA perdu mensuel
[XXX EUR / mois selon methode djanni-web-audit]

### Offre Djanni recommandee
[Presence 990 | Vitrine 1490 | Sur mesure 1990+]

Justification : [pourquoi cette offre, en 2 lignes]

### Angle d'attaque pitch
[1-2 phrases concretes pour ouvrir le RDV, en ASCII strict, ton chill pro]

### Actions immediates
1. [action 1 - genre "ajouter au CRM Notion en statut Audit fait"]
2. [action 2 - genre "preparer message LinkedIn personnalise"]
3. [action 3 - genre "creer slug shareable via Supabase"]
```

## Regles dures

- **ASCII only** dans tous les outputs.
- **Ne jamais inventer** un chiffre (NAP, avis, score) - si tu n'as pas pu mesurer, ecrire "non mesure" ou "non accessible".
- **Ne jamais** scraper de donnees personnelles (photos de visage, infos privees). Limite-toi aux infos professionnelles publiques.
- Si Lighthouse echoue, le rapport doit explicitement dire "Lighthouse non disponible" plutot que de simuler des scores.
- Si le prospect est dans la liste "perdu" (William Miquel etc.), refuser l'audit et le rappeler a Gianni.
- Ne PAS pousser automatiquement dans Supabase ou Notion - le slash command audite, c'est Gianni qui decide de la suite.
- Pour les chiffres de Vincent Masson (deja audite, mockup deploye), reutiliser le precedent audit comme reference si pertinent au lieu de tout refaire.
