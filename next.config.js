/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [
      "dl.airtableusercontent.com",
      "attachments.airtableusercontent.com",
      "v5.airtableusercontent.com",
      "airtableusercontent.com",
      "res.cloudinary.com"
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
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
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

  async redirects() {
    return [
      {
        source: '/',
        destination: '/ai-examples',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/setup',
        destination: '/agent-setup-service',
        permanent: true,
      },
      {
        source: '/build',
        destination: '/build-club',
        permanent: true,
      },
      {
        source: '/example/:path*',
        destination: '/ai-examples',
        permanent: true,
      },
      {
        source: '/skills/partner-program-hunter',
        destination: '/skills/integration-partner-finder',
        permanent: true,
      },
      {
        source: '/how-to/automate-partner-program-hunter',
        destination: '/how-to/automate-integration-partner-finder',
        permanent: true,
      },
      {
        source: '/how-to/automate-partner-hunter',
        destination: '/how-to/automate-integration-partner-finder',
        permanent: true,
      },
      {
        source: '/blueprints/partner-hunter',
        destination: '/skills/integration-partner-finder',
        permanent: true,
      },
      {
        source: '/how-to/automate-comp-plan-simulator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/skills/review-to-ad',
        destination: '/skills/review-to-ad-machine',
        permanent: true,
      },
      {
        source: '/how-to/automate-review-to-ad',
        destination: '/how-to/automate-review-to-ad-machine',
        permanent: true,
      },
      {
        source: '/blueprints/review-to-ad',
        destination: '/skills/review-to-ad-machine',
        permanent: true,
      },
      // 1. Legacy Blueprint Migration (/ai-examples -> /skills)
      {
        source: '/ai-examples/:id',
        destination: '/skills/:id',
        permanent: true,
      },
      // 2. Catch literal code leaks (Google crawling raw dynamic filenames)
      {
        source: '/tools/[slug]',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/role/[slug]',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/blueprints/[id]',
        destination: '/skills',
        permanent: true,
      },
      {
        source: '/playbook',
        destination: '/',
        permanent: true,
      },
      {
        source: '/generators',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/for',
        destination: '/tools',
        permanent: true,
      },
      // 3. Old directory structure cleanup
      {
        source: '/blueprints',
        destination: '/',
        permanent: true,
      },
      {
        source: '/skills',
        destination: '/#skills',
        permanent: true,
      },
      {
        source: '/blueprints/:id',
        destination: '/skills/:id',
        permanent: true,
      },
      {
        source: '/blueprints/category/:categorySlug',
        destination: '/skills/category/:categorySlug',
        permanent: true,
      },
      {
        source: '/role/:categorySlug',
        destination: '/skills/category/:categorySlug',
        permanent: true,
      },
      {
        source: '/ai-examples/category/building-apps',
        destination: '/tools/for-developers',
        permanent: true,
      },
      {
        source: '/ai-examples/category/design',
        destination: '/tools/for-content-creators',
        permanent: true,
      },
      {
        source: '/ai-examples/category/productivity',
        destination: '/ai-examples',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig