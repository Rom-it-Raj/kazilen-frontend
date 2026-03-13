import nextPWA from "next-pwa";

const runtimeCaching = [
  // 1. Next.js Static Builds & JS/CSS Bundles (Strict Cache-First)
  {
    urlPattern: /^https?.*\.(?:js|css)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "kazilen-static-assets",
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      },
    },
  },

  // 2. Local & Remote Images (Stale-While-Revalidate to keep professional pictures fresh but instantly load)
  {
    urlPattern: /^https?.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "kazilen-images",
      expiration: {
        maxEntries: 400,
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 Days
      },
    },
  },

  // 3. Fonts (Google Fonts, Custom Fonts) - Cache First for performance
  {
    urlPattern: /^https?.*\.(?:woff|woff2|ttf|eot)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "kazilen-fonts",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
      },
    },
  },

  // 4. Third-Party APIs (Mapbox, Stripe, Google Maps) - Cross Origin Caching
  {
    urlPattern: /^https?:\/\/(?:api\.mapbox\.com|fonts\.googleapis\.com|fonts\.gstatic\.com).*/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "kazilen-external-apis",
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
      cacheName: "kazilen-pages",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 24 * 60 * 60, // 1 Day
      },
      // Ensure we immediately serve the cached HTML without waiting for the network timeout lock
    },
  },
];

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/app-build-manifest\.json$/],
  runtimeCaching,
  fallbacks: {
    document: "/offline.html",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8888",
        pathname: "/**",
      },
    ],
  },
};

export default withPWA(nextConfig);