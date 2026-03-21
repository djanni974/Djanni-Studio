"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconCheck } from "@tabler/icons-react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { Link } from "@/i18n/navigation"
import type { PricingTier } from "@/lib/constants"

const cardVariants: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.06, delayChildren: 0.1 },
	},
}

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
}

const priceVariants: Variants = {
	hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		scale: 1,
		filter: "blur(0px)",
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
}

const checkVariants: Variants = {
	hidden: { opacity: 0, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { type: "spring", stiffness: 500, damping: 25 },
	},
}

const noMotion: Variants = {
	hidden: { opacity: 1 },
	visible: { opacity: 1 },
}

export function PricingCard({ tier }: { tier: PricingTier }) {
	const {
		badge,
		priceLabel,
		price,
		priceSuffix,
		priceNote,
		name,
		description,
		benefitLine,
		features,
		ctaLabel,
		featured,
		popularNote,
	} = tier
	const prefersReduced = useReducedMotion()
	const noAnim = !!prefersReduced

	return (
		<Link href="/demande-projet" className="block">
			<motion.div
				variants={noAnim ? noMotion : cardVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-60px" }}
				className={cn(
					"group relative flex h-full flex-col overflow-hidden rounded-xl border border-border p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-10",
					featured
						? "bg-djanni-orange hover:border-white/20"
						: "bg-linear-to-b from-surface-c to-surface-b hover:border-djanni-orange/30",
				)}
			>
				{/* Hover shine sweep */}
				<div
					className={cn(
						"pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] transition-transform duration-700 ease-out group-hover:translate-x-full",
						featured
							? "bg-linear-to-r from-transparent via-white/10 to-transparent"
							: "bg-linear-to-r from-transparent via-djanni-orange/3 to-transparent",
					)}
				/>

				{/* Featured glow */}
				{featured && (
					<div className="pointer-events-none absolute -inset-px -z-10 animate-pulse rounded-xl bg-linear-to-b from-djanni-orange/20 to-transparent blur-xl" />
				)}

				{/* Badge */}
				<motion.span
					variants={noAnim ? noMotion : itemVariants}
					className={cn(
						"mb-7 inline-block self-start rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
						featured ? "bg-white/20 text-white" : "bg-foreground/8 text-foreground/70",
					)}
				>
					{featured && "⭐ "}
					{badge}
				</motion.span>

				{/* Price label */}
				<motion.div
					variants={noAnim ? noMotion : itemVariants}
					className={cn(
						"mb-1 text-xs font-medium uppercase tracking-wide",
						featured ? "text-white/70" : "text-djanni-gray",
					)}
				>
					{priceLabel}
				</motion.div>

				{/* Price — scale + blur entrance */}
				<motion.div
					variants={noAnim ? noMotion : priceVariants}
					className={cn(
						"mb-1 font-heading text-5xl font-extrabold leading-none",
						!featured && "text-foreground",
					)}
				>
					{price} <span className="text-2xl font-normal">{priceSuffix}</span>
				</motion.div>

				{/* Price note */}
				<motion.div
					variants={noAnim ? noMotion : itemVariants}
					className={cn("mb-7 text-[13px]", featured ? "text-white/70" : "text-djanni-gray")}
				>
					{priceNote}
				</motion.div>

				{/* Plan name */}
				<motion.div
					variants={noAnim ? noMotion : itemVariants}
					className={cn("mb-2 font-heading text-xl font-bold", !featured && "text-foreground")}
				>
					{name}
				</motion.div>

				{/* Description */}
				<motion.div
					variants={noAnim ? noMotion : itemVariants}
					className={cn(
						"mb-2 text-sm leading-relaxed",
						featured ? "text-white/80" : "text-djanni-gray",
					)}
				>
					{description}
				</motion.div>

				{/* Benefit line */}
				<motion.p
					variants={noAnim ? noMotion : itemVariants}
					className={cn("mb-7 text-xs italic", featured ? "text-white/60" : "text-djanni-gray/70")}
				>
					{benefitLine}
				</motion.p>

				{/* Popular note (featured only) */}
				{featured && popularNote && (
					<motion.div
						variants={noAnim ? noMotion : itemVariants}
						className="mb-7 rounded-md bg-white/15 px-3 py-2 text-center text-xs font-medium text-white"
					>
						{popularNote}
					</motion.div>
				)}

				{/* Features list — each item staggers in */}
				<ul className="flex flex-col gap-2.5">
					{features.map((feature) => (
						<motion.li
							key={feature}
							variants={noAnim ? noMotion : itemVariants}
							className={cn(
								"flex items-center gap-2.5 text-sm",
								featured ? "text-white/85" : "text-djanni-gray-light",
							)}
						>
							<motion.span
								variants={noAnim ? noMotion : checkVariants}
								className="flex shrink-0 items-center justify-center"
							>
								<IconCheck
									size={14}
									className={cn(featured ? "text-white" : "text-djanni-orange")}
									stroke={2.5}
								/>
							</motion.span>
							{feature}
						</motion.li>
					))}
				</ul>

				{/* CTA */}
				<motion.div variants={noAnim ? noMotion : itemVariants} className="mt-9">
					<span
						className={cn(
							"block rounded-md py-3.5 text-center text-sm font-medium transition-all duration-300",
							featured
								? "bg-white text-djanni-orange group-hover:bg-djanni-cream group-hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
								: "border border-border text-foreground group-hover:border-djanni-orange/40 group-hover:bg-foreground/4 group-hover:shadow-[0_4px_20px_rgba(232,80,10,0.08)]",
						)}
					>
						{ctaLabel}
					</span>
				</motion.div>
			</motion.div>
		</Link>
	)
}
