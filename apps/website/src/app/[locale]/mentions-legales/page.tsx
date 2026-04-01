import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Link } from "@/i18n/navigation"
import { getAlternates } from "@/lib/metadata"

export function generateMetadata(): Metadata {
	return {
		title: "Mentions légales — Djanni Studio",
		description:
			"Mentions légales du site Djanni Studio — Création de sites web pour artisans et commerçants en Bretagne.",
		alternates: getAlternates("/mentions-legales"),
		openGraph: {
			title: "Mentions légales — Djanni Studio",
			description:
				"Mentions légales du site Djanni Studio — Création de sites web pour artisans et commerçants en Bretagne.",
			images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Djanni Studio" }],
		},
	}
}

const sections: { title: string; content: (string | ReactNode)[] }[] = [
	{
		title: "1. Éditeur du site",
		content: [
			"Le site djannistudio.fr est édité par :",
			"**Gianni Jardin** — Djanni Studio",
			"Micro-entreprise — Création de sites web",
			"SIREN : 102 087 822",
			"SIRET : 102 087 822 00015",
			"Code APE : 6201Z — Programmation informatique",
			"Immatriculation au RNE : 06/03/2026",
			"**Dispensé d'immatriculation au RCS**",
			"__TVA non applicable, article 293 B du CGI.__",
			"Adresse : 4 boulevard Jules Verger, 35800 Dinard, France",
			"Email : __contact@djannistudio.fr__",
			"Téléphone : 07 49 54 74 98",
			"Directeur de la publication : Gianni Jardin",
		],
	},
	{
		title: "2. Hébergement",
		content: [
			"Ce site est hébergé par :",
			"**Vercel Inc.**",
			"440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
			"Site : vercel.com",
		],
	},
	{
		title: "3. Activité",
		content: [
			"Djanni Studio est une micro-entreprise spécialisée dans la __conception et le développement de sites web sur mesure__, principalement destinés aux artisans, commerçants et TPE en Bretagne.",
			"Les prestations proposées incluent : création de sites vitrines, refonte de sites existants, optimisation des performances et du référencement naturel (SEO).",
			<>
				Les conditions applicables aux prestations de Djanni Studio sont détaillées dans les{" "}
				<Link
					href="/cgv"
					className="font-semibold text-djanni-orange underline decoration-djanni-orange/40 underline-offset-[3px] transition-colors hover:text-djanni-orange-light"
				>
					Conditions Générales de Vente (CGV)
				</Link>
				.
			</>,
		],
	},
	{
		title: "4. Propriété intellectuelle",
		content: [
			"L'ensemble du contenu de ce site (textes, images, logos, illustrations, code source, design) est la __propriété exclusive de Djanni Studio__, sauf mention contraire.",
			"Toute reproduction, représentation, modification ou adaptation, totale ou partielle, de ce site ou de son contenu, par quelque procédé que ce soit, sans autorisation écrite préalable, est __strictement interdite__ et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.",
			"Les marques, logos et signes distinctifs présents sur ce site sont la propriété de Djanni Studio. Leur utilisation sans autorisation est interdite.",
		],
	},
	{
		title: "5. Protection des données personnelles (RGPD)",
		content: [
			"Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :",
			"— Droit d'accès, de rectification et de suppression",
			"— Droit à la portabilité de vos données",
			"— Droit d'opposition et de limitation du traitement",
			"**Données collectées :** Les données recueillies via le formulaire de contact (nom, email, type de projet, budget indicatif, message) sont utilisées __uniquement pour répondre à votre demande__. Elles ne sont ni vendues, ni cédées, ni transmises à des tiers.",
			"**Base légale :** Le traitement repose sur votre consentement (envoi volontaire du formulaire) et sur l'intérêt légitime de Djanni Studio à répondre aux demandes de contact.",
			"**Durée de conservation :** Les données sont conservées pendant __12 mois maximum__ après le dernier échange, puis supprimées.",
			"**Responsable du traitement :** Gianni Jardin — Djanni Studio",
			"Pour exercer vos droits ou pour toute question relative à vos données : __contact@djannistudio.fr__",
			"En cas de litige, vous pouvez adresser une réclamation à la __CNIL__ (Commission Nationale de l'Informatique et des Libertés) — www.cnil.fr",
		],
	},
	{
		title: "6. Cookies et mesure d'audience",
		content: [
			"Ce site n'utilise __aucun cookie__ de tracking, publicitaire ou analytique.",
			"Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être déposés (ex : préférences de navigation). Ces cookies ne nécessitent pas votre consentement conformément à l'article 82 de la loi Informatique et Libertés.",
			"**Mesure d'audience :** Ce site utilise __Plausible Analytics__, un outil de mesure d'audience respectueux de la vie privée. Plausible ne dépose aucun cookie, ne collecte aucune donnée personnelle et est __conforme au RGPD__ sans nécessiter de bandeau de consentement. Les données sont agrégées et anonymes (pages vues, provenance, appareil).",
			"Pour en savoir plus : plausible.io/data-policy",
		],
	},
	{
		title: "7. Liens hypertextes",
		content: [
			"Le site djannistudio.fr peut contenir des liens vers des sites tiers. Djanni Studio n'exerce aucun contrôle sur le contenu de ces sites et __décline toute responsabilité__ quant à leur contenu ou leurs pratiques en matière de protection des données.",
		],
	},
	{
		title: "8. Responsabilité",
		content: [
			"Djanni Studio s'efforce de fournir des informations aussi précises et à jour que possible sur ce site. Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes ou erreurs contenues dans les informations diffusées.",
			"L'utilisateur est __seul responsable__ de l'utilisation qu'il fait des informations présentes sur ce site.",
			"Djanni Studio ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation de ce site, y compris l'inaccessibilité, les pertes de données ou les virus.",
		],
	},
	{
		title: "9. Droit applicable et médiation",
		content: [
			"Les présentes mentions légales sont régies par le __droit français__.",
			// TODO: Remplacer par les vraies coordonnées du médiateur une fois inscrit chez Medicys
			"**Médiation de la consommation :** Conformément aux articles L.612-1 et suivants du Code de la consommation, tout consommateur a le droit de recourir __gratuitement__ à un médiateur de la consommation en vue de la résolution amiable d'un litige. Les coordonnées du médiateur compétent seront communiquées sur simple demande à __contact@djannistudio.fr__.",
			"En cas de litige, le consommateur peut saisir le tribunal de son domicile conformément aux dispositions légales en vigueur.",
		],
	},
	{
		title: "10. Crédits",
		content: [
			"Design & développement : __Djanni Studio__",
			"Typographies : Syne, DM Sans (Google Fonts)",
			"Icônes : Tabler Icons",
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

export default async function MentionsLegales({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const bc = await getTranslations({ locale, namespace: "breadcrumb" })

	return (
		<main className="mx-auto max-w-[720px] px-6 pt-32 pb-20 md:px-12">
			<Breadcrumb
				items={[
					{ label: bc("home"), href: "/" },
					{ label: bc("mentionsLegales"), href: "/mentions-legales" },
				]}
				className="mb-10"
			/>

			<h1 className="font-heading text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-tight">
				Mentions légales
			</h1>
			<p className="mt-3 text-sm text-djanni-gray-light">Dernière mise à jour : mars 2026</p>

			<div className="mt-12 space-y-10">
				{sections.map((section) => (
					<section key={section.title}>
						<h2 className="mb-4 font-heading text-lg font-bold">{section.title}</h2>
						<div className="space-y-2.5">
							{section.content.map((line, i) => (
								<p key={i} className="text-[15px] leading-relaxed text-djanni-gray-light">
									{typeof line === "string" ? renderLine(line) : line}
								</p>
							))}
						</div>
					</section>
				))}
			</div>

			{/* Link to CGV */}
			<div className="mt-14 rounded-lg border border-border bg-surface-b p-6 text-center">
				<p className="text-sm text-djanni-gray-light">
					Consultez également nos{" "}
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
