import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"
import { Resend } from "resend"

// ─── Rate limiter (Upstash Redis — works in serverless) ─────
// Fallback to in-memory if Upstash is not configured
const hasUpstash = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN

const ratelimit = hasUpstash
	? new Ratelimit({
			redis: Redis.fromEnv(),
			limiter: Ratelimit.slidingWindow(3, "60 s"),
			analytics: true,
		})
	: null

const memoryMap = new Map<string, { count: number; resetAt: number }>()

async function checkRateLimit(ip: string): Promise<boolean> {
	if (ratelimit) {
		const { success } = await ratelimit.limit(ip)
		return success
	}
	// In-memory fallback (dev / missing config)
	const now = Date.now()
	const entry = memoryMap.get(ip)
	if (!entry || now > entry.resetAt) {
		memoryMap.set(ip, { count: 1, resetAt: now + 60_000 })
		return true
	}
	entry.count++
	return entry.count <= 3
}

// ─── Origin / Referer CSRF check ────────────────────────────
const ALLOWED_ORIGINS = [
	"https://www.djannistudio.fr",
	"https://djannistudio.fr",
	...(process.env.NODE_ENV === "development" ? ["http://localhost:3000"] : []),
]

function isOriginAllowed(request: Request): boolean {
	const origin = request.headers.get("origin")
	const referer = request.headers.get("referer")
	if (origin) return ALLOWED_ORIGINS.some((o) => origin.startsWith(o))
	if (referer) return ALLOWED_ORIGINS.some((o) => referer.startsWith(o))
	return false
}

function getResend() {
	const key = process.env.RESEND_API_KEY
	if (!key) throw new Error("RESEND_API_KEY is not set")
	return new Resend(key)
}

const RECIPIENT = process.env.CONTACT_EMAIL || "contact@djannistudio.fr"
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || ""
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || ""

type ContactPayload = {
	name: string
	email: string
	phone?: string
	projectType: string
	budget: string
	deadline: string
	businessName: string
	existingUrl: string
	message: string
}

const PROJECT_LABELS: Record<string, string> = {
	presence: "Présence",
	"site-vitrine": "Vitrine",
	"site-premium": "Sur mesure",
	refonte: "Refonte de site existant",
	autre: "Autre",
}

const BUDGET_LABELS: Record<string, string> = {
	"moins-1000": "Moins de 1 000 €",
	"1000-2000": "1 000 – 2 000 €",
	"2000-3000": "2 000 – 3 000 €",
	"moins-800": "Moins de 800 €",
	"800-1500": "800 € – 1 500 €",
	"1500-3000": "1 500 € – 3 000 €",
	"plus-3000": "Plus de 3 000 €",
	"pas-defini": "Pas encore défini",
}

const DEADLINE_LABELS: Record<string, string> = {
	urgent: "Urgent (< 2 semaines)",
	"1-mois": "Dans le mois",
	"2-3-mois": "Dans 2-3 mois",
	"pas-presse": "Pas pressé",
}

const VALID_PROJECT_TYPES = new Set(Object.keys(PROJECT_LABELS))
const VALID_BUDGETS = new Set([...Object.keys(BUDGET_LABELS), ""])
const VALID_DEADLINES = new Set([...Object.keys(DEADLINE_LABELS), ""])

