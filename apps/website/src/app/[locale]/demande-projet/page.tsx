import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { ProjectRequestForm } from "@/components/sections/project-request-form"

export const metadata: Metadata = {
	title: "Demande de projet — Djanni Studio",
	description:
		"Décrivez votre projet web et recevez une réponse sous 24h. Formulaire simple et rapide.",
}

export default async function DemandeProjetPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<main className="px-5 pt-32 pb-20 md:px-12">
			<ProjectRequestForm />
		</main>
	)
}
