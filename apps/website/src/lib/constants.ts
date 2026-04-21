export type CityPage = {
	slug: string
	cityKey: string
	cityName: string
	postalCode: string
	latitude: number
	longitude: number
}

export const CITY_PAGES: CityPage[] = [
	{
		slug: "creation-site-web-saint-malo",
		cityKey: "saintMalo",
		cityName: "Saint-Malo",
		postalCode: "35400",
		latitude: 48.6493,
		longitude: -1.989,
	},
	{
		slug: "creation-site-web-dinan",
		cityKey: "dinan",
		cityName: "Dinan",
		postalCode: "22100",
		latitude: 48.4534,
		longitude: -2.0502,
	},
	{
		slug: "creation-site-web-dinard",
		cityKey: "dinard",
		cityName: "Dinard",
		postalCode: "35800",
		latitude: 48.6328,
		longitude: -2.0688,
	},
]

export const NAV_LINKS = [
	{ label: "Réalisations", href: "/realisations" },
	{ label: "Offres", href: "/offres" },
	{ label: "À propos", href: "/a-propos" },
	{ label: "Blog", href: "/blog" },
] as const

export const STATS = [
	{ value: "2 sem.", label: "Délai moyen de livraison" },
	{ value: "100%", label: "Responsive mobile" },
	{ value: "50%", label: "À la signature, 50% à la livraison" },
] as const

export type Project = {
	name: string
	slug: string
	type: string
	accentColor: string
	logoText: string
	span2?: boolean
	image?: string
	screenshots?: string[]
	// Case study data
	client: string
	location: string
	duration: string
	year: string
	url?: string
	context: string
	problem: string
	solution: string
	results: string[]
	techStack: string[]
	testimonial?: {
		quote: string
		author: string
		role: string
	}
}

export const PROJECTS: Project[] = [
	{
		name: "Troc 35",
		slug: "troc-35",
		type: "Concept — Dépôt-vente",
		accentColor: "#00b1c9",
		logoText: "TR",
		image: "/projects/troc-35.webp",
		screenshots: [
			"/projects/troc-35.webp",
			"/projects/troc-35-boutique.webp",
			"/projects/troc-35-horaires.webp",
			"/projects/troc-35-contact.webp",
			"/projects/troc-35-estimation.webp",
			"/projects/troc-35-compte.webp",
		],
		client: "Troc 35",
		location: "La Richardais, Bretagne",
		duration: "3 semaines",
		year: "2026",
		url: "https://troc35.vercel.app",
		context:
			"Concept réalisé pour Troc 35, un dépôt-vente de 1 300 m² à La Richardais, entre St-Malo et Dinard. Ce projet démontre comment un commerce local avec un site vieillissant pourrait bénéficier d'une refonte moderne. Le site actuel du magasin tourne sur PrestaShop et ne reflète plus la qualité de leur offre.",
		problem:
			"Le site existant est lent, non responsive et mal référencé. Les clients peinent à trouver les horaires ou les catégories de produits. Sans catalogue en ligne, les arrivages restent invisibles sur le web. Le magasin n'apparaît qu'en page 3 de Google sur les recherches locales.",
		solution:
			"Ce concept propose une refonte sur Next.js avec intégration de l'API PrestaShop pour afficher les arrivages en temps réel. Design moderne avec boutique filtrable par catégorie, statut du magasin en temps réel (ouvert/fermé), formulaire d'estimation gratuite à domicile, Google Maps intégré et structure SEO locale avec données JSON-LD.",
		results: [
			"Score Lighthouse 98/100",
			"Chargement sous les 1.5s",
			"6 pages conçues et intégrées",
			"100% responsive mobile et desktop",
		],
		techStack: [
			"Next.js",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"PrestaShop API",
			"Framer Motion",
			"OVH VPS",
		],
	},
	{
		name: "L'Entre Deux",
		slug: "entre-deux",
		type: "Concept — Restaurant & bistro",
		accentColor: "#c4956a",
		logoText: "ED",
		image: "/projects/entre-deux.webp",
		screenshots: [
			"/projects/entre-deux.webp",
			"/projects/entre-deux-apropos.webp",
			"/projects/entre-deux-carte.webp",
			"/projects/entre-deux-horaires.webp",
			"/projects/entre-deux-map.webp",
			"/projects/entre-deux-avis.webp",
		],
		client: "L'Entre Deux",
		location: "Dinard, Bretagne",
		duration: "2 semaines",
		year: "2026",
		url: "https://entre-deux.vercel.app",
		context:
			"L'Entre-Deux est un bistro burger café à Dinard, tenu par un jeune couple passionné. 5 étoiles sur Google, 61 avis — une réputation solide qui mérite un site à la hauteur.",
		problem:
			"Pas de présence web propre. Les clients passent par des plateformes tierces pour trouver les horaires ou réserver, ce qui dilue l'image et coûte des commissions inutiles.",
		solution:
			"Vitrine élégante sur fond crème avec photo immersive du restaurant, carte en ligne, module de réservation directe et mise en avant des avis Google.",
		results: [
			"Vitrine moderne et immersive",
			"Carte en ligne accessible sur mobile",
			"Réservation directe sans commission",
			"Avis Google mis en avant",
		],
		techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
	},
	{
		name: "L'Artisane",
		slug: "artisane-dinard",
		type: "Concept — Salon de coiffure",
		accentColor: "#8B7D56",
		logoText: "LA",
		image: "/projects/artisane-dinard.webp",
		screenshots: [
			"/projects/artisane-dinard.webp",
			"/projects/artisane-dinard-apropos.webp",
			"/projects/artisane-dinard-prestations.webp",
			"/projects/artisane-dinard-contact.webp",
		],
		client: "L'Artisane, Pauline Besnard",
		location: "Dinard, Bretagne",
		duration: "3 semaines",
		year: "2026",
		url: "https://l-artisane-a-dinard-website.vercel.app",
		context:
			"Pauline Besnard a passé 20 ans à perfectionner son art avant d'ouvrir son propre salon au cœur du quartier Newquay à Dinard. Spécialisée en coloration végétale et soins naturels, partenaire officielle Kydra Le Salon, elle avait tout pour attirer une clientèle exigeante, sauf un site web à la hauteur de son savoir-faire. Son salon vivait sur Instagram et le bouche-à-oreille, mais elle perdait les clientes qui cherchaient « coiffeuse Dinard » ou « coloration végétale Dinard » sur Google, et qui tombaient sur ses concurrents.",
		problem:
			"Créer un site qui reflète l'univers de Pauline : naturel, élégant, artisanal. Pas un template générique de salon. Un site qui donne envie de pousser la porte avant même d'y avoir mis les pieds. Les contraintes : budget maîtrisé (offre Vitrine à 1 490 €), délai serré de 3 semaines, et une cliente sans aucune expérience du web. Le process devait rester simple pour elle, le site rapide, accessible, et optimisé pour le SEO local.",
		solution:
			"Cinq pages pensées pour convertir : Accueil qui accroche, À propos qui inspire confiance, Prestations claires, Galerie qui prouve le savoir-faire, Contact qui convertit. Palette sur mesure (vert forêt profond, or subtil, crème naturel) et typographie Cormorant Garamond × Inter pour un rendu artisanal et lisible. Stack solide : Next.js App Router, TypeScript strict, Tailwind CSS v4, shadcn/ui, Resend avec rate limiting Upstash pour le formulaire, Plausible sans cookies pour les analytics, JSON-LD HairSalon pour le SEO local. Headers HTTP complets, protection CSRF, sanitization serveur : la même rigueur technique qu'un site e-commerce.",
		results: [
			"Score Performance 100/100",
			"Score Accessibilité 96/100",
			"Score Best Practices 100/100",
			"Score SEO 100/100",
		],
		techStack: [
			"Next.js",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Keystatic",
			"Framer Motion",
			"Vercel",
		],
	},
]

