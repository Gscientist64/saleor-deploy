/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS hosts
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  output: 'standalone', // IMPORTANT: This matches your Dockerfile
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable compression
  compress: true,
  // Production optimizations
  swcMinify: true,
  // Increase build memory
  experimental: {
    workerThreads: true,
    cpus: 4,
  },
};

export default config;