import {
	IconAccessible,
	IconAlertTriangle,
	IconBrandGoogle,
	IconCheck,
	IconChevronRight,
	IconClock,
	IconDeviceMobile,
	IconEye,
	IconGauge,
	IconLock,
	IconMinus,
	IconPalette,
	IconSearch,
	IconShieldLock,
	IconTarget,
	IconX,
} from "@tabler/icons-react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Page publique d audit partageable : `/audit/[slug]`
 *
 * Consomme la route API `/api/audits/[slug]` qui fait :
 *   - Filtre par status = 'published' et expires_at
 *   - Incremente view_count + first_viewed_at + last_viewed_at
 *   - Insere une ligne audit_views (IP hashee SHA-256, user-agent, referer)
 *
 * Server Component pur : rendu SSR, zero JS client, Lighthouse 95+.
 */

export const dynamic = "force-dynamic"

// ---------- Types (synchro avec src/lib/supabase/types.ts) ----------

type Severity = "critical" | "high" | "medium" | "low"

interface AuditFinding {
	category: string
	severity: Severity
	title: string
	description: string
	recommendation: string
}

interface AuditProposal {
	offer?: "presence" | "vitrine" | "sur_mesure" | "custom"
	amount_ht?: number
	delay_weeks?: number
	pitch?: string
}

interface AuditPublic {
	id: string
	slug: string
	target_url: string
	target_business_name: string | null
	target_business_activity: string | null
	target_city: string | null
	scores: Record<string, number>
	findings: AuditFinding[]
	proposal: AuditProposal | Record<string, never>
	expires_at: string | null
	created_at: string
}

// ---------- Data fetching ----------

async function getAudit(slug: string): Promise<AuditPublic | null> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

	try {
		const res = await fetch(`${baseUrl}/api/audits/${slug}`, { cache: "no-store" })

		if (res.status === 404 || res.status === 410) return null
		if (!res.ok) {
			console.error(`[audit/${slug}] fetch failed with status ${res.status}`)
			return null
		}

		const json = (await res.json()) as { data: AuditPublic }
		return json.data
	} catch (err) {
		console.error(`[audit/${slug}] fetch error`, err)
		return null
	}
}

// ---------- Metadata Open Graph dynamique ----------

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const audit = await getAudit(slug)

	if (!audit) {
		return {
			title: "Audit introuvable | Djanni Studio",
			robots: { index: false, follow: false },
		}
	}

	const businessName = audit.target_business_name ?? audit.target_url
	const title = `Audit du site de ${businessName} | Djanni Studio`
	const description =
		audit.proposal && "pitch" in audit.proposal && audit.proposal.pitch
			? audit.proposal.pitch.slice(0, 160)
			: `Audit personnalise du site de ${businessName} par Djanni Studio : scores, problemes detectes, proposition de refonte.`

	return {
		title,
		description,
		robots: { index: false, follow: false },
		openGraph: { title, description, type: "article" },
		twitter: { card: "summary_large_image", title, description },
	}
}

// ---------- Page ----------

