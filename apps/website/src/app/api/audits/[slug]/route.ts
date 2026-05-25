/**
 * GET /api/audits/[slug]
 *
 * Renvoie un audit partageable si status = published et non expire.
 *
 * Side effects (via service_role) :
 *   - Incremente view_count
 *   - Met a jour first_viewed_at (si NULL) + last_viewed_at
 *   - Insere une ligne audit_views (ip hashee SHA-256, user_agent, referer)
 *
 * RGPD : on ne stocke jamais l IP brute.
 */

import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import type { AuditPublic } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

let cachedIpHashSalt: string | null = null

/**
 * Resout le sel de hash des IP a la PREMIERE requete, pas au chargement du module.
 *
 * Lire le sel au niveau module le faisait evaluer pendant `next build` (collecte
 * des page data, NODE_ENV=production) ou la variable n'est pas injectee dans
 * l'environnement du build (Turborepo la filtre) : le throw fail-closed cassait
 * alors le build de prod. On differe donc la resolution au runtime, ou Vercel
 * injecte bien la variable dans la fonction serverless.
 *
 * RGPD : sans sel secret, les hash d IP sont reversibles (l espace IPv4 est
 * brute-forcable en SHA-256). En production, l absence de AUDIT_VIEW_IP_SALT
 * reste une erreur fatale (fail-closed) au moment de la requete ; en dev/test
 * on tolere un sel par defaut explicite.
 */
function getIpHashSalt(): string {
	if (cachedIpHashSalt !== null) return cachedIpHashSalt

	const salt = process.env.AUDIT_VIEW_IP_SALT
	if (salt && salt.length > 0) {
		cachedIpHashSalt = salt
		return cachedIpHashSalt
	}

	if (process.env.NODE_ENV === "production") {
		throw new Error(
			"AUDIT_VIEW_IP_SALT manquant en production : requis pour anonymiser les IP des vues d audit (RGPD). Definir la variable dans les env Vercel.",
		)
	}

	console.warn(
		"[api/audits/:slug] AUDIT_VIEW_IP_SALT absent : fallback dev. NE JAMAIS utiliser en production.",
	)
	cachedIpHashSalt = "djanni-dev-only-salt"
	return cachedIpHashSalt
}

function hashIp(ip: string | null): string | null {
	if (!ip) return null
	return createHash("sha256").update(`${getIpHashSalt()}:${ip}`).digest("hex").slice(0, 32)
}

function extractClientIp(request: Request): string | null {
	const headers = request.headers
	const forwarded = headers.get("x-forwarded-for")
	if (forwarded) return forwarded.split(",")[0].trim()
	return headers.get("x-real-ip")
}

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await context.params

		if (!slug || slug.length > 200) {
			return NextResponse.json({ error: "Slug invalide." }, { status: 400 })
		}

		const supabase = createSupabaseAdminClient()

		const { data: audit, error: fetchError } = await supabase
			.from("audits")
			.select(
				"id, slug, target_url, target_business_name, target_business_activity, target_city, scores, findings, proposal, expires_at, created_at, status, view_count",
			)
			.eq("slug", slug)
			.maybeSingle()

		if (fetchError) {
			console.error("[api/audits/:slug] fetch error", fetchError)
			return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
		}

		if (!audit) {
			return NextResponse.json({ error: "Audit introuvable." }, { status: 404 })
		}

		if (audit.status !== "published") {
			return NextResponse.json({ error: "Audit non disponible." }, { status: 404 })
		}

		if (audit.expires_at && new Date(audit.expires_at).getTime() < Date.now()) {
			return NextResponse.json({ error: "Audit expire." }, { status: 410 })
		}

		const ipHash = hashIp(extractClientIp(request))
		const userAgent = request.headers.get("user-agent")
		const referer = request.headers.get("referer")
		const now = new Date().toISOString()

		await Promise.allSettled([
			supabase
				.from("audits")
				.update({
					view_count: (audit.view_count ?? 0) + 1,
					last_viewed_at: now,
				})
				.eq("id", audit.id),
			supabase.from("audit_views").insert({
				audit_id: audit.id,
				ip_hash: ipHash,
				user_agent: userAgent,
				referer: referer,
			}),
		])

		// first_viewed_at : second update conditionnel pour ne pas ecraser
		const { data: currentAudit } = await supabase
			.from("audits")
			.select("first_viewed_at")
			.eq("id", audit.id)
			.maybeSingle()

		if (currentAudit && !currentAudit.first_viewed_at) {
			await supabase.from("audits").update({ first_viewed_at: now }).eq("id", audit.id)
		}

		const publicPayload: AuditPublic = {
			id: audit.id,
			slug: audit.slug,
			target_url: audit.target_url,
			target_business_name: audit.target_business_name,
			target_business_activity: audit.target_business_activity,
			target_city: audit.target_city,
			scores: audit.scores ?? {},
			findings: audit.findings ?? [],
			proposal: audit.proposal ?? {},
			expires_at: audit.expires_at,
			created_at: audit.created_at,
		}

		return NextResponse.json({ data: publicPayload }, { status: 200 })
	} catch (err) {
		console.error("[api/audits/:slug] unexpected error", err)
		return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
	}
}
