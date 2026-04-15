"use client"

import { IconArrowLeft, IconArrowRight, IconClock } from "@tabler/icons-react"
import { useLocale, useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import { BLOG_POSTS } from "@/lib/constants"

const POSTS_PER_PAGE = 6

export function BlogListContent() {
	const t = useTranslations("blogPage")
	const locale = useLocale()
	const [page, setPage] = useState(1)

	const sortedPosts = useMemo(
		() =>
			[...BLOG_POSTS].sort(
				(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
			),
		[],
	)

	const [featured, ...rest] = sortedPosts
	const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE))
	const paginatedPosts = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

	const goToPage = useCallback((p: number) => {
		setPage(p)
		document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })
	}, [])

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
						as="h1"
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
							className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] md:flex-row"
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
									<span className="inline-flex items-center gap-2 text-sm font-medium text-djanni-orange">
										{t("readMore")}
										<span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
											<IconArrowRight size={14} />
										</span>
									</span>
								</div>
							</div>
						</Link>
					</AnimatedSection>
				)}

				{/* Other articles */}
				{rest.length > 0 && (
					<div id="blog-grid" className="scroll-mt-32">
						<StaggerContainer key={page} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{paginatedPosts.map((post) => (
								<StaggerItem key={post.slug}>
									<Link
										href={`/blog/${post.slug}`}
										className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
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
												<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-djanni-gray transition-[transform,border-color,background-color,color] duration-200 group-hover:translate-x-1 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
													<IconArrowRight size={14} />
												</div>
											</div>
										</div>
									</Link>
								</StaggerItem>
							))}
						</StaggerContainer>

						{/* Pagination */}
						{totalPages > 1 && (
							<AnimatedSection className="mt-12">
								<nav aria-label="Pagination" className="flex items-center justify-center">
									<div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-b p-1.5">
										<button
											type="button"
											onClick={() => goToPage(page - 1)}
											disabled={page === 1}
											className="flex h-9 w-9 items-center justify-center rounded-full text-djanni-gray transition-all duration-200 hover:bg-surface-c hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
											aria-label={t("prev")}
										>
											<IconArrowLeft size={15} />
										</button>

										<span className="mx-1 h-4 w-px bg-border" />

										{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
											<button
												key={p}
												type="button"
												onClick={() => goToPage(p)}
												className={`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
													p === page
														? "bg-djanni-orange text-white shadow-[0_2px_8px_rgba(232,80,10,0.3)]"
														: "text-djanni-gray hover:bg-surface-c hover:text-foreground"
												}`}
												aria-label={`Page ${p}`}
												aria-current={p === page ? "page" : undefined}
											>
												{p}
											</button>
										))}

										<span className="mx-1 h-4 w-px bg-border" />

										<button
											type="button"
											onClick={() => goToPage(page + 1)}
											disabled={page === totalPages}
											className="flex h-9 w-9 items-center justify-center rounded-full text-djanni-gray transition-all duration-200 hover:bg-surface-c hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
											aria-label={t("next")}
										>
											<IconArrowRight size={15} />
										</button>
									</div>
								</nav>

								<p className="mt-5 text-center text-[11px] tracking-wide text-djanni-gray/60">
									{t("page", { current: page, total: totalPages })}
								</p>
							</AnimatedSection>
						)}
					</div>
				)}
			</div>
		</section>
	)
}
