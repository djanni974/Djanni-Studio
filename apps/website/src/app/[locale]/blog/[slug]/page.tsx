import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { BlogPostContent } from "@/components/sections/blog-post-content"
import { BLOG_POSTS } from "@/lib/constants"
import { getAlternates } from "@/lib/metadata"

export function generateStaticParams() {
	return BLOG_POSTS.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = BLOG_POSTS.find((p) => p.slug === slug)
	if (!post) return {}

	return {
		title: `${post.title} — Blog Djanni Studio`,
		description: post.excerpt,
		alternates: getAlternates(`/blog/${slug}`),
		openGraph: {
			title: `${post.title} — Blog Djanni Studio`,
			description: post.excerpt,
			type: "article",
			publishedTime: post.publishedAt,
			authors: ["Gianni — Djanni Studio"],
		},
	}
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>
}) {
	const { slug, locale } = await params
	setRequestLocale(locale)
	const post = BLOG_POSTS.find((p) => p.slug === slug)
	if (!post) notFound()

	const blogPostJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		datePublished: post.publishedAt,
		author: {
			"@type": "Person",
			name: "Gianni",
			url: "https://www.djannistudio.fr/a-propos",
		},
		publisher: {
			"@type": "Organization",
			name: "Djanni Studio",
			url: "https://www.djannistudio.fr",
		},
		mainEntityOfPage: `https://www.djannistudio.fr/blog/${slug}`,
	}

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Accueil",
				item: "https://www.djannistudio.fr",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Blog",
				item: "https://www.djannistudio.fr/blog",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title,
				item: `https://www.djannistudio.fr/blog/${slug}`,
			},
		],
	}

	return (
		<main>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<BlogPostContent post={post} />
		</main>
	)
}
