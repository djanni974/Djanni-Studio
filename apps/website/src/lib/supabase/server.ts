/**
 * Client Supabase cote serveur (cle anon + cookies de session).
 *
 * A utiliser dans les Route Handlers et Server Components qui doivent respecter
 * les RLS selon l utilisateur connecte. Pour bypasser les RLS (creation audit,
 * increment view_count, ...), utiliser createSupabaseAdminClient depuis ./admin.
 *
 * Next.js 16 : cookies() est async, donc cette factory l est aussi.
 */

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createSupabaseServerClient() {
	const cookieStore = await cookies()

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error(
			"Variables d environnement manquantes : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont requises.",
		)
	}

	return createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookieStore.set(name, value, options)
					})
				} catch {
					// Contexte Server Component : cookies en read-only, le middleware
					// de session rafraichira ailleurs.
				}
			},
		},
	})
}

/**
 * Recupere l utilisateur authentifie ou null.
 */
export async function getAuthenticatedUser() {
	const supabase = await createSupabaseServerClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error || !user) {
		return null
	}

	return user
}

/**
 * Verifie que l utilisateur est admin (present dans public.admin_users).
 * Retourne l user si admin, null sinon.
 */
export async function requireAdmin() {
	const supabase = await createSupabaseServerClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return null

	const { data: isAdminRow } = await supabase
		.from("admin_users")
		.select("user_id")
		.eq("user_id", user.id)
		.maybeSingle()

	return isAdminRow ? user : null
}
