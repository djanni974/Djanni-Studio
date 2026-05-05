import Script from "next/script"

const PLAUSIBLE_INIT = `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`

export function PlausibleScript() {
	return (
		<>
			<Script
				async
				defer
				data-domain="djannistudio.fr"
				data-api="/api/event"
				src="/js/script.js"
				strategy="afterInteractive"
			/>
			<Script id="plausible-init" strategy="afterInteractive">
				{PLAUSIBLE_INIT}
			</Script>
		</>
	)
}
