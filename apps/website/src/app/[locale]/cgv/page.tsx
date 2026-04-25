import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Link } from "@/i18n/navigation"
import { getAlternates } from "@/lib/metadata"

export function generateMetadata(): Metadata {
	return {
		title: "Conditions Générales de Vente — Djanni Studio",
		description:
			"CGV de Djanni Studio — Conditions applicables aux prestations de création de sites web.",
		alternates: getAlternates("/cgv"),
		openGraph: {
			title: "Conditions Générales de Vente — Djanni Studio",
			description:
				"CGV de Djanni Studio — Conditions applicables aux prestations de création de sites web.",
			images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Djanni Studio" }],
		},
	}
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
			"**Djanni Studio** — Gianni Jardin",
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
			"— Maintenance et mises à jour ponctuelles (sur devis)",
			"- Abonnements de maintenance mensuels (paliers Essentiel, Confort, Sérénité)",
			"- Options récurrentes (gestion de réseaux sociaux mensuelle)",
			"Le détail précis de chaque prestation, ses caractéristiques et son périmètre sont définis dans le devis validé par le Client.",
			"**Les abonnements de maintenance et les options récurrentes sont régis par les dispositions spécifiques de l'article 17.**",
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
			"— Un acompte de __50 %__ du montant total est demandé à la signature du devis pour démarrer le projet.",
			"— Le solde (__50 %__) est dû à la livraison du site, avant sa mise en ligne définitive.",
			"— Pour les projets supérieurs à 2 000 €, un __paiement en 3 fois__ peut être proposé (34 % / 33 % / 33 %).",
			"**Moyens de paiement acceptés :** virement bancaire, carte bancaire, chèque.",
			"**Client professionnel :** En cas de retard de paiement, une pénalité de retard égale à 3 fois le taux d'intérêt légal sera appliquée, ainsi qu'une indemnité forfaitaire de __40 €__ pour frais de recouvrement (article L.441-10 du Code de commerce).",
			"**Client consommateur :** En cas de retard de paiement, des pénalités pourront être appliquées conformément aux dispositions légales en vigueur.",
			"**Pour les abonnements mensuels (maintenance et options récurrentes) :** voir les modalités spécifiques de l'article 17.",
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
			"**Livraison :** La livraison est réputée effectuée à la date de __mise en ligne du site__ ou à la date d'envoi par le Prestataire d'un email de livraison au Client.",
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
			"**Révisions incluses :** Chaque étape de validation inclut jusqu'à __2 tours de modifications__ (retours mineurs : ajustements de textes, couleurs, disposition). Les retours doivent être transmis en __un seul envoi groupé__ par tour, dans un délai de __7 jours ouvrés__ après présentation de l'étape.",
			"Les modifications majeures (changement de structure, ajout de fonctionnalités, refonte de maquette) qui sortent du périmètre initial du devis feront l'objet d'un __devis complémentaire__.",
		],
	},
	{
		title: "Article 9 — Propriété intellectuelle",
		content: [
			"**Avant paiement intégral :** Le Prestataire __reste propriétaire__ de l'ensemble des créations (design, code source, contenus originaux) réalisées dans le cadre du projet.",
			"**Après paiement intégral :** Le Client acquiert la __pleine propriété du code source spécifique à son projet__ ainsi que les droits d'utilisation et d'exploitation du site livré, pour la durée du droit d'auteur et pour le monde entier.",
			"Le Prestataire conserve le droit de mentionner le projet dans son portfolio et ses supports de communication, sauf accord contraire écrit.",
			"Les outils, frameworks, bibliothèques et __composants génériques__ développés ou utilisés par le Prestataire restent sa propriété et peuvent être réutilisés pour d'autres projets.",
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
			"Un __formulaire type de rétractation__ est mis à disposition du Client consommateur sur simple demande par email à contact@djannistudio.fr, conformément à l'article L.221-5 du Code de la consommation.",
			"**Abonnements de maintenance et options récurrentes :** Le Client consommateur dispose d'un délai de __14 jours__ à compter de la souscription pour exercer son droit de rétractation, par email à contact@djannistudio.fr. Si l'exécution de la prestation a commencé avec son accord exprès avant la fin de ce délai, le Client pourra être tenu de payer le __prorata__ des services déjà rendus à la date de rétractation.",
		],
	},
	{
		title: "Article 12 — Résiliation",
		content: [
			"En cas de résiliation du contrat à l'initiative du Client après le début des travaux :",
			"— __L'acompte versé reste acquis__ au Prestataire.",
			"— Si les travaux réalisés excèdent le montant de l'acompte, le Client devra régler le complément correspondant au travail effectué.",
			"En cas de manquement grave de l'une des parties à ses obligations, l'autre partie pourra résilier le contrat par lettre recommandée avec accusé de réception, après mise en demeure restée infructueuse pendant __15 jours__.",
			"**Pour la résiliation des abonnements de maintenance et options récurrentes, voir les modalités spécifiques de l'article 17.**",
		],
	},
	{
		title: "Article 13 — Responsabilité",
		content: [
			"Le Prestataire s'engage à réaliser les prestations avec soin et professionnalisme, dans le respect des règles de l'art.",
			"La responsabilité du Prestataire est __limitée au montant total du devis__ validé, dans la limite des dispositions légales applicables.",
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
			// TODO: Remplacer par les vraies coordonnées du médiateur une fois inscrit chez Medicys
			"**Client consommateur :** Conformément aux articles L.612-1 et suivants du Code de la consommation, vous avez le droit de recourir __gratuitement__ à un médiateur de la consommation. Les coordonnées du médiateur compétent seront communiquées sur simple demande à contact@djannistudio.fr.",
			"**Client professionnel :** À défaut de résolution amiable, les tribunaux compétents seront ceux du ressort du domicile du Prestataire.",
			"**Client consommateur :** Le consommateur peut saisir le tribunal de son domicile conformément aux dispositions légales en vigueur.",
		],
	},
	{
		title: "Article 16 — Droit applicable",
		content: [
			"Les présentes CGV sont soumises au __droit français__.",
			"En cas de contradiction entre les CGV et le devis, les dispositions du devis prévaudront.",
		],
	},
	{
		title: "Article 17 — Abonnements de maintenance et options récurrentes",
		content: [
			"**17.1 Objet**",
			"Le présent article régit les __abonnements mensuels__ souscrits par le Client, à savoir :",
			"- Les paliers de maintenance (Essentiel, Confort, Sérénité) présentés sur la page /maintenance du site.",
			"- Les options récurrentes (gestion de réseaux sociaux mensuelle) présentées sur la page /options du site.",
			"Le détail des prestations incluses dans chaque palier ou option est précisé dans le devis ou bon de commande signé par le Client.",
			"**17.2 Souscription**",
			"La souscription à un abonnement résulte de la __signature d'un devis__ ou d'un bon de commande dédié, distinct du devis de création éventuelle du site.",
			"L'abonnement prend effet à la date de __réception du paiement de la première facture mensuelle__.",
			"**17.3 Tarifs**",
			"Les tarifs mensuels HT sont indiqués sur les pages /maintenance et /options du site, et rappelés dans le devis. TVA non applicable, article 293 B du CGI.",
			"**Évolution tarifaire :** Le Prestataire peut modifier les tarifs avec un __préavis de 60 jours__ notifié par email. Le Client dispose alors d'un délai de __30 jours__ pour résilier sans frais ni pénalité avant l'application du nouveau tarif.",
			"**17.4 Durée et reconduction**",
			"L'abonnement est conclu pour une durée d'__un mois__, sans engagement minimum.",
			"Il est __reconduit tacitement__ chaque mois, jusqu'à résiliation par l'une des parties dans les conditions prévues à l'article 17.6.",
			"**17.5 Modalités de paiement**",
			"Une facture est émise par le Prestataire au __début de chaque période mensuelle__, payable à __7 jours__ par :",
			"- virement bancaire,",
			"- carte bancaire (lien de paiement transmis avec la facture),",
			"- chèque.",
			"__Aucun prélèvement automatique__ n'est mis en place.",
			"**Retard de paiement :** En cas de retard, les pénalités prévues à l'article 5 s'appliquent.",
			"**17.6 Résiliation**",
			"Le Client peut résilier son abonnement __à tout moment__, sans pénalité, par email à contact@djannistudio.fr.",
			"Un __préavis de 30 jours__ s'applique : la résiliation prend effet à la fin du __mois civil suivant__ la demande. Le Client reste redevable des mensualités dues jusqu'à cette date.",
			"Le Prestataire peut résilier l'abonnement dans les mêmes conditions, par email avec accusé de réception.",
			"**17.7 Impayé et suspension**",
			"En cas de non-paiement d'une facture à son échéance, le Prestataire adresse une __mise en demeure par email__.",
			"À défaut de régularisation sous __15 jours__, les prestations de l'abonnement sont __suspendues__. À défaut de régularisation sous __30 jours__, l'abonnement est __résilié de plein droit__.",
			"La suspension n'affecte pas l'hébergement du site (couvert par l'article 10), qui reste assuré par le fournisseur d'hébergement choisi par le Client.",
			"**17.8 Restitution en fin d'abonnement**",
			"À la fin de l'abonnement, quel qu'en soit le motif, le Client __conserve la propriété de son site__, de son code source et de ses accès, conformément à l'article 9.",
			"Une __sauvegarde finale__ (base de données et fichiers) est transmise au Client par email sur simple demande, dans un délai de 15 jours suivant la résiliation.",
			"**17.9 Modification des prestations incluses**",
			"Le Prestataire peut faire évoluer le contenu d'un palier de maintenance ou d'une option récurrente (par exemple, ajout d'heures incluses, mise à jour des outils utilisés).",
			"Toute modification __substantielle défavorable__ au Client est notifiée par email avec un __préavis de 60 jours__. Le Client dispose alors d'un délai de __30 jours__ pour résilier sans frais ni pénalité.",
			"**17.10 Force majeure et responsabilité**",
			"Les dispositions des articles 13 et 14 s'appliquent aux abonnements.",
			"Pour les prestations récurrentes, la responsabilité du Prestataire est limitée à __trois mois d'abonnement__, ce plafond étant distinct du plafond applicable aux prestations ponctuelles.",
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

export default async function CGV({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const bc = await getTranslations({ locale, namespace: "breadcrumb" })

	return (
		<main className="mx-auto max-w-[720px] px-6 pt-32 pb-20 md:px-12">
			<Breadcrumb
				items={[
					{ label: bc("home"), href: "/" },
					{ label: bc("cgv"), href: "/cgv" },
				]}
				className="mb-10"
			/>

			<h1 className="font-heading text-[clamp(28px,4vw,40px)] font-extrabold leading-tight tracking-tight">
				Conditions Générales de Vente
			</h1>
			<p className="mt-3 text-sm text-djanni-gray-light">Dernière mise à jour : avril 2026</p>

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
