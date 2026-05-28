type JsonLdProps = {
	data: Record<string, unknown>
}

/**
 * Rend un bloc JSON-LD. JSON.stringify n'echappe pas "<", donc une chaine
 * contenant "</script>" (ou "<!--") pourrait casser la balise <script> et
 * injecter du markup. On echappe "<" en \\u003c (equivalent JSON, parse a
 * l'identique) pour neutraliser tout breakout, quelle que soit la source des
 * donnees. Sink JSON-LD unique du site : toujours passer par ce composant.
 */
export function JsonLd({ data }: JsonLdProps) {
	const json = JSON.stringify(data).replace(/</g, "\\u003c")
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, "<" echappe
			dangerouslySetInnerHTML={{ __html: json }}
		/>
	)
}