// ─── Google Reviews ──────────────────────────────────────────
// Remplace "#" par ton lien Google Reviews quand tu auras ta fiche
export const GOOGLE_REVIEW_URL = "#"

// ─── Blog ────────────────────────────────────────────────────

export type BlogPost = {
	slug: string
	title: string
	excerpt: string
	category: string
	publishedAt: string
	readingTime: number
	content: string
}

export const BLOG_POSTS: BlogPost[] = [
	{
		slug: "10-actions-site-rapide-moins-seconde",
		title: "10 actions concrètes pour que votre site charge en moins d'une seconde",
		excerpt:
			"Un site qui charge en plus de 3 secondes, c'est la moitié de vos visiteurs qui repartent. Voici 10 actions concrètes pour tomber sous la barre de la seconde, classées par difficulté.",
		category: "Performance web",
		publishedAt: "2026-04-23",
		readingTime: 5,
		content: `Votre site s'ouvre en 2 secondes chez vous, depuis le wifi fibre de votre atelier. Jusque-là tout va bien. Sauf que 70% de vos visiteurs, eux, viennent en 4G, parfois faible, depuis un café ou une voiture. Et là, votre site met 6 secondes.

Le problème, c'est que vous ne le voyez jamais. Vos clients qui partent avant que la page soit affichée ne vous envoient pas de mail pour vous le dire. C'est juste du chiffre d'affaires qui file en silence vers vos concurrents.

Dans cet article, 10 actions concrètes pour passer votre site sous la barre de **1 seconde de chargement** sur mobile. Certaines se font en 10 minutes sans être développeur, d'autres nécessitent un peu de technique. Elles sont classées par difficulté.

## Comment savoir si votre site est trop lent en 2 minutes

Avant de corriger, il faut mesurer. Et bonne nouvelle : Google propose un outil gratuit qui teste votre site en 30 secondes.

:::stat
53%
des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger (source : Google).
:::

Rendez-vous sur **pagespeed.web.dev**, entrez l'adresse de votre site, cliquez "Analyser". Vous obtenez un score mobile de 0 à 100 et surtout trois chiffres qui comptent vraiment :

:::brief
- **LCP (Largest Contentful Paint)** : temps pour afficher l'image ou le titre principal de votre page. Objectif : moins de 2,5 secondes.
- **CLS (Cumulative Layout Shift)** : stabilité visuelle. Les boutons ne doivent pas bouger pendant le chargement.
- **INP (Interaction to Next Paint)** : réactivité. Quand on clique sur un bouton, il répond en combien de temps ? Moins de 200 ms idéalement.
:::

Si votre score mobile est en dessous de 50, vous perdez probablement plus de clients que vous n'en gagnez. Les 10 actions ci-dessous vont vous permettre de remonter ça.

## Vos images, là où vous perdez le plus de vitesse

Sur un site d'artisan, les images font souvent **70% du poids de la page** : photos de chantiers, galerie de réalisations, avant et après. C'est là qu'on gagne le plus de vitesse, et souvent le plus facilement.

:::example
Prenons l'exemple d'un plombier à Saint-Malo avec 30 photos de ses chantiers sur son site. Chaque photo pèse 4 Mo. La page d'accueil charge donc 120 Mo de données sur le téléphone du visiteur, soit 15 secondes en 4G correcte. En compressant les photos et en les redimensionnant, le poids total tombe à 2 Mo et le chargement passe à 0,8 seconde.
:::

Les 4 actions concrètes sur vos images :

**1. Compressez avant de mettre en ligne.** Un outil comme **TinyPNG** (gratuit) divise par 5 le poids d'une photo sans perte visible. Une photo de 4 Mo passe à 800 Ko en 10 secondes.

**2. Utilisez le bon format.** Le **WebP** est 3 fois plus léger que le JPEG pour la même qualité visuelle. Tous les navigateurs modernes le lisent sans problème.

**3. Redimensionnez à la taille d'affichage.** Une photo de 4000 x 3000 pixels affichée dans un cadre de 800 x 600, c'est 95% de poids inutile. Recadrez avant l'upload.

**4. Activez le chargement progressif (lazy loading).** Les images en bas de page ne se chargent que lorsque le visiteur scrolle vers elles. Votre première seconde est libérée pour afficher l'essentiel.

:::stat
80 Ko
Le poids cible d'une photo bien optimisée sur un site d'artisan. Au-dessus de 200 Ko, elle ralentit votre page.
:::

## Le code de votre site, allégez ce qui pèse

Les images ne sont pas seules. Le code qui fait tourner votre site pèse aussi, et souvent beaucoup trop. Ces actions nécessitent soit un développeur soit un bon hébergeur.

**5. Supprimez les plugins WordPress inutiles.** Chaque plugin charge son propre code à chaque visite. Un site WordPress moyen a **une vingtaine de plugins** actifs, dont la moitié ne sert à rien ou fait doublon. C'est souvent 50% du temps de chargement.

**6. Chargez le JavaScript uniquement quand nécessaire.** Le script de votre chat en ligne, votre popup newsletter, votre tracking marketing : rien de tout ça n'a besoin d'être chargé avant l'affichage de la page. Un développeur sait faire ça en une heure.

**7. Minifiez le CSS et le JavaScript.** C'est une option qui s'active en 2 clics sur un bon hébergeur. Le code est compressé : espaces, retours à la ligne et commentaires supprimés. Gain typique : 30% de poids en moins.

:::example
Imaginons une boulangère à Saint-Brieuc avec un site WordPress à 12 plugins actifs (newsletter, chat, réservation, 3 plugins SEO différents, slider, etc.). Temps de chargement : 9 secondes sur mobile. En supprimant 8 plugins inutiles et en minifiant le code, le site passe à 1,1 seconde. Les commandes en ligne peuvent doubler dans le mois qui suit.
:::

## L'hébergement et la livraison, votre infrastructure compte

Les 3 dernières actions, souvent ignorées parce qu'elles sont invisibles. Pourtant elles peuvent diviser votre temps de chargement par 3.

**8. Choisissez un bon hébergeur.** L'offre à 2 EUR par mois partagée avec 500 autres sites ne peut pas être rapide. Un hébergement moderne (Vercel, Netlify, un bon OVH) commence autour de 10 à 20 EUR par mois et change radicalement la donne.

**9. Activez un CDN.** Un CDN (Content Delivery Network) duplique votre site sur des serveurs répartis dans le monde. Un visiteur à Rennes reçoit votre site depuis Paris, un visiteur à Marseille depuis un serveur plus proche. Résultat : **50% de temps de chargement en moins** pour les visiteurs loin du serveur principal.

**10. Activez le cache navigateur.** La première visite charge tout. Les visites suivantes chargent uniquement ce qui a changé. Un visiteur qui revient sur votre site voit la page s'afficher quasiment instantanément.

:::stat
3x plus rapide
La différence typique entre un hébergement partagé bas de gamme et un hébergement moderne avec CDN activé.
:::

## Ce qu'on fait différemment chez Djanni Studio

Chez Djanni Studio, ces 10 actions sont appliquées **par défaut** sur tous les sites livrés. Pas en option, pas en supplément : c'est le standard minimum.

:::brief
- **Next.js** génère des pages statiques ultra-rapides, pas de calcul côté serveur à chaque visite
- **Images compressées et redimensionnées automatiquement**, format WebP servi automatiquement aux navigateurs modernes
- **Zéro plugin inutile** : chaque fonctionnalité est développée proprement, rien ne traîne
- **Hébergement Vercel** avec CDN mondial et cache configuré correctement
:::

Temps de chargement moyen mesuré sur les sites Djanni : **moins de 1,2 seconde sur mobile**. [Voir des exemples concrets](/realisations).

---

## Ce qu'il faut retenir

Un site rapide, ce n'est pas un luxe technique. C'est le minimum pour que vos clients restent assez longtemps pour vous contacter. Et la bonne nouvelle, c'est que la plupart des optimisations sont accessibles même sans être développeur.

:::brief
- Mesurez votre site avec PageSpeed Insights avant de corriger quoi que ce soit
- Les images font 70% du poids de votre site : commencez par là
- Les plugins WordPress inutiles peuvent peser autant que tout le reste du code
- L'hébergement bas de gamme bride votre performance, quoi que vous fassiez
- L'objectif réaliste pour un site d'artisan en 2026 : moins de 1 seconde de chargement sur mobile
:::

Vous voulez savoir où se situe votre site aujourd'hui, et quelles sont les 2 ou 3 actions qui auraient le plus d'impact pour vous ? Djanni Studio vous propose un **audit de performance gratuit et sans engagement**. On vous dit exactement où vous en êtes et par où commencer.

:::cta
[Demander un audit gratuit](/demande-projet) · [Voir nos réalisations](/realisations)
:::`,
	},
	{
		slug: "site-lent-10-secondes",
		title: "Ce que vos clients vivent quand votre site met 10 secondes à charger",
		excerpt:
			"53% des visiteurs quittent un site qui met plus de 3 secondes à charger. Voici ce qui se passe vraiment dans la tête de vos clients pendant ces 10 secondes — et ce que ça coûte à votre commerce.",
		category: "Performance web",
		publishedAt: "2026-03-26",
		readingTime: 4,
		content: `Votre site met plus de 3 secondes à charger ? Alors vous perdez des clients sans le savoir. Pas parce que votre offre est mauvaise, mais parce que personne ne la voit.

Le problème, c'est que la lenteur d'un site est invisible pour celui qui le possède. Vous, vous le trouvez "correct". Vos clients, eux, sont déjà partis chez un concurrent.

Dans cet article, on vous montre **ce que vos visiteurs vivent réellement** quand votre site met du temps à s'afficher — et ce que ça coûte concrètement à votre activité.

## La réalité en chiffres

:::stat
53%
des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger (source : Google).
:::

Ce n'est pas une estimation — c'est mesuré par Google sur des millions de sites. Et ça va plus loin : chaque seconde de chargement en plus, c'est **7% de conversions en moins**. Autrement dit, un site à 10 secondes ne convertit quasiment personne.

:::stat
10 secondes
C'est la durée maximale d'attention d'un utilisateur web selon Nielsen Norman Group. Au-delà, vous n'existez plus.
:::

## Les 10 secondes vécues de l'intérieur

Voici ce que traverse réellement votre client, seconde par seconde.

**0 à 1 seconde — L'attente normale.** Il est patient. Son téléphone est peut-être en 4G un peu faible. Il attend, confiant.

**1 à 3 secondes — Le doute s'installe.** La page est encore blanche. Il se demande si le lien fonctionne. Il regarde la barre de chargement du navigateur.

**3 à 5 secondes — L'impatience.** Il commence à taper avec son pouce. Il relit le titre de l'onglet. Il envisage de rafraîchir la page.

**5 à 7 secondes — La question qui tue.** "Ce commerce est-il encore actif ?" Inconsciemment, un site lent = un commerce négligé. C'est injuste, mais c'est humain.

**7 à 10 secondes — La décision.** Il appuie sur le bouton retour. Il retourne sur Google. Il clique sur le site de votre concurrent.

**Au-delà de 10 secondes — Vous n'existez plus.** Il ne reviendra probablement jamais.

:::example
Prenons l'exemple d'un coiffeur à Dinan avec un site WordPress qui met 8 secondes à charger sur mobile. Un taux de rebond de 78% signifie que 3 visiteurs sur 4 repartent sans rien voir. Après refonte sur un site rapide, ce taux peut descendre à 35% — et les prises de rendez-vous en ligne doubler.
:::

## Le problème, c'est que vous ne le voyez jamais

Quand un client pousse votre porte et repart sans acheter, vous le voyez. Vous pouvez réagir, ajuster.

Quand un visiteur quitte votre site en 4 secondes, vous n'en savez rien. Pas de notification, pas de signe. Juste du chiffre d'affaires qui part en silence chez quelqu'un d'autre.

## Pourquoi les sites sont lents

La plupart du temps, ce n'est pas une fatalité. Un site lent, c'est souvent :

- Des **images trop lourdes** — une photo de 4 Mo qu'on aurait pu compresser à 80 ko
- Un **thème WordPress chargé de plugins** inutiles qui s'exécutent à chaque visite
- Un **hébergement bas de gamme** partagé avec 500 autres sites
- Du **JavaScript excessif** qui bloque l'affichage avant même que la page soit visible

:::example
Imaginons un boulanger à Saint-Brieuc avec 12 plugins WordPress actifs sur son site. Temps de chargement : 9 secondes. En passant sur un site sur mesure sans plugins inutiles, le temps descend à 1,1 seconde — sans rien perdre en fonctionnalités.
:::

## Ce qu'on fait différemment chez Djanni Studio

Chez Djanni Studio, la performance n'est pas un bonus, c'est le minimum. Chaque site est conçu pour charger en **moins de 1,2 seconde** sur mobile. [Voir des exemples concrets](/realisations).

:::brief
- **Next.js** génère des pages statiques ultra-rapides, sans calcul côté serveur à chaque visite
- **Images compressées et chargées progressivement** — votre visiteur voit quelque chose immédiatement
- **Zéro plugin inutile** — chaque fonctionnalité est développée proprement
- **Hébergement Vercel** — vos pages sont servies depuis le datacenter le plus proche de votre visiteur
:::

:::stat
< 1,2 s
Le temps de chargement moyen des sites livrés par Djanni Studio sur mobile.
:::

## Comment tester votre site maintenant

Vous pouvez vérifier les performances de votre site gratuitement en quelques secondes. Rendez-vous sur **PageSpeed Insights** de Google (pagespeed.web.dev), entrez l'adresse de votre site, et regardez le score mobile.

:::brief
- **90-100** : Excellent — votre site est rapide
- **50-89** : Des améliorations sont possibles
- **0-49** : Urgent — vous perdez des clients chaque jour
:::

---

## Ce qu'il faut retenir

Un site lent, ce n'est pas juste un détail technique agaçant. C'est une vitrine avec les volets à moitié fermés. C'est du bouche-à-oreille qui ne convertit jamais.

:::brief
- 53% des visiteurs partent après 3 secondes de chargement
- Chaque seconde en plus = 7% de conversions en moins
- Un site lent donne une image de commerce négligé
- La lenteur est souvent causée par des images lourdes et des plugins inutiles
- Un site performant se charge en moins de 1,2 seconde sur mobile
:::

**Vous voulez savoir ce que vaut vraiment votre site ?** Djanni Studio vous propose un audit de performance gratuit et sans engagement. On vous dit exactement où vous en êtes et comment améliorer les choses.

:::cta
[Demander un audit gratuit](/demande-projet) · [Voir nos réalisations](/realisations)
:::`,
	},
	{
		slug: "5-raisons-artisan-site-web-2026",
		title: "5 raisons pour un artisan d'avoir un site web en 2026",
		excerpt:
			"Vos clients vous cherchent sur Google avant de vous appeler. Voici pourquoi un site web n'est plus optionnel pour un artisan en 2026.",
		category: "Conseils",
		publishedAt: "2026-03-20",
		readingTime: 5,
		content: `En 2026, vos futurs clients ne cherchent plus dans les Pages Jaunes. Ils tapent leur besoin sur Google, regardent les 3 premiers résultats, et appellent. Si vous n'avez pas de site, vous n'existez pas pour eux.

Le problème, c'est que beaucoup d'artisans pensent encore qu'une page Facebook ou le bouche-à-oreille suffisent. Ce n'est plus le cas depuis longtemps.

Dans cet article, vous allez découvrir **5 raisons concrètes** pour lesquelles un site web est devenu indispensable pour un artisan ou commerçant — et pourquoi c'est plus accessible que vous ne le pensez.

## 1. Vos clients vous cherchent sur Google

:::stat
97%
des consommateurs recherchent un artisan ou commerce local sur internet avant de passer à l'action.
:::

Un simple profil sur les Pages Jaunes ou une page Facebook ne suffit plus. Google favorise les **sites web dédiés** dans ses résultats de recherche locale. Sans site, vous laissez ces clients à vos concurrents qui en ont un.

:::example
Prenons l'exemple d'un plombier à Rennes qui reçoit **3 à 5 appels par semaine** uniquement via son site web — des clients qui ne l'auraient jamais trouvé autrement.
:::

## 2. Un site web vous rend crédible

Imaginez : un client potentiel hésite entre deux plombiers. L'un a un site professionnel avec ses réalisations, ses avis clients et ses tarifs clairement affichés. L'autre n'a qu'un numéro de téléphone sur les Pages Jaunes.

Le choix est vite fait. **Un site web inspire confiance** et montre que vous prenez votre activité au sérieux. C'est votre carte de visite digitale, disponible 24h/24.

:::example
Imaginons une boulangère à Brest qui met en ligne un site avec galerie photo de ses créations. Résultat typique : les commandes spéciales (gâteaux d'anniversaire, plateaux) peuvent augmenter de 30 à 40% grâce à la visibilité en ligne.
:::

## 3. Votre site travaille même quand vous ne travaillez pas

Votre site web est votre meilleur commercial. Il travaille pour vous même quand vous êtes sur un chantier, en week-end ou en vacances.

Les clients peuvent consulter vos services, voir vos réalisations et vous contacter via un formulaire **à n'importe quelle heure**. Plus besoin de décrocher le téléphone en plein travail.

:::brief
- Vos services sont visibles 24h/24, 7j/7
- Les clients vous contactent via formulaire, pas besoin de décrocher
- Votre site génère des demandes même pendant vos congés
:::

## 4. Le référencement local vous amène des clients gratuitement

Un site bien optimisé pour le **SEO local** vous positionne dans les premiers résultats quand quelqu'un cherche "artisan + votre ville". C'est le canal d'acquisition le plus rentable sur le long terme.

Pas besoin de payer de la pub en continu — un bon référencement naturel vous apporte des clients gratuitement, mois après mois.

:::stat
Top 3 Google
Un artisan en première page de Google pour sa ville reçoit en moyenne 5 à 10 fois plus de contacts qu'un concurrent absent du web.
:::

## 5. C'est plus abordable que vous ne le pensez

Un site vitrine professionnel coûte entre **990€ et 2 000€** — c'est un investissement unique qui se rentabilise dès le premier client acquis grâce à votre présence en ligne.

Comparez ça au coût d'une pub dans un journal local (300-500€ par parution) ou d'un flyer (impression + distribution). Le site web est l'investissement **le plus rentable** pour un artisan.

:::example
Prenons l'exemple d'un maçon à Vannes qui investit 1 500€ dans son site. En 3 mois, un formulaire de contact bien placé peut générer 10 à 15 demandes de devis. Un seul chantier signé couvre largement le coût du site.
:::

---

## Ce qu'il faut retenir

Aujourd'hui, ne pas avoir de site web, c'est **laisser des clients à vos concurrents**. Un site simple, clair et bien référencé peut vous amener des dizaines de prospects qualifiés chaque mois — sans effort de votre part.

:::brief
- 97% des clients cherchent en ligne avant d'appeler
- Un site inspire confiance et crédibilité
- Le SEO local vous amène des clients gratuitement
- Un site se rentabilise dès le premier client acquis
- Budget : entre 990€ et 2 000€ pour un résultat professionnel
:::

**Vous êtes artisan ou commerçant en Bretagne ?** Premier échange gratuit et sans engagement pour voir ce qu'un site peut faire pour votre activité.

:::cta
[Voir les offres](/offres) · [Demander un devis gratuit](/demande-projet)
:::`,
	},
	{
		slug: "combien-coute-site-vitrine-bretagne",
		title: "Combien coûte un site vitrine en Bretagne en 2026 ?",
		excerpt:
			"Les prix varient de 500€ à 10 000€. Voici un guide transparent pour comprendre ce que vous payez vraiment.",
		category: "Prix",
		publishedAt: "2026-03-14",
		readingTime: 7,
		content: `Vous avez décidé de créer un site web pour votre commerce ou votre activité artisanale. Première étape : comprendre les prix. Et là, c'est la jungle. Un devis à 500€, un autre à 5 000€, un troisième à 12 000€. Pour quoi, exactement ?

Le manque de transparence dans ce secteur est un vrai problème. Beaucoup d'artisans paient trop cher pour un résultat moyen, ou pas assez pour un site qui ne durera pas.

Dans ce guide, on vous explique **concrètement ce que coûte un site vitrine** en Bretagne en 2026, ce qui fait varier le prix, et comment faire le bon choix pour votre budget.

## Les différentes fourchettes de prix

### Les plateformes DIY (0€ - 300€/an)

Wix, Squarespace, WordPress.com... Ces outils permettent de créer un site soi-même. **Le problème ?** Des templates génériques, des performances médiocres et un abonnement mensuel qui s'accumule.

:::example
Prenons l'exemple d'un fleuriste qui utilise Wix pendant 3 ans. Coût total : 30€/mois x 36 = **1 080€**. Résultat : un site lent, mal référencé, et un design qui ressemble à des centaines d'autres. En passant sur un site sur mesure à 990€, le résultat est meilleur pour moins cher — et sans abonnement.
:::

### Les freelances juniors (500€ - 1 500€)

Un développeur débutant ou un étudiant peut créer un site à petit prix. Attention cependant à la **qualité du code, au support après-vente** et à la pérennité du site. Beaucoup de ces sites ne sont plus maintenus après quelques mois.

### Les freelances spécialisés (990€ - 3 000€)

C'est le juste milieu. Un freelance expérimenté vous livre un site **sur mesure, performant et optimisé SEO**. Le prix inclut le design, le développement, la mise en ligne et souvent une formation.

Chez Djanni Studio, les tarifs commencent à **990€** pour [l'offre Présence](/offres) et **1 990€** pour l'offre Sur mesure avec catalogue et animations.

### Les agences (3 000€ - 10 000€+)

Les agences web ont des coûts de structure importants (locaux, salariés, commercial...). Vous payez souvent **le commercial et le chef de projet** autant que le développeur qui code réellement votre site.

:::stat
990€ — 2 000€
La fourchette idéale pour un artisan ou commerçant qui veut un site professionnel, performant et rentable.
:::

## Ce qui fait varier le prix

Plusieurs facteurs influencent le coût final :

- **Le nombre de pages** : 5 pages vs 15 pages
- **Les fonctionnalités** : formulaire simple vs catalogue produits
- **Le design** : template adapté vs design 100% sur mesure
- **Le SEO** : basique vs optimisation poussée
- **La formation** : avec ou sans accompagnement post-livraison

:::brief
- Un site 5 pages avec formulaire : autour de 990€
- Un site 8+ pages avec catalogue et animations : autour de 1 990€
- Une refonte d'un site existant : à partir de 1 500€
- Le design sur mesure coûte plus cher qu'un template adapté
- Le SEO poussé est un investissement qui se rentabilise vite
:::

## Comment choisir le bon prestataire

Au-delà du prix, voici les questions à poser avant de signer :

- **Quel est le délai de livraison ?** Un bon freelance livre en 2 à 5 semaines selon la complexité, pas 3 mois.
- **Le prix inclut-il l'hébergement ?** Attention aux frais cachés récurrents.
- **Qui est propriétaire du site ?** Vous devez pouvoir récupérer votre site si vous changez de prestataire.
- **Y a-t-il un support après la mise en ligne ?** Un site a besoin de maintenance.

:::example
Imaginons un artisan charpentier à Quimper qui signe avec une agence à 4 500€. Délai annoncé : 6 semaines. Résultat courant : le site est livré 4 mois plus tard, avec des bugs non corrigés. En faisant refaire son site chez un freelance spécialisé pour 1 500€, il obtient un résultat livré en 2 semaines, sans accroc.
:::

---

## Ce qu'il faut retenir

Pour un artisan ou commerçant en Bretagne, un **budget entre 990€ et 2 000€** vous permet d'avoir un site professionnel qui se rentabilise rapidement. L'important est de choisir un prestataire qui comprend votre métier et qui livre dans les délais.

**Besoin d'un devis transparent ?** Chez Djanni Studio, le prix annoncé est le prix final. Pas de frais cachés, pas d'abonnement imposé. Premier échange gratuit.

:::cta
[Voir les offres détaillées](/offres) · [Demander un devis gratuit](/demande-projet)
:::`,
	},
	{
		slug: "site-web-vs-reseaux-sociaux-artisan",
		title: "Site web vs réseaux sociaux : qu'est-ce qui marche le mieux pour un artisan ?",
		excerpt:
			"Facebook, Instagram ou un site web ? On compare les deux approches pour vous aider à choisir la bonne stratégie.",
		category: "Stratégie",
		publishedAt: "2026-03-08",
		readingTime: 6,
		content: `"J'ai déjà une page Facebook, pourquoi j'aurais besoin d'un site ?" C'est la question qu'on entend le plus souvent chez les artisans et commerçants. Et c'est une vraie question.

Le problème, c'est que beaucoup confondent **présence sur les réseaux** et **présence en ligne**. Ce n'est pas la même chose, et les conséquences sur votre chiffre d'affaires sont réelles.

Dans cet article, on compare honnêtement les deux approches pour vous aider à faire le bon choix.

## Le piège des réseaux sociaux

Beaucoup d'artisans pensent qu'une page Facebook suffit. C'est une erreur courante. Les réseaux sociaux sont un excellent **complément**, mais ils ne remplacent pas un site web. Voici pourquoi.

:::stat
5 à 10%
C'est la part de vos abonnés qui voient réellement vos publications sur Facebook. L'algorithme filtre le reste.
:::

### Pourquoi les réseaux sociaux ne suffisent pas

- **Vous ne contrôlez rien** : Facebook peut changer son algorithme demain et votre page ne sera plus visible
- **Audience limitée** : seuls vos abonnés voient vos publications (et encore, une infime partie)
- **Pas de référencement Google** : une page Facebook n'apparaît presque jamais dans les recherches locales
- **Image peu professionnelle** : "Allez voir notre Facebook" inspire moins confiance qu'un vrai site web

:::example
Prenons l'exemple d'un restaurateur à Saint-Malo qui poste tous les jours sur Instagram. Malgré 800 abonnés, ses publications atteignent en moyenne 60 personnes. Avec un site web optimisé SEO, il peut recevoir 150 visiteurs par semaine via Google — des gens qui cherchent activement un restaurant dans sa zone.
:::

## Ce que le site web fait mieux

### Le référencement local

Quand quelqu'un tape "boulanger Saint-Malo" sur Google, ce sont les **sites web** qui apparaissent en premier, pas les pages Facebook. Un site optimisé SEO vous positionne exactement là où vos clients vous cherchent.

### La crédibilité

Un site web professionnel avec vos réalisations, vos avis clients et vos tarifs **inspire confiance**. C'est votre vitrine digitale, ouverte 24h/24. Aucun réseau social ne vous donne ce niveau de contrôle sur votre image.

### La liberté

Votre site vous appartient. Pas d'algorithme qui décide qui voit votre contenu. Pas de publicité de vos concurrents affichée sur votre profil. Pas de risque qu'une plateforme ferme et emporte votre audience avec elle.

:::brief
- Google favorise les sites web, pas les pages Facebook
- Un site inspire plus confiance qu'un profil social
- Vous gardez le contrôle total de votre image et contenu
- Pas de dépendance à un algorithme qui change sans prévenir
:::

## La stratégie gagnante : les deux

La meilleure approche ? **Combiner les deux.** Un site web comme base solide, et les réseaux sociaux pour animer votre communauté et renvoyer du trafic vers votre site.

Votre site web est votre **quartier général**. Les réseaux sociaux sont vos **haut-parleurs**.

:::example
Imaginons un ébéniste à Quimper qui utilise Instagram pour montrer ses créations en cours (stories, photos d'atelier). Chaque publication renvoie vers son site où les clients trouvent son catalogue complet, ses tarifs et son formulaire de devis. Résultat : Instagram attire l'attention, le site convertit les visiteurs en clients.
:::

---

## Ce qu'il faut retenir

Les réseaux sociaux ne remplacent pas un site web — ils le complètent. Pour un artisan, le site est la **fondation** de votre présence en ligne. C'est lui qui vous rend visible sur Google, qui inspire confiance, et qui travaille pour vous 24h/24.

:::brief
- Facebook/Instagram = visibilité temporaire auprès de vos abonnés
- Site web = visibilité permanente sur Google pour de nouveaux clients
- La stratégie gagnante : un site web solide + les réseaux pour l'animer
:::

**Prêt à créer votre site web ?** Djanni Studio accompagne les artisans bretons dans leur transition digitale. Premier échange gratuit et sans engagement.

:::cta
[Découvrir les offres](/offres) · [Démarrer mon projet](/demande-projet)
:::`,
	},
]

