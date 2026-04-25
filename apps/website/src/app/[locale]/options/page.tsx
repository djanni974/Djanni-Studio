import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { OptionsContent } from "@/components/sections/options-content"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.options" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/options"),
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function OptionsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
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
							{ label: bc("offres"), href: "/offres" },
							{ label: bc("options"), href: "/options" },
						]}
					/>
				</div>
			</div>
			<NextIntlClientProvider messages={pickMessages(messages, ["options", "legal"])}>
				<OptionsContent />
			</NextIntlClientProvider>
		</main>
	)
}
