"use client"

import { useTranslations } from "next-intl"
import { Accordion } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/ui/animated-section"

export function ContactFaq() {
	const t = useTranslations("contactFaq")

	const items = Array.from({ length: 4 }, (_, i) => ({
		question: t(`items.${i}.question`),
		answer: t(`items.${i}.answer`),
	}))

	return (
		<section className="px-5 pb-28 md:px-12">
			<div className="mx-auto max-w-[720px]">
				<AnimatedSection>
					<span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
						{t("tag")}
					</span>
					<h2 className="font-heading text-[clamp(24px,3vw,32px)] font-extrabold leading-tight tracking-tight">
						{t("title")}
						<span className="text-djanni-orange">.</span>
					</h2>
				</AnimatedSection>

				<AnimatedSection delay={0.1} className="mt-10">
					<Accordion id="contact-faq" items={items} />
				</AnimatedSection>
			</div>
		</section>
	)
}
