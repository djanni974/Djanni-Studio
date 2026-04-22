import withSerwist from "@serwist/next"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const isDev = process.env.NODE_ENV === "development"

const csp = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: https:",
	"font-src 'self' data:",
	"connect-src 'self'",
	"manifest-src 'self'",
	"worker-src 'self' blob:",
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"object-src 'none'",
	"upgrade-insecure-requests",
].join("; ")

const nextConfig: NextConfig = {
	poweredByHeader: false,
	transpilePackages: ["@repo/ui"],
	images: {
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		optimizePackageImports: ["@tabler/icons-react"],
	},
	async rewrites() {
		return [
			{
				source: "/js/script.js",
				destination: "https://plausible.io/js/script.js",
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
				source: "/:path*",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-DNS-Prefetch-Control", value: "off" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
					{
						key: "Content-Security-Policy",
						value: csp,
					},
				],
			},
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
		]
	},
}

export default withSerwist({
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
	disable: isDev,
})(withNextIntl(nextConfig))
