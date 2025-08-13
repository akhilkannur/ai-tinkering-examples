/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    // Comprehensive Airtable image domains
    domains: [
      "dl.airtableusercontent.com",
      "attachments.airtableusercontent.com",
      "v5.airtableusercontent.com", // Sometimes Airtable uses versioned subdomains
      "airtableusercontent.com" // Base domain as fallback
    ],
    
    // Alternative: Use remotePatterns for more flexibility (Next.js 12.3+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'attachments.airtableusercontent.com',
      }
    ],
    
    // Image optimization settings
    formats: ['image/webp', 'image/avif'],
    
    // Define responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache optimized images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    
    // Allow larger images from Airtable
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Disable optimization for debugging (can be removed once working)
    // unoptimized: true,
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // Performance optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Optimize bundle size
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle splitting
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
  
  // Headers for better caching and CORS
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Allow images from Airtable
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ]
  },
  
  // Compress responses
  compress: true,
  
  // PoweredBy header removal for security
  poweredByHeader: false,
  
  // Generate ETags for better caching
  generateEtags: true,
  
  // Trailing slash configuration
  trailingSlash: false,
}

module.exports = nextConfig