export type PricingTier = {
	badge: string
	priceLabel: string
	price: string
	priceSuffix: string
	priceNote: string
	name: string
	description: string
	benefitLine: string
	features: string[]
	ctaLabel: string
	href?: string
	featured?: boolean
	popularNote?: string
}

export const PRICING_TIERS: PricingTier[] = [
	{
		badge: "Présence",
		priceLabel: "À partir de",
		price: "990",
		priceSuffix: "€",
		priceNote: "495€ à la signature • 495€ à la livraison",
		name: "Présence",
		description: "Vous n'existez pas sur Google. On règle ça en 2 semaines.",
		benefitLine: "Pour apparaître sur Google et rassurer les clients qui vous cherchent.",
		features: [
			"1 page complète (Hero, Services, Galerie, Contact…)",
			"Design sur mesure à votre image",
			"Parfait sur le téléphone de vos clients",
			"Vos clients vous appellent en un clic",
			"Visible sur Google dans votre ville",
			"Site sécurisé et en ligne",
			"Formation 1h : modifier vos textes et photos",
			"Support 30 jours inclus",
			"Livraison en 2 semaines",
		],
		ctaLabel: "Démarrer mon site",
	},
	{
		badge: "La plus choisie",
		priceLabel: "À partir de",
		price: "1 490",
		priceSuffix: "€",
		priceNote: "50% à la signature • 50% à la livraison",
		name: "Vitrine",
		description: "Un vrai outil de travail — pas juste une carte de visite en ligne.",
		benefitLine: "Pour donner envie avant même que le client pousse la porte.",
		popularNote: "L'offre la plus adaptée pour 80% des artisans et commerçants.",
		features: [
			"Jusqu'à 5 pages (Accueil, Prestations, Réalisations, À propos, Contact)",
			"Galerie photos / portfolio de vos réalisations",
			"Avant/après pour montrer votre savoir-faire",
			"Animations soignées qui donnent envie",
			"Visible sur Google dans votre ville (SEO optimisé)",
			"Voir combien de visiteurs viennent sur votre site",
			"Formation 2h : gérer votre site en toute autonomie",
			"Support 1 mois inclus",
			"Livraison en 3 semaines",
		],
		ctaLabel: "Démarrer mon site",
		featured: true,
	},
	{
		badge: "Sur mesure",
		priceLabel: "À partir de",
		price: "1 990",
		priceSuffix: "€",
		priceNote: "Prix défini après échange • Paiement en 2 fois",
		name: "Sur mesure",
		description: "Vous avez des besoins spécifiques. On construit exactement ce qu'il faut.",
		benefitLine: "Pour transformer votre site en vrai outil de vente et de réservation.",
		features: [
			"Jusqu'à 8 pages (ex : Accueil, Services ×3, Réalisations, Blog, À propos, Contact)",
			"Vos clients réservent directement en ligne",
			"Blog intégré — vous publiez vous-même",
			"Votre catalogue de produits ou services visible en ligne",
			"Multilingue pour toucher plus de clients",
			"SEO avancé (audit complet + stratégie mots-clés)",
			"Support 3 mois inclus",
			"Réunion de suivi à 1 mois",
			"Livraison en 3-5 semaines",
		],
		ctaLabel: "Parler de mon projet",
	},
]

