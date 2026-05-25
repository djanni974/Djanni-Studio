import type { MetadataRoute } from "next"

const DISALLOW = ["/api/", "/demande-projet"]

// Politique crawlers IA : on AUTORISE explicitement les bots des moteurs generatifs.
// Djanni Studio est un site d'acquisition - etre cite par ChatGPT, Claude, Perplexity et
// les AI Overviews Google est un canal de visibilite recherche, pas une menace.
const AI_BOTS = [
	"GPTBot",
	"OAI-SearchBot",
	"ChatGPT-User",
	"ClaudeBot",
	"Claude-Web",
	"anthropic-ai",
	"PerplexityBot",
	"Perplexity-User",
	"Google-Extended",
	"Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: "*", allow: "/", disallow: DISALLOW },
			...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
		],
		sitemap: "https://www.djannistudio.fr/sitemap.xml",
		host: "https://www.djannistudio.fr",
	}
}
