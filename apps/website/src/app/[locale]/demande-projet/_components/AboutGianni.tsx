import { IconArrowRight, IconUser } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

// TODO DS-25 : ajouter la photo dans apps/website/public/images/team/gianni.webp puis affecter "/images/team/gianni.webp" ici.
const GIANNI_PHOTO_PATH: string | null = null

export function AboutGianni() {
	const t = useTranslations("projectRequest.aboutGianni")

	return (
		<section className="mx-auto mt-10 mb-12 max-w-[720px] animate-fade-up in-view">
			<div className="flex flex-col items-center gap-5 rounded-xl border border-border bg-surface-a/60 p-6 md:flex-row md:items-start md:gap-6 md:p-7">
				<div className="shrink-0">
					{GIANNI_PHOTO_PATH ? (
						<Image
							src={GIANNI_PHOTO_PATH}
							alt={t("photoAlt")}
							width={96}
							height={96}
							className="h-20 w-20 rounded-lg object-cover md:h-24 md:w-24"
						/>
					) : (
						<div
							className="flex h-20 w-20 items-center justify-center rounded-lg bg-surface-b text-djanni-gray md:h-24 md:w-24"
							role="img"
							aria-label={t("photoAlt")}
						>
							<IconUser size={36} aria-hidden="true" />
						</div>
					)}
				</div>
				<div className="text-center md:text-left">
					<h2 className="font-heading text-lg font-bold leading-tight">{t("greeting")}</h2>
					<p className="mt-1 text-sm font-medium text-djanni-orange">{t("tagline")}</p>
					<p className="mt-2 text-sm leading-relaxed text-djanni-gray-light">{t("bio")}</p>
					<Link
						href="/a-propos"
						className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
					>
						{t("cta")}
						<IconArrowRight size={14} />
					</Link>
				</div>
			</div>
		</section>
	)
}
