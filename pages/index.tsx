import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import NewsletterSignup from '../components/NewsletterSignup'
import ExampleCard from '../components/ExampleCard'
import CategoryFilter from '../components/CategoryFilter'
import { fetchExamples, ExampleRecord } from '../lib/airtable'
import { useState, useMemo } from 'react'

interface HomeProps {
  examples: ExampleRecord[]
  debugInfo?: {
    hasConfig: boolean
    errorMessage?: string
    rawExamplesCount: number
  }
}

export default function Home({ examples, debugInfo }: HomeProps) {
  const [category, setCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  console.log('Home page rendered with:', {
    examplesCount: examples.length,
    debugInfo
  })

  const categories = useMemo(() => {
    const cats = Array.from(new Set(examples.map(e => e.category || 'Uncategorized').filter(Boolean)))
    return cats.sort()
  }, [examples])

  const filteredExamples = useMemo(() => {
    let filtered = examples

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(e => (e.category || '') === category)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(term) ||
        e.summary?.toLowerCase().includes(term) ||
        e.tags?.some(tag => tag.toLowerCase().includes(term))
      )
    }

    return filtered
  }, [examples, category, searchTerm])

  return (
    <>
      <Head>
        <title>AI Tinkering Examples - Copy & Try AI Workflows</title>
        <meta name="description" content="Short, visual examples of people playing with AI — prompts, workflows, threads, videos. Curated for non-technical tinkerers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Hero />
          
          {/* Debug Information - Remove in production */}
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div className="max-w-4xl mx-auto px-4 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Debug Info (Development Only)</h3>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>Config Available: {debugInfo.hasConfig ? '✅ Yes' : '❌ No'}</p>
                  <p>Raw Examples Count: {debugInfo.rawExamplesCount}</p>
                  <p>Processed Examples Count: {examples.length}</p>
                  {debugInfo.errorMessage && (
                    <p className="text-red-700">Error: {debugInfo.errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <section className="max-w-4xl mx-auto px-4">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search examples, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none"
                aria-label="Search examples"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <CategoryFilter 
                categories={categories} 
                selectedCategory={category}
                onSelect={setCategory} 
              />
            )}

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-slate-600">
                {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''} 
                {category !== 'All' && ` in ${category}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* Examples Grid or Empty State */}
            {examples.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {debugInfo?.hasConfig ? 'No Examples Found' : 'Airtable Not Configured'}
                  </h3>
                  {debugInfo?.hasConfig ? (
                    <div className="text-slate-600 space-y-2">
                      <p>No examples were found in your Airtable base.</p>
                      <p className="text-sm">Make sure your Airtable table has data and the correct field names.</p>
                    </div>
                  ) : (
                    <div className="text-slate-600 space-y-2">
                      <p>Your Airtable configuration is missing or incomplete.</p>
                      <p className="text-sm">
                        Visit <a href="/debug" className="text-blue-600 underline">/debug</a> to check your configuration.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : filteredExamples.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {filteredExamples.map(example => 
                  <ExampleCard key={example.id} example={example} />
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border">
                <p className="text-slate-600 mb-2">No examples found</p>
                <p className="text-sm text-slate-500 mb-4">
                  Try adjusting your search or category filter
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setCategory('All')
                  }}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
          
          <NewsletterSignup />
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('🔄 getStaticProps running on home page...')
  
  // Check environment variables
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
  const apiKey = process.env.AIRTABLE_API_KEY
  const hasConfig = !!(baseId && apiKey)
  
  console.log('Environment check:', {
    hasBaseId: !!baseId,
    hasApiKey: !!apiKey,
    baseIdPreview: baseId ? `${baseId.slice(0, 8)}...` : 'missing',
    apiKeyPreview: apiKey ? `${apiKey.slice(0, 8)}...` : 'missing'
  })

  let examples: ExampleRecord[] = []
  let errorMessage: string | undefined

  try {
    examples = await fetchExamples()
    console.log(`✅ Fetched ${examples.length} examples successfully`)
    
    // Log first example for debugging
    if (examples.length > 0) {
      console.log('First example preview:', {
        id: examples[0].id,
        title: examples[0].title,
        slug: examples[0].slug,
        category: examples[0].category,
        hasScreenshots: !!examples[0].screenshots?.length
      })
    }
  } catch (error) {
    console.error('❌ Error in getStaticProps:', error)
    errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
  }

  const debugInfo = {
    hasConfig,
    errorMessage,
    rawExamplesCount: examples.length
  }

  return {
    props: { 
      examples,
      debugInfo: process.env.NODE_ENV === 'development' ? debugInfo : undefined
    },
    revalidate: 300, // 5 minutes
  }
}
