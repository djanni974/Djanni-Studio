"use client"

import { IconArrowRight, IconClock } from "@tabler/icons-react"
import { useLocale, useTranslations } from "next-intl"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { BLOG_POSTS } from "@/lib/constants"

export function BlogListContent() {
	const t = useTranslations("blogPage")
	const locale = useLocale()

	const sortedPosts = [...BLOG_POSTS].sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	)

	const [featured, ...rest] = sortedPosts

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString(
			locale === "en" ? "en-US" : locale === "br" ? "br" : "fr-FR",
			{
				year: "numeric",
				month: "long",
				day: "numeric",
			},
		)
	}

	return (
		<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-28 md:px-12 md:pt-40">
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<div className="relative mx-auto max-w-[1100px]">
				<AnimatedSection>
					<SectionHeader
						tag={t("tag")}
						title={t("title")}
						subtitle={t("subtitle")}
						align="center"
					/>
				</AnimatedSection>

				{/* Featured article */}
				{featured && (
					<AnimatedSection className="mt-16">
						<Link
							href={`/blog/${featured.slug}`}
							className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-b transition-[border-color,box-shadow] duration-300 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] md:flex-row"
						>
							<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,80,10,0.06)_0%,transparent_60%)]" />
							<div className="relative flex flex-1 flex-col justify-center p-8 md:p-10">
								<div className="flex items-center gap-3">
									<span className="text-[11px] font-semibold uppercase tracking-wider text-djanni-orange">
										{featured.category}
									</span>
									<span className="h-1 w-1 rounded-full bg-djanni-gray/40" />
									<span className="flex items-center gap-1.5 text-xs text-djanni-gray">
										<IconClock size={12} />
										{featured.readingTime} {t("minRead")}
									</span>
								</div>
								<h2 className="mt-4 font-heading text-2xl font-bold leading-snug tracking-tight transition-colors group-hover:text-djanni-orange md:text-3xl">
									{featured.title}
								</h2>
								<p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-djanni-gray-light">
									{featured.excerpt}
								</p>
								<div className="mt-6 flex items-center gap-4">
									<span className="text-xs text-djanni-gray">
										{formatDate(featured.publishedAt)}
									</span>
									<span className="inline-flex items-center gap-2 text-sm font-medium text-djanni-orange transition-all group-hover:gap-3">
										{t("readMore")}
										<IconArrowRight size={14} />
									</span>
								</div>
							</div>
						</Link>
					</AnimatedSection>
				)}

				{/* Other articles */}
				{rest.length > 0 && (
					<StaggerContainer className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{rest.map((post) => (
							<StaggerItem key={post.slug}>
								<Link
									href={`/blog/${post.slug}`}
									className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
								>
									<div className="flex items-center justify-between border-b border-border px-6 py-3">
										<span className="text-[11px] font-semibold uppercase tracking-wider text-djanni-orange">
											{post.category}
										</span>
										<span className="flex items-center gap-1.5 text-xs text-djanni-gray">
											<IconClock size={12} />
											{post.readingTime} {t("minRead")}
										</span>
									</div>

									<div className="flex flex-1 flex-col p-6">
										<h2 className="font-heading text-lg font-bold leading-snug transition-colors group-hover:text-djanni-orange">
											{post.title}
										</h2>
										<p className="mt-3 flex-1 text-sm leading-relaxed text-djanni-gray-light">
											{post.excerpt}
										</p>
										<div className="mt-6 flex items-center justify-between">
											<span className="text-xs text-djanni-gray">
												{formatDate(post.publishedAt)}
											</span>
											<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
												<IconArrowRight size={14} />
											</div>
										</div>
									</div>
								</Link>
							</StaggerItem>
						))}
					</StaggerContainer>
				)}
			</div>
		</section>
	)
}
