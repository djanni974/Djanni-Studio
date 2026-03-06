"use client"

import { IconArrowRight, IconPhone } from "@tabler/icons-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Link } from "@/i18n/navigation"

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1 + 0.1,
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	}),
}

export function Hero() {
	const t = useTranslations("hero")
	const s = useTranslations("stats")

	const stats = [
		{ value: s("deliveryValue"), label: s("deliveryLabel") },
		{ value: s("responsiveValue"), label: s("responsiveLabel") },
		{ value: s("paymentValue"), label: s("paymentLabel") },
	]

	return (
		<AuroraBackground className="min-h-screen">
			<section className="relative flex min-h-screen flex-col justify-center px-5 pt-[120px] pb-20 md:px-12">
				<div className="pointer-events-none absolute -top-[200px] -right-[200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.12)_0%,transparent_70%)]" />

				<motion.span
					custom={0}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-djanni-orange"
				>
					<span className="inline-block h-px w-6 bg-djanni-orange" />
					{t("badge")}
				</motion.span>

				<motion.h1
					custom={1}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="mb-8 max-w-[900px] font-heading text-[clamp(44px,7vw,96px)] font-extrabold leading-none tracking-tight"
				>
					{t("titleStart")}
					<em className="not-italic text-djanni-orange">{t("titleHighlight")}</em>
					{t("titleEnd")}
				</motion.h1>

				<motion.p
					custom={2}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="mb-12 max-w-[480px] text-lg font-light leading-relaxed text-djanni-gray-light"
				>
					{t("subtitle")}
				</motion.p>

				<motion.div
					custom={3}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="flex flex-wrap items-center gap-5"
				>
					<Link
						href="#contact"
						className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-8 py-4 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-djanni-orange-light"
					>
						<IconPhone size={16} />
						{t("cta")}
					</Link>
					<Link
						href="#realisations"
						className="inline-flex items-center gap-2 border-b border-border px-6 py-4 text-[15px] text-djanni-gray-light transition-all hover:border-djanni-gray hover:text-foreground"
					>
						{t("seeWork")}
						<IconArrowRight size={16} />
					</Link>
				</motion.div>

				<motion.div
					custom={4}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="mt-20 grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-white/2 max-md:grid-cols-1 max-md:divide-x-0 max-md:divide-y"
				>
					{stats.map((stat) => (
						<div key={stat.label} className="px-8 py-6 max-md:px-6 max-md:py-5">
							<div className="font-heading text-4xl font-extrabold leading-none max-md:text-2xl">
								{stat.value}
							</div>
							<div className="mt-1 text-[13px] text-djanni-gray">{stat.label}</div>
						</div>
					))}
				</motion.div>
			</section>
		</AuroraBackground>
	)
}
