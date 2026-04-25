"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { OptionCard } from "@/components/cards/option-card"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { VatNotice } from "@/components/ui/vat-notice"
import { Link } from "@/i18n/navigation"
import { trackPlausibleEvent } from "@/lib/plausible"
import { OPTION_CATEGORIES } from "@/lib/pricing"

const TOTAL_OPTIONS = OPTION_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)
const MIN_PRICE = Math.min(...OPTION_CATEGORIES.flatMap((c) => c.items.map((i) => i.priceHT)))

export function OptionsContent() {
	const t = useTranslations("options")

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden px-5 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				<div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

				<div className="relative mx-auto max-w-[800px] text-center">
					<AnimatedSection>
						<SectionHeader
							tag={t("tag")}
							title={t("title")}
							subtitle={t("subtitle")}
							align="center"
						/>
					</AnimatedSection>

					<AnimatedSection delay={0.15}>
						<div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs">
							<span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-b px-4 py-2 font-medium text-djanni-gray-light">
								<span className="font-heading font-bold text-djanni-orange">{TOTAL_OPTIONS}</span>{" "}
								{t("statOptions")}
							</span>
							<span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-b px-4 py-2 font-medium text-djanni-gray-light">
								<span className="font-heading font-bold text-djanni-orange">
									{OPTION_CATEGORIES.length}
								</span>{" "}
								{t("statCategories")}
							</span>
							<span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-b px-4 py-2 font-medium text-djanni-gray-light">
								{t("statFromPrice", { price: MIN_PRICE })}
							</span>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Categories */}
			<section className="px-5 pb-12 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<StaggerContainer className="flex flex-col gap-16 md:gap-20">
						{OPTION_CATEGORIES.map((category) => (
							<StaggerItem key={category.id}>
								<OptionCard category={category} />
							</StaggerItem>
						))}
					</StaggerContainer>

					<VatNotice className="mt-16" />
				</div>
			</section>

			{/* CTA */}
			<section className="relative overflow-hidden px-5 py-24 text-center md:px-12">
				<div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.1)_0%,transparent_70%)]" />

				<AnimatedSection className="relative">
					<Link
						href="/demande-projet"
						onClick={() => trackPlausibleEvent("clic_cta_contact", { page: "options" })}
						className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-djanni-orange px-9 py-4.5 text-base font-medium text-white shadow-[0_0_0_rgba(232,80,10,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-djanni-orange-light hover:shadow-[0_8px_30px_rgba(232,80,10,0.35)]"
					>
						<span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
						<span className="relative">{t("ctaContact")}</span>
						<IconArrowRight
							size={18}
							className="relative transition-transform duration-300 group-hover:translate-x-1"
						/>
					</Link>
				</AnimatedSection>
			</section>
		</>
	)
}
