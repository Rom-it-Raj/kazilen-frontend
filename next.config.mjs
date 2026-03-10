import nextPWA from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^https?.*\.(?:js|css)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "kazilen-static",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^https?.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "kazilen-images",
      expiration: {
        maxEntries: 200,
        maxAgeSeconds: 60 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^https?.*\.(?:woff|woff2|ttf|eot)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "kazilen-fonts",
      expiration: {
        maxEntries: 20,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^https?.*/,
    handler: "NetworkFirst",
    options: {
      cacheName: "kazilen-pages",
      networkTimeoutSeconds: 5,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
];

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
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