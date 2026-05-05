import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Viewport } from "next"
import { DM_Sans, Syne } from "next/font/google"
import { getLocale } from "next-intl/server"
import { PlausibleScript } from "@/components/analytics/plausible-script"
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/seo/json-ld"
import { siteJsonLd } from "@/lib/json-ld"
import { getRootMetadata } from "@/lib/metadata"
import "./globals.css"

const syne = Syne({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
})

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
})

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: "#e8500a",
}

export const generateMetadata = getRootMetadata

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale()

	return (
		<html lang={locale} suppressHydrationWarning className={`${syne.variable} ${dmSans.variable}`}>
			<body className="overflow-x-clip antialiased" suppressHydrationWarning>
				<PlausibleScript />
				<JsonLd data={siteJsonLd} />
				<Providers>{children}</Providers>
				<SpeedInsights />
			</body>
		</html>
	)
}
