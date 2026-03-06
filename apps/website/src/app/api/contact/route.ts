import { NextResponse } from "next/server"
import { Resend } from "resend"

function getResend() {
	const key = process.env.RESEND_API_KEY
	if (!key) throw new Error("RESEND_API_KEY is not set")
	return new Resend(key)
}

const RECIPIENT = "contact@djannistudio.fr"

type ContactPayload = {
	name: string
	email: string
	projectType: string
	budget: string
	message: string
}

const PROJECT_LABELS: Record<string, string> = {
	"site-vitrine": "Site Vitrine",
	"site-premium": "Site Premium",
	refonte: "Refonte de site existant",
	autre: "Autre",
}

const BUDGET_LABELS: Record<string, string> = {
	"moins-1000": "Moins de 1 000 €",
	"1000-2000": "1 000 – 2 000 €",
	"2000-3000": "2 000 – 3 000 €",
	"plus-3000": "Plus de 3 000 €",
	"pas-defini": "Pas encore défini",
}

function validate(data: unknown): data is ContactPayload {
	if (!data || typeof data !== "object") return false
	const d = data as Record<string, unknown>
	return (
		typeof d.name === "string" &&
		d.name.trim().length > 0 &&
		typeof d.email === "string" &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
		typeof d.projectType === "string" &&
		d.projectType.trim().length > 0 &&
		typeof d.message === "string" &&
		d.message.trim().length > 0
	)
}

function buildEmailHtml(data: ContactPayload): string {
	const projectLabel = PROJECT_LABELS[data.projectType] ?? data.projectType
	const budgetLabel = data.budget ? (BUDGET_LABELS[data.budget] ?? data.budget) : "Non renseigné"

	return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background:#0c0c0b;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:40px auto;padding:0 20px">

    <!-- Logo -->
    <div style="padding:0 0 32px 0">
      <span style="font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#f5f2ec;letter-spacing:-0.02em">Djanni<span style="color:#e8500a">.</span></span>
    </div>

    <!-- Card -->
    <div style="background:#0f0f0e;border-radius:12px;border:1px solid rgba(255,255,255,0.12);overflow:hidden">

      <!-- Header -->
      <div style="padding:32px 32px 0">
        <p style="margin:0 0 4px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;color:#6b6860">Nouveau message</p>
        <h1 style="margin:0;font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#f5f2ec;line-height:1.3">${escapeHtml(data.name)}</h1>
        <p style="margin:6px 0 0;font-size:14px;color:#6b6860">
          <a href="mailto:${escapeHtml(data.email)}" style="color:#e8500a;text-decoration:none">${escapeHtml(data.email)}</a>
        </p>
      </div>

      <!-- Divider -->
      <div style="margin:24px 32px;height:1px;background:linear-gradient(to right,transparent,rgba(255,255,255,0.1),rgba(255,255,255,0.06),transparent)"></div>

      <!-- Details -->
      <div style="padding:0 32px">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:10px 0;color:#6b6860;font-size:13px;font-weight:500;width:100px;vertical-align:top">Projet</td>
            <td style="padding:10px 0;color:#f5f2ec;font-size:14px;font-weight:400">${escapeHtml(projectLabel)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6b6860;font-size:13px;font-weight:500;vertical-align:top">Budget</td>
            <td style="padding:10px 0;color:#f5f2ec;font-size:14px;font-weight:400">${escapeHtml(budgetLabel)}</td>
          </tr>
        </table>
      </div>

      <!-- Message -->
      <div style="padding:0 32px 32px">
        <div style="margin-top:20px;padding:20px;background:#0c0c0b;border-radius:8px;border:1px solid rgba(255,255,255,0.08)">
          <p style="margin:0 0 10px;color:#6b6860;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em">Message</p>
          <p style="margin:0;color:#b8b4ac;font-size:14px;font-weight:300;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div style="padding:24px 0;text-align:center">
      <p style="margin:0;color:#6b6860;font-size:11px;font-weight:400;letter-spacing:0.02em">
        Envoyé depuis le formulaire de contact — djannistudio.fr
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
}

export async function POST(request: Request) {
	try {
		const body = await request.json()

		if (!validate(body)) {
			return NextResponse.json(
				{ error: "Veuillez remplir tous les champs obligatoires." },
				{ status: 400 },
			)
		}

		const projectLabel = PROJECT_LABELS[body.projectType] ?? body.projectType

		const resend = getResend()
		const { error } = await resend.emails.send({
			from: "Djanni Studio <noreply@djannistudio.fr>",
			to: [RECIPIENT],
			replyTo: body.email,
			subject: `Nouveau contact — ${body.name} (${projectLabel})`,
			html: buildEmailHtml(body),
		})

		if (error) {
			console.error("[contact] Resend error:", error)
			return NextResponse.json(
				{ error: "Erreur lors de l\u2019envoi. Réessayez ou contactez-moi directement." },
				{ status: 500 },
			)
		}

		return NextResponse.json({ success: true })
	} catch (err) {
		console.error("[contact] Unexpected error:", err)
		return NextResponse.json({ error: "Erreur inattendue. Réessayez plus tard." }, { status: 500 })
	}
}
