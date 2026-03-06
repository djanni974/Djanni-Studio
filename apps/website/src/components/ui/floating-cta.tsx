"use client"

import { IconMessageCircle } from "@tabler/icons-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Link } from "@/i18n/navigation"

export function FloatingCta() {
	const t = useTranslations("nav")
	const [visible, setVisible] = useState(false)
	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, "change", (latest) => {
		// Show after scrolling 600px (past the hero)
		setVisible(latest > 600)
	})

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.9 }}
					transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					className="fixed right-5 bottom-5 z-40 md:right-8 md:bottom-8"
				>
					<Link
						href="/demande-projet"
						className="group flex items-center gap-2.5 rounded-full bg-djanni-orange px-5 py-3 text-sm font-medium text-white shadow-[0_4px_20px_rgba(232,80,10,0.4)] transition-all duration-300 hover:bg-djanni-orange-light hover:shadow-[0_4px_30px_rgba(232,80,10,0.5)]"
					>
						<IconMessageCircle
							size={18}
							className="transition-transform duration-300 group-hover:scale-110"
						/>
						<span className="hidden sm:inline">{t("cta")}</span>
					</Link>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
