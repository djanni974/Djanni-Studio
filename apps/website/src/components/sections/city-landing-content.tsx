"use client"

import { IconArrowRight, IconMapPin, IconSearch } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { Accordion } from "@/components/ui/accordion"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { CITY_PAGES, type FaqItem } from "@/lib/constants"
import { CtaContact } from "./cta-contact"
import { Offres } from "./offres"

export function CityLandingContent({ cityKey }: { cityKey: string }) {
	const t = useTranslations("cityPages")
	const otherCities = CITY_PAGES.filter((c) => c.cityKey !== cityKey)

	return (
		<>
			{/* Hero */}
			<section className="bg-surface-a px-5 pt-32 pb-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag="Djanni Studio"
							title={t(`${cityKey}.hero.title`)}
							subtitle={t(`${cityKey}.hero.subtitle`)}
							as="h1"
						/>
						<div className="mt-10">
							<Link
								href="/demande-projet"
								className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-9 py-4.5 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-djanni-orange-light"
							>
								{t(`${cityKey}.hero.cta`)}
								<IconArrowRight size={18} />
							</Link>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Search examples */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t(`${cityKey}.searchExamples.tag`)}
							title={t(`${cityKey}.searchExamples.title`)}
							subtitle={t(`${cityKey}.searchExamples.subtitle`)}
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
						{(t.raw(`${cityKey}.searchExamples.examples`) as string[]).map((example) => (
							<StaggerItem key={example}>
								<div className="flex items-center gap-3 rounded-xl border border-border bg-surface-a px-5 py-4">
									<IconSearch size={16} className="shrink-0 text-djanni-orange" />
									<span className="text-[15px] text-foreground">{example}</span>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>

			{/* Offres (reused) */}
			<Offres />

			{/* Why local */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t(`${cityKey}.whyLocal.tag`)}
							title={t(`${cityKey}.whyLocal.title`)}
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3">
						{(t.raw(`${cityKey}.whyLocal.points`) as { title: string; description: string }[]).map(
							(point) => (
								<StaggerItem key={point.title}>
									<div className="rounded-2xl border border-border bg-surface-a p-7">
										<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-djanni-orange/10">
											<IconMapPin size={20} className="text-djanni-orange" />
										</div>
										<h3 className="font-heading text-lg font-bold">{point.title}</h3>
										<p className="mt-2 text-[15px] leading-relaxed text-djanni-gray-light">
											{point.description}
										</p>
									</div>
								</StaggerItem>
							),
						)}
					</StaggerContainer>
				</div>
			</section>

			{/* Cross-links */}
			<section className="bg-surface-a px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("crossLinks.tag")} title={t("crossLinks.title")} align="center" />
					</AnimatedSection>

					<div className="mt-10 flex flex-wrap items-center justify-center gap-5">
						{otherCities.map((city) => (
							<Link
								key={city.slug}
								href={`/${city.slug}`}
								className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-b px-7 py-4 text-[15px] font-medium transition-all hover:-translate-y-0.5 hover:border-djanni-orange/30"
							>
								<IconMapPin size={16} className="text-djanni-orange" />
								{t("crossLinks.viewPage", { city: city.cityName })}
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[800px]">
					<AnimatedSection>
						<SectionHeader
							tag={t(`${cityKey}.faq.tag`)}
							title={t(`${cityKey}.faq.title`)}
							align="center"
						/>
					</AnimatedSection>

					<AnimatedSection delay={0.15} className="mt-14">
						<Accordion id={`faq-${cityKey}`} items={t.raw(`${cityKey}.faq.items`) as FaqItem[]} />
					</AnimatedSection>
				</div>
			</section>

			{/* CTA (reused) */}
			<CtaContact />
		</>
	)
}
