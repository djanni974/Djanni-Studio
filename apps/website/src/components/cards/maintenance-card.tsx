"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { IconCheck } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { trackPlausibleEvent } from "@/lib/plausible"
import type { MaintenanceTier } from "@/lib/pricing"

export function MaintenanceCard({ tier }: { tier: MaintenanceTier }) {
	const t = useTranslations("maintenance")
	const tt = useTranslations(`maintenance.tiers.${tier.id}`)
	const features = tt.raw("features") as string[]
	const name = tt("name")

	return (
		<Card highlighted={tier.highlighted} className="relative">
			{tier.highlighted ? (
				<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-djanni-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white shadow-[0_4px_14px_rgba(232,80,10,0.35)]">
					{t("recommendedBadge")}
				</span>
			) : null}

			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{tt("tagline")}</CardDescription>
				<div className="mt-4 flex items-baseline gap-1">
					<span className="font-heading text-5xl font-extrabold leading-none text-foreground">
						{tier.monthlyPriceHT} €
					</span>
					<span className="text-base font-normal text-djanni-gray">{t("perMonth")}</span>
				</div>
			</CardHeader>

			<CardContent>
				<ul className="flex flex-col gap-2.5">
					{features.map((feature) => (
						<li key={feature} className="flex items-start gap-2.5 text-sm text-djanni-gray-light">
							<IconCheck size={16} stroke={2.5} className="mt-0.5 shrink-0 text-djanni-orange" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>

			<CardFooter>
				<Link
					href="/demande-projet"
					data-tier={tier.id}
					onClick={() => trackPlausibleEvent("clic_palier_maintenance", { palier: tier.id })}
					className="block rounded-md border border-border bg-foreground/4 py-3.5 text-center text-sm font-medium text-foreground transition-colors hover:border-djanni-orange/40 hover:bg-djanni-orange hover:text-white"
				>
					{t("ctaSelect", { tier: name })}
				</Link>
			</CardFooter>
		</Card>
	)
}
