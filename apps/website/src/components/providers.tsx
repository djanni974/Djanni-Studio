"use client"

import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
			{children}
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
		</ThemeProvider>
	)
}