export type ProcessStep = {
	number: string
	title: string
	text: string
}

export const PROCESS_STEPS: ProcessStep[] = [
	{
		number: "01",
		title: "On discute",
		text: "Un appel de 30 minutes pour comprendre votre activité, vos besoins, et ce que vous voulez transmettre.",
	},
	{
		number: "02",
		title: "Je propose",
		text: "Un devis clair et une maquette visuelle. Vous voyez à quoi ressemblera votre site avant de signer.",
	},
	{
		number: "03",
		title: "On construit",
		text: "Je développe votre site, vous validez chaque étape. Aucune surprise à la livraison.",
	},
	{
		number: "04",
		title: "On lance",
		text: "Mise en ligne, SSL, formation à la gestion du contenu. Votre site est prêt à travailler pour vous.",
	},
]

export type WhyReason = {
	number: string
	title: string
	text: string
}

export const WHY_REASONS: WhyReason[] = [
	{
		number: "01",
		title: "Je viens du terrain",
		text: 'Avant de coder des sites, je montais des charpentes. Je connais les chantiers, les devis à faire le soir, les clients à rassurer. Aucun dev "pur" ne peut vous dire ça.',
	},
	{
		number: "02",
		title: "Je me déplace chez vous",
		text: "Basé à Dinard, je viens dans vos locaux à Saint-Malo, Dinard et sur toute la Côte d'Émeraude. Je comprends votre métier avant de parler de pixels.",
	},
	{
		number: "03",
		title: "Vous gardez la main",
		text: "Votre site ne vous appartient pas si vous êtes prisonnier de votre prestataire. Chez moi : pas d'abonnement obligatoire, pas de dépendance. Vous êtes libre.",
	},
	{
		number: "04",
		title: "Livré en 2 à 5 semaines, pas en 6 mois",
		text: "Un planning clair, des étapes définies. Un seul interlocuteur, joignable en direct — pas une agence avec 5 contacts différents.",
	},
]

