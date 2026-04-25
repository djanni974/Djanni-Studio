import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { BrowserMockup } from "@/components/ui/browser-mockup"
import { Link } from "@/i18n/navigation"

const ARTISANE_IMAGE = "/projects/artisane-dinard.webp"
const ARTISANE_ACCENT = "#8B7D56"

export function RecentWork() {
	const t = useTranslations("projectRequest.recentWork")

	return (
		<section className="mx-auto mb-12 max-w-[720px] animate-fade-up in-view pt-12 md:pt-16">
			<div className="mb-5 text-center">
				<span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-djanni-orange">
					<span className="inline-block h-px w-6 bg-djanni-orange" />
					{t("tag")}
					<span className="inline-block h-px w-6 bg-djanni-orange" />
				</span>
			</div>

			<Link
				href="/realisations/artisane-dinard"
				className="group block overflow-hidden rounded-xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
			>
				<div className="relative flex aspect-video items-center justify-center overflow-hidden bg-linear-to-br from-[#161614] to-[#1e1e1c] p-6">
					<div
						className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-[60px] transition-opacity duration-300 group-hover:opacity-30"
						style={{ background: ARTISANE_ACCENT }}
					/>
					<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

					<BrowserMockup
						className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
						noPadding
					>
						<div className="relative aspect-video w-full">
							<Image
								src={ARTISANE_IMAGE}
								alt={t("imageAlt")}
								fill
								loading="lazy"
								sizes="(min-width: 768px) 640px, 90vw"
								className="object-cover object-top"
							/>
						</div>
					</BrowserMockup>
				</div>

				<div className="relative border-t border-border">
					<div
						className="absolute top-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
						style={{ background: ARTISANE_ACCENT }}
					/>
					<div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6">
						<div className="min-w-0 flex-1">
							<div className="font-heading text-base font-bold leading-tight">{t("title")}</div>
							<div className="mt-0.5 text-xs text-djanni-gray-light">{t("subtitle")}</div>
						</div>
						<span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-djanni-orange transition-colors group-hover:text-djanni-orange-light">
							<span className="hidden sm:inline">{t("cta")}</span>
							<span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
								<IconArrowRight
									size={14}
									className="transition-transform duration-300 group-hover:-rotate-45"
								/>
							</span>
						</span>
					</div>
				</div>
			</Link>
		</section>
	)
}