function validate(data: unknown): data is ContactPayload {
	if (!data || typeof data !== "object") return false
	const d = data as Record<string, unknown>

	// Required fields — presence check
	if (
		typeof d.name !== "string" ||
		d.name.trim().length === 0 ||
		typeof d.email !== "string" ||
		typeof d.projectType !== "string" ||
		d.projectType.trim().length === 0 ||
		typeof d.message !== "string" ||
		d.message.trim().length === 0
	)
		return false

	// Size limits
	if (d.name.length > 100) return false
	if (d.email.length > 254) return false
	if (d.message.length > 5_000) return false
	if (d.projectType.length > 50) return false
	if (typeof d.budget === "string" && d.budget.length > 50) return false
	if (typeof d.deadline === "string" && d.deadline.length > 50) return false
	if (typeof d.businessName === "string" && d.businessName.length > 200) return false
	if (typeof d.existingUrl === "string" && d.existingUrl.length > 500) return false
	if (typeof d.phone === "string" && d.phone.length > 20) return false

	// Whitelist validation
	if (!VALID_PROJECT_TYPES.has(d.projectType)) return false
	const budget = typeof d.budget === "string" ? d.budget : ""
	if (!VALID_BUDGETS.has(budget)) return false
	const deadline = typeof d.deadline === "string" ? d.deadline : ""
	if (!VALID_DEADLINES.has(deadline)) return false

	// Email format + reject header injection characters
	const email = d.email
	if (/[\r\n%]/.test(email)) return false
	if (
		!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
			email,
		)
	)
		return false

	// Phone format (optional) — digits, spaces, +, -, (, ) only
	if (typeof d.phone === "string" && d.phone.length > 0) {
		if (!/^[0-9\s+\-().]+$/.test(d.phone)) return false
	}

	// existingUrl format (optional) — must be http(s) if provided
	if (typeof d.existingUrl === "string" && d.existingUrl.length > 0) {
		if (!/^https?:\/\/.+/i.test(d.existingUrl)) return false
	}

	return true
}

function optionalRow(label: string, value: string | undefined): string {
	if (!value) return ""
	return `<tr>
            <td style="padding:10px 0;color:#78756c;font-size:13px;font-weight:500;width:100px;vertical-align:top">${label}</td>
            <td style="padding:10px 0;color:#1a1a18;font-size:14px;font-weight:400">${escapeHtml(value)}</td>
          </tr>`
}

