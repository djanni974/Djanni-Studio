import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { RealisationsListContent } from "@/components/sections/realisations-list-content"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.realisations" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/realisations"),
		keywords: [
			"portfolio site web artisan Bretagne",
			"réalisations web Dinard",
			"exemples sites vitrine artisan",
			"site web restaurant Bretagne",
			"site web dépôt-vente",
			"site web local Saint-Malo",
			"étude de cas création site web",
			"avant après refonte site",
			"site web Lighthouse 99",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function RealisationsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<main>
			<NextIntlClientProvider messages={pickMessages(messages, ["realisationsPage", "nav"])}>
				<RealisationsListContent />
			</NextIntlClientProvider>
		</main>
	)
}
