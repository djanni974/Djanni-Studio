import { cn } from "@repo/ui/lib/utils"
import type { HTMLAttributes } from "react"

type SeparatorProps = HTMLAttributes<HTMLHRElement> & {
	orientation?: "horizontal" | "vertical"
}

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
	return (
		<hr
			className={cn(
				"shrink-0 border-none bg-border",
				orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
				className,
			)}
			{...props}
		/>
	)
}

export { Separator }
