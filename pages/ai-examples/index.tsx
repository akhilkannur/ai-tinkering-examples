import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import SocialSharing from '../../components/SocialSharing'
import { fetchExamples, ExampleRecord } from '../../lib/airtable'
import { useState, useMemo } from 'react'

interface ExamplesPageProps {
  examples: ExampleRecord[]
  categories: { name: string; count: number; slug: string }[]
}

export default function ExamplesPage({ examples, categories }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredExamples = useMemo(() => {
    let filtered = examples

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(e => e.category === selectedCategory)
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
  }, [examples, selectedCategory, searchTerm])

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://your-domain.com/ai-examples'

  return (
    <>
      <Head>
        <title>AI Examples & Workflows | Copy-Ready AI Automation Ideas | AI Tinkering Examples</title>
        <meta name="description" content={`Browse ${examples.length} practical AI workflow examples. Copy-ready prompts, step-by-step guides, and automation ideas for non-technical users.`} />
        <meta name="keywords" content="AI examples, AI workflows, AI automation, prompts, AI tools, productivity, artificial intelligence" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Examples & Workflows | Copy-Ready AI Automation Ideas" />
        <meta property="og:description" content={`${examples.length} practical AI workflows you can copy and customize for your needs.`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="AI Examples & Workflows" />
        <meta name="twitter:description" content={`${examples.length} copy-ready AI workflows with step-by-step guides.`} />
        
        <link rel="canonical" content={currentUrl} />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-4 py-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              </li>
              <li className="before:content-['/'] before:mx-2 text-slate-900 font-medium">
                AI Examples
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            AI Workflow Examples
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            Discover {examples.length} practical AI workflows with step-by-step guides, 
            screenshots, and copy-ready prompts. Perfect for non-technical users who want 
            to automate tasks and boost productivity.
          </p>
        </header>

        {/* Categories Overview */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/ai-examples/category/${category.slug}`}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-slate-300 transition-all"
              >
                <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                <p className="text-sm text-slate-600">
                  {category.count} workflow{category.count !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section className="max-w-4xl mx-auto px-4 mb-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search workflows, tools, or techniques..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none"
              aria-label="Search AI examples"
            />
          </div>

          <CategoryFilter 
            categories={categories.map(c => c.name)} 
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory} 
          />

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-sm text-slate-600">
              {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''} 
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </section>

        {/* Examples Grid */}
        <main className="max-w-4xl mx-auto px-4 pb-12">
          {filteredExamples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredExamples.map(example => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-2">No examples found</p>
              <p className="text-sm text-slate-500 mb-4">
                Try adjusting your search or category filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </main>

        {/* Social Sharing */}
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <SocialSharing 
            url={currentUrl}
            title="AI Workflow Examples"
            description={`${examples.length} practical AI workflows you can copy and customize for your needs.`}
          />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const examples = await fetchExamples()
    
    // Generate category statistics
    const categoryMap = new Map<string, number>()
    examples.forEach(example => {
      if (example.category) {
        categoryMap.set(example.category, (categoryMap.get(example.category) || 0) + 1)
      }
    })

    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }))
      .sort((a, b) => b.count - a.count) // Sort by count descending

    return {
      props: { 
        examples,
        categories
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch examples:', error)
    return {
      props: { 
        examples: [],
        categories: []
      },
      revalidate: 60,
    }
  }
}
