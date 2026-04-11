import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { CityLandingContent } from "@/components/sections/city-landing-content"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { CITY_PAGES } from "@/lib/constants"
import { getAlternates, pickMessages } from "@/lib/metadata"

export const dynamicParams = false

export function generateStaticParams() {
	return CITY_PAGES.map((city) => ({ citySlug: city.slug }))
}

function getCityBySlug(slug: string) {
	return CITY_PAGES.find((c) => c.slug === slug)
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; citySlug: string }>
}): Promise<Metadata> {
	const { locale, citySlug } = await params
	const city = getCityBySlug(citySlug)
	if (!city) return {}

	const t = await getTranslations({ locale, namespace: `metadata.cityPages.${city.cityKey}` })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates(`/${city.slug}`),
		keywords: [
			`création site web ${city.cityName}`,
			`développeur web ${city.cityName}`,
			`site internet ${city.cityName}`,
			`site vitrine ${city.cityName}`,
			`agence web ${city.cityName}`,
			`site web artisan ${city.cityName}`,
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function CityPage({
	params,
}: {
	params: Promise<{ locale: string; citySlug: string }>
}) {
	const { locale, citySlug } = await params
	const city = getCityBySlug(citySlug)
	if (!city) notFound()

	setRequestLocale(locale)
	const [messages, bc, cityT] = await Promise.all([
		getMessages(),
		getTranslations({ locale, namespace: "breadcrumb" }),
		getTranslations({ locale, namespace: "cityPages" }),
	])

	const faqItems = cityT.raw(`${city.cityKey}.faq.items`) as {
		question: string
		answer: string
	}[]

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqItems.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	}

	const localBusinessJsonLd = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "Djanni Studio",
		description: `Création de sites web pour artisans et commerçants à ${city.cityName}`,
		url: `https://www.djannistudio.fr/${city.slug}`,
		telephone: "+33749547498",
		email: "contact@djannistudio.fr",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Dinard",
			postalCode: "35800",
			addressCountry: "FR",
		},
		areaServed: {
			"@type": "City",
			name: city.cityName,
			postalCode: city.postalCode,
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: city.latitude,
			longitude: city.longitude,
		},
		priceRange: "990€ - 1990€+",
	}

	const breadcrumbKey = `city${city.cityKey.charAt(0).toUpperCase()}${city.cityKey.slice(1)}` as
		| "citySaintMalo"
		| "cityDinan"
		| "cityDinard"

	return (
		<main className="relative">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
			/>
			<div className="absolute top-20 left-0 z-10 w-full px-5 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<Breadcrumb
						items={[
							{ label: bc("home"), href: "/" },
							{ label: bc(breadcrumbKey), href: `/${city.slug}` },
						]}
					/>
				</div>
			</div>
			<NextIntlClientProvider
				messages={pickMessages(messages, ["cityPages", "offres", "pricing", "ctaContact"])}
			>
				<CityLandingContent cityKey={city.cityKey} />
			</NextIntlClientProvider>
		</main>
	)
}
