import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Djanni Studio — Sites web pour artisans & commerçants"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "#0c0c0b",
				position: "relative",
			}}
		>
			{/* Subtle dot grid */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					opacity: 0.04,
					backgroundImage: "radial-gradient(circle, rgba(184,180,172,0.8) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			{/* Orange glow — top right */}
			<div
				style={{
					position: "absolute",
					top: "-10%",
					right: "-5%",
					width: 600,
					height: 600,
					borderRadius: "50%",
					background: "radial-gradient(ellipse, rgba(232,80,10,0.15) 0%, transparent 65%)",
				}}
			/>

			{/* Orange glow — bottom left */}
			<div
				style={{
					position: "absolute",
					bottom: "-15%",
					left: "-5%",
					width: 400,
					height: 400,
					borderRadius: "50%",
					background: "radial-gradient(ellipse, rgba(232,80,10,0.08) 0%, transparent 70%)",
				}}
			/>

			{/* Content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 16,
					position: "relative",
				}}
			>
				{/* Badge */}
				<div
					style={{
						fontSize: 14,
						fontWeight: 600,
						color: "#e8500a",
						letterSpacing: "0.2em",
						textTransform: "uppercase",
						marginBottom: 8,
					}}
				>
					Djanni Studio — Bretagne
				</div>

				{/* Headline */}
				<div
					style={{
						fontSize: 64,
						fontWeight: 800,
						letterSpacing: "-0.02em",
						color: "#f5f3ef",
						lineHeight: 1.1,
						textAlign: "center",
						maxWidth: 900,
					}}
				>
					Des sites web qui
				</div>
				<div
					style={{
						fontSize: 64,
						fontWeight: 800,
						letterSpacing: "-0.02em",
						color: "#e8500a",
						lineHeight: 1.1,
						textAlign: "center",
					}}
				>
					travaillent pour vous.
				</div>

				{/* Orange accent bar */}
				<div
					style={{
						width: 60,
						height: 4,
						borderRadius: 2,
						background: "#e8500a",
						marginTop: 12,
					}}
				/>

				{/* Subtitle */}
				<div
					style={{
						fontSize: 22,
						color: "#b8b4ac",
						letterSpacing: "0.01em",
						textAlign: "center",
						marginTop: 4,
					}}
				>
					Sites modernes pour artisans & commerçants locaux
				</div>

				{/* CTA */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 8,
						marginTop: 24,
						background: "#e8500a",
						color: "#ffffff",
						fontSize: 18,
						fontWeight: 600,
						padding: "14px 32px",
						borderRadius: 10,
					}}
				>
					Demander un devis gratuit
				</div>
			</div>
		</div>,
		{ ...size },
	)
}
