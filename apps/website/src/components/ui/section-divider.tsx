import { cn } from "@repo/ui/lib/utils"

export function SectionDivider({ className }: { className?: string }) {
	return (
		<div
			className={cn("h-px w-full", className)}
			style={{
				background:
					"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)",
			}}
		/>
	)
}
