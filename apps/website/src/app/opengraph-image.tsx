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

			{/* Orange glow */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 500,
					height: 500,
					borderRadius: "50%",
					background: "radial-gradient(ellipse, rgba(232,80,10,0.12) 0%, transparent 70%)",
				}}
			/>

			{/* Content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 20,
					position: "relative",
				}}
			>
				{/* Logo text */}
				<div
					style={{
						fontSize: 72,
						fontWeight: 800,
						letterSpacing: "-0.02em",
						color: "#f5f3ef",
					}}
				>
					Djanni Studio
				</div>

				{/* Orange accent bar */}
				<div
					style={{
						width: 60,
						height: 4,
						borderRadius: 2,
						background: "#e8500a",
					}}
				/>

				{/* Subtitle */}
				<div
					style={{
						fontSize: 24,
						color: "#b8b4ac",
						letterSpacing: "0.01em",
					}}
				>
					Sites web pour artisans & commerçants
				</div>

				{/* Location */}
				<div
					style={{
						fontSize: 16,
						color: "#6b6860",
						letterSpacing: "0.15em",
						textTransform: "uppercase",
						marginTop: 8,
					}}
				>
					Bretagne, France
				</div>
			</div>
		</div>,
		{ ...size },
	)
}
