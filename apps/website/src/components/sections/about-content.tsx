"use client"

import {
	IconArrowRight,
	IconCheck,
	IconCode,
	IconHammer,
	IconMapPin,
	IconMessageCircle,
} from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionDivider } from "@/components/ui/section-divider"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { SKILLS } from "@/lib/constants"

const JOURNEY_ICONS = [IconHammer, IconCode, IconMapPin]
const METHOD_ICONS = [IconMessageCircle, IconHammer, IconCheck, IconMapPin]

export function AboutContent() {
	const t = useTranslations("about")

	const journeySteps = [0, 1, 2].map((i) => ({
		icon: JOURNEY_ICONS[i],
		year: t(`journey.steps.${i}.year`),
		title: t(`journey.steps.${i}.title`),
		text: t(`journey.steps.${i}.text`),
	}))

	const methodItems = [0, 1, 2, 3].map((i) => ({
		icon: METHOD_ICONS[i],
		title: t(`method.items.${i}.title`),
		text: t(`method.items.${i}.text`),
	}))

	const proofItems = [0, 1, 2, 3].map((i) => ({
		value: t(`proofs.items.${i}.value`),
		label: t(`proofs.items.${i}.label`),
	}))

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

				<div className="relative mx-auto max-w-[1100px]">
					<AnimatedSection>
						<div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
							<div>
								<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("tag")}
								</span>
								<h1 className="font-heading text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight">
									{t("titleLine1")}
									<br />
									<span className="text-djanni-orange">{t("titleHighlight")}</span>
									{t("titleLine2")}
								</h1>
								<p className="mt-6 max-w-[560px] font-heading text-[clamp(18px,1.6vw,22px)] font-medium italic leading-snug text-djanni-orange">
									{t("purpose")}
								</p>
								<p className="mt-5 max-w-[540px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
									{t("intro")}
								</p>
							</div>

							<div className="flex flex-col items-center">
								<div className="relative h-32 w-32 overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(232,80,10,0.3)]">
									<Image
										src="/gianni.webp"
										alt="Gianni - Fondateur de Djanni Studio"
										fill
										className="object-cover object-[50%_35%]"
										sizes="128px"
										priority
									/>
								</div>
								<div className="mt-4 text-center">
									<div className="font-heading text-base font-bold">{t("founderName")}</div>
									<div className="text-[13px] text-djanni-gray">{t("founderRole")}</div>
								</div>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>

			<div className="mx-auto max-w-[1100px] px-5 md:px-12">
				<SectionDivider />
			</div>

			{/* Journey */}
			<section className="px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("journey.tag")}
							title={t("journey.title")}
							subtitle={t("journey.subtitle")}
							accent
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
						{journeySteps.map((step) => (
							<StaggerItem key={step.title}>
								<div className="group h-full rounded-xl border border-border bg-card p-8 transition-[border-color] duration-300 hover:border-white/16">
									<div className="mb-5 flex items-center gap-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-djanni-orange/10 text-djanni-orange">
											<step.icon size={20} />
										</div>
										<span className="text-xs font-medium uppercase tracking-wider text-djanni-gray">
											{step.year}
										</span>
									</div>
									<h3 className="mb-3 font-heading text-lg font-bold">{step.title}</h3>
									<p className="text-sm leading-relaxed text-djanni-gray-light">{step.text}</p>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>

					<AnimatedSection delay={0.2}>
						<div className="mt-12 text-center">
							<Link
								href="/realisations"
								className="inline-flex items-center gap-2 text-sm font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
							>
								{t("journey.seeWork")}
								<IconArrowRight size={14} />
							</Link>
						</div>
					</AnimatedSection>
				</div>
			</section>

			<div className="mx-auto max-w-[1100px] px-5 md:px-12">
				<SectionDivider />
			</div>

			{/* Méthode */}
			<section className="px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("method.tag")}
							title={t("method.title")}
							subtitle={t("method.subtitle")}
							align="center"
							accent
						/>
					</AnimatedSection>

					<StaggerContainer className="mx-auto mt-16 grid max-w-[900px] gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
						{methodItems.map((item) => (
							<StaggerItem key={item.title}>
								<div className="flex h-full flex-col bg-surface-b p-8">
									<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-djanni-orange/10 text-djanni-orange">
										<item.icon size={20} />
									</div>
									<h3 className="mb-2 font-heading text-base font-bold">{item.title}</h3>
									<p className="text-sm leading-relaxed text-djanni-gray-light">{item.text}</p>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>

			<div className="mx-auto max-w-[1100px] px-5 md:px-12">
				<SectionDivider />
			</div>

			{/* Preuves */}
			<section className="px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("proofs.tag")} title={t("proofs.title")} align="center" accent />
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
						{proofItems.map((item) => (
							<StaggerItem key={item.label}>
								<div className="flex h-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center md:p-8">
									<div className="font-heading text-[clamp(28px,3.6vw,44px)] font-extrabold leading-none text-djanni-orange">
										{item.value}
									</div>
									<div className="mt-3 text-xs leading-snug text-djanni-gray-light md:text-sm">
										{item.label}
									</div>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>

					<AnimatedSection delay={0.2}>
						<p className="mx-auto mt-10 max-w-[560px] text-center text-sm text-djanni-gray">
							{t("proofs.note")}
						</p>
						<div className="mt-6 text-center">
							<Link
								href="/realisations"
								className="inline-flex items-center gap-2 text-sm font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
							>
								{t("proofs.cta")}
								<IconArrowRight size={14} />
							</Link>
						</div>
					</AnimatedSection>
				</div>
			</section>

			<div className="mx-auto max-w-[1100px] px-5 md:px-12">
				<SectionDivider />
			</div>

			{/* Skills */}
			<section className="px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("skills.tag")}
							title={t("skills.title")}
							subtitle={t("skills.subtitle")}
							align="center"
							accent
						/>
					</AnimatedSection>

					<AnimatedSection delay={0.2}>
						<div className="mx-auto mt-12 flex max-w-[600px] flex-wrap justify-center gap-3">
							{SKILLS.map((skill) => (
								<span
									key={skill}
									className="rounded-full border border-border bg-white/6 px-5 py-2.5 text-sm text-djanni-gray-light transition-colors hover:border-djanni-orange/40 hover:text-foreground"
								>
									{skill}
								</span>
							))}
						</div>
						<p className="mx-auto mt-6 max-w-[500px] text-center text-sm text-djanni-gray">
							{t("skills.benefitLine")}
						</p>
					</AnimatedSection>
				</div>
			</section>

			<div className="mx-auto max-w-[1100px] px-5 md:px-12">
				<SectionDivider />
			</div>

			{/* CTA */}
			<section className="px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<div className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-16 text-center md:px-16">
							{(() => {
								const ctaTitle = t("cta.title")
								const match = ctaTitle.match(/[.?!]$/)
								const punct = match?.[0] ?? "."
								const base = match ? ctaTitle.slice(0, -1) : ctaTitle
								return (
									<h2 className="font-heading text-[clamp(28px,3.5vw,40px)] font-extrabold leading-tight tracking-tight">
										{base}
										<span className="text-djanni-orange">{punct}</span>
									</h2>
								)
							})()}
							<p className="mt-4 max-w-[460px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
								{t("cta.subtitle")}
							</p>
							<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
								<Link
									href="/demande-projet"
									className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-djanni-orange px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_0_rgba(232,80,10,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-djanni-orange-light hover:shadow-[0_8px_30px_rgba(232,80,10,0.35)] active:scale-[0.97]"
								>
									<span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
									<span className="relative">{t("cta.button")}</span>
									<IconArrowRight
										size={16}
										className="relative transition-transform duration-300 group-hover:translate-x-1"
									/>
								</Link>
								<Link
									href="/offres"
									className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
								>
									{t("cta.seeOffers")}
								</Link>
							</div>
							<p className="mt-6 max-w-[480px] text-sm leading-relaxed text-djanni-gray">
								{t("cta.reassurance")}
							</p>
						</div>
					</AnimatedSection>
				</div>
			</section>
		</>
	)
}
