import { useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/animated-section"

export function PageHeader() {
	const t = useTranslations("projectRequest")

	return (
		<AnimatedSection className="relative mx-auto max-w-[720px]">
			<div className="mb-10 text-center">
				<span className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-djanni-orange">
					<span className="inline-block h-px w-6 bg-djanni-orange" />
					{t("tag")}
					<span className="inline-block h-px w-6 bg-djanni-orange" />
				</span>
				<h1 className="font-heading text-[clamp(28px,5vw,44px)] font-extrabold leading-tight tracking-tight">
					{t("title")}
				</h1>
				<p className="mt-3 text-[15px] text-djanni-gray-light">{t("subtitle")}</p>
			</div>
		</AnimatedSection>
	)
}
