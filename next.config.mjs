/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: 'D:\Kazilen-data',
      },
    ],
  },
};

export default nextConfig;
