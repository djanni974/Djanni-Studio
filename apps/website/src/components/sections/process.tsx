"use client"

import { useTranslations } from "next-intl"
import { ProcessStepCard } from "@/components/cards/process-step-card"
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import type { ProcessStep } from "@/lib/constants"

const BENTO_SIZES: ("wide" | "normal")[] = ["wide", "normal", "normal", "wide"]

export function Process() {
	const t = useTranslations("process")

	const steps: ProcessStep[] = [0, 1, 2, 3].map((i) => ({
		number: t(`steps.${i}.number`),
		title: t(`steps.${i}.title`),
		text: t(`steps.${i}.text`),
	}))

	return (
		<section id="process" className="px-5 py-20 md:px-12">
			<SectionHeader tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

			<StaggerContainer className="mx-auto mt-16 grid max-w-[1100px] gap-4 md:grid-cols-3">
				{steps.map((step, i) => (
					<StaggerItem
						key={step.number}
						className={BENTO_SIZES[i] === "wide" ? "md:col-span-2" : ""}
					>
						<ProcessStepCard step={step} size={BENTO_SIZES[i]} />
					</StaggerItem>
				))}
			</StaggerContainer>
		</section>
	)
}
