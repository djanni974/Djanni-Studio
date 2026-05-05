import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Link } from "@/i18n/navigation"
import { getAlternates } from "@/lib/metadata"

export function generateMetadata(): Metadata {
	return {
		title: "Politique de confidentialité - Djanni Studio",
		description:
			"Politique de confidentialité du site Djanni Studio - Protection de vos données personnelles conformément au RGPD.",
		alternates: getAlternates("/politique-de-confidentialite"),
		openGraph: {
			title: "Politique de confidentialité - Djanni Studio",
			description:
				"Politique de confidentialité du site Djanni Studio - Protection de vos données personnelles conformément au RGPD.",
			images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Djanni Studio" }],
		},
	}
}

const sections = [
	{
		title: "1. Responsable du traitement",
		content: [
			"Le responsable du traitement des données personnelles collectées sur le site djannistudio.fr est :",
			"**Gianni** - Djanni Studio",
			"Micro-entreprise - Création de sites web",
			"SIREN : 102 087 822",
			"SIRET : 102 087 822 00015",
			"Adresse : 4 boulevard Jules Verger, 35800 Dinard, France",
			"Email : __contact@djannistudio.fr__",
			"Téléphone : 07 49 54 74 98",
		],
	},
	{
		title: "2. Données collectées",
		content: [
			"Les données personnelles collectées sur ce site proviennent exclusivement du __formulaire de contact__ et du __formulaire de demande de projet__. Les données recueillies sont :",
			"- Nom ou prénom",
			"- Adresse email",
			"- Numéro de téléphone (facultatif)",
			"- Type de projet et budget indicatif",
			"- Message libre",
			"__Aucune donnée n'est collectée automatiquement__ (pas de cookies de tracking, pas de fingerprinting, pas de pixels de suivi).",
		],
	},
	{
		title: "3. Finalité et base légale du traitement",
		content: [
			"Les données collectées sont utilisées __uniquement__ pour :",
			"- Répondre à votre demande de contact ou de devis",
			"- Assurer le suivi d'une relation commerciale éventuelle",
			"**Base légale :** Le traitement repose sur votre __consentement__ (envoi volontaire du formulaire) conformément à l'article 6.1.a du RGPD, ainsi que sur l'__intérêt légitime__ de Djanni Studio à répondre aux sollicitations (article 6.1.f du RGPD).",
			"Vos données ne sont __jamais__ utilisées à des fins de prospection commerciale non sollicitée.",
		],
	},
	{
		title: "4. Destinataires des données",
		content: [
			"Vos données personnelles sont strictement confidentielles. Elles ne sont __ni vendues, ni cédées, ni louées__ à des tiers.",
			"Les seuls destinataires techniques sont :",
			"- **Resend** (resend.com) : service d'envoi d'emails transactionnels utilisé pour recevoir les messages du formulaire de contact. Resend agit en tant que sous-traitant et est conforme au RGPD.",
			"- **Vercel Inc.** (vercel.com) : hébergeur du site. Les données transitent par leurs serveurs situés aux États-Unis. Vercel adhère au Data Privacy Framework (DPF) UE–États-Unis pour garantir un niveau de protection adéquat.",
			"Aucun autre tiers n'a accès à vos données.",
		],
	},
	{
		title: "5. Durée de conservation",
		content: [
			"Les données personnelles sont conservées pendant une durée de __12 mois maximum__ après le dernier échange avec vous.",
			"Passé ce délai, les données sont __supprimées définitivement__.",
			"Si une relation commerciale est établie (signature de devis), les données nécessaires à la facturation sont conservées conformément aux obligations légales comptables (__10 ans__).",
		],
	},
	{
		title: "6. Cookies et mesure d'audience",
		content: [
			"Ce site n'utilise __aucun cookie__ de tracking, publicitaire ou analytique.",
			"Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés (ex : préférences de langue). Ces cookies ne nécessitent pas votre consentement conformément à l'article 82 de la loi Informatique et Libertés.",
			"**Mesure d'audience :** Ce site utilise __Plausible Analytics__, un outil de mesure d'audience européen et respectueux de la vie privée. Plausible __ne dépose aucun cookie__, ne collecte aucune donnée personnelle et est conforme au RGPD sans nécessiter de bandeau de consentement.",
			"Les données collectées par Plausible sont exclusivement __agrégées et anonymes__ : pages vues, provenance, type d'appareil. Aucune identification individuelle n'est possible.",
			"Pour en savoir plus : plausible.io/data-policy",
		],
	},
	{
		title: "7. Vos droits",
		content: [
			"Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants :",
			"- **Droit d'accès :** obtenir la confirmation que vos données sont traitées et en recevoir une copie",
			"- **Droit de rectification :** corriger des données inexactes ou incomplètes",
			"- **Droit de suppression :** demander l'effacement de vos données",
			"- **Droit à la portabilité :** recevoir vos données dans un format structuré et lisible",
			"- **Droit d'opposition :** vous opposer au traitement de vos données",
			"- **Droit à la limitation :** demander la suspension du traitement",
			"Pour exercer ces droits, contactez-nous à : __contact@djannistudio.fr__",
			"Nous nous engageons à répondre dans un délai de __30 jours__ conformément au RGPD.",
		],
	},
	{
		title: "8. Contact et réclamation",
		content: [
			"Pour toute question relative à la protection de vos données personnelles :",
			"**Gianni** - Djanni Studio",
			"Email : __contact@djannistudio.fr__",
			"Adresse : 4 boulevard Jules Verger, 35800 Dinard, France",
			"Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation auprès de la __CNIL__ (Commission Nationale de l'Informatique et des Libertés) :",
			"CNIL - 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07",
			"Site : __www.cnil.fr__",
		],
	},
]

