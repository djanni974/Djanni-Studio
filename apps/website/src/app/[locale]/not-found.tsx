"use client"

import { IconArrowLeft, IconEye } from "@tabler/icons-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { Link } from "@/i18n/navigation"

export default function NotFound() {
	const t = useTranslations("notFound")

	return (
		<>
			<Navbar />
			<main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6">
				{/* Dot grid background */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>

				{/* Radial glow */}
				<div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

				<motion.div
					className="relative flex flex-col items-center text-center"
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					{/* Big 404 */}
					<h1 className="font-heading text-[clamp(100px,20vw,180px)] font-extrabold leading-none tracking-tighter bg-linear-to-r from-djanni-orange via-djanni-orange-light to-djanni-orange bg-clip-text text-transparent">
						404
					</h1>

					{/* Title */}
					<h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">{t("title")}</h2>

					{/* Subtitle */}
					<p className="mt-3 max-w-md text-sm text-djanni-gray-light md:text-base">
						{t("subtitle")}
					</p>

					{/* Actions */}
					<div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
						<Link
							href="/"
							className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
						>
							<IconArrowLeft size={16} />
							{t("backHome")}
						</Link>
						<Link
							href="/#realisations"
							className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-medium text-djanni-gray-light transition-colors hover:border-djanni-gray hover:text-foreground"
						>
							<IconEye size={16} />
							{t("seeWork")}
						</Link>
					</div>
				</motion.div>
			</main>
			<Footer />
		</>
	)
}
