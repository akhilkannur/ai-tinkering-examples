/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [
      "res.cloudinary.com"
    ],
    
    remotePatterns: [],
    
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
    const noindexHeader = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    const deprecatedSections = [
      '/skills/:path*',
      '/skills',
      '/how-to/:path*',
      '/how-to',
      '/generators/:path*',
      '/generators',
      '/playbook/:path*',
      '/playbook',
      '/ideas/:path*',
      '/ideas',
      '/ai-workplace-quiz',
      '/ai-workplace-personality',
      '/context',
      '/learn-ai',
      '/role/:path*',
    ];

    return [
      ...deprecatedSections.map((source) => ({ source, headers: noindexHeader })),
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
      // === Catch-all 301s for ALL deprecated sections ===
      // These redirect everything to homepage — strongest de-index signal
      {
        source: '/skills/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/skills',
        destination: '/',
        permanent: true,
      },
      {
        source: '/how-to/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/how-to',
        destination: '/',
        permanent: true,
      },
      {
        source: '/generators/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/generators',
        destination: '/',
        permanent: true,
      },
      {
        source: '/playbook/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/playbook',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ideas/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ideas',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blueprints/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blueprints',
        destination: '/',
        permanent: true,
      },
      {
        source: '/role/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ai-examples/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/example/:path*',
        destination: '/',
        permanent: true,
      },
      // Keep redirected (Off-brand for Tinker brand)
      {
        source: '/investors',
        destination: '/',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/',
        permanent: true,
      },
      {
        source: '/skill-architect',
        destination: '/',
        permanent: true,
      },
      {
        source: '/stacks',
        destination: '/',
        permanent: true,
      },
      { source: "/agent-setup-service", destination: "/", permanent: true },
      { source: "/ai-workplace-personality", destination: "/", permanent: true },
      { source: "/ai-workplace-quiz", destination: "/", permanent: true },
      { source: "/context", destination: "/", permanent: true },
      { source: "/learn-ai", destination: "/", permanent: true },
      { source: "/build-club", destination: "/", permanent: true },
      // === Kept redirects (still valid) ===
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
        destination: '/',
        permanent: true,
      },
      {
        source: '/tools/[slug]',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/for',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/tools/for/:path*',
        destination: '/tools',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig