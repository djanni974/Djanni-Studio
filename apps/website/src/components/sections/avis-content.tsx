"use client"

import { IconStarFilled } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/animated-section"
import { GOOGLE_REVIEW_URL } from "@/lib/constants"

export function AvisContent() {
	const t = useTranslations("avisPage")

	return (
		<section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-28 md:px-12">
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<AnimatedSection>
				<div className="relative mx-auto max-w-lg text-center">
					{/* Stars */}
					<div className="mb-8 flex justify-center gap-2">
						{Array.from({ length: 5 }).map((_, i) => (
							<IconStarFilled key={i} size={32} className="text-djanni-orange" />
						))}
					</div>

					{/* Title */}
					<h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">
						{t("title")}
					</h1>

					{/* Subtitle */}
					<p className="mt-5 text-lg leading-relaxed text-djanni-gray">{t("subtitle")}</p>

					{/* CTA */}
					<a
						href={GOOGLE_REVIEW_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-10 inline-flex items-center gap-2.5 rounded-lg bg-djanni-orange px-8 py-4 text-base font-medium text-white transition-colors hover:bg-djanni-orange-light"
					>
						<IconStarFilled size={18} />
						{t("cta")}
					</a>

					{/* Footer text */}
					<p className="mt-8 text-sm text-djanni-gray-light">{t("footer")}</p>
				</div>
			</AnimatedSection>
		</section>
	)
}
