"use client"

import {
	IconArrowRight,
	IconCalendarOff,
	IconHeartHandshake,
	IconShieldCheck,
} from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { MaintenanceCard } from "@/components/cards/maintenance-card"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { VatNotice } from "@/components/ui/vat-notice"
import { Link } from "@/i18n/navigation"
import { trackPlausibleEvent } from "@/lib/plausible"
import { MAINTENANCE_TIERS } from "@/lib/pricing"

const REASSURANCE_ICONS = [IconCalendarOff, IconShieldCheck, IconHeartHandshake]

export function MaintenanceContent() {
	const t = useTranslations("maintenance")
	const reassurances = (t.raw("reassurances") as { title: string; text: string }[]).map(
		(item, i) => ({ ...item, Icon: REASSURANCE_ICONS[i] }),
	)

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
				</div>
			</section>

			{/* Tiers */}
			<section className="px-5 pb-16 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<StaggerContainer className="grid gap-6 md:grid-cols-3 md:gap-5">
						{MAINTENANCE_TIERS.map((tier) => (
							<StaggerItem key={tier.id}>
								<MaintenanceCard tier={tier} />
							</StaggerItem>
						))}
					</StaggerContainer>

					<AnimatedSection delay={0.2}>
						<p className="mt-12 text-center text-sm text-djanni-gray-light">
							{/* TODO DS-22 : remplacer par lien CGV mis a jour */}
							{t("disclaimerCgv")}
						</p>
					</AnimatedSection>

					<VatNotice className="mt-4" />
				</div>
			</section>

			{/* Reassurances */}
			<section className="px-5 py-20 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader
							tag={t("reassurancesTag")}
							title={t("reassurancesTitle")}
							align="center"
						/>
					</AnimatedSection>

					<StaggerContainer className="mt-14 grid gap-8 sm:grid-cols-3">
						{reassurances.map((item) => (
							<StaggerItem key={item.title}>
								<div className="flex flex-col items-center text-center">
									<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-b">
										{item.Icon ? <item.Icon size={22} className="text-djanni-orange" /> : null}
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
			<section className="relative overflow-hidden px-5 py-24 text-center md:px-12">
				<div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.1)_0%,transparent_70%)]" />

				<AnimatedSection className="relative">
					<Link
						href="/demande-projet"
						onClick={() => trackPlausibleEvent("clic_cta_contact", { page: "maintenance" })}
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
