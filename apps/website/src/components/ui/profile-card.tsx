"use client"

import { useTranslations } from "next-intl"
import { SKILLS } from "@/lib/constants"

export function ProfileCard() {
	const t = useTranslations("profileCard")

	return (
		<div className="rounded-xl border border-border bg-card p-8 md:p-10">
			{/* Header */}
			<div className="mb-7 flex items-center gap-4 border-b border-border pb-7">
				<div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-linear-to-br from-djanni-orange to-[#c44008] font-heading text-xl font-extrabold text-white">
					G
				</div>
				<div>
					<div className="font-heading text-base font-bold">{t("name")}</div>
					<div className="text-[13px] text-djanni-gray">{t("role")}</div>
				</div>
			</div>

			{/* Skills */}
			<div className="mb-7 flex flex-wrap gap-2">
				{SKILLS.map((skill) => (
					<span
						key={skill}
						className="rounded-full border border-border bg-white/6 px-3 py-1 text-xs text-djanni-gray-light"
					>
						{skill}
					</span>
				))}
			</div>

			{/* Quote */}
			<p className="border-l-2 border-djanni-orange pl-4 text-sm italic leading-relaxed text-djanni-gray-light">
				&ldquo;{t("quote")}&rdquo;
			</p>
		</div>
	)
}
