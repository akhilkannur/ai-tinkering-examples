/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    // Comprehensive Airtable image domains
    domains: [
      "dl.airtableusercontent.com",
      "attachments.airtableusercontent.com",
      "v5.airtableusercontent.com",
      "airtableusercontent.com"
    ],
    
    // Remote patterns for more flexibility
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtableusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'attachments.airtableusercontent.com',
        pathname: '/**',
      }
    ],
    
    // Image optimization settings
    formats: ['image/webp', 'image/avif'],
    
    // Define responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Increase cache TTL to 60 days for better performance
    minimumCacheTTL: 60 * 60 * 24 * 60,
    
    // Allow SVG with proper CSP
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Disable image optimization errors
    unoptimized: false,
    
    // Add custom loader for better error handling
    loader: 'default',
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // Performance optimizations
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Optimize bundle size
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    // Optimize image loading
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
            name: '[name]-[hash].[ext]',
          },
        },
      ],
    });
    
    return config
  },
  
  // Enhanced headers for better caching and CORS
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
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
      // Allow images from Airtable with proper CORS
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization'
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
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig