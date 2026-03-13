"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { BrowserMockup } from "@/components/ui/browser-mockup"
import { Link } from "@/i18n/navigation"
import type { Project } from "@/lib/constants"

function ConceptLogo({ logoText, accentColor }: { logoText: string; accentColor: string }) {
	return (
		<div className="relative flex h-full w-full items-center justify-center">
			{/* Radial glow behind logo */}
			<div
				className="absolute h-32 w-32 rounded-full opacity-15 blur-2xl"
				style={{ background: accentColor }}
			/>
			{/* Logo badge */}
			<div
				className="relative flex h-20 w-20 items-center justify-center rounded-2xl font-heading text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-105"
				style={{
					background: `linear-gradient(135deg, ${accentColor}, ${accentColor}90)`,
					boxShadow: `0 8px 32px ${accentColor}30`,
				}}
			>
				{logoText}
			</div>
		</div>
	)
}

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
	const isMain = project.span2
	const isConcept = !project.image

	return (
		<Link
			href={`/realisations/${project.slug}`}
			className={cn(
				"group block cursor-pointer overflow-hidden rounded-xl border border-border bg-surface-b transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
				isMain && "md:col-span-2",
			)}
		>
			{/* Visual area */}
			<div
				className={cn(
					"relative flex items-center justify-center overflow-hidden bg-linear-to-br from-[#161614] to-[#1e1e1c]",
					isMain ? "aspect-16/8 p-0" : "aspect-video p-6",
				)}
			>
				{/* Accent glow */}
				<div
					className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-[60px] transition-opacity duration-300 group-hover:opacity-30"
					style={{ background: project.accentColor }}
				/>

				{/* Secondary glow for concept cards */}
				{isConcept && (
					<div
						className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full opacity-10 blur-[60px]"
						style={{ background: project.accentColor }}
					/>
				)}

				{/* Dot pattern for concept cards */}
				{isConcept && (
					<div
						className="pointer-events-none absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
				)}

				{/* Hover overlay */}
				<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				{isMain ? (
					<div className="h-4/5 w-4/5">
						{project.image ? (
							<BrowserMockup
								className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
								noPadding
							>
								<div className="relative h-full w-full">
									<Image
										src={project.image}
										alt={project.name}
										fill
										className="object-cover object-top"
										sizes="(max-width: 768px) 90vw, 60vw"
										priority={priority}
									/>
								</div>
							</BrowserMockup>
						) : (
							<ConceptLogo logoText={project.logoText} accentColor={project.accentColor} />
						)}
					</div>
				) : project.image ? (
					<BrowserMockup
						className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
						noPadding
					>
						<div className="relative aspect-video w-full">
							<Image
								src={project.image}
								alt={project.name}
								fill
								className="object-cover object-top"
								sizes="(max-width: 768px) 90vw, 50vw"
							/>
						</div>
					</BrowserMockup>
				) : (
					<ConceptLogo logoText={project.logoText} accentColor={project.accentColor} />
				)}
			</div>

			{/* Info bar */}
			<div className="relative border-t border-border">
				{/* Accent line on hover */}
				<div
					className="absolute top-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
					style={{ background: project.accentColor }}
				/>
				<div className="flex items-center justify-between px-5 py-4 md:px-6">
					<div>
						<div className="font-heading text-[15px] font-bold">{project.name}</div>
						<div className="mt-0.5 text-xs text-djanni-gray">{project.type}</div>
						<div className="mt-0.5 text-[11px] text-djanni-gray-light">
							{project.location} &middot; {project.year}
						</div>
					</div>
					<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
						<IconArrowRight
							size={14}
							className="transition-transform duration-300 group-hover:-rotate-45"
						/>
					</div>
				</div>
			</div>
		</Link>
	)
}
