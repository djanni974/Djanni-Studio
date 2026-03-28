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
	const endsWithEllipsis = title.endsWith("...")
	const displayTitle = !endsWithEllipsis && title.endsWith(".") ? title.slice(0, -1) : title

	return (
		<div className={cn(align === "center" && "text-center", className)}>
			<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
				{tag}
			</span>
			<h2 className="font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight">
				{displayTitle}
				{!endsWithEllipsis && <span className="text-djanni-orange">.</span>}
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
