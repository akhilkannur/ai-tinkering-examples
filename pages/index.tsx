import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import ExampleCard from '../components/ExampleCard'
import ExampleModal from '../components/ExampleModal'
import NewsletterSignup from '../components/NewsletterSignup'
import { fetchExamples, type ExampleRecord } from '../lib/airtable'

interface HomePageProps {
  examples: ExampleRecord[]
}

export default function HomePage({ examples }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedExample, setSelectedExample] = useState<ExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = examples
      .map(ex => ex.category)
      .filter(Boolean)
      .filter((cat, idx, arr) => arr.indexOf(cat) === idx)
    return ['All', ...cats]
  }, [examples])

  // Filter examples
  const filteredExamples = useMemo(() => {
    return examples.filter(example => {
      const matchesSearch = !searchTerm || 
        example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All' || example.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [examples, searchTerm, selectedCategory])

  const handleOpenModal = (example: ExampleRecord) => {
    setSelectedExample(example)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Add a small delay before clearing the example to allow for exit animation
    setTimeout(() => setSelectedExample(null), 300)
  }

  return (
    <>
      <Head>
        <title>AI Examples You Can Copy & Try | AI Tinkering Examples</title>
        <meta name="description" content="Discover practical AI workflows, prompts, and automation ideas. Visual examples curated for non-technical tinkerers with step-by-step guides." />
        <meta name="keywords" content="AI examples, AI workflows, automation, prompts, artificial intelligence, tutorials" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-domain.com'} />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-pink-200 via-orange-200 to-yellow-200">
            {/* Animated gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/30 via-purple-300/20 via-pink-300/30 to-orange-300/20 animate-pulse"></div>
            
            {/* Moving gradient orbs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 blur-2xl animate-bounce [animation-duration:3s]"></div>
            <div className="absolute top-1/2 -right-10 w-36 h-36 bg-gradient-to-bl from-violet-400 to-purple-400 rounded-full opacity-50 blur-2xl animate-bounce [animation-duration:4s] [animation-delay:1s]"></div>
            <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-gradient-to-tr from-orange-400 to-yellow-400 rounded-full opacity-55 blur-2xl animate-bounce [animation-duration:5s] [animation-delay:2s]"></div>
            
            {/* Floating geometric shapes */}
            <div className="absolute top-8 left-12 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg rotate-12 opacity-70 animate-spin [animation-duration:8s]"></div>
            <div className="absolute top-20 right-16 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rotate-45 opacity-60 animate-ping [animation-duration:3s]"></div>
            <div className="absolute bottom-16 right-20 w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-50 animate-pulse [animation-duration:4s]"></div>
            <div className="absolute bottom-24 left-16 w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-65 animate-bounce [animation-duration:6s]"></div>
            
            {/* Subtle mesh gradient overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 80%, rgba(251, 146, 60, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 90% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 60% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
                `
              }}
            ></div>

            {/* Sparkle effects */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-ping [animation-duration:1.5s]"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-ping [animation-duration:2.5s] [animation-delay:0.5s]"></div>
            <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full opacity-60 animate-ping [animation-duration:3.5s] [animation-delay:1s]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 drop-shadow-sm">
                AI examples you can copy & try
              </h1>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                Short, visual examples of people playing with AI — prompts, workflows, threads, videos. 
                Curated for non-technical tinkerers.
              </p>
            </div>

            {/* Newsletter CTA */}
            <div className="flex justify-center mb-8">
              <a 
                href="#newsletter" 
                className="inline-block rounded-xl px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-sm border border-white/20 relative overflow-hidden"
              >
                <span className="relative z-10">Get weekly examples</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Search and filters */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search examples, tags, or descriptions..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 justify-center flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm ${
                      selectedCategory === category
                        ? 'bg-black/80 text-white shadow-lg'
                        : 'bg-white/80 text-slate-600 hover:bg-white shadow-md border border-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Examples grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {filteredExamples.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No examples found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExamples.map((example, index) => (
                <ExampleCard
                  key={example.id}
                  example={example}
                  priority={index < 8} // Prioritize first 8 images for faster LCP
                  onOpen={handleOpenModal}
                />
              ))}
            </div>
          )}
        </div>

        {/* Newsletter signup */}
        <div className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <NewsletterSignup />
          </div>
        </div>

        {/* Modal */}
        <ExampleModal
          example={selectedExample}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const examples = await fetchExamples()
    return {
      props: { examples },
      revalidate: 300, // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch examples:', error)
    return {
      props: { examples: [] },
      revalidate: 60, // Retry more frequently on error
    }
  }
}
