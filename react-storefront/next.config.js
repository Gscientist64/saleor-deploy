/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  // REMOVE eslint config entirely
  // REMOVE swcMinify
  compress: true,
};

export default config;