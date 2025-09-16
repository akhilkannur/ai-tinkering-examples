import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import { Search } from 'lucide-react'
import Navbar from '../../components/Navbar'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import ExampleModal from '../../components/ExampleModal'
import { fetchExamples, fetchSponsors, fetchCategories, ExampleRecord, SponsorRecord, CategoryRecord, EnrichedExampleRecord } from '../../lib/airtable'

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
}

export default function ExamplesPage({ examples, categories }: ExamplesPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredExamples, setFilteredExamples] = useState<EnrichedExampleRecord[]>([])
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let results = examples

    if (selectedCategory !== 'All') {
      results = results.filter(ex => ex.category === selectedCategory)
    }
    if (searchTerm) {
      results = results.filter(ex =>
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredExamples(results)
  }, [examples, searchTerm, selectedCategory])

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
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Header */}
        <header className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            AI Examples Library
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Browse practical AI workflows, prompts, and automation ideas you can copy and try.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search examples, tags, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
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
            <p className="text-sm text-slate-600">
              {filteredExamples.length} example{filteredExamples.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
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
                  sponsor={example.sponsor}
                  priority={index < 6}
                  onOpen={handleOpenModal}
                />
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
    console.log('--- Starting Data Fetch for Examples Page ---');
    // Fetch all data in parallel
    const [rawExamples, categories, sponsors] = await Promise.all([
      fetchExamples(),
      fetchCategories(),
      fetchSponsors()
    ]);

    console.log(`Fetched ${rawExamples.length} examples, ${categories.length} categories, ${sponsors.length} sponsors.`);

    // Create lookup maps for efficient data joining
    const categoriesById = new Map(categories.map(c => [c.id, c.name]));
    const sponsorsByCategoryId = new Map(sponsors.map(s => [s.categoryId, s]));

    // --- DEBUGGING LOGS ---
    console.log('Categories Map:', categoriesById);
    console.log('Sponsors Map (by Category ID):', sponsorsByCategoryId);
    if (rawExamples.length > 0) {
      console.log('First Raw Example Record:', rawExamples[0]);
    }
    // --- END DEBUGGING LOGS ---

    // Enrich examples with category names and sponsor info
    const examples: EnrichedExampleRecord[] = rawExamples.map(example => {
      const categoryName = example.categoryId ? categoriesById.get(example.categoryId) : null;
      // Ensure sponsor is `null` if not found, not `undefined`
      const sponsor = example.categoryId ? (sponsorsByCategoryId.get(example.categoryId) ?? null) : null;
      
      return {
        ...example,
        category: categoryName || example.category, // Fallback to original if any
        sponsor: sponsor,
      };
    });

    if (examples.length > 0) {
        console.log('First ENRICHED Example Record:', examples[0]);
    }

    const categoryNames = [...categoriesById.values()];

    console.log('--- Data Fetch Finished Successfully ---');

    return { 
      props: { 
        examples,
        categories: categoryNames,
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
