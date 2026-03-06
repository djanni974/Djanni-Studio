import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { CaseStudyContent } from "@/components/sections/case-study-content"
import { PROJECTS } from "@/lib/constants"

export function generateStaticParams() {
	return PROJECTS.map((project) => ({
		slug: project.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const project = PROJECTS.find((p) => p.slug === slug)
	if (!project) return {}

	return {
		title: `${project.name} — Djanni Studio`,
		description: project.context.slice(0, 160),
		openGraph: {
			title: `${project.name} — Djanni Studio`,
			description: project.context.slice(0, 160),
		},
	}
}

export default async function CaseStudyPage({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>
}) {
	const { slug, locale } = await params
	setRequestLocale(locale)
	const project = PROJECTS.find((p) => p.slug === slug)
	if (!project) notFound()

	return (
		<>
			<Navbar />
			<main>
				<CaseStudyContent project={project} />
			</main>
			<Footer />
		</>
	)
}
