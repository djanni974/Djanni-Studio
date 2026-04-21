/**
 * Types du domaine Djanni Studio (lecture publique + ecriture admin).
 *
 * Pour regenerer les types complets depuis le schema Supabase :
 *   pnpm dlx supabase gen types typescript --project-id isrtvgenawcutmoqscud \
 *     > src/lib/supabase/database.types.ts
 */

export type OfferType = "presence" | "vitrine" | "sur_mesure" | "custom"

export type ContactStatus =
	| "new"
	| "qualified"
	| "contacted"
	| "audit_sent"
	| "quote_sent"
	| "won"
	| "lost"
	| "client"
	| "churned"

export type TestimonialSource = "google" | "direct" | "email" | "sms" | "video" | "other"

export type AuditStatus = "draft" | "published" | "archived"

export interface TestimonialPublic {
	id: string
	project_id: string | null
	author_name: string
	author_role: string | null
	author_company: string | null
	author_city: string | null
	author_photo_url: string | null
	content: string
	rating: number | null
	featured: boolean
	source: TestimonialSource
	source_url: string | null
	display_order: number
	collected_at: string | null
}

export interface ProjectPublic {
	id: string
	slug: string
	title: string
	offer: OfferType
	description_short: string | null
	description_long: string | null
	before_screenshot_url: string | null
	after_screenshot_url: string | null
	cover_image_url: string | null
	production_url: string | null
	delivered_at: string | null
	lighthouse_scores: Record<string, number>
	results_metrics: Record<string, unknown>
	display_order: number
}

export interface AuditScores {
	lighthouse?: number
	seo?: number
	design?: number
	mobile?: number
	security?: number
	[key: string]: number | undefined
}

export interface AuditFinding {
	category: string
	severity: "low" | "medium" | "high" | "critical"
	title: string
	description: string
	recommendation: string
}

export interface AuditProposal {
	offer: OfferType
	amount_ht: number
	delay_weeks: number
	pitch: string
}

export interface AuditPublic {
	id: string
	slug: string
	target_url: string
	target_business_name: string | null
	target_business_activity: string | null
	target_city: string | null
	scores: AuditScores
	findings: AuditFinding[]
	proposal: AuditProposal | Record<string, never>
	expires_at: string | null
	created_at: string
}

export interface AuditCreateInput {
	slug: string
	contact_id?: string | null
	target_url: string
	target_business_name?: string
	target_business_activity?: string
	target_city?: string
	scores?: AuditScores
	findings?: AuditFinding[]
	proposal?: AuditProposal
	expires_at?: string | null
	status?: AuditStatus
}
