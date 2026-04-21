/**
 * GET /api/projects
 *
 * Retourne les projets livres publies comme case studies
 * (projects.published_as_case_study = TRUE).
 *
 * Policy exploitee : public_read_published_projects (cle anon).
 *
 * Query params :
 *   ?offer=vitrine  - filtre par offre (presence|vitrine|sur_mesure|custom)
 *   ?limit=12       - default 50, max 100
 */

import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { OfferType, ProjectPublic } from "@/lib/supabase/types"

// Route dynamique : query params + cache CDN via Cache-Control header
export const dynamic = "force-dynamic"

const VALID_OFFERS: readonly OfferType[] = ["presence", "vitrine", "sur_mesure", "custom"]

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const offer = searchParams.get("offer")
		const rawLimit = Number.parseInt(searchParams.get("limit") ?? "50", 10)
		const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50

		const supabase = await createSupabaseServerClient()

		let query = supabase
			.from("projects")
			.select(
				"id, slug, title, offer, description_short, description_long, before_screenshot_url, after_screenshot_url, cover_image_url, production_url, delivered_at, lighthouse_scores, results_metrics, display_order",
			)
			.eq("published_as_case_study", true)
			.order("display_order", { ascending: true })
			.order("delivered_at", { ascending: false, nullsFirst: false })
			.limit(limit)

		if (offer && VALID_OFFERS.includes(offer as OfferType)) {
			query = query.eq("offer", offer)
		}

		const { data, error } = await query

		if (error) {
			console.error("[api/projects] supabase error", error)
			return NextResponse.json({ error: "Impossible de recuperer les projets." }, { status: 500 })
		}

		const projects = (data ?? []) as ProjectPublic[]

		return NextResponse.json(
			{ data: projects, count: projects.length },
			{
				status: 200,
				headers: {
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
				},
			},
		)
	} catch (err) {
		console.error("[api/projects] unexpected error", err)
		return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
	}
}
