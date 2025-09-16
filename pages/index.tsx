import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import ExampleCard from '../components/ExampleCard'
import ExampleModal from '../components/ExampleModal'
import NewsletterSignup from '../components/NewsletterSignup'
import { fetchExamples, type ExampleRecord } from '../lib/airtable'

interface HomePageProps {
  examples: ExampleRecord[]
}

export default function HomePage({ examples }: HomePageProps) {
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

  // Filter examples by category only
  const filteredExamples = useMemo(() => {
    return selectedCategory === 'All' 
      ? examples 
      : examples.filter(example => example.category === selectedCategory)
  }, [examples, selectedCategory])

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
        
        {/* Compact Hero Section */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-tight mb-3 sm:mb-4">
                AI examples
                <span className="text-[#2398A7]"> you can</span> copy & try
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto mb-6">
                Curated workflows and prompts for non-technical tinkerers. 
                No fluff, just actionable examples.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#newsletter"
                  className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-all duration-300"
                >
                  Get weekly examples
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map(category => (
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
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E1AA36] via-[#7ADAA5] to-[#2398A7] opacity-30"></div>
        </div>

        {/* Examples Grid - Immediately Visible */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {filteredExamples.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-2xl font-bold text-black mb-3">Nothing found</h3>
              <p className="text-lg text-gray-600 mb-6">Try selecting a different category</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 transition-colors duration-200"
              >
                Show all examples
              </button>
            </div>
          ) : (
            <>
              {/* Category indicator */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  {selectedCategory === 'All' ? 'All examples' : selectedCategory}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredExamples.map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={index < 6}
                    onOpen={handleOpenModal}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Newsletter Section - Moved Down */}
        <div className="bg-black text-white" id="newsletter">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-none">
                Stay in 
                <br />
                <span className="text-[#7ADAA5]">the loop</span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                Get fresh AI examples delivered weekly. No spam, no BS. 
                Just actionable insights you can use right away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <h3 className="text-xl font-black text-black mb-3">AI Examples</h3>
                <p className="text-gray-600 max-w-xs text-sm">
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
