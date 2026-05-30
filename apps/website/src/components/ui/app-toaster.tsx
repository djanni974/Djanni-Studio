"use client"

import { Toaster } from "sonner"

/**
 * Toaster sonner configure (charte Djanni). Monte uniquement sur les pages qui
 * declenchent des toasts (les formulaires), pas au global : `toast()` de sonner
 * passe par un emetteur global, le Toaster peut donc vivre sur la seule page
 * concernee. Evite d'embarquer sonner (~9 Kio gzip) dans le bundle de toutes les
 * pages (notamment la home). Voir /demande-projet.
 */
export function AppToaster() {
	return (
		<Toaster
			position="bottom-right"
			toastOptions={{
				style: {
					background: "var(--card)",
					border: "1px solid var(--border)",
					color: "var(--foreground)",
				},
			}}
		/>
	)
}
