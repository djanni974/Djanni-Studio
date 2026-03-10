const BASE_URL = "https://www.djannistudio.fr"
const locales = ["fr", "en", "br"] as const
const defaultLocale = "fr"

function localizedPath(path: string, locale: string) {
	if (locale === defaultLocale) return path || "/"
	return `/${locale}${path}`
}

export function getAlternates(path: string) {
	const languages: Record<string, string> = {}
	for (const locale of locales) {
		languages[locale] = `${BASE_URL}${localizedPath(path, locale)}`
	}
	languages["x-default"] = `${BASE_URL}${localizedPath(path, defaultLocale)}`

	return {
		canonical: `${BASE_URL}${path || "/"}`,
		languages,
	}
}
