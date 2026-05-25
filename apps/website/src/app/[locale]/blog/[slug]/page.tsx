import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { BlogPostContent } from "@/components/sections/blog-post-content"
import { JsonLd } from "@/components/seo/json-ld"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { BLOG_POSTS } from "@/lib/constants"
import { blogPostingSchema, breadcrumbSchema } from "@/lib/json-ld"
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
	const { slug, locale } = await params
	const post = BLOG_POSTS.find((p) => p.slug === slug)
	if (!post) return {}

	return {
		title: `${post.title} - Blog Djanni Studio`,
		description: post.excerpt,
		alternates: getAlternates(`/blog/${slug}`, locale),
		openGraph: {
			title: `${post.title} - Blog Djanni Studio`,
			description: post.excerpt,
			type: "article",
			publishedTime: post.publishedAt,
			authors: ["Gianni - Djanni Studio"],
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

	const trail = [
		{ name: bc("home"), path: "/" },
		{ name: bc("blog"), path: "/blog" },
		{ name: post.title, path: `/blog/${slug}` },
	]

	return (
		<main className="relative">
			<JsonLd data={blogPostingSchema(post)} />
			<JsonLd data={breadcrumbSchema(trail)} />
			<div className="absolute top-20 left-0 z-10 w-full px-5 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<Breadcrumb items={trail.map((t) => ({ label: t.name, href: t.path }))} />
				</div>
			</div>
			<NextIntlClientProvider messages={pickMessages(messages, ["blogPost"])}>
				<BlogPostContent post={post} prevPost={prevPost} nextPost={nextPost} />
			</NextIntlClientProvider>
		</main>
	)
}
