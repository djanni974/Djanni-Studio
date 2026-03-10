import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/sections/hero"
import { Realisations } from "@/components/sections/realisations"
import { SectionDivider } from "@/components/ui/section-divider"
import { FAQ_ITEMS } from "@/lib/constants"
import { getAlternates } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates(""),
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

const PourquoiMoi = dynamic(() =>
	import("@/components/sections/pourquoi-moi").then((m) => m.PourquoiMoi),
)
const Offres = dynamic(() => import("@/components/sections/offres").then((m) => m.Offres))
const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process))
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq))
const CtaContact = dynamic(() =>
	import("@/components/sections/cta-contact").then((m) => m.CtaContact),
)

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations({ locale })

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQ_ITEMS.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	}

	return (
		<main>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<Hero />
			<Realisations />
			<SectionDivider />
			<PourquoiMoi />
			<Offres />
			<Process />
			<p className="mx-auto max-w-[600px] px-5 py-10 text-center text-sm text-djanni-gray-light">
				{t("pricingNote")}
			</p>
			<Faq />
			<SectionDivider />
			<CtaContact />
		</main>
	)
}
