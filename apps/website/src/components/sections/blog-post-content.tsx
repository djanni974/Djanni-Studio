"use client"

import { IconArrowLeft, IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react"
import { motion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Link } from "@/i18n/navigation"
import type { BlogPost } from "@/lib/constants"

const MotionLink = motion.create(Link)

// ─── Custom block renderers ────────────────────────────────────

function BriefBlock({ children }: { children: React.ReactNode[] }) {
	return (
		<div className="my-8 rounded-lg border border-border bg-surface-c p-5">
			<div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
				<span>📋</span>
				En bref
			</div>
			<ul className="ml-1 space-y-1.5">{children}</ul>
		</div>
	)
}

function StatBlock({ value, children }: { value: string; children: React.ReactNode }) {
	return (
		<div className="my-8 rounded-lg border border-border bg-surface-c p-6 text-center">
			<div className="font-heading text-4xl font-extrabold text-djanni-orange">{value}</div>
			<div className="mt-2 text-[15px] text-djanni-gray-light">{children}</div>
		</div>
	)
}

function ExampleBlock({ children }: { children: React.ReactNode[] }) {
	return (
		<div className="my-8 rounded-lg border-l-4 border-djanni-orange bg-surface-c p-5">
			<div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
				<span>💡</span>
				Cas concret
			</div>
			<div className="text-[15px] leading-relaxed text-djanni-gray-light">{children}</div>
		</div>
	)
}

function Blockquote({ children }: { children: React.ReactNode[] }) {
	return (
		<blockquote className="my-6 border-l-3 border-djanni-gray/30 pl-5 italic text-djanni-gray-light">
			{children}
		</blockquote>
	)
}

// ─── Markdown parser ───────────────────────────────────────────

function renderMarkdown(content: string) {
	const lines = content.split("\n")
	const elements: React.ReactNode[] = []
	let i = 0
	let blockKey = 0

	while (i < lines.length) {
		const line = lines[i]

		// Custom blocks: :::brief, :::stat, :::example
		if (line.startsWith(":::brief")) {
			const blockLines: string[] = []
			i++
			while (i < lines.length && lines[i].trim() !== ":::") {
				blockLines.push(lines[i])
				i++
			}
			i++ // skip closing :::
			elements.push(
				<BriefBlock key={`brief-${blockKey++}`}>
					{blockLines
						.filter((l) => l.startsWith("- "))
						.map((l, j) => (
							<li key={j} className="flex items-start gap-2 text-[15px] text-djanni-gray-light">
								<span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-djanni-orange" />
								<span>{renderInline(l.slice(2))}</span>
							</li>
						))}
				</BriefBlock>,
			)
			continue
		}

		if (line.startsWith(":::stat")) {
			const blockLines: string[] = []
			i++
			while (i < lines.length && lines[i].trim() !== ":::") {
				if (lines[i].trim()) blockLines.push(lines[i])
				i++
			}
			i++ // skip closing :::
			const value = blockLines[0] || ""
			const desc = blockLines.slice(1).join(" ")
			elements.push(
				<StatBlock key={`stat-${blockKey++}`} value={value}>
					{renderInline(desc)}
				</StatBlock>,
			)
			continue
		}

		if (line.startsWith(":::cta")) {
			const blockLines: string[] = []
			i++
			while (i < lines.length && lines[i].trim() !== ":::") {
				if (lines[i].trim()) blockLines.push(lines[i])
				i++
			}
			i++ // skip closing :::
			elements.push(
				<div
					key={`cta-${blockKey++}`}
					className="my-8 flex flex-wrap items-center justify-center gap-4 rounded-xl border border-border bg-surface-b p-6"
				>
					{blockLines.map((l, j) => (
						<span key={j} className="text-[15px]">
							{renderInline(l)}
						</span>
					))}
				</div>,
			)
			continue
		}

		if (line.startsWith(":::example")) {
			const blockLines: string[] = []
			i++
			while (i < lines.length && lines[i].trim() !== ":::") {
				blockLines.push(lines[i])
				i++
			}
			i++ // skip closing :::
			elements.push(
				<ExampleBlock key={`example-${blockKey++}`}>
					{blockLines
						.filter((l) => l.trim())
						.map((l, j) => (
							<p key={j} className="my-1">
								{renderInline(l)}
							</p>
						))}
				</ExampleBlock>,
			)
			continue
		}

		// Blockquotes
		if (line.startsWith("> ")) {
			const quoteLines: string[] = []
			while (i < lines.length && lines[i].startsWith("> ")) {
				quoteLines.push(lines[i].slice(2))
				i++
			}
			elements.push(
				<Blockquote key={`quote-${blockKey++}`}>
					{quoteLines.map((l, j) => (
						<p key={j} className="my-1">
							{renderInline(l)}
						</p>
					))}
				</Blockquote>,
			)
			continue
		}

		// Headings
		if (line.startsWith("## ")) {
			elements.push(
				<h2 key={i} className="mt-12 mb-4 font-heading text-2xl font-bold tracking-tight">
					{line.slice(3)}
				</h2>,
			)
			i++
			continue
		}

		if (line.startsWith("### ")) {
			elements.push(
				<h3 key={i} className="mt-8 mb-3 font-heading text-xl font-bold">
					{line.slice(4)}
				</h3>,
			)
			i++
			continue
		}

		// Horizontal rule
		if (line.trim() === "---") {
			elements.push(<hr key={i} className="my-10 border-border" />)
			i++
			continue
		}

		// List items
		if (line.startsWith("- ")) {
			const listItems: React.ReactNode[] = []
			while (i < lines.length && lines[i].startsWith("- ")) {
				listItems.push(
					<li key={i} className="text-[17px] leading-relaxed text-djanni-gray-light">
						{renderInline(lines[i].slice(2))}
					</li>,
				)
				i++
			}
			elements.push(
				<ul key={`list-${i}`} className="my-4 ml-6 list-disc space-y-2">
					{listItems}
				</ul>,
			)
			continue
		}

		// Ordered list items
		if (/^\d+\.\s/.test(line)) {
			const listItems: React.ReactNode[] = []
			while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
				listItems.push(
					<li key={i} className="text-[17px] leading-relaxed text-djanni-gray-light">
						{renderInline(lines[i].replace(/^\d+\.\s/, ""))}
					</li>,
				)
				i++
			}
			elements.push(
				<ol key={`olist-${i}`} className="my-4 ml-6 list-decimal space-y-2">
					{listItems}
				</ol>,
			)
			continue
		}

		// Empty line
		if (line.trim() === "") {
			i++
			continue
		}

		// Paragraph
		elements.push(
			<p key={i} className="my-4 text-[17px] leading-relaxed text-djanni-gray-light">
				{renderInline(line)}
			</p>,
		)
		i++
	}

	return elements
}

