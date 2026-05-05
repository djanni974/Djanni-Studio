"use client"

import { IconArrowRight, IconPhone } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Hero() {
	const t = useTranslations("hero")
	const s = useTranslations("stats")

	const stats = [
		{ value: s("deliveryValue"), label: s("deliveryLabel") },
		{ value: s("responsiveValue"), label: s("responsiveLabel") },
		{ value: s("paymentValue"), label: s("paymentLabel") },
	]

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Dot grid */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			{/* Primary glow - top right */}
			<div className="pointer-events-none absolute -top-[15%] -right-[10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.14)_0%,transparent_65%)] blur-2xl" />

			{/* Secondary glow - bottom left */}
			<div className="pointer-events-none absolute -bottom-[10%] -left-[5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.06)_0%,transparent_70%)] blur-2xl" />

			{/* Diagonal accent line */}
			<div className="pointer-events-none absolute top-0 right-[20%] h-full w-px bg-linear-to-b from-transparent via-djanni-orange/[0.07] to-transparent" />

			{/* Orbital rings - desktop only */}
			<div className="pointer-events-none absolute top-1/2 right-[10%] hidden h-[520px] w-[520px] -translate-y-[55%] animate-hero-orbits lg:block">
				{/* Core glow */}
				<div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-djanni-orange/25 blur-3xl" />
				<div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-djanni-orange/60" />

				{/* Rings */}
				<div className="absolute inset-[15%] rounded-full border border-white/8" />
				<div className="absolute inset-[25%] rounded-full border border-djanni-orange/20" />
				<div className="absolute inset-[38%] rounded-full border border-white/10" />

				{/* Dashed orbit */}
				<div className="absolute inset-[8%] rounded-full border border-dashed border-white/8" />

				{/* Accent dots */}
				<div className="absolute top-[8%] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-djanni-orange/60" />
				<div className="absolute top-[25%] right-[15%] h-1.5 w-1.5 rounded-full bg-djanni-orange/40" />
				<div className="absolute bottom-[15%] left-[25%] h-1.5 w-1.5 rounded-full bg-white/30" />

				{/* Cross lines through center */}
				<div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-white/6 to-transparent" />
				<div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-linear-to-r from-transparent via-white/6 to-transparent" />

				{/* Fade mask */}
				<div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_35%,var(--color-background)_70%)]" />
			</div>

			{/* Bottom fade */}
			<div className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-linear-to-b from-transparent to-(--color-background)" />

			<section className="relative flex min-h-screen flex-col justify-center px-5 pt-[120px] pb-20 md:px-12">
				<span
					className="mb-8 inline-flex animate-hero-fade-up items-center gap-2 text-xs font-medium uppercase tracking-widest text-djanni-orange"
					style={{ animationDelay: "100ms" }}
				>
					<span className="inline-block h-px w-6 bg-djanni-orange" />
					{t("badge")}
				</span>

				<h1 className="mb-6 max-w-[700px] text-sm font-medium uppercase tracking-widest text-djanni-gray-light">
					{t("heading")}
				</h1>

				<p
					className="mb-8 max-w-[900px] font-heading text-[clamp(44px,7vw,96px)] font-extrabold leading-none tracking-tight"
					aria-hidden="true"
				>
					{t("taglineStart")}
					<em className="not-italic text-djanni-orange">{t("taglineHighlight")}</em>
					{t("taglineEnd")}
				</p>

				<p
					className="mb-12 max-w-[480px] animate-hero-fade-up text-lg font-light leading-relaxed text-djanni-gray-light"
					style={{ animationDelay: "350ms" }}
				>
					{t("subtitle")}
				</p>

				<div
					className="flex animate-hero-fade-up flex-wrap items-center gap-5"
					style={{ animationDelay: "400ms" }}
				>
					<div className="group">
						<Link
							href="/demande-projet"
							className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-djanni-orange px-8 py-4 text-[15px] font-medium text-white shadow-[0_0_0_rgba(232,80,10,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-djanni-orange-light hover:shadow-[0_8px_30px_rgba(232,80,10,0.35)] active:scale-[0.97]"
						>
							<span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
							<IconPhone size={16} className="relative" />
							<span className="relative">{t("cta")}</span>
						</Link>
					</div>

					<div className="group">
						<Link
							href="#realisations"
							className="relative inline-flex items-center gap-2 px-6 py-4 text-[15px] text-djanni-gray-light transition-colors duration-300 hover:text-foreground"
						>
							{t("seeWork")}
							<IconArrowRight
								size={16}
								className="transition-transform duration-300 group-hover:translate-x-1"
							/>
							<span className="absolute bottom-3 left-6 right-6 h-px origin-left scale-x-0 bg-foreground/30 transition-transform duration-300 ease-out group-hover:scale-x-100" />
						</Link>
					</div>
				</div>

				<div
					className="mt-20 grid animate-hero-fade-up grid-cols-3 divide-x divide-border rounded-xl border border-border bg-white/2 max-md:grid-cols-1 max-md:divide-x-0 max-md:divide-y"
					style={{ animationDelay: "500ms" }}
				>
					{stats.map((stat) => (
						<div key={stat.label} className="px-8 py-6 max-md:px-6 max-md:py-5">
							<div className="font-heading text-4xl font-extrabold leading-none max-md:text-2xl">
								{stat.value}
							</div>
							<div className="mt-1 text-[13px] text-djanni-gray">{stat.label}</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
