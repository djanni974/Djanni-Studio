"use client"

import {
	IconArrowRight,
	IconCheck,
	IconClock,
	IconCreditCard,
	IconHammer,
	IconHeadset,
	IconLockOpen,
	IconScissors,
	IconShieldCheck,
	IconSparkles,
	IconToolsKitchen2,
} from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { PricingCard } from "@/components/cards/pricing-card"
import { Accordion } from "@/components/ui/accordion"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { VatNotice } from "@/components/ui/vat-notice"
import { Link } from "@/i18n/navigation"
import type { PricingTier } from "@/lib/constants"
import { trackPlausibleEvent } from "@/lib/plausible"

const TIER_KEYS = ["presence", "vitrine", "surmesure"] as const
const TIER_EVENT_KEYS: Record<(typeof TIER_KEYS)[number], "presence" | "vitrine" | "sur_mesure"> = {
	presence: "presence",
	vitrine: "vitrine",
	surmesure: "sur_mesure",
}
const GUARANTEE_ICONS = [IconLockOpen, IconClock, IconCreditCard, IconHeadset]
const PERSONA_ICONS = [IconHammer, IconScissors, IconToolsKitchen2]

type ComparisonRow = {
	feature: string
	presence: boolean | string
	vitrine: boolean | string
	custom: boolean | string
}

