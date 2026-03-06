"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { type ReactNode, useState } from "react"
import { Toaster } from "sonner"

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
			<QueryClientProvider client={queryClient}>
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
			</QueryClientProvider>
		</ThemeProvider>
	)
}
