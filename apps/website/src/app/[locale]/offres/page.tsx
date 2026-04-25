import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { OffresContent } from "@/components/sections/offres-content"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.offres" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/offres"),
		keywords: [
			"tarif création site web artisan",
			"prix site vitrine Bretagne",
			"offre site web 990€",
			"devis site internet artisan",
			"forfait site web commerçant",
			"site web pas cher Bretagne",
			"refonte site internet prix",
			"maintenance site web 20€ mois",
			"site web 2 semaines",
			"site web 5 pages artisan",
			"création site web sur mesure Bretagne",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function OffresPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const [messages, bc, offresT] = await Promise.all([
		getMessages(),
		getTranslations({ locale, namespace: "breadcrumb" }),
		getTranslations({ locale, namespace: "offres" }),
	])

	const faqItems = offresT.raw("pricingFaq.items") as { question: string; answer: string }[]
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

	return (
		<main className="relative">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<div className="absolute top-20 left-0 z-10 w-full px-5 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<Breadcrumb
						items={[
							{ label: bc("home"), href: "/" },
							{ label: bc("offres"), href: "/offres" },
						]}
					/>
				</div>
			</div>
			<NextIntlClientProvider messages={pickMessages(messages, ["offres", "pricing", "legal"])}>
				<OffresContent />
			</NextIntlClientProvider>
		</main>
	)
}
