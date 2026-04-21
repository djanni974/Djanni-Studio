import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
	matcher: [
		// Match all pathnames except:
		// - /api (API routes)
		// - /audit (share-links non localises, rendu direct /audit/[slug])
		// - /_next (Next.js internals)
		// - /icons, /sw.js, /manifest.json (static files)
		// - Files with extensions (e.g. favicon.ico)
		"/((?!api|audit|_next|icons|sw\\.js|manifest\\.json|.*\\..*).*)",
	],
}
