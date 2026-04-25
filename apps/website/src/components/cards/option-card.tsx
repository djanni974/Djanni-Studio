"use client"

import { cn } from "@repo/ui/lib/utils"
import {
	IconBolt,
	IconHeartHandshake,
	IconPencil,
	IconPhoto,
	IconSearch,
} from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { trackPlausibleEvent } from "@/lib/plausible"
import type { OptionCategory, OptionCategoryId, OptionUnit } from "@/lib/pricing"

const CATEGORY_ICONS: Record<OptionCategoryId, typeof IconPencil> = {
	contenus: IconPencil,
	visuel: IconPhoto,
	seo: IconSearch,
	fonctionnalites: IconBolt,
	accompagnement: IconHeartHandshake,
}

const UNIT_BADGE_STYLES: Record<OptionUnit, string> = {
	unique: "bg-foreground/8 text-foreground/70",
	mensuel: "bg-djanni-orange/15 text-djanni-orange",
	par_unite: "bg-foreground/8 text-djanni-gray-light",
}

export function OptionCard({ category }: { category: OptionCategory }) {
	const t = useTranslations("options")
	const tBadges = useTranslations("options.unitBadges")
	const categoryName = t(`categories.${category.id}`)
	const Icon = CATEGORY_ICONS[category.id]

	const sectionRef = useRef<HTMLElement>(null)
	const firedRef = useRef(false)

	useEffect(() => {
		const el = sectionRef.current
		if (!el) return
		if (typeof IntersectionObserver === "undefined") return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && !firedRef.current) {
					firedRef.current = true
					trackPlausibleEvent("clic_categorie_options", { categorie: category.id })
					observer.disconnect()
				}
			},
			{ threshold: 0.4 },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [category.id])

	const formatUnit = (unit: OptionUnit) => t(`units.${unit}`)
	const formatBadge = (unit: OptionUnit) => tBadges(unit)

	return (
		<section ref={sectionRef} aria-labelledby={`category-${category.id}`}>
			{/* Category header */}
			<div className="mb-7 flex items-center gap-4">
				<div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-a">
					<Icon size={20} className="text-djanni-orange" />
				</div>
				<h2
					id={`category-${category.id}`}
					className="font-heading text-2xl font-bold tracking-tight md:text-3xl"
				>
					{categoryName}
				</h2>
			</div>

			{/* Items grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{category.items.map((item) => (
					<article
						key={item.id}
						data-category={category.id}
						className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-b p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-djanni-orange/30 hover:shadow-[0_8px_30px_rgba(232,80,10,0.08)]"
					>
						{/* Hover shine sweep */}
						<div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-linear-to-r from-transparent via-djanni-orange/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

						{/* Unit badge */}
						<span
							className={cn(
								"mb-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
								UNIT_BADGE_STYLES[item.unit],
							)}
						>
							{formatBadge(item.unit)}
						</span>

						{/* Item name */}
						<p className="mb-5 flex-1 text-sm leading-relaxed text-djanni-gray-light">
							{t(`items.${item.id}`)}
						</p>

						{/* Price */}
						<div className="mt-auto flex items-baseline gap-1">
							<span className="font-heading text-2xl font-bold leading-none text-foreground">
								{item.priceHT} €
							</span>
							{item.unit !== "unique" && (
								<span className="text-sm font-normal text-djanni-gray">
									{formatUnit(item.unit)}
								</span>
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
