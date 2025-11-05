import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket-test-6934.up.railway.app',
      },
    ],
  },
};

export default nextConfig;
