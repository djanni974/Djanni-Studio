"use client"

import { cn } from "@repo/ui/lib/utils"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { useState } from "react"

type AccordionItemProps = {
	question: string
	answer: string
	isOpen: boolean
	onToggle: () => void
	isLast: boolean
	id: string
}

function AccordionItem({ question, answer, isOpen, onToggle, isLast, id }: AccordionItemProps) {
	const buttonId = `${id}-button`
	const panelId = `${id}-panel`

	return (
		<div className={cn("overflow-hidden", !isLast && "border-b border-border")}>
			<button
				id={buttonId}
				type="button"
				onClick={onToggle}
				aria-expanded={isOpen}
				aria-controls={panelId}
				className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-djanni-orange"
			>
				<span className="font-heading text-[17px] font-bold leading-snug">{question}</span>
				<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors">
					{isOpen ? (
						<IconMinus size={14} className="text-djanni-orange" />
					) : (
						<IconPlus size={14} className="text-djanni-gray" />
					)}
				</span>
			</button>

			<section
				id={panelId}
				aria-labelledby={buttonId}
				className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
				style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
			>
				<div className="overflow-hidden">
					<p
						className="pb-6 text-[15px] leading-relaxed text-djanni-gray-light transition-opacity duration-300"
						style={{ opacity: isOpen ? 1 : 0 }}
					>
						{answer}
					</p>
				</div>
			</section>
		</div>
	)
}

export function Accordion({
	items,
	id,
}: {
	items: { question: string; answer: string }[]
	id: string
}) {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	return (
		<div className="rounded-xl border border-border bg-surface-b px-7 md:px-9">
			{items.map((item, i) => (
				<AccordionItem
					key={item.question}
					id={`${id}-${i}`}
					question={item.question}
					answer={item.answer}
					isOpen={openIndex === i}
					onToggle={() => setOpenIndex(openIndex === i ? null : i)}
					isLast={i === items.length - 1}
				/>
			))}
		</div>
	)
}
