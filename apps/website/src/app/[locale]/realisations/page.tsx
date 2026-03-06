import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { RealisationsListContent } from "@/components/sections/realisations-list-content"

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
		<>
			<Navbar />
			<main>
				<RealisationsListContent />
			</main>
			<Footer />
		</>
	)
}
