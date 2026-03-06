import { cn } from "@repo/ui/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const badgeVariants = cva(
	"inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
	{
		variants: {
			variant: {
				default: "bg-primary/10 text-primary border border-primary/20",
				secondary: "bg-secondary text-secondary-foreground border border-border",
				outline: "border border-border text-muted-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
