import type { Metadata, Viewport } from "next"
import { DM_Sans, Syne } from "next/font/google"
import Script from "next/script"
import { getLocale } from "next-intl/server"
import { Providers } from "@/components/providers"
import { getAlternates } from "@/lib/metadata"
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

export async function generateMetadata(): Promise<Metadata> {
	return {
		metadataBase: new URL("https://www.djannistudio.fr"),
		alternates: getAlternates(""),
		title: "Djanni Studio — Sites web pour artisans & commerçants",
		description:
			"Je crée des sites modernes pour les artisans et commerçants locaux. Pas de jargon, pas de surprises — un site qui vous ressemble et ramène des clients.",
		keywords: [
			"création site web Bretagne",
			"développeur web freelance Bretagne",
			"site web artisan",
			"site vitrine artisan",
			"site web commerçant",
			"agence web Dinard",
			"développeur web Dinard",
			"site web Saint-Malo",
			"site web Côte d'Émeraude",
			"création site internet TPE PME",
			"refonte site web",
			"site web pas cher artisan",
			"freelance web Bretagne",
			"site responsive artisan",
			"devis site web gratuit",
		],
		authors: [{ name: "Gianni — Djanni Studio" }],
		creator: "Djanni Studio",
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		openGraph: {
			title: "Djanni Studio — Sites web pour artisans & commerçants",
			description:
				"Je crée des sites modernes pour les artisans et commerçants locaux. Pas de jargon, pas de surprises — un site qui vous ressemble et ramène des clients.",
			url: "https://www.djannistudio.fr",
			siteName: "Djanni Studio",
			type: "website",
			locale: "fr_FR",
			images: [
				{
					url: "/og-image.png",
					width: 1200,
					height: 630,
					alt: "Djanni Studio — Sites web pour artisans & commerçants",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Djanni Studio — Sites web pour artisans & commerçants",
			description:
				"Je crée des sites modernes pour les artisans et commerçants locaux. Pas de jargon, pas de surprises — un site qui vous ressemble et ramène des clients.",
			images: ["/og-image.png"],
		},
		icons: {
			icon: "/favicon.svg",
			apple: "/icons/icon-192.svg",
		},
		manifest: "/manifest.json",
		appleWebApp: {
			capable: true,
			statusBarStyle: "black-translucent",
			title: "Djanni Studio",
		},
	}
}

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: "Djanni Studio",
	description: "Création de sites web sur mesure pour artisans et commerçants en Bretagne",
	url: "https://www.djannistudio.fr",
	email: "contact@djannistudio.fr",
	telephone: "+33749547498",
	image: "https://www.djannistudio.fr/og-image.png",
	address: {
		"@type": "PostalAddress",
		streetAddress: "4 boulevard Jules Verger",
		addressLocality: "Dinard",
		postalCode: "35800",
		addressRegion: "Bretagne",
		addressCountry: "FR",
	},
	priceRange: "€€",
	areaServed: {
		"@type": "Place",
		name: "Bretagne",
	},
	serviceType: [
		"Création de sites web",
		"Refonte de sites internet",
		"Optimisation SEO",
		"Développement web",
	],
	knowsLanguage: ["fr", "en", "br"],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale()

	return (
		<html lang={locale} suppressHydrationWarning className={`${syne.variable} ${dmSans.variable}`}>
			<body className="overflow-x-clip antialiased" suppressHydrationWarning>
				<Script
					async
					defer
					data-domain="djannistudio.fr"
					data-api="/api/event"
					src="/js/script.js"
					strategy="afterInteractive"
				/>
				<Script id="plausible-init" strategy="afterInteractive">
					{`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
				</Script>
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=AW-18045871071"
					strategy="afterInteractive"
				/>
				<Script id="google-ads" strategy="afterInteractive">
					{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','AW-18045871071');`}
				</Script>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
