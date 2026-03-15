"use client"

import { IconArrowRight, IconCode, IconHammer, IconHeart, IconMapPin } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { SKILLS } from "@/lib/constants"

const JOURNEY_ICONS = [IconHammer, IconCode, IconMapPin, IconHeart]

export function AboutContent() {
	const t = useTranslations("about")

	const journeySteps = [0, 1, 2, 3].map((i) => ({
		icon: JOURNEY_ICONS[i],
		year: t(`journey.steps.${i}.year`),
		title: t(`journey.steps.${i}.title`),
		text: t(`journey.steps.${i}.text`),
	}))

	const values = [0, 1, 2, 3].map((i) => ({
		title: t(`values.items.${i}.title`),
		text: t(`values.items.${i}.text`),
	}))

	return (
		<>
			{/* Hero section */}
			<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
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
								<p className="mt-6 max-w-[540px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
									{t("intro")}
								</p>
							</div>

							<div className="flex flex-col items-center">
								<div className="relative h-32 w-32 overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(232,80,10,0.3)]">
									<Image
										src="/gianni.webp"
										alt="Gianni — Fondateur de Djanni Studio"
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

			{/* Journey */}
			<section className="bg-surface-b px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("journey.tag")}
							title={t("journey.title")}
							subtitle={t("journey.subtitle")}
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2">
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
				</div>
			</section>

			{/* Valeurs */}
			<section className="bg-surface-a px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("values.tag")}
							title={t("values.title")}
							subtitle={t("values.subtitle")}
							align="center"
						/>
					</AnimatedSection>

					<StaggerContainer className="mx-auto mt-16 grid max-w-[900px] gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
						{values.map((value) => (
							<StaggerItem key={value.title}>
								<div className="flex h-full flex-col bg-surface-b p-8">
									<h3 className="mb-2 font-heading text-base font-bold">{value.title}</h3>
									<p className="text-sm leading-relaxed text-djanni-gray-light">{value.text}</p>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>

			{/* Skills */}
			<section className="bg-surface-b px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("skills.tag")}
							title={t("skills.title")}
							subtitle={t("skills.subtitle")}
							align="center"
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
					</AnimatedSection>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-surface-a px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<div className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-16 text-center md:px-16">
							<h2 className="font-heading text-[clamp(28px,3.5vw,40px)] font-extrabold leading-tight tracking-tight">
								{t("cta.title")}
							</h2>
							<p className="mt-4 max-w-[460px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
								{t("cta.subtitle")}
							</p>
							<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
								<Link
									href="/demande-projet"
									className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
								>
									{t("cta.button")}
									<IconArrowRight size={16} />
								</Link>
								<Link
									href="/offres"
									className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
								>
									{t("cta.seeOffers")}
								</Link>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>
		</>
	)
}
