"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconCheck } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "@/i18n/navigation"
import type { PricingTier } from "@/lib/constants"

export function PricingCard({ tier, onSelect }: { tier: PricingTier; onSelect?: () => void }) {
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

	const ref = useRef<HTMLDivElement>(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (typeof IntersectionObserver === "undefined") {
			setInView(true)
			return
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setInView(true)
					observer.disconnect()
				}
			},
			{ rootMargin: "-60px" },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<Link href="/demande-projet" className="block" onClick={onSelect}>
			<div
				ref={ref}
				className={cn(
					"stagger-container group relative flex h-full flex-col overflow-hidden rounded-xl border border-border p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-10",
					inView && "in-view",
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
				<span
					className={cn(
						"mb-7 inline-block self-start rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
						featured ? "bg-white/20 text-white" : "bg-foreground/8 text-foreground/70",
					)}
				>
					{featured && "⭐ "}
					{badge}
				</span>

				{/* Price label */}
				<div
					className={cn(
						"mb-1 text-xs font-medium uppercase tracking-wide",
						featured ? "text-white/70" : "text-djanni-gray",
					)}
				>
					{priceLabel}
				</div>

				{/* Price */}
				<div
					className={cn(
						"mb-1 font-heading text-5xl font-extrabold leading-none",
						!featured && "text-foreground",
					)}
				>
					{price} <span className="text-2xl font-normal">{priceSuffix}</span>
				</div>

				{/* Price note */}
				<div className={cn("mb-7 text-[13px]", featured ? "text-white/70" : "text-djanni-gray")}>
					{priceNote}
				</div>

				{/* Plan name */}
				<div className={cn("mb-2 font-heading text-xl font-bold", !featured && "text-foreground")}>
					{name}
				</div>

				{/* Description */}
				<div
					className={cn(
						"mb-2 text-sm leading-relaxed",
						featured ? "text-white/80" : "text-djanni-gray",
					)}
				>
					{description}
				</div>

				{/* Benefit line */}
				<p
					className={cn("mb-7 text-xs italic", featured ? "text-white/60" : "text-djanni-gray/70")}
				>
					{benefitLine}
				</p>

				{/* Popular note (featured only) */}
				{featured && popularNote && (
					<div className="mb-7 rounded-md bg-white/15 px-3 py-2 text-center text-xs font-medium text-white">
						{popularNote}
					</div>
				)}

				{/* Features list */}
				<ul className="flex flex-col gap-2.5">
					{features.map((feature) => (
						<li
							key={feature}
							className={cn(
								"flex items-center gap-2.5 text-sm",
								featured ? "text-white/85" : "text-djanni-gray-light",
							)}
						>
							<span className="flex shrink-0 items-center justify-center">
								<IconCheck
									size={14}
									className={cn(featured ? "text-white" : "text-djanni-orange")}
									stroke={2.5}
								/>
							</span>
							{feature}
						</li>
					))}
				</ul>

				{/* CTA */}
				<div className="mt-9">
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
				</div>
			</div>
		</Link>
	)
}
