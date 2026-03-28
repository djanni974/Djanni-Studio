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
	IconToolsKitchen2,
	IconX,
} from "@tabler/icons-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { PricingCard } from "@/components/cards/pricing-card"
import { Accordion } from "@/components/ui/accordion"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import type { PricingTier } from "@/lib/constants"

const TIER_KEYS = ["presence", "vitrine", "surmesure"] as const
const GUARANTEE_ICONS = [IconLockOpen, IconClock, IconCreditCard, IconHeadset]
const PERSONA_ICONS = [IconHammer, IconScissors, IconToolsKitchen2]

const COMPARISON_ROWS: {
	feature: string
	presence: boolean | string
	vitrine: boolean | string
	custom: boolean | string
}[] = [
	{ feature: "Design sur mesure à votre image", presence: true, vitrine: true, custom: true },
	{ feature: "Parfait sur mobile", presence: true, vitrine: true, custom: true },
	{ feature: "Visible sur Google", presence: true, vitrine: true, custom: true },
	{ feature: "Site sécurisé et en ligne", presence: true, vitrine: true, custom: true },
	{ feature: "Formation prise en main", presence: "1h", vitrine: "2h", custom: "3h" },
	{ feature: "Support après livraison", presence: "30 jours", vitrine: "1 mois", custom: "3 mois" },
	{ feature: "Nombre de pages", presence: "1", vitrine: "jusqu'à 5", custom: "jusqu'à 8" },
	{ feature: "Galerie photos / réalisations", presence: false, vitrine: true, custom: true },
	{ feature: "Animations soignées", presence: false, vitrine: true, custom: true },
	{
		feature: "SEO avancé (bien classé sur Google)",
		presence: false,
		vitrine: true,
		custom: true,
	},
	{ feature: "Statistiques de visite", presence: false, vitrine: true, custom: true },
	{ feature: "Réservation en ligne", presence: false, vitrine: false, custom: true },
	{ feature: "Blog intégré", presence: false, vitrine: false, custom: true },
	{ feature: "Catalogue produits", presence: false, vitrine: false, custom: true },
	{ feature: "Multilingue", presence: false, vitrine: false, custom: true },
	{ feature: "Réunion de suivi à 1 mois", presence: false, vitrine: false, custom: true },
]

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
						<h2 className="mx-auto max-w-[700px] font-heading text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight">
							{t("heroTitle")}
							<span className="text-djanni-orange">{t("heroHighlight")}</span>
							<span className="text-djanni-orange">.</span>
						</h2>
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

			{/* Personas */}
			<section className="bg-surface-a px-5 py-24 md:px-12">
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
				</div>
			</section>

			{/* Comparison table */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
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
									{COMPARISON_ROWS.map((row, i) => (
										<tr
											key={i}
											className={`border-b border-border/50 ${i % 2 === 0 ? "bg-surface-a/50" : ""}`}
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
															<IconX size={16} stroke={2} className="mx-auto text-foreground/15" />
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

			{/* Add-ons */}
			<section className="bg-surface-a px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("addons.tag")}
							title={t("addons.title")}
							subtitle={t("addons.subtitle")}
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{(
							t.raw("addons.items") as {
								label: string
								price: string
								desc: string
								hint?: string
							}[]
						).map((opt, i) => (
							<StaggerItem key={i}>
								<div className="rounded-2xl border border-border bg-surface-b p-6 transition-shadow hover:shadow-md">
									<p className="mb-1 font-heading text-lg font-bold text-djanni-orange">
										{opt.price}
									</p>
									<p className="mb-2 font-semibold">{opt.label}</p>
									<p className="text-sm text-djanni-gray-light">{opt.desc}</p>
									{opt.hint && (
										<p className="mt-2 text-xs italic text-djanni-orange/70">{opt.hint}</p>
									)}
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>

			{/* ROI */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[800px] text-center">
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
				</div>
			</section>

			{/* Pricing FAQ */}
			<section className="bg-surface-b px-5 py-24 md:px-12">
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
			<section className="bg-surface-a px-5 py-24 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("guarantees.tag")} title={t("guarantees.title")} align="center" />
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
						className="mt-10 flex flex-col items-center gap-4"
					>
						<p className="text-sm text-djanni-gray-light">{t("cta.reassurance")}</p>
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
