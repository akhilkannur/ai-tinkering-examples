import { useState, useEffect, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Search } from 'lucide-react'
import Navbar from '../../components/Navbar'
import ToolCard from '../../components/ToolCard'
import { fetchAllTools, ToolRecord } from '../../lib/airtable'

interface ToolsPageProps {
  tools: ToolRecord[]
}

export default function ToolsPage({ tools }: ToolsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTools, setFilteredTools] = useState<ToolRecord[]>([])

  useEffect(() => {
    let results = tools

    if (searchTerm) {
      results = results.filter(tool =>
        tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredTools(results)
  }, [tools, searchTerm])

  return (
    <>
      <Head>
        <title>AI Tools | Discover the Best AI Software - AI Tinkering Examples</title>
        <meta name="description" content="Browse a comprehensive directory of AI tools and software." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Tools | Discover the Best AI Software" />
        <meta property="og:description" content="Browse a comprehensive directory of AI tools and software." />
        <meta property="og:url" content="https://your-domain.com/tools" />
        <meta property="og:image" content="https://your-domain.com/social-share-default.jpg" />
        <meta property="og:site_name" content="AI Tinkering Examples" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools | Discover the Best AI Software" />
        <meta name="twitter:description" content="Browse a comprehensive directory of AI tools and software." />
        <meta name="twitter:image" content="https://your-domain.com/social-share-default.jpg" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            AI Tools Directory
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Discover and explore the best AI tools and software for your needs.
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search tools by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-2">No tools found</p>
              <p className="text-sm text-slate-500 mb-4">
                Try adjusting your search terms.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<ToolsPageProps> = async () => {
  try {
    const tools = await fetchAllTools()
    return {
      props: { tools },
      revalidate: 300, // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch tools:', error)
    return {
      props: { tools: [] },
      revalidate: 60, // Retry more frequently on error
    }
  }
}