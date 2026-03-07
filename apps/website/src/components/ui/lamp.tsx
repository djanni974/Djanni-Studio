"use client"

import { cn } from "@repo/ui/lib/utils"
import { motion } from "motion/react"

export function LampEffect({ className }: { className?: string }) {
	return (
		<div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
			{/* Animated lamp arms */}
			<motion.div
				initial={{ opacity: 0.5, width: "8rem" }}
				whileInView={{ opacity: 1, width: "20rem" }}
				transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
				viewport={{ once: true }}
				style={{
					backgroundImage:
						"conic-gradient(var(--conic-position), var(--color-djanni-orange) 20%, transparent 80%)",
				}}
				className="bg-linear-to-r absolute inset-auto right-1/2 h-56 w-[20rem] from-djanni-orange/50 via-djanni-orange to-transparent [--conic-position:from_70deg_at_center_top]"
			>
				<div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-(--color-background) mask-[linear-gradient(to_top,white,transparent)]" />
				<div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-(--color-background) mask-[linear-gradient(to_right,white,transparent)]" />
			</motion.div>

			<motion.div
				initial={{ opacity: 0.5, width: "8rem" }}
				whileInView={{ opacity: 1, width: "20rem" }}
				transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
				viewport={{ once: true }}
				style={{
					backgroundImage:
						"conic-gradient(var(--conic-position), transparent 80%, var(--color-djanni-orange) 20%)",
				}}
				className="bg-linear-to-l absolute inset-auto left-1/2 h-56 w-[20rem] from-djanni-orange/50 via-djanni-orange to-transparent [--conic-position:from_290deg_at_center_top]"
			>
				<div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-(--color-background) mask-[linear-gradient(to_left,white,transparent)]" />
				<div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-(--color-background) mask-[linear-gradient(to_top,white,transparent)]" />
			</motion.div>

			{/* Top line */}
			<motion.div
				initial={{ width: "8rem" }}
				whileInView={{ width: "20rem" }}
				transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
				viewport={{ once: true }}
				className="absolute inset-auto z-30 h-0.5 w-[20rem] -translate-y-28 bg-djanni-orange"
			/>

			{/* Glow spread */}
			<motion.div
				initial={{ width: "8rem", height: "0rem" }}
				whileInView={{ width: "20rem", height: "12rem" }}
				transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
				viewport={{ once: true }}
				className="absolute inset-auto z-40 h-48 w-[20rem] -translate-y-50 rounded-full bg-djanni-orange/50 blur-2xl"
			/>

			{/* Compact glow */}
			<motion.div
				initial={{ width: "8rem" }}
				whileInView={{ width: "16rem" }}
				transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
				viewport={{ once: true }}
				className="absolute inset-auto z-50 h-12 w-64 -translate-y-28 rounded-full bg-djanni-orange blur-2xl"
			/>
		</div>
	)
}
