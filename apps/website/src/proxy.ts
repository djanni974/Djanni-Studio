import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
	matcher: [
		// Match all pathnames except:
		// - /api (API routes)
		// - /_next (Next.js internals)
		// - /icons, /sw.js, /manifest.json (static files)
		// - Files with extensions (e.g. favicon.ico)
		"/((?!api|_next|icons|sw\\.js|manifest\\.json|.*\\..*).*)",
	],
}
