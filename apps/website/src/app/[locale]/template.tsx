"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

export default function Template({ children }: { children: ReactNode }) {
	const prefersReduced = useReducedMotion()

	return (
		<motion.div
			initial={prefersReduced ? false : { opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	)
}
