import Link from "next/link"

/**
 * 404 personnalise pour les audits : slug invalide, audit non publie,
 * ou audit expire (la route API renvoie 410 qui est traite comme 404 ici).
 */

export default function AuditNotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-surface-a px-6 text-center text-foreground">
			<div className="max-w-lg">
				<p className="text-xs font-semibold uppercase tracking-widest text-djanni-orange">
					Djanni Studio
				</p>
				<h1 className="mt-3 font-heading text-4xl font-bold">Cet audit n est plus disponible</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Le lien que vous avez suivi a peut-etre expire, ou l audit a ete retire. Si vous pensez qu
					il s agit d une erreur, contactez Djanni Studio pour qu on vous regenere un lien a jour.
				</p>

				<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-lg bg-djanni-orange px-6 py-3 font-medium text-djanni-white transition hover:bg-djanni-orange-light"
					>
						Aller sur djannistudio.fr
					</Link>
					<a
						href="mailto:contact@djannistudio.fr?subject=Mon%20audit%20n%20est%20plus%20disponible"
						className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 font-medium text-foreground transition hover:border-djanni-orange"
					>
						Contacter Gianni
					</a>
				</div>
			</div>
		</main>
	)
}
