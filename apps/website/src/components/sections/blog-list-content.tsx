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

				<StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sortedPosts.map((post) => (
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
										<span className="text-xs text-djanni-gray">{formatDate(post.publishedAt)}</span>
										<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
											<IconArrowRight size={14} />
										</div>
									</div>
								</div>
							</Link>
						</StaggerItem>
					))}
				</StaggerContainer>
			</div>
		</section>
	)
}
