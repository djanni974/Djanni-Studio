"use client"

import { useTranslations } from "next-intl"
import { PricingCard } from "@/components/cards/pricing-card"
import { SectionHeader } from "@/components/ui/section-header"
import type { PricingTier } from "@/lib/constants"

const TIER_KEYS = ["presence", "vitrine", "surmesure"] as const

export function Offres() {
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
		benefitLine: p(`${key}.benefitLine`),
		features: p.raw(`${key}.features`) as string[],
		ctaLabel: p(`${key}.ctaLabel`),
		featured: key === "vitrine",
		popularNote: p.has(`${key}.popularNote`) ? p(`${key}.popularNote`) : undefined,
	}))

	return (
		<section id="offres" className="bg-surface-a px-5 py-24 md:px-12">
			<SectionHeader tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

			<div className="mt-16 grid gap-5 md:grid-cols-3">
				{tiers.map((tier) => (
					<PricingCard key={tier.name} tier={tier} />
				))}
			</div>
		</section>
	)
}
