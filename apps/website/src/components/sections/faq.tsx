"use client"

import { useTranslations } from "next-intl"
import { Accordion } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import type { FaqItem } from "@/lib/constants"

export function Faq() {
	const t = useTranslations("faq")

	const items: FaqItem[] = Array.from({ length: 9 }, (_, i) => ({
		question: t(`items.${i}.question`),
		answer: t(`items.${i}.answer`),
	}))

	return (
		<section id="faq" className="bg-surface-b px-5 py-24 md:px-12">
			<div className="mx-auto max-w-[800px]">
				<AnimatedSection>
					<SectionHeader
						tag={t("tag")}
						title={t("title")}
						subtitle={t("subtitle")}
						align="center"
					/>
				</AnimatedSection>

				<AnimatedSection delay={0.15} className="mt-14">
					<Accordion id="home-faq" items={items} />
				</AnimatedSection>
			</div>
		</section>
	)
}
