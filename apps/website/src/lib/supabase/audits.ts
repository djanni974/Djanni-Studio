/**
 * Lecture + tracking de vue d'un audit publie. Server-only : utilise le client
 * service_role qui bypasse les RLS.
 *
 * Utilise par :
 *   - la page /audit/[slug] (lecture directe, sans self-fetch HTTP)
 *   - la route GET /api/audits/[slug] (API publique, rate-limitee en amont)
 *
 * RGPD : on ne stocke jamais l'IP brute (hash SHA-256 sale).
 */

import { createHash } from "node:crypto"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import type { AuditPublic } from "@/lib/supabase/types"

let cachedIpHashSalt: string | null = null

/**
 * Resout le sel de hash des IP au premier appel (runtime), pas au chargement du
 * module : la variable n'est pas injectee pendant `next build` (Turborepo la
 * filtre) et un throw au module-load casserait le build de prod.
 *
 * Sans sel secret, les hash d'IP sont reversibles (l'espace IPv4 est brute-
 * forcable en SHA-256). En prod, l'absence de AUDIT_VIEW_IP_SALT reste une erreur
 * fatale (fail-closed RGPD) ; en dev/test on tolere un sel par defaut explicite.
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
		"[lib/audits] AUDIT_VIEW_IP_SALT absent : fallback dev. NE JAMAIS utiliser en production.",
	)
	cachedIpHashSalt = "djanni-dev-only-salt"
	return cachedIpHashSalt
}

function hashIp(ip: string | null): string | null {
	if (!ip) return null
	return createHash("sha256").update(`${getIpHashSalt()}:${ip}`).digest("hex").slice(0, 32)
}

export type AuditViewMeta = {
	ip: string | null
	userAgent: string | null
	referer: string | null
}

export type AuditLookup =
	| { status: "ok"; audit: AuditPublic }
	| { status: "not_found" }
	| { status: "expired" }
	| { status: "error" }

/**
 * Renvoie l'audit publie correspondant au slug et enregistre une vue, ou un
 * statut d'echec. Un audit absent OU non publie renvoie "not_found" (pas d'oracle
 * draft/published). Ne leve pas : les erreurs DB sont mappees en "error", sauf
 * l'absence de sel en prod qui reste fatale (fail-closed RGPD).
 */
export async function getPublishedAuditAndTrackView(
	slug: string,
	meta: AuditViewMeta,
): Promise<AuditLookup> {
	const supabase = createSupabaseAdminClient()

	const { data: audit, error: fetchError } = await supabase
		.from("audits")
		.select(
			"id, slug, target_url, target_business_name, target_business_activity, target_city, scores, findings, proposal, expires_at, created_at, status, view_count",
		)
		.eq("slug", slug)
		.maybeSingle()

	if (fetchError) {
		console.error("[lib/audits] fetch error", fetchError)
		return { status: "error" }
	}

	if (!audit || audit.status !== "published") {
		return { status: "not_found" }
	}

	if (audit.expires_at && new Date(audit.expires_at).getTime() < Date.now()) {
		return { status: "expired" }
	}

	const ipHash = hashIp(meta.ip)
	const now = new Date().toISOString()

	await Promise.allSettled([
		supabase
			.from("audits")
			.update({ view_count: (audit.view_count ?? 0) + 1, last_viewed_at: now })
			.eq("id", audit.id),
		supabase.from("audit_views").insert({
			audit_id: audit.id,
			ip_hash: ipHash,
			user_agent: meta.userAgent,
			referer: meta.referer,
		}),
	])

	// first_viewed_at : second update conditionnel pour ne pas ecraser.
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

	return { status: "ok", audit: publicPayload }
}
