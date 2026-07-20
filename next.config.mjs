import nextPWA from "next-pwa";

const runtimeCaching = [
	// 0.1 API POST Requests (Background Sync)
	{
		urlPattern: /\/(?:api|workers)\/.*$/i,
		method: "POST",
		handler: "NetworkOnly",
		options: {
			backgroundSync: {
				name: "api-post-syncQueue",
				options: {
					maxRetentionTime: 24 * 60, // 24 hours
				},
			},
		},
	},
	// 1. Next.js Static Builds & JS/CSS Bundles (Strict Cache-First)
	{
		urlPattern: /^https?.*\.(?:js|css)$/,
		handler: "CacheFirst",
		options: {
			cacheName: "kazilen-static-assets-v1",
			expiration: {
				maxEntries: 200,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			},
		},
	},
	// 2. Local & Remote Images (Stale-While-Revalidate to keep professional pictures fresh but instantly load)
	{
		urlPattern: /^https?.*\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
		handler: "StaleWhileRevalidate",
		options: {
			cacheName: "kazilen-images-v1",
			expiration: {
				maxEntries: 80, // Reduced from 400 to prevent oversized cache growth
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			},
		},
	},
	// 3. Fonts (Google Fonts, Custom Fonts) - Cache First for performance
	{
		urlPattern: /^https?.*\.(?:woff|woff2|ttf|eot)$/,
		handler: "CacheFirst",
		options: {
			cacheName: "kazilen-fonts-v1",
			expiration: {
				maxEntries: 50,
				maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
			},
		},
	},
	// 4. Third-Party APIs (Mapbox, Stripe, Google Maps) - Cross Origin Caching
	{
		urlPattern:
			/^https?:\/\/(?:api\.mapbox\.com|fonts\.googleapis\.com|fonts\.gstatic\.com).*/i,
		handler: "StaleWhileRevalidate",
		options: {
			cacheName: "kazilen-external-apis-v1",
			expiration: {
				maxEntries: 50,
				maxAgeSeconds: 7 * 24 * 60 * 60, // 1 Week
			},
			cacheableResponse: {
				statuses: [0, 200], // Allow opaque cross-origin responses
			},
		},
	},
	// 5. Next.js Pages & Client-Side Navigations (High-Speed Local First)
	{
		urlPattern: /^https?.*/,
		handler: "StaleWhileRevalidate",
		options: {
			cacheName: "kazilen-pages-v1",
			expiration: {
				maxEntries: 100,
				maxAgeSeconds: 24 * 60 * 60, // 1 Day
			},
		},
	},
];

const withPWA = nextPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
	buildExcludes: [/app-build-manifest\.json$/],
	publicExcludes: ["!subcategories/**/*"],
	runtimeCaching,
	fallbacks: {
		document: "/offline.html",
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "standalone",
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8888",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "8000",
				pathname: "/**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(self), browsing-topics=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "Content-Security-Policy",
						// Consolidated CSP: added http/ws localhost targets for dev websockets, local APIs, and images.
						value:
							"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com; img-src 'self' blob: data: http://localhost:* https://www.google.co.in https://www.google.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://localhost:* ws://localhost:* https://kazilen-prod-899213799870.asia-south1.run.app https://api.mapbox.com https://events.mapbox.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.analytics.google.com; worker-src 'self' blob:;",
					},
				],
			},
		];
	},
};

export default withPWA(nextConfig);
