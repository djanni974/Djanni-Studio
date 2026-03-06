import { Slot } from "@radix-ui/react-slot"
import { cn } from "@repo/ui/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithRef } from "react"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-djanni-orange-light",
				outline:
					"border border-border bg-transparent text-foreground hover:bg-secondary hover:border-djanni-gray",
				ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary",
				link: "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
			},
			size: {
				default: "h-11 px-6 py-2",
				sm: "h-9 px-4 text-xs",
				lg: "h-12 px-8 text-base",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

type ButtonProps = ComponentPropsWithRef<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}

function Button({ className, variant, size, asChild = false, ref, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : "button"
	return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
