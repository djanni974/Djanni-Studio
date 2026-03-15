"use client"

import { IconRefresh } from "@tabler/icons-react"
import { useTranslations } from "next-intl"

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js requires default export named Error
export default function Error({ reset }: { error: globalThis.Error; reset: () => void }) {
	const t = useTranslations("notFound")

	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
			<h1 className="mb-4 font-heading text-4xl font-extrabold">Oops</h1>
			<p className="mb-8 max-w-md text-lg text-djanni-gray-light">{t("subtitle")}</p>
			<button
				type="button"
				onClick={reset}
				className="inline-flex items-center gap-2 rounded-lg bg-djanni-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-djanni-orange-light"
			>
				<IconRefresh size={16} />
				Réessayer
			</button>
		</main>
	)
}
