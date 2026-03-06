"use client"

import { cn } from "@repo/ui/lib/utils"
import { useLocale } from "next-intl"
import { useTransition } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

const LOCALE_LABELS: Record<string, string> = {
	fr: "FR",
	en: "EN",
	br: "BR",
}

export function LanguageSwitcher() {
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	function switchLocale(newLocale: string) {
		startTransition(() => {
			router.replace(pathname, { locale: newLocale, scroll: false })
		})
	}

	return (
		<div
			className={cn(
				"relative flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5 shadow-sm transition-opacity",
				isPending && "opacity-60",
			)}
		>
			{routing.locales.map((loc) => (
				<button
					key={loc}
					type="button"
					onClick={() => switchLocale(loc)}
					disabled={loc === locale}
					className={cn(
						"relative z-10 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200",
						loc === locale ? "text-white" : "text-foreground/60 hover:text-foreground",
					)}
					aria-label={`Switch to ${LOCALE_LABELS[loc]}`}
				>
					{loc === locale && (
						<span className="absolute inset-0 rounded-md bg-djanni-orange shadow-[0_1px_8px_rgba(232,80,10,0.35)]" />
					)}
					<span className="relative">{LOCALE_LABELS[loc]}</span>
				</button>
			))}
		</div>
	)
}
