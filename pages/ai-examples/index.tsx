import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import ExampleModal from '../../components/ExampleModal'
import { fetchEnrichedExamples, EnrichedExampleRecord } from '../../lib/airtable'

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
}

export default function ExamplesPage({ examples, categories }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredExamples, setFilteredExamples] = useState<EnrichedExampleRecord[]>([])
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let results = examples

    if (selectedCategory !== 'All') {
      results = results.filter(ex => ex.category === selectedCategory)
    }

    setFilteredExamples(results)
  }, [examples, selectedCategory])

  const handleOpenModal = (example: EnrichedExampleRecord) => {
    setModalExample(example)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setModalExample(null), 300)
  }

  return (
    <>
      <Head>
        <title>AI Examples | Browse AI Workflows & Prompts | AI Tinkering Examples</title>
        <meta name="description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta name="keywords" content="AI examples, AI workflows, automation, prompts, artificial intelligence, guides" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://your-domain.com/ai-examples'} />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        
        {/* Header */}
        <header className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-color mb-4 font-headline">
            AI Examples Library
          </h1>
          <p className="text-lg text-light-purple mb-6">
            Browse practical AI workflows, prompts, and automation ideas you can copy and try.
          </p>
        </header>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Results Count */}
          <div className="mt-4 mb-6">
            <p className="text-sm text-light-purple">
              {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        </section>

        {/* Examples Grid */}
        <main className="max-w-6xl mx-auto px-4 pb-12">
          {filteredExamples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExamples.map((example, index) => (
                <ExampleCard
                  key={example.id}
                  example={example}
                  priority={index < 6}
                  onOpen={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-light-purple mb-2">No examples found</p>
              <p className="text-sm text-light-purple mb-4">
                Try adjusting your search or category filter
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                }}
                className="text-accent hover:text-accent underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </main>

        {/* Modal */}
        <ExampleModal
          example={modalExample}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<ExamplesPageProps> = async () => {
  try {
    const examples = await fetchEnrichedExamples()
    const categories = examples.map(e => e.category).filter(Boolean) as string[];
    const uniqueCategories = [...new Set(categories)];

    return { 
      props: { 
        examples,
        categories: uniqueCategories,
      },
      revalidate: 300 // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch data for examples page:', error)
    return { 
      props: { 
        examples: [],
        categories: [],
      },
      revalidate: 60 // Retry more frequently on error
    }
  }
}