import type { MetadataRoute } from "next"
import { BLOG_POSTS, PROJECTS } from "@/lib/constants"

const locales = ["fr", "en", "br"] as const
const defaultLocale = "fr"

function localizedUrl(baseUrl: string, path: string, locale: string) {
	if (locale === defaultLocale) return `${baseUrl}${path}`
	return `${baseUrl}/${locale}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.djannistudio.fr"

	const entries: MetadataRoute.Sitemap = []

	// Static pages
	const staticPages = [
		{ path: "", changeFrequency: "monthly" as const, priority: 1 },
		{ path: "/offres", changeFrequency: "monthly" as const, priority: 0.9 },
		{ path: "/realisations", changeFrequency: "monthly" as const, priority: 0.9 },
		{ path: "/a-propos", changeFrequency: "monthly" as const, priority: 0.8 },
		{ path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
		{ path: "/demande-projet", changeFrequency: "monthly" as const, priority: 0.8 },
		{ path: "/mentions-legales", changeFrequency: "yearly" as const, priority: 0.3 },
		{ path: "/cgv", changeFrequency: "yearly" as const, priority: 0.3 },
		{ path: "/politique-de-confidentialite", changeFrequency: "yearly" as const, priority: 0.3 },
		{ path: "/plan-du-site", changeFrequency: "monthly" as const, priority: 0.3 },
	]

	for (const page of staticPages) {
		for (const locale of locales) {
			entries.push({
				url: localizedUrl(baseUrl, page.path, locale),
				lastModified: new Date(),
				changeFrequency: page.changeFrequency,
				priority: page.priority,
			})
		}
	}

	// Project pages
	for (const project of PROJECTS) {
		for (const locale of locales) {
			entries.push({
				url: localizedUrl(baseUrl, `/realisations/${project.slug}`, locale),
				lastModified: new Date(),
				changeFrequency: "monthly",
				priority: 0.7,
			})
		}
	}

	// Blog posts
	for (const post of BLOG_POSTS) {
		for (const locale of locales) {
			entries.push({
				url: localizedUrl(baseUrl, `/blog/${post.slug}`, locale),
				lastModified: new Date(post.publishedAt),
				changeFrequency: "monthly",
				priority: 0.7,
			})
		}
	}

	return entries
}
