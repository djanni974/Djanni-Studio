"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconMenu2, IconMoon, IconPhone, IconSun, IconX } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "./language-switcher"

const NAV_KEYS = [
	{ key: "realisations", href: "/realisations" },
	{ key: "offres", href: "/offres" },
	{ key: "about", href: "/a-propos" },
	{ key: "blog", href: "/blog" },
] as const

export function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const t = useTranslations("nav")
	const pathname = usePathname()

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40)
		onScroll()
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const themeButton = (
		<button
			type="button"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="flex h-9 w-9 items-center justify-center rounded-md text-djanni-gray-light transition-colors hover:bg-secondary hover:text-foreground"
			aria-label={t("toggleTheme")}
		>
			<span className="relative flex h-[18px] w-[18px] items-center justify-center">
				{mounted ? (
					theme === "dark" ? (
						<IconSun size={18} className="animate-icon-in" />
					) : (
						<IconMoon size={18} className="animate-icon-in" />
					)
				) : (
					<IconMoon size={18} className="opacity-0" />
				)}
			</span>
		</button>
	)

	return (
		<nav
			className={cn(
				"fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300 lg:px-12",
				scrolled && "bg-background/92 backdrop-blur-xl",
			)}
		>
			<Link href="/" className="font-heading text-lg font-extrabold tracking-tight text-foreground">
				Djanni<span className="text-djanni-orange">.</span>
			</Link>

			{/* Desktop nav */}
			<ul className="hidden items-center gap-6 lg:flex xl:gap-9">
				{NAV_KEYS.map((link) => {
					const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
					return (
						<li key={link.href}>
							<Link
								href={link.href}
								className={cn(
									"relative pb-1 text-sm transition-colors hover:text-foreground",
									isActive ? "text-foreground" : "text-djanni-gray-light",
								)}
							>
								{t(link.key)}
								{isActive && (
									<>
										<span className="animate-dot-in text-djanni-orange">.</span>
										<span className="absolute right-0 -bottom-0.5 left-0 h-0.5 animate-underline-in rounded-full bg-djanni-orange" />
									</>
								)}
							</Link>
						</li>
					)
				})}
				<li>
					<LanguageSwitcher />
				</li>
				<li>{themeButton}</li>
				<li>
					<Link
						href="/demande-projet"
						className="whitespace-nowrap rounded-md bg-djanni-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
					>
						{t("cta")}
					</Link>
				</li>
			</ul>

			{/* Mobile right side */}
			<div className="flex items-center gap-3 lg:hidden">
				<LanguageSwitcher />
				{themeButton}
				<button
					type="button"
					onClick={() => setMobileOpen(!mobileOpen)}
					className="text-foreground"
					aria-label="Menu"
					aria-expanded={mobileOpen}
				>
					<span className="flex items-center justify-center">
						{mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
					</span>
				</button>
			</div>

			{/* Mobile menu */}
			<div
				className={cn(
					"absolute top-full right-0 left-0 border-b border-border bg-background/95 px-6 backdrop-blur-xl transition-all duration-250 ease-out lg:hidden",
					mobileOpen
						? "visible translate-y-0 py-6 opacity-100"
						: "invisible -translate-y-2 py-0 opacity-0",
				)}
			>
				<ul className="flex flex-col gap-4">
					{NAV_KEYS.map((link, i) => (
						<li
							key={link.href}
							className={cn(
								"transition-all duration-250 ease-out",
								mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
							)}
							style={{ transitionDelay: mobileOpen ? `${40 * i}ms` : "0ms" }}
						>
							<Link
								href={link.href}
								onClick={() => setMobileOpen(false)}
								className={cn(
									"block text-base transition-colors hover:text-foreground",
									pathname === link.href || pathname.startsWith(`${link.href}/`)
										? "font-medium text-djanni-orange"
										: "text-djanni-gray-light",
								)}
							>
								{t(link.key)}
							</Link>
						</li>
					))}
					<li
						className={cn(
							"pt-2 transition-all duration-250 ease-out",
							mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
						)}
						style={{ transitionDelay: mobileOpen ? `${40 * NAV_KEYS.length}ms` : "0ms" }}
					>
						<Link
							href="/demande-projet"
							onClick={() => setMobileOpen(false)}
							className="flex items-center justify-center gap-2 rounded-md bg-djanni-orange px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
						>
							<IconPhone size={16} />
							{t("cta")}
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
