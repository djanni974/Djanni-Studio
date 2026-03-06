import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
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
			{children}
			<FloatingCta />
		</NextIntlClientProvider>
	)
}
