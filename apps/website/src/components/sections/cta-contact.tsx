"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"

export function CtaContact() {
	const t = useTranslations("ctaContact")

	return (
		<section id="contact" className="relative overflow-hidden px-5 py-28 text-center md:px-12">
			{/* Radial glow */}
			<div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

			<AnimatedSection className="relative">
				<SectionHeader tag={t("tag")} title={t("title")} subtitle={t("subtitle")} align="center" />

				<div className="mt-10 flex flex-wrap items-center justify-center gap-5">
					<Link
						href="/demande-projet"
						className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-9 py-4.5 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-djanni-orange-light"
					>
						{t("button")}
						<IconArrowRight size={18} />
					</Link>
				</div>

				<p className="mt-5 text-sm text-djanni-gray">
					{t("or")} &mdash;{" "}
					<Link
						href="tel:+33749547498"
						className="border-b border-border text-djanni-gray-light transition-colors hover:text-foreground"
					>
						07 49 54 74 98
					</Link>
				</p>
			</AnimatedSection>
		</section>
	)
}
