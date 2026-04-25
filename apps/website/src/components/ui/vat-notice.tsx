import { useTranslations } from "next-intl"

export function VatNotice({ className }: { className?: string }) {
	const t = useTranslations("legal")
	return (
		<p className={`text-center text-xs text-djanni-gray ${className ?? ""}`}>{t("vatNotice")}</p>
	)
}
