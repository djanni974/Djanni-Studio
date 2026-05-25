import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

// Dimensions et type standard Open Graph (reutilises par chaque opengraph-image.tsx)
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

// Couleurs charte (voir DESIGN.md). next/og rend via satori : styles inline only.
const BG = "#0a0a0a"
const FG = "#f5f4f2"
const MUTED = "#b8b4ac"
const ORANGE = "#e8500a"

// Syne self-hosted, charge une seule fois. next/og ne sait pas reutiliser next/font,
// il faut fournir le binaire. Lecture disque (runtime node) plutot que fetch(new URL),
// que le bundler reecrit en chemin relatif non parsable. Les .ttf sont inclus dans le
// bundle serverless via outputFileTracingIncludes (next.config.ts).
let fontsPromise: Promise<
	{ name: string; data: Buffer; weight: 800 | 500; style: "normal" }[]
> | null = null

function loadFonts() {
	if (!fontsPromise) {
		const dir = join(process.cwd(), "src/lib/og-fonts")
		fontsPromise = Promise.all([
			readFile(join(dir, "Syne-ExtraBold.ttf")),
			readFile(join(dir, "Syne-Medium.ttf")),
		]).then(([extraBold, medium]) => [
			{ name: "Syne", data: extraBold, weight: 800 as const, style: "normal" as const },
			{ name: "Syne", data: medium, weight: 500 as const, style: "normal" as const },
		])
	}
	return fontsPromise
}

// Coupe au dernier espace avant max et ajoute des points de suspension (ASCII).
function truncate(text: string, max: number) {
	if (text.length <= max) return text
	const cut = text.slice(0, max)
	const lastSpace = cut.lastIndexOf(" ")
	return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}...`
}

// Taille de titre adaptative : un nom de projet court reste imposant, un titre
// d'article long reste dans le cadre sans deborder.
function titleFontSize(length: number) {
	if (length <= 30) return 78
	if (length <= 55) return 62
	return 50
}

type OgContent = {
	title: string
	eyebrow?: string
	subtitle?: string
}

export async function renderOgImage({ title, eyebrow, subtitle }: OgContent) {
	const fonts = await loadFonts()
	const safeTitle = truncate(title, 90)
	const safeSubtitle = subtitle ? truncate(subtitle, 120) : undefined

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				position: "relative",
				overflow: "hidden",
				backgroundColor: BG,
				color: FG,
				padding: "64px 80px",
				fontFamily: "Syne",
			}}
		>
			{/* Halo orange en haut a droite */}
			<div
				style={{
					position: "absolute",
					top: -260,
					right: -180,
					width: 680,
					height: 680,
					borderRadius: 9999,
					background: "radial-gradient(circle, rgba(232,80,10,0.28) 0%, rgba(232,80,10,0) 70%)",
					display: "flex",
				}}
			/>

			{/* Wordmark */}
			<div style={{ display: "flex", alignItems: "center", fontSize: 36, fontWeight: 800 }}>
				Djanni
				<span style={{ color: ORANGE }}>.</span>
			</div>

			{/* Bloc principal centre, prend l'espace restant et clippe si trop long */}
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					overflow: "hidden",
					padding: "24px 0",
				}}
			>
				{eyebrow ? (
					<div
						style={{
							display: "flex",
							fontSize: 24,
							fontWeight: 500,
							letterSpacing: 6,
							color: ORANGE,
							marginBottom: 22,
						}}
					>
						{eyebrow}
					</div>
				) : null}
				<div
					style={{
						display: "flex",
						fontSize: titleFontSize(safeTitle.length),
						fontWeight: 800,
						lineHeight: 1.05,
						letterSpacing: -1,
						maxWidth: 1040,
					}}
				>
					{safeTitle}
				</div>
				{safeSubtitle ? (
					<div
						style={{
							display: "flex",
							fontSize: 28,
							fontWeight: 500,
							lineHeight: 1.4,
							color: MUTED,
							marginTop: 28,
							maxWidth: 940,
						}}
					>
						{safeSubtitle}
					</div>
				) : null}
			</div>

			{/* Pied */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					fontSize: 24,
					fontWeight: 500,
					color: MUTED,
				}}
			>
				djannistudio.fr
			</div>
		</div>,
		{ ...OG_SIZE, fonts },
	)
}
