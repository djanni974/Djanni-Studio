export const revalidate = 3600

import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { FloatingCta } from "@/components/ui/floating-cta"
import { routing } from "@/i18n/routing"
import { pickMessages } from "@/lib/metadata"

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale as "fr" | "en" | "br")) {
		notFound()
	}

	setRequestLocale(locale)

	const [messages, t] = await Promise.all([
		import(`../../messages/${locale}.json`).then((m) => m.default),
		getTranslations("nav"),
	])

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={pickMessages(messages, ["nav", "footer", "notFound"])}
		>
			<a
				href="#main"
				className="fixed top-4 left-4 z-100 -translate-y-20 rounded-lg bg-djanni-orange px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
			>
				{t("skipToContent")}
			</a>
			<Navbar />
			{children}
			<Footer />
			<FloatingCta />
		</NextIntlClientProvider>
	)
}
