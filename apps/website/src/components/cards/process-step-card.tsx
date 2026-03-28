import { cn } from "@repo/ui/lib/utils"
import { IconCode, IconFileDescription, IconMessageCircle, IconRocket } from "@tabler/icons-react"
import type { ProcessStep } from "@/lib/constants"

const STEP_ICONS = [IconMessageCircle, IconFileDescription, IconCode, IconRocket]

export function ProcessStepCard({
	step,
	size = "normal",
}: {
	step: ProcessStep
	size?: "wide" | "normal"
}) {
	const stepIndex = parseInt(step.number, 10) - 1
	const Icon = STEP_ICONS[stepIndex] ?? IconCode

	return (
		<div
			className={cn(
				"group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-b p-7 transition-[border-color,box-shadow] duration-300 hover:border-white/16 hover:shadow-[inset_0_0_60px_rgba(232,80,10,0.04)] md:p-8",
				size === "wide" && "md:flex-row md:items-center md:gap-6 md:p-10",
			)}
		>
			{/* Background number */}
			<div
				className={cn(
					"pointer-events-none absolute font-heading font-extrabold leading-none text-white/3 select-none",
					size === "wide" ? "-top-4 right-6 text-[140px]" : "-top-2 right-4 text-[100px]",
				)}
			>
				{step.number}
			</div>

			{/* Icon container */}
			<div
				className={cn(
					"relative mb-6 flex shrink-0 items-center justify-center rounded-xl bg-djanni-orange/10 transition-colors duration-300 group-hover:bg-djanni-orange/15",
					size === "wide" ? "h-12 w-12 md:mb-0 md:h-16 md:w-16" : "h-12 w-12",
				)}
			>
				<Icon size={size === "wide" ? 28 : 22} className="text-djanni-orange" />
			</div>

			{/* Content */}
			<div className="relative">
				<div
					className={cn("mb-2 font-heading font-bold", size === "wide" ? "text-xl" : "text-base")}
				>
					{step.title}
				</div>
				<div
					className={cn(
						"leading-relaxed text-djanni-gray-light",
						size === "wide" ? "max-w-[420px] text-[15px]" : "text-[13px]",
					)}
				>
					{step.text}
				</div>
			</div>
		</div>
	)
}
