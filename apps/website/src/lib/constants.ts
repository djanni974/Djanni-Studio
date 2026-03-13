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
		year: "2025",
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
		year: "2025",
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
		slug: "site-lent-10-secondes",
		title: "Ce que vos clients vivent quand votre site met 10 secondes à charger",
		excerpt:
			"53% des visiteurs quittent un site qui met plus de 3 secondes à charger. Voici ce qui se passe vraiment dans la tête de vos clients pendant ces 10 secondes — et ce que ça coûte à votre commerce.",
		category: "Performance web, concrètement",
		publishedAt: "2026-03-10",
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
Un coiffeur à Dinan avait un site WordPress qui mettait 8 secondes à charger sur mobile. Google Analytics montrait un taux de rebond de 78%. Après refonte sur un site rapide, le taux de rebond est passé à 35% — et les prises de rendez-vous en ligne ont doublé.
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
Un boulanger à Saint-Brieuc avait 12 plugins WordPress actifs sur son site. Temps de chargement : 9 secondes. En passant sur un site sur mesure sans plugins inutiles, le temps est descendu à 1,1 seconde — sans rien perdre en fonctionnalités.
:::

## Ce qu'on fait différemment chez Djanni Studio

Chez Djanni Studio, la performance n'est pas un bonus — c'est le minimum. Chaque site est conçu pour charger en **moins de 1,2 seconde** sur mobile.

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

