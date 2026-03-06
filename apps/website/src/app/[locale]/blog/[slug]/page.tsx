import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { BlogPostContent } from "@/components/sections/blog-post-content"
import { BLOG_POSTS } from "@/lib/constants"

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

	return (
		<>
			<Navbar />
			<main>
				<BlogPostContent post={post} />
			</main>
			<Footer />
		</>
	)
}
