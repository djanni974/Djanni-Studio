"use client"

import { cn } from "@repo/ui/lib/utils"
import type { ReactNode } from "react"

export function AuroraBackground({
	children,
	className,
	showRadialGradient = true,
}: {
	children?: ReactNode
	className?: string
	showRadialGradient?: boolean
}) {
	return (
		<div className={cn("relative", className)}>
			<div className="absolute inset-0 overflow-hidden">
				<div
					className={cn(
						"pointer-events-none absolute -inset-[10px] opacity-50",
						"[--aurora:repeating-linear-gradient(100deg,var(--color-djanni-orange)_10%,var(--color-djanni-orange-light)_15%,transparent_20%,transparent_25%,var(--color-djanni-orange)_30%)]",
						"[--dark-gradient:repeating-linear-gradient(100deg,var(--color-djanni-black)_0%,var(--color-djanni-black)_7%,transparent_10%,transparent_12%,var(--color-djanni-black)_16%)]",
						"[background-image:var(--dark-gradient),var(--aurora)]",
						"bg-size-[300%,200%]",
						"bg-position-[50%_50%,50%_50%]",
						"animate-aurora",
						"after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:bg-size-[200%,100%] after:bg-fixed after:mix-blend-difference after:content-['']",
						"blur-[10px] after:blur-[10px] invert-0 after:invert",
					)}
				/>
			</div>

			{showRadialGradient && (
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_80%)]" />
			)}

			{/* Bottom fade into next section */}
			<div className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-linear-to-b from-transparent to-(--color-background)" />

			<div className="relative">{children}</div>
		</div>
	)
}
