import { IconArrowRight } from "@tabler/icons-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { Link } from "@/i18n/navigation"
import { BLOG_POSTS, PROJECTS } from "@/lib/constants"
import { getAlternates } from "@/lib/metadata"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "sitemap" })

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		alternates: getAlternates("/plan-du-site"),
	}
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations("sitemap")

	const mainPages = [
		{ label: t("home"), href: "/" },
		{ label: t("realisations"), href: "/realisations" },
		{ label: t("offres"), href: "/offres" },
		{ label: t("about"), href: "/a-propos" },
		{ label: t("blog"), href: "/blog" },
		{ label: t("contact"), href: "/demande-projet" },
	]

	const legalPages = [
		{ label: t("legal"), href: "/mentions-legales" },
		{ label: t("cgv"), href: "/cgv" },
		{ label: t("privacy"), href: "/politique-de-confidentialite" },
	]

	const sections = [
		{
			number: "01",
			tag: t("mainPages"),
			items: mainPages.map((p) => ({ label: p.label, href: p.href, sub: "" })),
		},
		{
			number: "02",
			tag: t("projectsSection"),
			items: PROJECTS.map((p) => ({
				label: p.name,
				href: `/realisations/${p.slug}`,
				sub: p.type,
			})),
		},
		{
			number: "03",
			tag: t("blogSection"),
			items: BLOG_POSTS.map((p) => ({ label: p.title, href: `/blog/${p.slug}`, sub: "" })),
		},
		{
			number: "04",
			tag: t("legalPages"),
			items: legalPages.map((p) => ({ label: p.label, href: p.href, sub: "" })),
		},
	]

	return (
		<main>
			{/* Hero */}
			<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-20 md:px-12 md:pt-40 md:pb-24">
				{/* Dot grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				{/* Orange glow */}
				<div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,80,10,0.08)_0%,transparent_70%)]" />

				<div className="relative mx-auto max-w-[1100px]">
					<AnimatedSection>
						<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
							{t("tag")}
						</span>
						<h1 className="font-heading text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.05] tracking-tight">
							{t("title")}
							<span className="text-djanni-orange">.</span>
						</h1>
						<p className="mt-5 max-w-[480px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
							{t("subtitle")}
						</p>
					</AnimatedSection>
				</div>
			</section>

			{/* Grid */}
			<section className="bg-surface-a px-5 pb-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<StaggerContainer className="grid gap-5 sm:grid-cols-2">
						{sections.map((section) => (
							<StaggerItem key={section.number}>
								<div className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-b p-7 transition-[border-color,box-shadow] duration-300 hover:border-white/16 hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] md:p-8">
									{/* Watermark number */}
									<span className="pointer-events-none absolute right-6 bottom-4 select-none font-heading text-[80px] font-extrabold leading-none text-foreground/3">
										{section.number}
									</span>

									{/* Card header */}
									<div className="mb-6 flex items-center gap-3">
										<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-djanni-orange/10 text-[11px] font-bold text-djanni-orange transition-colors duration-300 group-hover/card:bg-djanni-orange/15">
											{section.number}
										</span>
										<h2 className="font-heading text-base font-bold tracking-tight">
											{section.tag}
											<span className="text-djanni-orange">.</span>
										</h2>
									</div>

									{/* Links */}
									<ul className="relative space-y-1">
										{section.items.map((item) => (
											<li key={item.href}>
												<Link
													href={item.href as "/"}
													className="group/link flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-foreground/4"
												>
													<span className="flex min-w-0 flex-col">
														<span className="truncate text-[14px] font-medium text-djanni-gray transition-colors duration-200 group-hover/link:text-foreground">
															{item.label}
														</span>
														{item.sub && (
															<span className="mt-0.5 truncate text-[11px] text-djanni-gray-light/60">
																{item.sub}
															</span>
														)}
													</span>
													<IconArrowRight
														size={14}
														className="shrink-0 translate-x-0 text-djanni-gray-light/40 opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-djanni-orange group-hover/link:opacity-100"
													/>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>
		</main>
	)
}
