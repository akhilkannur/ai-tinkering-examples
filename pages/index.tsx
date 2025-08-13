import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Search, Sparkles, Zap, Star } from 'lucide-react'
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

      <div className="min-h-screen" style={{ backgroundColor: '#f8fffe' }}>
        <Navbar />
        
        {/* Enhanced Hero Header with Color Hunt Palette */}
        <div className="relative overflow-hidden">
          {/* Beautiful gradient background using the color palette */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, 
                  #7ADAA5 0%, 
                  rgba(122, 218, 165, 0.8) 25%, 
                  rgba(35, 152, 167, 0.9) 50%, 
                  rgba(236, 236, 187, 0.8) 75%, 
                  #E1AA36 100%
                )
              `
            }}
          >
            {/* Animated gradient overlay */}
            <div 
              className="absolute inset-0 animate-pulse opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(122, 218, 165, 0.6) 0%, transparent 50%),
                  radial-gradient(circle at 70% 80%, rgba(35, 152, 167, 0.5) 0%, transparent 50%),
                  radial-gradient(circle at 20% 80%, rgba(225, 170, 54, 0.4) 0%, transparent 50%)
                `
              }}
            ></div>
            
            {/* Floating orbs with palette colors */}
            <div 
              className="absolute -top-20 -left-20 w-48 h-48 rounded-full opacity-40 blur-3xl animate-bounce [animation-duration:4s]"
              style={{ backgroundColor: '#7ADAA5' }}
            ></div>
            <div 
              className="absolute top-1/3 -right-16 w-40 h-40 rounded-full opacity-35 blur-2xl animate-bounce [animation-duration:5s] [animation-delay:1s]"
              style={{ backgroundColor: '#2398A7' }}
            ></div>
            <div 
              className="absolute -bottom-16 left-1/4 w-36 h-36 rounded-full opacity-40 blur-3xl animate-bounce [animation-duration:6s] [animation-delay:2s]"
              style={{ backgroundColor: '#E1AA36' }}
            ></div>
            
            {/* Geometric decorations */}
            <div 
              className="absolute top-12 left-20 w-8 h-8 rounded-lg rotate-12 opacity-60 animate-spin [animation-duration:10s]"
              style={{ backgroundColor: '#ECECBB' }}
            ></div>
            <div 
              className="absolute top-32 right-24 w-6 h-6 rotate-45 opacity-50 animate-pulse [animation-duration:3s]"
              style={{ backgroundColor: '#7ADAA5' }}
            ></div>
            <div 
              className="absolute bottom-20 right-32 w-10 h-10 rounded-full opacity-45 animate-bounce [animation-duration:4s]"
              style={{ backgroundColor: '#2398A7' }}
            ></div>
            
            {/* Sparkle effects */}
            <Star className="absolute top-1/4 left-1/3 w-4 h-4 text-white opacity-70 animate-ping [animation-duration:2s]" />
            <Sparkles className="absolute top-3/5 right-1/4 w-5 h-5 text-white opacity-60 animate-pulse [animation-duration:3s]" />
            <Zap className="absolute bottom-1/3 left-1/5 w-4 h-4 text-white opacity-50 animate-bounce [animation-duration:4s]" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                AI examples you can 
                <span 
                  className="block mt-2"
                  style={{ 
                    background: 'linear-gradient(45deg, #ECECBB, #E1AA36)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  copy & try
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md mb-8">
                Short, visual examples of people playing with AI — prompts, workflows, threads, videos. 
                <br className="hidden sm:block" />
                Curated for non-technical tinkerers.
              </p>
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center mb-12">
              <a 
                href="#newsletter" 
                className="group relative inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2398A7 0%, #7ADAA5 100%)',
                  boxShadow: '0 20px 40px rgba(35, 152, 167, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="relative z-10">Get weekly examples</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </a>
            </div>

            {/* Enhanced Search and Filters */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={24} />
                <input
                  type="text"
                  placeholder="Search examples, tags, or descriptions..."
                  className="w-full pl-12 pr-6 py-4 text-lg border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/60 bg-white/20 backdrop-blur-md shadow-xl placeholder-white/70 text-white transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backdropFilter: 'blur(20px)',
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="flex gap-3 justify-center flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                      selectedCategory === category
                        ? 'text-white shadow-2xl'
                        : 'text-white/80 hover:text-white hover:bg-white/20'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category ? '#2398A7' : 'rgba(255, 255, 255, 0.15)',
                      border: selectedCategory === category ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Examples Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div 
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: '#2398A7' }}
              ></div>
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
                {searchTerm && (
                  <span className="text-lg font-normal text-gray-600">
                    {' '}matching "<span style={{ color: '#2398A7' }}>{searchTerm}</span>"
                  </span>
                )}
              </h2>
            </div>
            
            {/* Stats badges */}
            <div className="hidden md:flex items-center gap-3">
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg"
                style={{ backgroundColor: '#7ADAA5' }}
              >
                ✨ Updated Weekly
              </div>
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg"
                style={{ backgroundColor: '#E1AA36' }}
              >
                🚀 Ready to Use
              </div>
            </div>
          </div>

          {filteredExamples.length === 0 ? (
            <div className="text-center py-16">
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: '#ECECBB' }}
              >
                <Search className="w-10 h-10" style={{ color: '#2398A7' }} />
              </div>
              <p className="text-xl text-gray-600 mb-4">No examples found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ backgroundColor: '#2398A7' }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredExamples.map((example, index) => (
                <div key={example.id} className="group">
                  <ExampleCard
                    example={example}
                    priority={index < 8}
                    onOpen={handleOpenModal}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Newsletter Section */}
        <div 
          className="relative py-20 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2398A7 0%, #7ADAA5 100%)'
          }}
        >
          {/* Background decorations */}
          <div 
            className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: '#ECECBB' }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: '#E1AA36' }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Stay ahead of the AI curve
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of tinkerers getting fresh AI examples, tools, and inspiration delivered weekly.
              </p>
            </div>
            
            <div 
              className="max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-white/20"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <NewsletterSignup />
            </div>
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
