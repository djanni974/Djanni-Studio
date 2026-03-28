import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { CaseStudyContent } from "@/components/sections/case-study-content"
import { PROJECTS } from "@/lib/constants"
import { getAlternates, pickMessages } from "@/lib/metadata"

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
		alternates: getAlternates(`/realisations/${slug}`),
		openGraph: {
			title: `${project.name} — Djanni Studio`,
			description: project.context.slice(0, 160),
			images: [
				{
					url: project.image || "/og-image.png",
					width: 1200,
					height: 630,
					alt: project.name,
				},
			],
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
	const [bc, messages] = await Promise.all([
		getTranslations({ locale, namespace: "breadcrumb" }),
		getMessages(),
	])
	const project = PROJECTS.find((p) => p.slug === slug)
	if (!project) notFound()

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: bc("home"),
				item: "https://www.djannistudio.fr",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: bc("realisations"),
				item: "https://www.djannistudio.fr/realisations",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: project.name,
				item: `https://www.djannistudio.fr/realisations/${slug}`,
			},
		],
	}

	return (
		<main id="main">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<NextIntlClientProvider messages={pickMessages(messages, ["caseStudy"])}>
				<CaseStudyContent project={project} />
			</NextIntlClientProvider>
		</main>
	)
}
