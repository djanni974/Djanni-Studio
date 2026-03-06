"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"
import type { ReactNode } from "react"

const fadeUpVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
}

const noMotionVariants: Variants = {
	hidden: { opacity: 1, y: 0 },
	visible: { opacity: 1, y: 0 },
}

const staggerContainerVariants: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
}

const noStaggerVariants: Variants = {
	hidden: {},
	visible: {},
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
	const prefersReduced = useReducedMotion()
	return (
		<motion.div
			variants={prefersReduced ? noMotionVariants : fadeUpVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
			transition={{ delay }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export function StaggerContainer({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	const prefersReduced = useReducedMotion()
	return (
		<motion.div
			variants={prefersReduced ? noStaggerVariants : staggerContainerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-80px" }}
			className={className}
		>
			{children}
		</motion.div>
	)
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
	const prefersReduced = useReducedMotion()
	return (
		<motion.div variants={prefersReduced ? noMotionVariants : fadeUpVariants} className={className}>
			{children}
		</motion.div>
	)
}