**Vous voulez savoir ce que vaut vraiment votre site ?** Djanni Studio vous propose un audit de performance gratuit et sans engagement. On vous dit exactement où vous en êtes — et comment améliorer les choses.`,
	},
	{
		slug: "5-raisons-artisan-site-web-2026",
		title: "5 raisons pour un artisan d'avoir un site web en 2026",
		excerpt:
			"Vos clients vous cherchent sur Google avant de vous appeler. Voici pourquoi un site web n'est plus optionnel pour un artisan en 2026.",
		category: "Conseils",
		publishedAt: "2026-03-01",
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
Un plombier à Rennes nous a confié recevoir **3 à 5 appels par semaine** uniquement via son site web — des clients qui ne l'auraient jamais trouvé autrement.
:::

## 2. Un site web vous rend crédible

Imaginez : un client potentiel hésite entre deux plombiers. L'un a un site professionnel avec ses réalisations, ses avis clients et ses tarifs clairement affichés. L'autre n'a qu'un numéro de téléphone sur les Pages Jaunes.

Le choix est vite fait. **Un site web inspire confiance** et montre que vous prenez votre activité au sérieux. C'est votre carte de visite digitale, disponible 24h/24.

:::example
Une boulangère à Brest a vu ses commandes spéciales (gâteaux d'anniversaire, plateaux) augmenter de 40% après la mise en ligne de son site avec galerie photo de ses créations.
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
Un maçon à Vannes a investi 1 500€ dans son site. En 3 mois, il a reçu 12 demandes de devis via son formulaire en ligne. Un seul chantier signé a couvert 10 fois le coût du site.
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

**Vous êtes artisan ou commerçant en Bretagne ?** Premier échange gratuit et sans engagement pour voir ce qu'un site peut faire pour votre activité.`,
	},
	{
		slug: "combien-coute-site-vitrine-bretagne",
		title: "Combien coûte un site vitrine en Bretagne en 2026 ?",
		excerpt:
			"Les prix varient de 500€ à 10 000€. Voici un guide transparent pour comprendre ce que vous payez vraiment.",
		category: "Prix",
		publishedAt: "2026-02-15",
		readingTime: 7,
		content: `Vous avez décidé de créer un site web pour votre commerce ou votre activité artisanale. Première étape : comprendre les prix. Et là, c'est la jungle. Un devis à 500€, un autre à 5 000€, un troisième à 12 000€. Pour quoi, exactement ?

Le manque de transparence dans ce secteur est un vrai problème. Beaucoup d'artisans paient trop cher pour un résultat moyen, ou pas assez pour un site qui ne durera pas.

Dans ce guide, on vous explique **concrètement ce que coûte un site vitrine** en Bretagne en 2026, ce qui fait varier le prix, et comment faire le bon choix pour votre budget.

## Les différentes fourchettes de prix

### Les plateformes DIY (0€ - 300€/an)

Wix, Squarespace, WordPress.com... Ces outils permettent de créer un site soi-même. **Le problème ?** Des templates génériques, des performances médiocres et un abonnement mensuel qui s'accumule.

:::example
Un fleuriste à Vannes a utilisé Wix pendant 3 ans. Coût total : 30€/mois x 36 = **1 080€**. Résultat : un site lent, mal référencé, et un design qui ressemble à des centaines d'autres. En passant sur un site sur mesure à 990€, il a un meilleur résultat pour moins cher — et sans abonnement.
:::

### Les freelances juniors (500€ - 1 500€)

Un développeur débutant ou un étudiant peut créer un site à petit prix. Attention cependant à la **qualité du code, au support après-vente** et à la pérennité du site. Beaucoup de ces sites ne sont plus maintenus après quelques mois.

### Les freelances spécialisés (990€ - 3 000€)

C'est le juste milieu. Un freelance expérimenté vous livre un site **sur mesure, performant et optimisé SEO**. Le prix inclut le design, le développement, la mise en ligne et souvent une formation.

Chez Djanni Studio, les tarifs commencent à **990€** pour un site vitrine et **1 990€** pour un site premium avec catalogue et animations.

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

- **Quel est le délai de livraison ?** Un bon freelance livre en 2-3 semaines, pas 3 mois.
- **Le prix inclut-il l'hébergement ?** Attention aux frais cachés récurrents.
- **Qui est propriétaire du site ?** Vous devez pouvoir récupérer votre site si vous changez de prestataire.
- **Y a-t-il un support après la mise en ligne ?** Un site a besoin de maintenance.

:::example
Un artisan charpentier à Quimper a signé avec une agence à 4 500€. Délai annoncé : 6 semaines. Résultat : le site a été livré 4 mois plus tard, avec des bugs non corrigés. Il a finalement fait refaire son site chez un freelance spécialisé pour 1 500€ — livré en 2 semaines, sans accroc.
:::

---

## Ce qu'il faut retenir

Pour un artisan ou commerçant en Bretagne, un **budget entre 990€ et 2 000€** vous permet d'avoir un site professionnel qui se rentabilise rapidement. L'important est de choisir un prestataire qui comprend votre métier et qui livre dans les délais.

**Besoin d'un devis transparent ?** Chez Djanni Studio, le prix annoncé est le prix final. Pas de frais cachés, pas d'abonnement imposé. Premier échange gratuit.`,
	},
	{
		slug: "site-web-vs-reseaux-sociaux-artisan",
		title: "Site web vs réseaux sociaux : qu'est-ce qui marche le mieux pour un artisan ?",
		excerpt:
			"Facebook, Instagram ou un site web ? On compare les deux approches pour vous aider à choisir la bonne stratégie.",
		category: "Stratégie",
		publishedAt: "2026-01-20",
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
Un restaurateur à Saint-Malo postait tous les jours sur Instagram. Malgré 800 abonnés, ses publications atteignaient en moyenne 60 personnes. Depuis qu'il a un site web optimisé SEO, il reçoit 150 visiteurs par semaine via Google — des gens qui cherchent activement un restaurant dans sa zone.
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
Un ébéniste à Quimper utilise Instagram pour montrer ses créations en cours (stories, photos d'atelier). Chaque publication renvoie vers son site où les clients trouvent son catalogue complet, ses tarifs et son formulaire de devis. Résultat : Instagram attire l'attention, le site convertit les visiteurs en clients.
:::

---

## Ce qu'il faut retenir

Les réseaux sociaux ne remplacent pas un site web — ils le complètent. Pour un artisan, le site est la **fondation** de votre présence en ligne. C'est lui qui vous rend visible sur Google, qui inspire confiance, et qui travaille pour vous 24h/24.

:::brief
- Facebook/Instagram = visibilité temporaire auprès de vos abonnés
- Site web = visibilité permanente sur Google pour de nouveaux clients
- La stratégie gagnante : un site web solide + les réseaux pour l'animer
:::

**Prêt à créer votre site web ?** Djanni Studio accompagne les artisans bretons dans leur transition digitale. Premier échange gratuit et sans engagement.`,
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
	features: string[]
	ctaLabel: string
	featured?: boolean
}

export const PRICING_TIERS: PricingTier[] = [
	{
		badge: "Présence",
		priceLabel: "À partir de",
		price: "990",
		priceSuffix: "€",
		priceNote: "495€ à la signature • 495€ à la livraison",
		name: "Présence",
		description: "Pour celui qui n'a pas de site et veut être visible rapidement.",
		features: [
			"1 landing page multi-sections",
			"Design sur mesure",
			"100% responsive mobile",
			"Numéro cliquable + formulaire",
			"SEO de base (title, OG)",
			"SSL + déploiement",
			"Formation 1h",
			"Support 30 jours",
			"Livraison en 2 semaines",
		],
		ctaLabel: "Démarrer",
	},
	{
		badge: "La plus choisie",
		priceLabel: "À partir de",
		price: "1 490",
		priceSuffix: "€",
		priceNote: "50% à la signature • 50% à la livraison",
		name: "Vitrine",
		description: "Pour celui qui veut un vrai site structuré, pas juste une page.",
		features: [
			"Jusqu'à 5 pages",
			"Galerie photos / portfolio",
			"Réalisations avant/après",
			"Animations soignées",
			"SEO intermédiaire (Lighthouse 90+)",
			"Google Analytics ou Plausible",
			"Formation 2h",
			"Support 1 mois",
			"Livraison en 3 semaines",
		],
		ctaLabel: "Démarrer",
		featured: true,
	},
	{
		badge: "Sur mesure",
		priceLabel: "À partir de",
		price: "1 990",
		priceSuffix: "€",
		priceNote: "Prix défini après échange • Paiement en 2 fois",
		name: "Sur mesure",
		description: "Pour celui qui a des besoins spécifiques.",
		features: [
			"Jusqu'à 8 pages",
			"Prise de RDV (Cal.com)",
			"Blog CMS",
			"Catalogue produits",
			"Multilingue",
			"SEO avancé (audit, mots-clés)",
			"Support 3 mois",
			"Réunion de suivi à 1 mois",
			"Livraison en 3-5 semaines",
		],
		ctaLabel: "Demander un devis",
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
		title: "Je comprends les artisans",
		text: "Charpentier de métier, je sais ce que c'est de travailler avec ses mains et de gérer un client. Pas de jargon, pas de bullshit.",
	},
	{
		number: "02",
		title: "Local & disponible",
		text: "Basé en Bretagne, disponible pour vous rencontrer. Pas un prestataire à l'autre bout du monde que vous ne verrez jamais.",
	},
	{
		number: "03",
		title: "Prix fixe, pas de surprise",
		text: "Devis signé avant de commencer. 50% à la signature, 50% à la livraison. Vous savez exactement ce que vous payez.",
	},
	{
		number: "04",
		title: "Livré en 2-3 semaines",
		text: "Pas 6 mois d'attente. Un planning clair, des étapes définies, un site livré dans les délais.",
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
			"En moyenne, un site vitrine est livré en 2 semaines. Un site premium prend environ 3 semaines. Je vous donne un planning précis dès la signature du devis.",
	},
	{
		question: "Je n'y connais rien en technique, c'est un problème ?",
		answer:
			"Pas du tout. C'est même la majorité de mes clients. Je m'occupe de toute la partie technique et je vous explique tout en langage simple. Vous n'avez qu'à me fournir vos textes et photos.",
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
			"Ça dépend de la formule choisie. Sur un site vitrine, les modifications passent par moi (c'est inclus dans le forfait maintenance). Sur un site premium, je peux intégrer un système de gestion de contenu si vous souhaitez être autonome.",
	},
	{
		question: "Travaillez-vous en dehors de la Bretagne ?",
		answer:
			"Bien sûr. La majorité de mes clients sont en Bretagne, mais je travaille à distance avec des artisans et commerçants partout en France. Visio, téléphone, email — on s'adapte.",
	},
]
