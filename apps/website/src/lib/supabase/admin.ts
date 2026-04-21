/**
 * Client Supabase ADMIN (cle service_role).
 *
 * SECURITE :
 *   - Bypass toutes les RLS.
 *   - Jamais cote client/browser.
 *   - Jamais commit (env vars uniquement).
 *
 * Usage :
 *   - Increment view_count + insert audit_views (anon n a pas le UPDATE)
 *   - Seed / scripts admin / webhooks
 *
 * Pour les operations qui doivent conserver l audit trail d un admin, preferer
 * createSupabaseServerClient avec un user present dans admin_users.
 */

import { createClient } from "@supabase/supabase-js"

export function createSupabaseAdminClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

	if (!supabaseUrl || !serviceRoleKey) {
		throw new Error(
			"Variables d environnement manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requises cote serveur.",
		)
	}

	return createClient(supabaseUrl, serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	})
}
