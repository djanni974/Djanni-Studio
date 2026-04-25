import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const ARTISANE_IMAGE = "/projects/artisane-dinard.webp"

export function RecentWork() {
	const t = useTranslations("projectRequest.recentWork")

	return (
		<section className="mx-auto mb-12 max-w-[720px] animate-fade-up in-view">
			<span className="mb-3 block text-center text-xs font-medium uppercase tracking-widest text-djanni-orange md:text-left">
				{t("tag")}
			</span>
			<Link
				href="/realisations/artisane-dinard"
				className="group flex flex-col gap-4 rounded-xl border border-border bg-surface-a/60 p-5 transition-all duration-200 hover:border-djanni-orange/40 hover:bg-surface-a md:flex-row md:items-center md:gap-6 md:p-6"
			>
				<Image
					src={ARTISANE_IMAGE}
					alt={t("imageAlt")}
					width={256}
					height={192}
					loading="lazy"
					className="h-32 w-full rounded-lg object-cover md:h-24 md:w-32"
				/>
				<div className="flex-1">
					<h3 className="font-heading text-lg font-bold leading-tight">{t("title")}</h3>
					<p className="mt-1 text-sm text-djanni-gray-light">{t("subtitle")}</p>
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
