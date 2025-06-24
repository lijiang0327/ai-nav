/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
