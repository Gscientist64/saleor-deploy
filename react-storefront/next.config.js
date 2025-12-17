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
    ],
  },
  output: 'standalone', // IMPORTANT for Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  // REMOVED: swcMinify (causes issues)
  // REMOVED: experimental options (cause issues)
  
  // Add these for better build handling
  staticPageGenerationTimeout: 120,
  reactStrictMode: true,
  
  // Optional: Logging during build
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default config;