import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Search, ArrowRight } from 'lucide-react'
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
    setTimeout(() => setSelectedExample(null), 300)
  }

  return (
    <>
      <Head>
        <title>AI Examples You Can Copy & Try</title>
        <meta name="description" content="Curated AI workflows and prompts for non-technical tinkerers" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-white font-['Inter']">
        <Navbar />
        
        {/* Simplified Hero Section */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Hero Content */}
              <div className="lg:col-span-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-black leading-tight mb-6">
                  AI examples
                  <br />
                  <span className="text-[#2398A7]">you can</span> copy & try
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-xl mb-8">
                  Curated workflows and prompts for non-technical tinkerers. 
                  No fluff, just actionable examples.
                </p>
                
                <a 
                  href="#newsletter"
                  className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-base font-medium hover:bg-gray-900 transition-all duration-300"
                >
                  Get weekly examples
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Search */}
              <div className="lg:col-span-4">
                <div className="bg-white p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-black mb-4">Find examples</h3>
                  
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(0, 4).map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                    {categories.length > 4 && (
                      <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-500">
                        +{categories.length - 4} more
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E1AA36] via-[#7ADAA5] to-[#2398A7] opacity-30"></div>
        </div>

        {/* Examples Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black text-black">
                {filteredExamples.length}
              </h2>
              <p className="text-lg text-gray-600 font-light">
                example{filteredExamples.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </div>

          {filteredExamples.length === 0 ? (
            <div className="py-32 text-center">
              <h3 className="text-3xl font-bold text-black mb-4">Nothing found</h3>
              <p className="text-xl text-gray-600 mb-8">Try adjusting your search criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-900 transition-colors duration-200"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExamples.map((example, index) => (
                <div key={example.id} className="group cursor-pointer">
                  {/* Simplified card design without complex click handlers */}
                  <div 
                    className="border border-gray-100 hover:border-gray-300 transition-all duration-300 bg-white hover:shadow-sm"
                    onClick={() => handleOpenModal(example)}
                  >
                    {/* Image area */}
                    <div className="aspect-[4/3] bg-gray-50 border-b border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
                      {example.screenshots?.[0]?.url && (
                        <img 
                          src={example.screenshots[0].url} 
                          alt={`${example.title} screenshot`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#2398A7] transition-colors duration-200 line-clamp-2">
                        {example.title}
                      </h3>
                      
                      {example.summary && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {example.summary.slice(0, 100)}{example.summary.length > 100 ? '...' : ''}
                        </p>
                      )}
                      
                      {example.tags && (
                        <div className="flex flex-wrap gap-1">
                          {example.tags.slice(0, 2).map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {example.tags.length > 2 && (
                            <span className="px-2 py-1 text-xs font-medium text-gray-500">
                              +{example.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-black text-white">
          <div className="max-w-6xl mx-auto px-6 py-32">
            <div className="max-w-3xl">
              <h2 className="text-6xl sm:text-7xl font-black mb-8 leading-none">
                Stay in 
                <br />
                <span className="text-[#7ADAA5]">the loop</span>
              </h2>
              
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-16 max-w-2xl">
                Get fresh AI examples delivered weekly. No spam, no BS. 
                Just actionable insights you can use right away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-6 py-4 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-[#7ADAA5]"
                />
                <button className="bg-[#E1AA36] text-black px-8 py-4 text-lg font-medium hover:bg-[#d19a2e] transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
              <div>
                <h3 className="text-2xl font-black text-black mb-4">AI Examples</h3>
                <p className="text-gray-600 max-w-xs">
                  Curated for tinkerers, made with care.
                </p>
              </div>
              
              <div className="text-sm text-gray-500">
                © 2024 — Made for curious minds
              </div>
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
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch examples:', error)
    return {
      props: { examples: [] },
      revalidate: 60,
    }
  }
}
