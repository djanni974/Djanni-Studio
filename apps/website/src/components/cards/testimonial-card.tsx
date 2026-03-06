import { IconQuote, IconStarFilled } from "@tabler/icons-react"
import type { Testimonial } from "@/lib/constants"

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	return (
		<div className="relative flex flex-col rounded-xl border border-border bg-linear-to-b from-card to-surface-b p-8 md:p-9">
			{/* Quote icon */}
			<IconQuote size={32} className="mb-5 text-djanni-orange/20" stroke={1.5} />

			{/* Stars */}
			<div className="mb-5 flex gap-1">
				{Array.from({ length: testimonial.rating }).map((_, i) => (
					<IconStarFilled key={i} size={14} className="text-djanni-orange" />
				))}
			</div>

			{/* Quote text */}
			<p className="mb-7 flex-1 text-[15px] leading-relaxed text-djanni-gray-light">
				&ldquo;{testimonial.quote}&rdquo;
			</p>

			{/* Author */}
			<div className="flex items-center gap-3 border-t border-border pt-6">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-djanni-orange to-[#c44008] font-heading text-sm font-extrabold text-white">
					{testimonial.name.charAt(0)}
				</div>
				<div>
					<div className="font-heading text-sm font-bold">{testimonial.name}</div>
					<div className="text-xs text-djanni-gray">{testimonial.role}</div>
				</div>
			</div>
		</div>
	)
}
