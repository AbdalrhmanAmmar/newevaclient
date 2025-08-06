/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
    // إذا كنت تستخدم صور محلية خارج app
    domains: ['localhost'],
  },

};

export default nextConfig;
