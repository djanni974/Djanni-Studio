"use client"

import { cn } from "@repo/ui/lib/utils"
import { useEffect, useRef, useState } from "react"

export function LampEffect({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (typeof IntersectionObserver === "undefined") {
			setInView(true)
			return
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setInView(true)
					observer.disconnect()
				}
			},
			{ rootMargin: "-80px" },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className={cn(
				"animate-lamp relative flex items-center justify-center overflow-hidden",
				inView && "in-view",
				className,
			)}
		>
			{/* Left lamp arm */}
			<div
				style={{
					backgroundImage:
						"conic-gradient(var(--conic-position), var(--color-djanni-orange) 20%, transparent 80%)",
				}}
				className="lamp-arm bg-linear-to-r absolute inset-auto right-1/2 h-56 w-[20rem] from-djanni-orange/50 via-djanni-orange to-transparent [--conic-position:from_70deg_at_center_top]"
			>
				<div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-(--color-background) mask-[linear-gradient(to_top,white,transparent)]" />
				<div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-(--color-background) mask-[linear-gradient(to_right,white,transparent)]" />
			</div>

			{/* Right lamp arm */}
			<div
				style={{
					backgroundImage:
						"conic-gradient(var(--conic-position), transparent 80%, var(--color-djanni-orange) 20%)",
				}}
				className="lamp-arm bg-linear-to-l absolute inset-auto left-1/2 h-56 w-[20rem] from-djanni-orange/50 via-djanni-orange to-transparent [--conic-position:from_290deg_at_center_top]"
			>
				<div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-(--color-background) mask-[linear-gradient(to_left,white,transparent)]" />
				<div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-(--color-background) mask-[linear-gradient(to_top,white,transparent)]" />
			</div>

			{/* Top line */}
			<div className="lamp-line absolute inset-auto z-30 h-0.5 w-[20rem] -translate-y-28 bg-djanni-orange" />

			{/* Glow spread */}
			<div className="lamp-glow absolute inset-auto z-40 h-48 w-[20rem] -translate-y-50 rounded-full bg-djanni-orange/50 blur-2xl" />

			{/* Compact glow */}
			<div className="lamp-compact absolute inset-auto z-50 h-12 w-64 -translate-y-28 rounded-full bg-djanni-orange blur-2xl" />
		</div>
	)
}
