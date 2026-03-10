import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ProjectRequestForm } from "@/components/sections/project-request-form"
import { getAlternates } from "@/lib/metadata"

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

	return (
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
		</main>
	)
}
