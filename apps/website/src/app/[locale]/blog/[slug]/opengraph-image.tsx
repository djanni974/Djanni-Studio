import { getTranslations } from "next-intl/server"
import { BLOG_POSTS } from "@/lib/constants"
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Djanni Studio - Blog"

export default async function Image({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>
}) {
	const { locale, slug } = await params
	const post = BLOG_POSTS.find((p) => p.slug === slug)
	const t = await getTranslations({ locale, namespace: "nav" })

	return renderOgImage({
		eyebrow: t("blog").toUpperCase(),
		title: post?.title ?? "Blog",
		subtitle: post?.excerpt,
	})
}
