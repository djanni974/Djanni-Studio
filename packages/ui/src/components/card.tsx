import { cn } from "@repo/ui/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const cardVariants = cva(
	"flex flex-col rounded-xl border border-border bg-surface-b text-foreground transition-[transform,border-color,box-shadow] duration-300",
	{
		variants: {
			highlighted: {
				true: "border-djanni-orange/40 ring-2 ring-djanni-orange/40 ring-offset-2 ring-offset-background shadow-[0_8px_30px_rgba(232,80,10,0.12)]",
				false: "",
			},
		},
		defaultVariants: {
			highlighted: false,
		},
	},
)

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>

function Card({ className, highlighted, ...props }: CardProps) {
	return <div className={cn(cardVariants({ highlighted }), className)} {...props} />
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex flex-col gap-1.5 p-8 pb-4", className)} {...props} />
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn("font-heading text-xl font-bold leading-tight tracking-tight", className)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn("text-sm text-djanni-gray-light", className)} {...props} />
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex flex-1 flex-col px-8 pb-4", className)} {...props} />
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("mt-auto flex flex-col p-8 pt-4", className)} {...props} />
}

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	cardVariants,
}
