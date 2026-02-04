import { useState, useEffect, useMemo } from 'react' // Added useMemo
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import ExampleCard from '../../components/ExampleCard'
import CategoryFilter from '../../components/CategoryFilter'
import ExampleModal from '../../components/ExampleModal'
import { fetchEnrichedExamples, EnrichedExampleRecord } from '../../lib/airtable'
import { localSocialExamples } from '../../lib/social-examples-data'
import { generateItemListSchema } from '../../lib/seo-utils'

const INITIAL_DISPLAY_COUNT = 12; // Define initial display count

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
  itemListSchema: any
}

export default function ExamplesPage({ examples, categories, itemListSchema }: ExamplesPageProps) {
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
        <meta name="description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} key="description" />
        <meta name="keywords" content="AI examples, AI workflows, automation, prompts, artificial intelligence, guides" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/ai-examples`} />
        
        <meta property="og:title" content="AI Examples | Browse AI Workflows & Prompts" key="og:title" />
        <meta property="og:description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="AI Examples | Browse AI Workflows & Prompts" key="twitter:title" />
        <meta name="twitter:description" content={`Browse ${examples.length} AI workflow examples with step-by-step guides, prompts, and automation ideas for non-technical tinkerers.`} key="twitter:description" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="twitter:image" />

        {/* Structured Data */}
        {itemListSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        )}
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-text-color mb-6 tracking-tight leading-tight uppercase">
            AI That <span className="text-accent">Actually Works</span>
          </h1>
          <p className="text-lg text-text-color/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            We cut through the Twitter hype to find workflows you can actually use. No magic, just better prompts.
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
                Show More Stuff
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
    const airtableExamples = await fetchEnrichedExamples()
    const rawExamples = [...localSocialExamples, ...airtableExamples];

    // 1. Sort by date first as a baseline
    const dateSorted = rawExamples.sort((a, b) => {
      const dateA = new Date(a.publish_date || 0).getTime();
      const dateB = new Date(b.publish_date || 0).getTime();
      return dateB - dateA;
    });

    // 2. Group by Category to ensure diversity
    const examplesByCategory: Record<string, EnrichedExampleRecord[]> = {};
    dateSorted.forEach(ex => {
      const cat = ex.category || 'Uncategorized';
      if (!examplesByCategory[cat]) examplesByCategory[cat] = [];
      examplesByCategory[cat].push(ex);
    });

    // 3. Round Robin Selection for Free Tier (Top 100)
    // We want to pick the "best" (newest/has screenshot) from each category in a loop
    const FREE_LIMIT = 100;
    const freeSet = new Set<string>();
    const categoriesList = Object.keys(examplesByCategory);
    
    let picks = 0;
    let round = 0;
    const maxPerCat = Math.ceil(FREE_LIMIT / categoriesList.length) + 5; // Allow some flex

    while (picks < FREE_LIMIT && picks < rawExamples.length) {
      let madePick = false;
      for (const cat of categoriesList) {
        if (examplesByCategory[cat][round]) {
           const ex = examplesByCategory[cat][round];
           freeSet.add(ex.id);
           picks++;
           madePick = true;
           if (picks >= FREE_LIMIT) break;
        }
      }
      if (!madePick) break; // No more items left to pick
      round++;
    }

    // 4. Split and Interleave
    // We put the picked "Free" items first, then interleave with Premium
    const freePool = dateSorted.filter(ex => freeSet.has(ex.id));
    const premiumPool = dateSorted.filter(ex => !freeSet.has(ex.id));

    // Interleave: 2 Free, 1 Premium
    const mixedExamples: EnrichedExampleRecord[] = [];
    let f = 0;
    let p = 0;

    while (f < freePool.length || p < premiumPool.length) {
      // Add up to 2 free items
      for (let i = 0; i < 2 && f < freePool.length; i++) {
        mixedExamples.push({ ...freePool[f++], isPremium: false } as any);
      }
      // Add 1 premium item
      if (p < premiumPool.length) {
        mixedExamples.push({ ...premiumPool[p++], isPremium: true } as any);
      }
    }

    const categories = mixedExamples.map(e => e.category).filter(Boolean) as string[];
    const uniqueCategories = [...new Set(categories)];

    const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
    const itemListSchema = generateItemListSchema(mixedExamples, SITE_URL);

    return { 
      props: { 
        examples: mixedExamples,
        categories: uniqueCategories,
        itemListSchema,
      },
      revalidate: 300 // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch data for examples page:', error)
    const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
    return { 
      props: { 
        examples: localSocialExamples, // Fallback to local at least
        categories: [...new Set(localSocialExamples.map(e => e.category).filter(Boolean) as string[])],
        itemListSchema: generateItemListSchema(localSocialExamples, SITE_URL),
      },
      revalidate: 60 // Retry more frequently on error
    }
  }
}
