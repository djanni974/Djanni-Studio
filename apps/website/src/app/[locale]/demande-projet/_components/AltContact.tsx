import { IconArrowRight, IconCalendar, IconPhone } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { CalPopupButton } from "@/components/ui/cal-popup-button"

export function AltContact() {
	const t = useTranslations("projectRequest.altContact")

	return (
		<section className="mx-auto mt-16 mb-12 max-w-[720px] animate-fade-up in-view">
			<div className="mb-6 text-center">
				<h2 className="font-heading text-xl font-bold leading-tight md:text-2xl">{t("title")}</h2>
				<p className="mt-2 text-sm text-djanni-gray-light">{t("subtitle")}</p>
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<a
					href="tel:+33749547498"
					className="group flex flex-col items-start gap-3 rounded-xl border-2 border-border bg-surface-a/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-djanni-orange hover:bg-surface-a"
				>
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-b text-djanni-orange transition-colors group-hover:bg-djanni-orange/10">
						<IconPhone size={22} />
					</div>
					<h3 className="font-heading text-base font-bold">{t("phone.title")}</h3>
					<span className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-djanni-orange">
						{t("phone.number")}
					</span>
					<p className="text-xs text-djanni-gray-light">{t("phone.hours")}</p>
				</a>

				<CalPopupButton
					className="group flex w-full flex-col items-start gap-3 rounded-xl border-2 border-border bg-surface-a/60 p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-djanni-orange hover:bg-surface-a"
					aria-label={t("calcom.title")}
				>
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-b text-djanni-orange transition-colors group-hover:bg-djanni-orange/10">
						<IconCalendar size={22} />
					</div>
					<h3 className="font-heading text-base font-bold">{t("calcom.title")}</h3>
					<span className="inline-flex items-center gap-1.5 font-heading text-base font-bold text-foreground transition-colors group-hover:text-djanni-orange">
						{t("calcom.cta")}
						<IconArrowRight
							size={16}
							className="transition-transform duration-300 group-hover:translate-x-0.5"
						/>
					</span>
					<p className="text-xs text-djanni-gray-light">{t("calcom.subtitle")}</p>
				</CalPopupButton>
			</div>
		</section>
	)
}
