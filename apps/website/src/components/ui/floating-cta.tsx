"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconMessageCircle } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Link } from "@/i18n/navigation"

export function FloatingCta() {
	const t = useTranslations("nav")
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<div
			className={cn(
				"fixed right-5 bottom-5 z-40 transition-all duration-300 ease-out md:right-8 md:bottom-8",
				visible
					? "visible translate-y-0 scale-100 opacity-100"
					: "invisible translate-y-4 scale-90 opacity-0",
			)}
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
		</div>
	)
}
