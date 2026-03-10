import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { OffresContent } from "@/components/sections/offres-content"
import { getAlternates } from "@/lib/metadata"

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
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function OffresPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<main>
			<OffresContent />
		</main>
	)
}
