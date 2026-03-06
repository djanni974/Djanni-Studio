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
import { SectionHeader } from "@/components/ui/section-header"
import { Link } from "@/i18n/navigation"
import type { Project } from "@/lib/constants"

export function CaseStudyContent({ project }: { project: Project }) {
	const t = useTranslations("caseStudy")

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden bg-surface-a px-5 pt-32 pb-20 md:px-12 md:pt-40 md:pb-28">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
				<div
					className="pointer-events-none absolute top-0 right-1/4 h-[400px] w-[600px] rounded-full opacity-[0.08] blur-[80px]"
					style={{ background: project.accentColor }}
				/>

				<div className="relative mx-auto max-w-[1100px]">
					<AnimatedSection>
						<Link
							href="/realisations"
							className="mb-8 inline-flex items-center gap-2 text-sm text-djanni-gray-light transition-colors hover:text-foreground"
						>
							<IconArrowLeft size={14} />
							{t("backLink")}
						</Link>

						<div className="grid items-start gap-10 md:grid-cols-[1fr_auto] md:gap-16">
							<div>
								<span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("context")}
								</span>
								<h1 className="font-heading text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight">
									{project.name}
								</h1>
								<p className="mt-2 text-lg text-djanni-gray-light">{project.type}</p>

								<div className="mt-8 flex flex-wrap gap-6">
									<div className="flex items-center gap-2 text-sm text-djanni-gray-light">
										<IconMapPin size={16} className="text-djanni-orange" />
										{project.location}
									</div>
									<div className="flex items-center gap-2 text-sm text-djanni-gray-light">
										<IconClock size={16} className="text-djanni-orange" />
										{project.duration}
									</div>
									<div className="flex items-center gap-2 text-sm text-djanni-gray-light">
										<IconCalendar size={16} className="text-djanni-orange" />
										{project.year}
									</div>
								</div>

								{project.url && (
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-djanni-orange hover:text-djanni-orange"
									>
										<IconExternalLink size={16} />
										{t("visitSite")}
									</a>
								)}
							</div>

							<div
								className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl font-heading text-3xl font-extrabold text-white shadow-lg"
								style={{
									background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}cc)`,
								}}
							>
								{project.logoText}
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Screenshots gallery */}
			{project.screenshots && project.screenshots.length > 0 && (
				<section className="bg-surface-b px-5 py-20 md:px-12">
					<div className="mx-auto max-w-[1100px]">
						<AnimatedSection>
							{/* Main screenshot */}
							<BrowserMockup className="mx-auto max-w-[900px]" noPadding>
								<div className="relative aspect-video w-full">
									<Image
										src={project.screenshots[0]}
										alt={`${project.name} — Accueil`}
										fill
										className="object-cover object-top"
										sizes="(max-width: 768px) 95vw, 900px"
										priority
									/>
								</div>
							</BrowserMockup>

							{/* Secondary screenshots */}
							{project.screenshots.length > 1 && (
								<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{project.screenshots.slice(1).map((src, i) => (
										<BrowserMockup key={src} noPadding>
											<div className="relative aspect-video w-full">
												<Image
													src={src}
													alt={`${project.name} — Capture ${i + 2}`}
													fill
													className="object-cover object-top"
													sizes="(max-width: 640px) 95vw, (max-width: 1024px) 45vw, 30vw"
												/>
											</div>
										</BrowserMockup>
									))}
								</div>
							)}
						</AnimatedSection>
					</div>
				</section>
			)}

			{/* Context & Problem */}
			<section className="bg-surface-b px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[800px]">
					<StaggerContainer className="grid gap-16">
						<StaggerItem>
							<div>
								<span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("context")}
								</span>
								<p className="text-[17px] leading-relaxed text-djanni-gray-light">
									{project.context}
								</p>
							</div>
						</StaggerItem>
						<StaggerItem>
							<div>
								<span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("problem")}
								</span>
								<p className="text-[17px] leading-relaxed text-djanni-gray-light">
									{project.problem}
								</p>
							</div>
						</StaggerItem>
						<StaggerItem>
							<div>
								<span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
									{t("solution")}
								</span>
								<p className="text-[17px] leading-relaxed text-djanni-gray-light">
									{project.solution}
								</p>
							</div>
						</StaggerItem>
					</StaggerContainer>
				</div>
			</section>

			{/* Results */}
			<section className="bg-surface-a px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<SectionHeader tag={t("results")} title={t("results")} align="center" />
					</AnimatedSection>

					<StaggerContainer className="mx-auto mt-12 grid max-w-[800px] gap-4 md:grid-cols-2">
						{project.results.map((result) => (
							<StaggerItem key={result}>
								<div className="flex items-start gap-4 rounded-xl border border-border bg-surface-b p-6">
									<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-djanni-orange/15 text-djanni-orange">
										<IconCheck size={14} />
									</div>
									<span className="text-[15px] leading-relaxed text-djanni-gray-light">
										{result}
									</span>
								</div>
							</StaggerItem>
						))}
					</StaggerContainer>
				</div>
			</section>

			{/* Tech stack */}
			<section className="bg-surface-b px-5 py-20 md:px-12">
				<div className="mx-auto max-w-[800px]">
					<AnimatedSection>
						<div className="flex flex-col items-center gap-4">
							<span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-djanni-orange">
								{t("techStack")}
							</span>
							<div className="flex flex-wrap justify-center gap-3">
								{project.techStack.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-border bg-white/6 px-4 py-2 text-sm text-djanni-gray-light"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</AnimatedSection>
				</div>
			</section>

			{/* Testimonial */}
			{project.testimonial && (
				<section className="bg-surface-a px-5 py-28 md:px-12">
					<div className="mx-auto max-w-[700px]">
						<AnimatedSection>
							<div className="flex flex-col items-center text-center">
								<IconQuote size={40} className="mb-6 text-djanni-orange/40" />
								<blockquote className="text-xl font-light italic leading-relaxed text-djanni-gray-light md:text-2xl">
									&ldquo;{project.testimonial.quote}&rdquo;
								</blockquote>
								<div className="mt-6">
									<div className="font-heading text-base font-bold">
										{project.testimonial.author}
									</div>
									<div className="text-sm text-djanni-gray">{project.testimonial.role}</div>
								</div>
							</div>
						</AnimatedSection>
					</div>
				</section>
			)}

			{/* CTA */}
			<section className="bg-surface-b px-5 py-28 md:px-12">
				<div className="mx-auto max-w-[1100px]">
					<AnimatedSection>
						<div className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-16 text-center md:px-16">
							<h2 className="font-heading text-[clamp(28px,3.5vw,40px)] font-extrabold leading-tight tracking-tight">
								{t("ctaTitle")}
							</h2>
							<p className="mt-4 max-w-[460px] text-[17px] font-light leading-relaxed text-djanni-gray-light">
								{t("ctaText")}
							</p>
							<div className="mt-8 flex flex-col gap-4 sm:flex-row">
								<Link
									href="/#contact"
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
