import { BLOG_POSTS, CITY_PAGES, FAQ_ITEMS, PRICING_TIERS, PROJECTS } from "@/lib/constants"

// Generation des fichiers llms.txt / llms-full.txt (norme llmstxt.org) a partir de
// constants.ts (source unique de verite). FR (locale par defaut). Sert a ce que les
// moteurs generatifs (ChatGPT, Claude, Perplexity, Gemini) comprennent et citent l'offre.

const BASE_URL = "https://www.djannistudio.fr"

const SUMMARY =
	"Création de sites web sur mesure pour artisans et commerçants en Bretagne (Dinard, Saint-Malo, Dinan, Côte d'Émeraude). Sites rapides, accessibles et optimisés pour le référencement local. Fondé par Gianni Jardin, ancien charpentier devenu développeur web. Micro-entreprise, TVA non applicable art. 293B du CGI."

const STATIC_PAGES = [
	{
		path: "/offres",
		title: "Offres et tarifs",
		desc: "Les 3 formules (Présence, Vitrine, Sur mesure) avec prix et contenu détaillé.",
	},
	{
		path: "/realisations",
		title: "Réalisations",
		desc: "Études de cas de sites livrés pour des artisans et commerçants locaux.",
	},
	{
		path: "/a-propos",
		title: "À propos",
		desc: "Gianni Jardin, ancien charpentier devenu développeur web à Dinard.",
	},
	{
		path: "/blog",
		title: "Blog",
		desc: "Conseils SEO local, performance et web pour artisans et commerçants.",
	},
	{
		path: "/options",
		title: "Options",
		desc: "Options et services complémentaires (maintenance, pages, fonctionnalités).",
	},
	{
		path: "/demande-projet",
		title: "Demander un devis",
		desc: "Formulaire pour obtenir un devis gratuit, réponse sous 24h.",
	},
] as const

const CONTACT = [
	"- Email : contact@djannistudio.fr",
	"- Téléphone : +33 7 49 54 74 98",
	"- Adresse : 4 boulevard Jules Verger, 35800 Dinard, Bretagne, France",
	"- Prise de rendez-vous : https://cal.com/djanni-studio/prendre-rendez-vous",
]

// Version concise : index de liens (norme llms.txt).
export function buildLlmsTxt() {
	const out: string[] = ["# Djanni Studio", "", `> ${SUMMARY}`, ""]

	out.push("## Offres")
	for (const tier of PRICING_TIERS) {
		out.push(
			`- [${tier.name} - à partir de ${tier.price}${tier.priceSuffix}](${BASE_URL}/offres) : ${tier.description}`,
		)
	}

	out.push("", "## Pages principales")
	for (const page of STATIC_PAGES) {
		out.push(`- [${page.title}](${BASE_URL}${page.path}) : ${page.desc}`)
	}

	out.push("", "## Zones d'intervention")
	for (const city of CITY_PAGES) {
		out.push(`- [Création de site web à ${city.cityName}](${BASE_URL}/${city.slug})`)
	}

	out.push("", "## Réalisations")
	for (const project of PROJECTS) {
		out.push(`- [${project.name} (${project.type})](${BASE_URL}/realisations/${project.slug})`)
	}

	out.push("", "## Blog")
	for (const post of BLOG_POSTS) {
		out.push(`- [${post.title}](${BASE_URL}/blog/${post.slug}) : ${post.excerpt}`)
	}

	out.push("", "## Contact", ...CONTACT, "")
	return out.join("\n")
}

// Version detaillee : contenu inline pour une comprehension complete par les LLM.
export function buildLlmsFullTxt() {
	const out: string[] = ["# Djanni Studio - documentation complète", "", `> ${SUMMARY}`, ""]

	out.push(
		"## À propos",
		"Djanni Studio est une micro-entreprise de développement web freelance basée à Dinard (Bretagne), fondée par Gianni Jardin, ancien charpentier reconverti développeur web. Spécialité : sites vitrines modernes, rapides et bien référencés pour les artisans et commerçants de Dinard, Saint-Malo, Dinan et toute la Côte d'Émeraude. Sites codés à la main (Next.js), performants et accessibles. Devis gratuit, réponse sous 24h.",
		"",
	)

	out.push("## Offres et tarifs")
	for (const tier of PRICING_TIERS) {
		out.push(
			"",
			`### ${tier.name} - à partir de ${tier.price}${tier.priceSuffix}`,
			tier.description,
			tier.benefitLine,
			`Paiement : ${tier.priceNote.replace(/•/g, "-")}`,
			"Inclus :",
			...tier.features.map((f) => `- ${f}`),
		)
	}

	out.push("", "## Zones d'intervention")
	for (const city of CITY_PAGES) {
		out.push(`- ${city.cityName} (${city.postalCode}) : ${BASE_URL}/${city.slug}`)
	}

	out.push("", "## Réalisations")
	for (const project of PROJECTS) {
		out.push(
			"",
			`### ${project.name} (${project.type})`,
			project.context,
			`${BASE_URL}/realisations/${project.slug}`,
		)
	}

	out.push("", "## Blog")
	for (const post of BLOG_POSTS) {
		out.push("", `### ${post.title}`, post.excerpt, `${BASE_URL}/blog/${post.slug}`)
	}

	out.push("", "## Questions fréquentes")
	for (const item of FAQ_ITEMS) {
		out.push("", `### ${item.question}`, item.answer)
	}

	out.push("", "## Contact", ...CONTACT, "")
	return out.join("\n")
}
