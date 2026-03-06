"use client"

import { useTranslations } from "next-intl"
import { TestimonialCard } from "@/components/cards/testimonial-card"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { TESTIMONIALS } from "@/lib/constants"

export function Temoignages() {
	const t = useTranslations("temoignages")

	return (
		<section id="temoignages" className="bg-surface-c px-5 py-24 md:px-12">
			<AnimatedSection>
				<SectionHeader tag={t("tag")} title={t("title")} subtitle={t("subtitle")} align="center" />
			</AnimatedSection>

			<StaggerContainer className="mx-auto mt-16 grid max-w-[1100px] gap-6 md:grid-cols-3">
				{TESTIMONIALS.map((testimonial) => (
					<StaggerItem key={testimonial.name}>
						<TestimonialCard testimonial={testimonial} />
					</StaggerItem>
				))}
			</StaggerContainer>
		</section>
	)
}
