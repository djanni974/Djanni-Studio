"use client"

import { IconArrowRight, IconClock, IconCreditCard, IconHeadset } from "@tabler/icons-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { PricingCard } from "@/components/cards/pricing-card"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import type { PricingTier } from "@/lib/constants"

const TIER_KEYS = ["vitrine", "premium", "refonte"] as const
const GUARANTEE_ICONS = [IconClock, IconCreditCard, IconHeadset]

export function OffresContent() {
	const t = useTranslations("offres")
	const p = useTranslations("pricing")

	const tiers: PricingTier[] = TIER_KEYS.map((key) => ({
		badge: p(`${key}.badge`),
		priceLabel: p(`${key}.priceLabel`),
		price: p(`${key}.price`),
		priceSuffix: p(`${key}.priceSuffix`),
		priceNote: p(`${key}.priceNote`),
		name: p(`${key}.name`),
		description: p(`${key}.description`),
		features: p.raw(`${key}.features`) as string[],
		ctaLabel: p(`${key}.ctaLabel`),
		featured: key === "premium",
	}))

	const guarantees = (t.raw("guarantees.items") as { title: string; text: string }[]).map(
		(item, i) => ({
			...item,
			icon: GUARANTEE_ICONS[i],
		}),
	)

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				<div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

				<div className="relative mx-auto max-w-[1100px] text-center">
					<AnimatedSection>
						<span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
							{t("tag")}
						</span>
						<h1 className="mx-auto max-w-[700px] font-heading text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight">
							{t("heroTitle")}
							<span className="text-djanni-orange">{t("heroHighlight")}</span>
						</h1>
						<p className="mx-auto mt-6 max-w-[540px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
							{t("heroSubtitle")}
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Pricing cards */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<div className="grid gap-5 md:grid-cols-3">
						{tiers.map((tier) => (
							<PricingCard key={tier.name} tier={tier} />
						))}
					</div>
				</div>
			</section>

			{/* Guarantees */}
			<section className="bg-surface-a px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("guarantees.tag")} title={t("guarantees.title")} align="center" />
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-8 md:grid-cols-3">
						{guarantees.map((item) => (
							<StaggerItem key={item.title}>
								<div className="flex flex-col items-center text-center">
									<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-b">
										<item.icon size={22} className="text-djanni-orange" />
									</div>
									<h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
									<p className="max-w-[320px] text-sm leading-relaxed text-djanni-gray-light">
										{item.text}
									</p>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>

			{/* CTA */}
			<section className="relative overflow-hidden px-5 py-28 text-center md:px-12">
				{/* Animated radial glow */}
				<motion.div
					initial={{ opacity: 0, scale: 0.6 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
					viewport={{ once: true }}
					className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.1)_0%,transparent_70%)]"
				/>

				<AnimatedSection className="relative">
					<SectionHeader
						tag={t("cta.tag")}
						title={t("cta.title")}
						subtitle={t("cta.subtitle")}
						align="center"
					/>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mt-10 flex flex-wrap items-center justify-center gap-5"
					>
						<Link
							href="/demande-projet"
							className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-djanni-orange px-9 py-4.5 text-base font-medium text-white shadow-[0_0_0_rgba(232,80,10,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-djanni-orange-light hover:shadow-[0_8px_30px_rgba(232,80,10,0.35)]"
						>
							{/* Shine sweep on hover */}
							<span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
							<span className="relative">{t("cta.button")}</span>
							<IconArrowRight
								size={18}
								className="relative transition-transform duration-300 group-hover:translate-x-1"
							/>
						</Link>
					</motion.div>
				</AnimatedSection>
			</section>
		</>
	)
}
