import { useState, useEffect, useMemo } from 'react' // Added useMemo
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import ExampleModal from '../../components/ExampleModal'
import { fetchEnrichedExamples, EnrichedExampleRecord } from '../../lib/airtable'
import { getAllRecipes } from '../../lib/recipes'

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
        <title>AI Examples | Browse AI Workflows & Prompts | Real AI Examples</title>
        <meta name="description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta name="keywords" content="AI examples, AI workflows, automation, prompts, artificial intelligence, guides" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/ai-examples`} />
        
        <meta property="og:title" content="AI Examples | Browse AI Workflows & Prompts" />
        <meta property="og:description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Examples | Browse AI Workflows & Prompts" />
        <meta name="twitter:description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} />

        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-text-color mb-6 tracking-tight leading-tight uppercase">
            AI Examples <span className="text-accent">Library</span>
          </h1>
          <p className="text-lg text-text-color/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            A library of real AI use cases shared by people on the internet. No fluff.
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
            <p className="text-sm text-text-color/80">
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
              <p className="text-text-secondary mb-2">No examples found</p>
              <p className="text-sm text-text-secondary mb-4">
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
    // 1. Fetch from Airtable (Legacy)
    const airtableExamples = await fetchEnrichedExamples();

    // 2. Fetch from Local Markdown (New)
    const localRecipes = getAllRecipes();
    
    // Map local recipes to EnrichedExampleRecord format
    const localExamples: EnrichedExampleRecord[] = localRecipes.map(recipe => {
      // Handle the image: Recipe has 'image' field, EnrichedRecord expects 'screenshots' array
      let screenshots = null;
      if (recipe.image) {
        screenshots = [{
          url: recipe.image,
          filename: recipe.title + '-image',
          thumbnails: {
            small: { url: recipe.image },
            large: { url: recipe.image }
          }
        }];
      } else if (recipe.sampleData?.content) {
         // Fallback if no image but has sample data (unlikely for new ones)
      }

      // Check for source URL (often in source_url in md, but ExampleRecord uses original_link)
      // I need to cast recipe to 'any' to access source_url if it's not in the strict type yet, or check data type
      const sourceUrl = (recipe as any).source_url || (recipe as any).original_link || null;

      return {
        id: recipe.id,
        title: recipe.title,
        slug: recipe.id, // Using filename as slug
        summary: recipe.description || recipe.tagline,
        screenshots: screenshots,
        category: recipe.category,
        categoryId: null, // No ID for local
        read_time: parseInt(recipe.time) || 5, // Approximate
        publish_date: (recipe as any).publish_date || new Date().toISOString(),
        workflow_steps: recipe.blueprint, // The content
        original_link: sourceUrl,
        tags: [recipe.difficulty], // Use difficulty as a tag
        author_name: null,
        author_link: null,
        Sponsored: false,
        sponsor: null
      };
    });

    // 3. Merge (Local first, so they appear at the top if sorted by date/default)
    // Actually, airtableExamples are usually sorted. Let's prepend local ones.
    const allExamples = [...localExamples, ...airtableExamples];

    const categories = allExamples.map(e => e.category).filter(Boolean) as string[];
    const uniqueCategories = [...new Set(categories)];

    return { 
      props: { 
        examples: allExamples,
        categories: uniqueCategories,
      },
      revalidate: 300 // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch data for examples page:', error)
    // Fallback to empty if everything fails
    return { 
      props: { 
        examples: [],
        categories: [],
      },
      revalidate: 60 
    }
  }
}