export const SKILLS = [
	"Next.js",
	"Tailwind CSS",
	"TypeScript",
	"Design UI",
	"SEO",
	"Mobile first",
] as const

export type Testimonial = {
	name: string
	role: string
	quote: string
	rating: number
}

export const TESTIMONIALS: Testimonial[] = [
	{
		name: "Marie Lefevre",
		role: "Gérante — Boulangerie du Port",
		quote:
			"Gianni a compris mon commerce en 30 minutes. Le site est exactement ce que j'avais en tête, et mes clients me disent qu'ils nous trouvent enfin sur Google.",
		rating: 5,
	},
	{
		name: "Thomas Renard",
		role: "Artisan charpentier — Renard Bois",
		quote:
			"Simple, rapide, efficace. Pas de blabla, un vrai résultat. J'ai enfin un site qui reflète la qualité de mon travail.",
		rating: 5,
	},
	{
		name: "Sophie Martin",
		role: "Fleuriste — Les Fleurs de Sophie",
		quote:
			"Je voulais un site beau et simple. Gianni a livré en 10 jours, tout était parfait. Je recommande à 100%.",
		rating: 5,
	},
	{
		name: "Florian Kervadec",
		role: "Ébéniste — Atelier Kervadec, Quimper",
		quote:
			"En tant qu'artisan, j'avais besoin d'un site qui montre mon savoir-faire. Gianni a créé quelque chose d'élégant qui met en valeur mes créations. Les demandes de devis ont doublé.",
		rating: 5,
	},
	{
		name: "Nathalie Guégan",
		role: "Gérante — Au Jardin de Nath, Vannes",
		quote:
			"Mon ancien site était daté et lent. Gianni l'a entièrement refait : moderne, rapide, et mes clients adorent. Le meilleur investissement de l'année.",
		rating: 5,
	},
]

