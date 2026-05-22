---
name: pr-ready
description: Verifie qu'une PR du repo djannistudio.fr est prete a merger. Lance Biome, tsc, gitleaks, et invoque les sub-agents i18n-guardian et design-md-keeper sur les fichiers concernes. Trigger phrases : /pr-ready, "check ma PR", "ready to merge", "verifie avant que je merge", "PR prete".
---

# /pr-ready - Validation pre-merge Djanni Studio

Workflow complet pour valider qu'une branche du repo djannistudio.fr est prete a merger sur main. Combine checks techniques deterministes et reviews intelligentes via sub-agents.

## Etape 0 - Garde-fous

Avant tout, verifier que le contexte est bon :

```bash
git rev-parse --abbrev-ref HEAD
git status --short
cat package.json | grep '"name"'
```

Refuser et expliquer pourquoi si :
- La branche courante est `main` (on ne lance jamais /pr-ready sur main)
- Le repo n'est pas djannistudio.fr
- Il y a des fichiers untracked suspects qui ne semblent pas appartenir a la PR

## Etape 1 - Categoriser le diff

```bash
git fetch origin main --quiet
git diff origin/main --name-only
```

Trier les fichiers modifies en categories. Ces categories conditionnent quels sub-agents seront invoques plus tard :

- **i18n** : `apps/website/messages/*.json` ou fichiers qui contiennent du texte utilisateur (composants React, pages)
- **UI** : `apps/website/components/**`, `apps/website/app/**`, `packages/ui/**`
- **Config sensible** : `.env*`, `next.config.*`, `biome.json`, `pnpm-workspace.yaml`
- **Docs** : `*.md`, `CLAUDE.md`, `DESIGN.md`

Garder cette categorisation en memoire pour l'etape 4.

## Etape 2 - Checks techniques deterministes

Lancer dans cet ordre. STOP au premier KO :

```bash
pnpm biome check
```

```bash
pnpm tsc --noEmit
```

Si l'un echoue, afficher le rapport brut, NE PAS continuer vers les sub-agents (les tokens seraient gaches). Demander a Gianni : "Tu veux que je fixe ou tu prefer regarder ?"

## Etape 3 - Scan secrets

```bash
gitleaks detect --no-banner --redact
```

Rappel critique : incident du 12/05/2026 sur `.env.local.example` avec un mot de passe Supabase reel. Si gitleaks trouve quoi que ce soit, STOP absolu. Pas de merge. Demander rotation du secret avant tout.

## Etape 4 - Sub-agents conditionnels

Lancer uniquement les sub-agents dont la categorie est presente dans le diff.

**Si categorie `i18n` presente** :

> Use the i18n-guardian agent to verify the i18n state of the modified files. Report locale sync and any hardcoded user-facing strings.

**Si categorie `UI` presente** :

> Use the design-md-keeper agent to review the following modified UI files against DESIGN.md : [liste exacte des fichiers UI du diff].

Si aucune des deux categories n'est touchee (genre une PR qui ne touche que des configs), sauter cette etape et l'indiquer "non applicable" dans le rapport final.

Si les deux sont applicables, lancer les deux en parallele (gain de temps, contextes isoles).

## Etape 5 - Verifications regles dures projet

Checks rapides qui ne meritent pas un sub-agent :

- Aucun `import` de `framer-motion`, `gsap`, `lottie`, `@lottiefiles`, `motion`, `anime.js` (regle dure : pas de lib JS animation)
- Aucun `console.log` oublie dans le code source (warning, pas blocker)
- Le titre de la branche contient bien un ticket Linear `DS-XXX` (warning si absent)

```bash
git grep -E "from ['\"](framer-motion|gsap|lottie|@lottiefiles|motion|anime\\.js)['\"]" -- 'apps/**/*.{ts,tsx}' 'packages/**/*.{ts,tsx}'
```

## Etape 6 - Rapport final unique

Format ASCII strict, structure fixe pour que Gianni puisse scanner vite :

```
## /pr-ready report

Branche : [nom de branche]
Diff : [N] fichiers modifies sur main
Ticket Linear : [DS-XXX ou "manquant"]

### Checks techniques
- Biome             : [OK | KO]
- TypeScript strict : [OK | KO]
- Gitleaks          : [OK | KO]
- Animations JS     : [OK | KO]
- Console.log       : [OK | WARN N occurrences]

### Sub-agents
- i18n-guardian     : [OK | KO | non applicable]
- design-md-keeper  : [OK | WARN | KO | non applicable]

### Verdict global
[READY TO MERGE] ou [BLOQUE - voir actions ci-dessous]

### Actions recommandees
[Si BLOQUE : liste numerotee des fix par severite decroissante]
[Si READY : suggestion de titre de PR conventional commits + rappel
 que gh pr merge --auto est BLOQUE sur ce repo, merge manuel uniquement]
```

## Regles dures du workflow

- **ASCII only** dans tous les outputs. Pas d'em dash, pas de guillemets typographiques.
- **Jamais** `git push --force` (regle dure du repo, hard-coded).
- **Jamais** suggerer eslint, prettier, npm ou yarn. Stack = pnpm + Biome.
- Si Gianni demande de "passer outre" un check rouge, refuser poliment. Le but de ce workflow c'est justement la rigueur.
- Si un outil (gitleaks, tsc, pnpm) n'est pas installe ou repond pas, l'indiquer clairement au lieu de pretendre que le check est OK.
- Ne pas tenter d'ouvrir la PR sur GitHub. /pr-ready valide, c'est Gianni qui ouvre.
