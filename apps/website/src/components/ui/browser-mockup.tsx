import { cn } from "@repo/ui/lib/utils"

export function BrowserMockup({
	children,
	className,
	noPadding,
}: {
	children: React.ReactNode
	className?: string
	noPadding?: boolean
}) {
	return (
		<div
			className={cn(
				"flex flex-col overflow-hidden rounded-lg border border-white/6 bg-[#2a2a28]",
				className,
			)}
		>
			{/* Browser bar */}
			<div className="flex h-7 shrink-0 items-center gap-1.5 bg-[#333331] px-3">
				<div className="h-2 w-2 rounded-full bg-[#ff5f57]" />
				<div className="h-2 w-2 rounded-full bg-[#febc2e]" />
				<div className="h-2 w-2 rounded-full bg-[#28c840]" />
			</div>
			{/* Content */}
			<div className={noPadding ? "min-h-0 flex-1" : "p-4"}>{children}</div>
		</div>
	)
}
