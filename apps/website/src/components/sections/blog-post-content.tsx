"use client"

import { IconArrowLeft, IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react"
import { useLocale, useTranslations } from "next-intl"
import { AnimatedSection } from "@/components/ui/animated-section"
import { Link } from "@/i18n/navigation"
import type { BlogPost } from "@/lib/constants"

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
								<span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-djanni-orange" />
								{renderInline(l.slice(2))}
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
	// Bold **text**
	const parts = text.split(/(\*\*[^*]+\*\*)/g)
	return parts.map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<strong key={i} className="font-medium text-foreground">
					{part.slice(2, -2)}
				</strong>
			)
		}
		return part
	})
}

// ─── Component ─────────────────────────────────────────────────

export function BlogPostContent({ post }: { post: BlogPost }) {
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
								<div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-djanni-orange to-[#c44008] font-heading text-sm font-extrabold text-white">
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
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-djanni-orange to-[#c44008] font-heading text-xl font-extrabold text-white">
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

			{/* CTA */}
			<section className="bg-surface-a px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[720px]">
					<AnimatedSection>
						<div className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-14 text-center md:px-16">
							<h2 className="font-heading text-2xl font-extrabold tracking-tight md:text-3xl">
								{t("ctaTitle")}
							</h2>
							<p className="mt-3 max-w-[400px] text-[15px] font-light text-djanni-gray-light">
								{t("ctaSubtitle")}
							</p>
							<div className="mt-6 flex flex-col gap-3 sm:flex-row">
								<Link
									href="/#contact"
									className="inline-flex items-center justify-center gap-2 rounded-lg bg-djanni-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
								>
									{t("ctaButton")}
									<IconArrowRight size={16} />
								</Link>
								<Link
									href="/blog"
									className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-djanni-gray hover:bg-foreground/[0.03]"
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
