"use client"

import { useTranslations } from "next-intl"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { ProfileCard } from "@/components/ui/profile-card"
import { SectionHeader } from "@/components/ui/section-header"

export function PourquoiMoi() {
	const t = useTranslations("pourquoi")

	const reasons = [0, 1, 2, 3].map((i) => ({
		number: t(`reasons.${i}.number`),
		title: t(`reasons.${i}.title`),
		text: t(`reasons.${i}.text`),
	}))

	return (
		<section id="pourquoi" className="px-5 py-28 md:px-12">
			<div className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
				{/* Left */}
				<div>
					<AnimatedSection>
						<SectionHeader tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />
					</AnimatedSection>

					<StaggerContainer className="mt-10">
						{reasons.map((reason) => (
							<StaggerItem key={reason.number}>
								<div className="flex gap-5 border-b border-border py-7">
									<span className="mt-1 shrink-0 font-heading text-[11px] font-bold tracking-[0.05em] text-djanni-orange">
										{reason.number}
									</span>
									<div>
										<div className="mb-1.5 font-heading text-[17px] font-bold">{reason.title}</div>
										<div className="text-sm leading-relaxed text-djanni-gray-light">
											{reason.text}
										</div>
									</div>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>

				{/* Right */}
				<AnimatedSection delay={0.2}>
					<ProfileCard />
				</AnimatedSection>
			</div>
		</section>
	)
}
