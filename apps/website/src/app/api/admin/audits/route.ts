/**
 * Routes admin audits. Reservees aux user_id presents dans public.admin_users.
 *
 * POST /api/admin/audits : cree un audit.
 * GET  /api/admin/audits : liste tous les audits (dashboard).
 *
 * Body POST (voir AuditCreateInput) :
 *   {
 *     slug: "vincent-carreleur-a7x",        // unique, URL-safe
 *     contact_id: "uuid" | null,
 *     target_url: "https://client.fr",
 *     target_business_name: "SARL Carrelages Masson",
 *     target_business_activity: "carreleur",
 *     target_city: "Saint-Malo",
 *     scores: { lighthouse: 45, ... },
 *     findings: [ { category, severity, title, description, recommendation } ],
 *     proposal: { offer: "vitrine", amount_ht: 1490, delay_weeks: 3, pitch: "..." },
 *     expires_at: "2026-05-21T00:00:00Z" | null,
 *     status: "draft" | "published"         // default 'draft'
 *   }
 */

import { NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/supabase/server"
import type { AuditCreateInput, AuditStatus } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://djannistudio.fr"
const VALID_STATUSES: readonly AuditStatus[] = ["draft", "published", "archived"]

function isValidSlug(slug: unknown): slug is string {
	return (
		typeof slug === "string" && slug.length > 0 && slug.length <= 120 && /^[a-z0-9-]+$/.test(slug)
	)
}

function isValidUrl(value: unknown): value is string {
	if (typeof value !== "string" || value.length === 0) return false
	try {
		const url = new URL(value)
		return url.protocol === "http:" || url.protocol === "https:"
	} catch {
		return false
	}
}

export async function POST(request: Request) {
	const admin = await requireAdmin()
	if (!admin) {
		return NextResponse.json({ error: "Non autorise." }, { status: 401 })
	}

	let body: Partial<AuditCreateInput>
	try {
		body = (await request.json()) as Partial<AuditCreateInput>
	} catch {
		return NextResponse.json({ error: "Body JSON invalide." }, { status: 400 })
	}

	if (!isValidSlug(body.slug)) {
		return NextResponse.json(
			{ error: "slug invalide : lowercase alphanumerique + tirets, <= 120 car." },
			{ status: 400 },
		)
	}

	if (!isValidUrl(body.target_url)) {
		return NextResponse.json(
			{ error: "target_url invalide : URL http(s) requise." },
			{ status: 400 },
		)
	}

	const status: AuditStatus =
		body.status && VALID_STATUSES.includes(body.status) ? body.status : "draft"

	const payload = {
		slug: body.slug,
		contact_id: body.contact_id ?? null,
		target_url: body.target_url,
		target_business_name: body.target_business_name ?? null,
		target_business_activity: body.target_business_activity ?? null,
		target_city: body.target_city ?? null,
		scores: body.scores ?? {},
		findings: body.findings ?? [],
		proposal: body.proposal ?? {},
		expires_at: body.expires_at ?? null,
		status,
	}

	// service_role : bypass RLS. Identite admin deja verifiee par requireAdmin().
	const supabase = createSupabaseAdminClient()
	const { data, error } = await supabase.from("audits").insert(payload).select().single()

	if (error) {
		console.error("[api/admin/audits POST] insert error", error)
		if (error.code === "23505") {
			return NextResponse.json({ error: "Slug deja utilise." }, { status: 409 })
		}
		return NextResponse.json({ error: "Impossible de creer l audit." }, { status: 500 })
	}

	return NextResponse.json(
		{
			data,
			public_url: status === "published" ? `${SITE_URL}/audit/${data.slug}` : null,
		},
		{ status: 201 },
	)
}

export async function GET() {
	const admin = await requireAdmin()
	if (!admin) {
		return NextResponse.json({ error: "Non autorise." }, { status: 401 })
	}

	const supabase = createSupabaseAdminClient()
	const { data, error } = await supabase
		.from("audits")
		.select(
			"id, slug, contact_id, target_url, target_business_name, target_city, status, view_count, first_viewed_at, last_viewed_at, expires_at, created_at",
		)
		.order("created_at", { ascending: false })
		.limit(200)

	if (error) {
		console.error("[api/admin/audits GET] list error", error)
		return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
	}

	return NextResponse.json({ data: data ?? [], count: data?.length ?? 0 }, { status: 200 })
}
