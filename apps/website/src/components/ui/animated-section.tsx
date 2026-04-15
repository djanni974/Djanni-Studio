"use client"

import { cn } from "@repo/ui/lib/utils"
import { type ReactNode, useEffect, useRef, useState } from "react"

function useInView<T extends Element>(rootMargin = "-80px") {
	const ref = useRef<T | null>(null)
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
			{ rootMargin },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [rootMargin])

	return { ref, inView }
}

export function AnimatedSection({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode
	className?: string
	delay?: number
}) {
	const { ref, inView } = useInView<HTMLDivElement>()
	return (
		<div
			ref={ref}
			className={cn("animate-fade-up", inView && "in-view", className)}
			style={delay ? ({ "--fade-up-delay": `${delay}s` } as React.CSSProperties) : undefined}
		>
			{children}
		</div>
	)
}

export function StaggerContainer({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	const { ref, inView } = useInView<HTMLDivElement>()
	return (
		<div ref={ref} className={cn("stagger-container", inView && "in-view", className)}>
			{children}
		</div>
	)
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={className}>{children}</div>
}
