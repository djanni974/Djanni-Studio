import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { BlogPostContent } from "@/components/sections/blog-post-content"
import { BLOG_POSTS } from "@/lib/constants"
import { getAlternates, pickMessages } from "@/lib/metadata"

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
			images: [
				{
					url: "/og-image.png",
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
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
	const [bc, messages] = await Promise.all([
		getTranslations({ locale, namespace: "breadcrumb" }),
		getMessages(),
	])
	const sortedPosts = [...BLOG_POSTS].sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	)
	const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
	if (postIndex === -1) notFound()
	const post = sortedPosts[postIndex]
	const prevPost = postIndex < sortedPosts.length - 1 ? sortedPosts[postIndex + 1] : null
	const nextPost = postIndex > 0 ? sortedPosts[postIndex - 1] : null

	const blogPostJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		datePublished: post.publishedAt,
		author: {
			"@type": "Person",
			name: "Gianni Jardin",
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
				name: bc("home"),
				item: "https://www.djannistudio.fr",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: bc("blog"),
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
			<NextIntlClientProvider messages={pickMessages(messages, ["blogPost"])}>
				<BlogPostContent post={post} prevPost={prevPost} nextPost={nextPost} />
			</NextIntlClientProvider>
		</main>
	)
}
