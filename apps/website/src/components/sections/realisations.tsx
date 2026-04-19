"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { ProjectCard } from "@/components/cards/project-card"
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { PROJECTS } from "@/lib/constants"

export function Realisations() {
	const t = useTranslations("realisationsHome")

	return (
		<section id="realisations" className="px-5 py-28 md:px-12">
			<SectionHeader tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

			<StaggerContainer className="mx-auto mt-16 grid max-w-[1100px] gap-4 md:grid-cols-2">
				{PROJECTS.map((project, i) => (
					<StaggerItem key={project.name}>
						<ProjectCard project={project} priority={i === 0} />
					</StaggerItem>
				))}

				{/* CTA card */}
				<StaggerItem>
					<Link
						href="/demande-projet"
						className="group flex h-full items-center justify-between rounded-xl border border-dashed border-border bg-surface-b p-8 transition-[border-color,background-color] duration-300 hover:border-djanni-orange/40 hover:bg-card md:p-10"
					>
						<div>
							<div className="font-heading text-xl font-bold">{t("ctaTitle")}</div>
							<p className="mt-1 text-sm text-djanni-gray-light">{t("ctaSubtitle")}</p>
						</div>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
							<IconArrowRight size={16} />
						</div>
					</Link>
				</StaggerItem>
			</StaggerContainer>
		</section>
	)
}
