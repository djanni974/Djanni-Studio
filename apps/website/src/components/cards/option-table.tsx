"use client"

import { useTranslations } from "next-intl"
import { trackPlausibleEvent } from "@/lib/plausible"
import type { OptionCategory, OptionUnit } from "@/lib/pricing"

export function OptionTable({ category }: { category: OptionCategory }) {
	const t = useTranslations("options")
	const categoryName = t(`categories.${category.id}`)
	const colOption = t("columns.option")
	const colPrice = t("columns.price")
	const formatUnit = (unit: OptionUnit) => t(`units.${unit}`)

	return (
		<section
			aria-labelledby={`category-${category.id}`}
			onMouseEnter={() => trackPlausibleEvent("clic_categorie_options", { categorie: category.id })}
		>
			<h2
				id={`category-${category.id}`}
				className="mb-5 font-heading text-2xl font-bold tracking-tight md:text-3xl"
			>
				{categoryName}
			</h2>
			<div className="overflow-x-auto rounded-2xl border border-border bg-surface-b">
				<table
					className="w-full border-collapse text-sm"
					aria-label={`${t("title")} - ${categoryName}`}
				>
					<caption className="sr-only">
						{t("title")} - {categoryName}
					</caption>
					<thead>
						<tr className="border-b border-border">
							<th
								scope="col"
								className="px-6 py-4 text-left font-medium uppercase tracking-[0.12em] text-djanni-gray text-[11px]"
							>
								{colOption}
							</th>
							<th
								scope="col"
								className="px-6 py-4 text-right font-medium uppercase tracking-[0.12em] text-djanni-gray text-[11px]"
							>
								{colPrice}
							</th>
						</tr>
					</thead>
					<tbody>
						{category.items.map((item, index) => (
							<tr
								key={item.id}
								data-category={category.id}
								className={
									index !== category.items.length - 1 ? "border-b border-border/60" : ""
								}
							>
								<td className="px-6 py-4 text-djanni-gray-light">{t(`items.${item.id}`)}</td>
								<td className="whitespace-nowrap px-6 py-4 text-right font-medium text-foreground">
									{item.priceHT} €<span className="text-djanni-gray">{formatUnit(item.unit)}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
