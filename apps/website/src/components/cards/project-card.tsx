"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconArrowRight } from "@tabler/icons-react"
import Image from "next/image"
import { BrowserMockup } from "@/components/ui/browser-mockup"
import { Link } from "@/i18n/navigation"
import type { Project } from "@/lib/constants"

function ConceptMockupContent({ accentColor }: { accentColor: string }) {
	return (
		<>
			<div
				className="flex items-center gap-2 rounded p-2.5"
				style={{
					background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}25)`,
				}}
			>
				<div className="h-5 w-5 shrink-0 rounded" style={{ background: accentColor }} />
				<div className="flex-1">
					<div className="h-1.5 w-[70%] rounded-full bg-white/15" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-1.5">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="h-7 rounded border border-white/5 bg-white/4" />
				))}
			</div>
		</>
	)
}

export function ProjectCard({ project }: { project: Project }) {
	const isMain = project.span2

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
					className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 blur-[60px]"
					style={{ background: project.accentColor }}
				/>

				{/* Hover overlay */}
				<div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				{isMain ? (
					<div className="h-4/5 w-4/5">
						{project.image ? (
							<BrowserMockup className="h-full w-full" noPadding>
								<div className="relative h-full w-full">
									<Image
										src={project.image}
										alt={project.name}
										fill
										className="object-cover object-top"
										sizes="(max-width: 768px) 90vw, 60vw"
									/>
								</div>
							</BrowserMockup>
						) : (
							<BrowserMockup className="h-full w-full">
								<div className="flex flex-col gap-2.5">
									<ConceptMockupContent accentColor={project.accentColor} />
								</div>
							</BrowserMockup>
						)}
					</div>
				) : project.image ? (
					<BrowserMockup className="w-full" noPadding>
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
					<BrowserMockup className="w-full">
						<div className="flex flex-col gap-2">
							<ConceptMockupContent accentColor={project.accentColor} />
						</div>
					</BrowserMockup>
				)}
			</div>

			{/* Info bar */}
			<div className="flex items-center justify-between border-t border-border px-5 py-4 md:px-6">
				<div>
					<div className="font-heading text-[15px] font-bold">{project.name}</div>
					<div className="mt-0.5 text-xs text-djanni-gray">{project.type}</div>
				</div>
				<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-djanni-gray transition-all duration-300 group-hover:border-djanni-orange group-hover:bg-djanni-orange group-hover:text-white">
					<IconArrowRight size={14} />
				</div>
			</div>
		</Link>
	)
}
