import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const ARTISANE_IMAGE = "/projects/artisane-dinard.webp"

export function RecentWork() {
	const t = useTranslations("projectRequest.recentWork")

	return (
		<section className="mx-auto mb-12 max-w-[720px] animate-fade-up in-view pt-8 md:pt-12">
			<span className="mb-4 block text-center text-xs font-medium uppercase tracking-widest text-djanni-orange md:text-left">
				{t("tag")}
			</span>
			<Link
				href="/realisations/artisane-dinard"
				className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface-a/60 transition-all duration-200 hover:border-djanni-orange/40 hover:bg-surface-a md:flex-row"
			>
				<div className="relative h-44 w-full shrink-0 overflow-hidden md:h-auto md:min-h-[160px] md:w-56">
					<Image
						src={ARTISANE_IMAGE}
						alt={t("imageAlt")}
						fill
						sizes="(min-width: 768px) 224px, 100vw"
						loading="lazy"
						className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</div>
				<div className="flex flex-1 flex-col justify-center p-5 md:p-6">
					<h3 className="font-heading text-lg font-bold leading-tight">{t("title")}</h3>
					<p className="mt-1.5 text-sm text-djanni-gray-light">{t("subtitle")}</p>
					<span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-djanni-orange transition-colors group-hover:text-djanni-orange-light">
						{t("cta")}
						<IconArrowRight
							size={14}
							className="transition-transform duration-300 group-hover:translate-x-0.5"
						/>
					</span>
				</div>
			</Link>
		</section>
	)
}