function buildEmailHtml(data: ContactPayload): string {
	const projectLabel = PROJECT_LABELS[data.projectType] ?? data.projectType
	const budgetLabel = data.budget ? (BUDGET_LABELS[data.budget] ?? data.budget) : "Non renseigné"
	const deadlineLabel = data.deadline ? (DEADLINE_LABELS[data.deadline] ?? data.deadline) : ""
	const businessName = data.businessName?.trim() || ""
	const existingUrl = data.existingUrl?.trim() || ""

	return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:40px auto;padding:0 20px">

    <!-- Logo -->
    <div style="padding:0 0 32px 0">
      <span style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#1a1a18;letter-spacing:-0.02em">Djanni<span style="color:#e8500a">.</span></span>
    </div>

    <!-- Card -->
    <div style="background:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);overflow:hidden">

      <!-- Orange accent bar -->
      <div style="height:3px;background:linear-gradient(to right,#e8500a,#f07040)"></div>

      <!-- Header -->
      <div style="padding:32px 32px 0">
        <p style="margin:0 0 4px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;color:#78756c">Nouvelle demande de projet</p>
        <h1 style="margin:0;font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#1a1a18;line-height:1.3">${escapeHtml(data.name)}</h1>
        <p style="margin:6px 0 0;font-size:14px;color:#78756c">
          <a href="mailto:${escapeHtml(data.email)}" style="color:#e8500a;text-decoration:none">${escapeHtml(data.email)}</a>
        </p>
      </div>

      <!-- Divider -->
      <div style="margin:24px 32px;height:1px;background:rgba(0,0,0,0.06)"></div>

      <!-- Details -->
      <div style="padding:0 32px">
        <table style="width:100%;border-collapse:collapse">
          ${optionalRow("Entreprise", businessName)}
          <tr>
            <td style="padding:10px 0;color:#78756c;font-size:13px;font-weight:500;width:100px;vertical-align:top">Projet</td>
            <td style="padding:10px 0;color:#1a1a18;font-size:14px;font-weight:400">${escapeHtml(projectLabel)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#78756c;font-size:13px;font-weight:500;vertical-align:top">Budget</td>
            <td style="padding:10px 0;color:#1a1a18;font-size:14px;font-weight:400">${escapeHtml(budgetLabel)}</td>
          </tr>
          ${optionalRow("Délai", deadlineLabel)}
          ${optionalRow("Site actuel", existingUrl)}
        </table>
      </div>

      <!-- Message -->
      <div style="padding:0 32px 32px">
        <div style="margin-top:20px;padding:20px;background:#faf8f5;border-radius:8px;border:1px solid rgba(0,0,0,0.06)">
          <p style="margin:0 0 10px;color:#78756c;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em">Message</p>
          <p style="margin:0;color:#55524a;font-size:14px;font-weight:300;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:24px 0;text-align:center">
      <p style="margin:0;color:#78756c;font-size:11px;font-weight:400;letter-spacing:0.02em">
        Envoyé depuis le formulaire de demande de projet — djannistudio.fr
      </p>
    </div>

  </div>
</body>
</html>`
}

function buildConfirmationHtml(data: ContactPayload): string {
	const projectLabel = PROJECT_LABELS[data.projectType] ?? data.projectType
	const budgetLabel = data.budget ? (BUDGET_LABELS[data.budget] ?? data.budget) : "Non renseigné"
	const deadlineLabel = data.deadline ? (DEADLINE_LABELS[data.deadline] ?? data.deadline) : ""
	const firstName = data.name.split(" ")[0]
	const businessName = data.businessName?.trim() || ""

	return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:40px auto;padding:0 20px">

    <!-- Logo -->
    <div style="padding:0 0 32px 0">
      <span style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#1a1a18;letter-spacing:-0.02em">Djanni<span style="color:#e8500a">.</span></span>
    </div>

    <!-- Card -->
    <div style="background:#ffffff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);overflow:hidden">

      <!-- Orange accent bar -->
      <div style="height:3px;background:linear-gradient(to right,#e8500a,#f07040)"></div>

      <!-- Header -->
      <div style="padding:32px 32px 0">
        <p style="margin:0 0 4px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;color:#78756c">Confirmation</p>
        <h1 style="margin:0;font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#1a1a18;line-height:1.3">Merci ${escapeHtml(firstName)} !</h1>
        <p style="margin:12px 0 0;font-size:14px;color:#55524a;line-height:1.6">J'ai bien reçu votre demande. Je reviens vers vous sous <strong style="color:#1a1a18">24h</strong> pour en discuter.</p>
      </div>

      <!-- Divider -->
      <div style="margin:24px 32px;height:1px;background:rgba(0,0,0,0.06)"></div>

      <!-- Recap -->
      <div style="padding:0 32px">
        <p style="margin:0 0 16px;color:#78756c;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em">Récapitulatif de votre demande</p>
        <table style="width:100%;border-collapse:collapse">
          ${optionalRow("Entreprise", businessName)}
          <tr>
            <td style="padding:10px 0;color:#78756c;font-size:13px;font-weight:500;width:100px;vertical-align:top">Projet</td>
            <td style="padding:10px 0;color:#1a1a18;font-size:14px;font-weight:400">${escapeHtml(projectLabel)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#78756c;font-size:13px;font-weight:500;vertical-align:top">Budget</td>
            <td style="padding:10px 0;color:#1a1a18;font-size:14px;font-weight:400">${escapeHtml(budgetLabel)}</td>
          </tr>
          ${optionalRow("Délai", deadlineLabel)}
        </table>
      </div>

      <!-- Message -->
      <div style="padding:0 32px 32px">
        <div style="margin-top:20px;padding:20px;background:#faf8f5;border-radius:8px;border:1px solid rgba(0,0,0,0.06)">
          <p style="margin:0 0 10px;color:#78756c;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em">Votre message</p>
          <p style="margin:0;color:#55524a;font-size:14px;font-weight:300;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:24px 0;text-align:center">
      <p style="margin:0 0 8px;color:#55524a;font-size:13px;font-weight:400">Gianni — Djanni Studio</p>
      <p style="margin:0 0 6px;color:#78756c;font-size:11px;font-weight:400;letter-spacing:0.02em">
        <a href="tel:+33749547498" style="color:#78756c;text-decoration:none">07 49 54 74 98</a> · djannistudio.fr
      </p>
    </div>

  </div>
</body>
</html>`
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
}

export async function POST(request: Request) {
	try {
		// ─── Content-Type guard ──────────────────────────────
		const contentType = request.headers.get("content-type") || ""
		if (!contentType.includes("application/json")) {
			return NextResponse.json({ error: "Content-Type invalide." }, { status: 415 })
		}

		// ─── Payload size guard ──────────────────────────────
		const contentLength = Number(request.headers.get("content-length") || 0)
		if (contentLength > 10_000) {
			return NextResponse.json({ error: "Requête trop volumineuse." }, { status: 413 })
		}

		// ─── CSRF: verify origin ─────────────────────────────
		if (!isOriginAllowed(request)) {
			return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 })
		}

		// ─── Rate limiting (Upstash Redis / fallback memory) ─
		const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
		const allowed = await checkRateLimit(ip)

		if (!allowed) {
			return NextResponse.json(
				{ error: "Trop de requêtes. Réessayez dans une minute." },
				{ status: 429 },
			)
		}

		const body = await request.json()

		// ─── Anti-bot: honeypot ──────────────────────────────
		if (body._hp) {
			return NextResponse.json({ success: true })
		}

		// ─── Anti-bot: time check (< 3s = likely bot) ────────
		const submittedAt = Number(body._t || 0)
		if (submittedAt && Date.now() - submittedAt < 3_000) {
			return NextResponse.json({ success: true })
		}

		// ─── Sanitize: trim all string fields ────────────────
		for (const key of Object.keys(body)) {
			if (typeof body[key] === "string") {
				body[key] = body[key].trim()
			}
		}

		if (!validate(body)) {
			return NextResponse.json(
				{ error: "Veuillez remplir tous les champs obligatoires." },
				{ status: 400 },
			)
		}

		const projectLabel = PROJECT_LABELS[body.projectType] ?? body.projectType

		const resend = getResend()

		const [notif, confirmation] = await Promise.all([
			resend.emails.send({
				from: "Djanni Studio <noreply@djannistudio.fr>",
				to: [RECIPIENT],
				replyTo: body.email,
				subject: `Nouvelle demande — ${body.businessName || body.name} (${projectLabel})`,
				html: buildEmailHtml(body),
			}),
			resend.emails.send({
				from: "Djanni Studio <noreply@djannistudio.fr>",
				to: [body.email],
				subject: "Votre demande a bien été reçue — Djanni Studio",
				html: buildConfirmationHtml(body),
			}),
		])

		// Notification SMS via n8n (fire-and-forget)
		if (N8N_WEBHOOK_URL) {
			fetch(N8N_WEBHOOK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(N8N_WEBHOOK_SECRET && { Authorization: `Bearer ${N8N_WEBHOOK_SECRET}` }),
				},
				body: JSON.stringify({
					name: body.name,
					email: body.email,
					phone: body.phone,
					message: body.message,
					projectType: body.projectType,
					budget: body.budget,
					deadline: body.deadline,
					businessName: body.businessName,
					existingUrl: body.existingUrl,
				}),
			}).catch((err) => {
				console.warn("[contact] n8n webhook error:", err)
			})
		}

		if (notif.error) {
			console.error("[contact] Resend notification error:", notif.error)
			return NextResponse.json(
				{ error: "Erreur lors de l\u2019envoi. Réessayez ou contactez-moi directement." },
				{ status: 500 },
			)
		}

		if (confirmation.error) {
			console.error("[contact] Resend confirmation error:", confirmation.error)
		}

		return NextResponse.json({ success: true })
	} catch (err) {
		console.error("[contact] Unexpected error:", err)
		return NextResponse.json({ error: "Erreur inattendue. Réessayez plus tard." }, { status: 500 })
	}
}