export default async function AuditPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const audit = await getAudit(slug)

	if (!audit) notFound()

	const severityOrder: Severity[] = ["critical", "high", "medium", "low"]
	const findingsBySeverity = severityOrder
		.map((sev) => ({
			severity: sev,
			items: audit.findings.filter((f) => f.severity === sev),
		}))
		.filter((group) => group.items.length > 0)

	const totalFindings = audit.findings.length
	const criticalCount = audit.findings.filter((f) => f.severity === "critical").length
	const highCount = audit.findings.filter((f) => f.severity === "high").length
	const overall = computeOverallScore(audit.scores)
	const daysLeft = computeDaysLeft(audit.expires_at)

	// Index global des findings (1, 2, 3...) dans l ordre de severite
	const orderedFindings = findingsBySeverity.flatMap((g) => g.items)

	return (
		<main className="min-h-screen bg-surface-a text-foreground">
			{/* ---------- HERO ---------- */}
			<section className="relative overflow-hidden border-b border-border bg-surface-a">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 opacity-40"
					style={{
						backgroundImage:
							"radial-gradient(circle at 20% 0%, rgba(232, 80, 10, 0.12), transparent 50%), radial-gradient(circle at 90% 100%, rgba(232, 80, 10, 0.08), transparent 60%)",
					}}
				/>

				<div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
					<div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
						<div className="animate-fade-up in-view">
							<div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-djanni-orange">
								<span className="inline-flex h-1.5 w-1.5 rounded-full bg-djanni-orange" />
								<span>Audit personnalise</span>
								<span className="text-muted-foreground">·</span>
								<span className="text-muted-foreground">Djanni Studio</span>
							</div>

							<h1 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
								<span className="text-muted-foreground">Audit du site de</span>
								<br />
								<span className="text-foreground">
									{audit.target_business_name ?? audit.target_url}
								</span>
							</h1>

							{audit.target_business_activity || audit.target_city ? (
								<p className="mt-4 text-lg text-muted-foreground md:text-xl">
									{[audit.target_business_activity, audit.target_city].filter(Boolean).join(" · ")}
								</p>
							) : null}

							<div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
								<span className="text-muted-foreground">Site audite</span>
								<a
									href={audit.target_url}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-1.5 break-all rounded-md border border-border bg-surface-b px-3 py-1.5 font-mono text-xs text-foreground transition hover:border-djanni-orange"
								>
									{audit.target_url}
									<IconChevronRight size={14} className="transition group-hover:translate-x-0.5" />
								</a>
							</div>

							<div className="mt-10 flex flex-wrap gap-2 text-xs font-medium">
								<Pill icon={<IconTarget size={14} />}>{totalFindings} points identifies</Pill>
								{criticalCount > 0 ? (
									<Pill tone="critical" icon={<IconAlertTriangle size={14} />}>
										{criticalCount} critique{criticalCount > 1 ? "s" : ""}
									</Pill>
								) : null}
								{highCount > 0 ? (
									<Pill tone="high" icon={<IconAlertTriangle size={14} />}>
										{highCount} important{highCount > 1 ? "s" : ""}
									</Pill>
								) : null}
								{daysLeft !== null && daysLeft >= 0 ? (
									<Pill icon={<IconClock size={14} />}>
										{daysLeft === 0
											? "Expire aujourd hui"
											: `${daysLeft} jour${daysLeft > 1 ? "s" : ""} restant${daysLeft > 1 ? "s" : ""}`}
									</Pill>
								) : null}
							</div>
						</div>

						{overall !== null ? (
							<div className="animate-fade-up in-view flex items-center justify-center md:justify-end">
								<GlobalScoreGauge value={overall.value} verdict={overall.verdict} />
							</div>
						) : null}
					</div>
				</div>
			</section>

			{/* ---------- SCORES ---------- */}
			{Object.keys(audit.scores).length > 0 ? (
				<section className="border-b border-border bg-surface-a">
					<div className="mx-auto max-w-6xl px-6 py-16">
						<SectionHeader
							eyebrow="Scores globaux"
							title="5 dimensions evaluees sur 100"
							description="Chaque note est calculee a partir des signaux techniques, ergonomiques et SEO de ton site actuel."
						/>

						<div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-6">
							{Object.entries(audit.scores).map(([key, value]) => (
								<ScoreCard key={key} label={key} value={value} />
							))}
						</div>
					</div>
				</section>
			) : null}

			{/* ---------- FINDINGS ---------- */}
			{findingsBySeverity.length > 0 ? (
				<section className="bg-surface-a">
					<div className="mx-auto max-w-6xl px-6 py-16">
						<SectionHeader
							eyebrow="Ce qui freine ton site aujourd hui"
							title={`${totalFindings} point${totalFindings > 1 ? "s" : ""} a regarder de pres`}
							description="Classes par priorite. Chaque point a une recommandation concrete a cote."
						/>

						<div className="mt-12 space-y-14">
							{findingsBySeverity.map(({ severity, items }) => (
								<div key={severity}>
									<div className="mb-6 flex items-baseline gap-3">
										<SeverityBadge severity={severity} />
										<span className="text-sm text-muted-foreground">
											{items.length} point{items.length > 1 ? "s" : ""}
										</span>
									</div>
									<div className="grid gap-5 md:grid-cols-2">
										{items.map((finding) => (
											<FindingCard
												key={`${severity}-${finding.title}`}
												finding={finding}
												index={orderedFindings.indexOf(finding) + 1}
												total={totalFindings}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			) : null}

			{/* ---------- PROPOSAL CTA ---------- */}
			{audit.proposal && "pitch" in audit.proposal && audit.proposal.pitch ? (
				<section className="relative overflow-hidden bg-djanni-black text-djanni-white">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 opacity-60"
						style={{
							backgroundImage:
								"radial-gradient(circle at 80% 0%, rgba(232, 80, 10, 0.35), transparent 55%), radial-gradient(circle at 0% 100%, rgba(232, 80, 10, 0.15), transparent 55%)",
						}}
					/>

					<div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
						<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-djanni-orange">
							<span className="inline-flex h-1.5 w-1.5 rounded-full bg-djanni-orange" />
							Proposition Djanni Studio
						</div>

						<div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
							<div>
								<h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
									Ton nouveau site,{" "}
									<span className="text-djanni-orange">
										livre cle en main en{" "}
										{typeof audit.proposal.delay_weeks === "number"
											? `${audit.proposal.delay_weeks} semaine${audit.proposal.delay_weeks > 1 ? "s" : ""}`
											: "quelques semaines"}
									</span>
									.
								</h2>

								<p className="mt-6 whitespace-pre-line text-base leading-relaxed text-djanni-gray-light md:text-lg">
									{audit.proposal.pitch}
								</p>

								<Timeline weeks={audit.proposal.delay_weeks} />

								<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
									<a
										href="mailto:contact@djannistudio.fr?subject=Discussion%20suite%20a%20mon%20audit"
										className="group inline-flex items-center justify-center gap-2 rounded-lg bg-djanni-orange px-7 py-3.5 font-semibold text-djanni-black transition hover:bg-djanni-orange-light"
									>
										Discutons-en
										<IconChevronRight
											size={18}
											className="transition group-hover:translate-x-0.5"
										/>
									</a>
									<a
										href="tel:+33749547498"
										className="inline-flex items-center justify-center rounded-lg border border-djanni-white/20 px-7 py-3.5 font-semibold text-djanni-white transition hover:border-djanni-white/40"
									>
										07 49 54 74 98
									</a>
								</div>
							</div>

							<aside className="rounded-2xl border border-djanni-white/10 bg-djanni-white/3 p-8 backdrop-blur-sm">
								{audit.proposal.offer ? (
									<div className="text-xs font-semibold uppercase tracking-widest text-djanni-orange">
										Offre {formatOffer(audit.proposal.offer)}
									</div>
								) : null}

								{typeof audit.proposal.amount_ht === "number" ? (
									<div className="mt-3">
										<div className="font-heading text-5xl font-bold leading-none md:text-6xl">
											{audit.proposal.amount_ht.toLocaleString("fr-FR")}
											<span className="ml-1 text-2xl font-semibold text-djanni-gray-light">
												EUR HT
											</span>
										</div>
										<p className="mt-2 text-sm text-djanni-gray">
											50% signature · 50% livraison · tout compris
										</p>
									</div>
								) : null}

								<div className="mt-8">
									<div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-djanni-orange">
										Inclus
									</div>
									<ul className="space-y-2.5 text-sm text-djanni-white">
										<Included>Domaine personnalise + HTTPS + mail pro</Included>
										<Included>Hebergement Vercel (perf mondiale)</Included>
										<Included>Lighthouse 95+ sur mobile et desktop</Included>
										<Included>SEO local (pages dediees par ville)</Included>
										<Included>Formulaire relie a ton telephone</Included>
										<Included>Maintenance 1 an incluse</Included>
									</ul>
								</div>

								<div className="mt-8 border-t border-djanni-white/10 pt-6">
									<div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-djanni-gray-light">
										Options a ta disposition
									</div>
									<ul className="space-y-2.5 text-sm">
										{offerOptions(audit.proposal).map((opt) => (
											<OptionLine key={opt.label} label={opt.label} price={opt.price} />
										))}
									</ul>
									<p className="mt-4 text-xs text-djanni-gray">
										Options a la carte, a combiner au besoin. On ajuste le devis avant signature.
									</p>
								</div>
							</aside>
						</div>
					</div>
				</section>
			) : null}

			{/* ---------- FOOTER ---------- */}
			<footer className="border-t border-border bg-surface-a">
				<div className="mx-auto max-w-6xl px-6 py-10">
					<div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
						<div className="text-sm text-muted-foreground">
							<p>
								Audit genere par{" "}
								<a
									href="https://djannistudio.fr"
									className="font-medium text-foreground hover:text-djanni-orange"
								>
									Djanni Studio
								</a>{" "}
								le{" "}
								{new Date(audit.created_at).toLocaleDateString("fr-FR", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
								.
							</p>
							<p className="mt-1">
								Ce lien est personnalise et ne te sera plus accessible apres son expiration.
							</p>
						</div>

						{daysLeft !== null && daysLeft >= 0 ? (
							<div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-b px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								<IconClock size={14} className="text-djanni-orange" />
								{daysLeft === 0
									? "Expire aujourd hui"
									: `${daysLeft} jour${daysLeft > 1 ? "s" : ""} restant${daysLeft > 1 ? "s" : ""}`}
							</div>
						) : null}
					</div>
				</div>
			</footer>
		</main>
	)
}

// ---------- Sub-components ----------

function SectionHeader({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string
	title: string
	description?: string
}) {
	return (
		<div className="max-w-3xl">
			<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-djanni-orange">
				<span className="inline-flex h-1.5 w-1.5 rounded-full bg-djanni-orange" />
				{eyebrow}
			</div>
			<h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
			{description ? (
				<p className="mt-3 text-base text-muted-foreground md:text-lg">{description}</p>
			) : null}
		</div>
	)
}

function Pill({
	children,
	icon,
	tone = "default",
}: {
	children: ReactNode
	icon?: ReactNode
	tone?: "default" | "critical" | "high"
}) {
	const tones: Record<string, string> = {
		default: "border-border bg-surface-b text-foreground",
		critical: "border-red-500/30 bg-red-500/10 text-red-500",
		high: "border-orange-500/30 bg-orange-500/10 text-orange-500",
	}
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${tones[tone]}`}
		>
			{icon}
			{children}
		</span>
	)
}

function GlobalScoreGauge({ value, verdict }: { value: number; verdict: string }) {
	const clamped = Math.max(0, Math.min(100, Math.round(value)))
	const radius = 80
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (clamped / 100) * circumference
	const color = scoreColorClass(clamped)

	return (
		<div className="flex flex-col items-center">
			<div className="relative h-56 w-56">
				<svg
					className="h-full w-full -rotate-90"
					viewBox="0 0 180 180"
					role="img"
					aria-label={`Score global : ${clamped} sur 100 (${verdict})`}
				>
					<circle cx="90" cy="90" r={radius} strokeWidth="10" fill="none" stroke="var(--border)" />
					<circle
						cx="90"
						cy="90"
						r={radius}
						strokeWidth="10"
						fill="none"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						className={color}
						stroke="currentColor"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="font-heading text-6xl font-bold text-foreground">{clamped}</span>
					<span className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						sur 100
					</span>
				</div>
			</div>
			<p className={`mt-4 font-heading text-lg font-bold ${color}`}>{verdict}</p>
		</div>
	)
}

function ScoreCard({ label, value }: { label: string; value: number }) {
	const clamped = Math.max(0, Math.min(100, value))
	const color = scoreColorClass(clamped)
	const band = scoreBand(clamped)
	const radius = 36
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (clamped / 100) * circumference

	return (
		<div className="flex flex-col items-center rounded-xl border border-border bg-surface-b p-5 text-center">
			<div className="relative h-20 w-20">
				<svg
					className="h-full w-full -rotate-90"
					viewBox="0 0 80 80"
					role="img"
					aria-label={`${formatScoreLabel(label)} : ${clamped} sur 100`}
				>
					<circle cx="40" cy="40" r={radius} strokeWidth="6" fill="none" stroke="var(--border)" />
					<circle
						cx="40"
						cy="40"
						r={radius}
						strokeWidth="6"
						fill="none"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						className={color}
						stroke="currentColor"
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="font-heading text-xl font-bold text-foreground">{clamped}</span>
				</div>
			</div>
			<span className="mt-3 text-xs font-semibold uppercase tracking-wider text-foreground">
				{formatScoreLabel(label)}
			</span>
			<span className={`mt-1 text-[11px] font-medium uppercase tracking-wider ${color}`}>
				{band}
			</span>
		</div>
	)
}

function SeverityBadge({ severity }: { severity: Severity }) {
	const config: Record<Severity, { label: string; classes: string; description: string }> = {
		critical: {
			label: "Critique",
			classes: "bg-red-500/15 text-red-400 border-red-500/50",
			description: "A corriger en priorite",
		},
		high: {
			label: "Important",
			classes: "bg-orange-500/15 text-orange-400 border-orange-500/50",
			description: "Impact business significatif",
		},
		medium: {
			label: "Moyen",
			classes: "bg-amber-500/15 text-amber-400 border-amber-500/50",
			description: "A traiter dans la refonte",
		},
		low: {
			label: "Mineur",
			classes: "bg-muted text-muted-foreground border-border",
			description: "Amelioration possible",
		},
	}

	const { label, classes, description } = config[severity]

	return (
		<div className="flex flex-wrap items-baseline gap-3">
			<span
				className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${classes}`}
			>
				{label}
			</span>
			<span className="text-sm text-muted-foreground">{description}</span>
		</div>
	)
}

function FindingCard({
	finding,
	index,
	total,
}: {
	finding: AuditFinding
	index: number
	total: number
}) {
	const borderBySeverity: Record<Severity, string> = {
		critical: "border-l-red-500",
		high: "border-l-orange-500",
		medium: "border-l-amber-500",
		low: "border-l-djanni-gray",
	}

	const Icon = categoryIcon(finding.category)

	return (
		<article
			className={`flex flex-col rounded-xl border border-border border-l-4 bg-card p-6 shadow-sm transition hover:border-djanni-orange/40 ${borderBySeverity[finding.severity]}`}
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					<Icon size={14} className="text-djanni-orange" />
					{finding.category}
				</div>
				<span className="shrink-0 font-mono text-[11px] text-muted-foreground">
					{String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
				</span>
			</div>

			<h3 className="mt-3 font-heading text-lg font-bold leading-snug text-foreground md:text-xl">
				{finding.title}
			</h3>
			<p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
				{finding.description}
			</p>

			<div className="mt-5 rounded-lg border border-djanni-orange/20 bg-djanni-orange/5 p-4">
				<div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-djanni-orange">
					<IconCheck size={13} />
					Recommandation
				</div>
				<p className="text-sm leading-relaxed text-foreground">{finding.recommendation}</p>
			</div>
		</article>
	)
}

function Timeline({ weeks }: { weeks?: number }) {
	const total = typeof weeks === "number" && weeks > 0 ? weeks : 3
	const steps = [
		{ label: "Signature", detail: "Brief + acompte" },
		{ label: "Construction", detail: `Semaine 1 a ${Math.max(1, total - 1)}` },
		{ label: "Mise en ligne", detail: `Semaine ${total}` },
	]

	return (
		<div className="mt-10">
			<div className="text-xs font-semibold uppercase tracking-widest text-djanni-orange">
				Planning
			</div>
			<ol className="mt-4 grid grid-cols-3 gap-3">
				{steps.map((step, i) => (
					<li
						key={step.label}
						className="relative rounded-lg border border-djanni-white/10 bg-djanni-white/3 p-4"
					>
						<div className="font-mono text-xs text-djanni-orange">{`0${i + 1}`}</div>
						<div className="mt-1 font-heading text-base font-bold text-djanni-white">
							{step.label}
						</div>
						<div className="mt-0.5 text-xs text-djanni-gray-light">{step.detail}</div>
					</li>
				))}
			</ol>
		</div>
	)
}

function Included({ children }: { children: ReactNode }) {
	return (
		<li className="flex items-start gap-2.5">
			<IconCheck size={16} className="mt-0.5 shrink-0 text-djanni-orange" />
			<span>{children}</span>
		</li>
	)
}

// ---------- Helpers ----------

function computeOverallScore(
	scores: Record<string, number>,
): { value: number; verdict: string } | null {
	const values = Object.values(scores).filter((v) => typeof v === "number")
	if (values.length === 0) return null
	const avg = values.reduce((sum, v) => sum + v, 0) / values.length
	return { value: avg, verdict: scoreBand(avg) }
}

function computeDaysLeft(expiresAt: string | null): number | null {
	if (!expiresAt) return null
	const diff = new Date(expiresAt).getTime() - Date.now()
	if (Number.isNaN(diff)) return null
	return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function scoreColorClass(value: number): string {
	if (value >= 90) return "text-emerald-500"
	if (value >= 70) return "text-amber-500"
	if (value >= 50) return "text-orange-500"
	return "text-red-500"
}

function scoreBand(value: number): string {
	if (value >= 90) return "Excellent"
	if (value >= 70) return "A ameliorer"
	if (value >= 50) return "Insuffisant"
	return "Critique"
}

function formatScoreLabel(key: string): string {
	const mapping: Record<string, string> = {
		lighthouse: "Perf",
		performance: "Perf",
		seo: "SEO",
		design: "Design",
		mobile: "Mobile",
		security: "Securite",
		accessibility: "A11y",
	}
	return mapping[key] ?? key
}

function formatOffer(offer: string): string {
	const mapping: Record<string, string> = {
		presence: "Presence",
		vitrine: "Vitrine",
		sur_mesure: "Sur mesure",
		custom: "Sur mesure",
	}
	return mapping[offer] ?? offer
}

interface Option {
	label: string
	price: string
}

const OPTIONS_BY_OFFER: Record<string, Option[]> = {
	presence: [
		{ label: "Pages supplementaires", price: "+190 EUR / page" },
		{ label: "Capture email (newsletter)", price: "+90 EUR" },
		{ label: "Traduction anglais", price: "+190 EUR" },
	],
	vitrine: [
		{ label: "Pages supplementaires", price: "+190 EUR / page" },
		{ label: "Module blog (longue traine SEO)", price: "+290 EUR" },
		{ label: "Traduction anglais", price: "+290 EUR" },
		{ label: "Shooting photo local", price: "+390 EUR" },
		{ label: "Identite visuelle sur mesure", price: "+490 EUR" },
		{ label: "Formation 1h autonomie", price: "+90 EUR" },
	],
	sur_mesure: [
		{ label: "Pages ville supplementaires", price: "+190 EUR / page" },
		{ label: "Shooting photo drone", price: "+490 EUR" },
		{ label: "Module devis en ligne", price: "+390 EUR" },
		{ label: "Identite visuelle sur mesure", price: "+490 EUR" },
		{ label: "Formation 2h approfondie", price: "+190 EUR" },
	],
	custom: [],
}

function offerOptions(proposal: AuditProposal | Record<string, never>): Option[] {
	const offer = "offer" in proposal && proposal.offer ? proposal.offer : "vitrine"
	return OPTIONS_BY_OFFER[offer] ?? OPTIONS_BY_OFFER.vitrine
}

function OptionLine({ label, price }: Option) {
	return (
		<li className="flex items-baseline justify-between gap-4 border-b border-djanni-white/5 pb-2.5 last:border-b-0 last:pb-0">
			<span className="text-djanni-white">{label}</span>
			<span className="shrink-0 font-mono text-xs text-djanni-gray-light">{price}</span>
		</li>
	)
}

function categoryIcon(
	category: string,
): (props: { size?: number; className?: string }) => ReactNode {
	const key = category.toLowerCase()
	if (key.includes("perf") || key.includes("speed")) return IconGauge
	if (key.includes("seo")) return IconSearch
	if (key.includes("mobile")) return IconDeviceMobile
	if (key.includes("security") || key.includes("securite")) return IconShieldLock
	if (key.includes("design") || key.includes("identite") || key.includes("branding"))
		return IconPalette
	if (key.includes("a11y") || key.includes("accessibilite")) return IconAccessible
	if (key.includes("conversion") || key.includes("cta")) return IconTarget
	if (key.includes("google") || key.includes("avis")) return IconBrandGoogle
	if (key.includes("visibility") || key.includes("indexation")) return IconEye
	if (key.includes("lock") || key.includes("https")) return IconLock
	if (key.includes("bug") || key.includes("error")) return IconX
	if (key.includes("ok")) return IconCheck
	return IconMinus
}
