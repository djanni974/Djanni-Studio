import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { AboutContent } from "@/components/sections/about-content"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.about" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/a-propos"),
		keywords: [
			"développeur web freelance Dinard",
			"Gianni Djanni Studio",
			"charpentier devenu développeur web",
			"créateur site web artisan Bretagne",
			"développeur web Saint-Malo",
			"web designer indépendant Bretagne",
			"reconversion développeur web",
			"freelance web Côte d'Émeraude",
			"site web sur mesure artisan",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<main>
			<NextIntlClientProvider messages={pickMessages(messages, ["about"])}>
				<AboutContent />
			</NextIntlClientProvider>
		</main>
	)
}
