/**
 * GET /api/audits/[slug]
 *
 * API publique d'un audit partageable (status = published et non expire).
 * Rate-limitee par IP (anti brute-force / anti write-amplification des vues).
 *
 * La lecture + le tracking de vue vivent dans lib/supabase/audits.ts, partages
 * avec la page /audit/[slug] (qui lit en direct, sans repasser par cette route).
 */

import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/rate-limit"
import { getPublishedAuditAndTrackView } from "@/lib/supabase/audits"

export const dynamic = "force-dynamic"

function extractClientIp(request: Request): string | null {
	const forwarded = request.headers.get("x-forwarded-for")
	if (forwarded) return forwarded.split(",")[0].trim()
	return request.headers.get("x-real-ip")
}

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await context.params

		if (!slug || slug.length > 200) {
			return NextResponse.json({ error: "Slug invalide." }, { status: 400 })
		}

		const ip = extractClientIp(request)
		const allowed = await rateLimit(ip ?? "unknown", {
			prefix: "audit-view",
			limit: 30,
			windowSeconds: 60,
		})

		if (!allowed) {
			return NextResponse.json(
				{ error: "Trop de requetes. Reessayez dans une minute." },
				{ status: 429 },
			)
		}

		const result = await getPublishedAuditAndTrackView(slug, {
			ip,
			userAgent: request.headers.get("user-agent"),
			referer: request.headers.get("referer"),
		})

		switch (result.status) {
			case "ok":
				return NextResponse.json({ data: result.audit }, { status: 200 })
			case "expired":
				return NextResponse.json({ error: "Audit expire." }, { status: 410 })
			case "error":
				return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
			default:
				return NextResponse.json({ error: "Audit introuvable." }, { status: 404 })
		}
	} catch (err) {
		console.error("[api/audits/:slug] unexpected error", err)
		return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
	}
}
