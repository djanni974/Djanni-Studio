import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/demande-projet"],
		},
		sitemap: "https://www.djannistudio.fr/sitemap.xml",
	}
}
