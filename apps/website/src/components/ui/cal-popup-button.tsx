"use client"

import { getCalApi } from "@calcom/embed-react"
import type { ReactNode } from "react"
import { useEffect } from "react"
import { CAL_COM_LINK, CAL_COM_NAMESPACE } from "@/lib/constants"

type CalPopupButtonProps = {
	as?: "a" | "button"
	className?: string
	children: ReactNode
	"aria-label"?: string
}

export function CalPopupButton({
	as = "button",
	className,
	children,
	"aria-label": ariaLabel,
}: CalPopupButtonProps) {
	useEffect(() => {
		;(async () => {
			const cal = await getCalApi({ namespace: CAL_COM_NAMESPACE })
			cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
		})()
	}, [])

	const sharedProps = {
		className,
		"data-cal-namespace": CAL_COM_NAMESPACE,
		"data-cal-link": CAL_COM_LINK,
		"data-cal-config": '{"layout":"month_view"}',
		"aria-label": ariaLabel,
	}

	if (as === "a") {
		return <a {...sharedProps}>{children}</a>
	}
	return (
		<button type="button" {...sharedProps}>
			{children}
		</button>
	)
}
