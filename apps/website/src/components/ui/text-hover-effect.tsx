"use client"

import { cn } from "@repo/ui/lib/utils"
import { type MouseEvent, type TouchEvent, useCallback, useEffect, useRef, useState } from "react"

interface TextHoverEffectProps {
	text: string
	className?: string
}

export function TextHoverEffect({ text, className }: TextHoverEffectProps) {
	const svgRef = useRef<SVGSVGElement>(null)
	const [hovered, setHovered] = useState(false)
	const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const el = svgRef.current
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

	const updateMaskPosition = useCallback((clientX: number, clientY: number) => {
		if (!svgRef.current) return
		const rect = svgRef.current.getBoundingClientRect()
		const x = ((clientX - rect.left) / rect.width) * 100
		const y = ((clientY - rect.top) / rect.height) * 100
		setMaskPosition({ cx: `${x}%`, cy: `${y}%` })
	}, [])

	const handleMouseMove = useCallback(
		(e: MouseEvent<SVGSVGElement>) => {
			updateMaskPosition(e.clientX, e.clientY)
		},
		[updateMaskPosition],
	)

	const handleTouchMove = useCallback(
		(e: TouchEvent<SVGSVGElement>) => {
			const touch = e.touches[0]
			if (touch) updateMaskPosition(touch.clientX, touch.clientY)
		},
		[updateMaskPosition],
	)

	const textStyle = {
		fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif",
		fontSize: "140px",
		fontWeight: 800,
	}

	return (
		<svg
			ref={svgRef}
			viewBox="0 0 1000 250"
			preserveAspectRatio="xMidYMid meet"
			aria-hidden="true"
			className={cn("w-full select-none", className)}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onTouchStart={() => setHovered(true)}
			onTouchEnd={() => setHovered(false)}
			onTouchMove={handleTouchMove}
		>
			<defs>
				{/* Brand gradient orange */}
				<linearGradient id="footer-text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#e8500a" />
					<stop offset="50%" stopColor="#f07040" />
					<stop offset="100%" stopColor="#e8500a" />
				</linearGradient>

				{/* Radial gradient for the cursor-tracking mask */}
				<radialGradient
					id="footer-reveal-mask"
					gradientUnits="userSpaceOnUse"
					cx={maskPosition.cx}
					cy={maskPosition.cy}
					r={hovered ? 250 : 0}
				>
					<stop offset="0%" stopColor="white" />
					<stop offset="100%" stopColor="black" />
				</radialGradient>

				<mask id="footer-text-mask">
					<rect width="100%" height="100%" fill="black" />
					<circle
						cx={maskPosition.cx}
						cy={maskPosition.cy}
						r={hovered ? 250 : 0}
						fill="url(#footer-reveal-mask)"
						style={{ transition: "r 0.4s ease-out" }}
					/>
				</mask>
			</defs>

			{/* Layer 1: Base outline, always visible */}
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="central"
				fill="none"
				stroke="var(--color-djanni-gray, #6b6860)"
				strokeWidth="1"
				style={textStyle}
			>
				{text}
			</text>

			{/* Layer 2: Animated stroke draw */}
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="central"
				fill="none"
				stroke="url(#footer-text-gradient)"
				strokeWidth="1"
				style={textStyle}
				className={cn("animate-stroke-draw", inView && "in-view")}
			>
				{text}
			</text>

			{/* Layer 3: Gradient fill, revealed by cursor mask */}
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="central"
				fill="url(#footer-text-gradient)"
				style={textStyle}
				mask="url(#footer-text-mask)"
			>
				{text}
			</text>
		</svg>
	)
}
