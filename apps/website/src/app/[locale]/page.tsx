import dynamic from "next/dynamic"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/sections/hero"
import { Realisations } from "@/components/sections/realisations"
import { SectionDivider } from "@/components/ui/section-divider"

const Offres = dynamic(() => import("@/components/sections/offres").then((m) => m.Offres))
const PourquoiMoi = dynamic(() =>
	import("@/components/sections/pourquoi-moi").then((m) => m.PourquoiMoi),
)
const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process))
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq))
const CtaContact = dynamic(() =>
	import("@/components/sections/cta-contact").then((m) => m.CtaContact),
)

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<main>
			<Hero />
			<Realisations />
			<SectionDivider />
			<Offres />
			<PourquoiMoi />
			<Process />
			<SectionDivider />
			<Faq />
			<SectionDivider />
			<CtaContact />
		</main>
	)
}
