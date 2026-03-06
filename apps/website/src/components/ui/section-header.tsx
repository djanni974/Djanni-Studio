import { cn } from "@repo/ui/lib/utils"

export function SectionHeader({
	tag,
	title,
	subtitle,
	className,
	align = "left",
}: {
	tag: string
	title: string
	subtitle?: string
	className?: string
	align?: "left" | "center"
}) {
	return (
		<div className={cn(align === "center" && "text-center", className)}>
			<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
				{tag}
			</span>
			<h2 className="font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight">
				{title}
			</h2>
			{subtitle && (
				<p
					className={cn(
						"mt-5 max-w-[500px] text-[17px] font-light leading-relaxed text-djanni-gray-light",
						align === "center" && "mx-auto",
					)}
				>
					{subtitle}
				</p>
			)}
		</div>
	)
}
