import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { FloatingCta } from "@/components/ui/floating-cta"
import { routing } from "@/i18n/routing"

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

	const messages = (await import(`../../messages/${locale}.json`)).default

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<a
				href="#main"
				className="fixed top-4 left-4 z-100 -translate-y-20 rounded-lg bg-djanni-orange px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
			>
				Skip to content
			</a>
			<Navbar />
			{children}
			<Footer />
			<FloatingCta />
		</NextIntlClientProvider>
	)
}
