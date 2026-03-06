"use client"

import { IconMail } from "@tabler/icons-react"
import { AnimatedSection } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"

export function CtaContact() {
	return (
		<section id="contact" className="relative overflow-hidden px-5 py-28 text-center md:px-12">
			{/* Radial glow */}
			<div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

			<AnimatedSection className="relative">
				<SectionHeader
					tag="Contact"
					title="Votre projet mérite un bon site."
					subtitle="Dites-moi ce que vous faites, je vous montre ce que ça pourrait donner. Premier échange gratuit, sans engagement."
					align="center"
				/>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-5">
					<Link
						href="mailto:contact@djannistudio.fr"
						className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-9 py-4.5 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-djanni-orange-light"
					>
						<IconMail size={18} />
						contact@djannistudio.fr
					</Link>
				</div>

				<p className="mt-5 text-sm text-djanni-gray">
					Ou appelez directement &mdash;{" "}
					<Link
						href="tel:+33600000000"
						className="border-b border-border text-djanni-gray-light transition-colors hover:text-foreground"
					>
						06 XX XX XX XX
					</Link>
				</p>
			</AnimatedSection>
		</section>
	)
}
