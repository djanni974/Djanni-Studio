import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { RealisationsListContent } from "@/components/sections/realisations-list-content"
import { getAlternates } from "@/lib/metadata"

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

	return (
		<main>
			<RealisationsListContent />
		</main>
	)
}
