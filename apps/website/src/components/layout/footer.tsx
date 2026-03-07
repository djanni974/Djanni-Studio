"use client"

import { useTranslations } from "next-intl"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { Link } from "@/i18n/navigation"

export function Footer() {
	const t = useTranslations("footer")

	return (
		<footer className="relative overflow-hidden bg-background">
			{/* Top gradient fade */}
			<div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-10 bg-linear-to-b from-(--color-background) to-transparent" />

			{/* Dot grid */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04]"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>
			{/* Radial glow behind SVG */}
			<div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 translate-y-[20%] rounded-full bg-[radial-gradient(ellipse,rgba(232,80,10,0.07)_0%,transparent_70%)]" />

			{/* Main footer area */}
			<div className="relative flex flex-col items-center px-6 pt-10 pb-6 md:px-12 md:pt-14 md:pb-8">
				<div className="flex flex-col items-center gap-4 text-center">
					<span className="text-sm tracking-[0.3em] font-medium uppercase text-djanni-gray">
						Djanni Studio
					</span>
					<span className="text-[13px] text-djanni-gray">{t("tagline")}</span>
					<div className="flex flex-wrap items-center justify-center gap-4 text-[13px] text-djanni-gray-light">
						<Link
							href="mailto:contact@djannistudio.fr"
							className="transition-colors hover:text-foreground"
						>
							contact@djannistudio.fr
						</Link>
						<span className="text-djanni-gray">·</span>
						<Link href="tel:+33749547498" className="transition-colors hover:text-foreground">
							07 49 54 74 98
						</Link>
					</div>
					<nav className="mt-2 flex flex-col items-center gap-3 md:flex-row md:gap-8">
						<Link
							href="/realisations"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("realisations")}
						</Link>
						<Link
							href="/offres"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("offres")}
						</Link>
						<Link
							href="/a-propos"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("about")}
						</Link>
						<Link
							href="/blog"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("blog")}
						</Link>
						<Link
							href="/demande-projet"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("contact")}
						</Link>
						<Link
							href="/politique-de-confidentialite"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("privacy")}
						</Link>
						<Link
							href="/mentions-legales"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("legal")}
						</Link>
						<Link
							href="/cgv"
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t("cgv")}
						</Link>
					</nav>
				</div>

				<div className="mt-8 w-full max-w-[460px] md:mt-10">
					<TextHoverEffect text="Djanni." />
				</div>

				<span className="mt-4 text-xs text-djanni-gray">{t("copyright")}</span>
			</div>
		</footer>
	)
}
