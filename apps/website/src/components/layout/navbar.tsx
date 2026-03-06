"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconMenu2, IconMoon, IconPhone, IconSun, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Link } from "@/i18n/navigation"
import { LanguageSwitcher } from "./language-switcher"

const NAV_KEYS = [
	{ key: "realisations", href: "/realisations" },
	{ key: "offres", href: "/#offres" },
	{ key: "about", href: "/a-propos" },
	{ key: "blog", href: "/blog" },
] as const

export function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { scrollY } = useScroll()
	const { theme, setTheme } = useTheme()
	const t = useTranslations("nav")

	useEffect(() => setMounted(true), [])

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 40)
	})

	return (
		<nav
			className={cn(
				"fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300 lg:px-12",
				scrolled && "border-b border-border bg-background/92 backdrop-blur-xl",
			)}
		>
			<Link href="/" className="font-heading text-lg font-extrabold tracking-tight text-foreground">
				Djanni<span className="text-djanni-orange">.</span>
			</Link>

			{/* Desktop nav */}
			<ul className="hidden items-center gap-6 lg:flex xl:gap-9">
				{NAV_KEYS.map((link) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className="text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							{t(link.key)}
						</Link>
					</li>
				))}
				<li>
					<LanguageSwitcher />
				</li>
				<li>
					<button
						type="button"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="flex h-9 w-9 items-center justify-center rounded-md text-djanni-gray-light transition-colors hover:bg-secondary hover:text-foreground"
						aria-label={t("toggleTheme")}
					>
						<AnimatePresence mode="wait" initial={false}>
							{mounted && (
								<motion.span
									key={theme}
									initial={{ rotate: -90, scale: 0, opacity: 0 }}
									animate={{ rotate: 0, scale: 1, opacity: 1 }}
									exit={{ rotate: 90, scale: 0, opacity: 0 }}
									transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
									className="flex items-center justify-center"
								>
									{theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
								</motion.span>
							)}
						</AnimatePresence>
					</button>
				</li>
				<li>
					<Link
						href="#contact"
						className="whitespace-nowrap rounded-md bg-djanni-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
					>
						{t("cta")}
					</Link>
				</li>
			</ul>

			{/* Mobile right side: language + theme toggle + hamburger */}
			<div className="flex items-center gap-3 lg:hidden">
				<LanguageSwitcher />
				<button
					type="button"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					className="flex h-9 w-9 items-center justify-center rounded-md text-djanni-gray-light transition-colors hover:text-foreground"
					aria-label={t("toggleTheme")}
				>
					<AnimatePresence mode="wait" initial={false}>
						{mounted && (
							<motion.span
								key={theme}
								initial={{ rotate: -90, scale: 0, opacity: 0 }}
								animate={{ rotate: 0, scale: 1, opacity: 1 }}
								exit={{ rotate: 90, scale: 0, opacity: 0 }}
								transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
								className="flex items-center justify-center"
							>
								{theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
							</motion.span>
						)}
					</AnimatePresence>
				</button>
				<button
					type="button"
					onClick={() => setMobileOpen(!mobileOpen)}
					className="text-foreground"
					aria-label="Menu"
				>
					<AnimatePresence mode="wait" initial={false}>
						<motion.span
							key={mobileOpen ? "close" : "menu"}
							initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
							animate={{ rotate: 0, scale: 1, opacity: 1 }}
							exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
							className="flex items-center justify-center"
						>
							{mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
						</motion.span>
					</AnimatePresence>
				</button>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
						className="absolute top-full right-0 left-0 border-b border-border bg-background/95 px-6 py-6 backdrop-blur-xl lg:hidden"
					>
						<ul className="flex flex-col gap-4">
							{NAV_KEYS.map((link, i) => (
								<motion.li
									key={link.href}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: 0.04 * i,
										duration: 0.25,
										ease: [0.22, 1, 0.36, 1],
									}}
								>
									<Link
										href={link.href}
										onClick={() => setMobileOpen(false)}
										className="block text-base text-djanni-gray-light transition-colors hover:text-foreground"
									>
										{t(link.key)}
									</Link>
								</motion.li>
							))}
							<motion.li
								className="pt-2"
								initial={{ opacity: 0, x: -12 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									delay: 0.04 * NAV_KEYS.length,
									duration: 0.25,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<Link
									href="#contact"
									onClick={() => setMobileOpen(false)}
									className="flex items-center justify-center gap-2 rounded-md bg-djanni-orange px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
								>
									<IconPhone size={16} />
									{t("cta")}
								</Link>
							</motion.li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	)
}
