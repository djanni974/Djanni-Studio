import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { CaseStudyContent } from "@/components/sections/case-study-content"
import { Breadcrumb } from "@/components/ui/breadcrumb"
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

	return (
		<main id="main" className="relative">
			<div className="absolute top-20 left-0 z-10 w-full px-5 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<Breadcrumb
						items={[
							{ label: bc("home"), href: "/" },
							{ label: bc("realisations"), href: "/realisations" },
							{ label: project.name, href: `/realisations/${slug}` },
						]}
					/>
				</div>
			</div>
			<NextIntlClientProvider messages={pickMessages(messages, ["caseStudy"])}>
				<CaseStudyContent project={project} />
			</NextIntlClientProvider>
		</main>
	)
}
