type PlausibleProps = Record<string, string | number | boolean>

type PlausibleFn = (event: string, options?: { props?: PlausibleProps }) => void

declare global {
	interface Window {
		plausible?: PlausibleFn
	}
}

export function trackPlausibleEvent(event: string, props?: PlausibleProps) {
	if (typeof window === "undefined") return
	if (typeof window.plausible !== "function") return
	window.plausible(event, props ? { props } : undefined)
}
