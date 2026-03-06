import dynamic from "next/dynamic"
import { setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/sections/hero"
import { Realisations } from "@/components/sections/realisations"
import { SectionDivider } from "@/components/ui/section-divider"

const Offres = dynamic(() => import("@/components/sections/offres").then((m) => m.Offres))
const PourquoiMoi = dynamic(() =>
	import("@/components/sections/pourquoi-moi").then((m) => m.PourquoiMoi),
)
const Temoignages = dynamic(() =>
	import("@/components/sections/temoignages").then((m) => m.Temoignages),
)
const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process))
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq))
const ContactForm = dynamic(() =>
	import("@/components/sections/contact-form").then((m) => m.ContactForm),
)

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<Realisations />
				<SectionDivider />
				<Offres />
				<PourquoiMoi />
				<Temoignages />
				<Process />
				<SectionDivider />
				<Faq />
				<SectionDivider />
				<ContactForm />
			</main>
			<Footer />
		</>
	)
}