function renderInline(text: string): React.ReactNode {
	// Split on bold, italic, and links
	const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
	return parts.map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<strong key={i} className="font-medium text-foreground">
					{part.slice(2, -2)}
				</strong>
			)
		}
		if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
			return (
				<em key={i} className="italic">
					{part.slice(1, -1)}
				</em>
			)
		}
		const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
		if (linkMatch) {
			const [, label, href] = linkMatch
			const isExternal = href.startsWith("http")
			return (
				<a
					key={i}
					href={href}
					className="font-medium text-djanni-orange underline underline-offset-2 transition-colors hover:text-djanni-orange-light"
					{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
				>
					{label}
				</a>
			)
		}
		return part
	})
}

// ─── Component ─────────────────────────────────────────────────

export function BlogPostContent({
	post,
	prevPost,
	nextPost,
}: {
	post: BlogPost
	prevPost: BlogPost | null
	nextPost: BlogPost | null
}) {
	const t = useTranslations("blogPost")
	const locale = useLocale()

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
		<>
			{/* Hero */}
			<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				<div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,80,10,0.06)_0%,transparent_70%)]" />

				<div className="relative mx-auto max-w-[720px]">
					<AnimatedSection>
						<Link
							href="/blog"
							className="mb-8 inline-flex items-center gap-2 text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							<IconArrowLeft size={14} />
							{t("backLink")}
						</Link>

						<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
							{post.category}
						</span>
						<h1 className="font-heading text-[clamp(32px,4.5vw,48px)] font-extrabold leading-[1.15] tracking-tight">
							{post.title}
						</h1>
						<p className="mt-4 text-lg text-djanni-gray-light">{post.excerpt}</p>

						<div className="mt-6 flex flex-wrap items-center gap-6 border-t border-border pt-6">
							<div className="flex items-center gap-3">
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-djanni-orange to-[#c44008] font-heading text-sm font-extrabold text-white">
									G
								</div>
								<div>
									<div className="text-sm font-medium">Gianni</div>
									<div className="text-xs text-djanni-gray">Djanni Studio</div>
								</div>
							</div>
							<div className="flex items-center gap-2 text-sm text-djanni-gray">
								<IconCalendar size={14} />
								{formatDate(post.publishedAt)}
							</div>
							<div className="flex items-center gap-2 text-sm text-djanni-gray">
								<IconClock size={14} />
								{post.readingTime} {t("readingTime")}
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Article content */}
			<section className="bg-surface-b px-5 py-16 md:px-12 md:py-20">
				<div className="mx-auto max-w-[720px]">
					<AnimatedSection>
						<article className="prose-djanni">{renderMarkdown(post.content)}</article>
					</AnimatedSection>
				</div>
			</section>

			{/* Author block */}
			<section className="bg-surface-b px-5 pb-16 md:px-12">
				<div className="mx-auto max-w-[720px]">
					<div className="rounded-xl border border-border bg-card p-6 md:p-8">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-djanni-orange to-[#c44008] font-heading text-xl font-extrabold text-white">
								G
							</div>
							<div className="flex-1">
								<div className="font-heading text-lg font-bold">Gianni</div>
								<div className="text-sm text-djanni-gray">{t("authorRole")}</div>
								<p className="mt-1 text-sm leading-relaxed text-djanni-gray-light">
									{t("authorBio")}
								</p>
							</div>
						</div>
						<div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-djanni-gray">
							<span className="flex items-center gap-1.5">
								<IconCalendar size={12} />
								{t("publishedOn")} {formatDate(post.publishedAt)}
							</span>
							<span className="flex items-center gap-1.5">
								<IconClock size={12} />
								{post.readingTime} {t("readingTime")}
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Prev / Next navigation */}
			{(prevPost || nextPost) && (
				<section className="bg-surface-a px-5 pt-16 md:px-12">
					<div className="mx-auto max-w-[720px]">
						<AnimatedSection>
							<div className="mb-6 flex items-center gap-4">
								<span className="h-px flex-1 bg-border" />
								<span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-gray/50">
									{t("ctaSecondary")}
								</span>
								<span className="h-px flex-1 bg-border" />
							</div>
							<nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{prevPost ? (
									<MotionLink
										href={`/blog/${prevPost.slug}`}
										initial="idle"
										whileHover="hover"
										variants={{
											idle: { y: 0 },
											hover: { y: -4 },
										}}
										transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
										className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-b p-6 transition-[border-color,box-shadow] duration-300 hover:border-djanni-orange/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
									>
										<div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 translate-y-1/2 -translate-x-1/2 rounded-full bg-djanni-orange/4 blur-2xl" />
										<span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-djanni-gray/60">
											<motion.span
												className="inline-flex items-center justify-center rounded-full border border-border p-1 transition-[border-color,background-color] duration-300 group-hover:border-djanni-orange/40 group-hover:bg-djanni-orange/10"
												variants={{
													idle: { x: 0 },
													hover: { x: -3 },
												}}
												transition={{ duration: 0.2 }}
											>
												<IconArrowLeft size={10} />
											</motion.span>
											{t("prevArticle")}
										</span>
										<span className="mt-3 font-heading text-[15px] font-bold leading-snug tracking-tight transition-colors group-hover:text-djanni-orange">
											{prevPost.title}
										</span>
										<span className="mt-2 flex items-center gap-1.5 text-[11px] text-djanni-gray/50">
											<IconClock size={10} />
											{prevPost.readingTime} {t("readingTime")}
										</span>
									</MotionLink>
								) : (
									<div />
								)}

								{nextPost ? (
									<MotionLink
										href={`/blog/${nextPost.slug}`}
										initial="idle"
										whileHover="hover"
										variants={{
											idle: { y: 0 },
											hover: { y: -4 },
										}}
										transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
										className="group relative flex flex-col items-end overflow-hidden rounded-xl border border-border bg-surface-b p-6 text-right transition-[border-color,box-shadow] duration-300 hover:border-djanni-orange/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
									>
										<div className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 translate-x-1/2 translate-y-1/2 rounded-full bg-djanni-orange/4 blur-2xl" />
										<span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-djanni-gray/60">
											{t("nextArticle")}
											<motion.span
												className="inline-flex items-center justify-center rounded-full border border-border p-1 transition-[border-color,background-color] duration-300 group-hover:border-djanni-orange/40 group-hover:bg-djanni-orange/10"
												variants={{
													idle: { x: 0 },
													hover: { x: 3 },
												}}
												transition={{ duration: 0.2 }}
											>
												<IconArrowRight size={10} />
											</motion.span>
										</span>
										<span className="mt-3 font-heading text-[15px] font-bold leading-snug tracking-tight transition-colors group-hover:text-djanni-orange">
											{nextPost.title}
										</span>
										<span className="mt-2 flex items-center gap-1.5 text-[11px] text-djanni-gray/50">
											<IconClock size={10} />
											{nextPost.readingTime} {t("readingTime")}
										</span>
									</MotionLink>
								) : (
									<div />
								)}
							</nav>
						</AnimatedSection>
					</div>
				</section>
			)}

			{/* CTA */}
			<section className="bg-surface-a px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[720px]">
					<AnimatedSection>
						<div className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-14 text-center md:px-16">
							<h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
								{t("ctaTitle").replace(/\.$/, "")}
								<span className="text-djanni-orange">.</span>
							</h2>
							<p className="mt-3 max-w-[400px] text-[15px] font-light text-djanni-gray-light">
								{t("ctaSubtitle")}
							</p>
							<div className="mt-6 flex flex-col gap-3 sm:flex-row">
								<Link
									href="/demande-projet"
									className="inline-flex items-center justify-center gap-2 rounded-lg bg-djanni-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
								>
									{t("ctaButton")}
									<IconArrowRight size={16} />
								</Link>
								<Link
									href="/blog"
									className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-djanni-gray hover:bg-foreground/3"
								>
									{t("ctaSecondary")}
								</Link>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>
		</>
	)
}
