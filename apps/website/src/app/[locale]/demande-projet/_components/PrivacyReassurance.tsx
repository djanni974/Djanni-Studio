import {
	IconLock,
	IconMailOff,
	IconShieldCheck,
	IconTrash,
	type TablerIcon,
} from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const POINT_ICONS: Record<"0" | "1" | "2" | "3", TablerIcon> = {
	"0": IconShieldCheck,
	"1": IconMailOff,
	"2": IconTrash,
	"3": IconLock,
}

const POINT_KEYS = ["0", "1", "2", "3"] as const

export function PrivacyReassurance() {
	const t = useTranslations("projectRequest.privacy")

	return (
		<section className="mx-auto mb-16 max-w-[720px] animate-fade-up in-view">
			<h2 className="text-center font-heading text-lg font-bold leading-tight">{t("title")}</h2>
			<div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
				{POINT_KEYS.map((key) => {
					const Icon = POINT_ICONS[key]
					return (
						<div
							key={key}
							className="flex items-start gap-3 rounded-lg border border-border bg-surface-a/40 p-4"
						>
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-djanni-orange/10 text-djanni-orange">
								<Icon size={18} />
							</div>
							<p className="text-sm leading-snug text-djanni-gray-light">{t(`points.${key}`)}</p>
						</div>
					)
				})}
			</div>
			<p className="mt-5 text-center text-sm">
				<Link
					href="/politique-de-confidentialite"
					className="text-djanni-orange underline-offset-2 transition-colors hover:text-djanni-orange-light hover:underline"
				>
					{t("cta")}
				</Link>
			</p>
		</section>
	)
}
