import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { Search } from 'lucide-react'
import ExampleCard from '../components/ExampleCard'
import ExampleModal from '../components/ExampleModal'
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              AI examples you can copy & try
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Short, visual examples of people playing with AI — prompts, workflows, threads, videos. 
              Curated for non-technical tinkerers.
            </p>
          </div>

          {/* Newsletter signup */}
          <div className="flex justify-center mb-8">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
              Get weekly examples
            </button>
          </div>

          {/* Search and filters */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search examples, tags, or descriptions..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 justify-center flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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

      {/* Newsletter section */}
      <div className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Get a weekly roundup
          </h2>
          <p className="text-slate-600 mb-6">
            New AI examples delivered to your inbox every week.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
              Subscribe
            </button>
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
