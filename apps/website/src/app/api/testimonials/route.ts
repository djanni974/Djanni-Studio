/**
 * GET /api/testimonials
 *
 * Retourne les temoignages publies (testimonials.published = TRUE).
 * Tri : featured desc, display_order asc, created_at desc.
 *
 * Policy exploitee : public_read_published_testimonials (cle anon).
 *
 * Query params :
 *   ?featured=true  - ne retourne que featured (pour homepage)
 *   ?limit=6        - default 50, max 100
 */

import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { TestimonialPublic } from "@/lib/supabase/types"

// Route dynamique : query params + cache CDN via Cache-Control header
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const featuredOnly = searchParams.get("featured") === "true"
		const rawLimit = Number.parseInt(searchParams.get("limit") ?? "50", 10)
		const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 100) : 50

		const supabase = await createSupabaseServerClient()

		let query = supabase
			.from("testimonials")
			.select(
				"id, project_id, author_name, author_role, author_company, author_city, author_photo_url, content, rating, featured, source, source_url, display_order, collected_at",
			)
			.eq("published", true)
			.order("featured", { ascending: false })
			.order("display_order", { ascending: true })
			.order("created_at", { ascending: false })
			.limit(limit)

		if (featuredOnly) {
			query = query.eq("featured", true)
		}

		const { data, error } = await query

		if (error) {
			console.error("[api/testimonials] supabase error", error)
			return NextResponse.json(
				{ error: "Impossible de recuperer les temoignages." },
				{ status: 500 },
			)
		}

		const testimonials = (data ?? []) as TestimonialPublic[]

		return NextResponse.json(
			{ data: testimonials, count: testimonials.length },
			{
				status: 200,
				headers: {
					"Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
				},
			},
		)
	} catch (err) {
		console.error("[api/testimonials] unexpected error", err)
		return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
	}
}