function renderLine(line: string) {
	const parts = line.split(/(\*\*.*?\*\*|__.*?__)/)
	return parts.map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<strong key={i} className="font-semibold text-foreground">
					{part.slice(2, -2)}
				</strong>
			)
		}
		if (part.startsWith("__") && part.endsWith("__")) {
			return (
				<span
					key={i}
					className="font-medium text-djanni-orange underline decoration-djanni-orange/40 underline-offset-[3px]"
				>
					{part.slice(2, -2)}
				</span>
			)
		}
		return <span key={i}>{part}</span>
	})
}

export default async function PolitiqueDeConfidentialite({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const bc = await getTranslations({ locale, namespace: "breadcrumb" })

	return (
		<main className="mx-auto max-w-[720px] px-6 pt-32 pb-20 md:px-12">
			<Breadcrumb
				items={[
					{ label: bc("home"), href: "/" },
					{
						label: bc("politiqueConfidentialite"),
						href: "/politique-de-confidentialite",
					},
				]}
				className="mb-10"
			/>

			<h1 className="font-heading text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-tight">
				Politique de confidentialité
			</h1>
			<p className="mt-3 text-sm text-djanni-gray-light">Dernière mise à jour : mars 2026</p>

			<div className="mt-12 space-y-10">
				{sections.map((section) => (
					<section key={section.title}>
						<h2 className="mb-4 font-heading text-lg font-bold">{section.title}</h2>
						<div className="space-y-2.5">
							{section.content.map((line, i) => (
								<p key={i} className="text-[15px] leading-relaxed text-djanni-gray-light">
									{renderLine(line)}
								</p>
							))}
						</div>
					</section>
				))}
			</div>

			{/* Links to other legal pages */}
			<div className="mt-14 rounded-lg border border-border bg-surface-b p-6 text-center">
				<p className="text-sm text-djanni-gray-light">
					Consultez également nos{" "}
					<Link
						href="/mentions-legales"
						className="font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
					>
						Mentions légales
					</Link>{" "}
					et nos{" "}
					<Link
						href="/cgv"
						className="font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
					>
						Conditions Générales de Vente
					</Link>
				</p>
			</div>
		</main>
	)
}
