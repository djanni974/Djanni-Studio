"use client"

import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { BrowserMockup } from "@/components/ui/browser-mockup"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { PROJECTS } from "@/lib/constants"

export function RealisationsListContent() {
	const t = useTranslations("realisationsPage")
	const nav = useTranslations("nav")

	return (
		<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-28 md:px-12 md:pt-40">
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<div className="relative mx-auto max-w-[1100px]">
				<AnimatedSection>
					<SectionHeader
						tag={t("tag")}
						title={t("title")}
						subtitle={t("subtitle")}
						align="center"
					/>
				</AnimatedSection>

				<StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2">
					{PROJECTS.map((project) => (
						<StaggerItem key={project.slug}>
							<Link
								href={`/realisations/${project.slug}`}
								className="group block overflow-hidden rounded-xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
							>
								<div className="relative flex aspect-video items-center justify-center overflow-hidden bg-linear-to-br from-[#161614] to-[#1e1e1c] p-10">
									<div
										className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-[60px]"
										style={{ background: project.accentColor }}
									/>
									{project.image ? (
										<BrowserMockup className="h-4/5 w-[90%]" noPadding>
											<div className="relative h-full w-full">
												<Image
													src={project.image}
													alt={project.name}
													fill
													className="object-cover object-top"
													sizes="(max-width: 768px) 90vw, 45vw"
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

								<div className="flex items-center justify-between border-t border-border px-6 py-5">
									<div>
										<div className="font-heading text-lg font-bold">{project.name}</div>
										<div className="mt-0.5 text-sm text-djanni-gray">{project.type}</div>
										<div className="mt-2 text-xs text-djanni-gray-light">
											{project.location} &middot; {project.year}
										</div>
									</div>
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
										<IconArrowRight size={16} />
									</div>
								</div>
							</Link>
						</StaggerItem>
					))}
				</StaggerContainer>

				<AnimatedSection delay={0.3}>
					<div className="mt-16 text-center">
						<Link
							href="/#contact"
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
