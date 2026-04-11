"use client"

import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { BrowserMockup } from "@/components/ui/browser-mockup"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { PROJECTS } from "@/lib/constants"

export function RealisationsListContent() {
	const t = useTranslations("realisationsPage")
	const nav = useTranslations("nav")
	const [activeFilter, setActiveFilter] = useState<string | null>(null)

	const categories = useMemo(() => {
		const types = PROJECTS.map((p) => {
			const parts = p.type.split("—")
			return parts.length > 1 ? parts[1].trim() : p.type
		})
		return [...new Set(types)]
	}, [])

	const filtered = activeFilter ? PROJECTS.filter((p) => p.type.includes(activeFilter)) : PROJECTS

	return (
		<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-28 md:px-12 md:pt-40">
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<div className="relative mx-auto max-w-[1200px]">
				<AnimatedSection>
					<SectionHeader
						as="h1"
						tag={t("tag")}
						title={t("title")}
						subtitle={t("subtitle")}
						align="center"
					/>
				</AnimatedSection>

				<AnimatedSection delay={0.1}>
					<p className="mx-auto mt-8 max-w-[700px] text-center text-[15px] leading-relaxed text-djanni-gray-light">
						{t("intro")}{" "}
						<Link
							href="/offres"
							className="font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
						>
							{t("ctaIntro")}
						</Link>
					</p>
				</AnimatedSection>

				{/* Filters */}
				<AnimatedSection delay={0.15}>
					<div className="mt-10 flex flex-wrap justify-center gap-2">
						<button
							type="button"
							onClick={() => setActiveFilter(null)}
							className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
								activeFilter === null
									? "border-djanni-orange bg-djanni-orange/10 font-medium text-djanni-orange"
									: "border-border text-djanni-gray-light hover:border-djanni-orange/30 hover:text-foreground"
							}`}
						>
							{t("filterAll")}
						</button>
						{categories.map((cat) => (
							<button
								key={cat}
								type="button"
								onClick={() => setActiveFilter(cat)}
								className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
									activeFilter === cat
										? "border-djanni-orange bg-djanni-orange/10 font-medium text-djanni-orange"
										: "border-border text-djanni-gray-light hover:border-djanni-orange/30 hover:text-foreground"
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</AnimatedSection>

				<StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filtered.map((project) => (
						<StaggerItem key={project.slug}>
							<Link
								href={`/realisations/${project.slug}`}
								className="group block overflow-hidden rounded-xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
							>
								<div className="relative flex aspect-video items-center justify-center overflow-hidden bg-linear-to-br from-[#161614] to-[#1e1e1c] p-8">
									<div
										className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-[60px]"
										style={{ background: project.accentColor }}
									/>
									{project.image ? (
										<BrowserMockup className="h-[85%] w-[92%]" noPadding>
											<div className="relative h-full w-full">
												<Image
													src={project.image}
													alt={project.name}
													fill
													className="object-cover object-top"
													sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
												/>
											</div>
										</BrowserMockup>
									) : (
										<div
											className="flex h-20 w-20 items-center justify-center rounded-2xl font-heading text-3xl font-extrabold text-white"
											style={{
												background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
											}}
										>
											{project.logoText}
										</div>
									)}
								</div>

								<div className="flex items-center justify-between border-t border-border px-5 py-4">
									<div>
										<div className="font-heading text-base font-bold">{project.name}</div>
										<div className="mt-0.5 text-sm text-djanni-gray">{project.type}</div>
										<div className="mt-1.5 text-xs text-djanni-gray-light">
											{project.location} &middot; {project.year}
										</div>
									</div>
									<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
										<IconArrowRight size={15} />
									</div>
								</div>
							</Link>
						</StaggerItem>
					))}
				</StaggerContainer>

				<AnimatedSection delay={0.3}>
					<div className="mt-16 text-center">
						<Link
							href="/demande-projet"
							className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
						>
							{nav("cta")}
							<IconArrowRight size={16} />
						</Link>
					</div>
				</AnimatedSection>
			</div>
		</section>
	)
}
