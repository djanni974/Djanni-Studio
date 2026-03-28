import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { BlogListContent } from "@/components/sections/blog-list-content"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.blog" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/blog"),
		keywords: [
			"blog site web artisan",
			"conseils création site internet commerçant",
			"SEO local Bretagne artisan",
			"performance web Lighthouse",
			"guide site web TPE",
			"stratégie digitale artisan",
			"site web qui charge vite",
			"référencement local Bretagne",
			"combien coûte un site web",
			"site web vs réseaux sociaux",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<main>
			<NextIntlClientProvider messages={pickMessages(messages, ["blogPage"])}>
				<BlogListContent />
			</NextIntlClientProvider>
		</main>
	)
}
