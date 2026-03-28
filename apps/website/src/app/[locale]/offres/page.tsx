import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { OffresContent } from "@/components/sections/offres-content"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.offres" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/offres"),
		keywords: [
			"tarif création site web artisan",
			"prix site vitrine Bretagne",
			"offre site web 990€",
			"devis site internet artisan",
			"forfait site web commerçant",
			"site web pas cher Bretagne",
			"refonte site internet prix",
			"maintenance site web 20€ mois",
			"site web 2 semaines",
			"site web 5 pages artisan",
			"création site web sur mesure Bretagne",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function OffresPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<main>
			<NextIntlClientProvider messages={pickMessages(messages, ["offres", "pricing"])}>
				<OffresContent />
			</NextIntlClientProvider>
		</main>
	)
}
