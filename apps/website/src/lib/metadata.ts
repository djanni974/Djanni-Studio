import type { Metadata } from "next"
import type { Messages } from "next-intl"

export function pickMessages(messages: Messages, keys: string[]) {
	return Object.fromEntries(
		keys.filter((k) => k in messages).map((k) => [k, messages[k as keyof Messages]]),
	) as Messages
}

const BASE_URL = "https://www.djannistudio.fr"
const locales = ["fr", "en", "br"] as const
const defaultLocale = "fr"

function localizedPath(path: string, locale: string) {
	if (locale === defaultLocale) return path || "/"
	return `/${locale}${path}`
}

export function getAlternates(path: string, locale: string = defaultLocale) {
	const languages: Record<string, string> = {}
	for (const loc of locales) {
		languages[loc] = `${BASE_URL}${localizedPath(path, loc)}`
	}
	languages["x-default"] = `${BASE_URL}${localizedPath(path, defaultLocale)}`

	return {
		canonical: `${BASE_URL}${localizedPath(path, locale)}`,
		languages,
	}
}

// Image OG dynamique (opengraph-image.tsx) pour la locale. URL alignee sur
// localizedPath : sans prefixe pour fr (defaut), prefixee pour en/br.
export function getOgImage(locale: string) {
	return [
		{
			url: `${BASE_URL}${localizedPath("/opengraph-image", locale)}`,
			width: 1200,
			height: 630,
			alt: "Djanni Studio",
		},
	]
}

const SITE_TITLE = "Djanni Studio - Sites web pour artisans & commerçants"
const SITE_DESCRIPTION =
	"Je crée des sites modernes pour les artisans et commerçants locaux. Pas de jargon, pas de surprises - un site qui vous ressemble et ramène des clients."
const OG_DESCRIPTION =
	"Ancien charpentier devenu développeur web. Je crée des sites modernes pour les artisans et commerçants à Dinard, Saint-Malo et toute la Côte d'Émeraude."
const KEYWORDS = [
	"création site web Bretagne",
	"développeur web freelance Bretagne",
	"site web artisan",
	"site vitrine artisan",
	"site web commerçant",
	"agence web Dinard",
	"développeur web Dinard",
	"site web Saint-Malo",
	"site web Côte d'Émeraude",
	"création site internet TPE PME",
	"refonte site web",
	"site web pas cher artisan",
	"freelance web Bretagne",
	"site responsive artisan",
	"devis site web gratuit",
]

export function getRootMetadata(): Metadata {
	return {
		metadataBase: new URL(BASE_URL),
		alternates: getAlternates(""),
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		keywords: KEYWORDS,
		authors: [{ name: "Gianni - Djanni Studio" }],
		creator: "Djanni Studio",
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		openGraph: {
			title: SITE_TITLE,
			description: OG_DESCRIPTION,
			url: BASE_URL,
			siteName: "Djanni Studio",
			type: "website",
			locale: "fr_FR",
		},
		twitter: {
			card: "summary_large_image",
			title: SITE_TITLE,
			description: "Sites web pour artisans et commerçants en Bretagne",
		},
		icons: {
			icon: [
				{ url: "/favicon.svg", type: "image/svg+xml" },
				{ url: "/favicon.ico", sizes: "32x32" },
			],
			apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
		},
		manifest: "/manifest.json",
		appleWebApp: {
			capable: true,
			statusBarStyle: "black-translucent",
			title: "Djanni Studio",
		},
	}
}