export function OffresContent() {
	const t = useTranslations("offres")
	const p = useTranslations("pricing")
	const comparisonRows = t.raw("comparison.rows") as ComparisonRow[]

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

	const guarantees = (t.raw("guarantees.items") as { title: string; text: string }[]).map(
		(item, i) => ({
			...item,
			icon: GUARANTEE_ICONS[i],
		}),
	)

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden px-5 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
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
							<span className="text-djanni-orange">.</span>
						</h1>
						<p className="mx-auto mt-6 max-w-[540px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
							{t("heroSubtitle")}
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Pricing cards */}
			<section className="px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<div className="grid gap-5 md:grid-cols-3">
						{tiers.map((tier, index) => {
							const tierKey = TIER_KEYS[index]
							const eventKey = tierKey ? TIER_EVENT_KEYS[tierKey] : undefined
							return (
								<PricingCard
									key={tier.name}
									tier={tier}
									onSelect={
										eventKey
											? () => trackPlausibleEvent("clic_card_offre", { offre: eventKey })
											: undefined
									}
								/>
							)
						})}
					</div>
					<VatNotice className="mt-10" />
				</div>
			</section>

			{/* Upgrade callout */}
			<div className="px-5 pb-12 md:px-12">
				<AnimatedSection>
					<div className="mx-auto max-w-[700px] rounded-2xl border border-djanni-orange/20 bg-djanni-orange/5 px-8 py-6 text-center">
						<p className="mb-2 font-heading text-lg font-semibold">{t("upgrade.title")}</p>
						<p className="text-sm leading-relaxed text-djanni-gray-light">{t("upgrade.text")}</p>
					</div>
				</AnimatedSection>
			</div>

			{/* Personas */}
			<section className="px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("personas.tag")} title={t("personas.title")} />
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3">
						{(
							t.raw("personas.items") as {
								offer: string
								headline: string
								points: string[]
							}[]
						).map((item, i) => {
							const PersonaIcon = PERSONA_ICONS[i]
							return (
								<StaggerItem key={i}>
									<div
										className={`rounded-2xl border bg-surface-b p-6 ${i === 1 ? "border-djanni-orange ring-1 ring-djanni-orange/20" : "border-border"}`}
									>
										<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-a">
											<PersonaIcon size={20} className="text-djanni-orange" />
										</div>
										<p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-djanni-orange">
											{item.offer}
										</p>
										<p className="mb-3 font-heading font-semibold">{item.headline}</p>
										<ul className="space-y-2 text-sm text-djanni-gray-light">
											{item.points.map((point, j) => (
												<li key={j}>→ {point}</li>
											))}
										</ul>
									</div>
								</StaggerItem>
							)
						})}
					</StaggerContainer>

					<AnimatedSection delay={0.2} className="mt-8 text-center">
						<Link
							href="/realisations"
							className="inline-flex items-center gap-2 text-sm font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
						>
							{t("personas.seeExamples")}
							<IconArrowRight size={14} />
						</Link>
					</AnimatedSection>
				</div>
			</section>

			{/* Comparison table */}
			<section className="px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("comparison.tag")} title={t("comparison.title")} align="center" />
					</AnimatedSection>

					<AnimatedSection delay={0.2}>
						<div className="mt-14 overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-border">
										<th className="w-1/2 py-4 pr-6 text-left font-normal text-djanni-gray-light">
											{t("comparison.featureLabel")}
										</th>
										<th className="px-4 py-4 text-center font-semibold">
											{t("comparison.presenceLabel")}
											<span className="mt-1 block text-xs font-normal text-djanni-gray-light">
												{t("comparison.presencePrice")}
											</span>
										</th>
										<th className="relative px-4 py-4 text-center font-semibold text-djanni-orange">
											<span className="absolute inset-x-0 top-0 h-1 rounded-t bg-djanni-orange" />
											{t("comparison.vitrineLabel")}
											<span className="mt-1 block text-xs font-normal text-djanni-orange/60">
												{t("comparison.vitrinePrice")}
											</span>
										</th>
										<th className="px-4 py-4 text-center font-semibold">
											{t("comparison.customLabel")}
											<span className="mt-1 block text-xs font-normal text-djanni-gray-light">
												{t("comparison.customPrice")}
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{comparisonRows.map((row, i) => (
										<tr
											key={i}
											className={`border-b border-border/50 ${i % 2 === 0 ? "bg-foreground/4" : ""}`}
										>
											<td className="py-3 pr-6 text-djanni-gray-light">{row.feature}</td>
											{(["presence", "vitrine", "custom"] as const).map((col) => {
												const val = row[col]
												return (
													<td
														key={col}
														className={`px-4 py-3 text-center ${col === "vitrine" ? "bg-djanni-orange/5" : ""}`}
													>
														{val === true ? (
															<IconCheck
																size={18}
																stroke={2.5}
																className={`mx-auto ${col === "vitrine" ? "text-djanni-orange" : "text-green-600"}`}
															/>
														) : val === false ? (
															<span className="text-sm text-foreground/20">-</span>
														) : (
															<span
																className={`text-xs ${col === "vitrine" ? "font-medium text-djanni-orange/80" : "text-djanni-gray-light"}`}
															>
																{val}
															</span>
														)}
													</td>
												)
											})}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* ROI */}
			<section className="px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px] text-center">
					<AnimatedSection>
						<SectionHeader
							tag={t("roi.tag")}
							title={t("roi.title")}
							subtitle={t("roi.text")}
							align="center"
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-3">
						{(t.raw("roi.stats") as { value: string; label: string }[]).map((item, i) => (
							<StaggerItem key={i}>
								<div className="rounded-2xl border border-border bg-surface-a p-6">
									<p className="mb-2 font-heading text-3xl font-bold text-djanni-orange">
										{item.value}
									</p>
									<p className="text-sm text-djanni-gray-light">{item.label}</p>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>

					<StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-3">
						{(t.raw("roi.scenarios") as { trade: string; text: string }[]).map((s, i) => (
							<StaggerItem key={i}>
								<div className="rounded-xl border border-border bg-surface-a p-5 text-left">
									<p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-djanni-orange">
										{s.trade}
									</p>
									<p className="text-sm leading-relaxed text-djanni-gray-light">{s.text}</p>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>

					<AnimatedSection delay={0.2}>
						<div className="mt-10 text-center">
							<Link
								href="/realisations"
								className="inline-flex items-center gap-2 rounded-lg border border-djanni-orange px-6 py-3 text-sm font-medium text-djanni-orange transition-colors hover:bg-djanni-orange hover:text-white"
							>
								{t("roi.seeResults")}
								<IconArrowRight size={14} />
							</Link>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Pricing FAQ */}
			<section className="px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[800px]">
					<AnimatedSection>
						<SectionHeader tag={t("pricingFaq.tag")} title={t("pricingFaq.title")} align="center" />
					</AnimatedSection>

					<AnimatedSection delay={0.2} className="mt-14">
						<Accordion
							id="offres-faq"
							items={t.raw("pricingFaq.items") as { question: string; answer: string }[]}
						/>
					</AnimatedSection>
				</div>
			</section>

			{/* Guarantees */}
			<section className="px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("guarantees.tag")}
							title={t("guarantees.title")}
							subtitle={t("guarantees.subtitle")}
							align="center"
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

			{/* Maintenance + Options callouts */}
			<section className="px-5 py-20 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<div className="grid gap-5 md:grid-cols-2">
						<AnimatedSection>
							<Link
								href="/maintenance"
								className="group flex h-full flex-col rounded-2xl border border-border bg-surface-b p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-djanni-orange/30 hover:shadow-[0_8px_30px_rgba(232,80,10,0.08)]"
							>
								<div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-a">
									<IconShieldCheck size={22} className="text-djanni-orange" />
								</div>
								<span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("maintenanceCallout.tag")}
								</span>
								<h3 className="mb-3 font-heading text-2xl font-bold leading-tight">
									{t("maintenanceCallout.title")}
								</h3>
								<p className="mb-6 text-sm leading-relaxed text-djanni-gray-light">
									{t("maintenanceCallout.text")}
								</p>
								<span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-djanni-orange transition-colors group-hover:text-djanni-orange-light">
									{t("maintenanceCallout.cta")}
									<IconArrowRight
										size={14}
										className="transition-transform duration-300 group-hover:translate-x-1"
									/>
								</span>
							</Link>
						</AnimatedSection>

						<AnimatedSection delay={0.1}>
							<Link
								href="/options"
								className="group flex h-full flex-col rounded-2xl border border-border bg-surface-b p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-djanni-orange/30 hover:shadow-[0_8px_30px_rgba(232,80,10,0.08)]"
							>
								<div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-a">
									<IconSparkles size={22} className="text-djanni-orange" />
								</div>
								<span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("optionsCallout.tag")}
								</span>
								<h3 className="mb-3 font-heading text-2xl font-bold leading-tight">
									{t("optionsCallout.title")}
								</h3>
								<p className="mb-6 text-sm leading-relaxed text-djanni-gray-light">
									{t("optionsCallout.text")}
								</p>
								<span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-djanni-orange transition-colors group-hover:text-djanni-orange-light">
									{t("optionsCallout.cta")}
									<IconArrowRight
										size={14}
										className="transition-transform duration-300 group-hover:translate-x-1"
									/>
								</span>
							</Link>
						</AnimatedSection>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="relative overflow-hidden px-5 py-28 text-center md:px-12">
				{/* Radial glow */}
				<div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.1)_0%,transparent_70%)]" />

				<AnimatedSection className="relative">
					<SectionHeader
						tag={t("cta.tag")}
						title={t("cta.title")}
						subtitle={t("cta.subtitle")}
						align="center"
					/>

					<div className="mt-10 flex flex-col items-center gap-4">
						<p className="text-sm text-djanni-gray-light">{t("cta.reassurance")}</p>
						<Link
							href="/demande-projet"
							onClick={() => trackPlausibleEvent("clic_cta_contact", { page: "offres" })}
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
					</div>
				</AnimatedSection>
			</section>
		</>
	)
}
