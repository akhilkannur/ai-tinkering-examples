import { GetServerSideProps } from 'next'
import { fetchExamples } from '../lib/airtable'
import { getAllRecipes } from '../lib/recipes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://realaiexamples.com'

function generateSitemap(examples: any[], recipes: any[], categories: string[], tags: string[]) {
  const currentDate = new Date().toISOString()

  const staticPages = [
    '',
    '/about',
    '/learn-ai',
    '/ai-examples',
    '/blueprints',
    '/investors',
    '/jobs',
    '/ai-workplace-quiz',
    '/tools',
    '/tools/for-content-creators',
    '/tools/for-developers',
    '/tools/for-marketers',
    '/tools/free-ai-tools',
    '/tools/utm-builder',
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  ${staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page === '' || page === '/ai-examples' || page === '/blueprints' ? 'daily' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  
  <!-- Individual Airtable Examples -->
  ${examples.map(example => {
    const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
    const lastmod = example.publish_date || currentDate
    
    return `
  <url>
    <loc>${SITE_URL}/ai-examples/${categorySlug}/${example.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  }).join('')}

  <!-- Individual Blueprint Recipes -->
  ${recipes.map(recipe => `
  <url>
    <loc>${SITE_URL}/blueprints/${recipe.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  
  <!-- Category Pages -->
  ${categories.map(category => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
    
    return `
  <url>
    <loc>${SITE_URL}/ai-examples/category/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  }).join('')}
  
  <!-- Tag Pages -->
  ${tags.slice(0, 50).map(tag => { // Limit to top 50 tags to avoid huge sitemap
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
    
    return `
  <url>
    <loc>${SITE_URL}/ai-examples/tag/${tagSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`
  }).join('')}
</urlset>`
}

export default function Sitemap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const [examples, recipes] = await Promise.all([
      fetchExamples(),
      getAllRecipes()
    ])
    
    // Extract unique categories from Airtable
    const categories = Array.from(new Set(examples.map(e => e.category).filter(Boolean))) as string[]
    
    // Extract all tags from Airtable
    const allTags = new Set<string>()
    examples.forEach(example => {
      example.tags?.forEach(tag => allTags.add(tag))
    })
    const tags = Array.from(allTags).sort()

    const sitemap = generateSitemap(examples, recipes, categories, tags)

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return { props: {} }
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.statusCode = 500
    res.end()
    return { props: {} }
  }
}