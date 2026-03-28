import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { AvisContent } from "@/components/sections/avis-content"
import { pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.avis" })

	return {
		title: t("title"),
		description: t("description"),
		robots: { index: false, follow: false },
	}
}

export default async function AvisPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<main>
			<NextIntlClientProvider messages={pickMessages(messages, ["avisPage"])}>
				<AvisContent />
			</NextIntlClientProvider>
		</main>
	)
}
