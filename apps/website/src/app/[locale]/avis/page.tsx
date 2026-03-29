import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { AvisContent } from "@/components/sections/avis-content"
import { Breadcrumb } from "@/components/ui/breadcrumb"
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
	const [messages, bc] = await Promise.all([
		getMessages(),
		getTranslations({ locale, namespace: "breadcrumb" }),
	])

	return (
		<main className="relative">
			<div className="absolute top-20 left-0 z-10 w-full px-5 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<Breadcrumb
						items={[
							{ label: bc("home"), href: "/" },
							{ label: bc("avis"), href: "/avis" },
						]}
					/>
				</div>
			</div>
			<NextIntlClientProvider messages={pickMessages(messages, ["avisPage"])}>
				<AvisContent />
			</NextIntlClientProvider>
		</main>
	)
}
