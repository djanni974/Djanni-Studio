import { ImageResponse } from "next/og"

export const size = { width: 512, height: 512 }
export const contentType = "image/png"

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				backgroundColor: "#0c0c0b",
				borderRadius: "90px",
			}}
		>
			<span
				style={{
					fontFamily: "sans-serif",
					fontSize: "320px",
					fontWeight: 800,
					color: "#ffffff",
					letterSpacing: "-8px",
				}}
			>
				D<span style={{ color: "#e8500a" }}>.</span>
			</span>
		</div>,
		{ ...size },
	)
}
