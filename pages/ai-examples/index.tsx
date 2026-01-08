import { useState, useEffect, useMemo } from 'react' // Added useMemo
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import ExampleModal from '../../components/ExampleModal'
import { fetchEnrichedExamples, EnrichedExampleRecord } from '../../lib/airtable'

const INITIAL_DISPLAY_COUNT = 12; // Define initial display count

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
}

export default function ExamplesPage({ examples, categories }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleExamplesCount, setVisibleExamplesCount] = useState(INITIAL_DISPLAY_COUNT) // New state for visible count
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter examples based on category
  const filteredByCategory = useMemo(() => {
    if (selectedCategory === 'All') {
      return examples;
    }
    return examples.filter(ex => ex.category === selectedCategory);
  }, [examples, selectedCategory]);

  // Examples to display based on visibleExamplesCount
  const examplesToDisplay = useMemo(() => {
    return filteredByCategory.slice(0, visibleExamplesCount);
  }, [filteredByCategory, visibleExamplesCount]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleExamplesCount(INITIAL_DISPLAY_COUNT);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    setVisibleExamplesCount(prevCount => prevCount + INITIAL_DISPLAY_COUNT); // Load more in chunks
  };

  const handleOpenModal = (example: EnrichedExampleRecord) => {
    setModalExample(example)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setModalExample(null), 300)
  }

  const hasMoreExamples = visibleExamplesCount < filteredByCategory.length;

  return (
    <>
      <Head>
        <title>AI Examples | Browse AI Workflows & Prompts | AI Tinkering Examples</title>
        <meta name="description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta name="keywords" content="AI examples, AI workflows, automation, prompts, artificial intelligence, guides" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/ai-examples`} />
        
        <meta property="og:title" content="AI Examples | Browse AI Workflows & Prompts" />
        <meta property="og:description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Examples | Browse AI Workflows & Prompts" />
        <meta name="twitter:description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`} />

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
            Welcome to the Real AI Examples Library — a curated collection of practical AI workflows, prompts, and automation ideas you can copy and try. We focus on real-world use cases in sales, marketing, operations, content, and product development. Every example here is hand-picked for quality and updated weekly, so you’ll always find fresh, working ways people are using AI in their businesses and projects.
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
              {filteredByCategory.length} example{filteredByCategory.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        </section>

        {/* Examples Grid */}
        <main className="max-w-6xl mx-auto px-4 pb-12">
          {examplesToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {examplesToDisplay.map((example, index) => (
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

          {hasMoreExamples && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="bg-accent text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Uncover More AI Magic! ✨
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