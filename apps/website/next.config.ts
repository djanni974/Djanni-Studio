import withSerwist from "@serwist/next"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
	transpilePackages: ["@repo/ui"],
	images: {
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		optimizePackageImports: ["@tabler/icons-react", "motion/react"],
	},
	async rewrites() {
		return [
			{
				source: "/js/script.js",
				destination: "https://plausible.io/js/pa-aLxLCVOVZYCrqMpHaGGKF.js",
			},
			{
				source: "/api/event",
				destination: "https://plausible.io/api/event",
			},
		]
	},
	async headers() {
		return [
			{
				source: "/js/script.js",
				headers: [
					{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
				],
			},
			{
				source: "/:path*.(js|css|woff2|avif|webp|png|jpg|svg|ico)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/image/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=604800",
					},
				],
			},
		]
	},
}

export default withSerwist({
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
	disable: process.env.NODE_ENV === "development",
})(withNextIntl(nextConfig))
