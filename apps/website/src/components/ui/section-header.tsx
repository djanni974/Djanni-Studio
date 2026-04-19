import { cn } from "@repo/ui/lib/utils"

export function SectionHeader({
	tag,
	title,
	subtitle,
	className,
	align = "left",
	as: Heading = "h2",
	accent = false,
}: {
	tag: string
	title: string
	subtitle?: string
	className?: string
	align?: "left" | "center"
	as?: "h1" | "h2"
	accent?: boolean
}) {
	const endsWithEllipsis = title.endsWith("...")
	const displayTitle = !endsWithEllipsis && title.endsWith(".") ? title.slice(0, -1) : title

	return (
		<div className={cn(align === "center" && "text-center", className)}>
			<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
				{tag}
			</span>
			<Heading className="font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight">
				{displayTitle}
				{!endsWithEllipsis && <span className="text-djanni-orange">.</span>}
			</Heading>
			{accent && (
				<div
					className={cn(
						"mt-5 h-[3px] w-12 rounded-full bg-djanni-orange",
						align === "center" && "mx-auto",
					)}
				/>
			)}
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
