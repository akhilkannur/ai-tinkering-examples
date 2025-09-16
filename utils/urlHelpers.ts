// utils/urlHelpers.ts

import type { ExampleRecord } from '../lib/airtable'

/**
 * Generate SEO-friendly URL for an example
 */
export function getExampleUrl(example: ExampleRecord): string {
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  return `/ai-examples/${categorySlug}/${example.slug}`
}

/**
 * Generate full URL for sharing
 */
export function getFullExampleUrl(example: ExampleRecord, baseUrl?: string): string {
  const relativePath = getExampleUrl(example)
  
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${relativePath}`
  }
  
  // Fallback for server-side or if baseUrl is provided
  const domain = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  return `${domain}${relativePath}`
}

/**
 * Generate category URL
 */
export function getCategoryUrl(category: string): string {
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
  return `/ai-examples/category/${categorySlug}`
}

/**
 * Generate tag URL
 */
export function getTagUrl(tag: string): string {
  const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
  return `/ai-examples/tag/${tagSlug}`
}

/**
 * Generate social sharing URLs
 */
export function getSocialShareUrls(example: ExampleRecord, baseUrl?: string) {
  const url = getFullExampleUrl(example, baseUrl)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(example.title)
  const encodedDescription = encodeURIComponent(example.summary || example.title)

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    url
  }
}

/**
 * Extract category and slug from URL params
 */
export function parseExampleUrl(slugArray: string[]): { category: string; slug: string } {
  if (slugArray.length === 2) {
    return {
      category: slugArray[0],
      slug: slugArray[1]
    }
  }
  
  // Fallback for legacy URLs or single slug
  return {
    category: 'uncategorized',
    slug: slugArray[slugArray.length - 1]
  }
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string, baseUrl?: string): string {
  const domain = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
  return `${domain}${path}`
}
