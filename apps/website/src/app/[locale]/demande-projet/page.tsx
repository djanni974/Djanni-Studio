import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { ContactFaq } from "@/components/sections/contact-faq"
import { ProjectRequestForm } from "@/components/sections/project-request-form"
import { getAlternates, pickMessages } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "metadata.demandeProjet" })

	return {
		title: t("title"),
		description: t("description"),
		alternates: getAlternates("/demande-projet"),
		keywords: [
			"devis site web gratuit Bretagne",
			"demande création site internet artisan",
			"contact développeur web Dinard",
			"projet site web commerçant",
			"formulaire devis site vitrine",
			"commencer site web artisan",
			"réponse 24h création site web",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
		},
	}
}

export default async function DemandeProjetPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)
	const messages = await getMessages()

	return (
		<NextIntlClientProvider messages={pickMessages(messages, ["projectRequest", "contactFaq"])}>
			<main className="relative overflow-hidden">
				{/* Dot grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				{/* Top glow */}
				<div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

				<div className="relative px-5 pt-32 pb-20 md:px-12 md:pt-40">
					<ProjectRequestForm />
				</div>
				<ContactFaq />
			</main>
		</NextIntlClientProvider>
	)
}
