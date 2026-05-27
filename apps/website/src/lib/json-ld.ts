import { type BlogPost, PRICING_TIERS } from "@/lib/constants"

const SITE_URL = "https://www.djannistudio.fr"

export const siteJsonLd = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: "Djanni Studio",
	description: "Création de sites web sur mesure pour artisans et commerçants en Bretagne",
	url: SITE_URL,
	email: "contact@djannistudio.fr",
	telephone: "+33749547498",
	image: `${SITE_URL}/og-image.png`,
	address: {
		"@type": "PostalAddress",
		streetAddress: "4 boulevard Jules Verger",
		addressLocality: "Dinard",
		postalCode: "35800",
		addressRegion: "Bretagne",
		addressCountry: "FR",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 48.6328,
		longitude: -2.0688,
	},
	priceRange: "990€ - 1990€+",
	areaServed: [
		{ "@type": "City", name: "Dinard" },
		{ "@type": "City", name: "Saint-Malo" },
		{ "@type": "City", name: "Dinan" },
		{ "@type": "City", name: "Cancale" },
	],
	knowsAbout: [
		"Création de sites web",
		"Refonte de sites internet",
		"Optimisation SEO",
		"Développement web",
	],
	knowsLanguage: ["fr", "en", "br"],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Formules de création de site web",
		itemListElement: PRICING_TIERS.map((tier) => ({
			"@type": "Offer",
			name: tier.name,
			description: tier.description,
			price: tier.price.replace(/\s/g, ""),
			priceCurrency: "EUR",
		})),
	},
	founder: {
		"@type": "Person",
		name: "Gianni Jardin",
		jobTitle: "Développeur web freelance",
		description: "Ancien charpentier devenu développeur web, basé à Dinard.",
	},
}

export type BreadcrumbItem = {
	name: string
	path: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`,
		})),
	}
}

export function blogPostingSchema(post: BlogPost) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		datePublished: post.publishedAt,
		author: {
			"@type": "Person",
			name: "Gianni Jardin",
			url: `${SITE_URL}/a-propos`,
		},
		publisher: {
			"@type": "Organization",
			name: "Djanni Studio",
			url: SITE_URL,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/og-image.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}/blog/${post.slug}`,
		},
		image: `${SITE_URL}/og-image.png`,
		articleSection: post.category,
	}
}

export function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Djanni Studio",
		url: SITE_URL,
		inLanguage: ["fr", "en", "br"],
		publisher: {
			"@type": "Organization",
			name: "Djanni Studio",
			url: SITE_URL,
		},
	}
}
