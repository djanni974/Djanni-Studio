import { IconArrowLeft } from "@tabler/icons-react"
import type { Metadata } from "next"
import { Link } from "@/i18n/navigation"

export const metadata: Metadata = {
	title: "Conditions Générales de Vente — Djanni Studio",
	description:
		"CGV de Djanni Studio — Conditions applicables aux prestations de création de sites web.",
}

const sections = [
	{
		title: "Article 1 — Objet",
		content: [
			"Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l'ensemble des prestations de services réalisées par Djanni Studio (ci-après « le Prestataire ») pour ses clients (ci-après « le Client »).",
			"Elles s'appliquent à toute commande passée auprès du Prestataire, que le Client soit un professionnel ou un particulier.",
			"__Toute commande implique l'acceptation sans réserve des présentes CGV.__",
		],
	},
	{
		title: "Article 2 — Identité du Prestataire",
		content: [
			"**Djanni Studio** — Gianni",
			"Micro-entreprise — Création de sites web",
			"SIREN : 102 087 822",
			"SIRET : 102 087 822 00015",
			"Code APE : 6201Z — Programmation informatique",
			"Adresse : 4 boulevard Jules Verger, 35800 Dinard, France",
			"Email : contact@djannistudio.fr",
			"Téléphone : 07 49 54 74 98",
			"__TVA non applicable, article 293 B du CGI.__",
		],
	},
	{
		title: "Article 3 — Prestations",
		content: [
			"Djanni Studio propose des prestations de conception et développement de sites web, incluant notamment :",
			"— Création de sites vitrines",
			"— Refonte de sites existants",
			"— Optimisation des performances et du référencement naturel (SEO)",
			"— Intégration de maquettes et contenus",
			"— Maintenance et mises à jour (sur devis)",
			"Le détail précis de chaque prestation, ses caractéristiques et son périmètre sont définis dans le devis validé par le Client.",
		],
	},
	{
		title: "Article 4 — Devis et commande",
		content: [
			"Tout projet fait l'objet d'un __devis gratuit__ et personnalisé, établi après échange avec le Client.",
			"Le devis détaille : la nature des prestations, le calendrier prévisionnel, le prix total et les modalités de paiement.",
			"Le devis est valable __30 jours__ à compter de sa date d'émission.",
			"La commande est considérée comme ferme et définitive après __signature du devis__ par le Client et réception de l'acompte prévu.",
		],
	},
	{
		title: "Article 5 — Tarifs et paiement",
		content: [
			"Les prix indiqués sont en euros (€) et nets de taxe (TVA non applicable, article 293 B du CGI).",
			"**Modalités de paiement :**",
			"— Un acompte de __30 %__ du montant total est demandé à la signature du devis pour démarrer le projet.",
			"— Le solde (__70 %__) est dû à la livraison du site, avant sa mise en ligne définitive.",
			"— Pour les projets supérieurs à 2 000 €, un __paiement en 3 fois__ peut être proposé (30 % / 40 % / 30 %).",
			"Le paiement s'effectue par virement bancaire ou tout autre moyen convenu entre les parties.",
			"En cas de retard de paiement, une pénalité de retard égale à 3 fois le taux d'intérêt légal sera appliquée, ainsi qu'une indemnité forfaitaire de __40 €__ pour frais de recouvrement (article L.441-10 du Code de commerce).",
		],
	},
	{
		title: "Article 6 — Délais de réalisation",
		content: [
			"Les délais de réalisation sont indiqués à titre prévisionnel dans le devis et dépendent de la complexité du projet.",
			"**Délais indicatifs :**",
			"— Site vitrine : __2 à 4 semaines__",
			"— Site premium / refonte : __4 à 8 semaines__",
			"Ces délais courent à compter de la réception de l'acompte et de l'ensemble des éléments nécessaires fournis par le Client (textes, images, logos, accès).",
			"Tout retard dans la transmission des éléments par le Client __reporte d'autant le délai de livraison__, sans responsabilité du Prestataire.",
		],
	},
	{
		title: "Article 7 — Obligations du Client",
		content: [
			"Le Client s'engage à :",
			"— Fournir les contenus nécessaires (textes, images, logos) dans les délais convenus.",
			"— Désigner un __interlocuteur unique__ pour faciliter les échanges.",
			"— Valider les étapes clés du projet (maquette, développement, mise en ligne) dans un délai raisonnable.",
			"— Régler les factures selon les modalités prévues.",
			"En l'absence de retour du Client sous __15 jours ouvrés__ après une demande de validation, l'étape en cours est considérée comme validée.",
		],
	},
	{
		title: "Article 8 — Processus de validation et révisions",
		content: [
			"Chaque projet inclut des phases de validation aux étapes clés : maquette, développement, contenu final.",
			"**Révisions incluses :** Chaque étape de validation inclut jusqu'à __2 tours de modifications__ (retours mineurs : ajustements de textes, couleurs, disposition).",
			"Les modifications majeures (changement de structure, ajout de fonctionnalités, refonte de maquette) qui sortent du périmètre initial du devis feront l'objet d'un __devis complémentaire__.",
		],
	},
	{
		title: "Article 9 — Propriété intellectuelle",
		content: [
			"**Avant paiement intégral :** Le Prestataire __reste propriétaire__ de l'ensemble des créations (design, code source, contenus originaux) réalisées dans le cadre du projet.",
			"**Après paiement intégral :** Le Client __acquiert les droits__ d'utilisation et d'exploitation du site livré, pour la durée du droit d'auteur et pour le monde entier.",
			"Le Prestataire conserve le droit de mentionner le projet dans son portfolio et ses supports de communication, sauf accord contraire écrit.",
			"Les outils, frameworks, bibliothèques et composants génériques développés ou utilisés par le Prestataire restent sa propriété et peuvent être réutilisés pour d'autres projets.",
		],
	},
	{
		title: "Article 10 — Hébergement et nom de domaine",
		content: [
			"Sauf mention contraire dans le devis, l'hébergement et le nom de domaine __ne sont pas inclus__ dans la prestation de création du site.",
			"Le Prestataire peut accompagner le Client dans le choix et la mise en place de l'hébergement et du nom de domaine, mais ces services restent souscrits directement par le Client auprès du fournisseur de son choix.",
			"Le Client __reste propriétaire__ de son nom de domaine et de ses accès d'hébergement.",
		],
	},
	{
		title: "Article 11 — Droit de rétractation",
		content: [
			"**Client consommateur :** Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les prestations de services pleinement exécutées avant la fin du délai de rétractation avec l'accord du consommateur.",
			"Avant le début de la prestation, le Client consommateur dispose d'un délai de __14 jours__ à compter de la signature du devis pour exercer son droit de rétractation, par email à contact@djannistudio.fr. L'acompte sera alors __intégralement remboursé__.",
			"**Client professionnel :** Le droit de rétractation ne s'applique pas.",
		],
	},
	{
		title: "Article 12 — Résiliation",
		content: [
			"En cas de résiliation du contrat à l'initiative du Client après le début des travaux :",
			"— __L'acompte versé reste acquis__ au Prestataire.",
			"— Si les travaux réalisés excèdent le montant de l'acompte, le Client devra régler le complément correspondant au travail effectué.",
			"En cas de manquement grave de l'une des parties à ses obligations, l'autre partie pourra résilier le contrat par lettre recommandée avec accusé de réception, après mise en demeure restée infructueuse pendant __15 jours__.",
		],
	},
	{
		title: "Article 13 — Responsabilité",
		content: [
			"Le Prestataire s'engage à réaliser les prestations avec soin et professionnalisme, dans le respect des règles de l'art.",
			"La responsabilité du Prestataire est __limitée au montant total du devis__ validé.",
			"Le Prestataire ne saurait être tenu responsable :",
			"— Des contenus fournis par le Client (textes, images, données).",
			"— Des dysfonctionnements liés à l'hébergement, au nom de domaine ou à des services tiers.",
			"— De l'utilisation que le Client fait du site après livraison.",
			"— De tout dommage indirect (perte de chiffre d'affaires, perte de données, etc.).",
		],
	},
	{
		title: "Article 14 — Force majeure",
		content: [
			"Aucune des parties ne pourra être tenue responsable d'un retard ou d'une inexécution causé par un événement de force majeure tel que défini par l'article 1218 du Code civil (catastrophe naturelle, pandémie, panne technique généralisée, etc.).",
		],
	},
	{
		title: "Article 15 — Médiation et litiges",
		content: [
			"En cas de litige, les parties s'engagent à rechercher une __solution amiable__ avant toute action en justice.",
			"**Client consommateur :** Conformément aux articles L.612-1 et suivants du Code de la consommation, vous avez le droit de recourir __gratuitement__ à un médiateur de la consommation. Médiateur compétent : [Nom du médiateur — à compléter]. Site : [URL du médiateur — à compléter].",
			"À défaut de résolution amiable, les tribunaux compétents seront ceux du ressort du domicile du Prestataire, conformément au droit français.",
		],
	},
	{
		title: "Article 16 — Droit applicable",
		content: [
			"Les présentes CGV sont soumises au __droit français__.",
			"En cas de contradiction entre les CGV et le devis, les dispositions du devis prévaudront.",
		],
	},
]

function renderLine(line: string) {
	// Split on both **bold** and __highlight__ patterns
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

export default function CGV() {
	return (
		<main className="mx-auto max-w-[720px] px-6 pt-32 pb-20 md:px-12">
			<Link
				href="/"
				className="mb-10 inline-flex items-center gap-2 text-sm text-djanni-gray-light transition-colors hover:text-foreground"
			>
				<IconArrowLeft size={14} />
				Retour à l&apos;accueil
			</Link>

			<h1 className="font-heading text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-tight">
				Conditions Générales de Vente
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

			{/* Link to Mentions Légales */}
			<div className="mt-14 rounded-lg border border-border bg-surface-b p-6 text-center">
				<p className="text-sm text-djanni-gray-light">
					Consultez également nos{" "}
					<Link
						href="/mentions-legales"
						className="font-medium text-djanni-orange transition-colors hover:text-djanni-orange-light"
					>
						Mentions légales
					</Link>
				</p>
			</div>
		</main>
	)
}
