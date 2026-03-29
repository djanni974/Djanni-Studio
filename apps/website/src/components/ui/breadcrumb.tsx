import { cn } from "@repo/ui/lib/utils"
import { Link } from "@/i18n/navigation"

const SITE_URL = "https://www.djannistudio.fr"

type BreadcrumbItem = {
	label: string
	href: string
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.label,
			item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
		})),
	}

	const lastIndex = items.length - 1

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<nav aria-label="Breadcrumb" className={cn("text-xs", className)}>
				<ol className="flex items-center gap-1.5 text-djanni-gray-light">
					{items.map((item, i) => (
						<li key={item.href} className="flex items-center gap-1.5">
							{i > 0 && <span className="text-border">/</span>}
							{i < lastIndex ? (
								<Link href={item.href} className="transition-colors hover:text-foreground">
									{item.label}
								</Link>
							) : (
								<span className="text-djanni-gray">{item.label}</span>
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	)
}
