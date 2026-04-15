"use client"

import {
	IconArrowLeft,
	IconArrowRight,
	IconCalendar,
	IconCheck,
	IconClock,
	IconExternalLink,
	IconMapPin,
	IconQuote,
} from "@tabler/icons-react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"
import { BrowserMockup } from "@/components/ui/browser-mockup"
import { Link } from "@/i18n/navigation"
import type { Project } from "@/lib/constants"

function MetaItem({
	icon: Icon,
	children,
}: {
	icon: typeof IconMapPin
	children: React.ReactNode
}) {
	return (
		<div className="flex items-center gap-2 text-sm text-djanni-gray-light">
			<Icon size={16} className="shrink-0 text-djanni-orange" />
			{children}
		</div>
	)
}

function parseResultStat(result: string): { stat: string; label: string } | null {
	// "passé de 8s à 1.2s"
	const range = result.match(/passé de (\S+) à (\S+)/i)
	if (range) return { stat: `${range[1]} → ${range[2]}`, label: "Temps de chargement" }

	// "Score Lighthouse 98/100" / "Score Best Practices 100/100"
	const score = result.match(/Score (.+?) (\d+\/\d+)$/i)
	if (score) return { stat: score[2], label: `Score ${score[1]}` }

	// "Chargement sous les 1.5s"
	const under = result.match(/sous (?:les? )?(\d[\d.,]*\w*)/i)
	if (under) return { stat: `< ${under[1]}`, label: result.split(/\s+sous\s+/i)[0] }

	// "100% responsive..." or "+180% de trafic..."
	const pctLeading = result.match(/^([+-]?\d[\d.,]*%)\s+(.+)/i)
	if (pctLeading) return { stat: pctLeading[1], label: capitalize(pctLeading[2]) }

	// "6 pages conçues..."
	const numLeading = result.match(/^(\d[\d.,]*)\s+(.+)/i)
	if (numLeading) return { stat: numLeading[1], label: capitalize(numLeading[2]) }

	return null
}

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export function CaseStudyContent({ project }: { project: Project }) {
	const t = useTranslations("caseStudy")
	const hasScreenshots = project.screenshots && project.screenshots.length > 0
	const remainingScreenshots = project.screenshots?.slice(3) ?? []

	return (
		<>
			{/* ── Section 1: Immersive Hero (dark) ── */}
			<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				<div
					className="pointer-events-none absolute top-0 right-1/4 h-[400px] w-[600px] rounded-full opacity-[0.06] blur-[120px]"
					style={{ background: project.accentColor }}
				/>

				{/* Hero content rendered immediately — no AnimatedSection for LCP */}
				<div className="relative mx-auto max-w-[1100px]">
					<Link
						href="/realisations"
						className="mb-8 inline-flex items-center gap-2 text-sm text-djanni-gray-light transition-colors hover:text-foreground"
					>
						<IconArrowLeft size={14} />
						{t("backLink")}
					</Link>

					<div className="flex flex-col gap-10">
						{/* Project info */}
						<div className="max-w-[700px]">
							<div className="mb-6 flex items-center gap-4">
								<div
									className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-lg font-extrabold text-white"
									style={{
										background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
										boxShadow: `0 4px 20px ${project.accentColor}40`,
									}}
								>
									{project.logoText}
								</div>
								<span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("context")}
								</span>
							</div>

							<h1 className="font-heading text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight">
								{project.name}
							</h1>
							<p className="mt-2 text-lg text-djanni-gray-light">{project.type}</p>

							<div className="mt-8 flex flex-wrap items-center gap-6">
								<MetaItem icon={IconMapPin}>{project.location}</MetaItem>
								<MetaItem icon={IconClock}>{project.duration}</MetaItem>
								<MetaItem icon={IconCalendar}>{project.year}</MetaItem>

								{project.url && (
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-lg border border-djanni-orange/40 bg-djanni-orange/10 px-5 py-2.5 text-sm font-medium text-djanni-orange transition-colors hover:bg-djanni-orange hover:text-white"
									>
										<IconExternalLink size={16} />
										{t("visitSite")}
									</a>
								)}
							</div>
						</div>

						{/* Main screenshot — full width, LCP element */}
						{hasScreenshots && (
							<BrowserMockup noPadding>
								<div className="relative aspect-video w-full">
									<Image
										src={project.screenshots?.[0] ?? ""}
										alt={`${project.name} — Accueil`}
										fill
										className="object-cover object-top"
										sizes="(max-width: 768px) 100vw, 1100px"
										priority
									/>
								</div>
							</BrowserMockup>
						)}
					</div>
				</div>
			</section>

			{/* ── Section 2: Story — Context / Problem / Solution ── */}
			<section className="bg-surface-a px-5 py-16 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1100px]">
					<StaggerContainer className="grid gap-0">
						{/* Context — full width */}
						<StaggerItem>
							<div className="mx-auto max-w-[800px] pb-10">
								<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("context")}
								</span>
								<p className="text-xl leading-relaxed text-djanni-gray-light md:text-[22px]">
									{project.context}
								</p>
							</div>
						</StaggerItem>

						{/* Connector */}
						<div className="flex flex-col items-center gap-0">
							<div className="h-8 w-px opacity-20" style={{ background: project.accentColor }} />
							<div
								className="h-2 w-2 rounded-full opacity-40"
								style={{ background: project.accentColor }}
							/>
							<div className="h-8 w-px opacity-20" style={{ background: project.accentColor }} />
						</div>

						{/* Problem — text left, screenshot right */}
						<StaggerItem>
							<div className="grid items-center gap-10 py-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
								<div>
									<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
										{t("problem")}
									</span>
									<p className="text-[17px] leading-relaxed text-djanni-gray-light">
										{project.problem}
									</p>
								</div>
								{project.screenshots?.[1] && (
									<BrowserMockup noPadding>
										<div className="relative aspect-video w-full">
											<Image
												src={project.screenshots[1]}
												alt={`${project.name} — Capture`}
												fill
												className="object-cover object-top"
												sizes="(max-width: 768px) 95vw, 450px"
											/>
										</div>
									</BrowserMockup>
								)}
							</div>
						</StaggerItem>

						{/* Connector */}
						<div className="flex flex-col items-center gap-0">
							<div className="h-8 w-px opacity-20" style={{ background: project.accentColor }} />
							<div
								className="h-2 w-2 rounded-full opacity-40"
								style={{ background: project.accentColor }}
							/>
							<div className="h-8 w-px opacity-20" style={{ background: project.accentColor }} />
						</div>

						{/* Solution — screenshot left, text right */}
						<StaggerItem>
							<div className="grid items-center gap-10 py-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
								{project.screenshots?.[2] ? (
									<>
										<BrowserMockup noPadding>
											<div className="relative aspect-video w-full">
												<Image
													src={project.screenshots[2]}
													alt={`${project.name} — Capture`}
													fill
													className="object-cover object-top"
													sizes="(max-width: 768px) 95vw, 450px"
												/>
											</div>
										</BrowserMockup>
										<div>
											<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
												{t("solution")}
											</span>
											<p className="text-[17px] leading-relaxed text-djanni-gray-light">
												{project.solution}
											</p>
										</div>
									</>
								) : (
									<div className="col-span-full mx-auto max-w-[800px]">
										<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
											{t("solution")}
										</span>
										<p className="text-[17px] leading-relaxed text-djanni-gray-light">
											{project.solution}
										</p>
									</div>
								)}
							</div>
						</StaggerItem>
					</StaggerContainer>
				</div>
			</section>

			{/* ── Section 3: Visual Gallery (dark) — remaining screenshots ── */}
			{remainingScreenshots.length > 0 && (
				<section className="relative overflow-hidden bg-linear-to-b from-[#161614] to-[#1e1e1c] px-5 py-16 md:px-12 md:py-24">
					<div
						className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05] blur-[120px]"
						style={{ background: project.accentColor }}
					/>
					<div className="relative mx-auto max-w-[1100px]">
						<StaggerContainer className="grid gap-6 sm:grid-cols-2">
							{remainingScreenshots.map((src, i) => (
								<StaggerItem key={src} className={i === 0 ? "sm:col-span-2" : ""}>
									<BrowserMockup noPadding>
										<div className="relative aspect-video w-full">
											<Image
												src={src}
												alt={`${project.name} — Capture ${i + 4}`}
												fill
												className="object-cover object-top"
												sizes={
													i === 0
														? "(max-width: 640px) 95vw, 1100px"
														: "(max-width: 640px) 95vw, 540px"
												}
											/>
										</div>
									</BrowserMockup>
								</StaggerItem>
							))}
						</StaggerContainer>
					</div>
				</section>
			)}

			{/* ── Section 4: Results — Big Numbers ── */}
			<section className="bg-surface-a px-5 py-16 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<div className="mb-12 text-center">
							<h2 className="font-heading text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight">
								{t("results").replace(/\.$/, "")}
								<span className="text-djanni-orange">.</span>
							</h2>
						</div>
					</AnimatedSection>

					<StaggerContainer className="mx-auto grid max-w-[1000px] gap-4 grid-cols-2 lg:grid-cols-4">
						{project.results.map((result) => {
							const parsed = parseResultStat(result)
							return (
								<StaggerItem key={result}>
									<div
										className="flex h-full flex-col rounded-xl border border-border bg-surface-b p-5 transition-colors duration-300 hover:border-djanni-orange/30"
										style={{ borderTopWidth: "3px", borderTopColor: project.accentColor }}
									>
										{parsed ? (
											<>
												<div className="font-heading text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
													{parsed.stat}
												</div>
												<p className="mt-2 text-sm leading-relaxed text-djanni-gray-light">
													{parsed.label}
												</p>
											</>
										) : (
											<>
												<div className="mb-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-djanni-orange/15 text-djanni-orange">
													<IconCheck size={14} />
												</div>
												<p className="text-sm leading-relaxed text-djanni-gray-light">{result}</p>
											</>
										)}
									</div>
								</StaggerItem>
							)
						})}
					</StaggerContainer>
				</div>
			</section>

			{/* ── Section 5: Tech Stack ── */}
			<section className="bg-surface-b px-5 py-20 md:px-12">
				<div className="mx-auto max-w-[800px]">
					<AnimatedSection>
						<div className="flex flex-col items-center gap-6">
							<span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
								{t("techStack")}
							</span>
							<div className="flex flex-wrap justify-center gap-3">
								{project.techStack.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-border bg-white/6 px-4 py-2 text-sm text-djanni-gray-light transition-all hover:-translate-y-0.5 hover:border-djanni-orange/30 hover:text-foreground"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* ── Section 6: Testimonial (dark) ── */}
			{project.testimonial && (
				<section className="relative overflow-hidden bg-linear-to-b from-[#161614] to-[#1e1e1c] px-5 py-28 md:px-12">
					<div
						className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[80px]"
						style={{ background: project.accentColor }}
					/>
					<div className="relative mx-auto max-w-[700px]">
						<AnimatedSection>
							<div className="flex flex-col items-center text-center">
								<IconQuote size={56} className="mb-8 text-djanni-orange/40" />
								<blockquote className="text-2xl font-light italic leading-relaxed text-djanni-gray-light md:text-3xl">
									&ldquo;{project.testimonial.quote}&rdquo;
								</blockquote>
								<div
									className="mx-auto mt-8 h-px w-12"
									style={{ background: project.accentColor }}
								/>
								<div className="mt-6">
									<div className="font-heading text-base font-bold text-white">
										{project.testimonial.author}
									</div>
									<div className="text-sm text-djanni-gray">{project.testimonial.role}</div>
								</div>
							</div>
						</AnimatedSection>
					</div>
				</section>
			)}

			{/* ── Section 7: CTA ── */}
			<section className="bg-surface-a px-5 py-16 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<div
							className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-16 text-center md:px-16"
							style={{ borderTopWidth: "4px", borderTopColor: project.accentColor }}
						>
							<h2 className="font-heading text-[clamp(28px,3.5vw,40px)] font-extrabold leading-tight tracking-tight">
								{t("ctaTitle").replace(/\.$/, "")}
								<span className="text-djanni-orange">.</span>
							</h2>
							<p className="mt-4 max-w-[460px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
								{t("ctaText")}
							</p>
							<div className="mt-8 flex flex-col gap-4 sm:flex-row">
								<Link
									href="/demande-projet"
									className="inline-flex items-center justify-center gap-2 rounded-lg bg-djanni-orange px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
								>
									{t("ctaButton")}
									<IconArrowRight size={16} />
								</Link>
								<Link
									href="/realisations"
									className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-djanni-gray hover:bg-white/3"
								>
									{t("backLink")}
								</Link>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>
		</>
	)
}
