/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [
      "dl.airtableusercontent.com",
      "attachments.airtableusercontent.com",
      "v5.airtableusercontent.com",
      "airtableusercontent.com"
    ],
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
      }
    ],
    
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    }
    return config
  },
  
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ]
  },
  
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  trailingSlash: false,
}

module.exports = nextConfig