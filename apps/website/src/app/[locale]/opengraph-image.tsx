import { getTranslations } from "next-intl/server"
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Djanni Studio - Sites web pour artisans et commercants"

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "hero" })

	return renderOgImage({
		title: `${t("taglineStart")}${t("taglineHighlight")}${t("taglineEnd")}`,
		subtitle: t("heading"),
	})
}
