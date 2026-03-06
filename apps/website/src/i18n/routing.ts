import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
	locales: ["fr", "en", "br"],
	defaultLocale: "fr",
	localePrefix: "as-needed",
})