export type FaqItem = {
	question: string
	answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
	{
		question: "Combien de temps faut-il pour créer un site ?",
		answer:
			"L'offre Présence est livrée en 2 semaines, l'offre Vitrine en 3 semaines, et l'offre Sur mesure en 3 à 5 semaines. Je vous donne un planning précis dès la signature du devis.",
	},
	{
		question: "Je n'y connais rien en technique, c'est un problème ?",
		answer:
			"Pas du tout. C'est même la majorité de mes clients. Je m'occupe de toute la partie technique et je vous explique tout en langage simple. Pour les textes, on les rédige ensemble à partir de vos mots — pas besoin d'être écrivain. Si vous n'avez pas de photos, on trouve une solution : photographe local ou banque d'images professionnelle. Vous n'avez rien à préparer pour démarrer.",
	},
	{
		question: "Que se passe-t-il après la mise en ligne ?",
		answer:
			"Je vous forme à la gestion de votre contenu. Si vous avez besoin de modifications par la suite, je reste disponible. Un forfait maintenance est aussi proposé si vous souhaitez être tranquille.",
	},
	{
		question: "Pourquoi pas un site WordPress ou Wix ?",
		answer:
			"Ces outils sont pratiques mais limités en performance et personnalisation. Je développe des sites sur mesure, plus rapides, mieux référencés, et qui vous appartiennent vraiment — pas d'abonnement mensuel imposé.",
	},
	{
		question: "Comment se passe le paiement ?",
		answer:
			"Simple : 50% à la signature du devis, 50% à la livraison. Pas de frais cachés, pas d'abonnement obligatoire. Le prix annoncé est le prix final.",
	},
	{
		question: "Je peux voir le site avant de payer ?",
		answer:
			"Oui. Je vous présente une maquette visuelle avant de commencer le développement. Vous validez le design, et seulement ensuite je construis. À chaque étape, vous pouvez demander des ajustements.",
	},
	{
		question: "Mon site sera-t-il visible sur Google ?",
		answer:
			"Oui. Chaque site est optimisé pour le référencement naturel (SEO) dès la création : structure technique propre, balises bien remplies, performance maximale. Je vous aide aussi à choisir les bons mots-clés pour votre activité.",
	},
	{
		question: "Puis-je modifier mon site moi-même ?",
		answer:
			"Ça dépend de la formule choisie. Sur une offre Vitrine, les modifications passent par moi (c'est inclus dans le forfait maintenance). Sur une offre Sur mesure, je peux intégrer un système de gestion de contenu si vous souhaitez être autonome.",
	},
	{
		question: "Vous intervenez sur quelle zone ?",
		answer:
			"Mon terrain principal c'est le bassin Dinard / Saint-Malo / Dinan — je me déplace physiquement chez mes clients dans cette zone. Au-delà, je travaille à distance avec des artisans partout en France. Visio, téléphone, email : on s'adapte.",
	},
]
