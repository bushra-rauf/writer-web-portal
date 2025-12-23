/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-supabase-domain.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
