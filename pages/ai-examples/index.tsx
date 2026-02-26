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
import { Zap, Search, ArrowRight } from 'lucide-react'

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
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

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
        <title>Real AI Examples | Curated AI Workflows & Prompts</title>
        <meta name="description" content={`Browse real AI examples with step-by-step guides, prompts, and automation workflows for non-technical tinkerers.`} key="description" />
        <meta name="keywords" content="AI examples, real AI examples, AI workflows, automation, prompts, artificial intelligence, guides" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/ai-examples`} />
        
        <meta property="og:title" content="Real AI Examples | Curated AI Workflows & Prompts" key="og:title" />
        <meta property="og:description" content={`Browse real AI examples with step-by-step guides, prompts, and automation workflows for non-technical tinkerers.`} key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="Real AI Examples | Curated AI Workflows & Prompts" key="twitter:title" />
        <meta name="twitter:description" content={`Browse real AI examples with step-by-step guides, prompts, and automation workflows for non-technical tinkerers.`} key="twitter:description" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="twitter:image" />

        {/* Structured Data */}
        {itemListSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        )}
      </Head>

      <style jsx global>{`
        body {
            font-family: 'Space Mono', monospace;
            background-color: #f0f0f0;
        }
        .font-display {
            font-family: 'Archivo Black', sans-serif;
        }
        .brutalist-shadow {
            box-shadow: 6px 6px 0px 0px #000;
        }
        .brutalist-shadow-sm {
            box-shadow: 3px 3px 0px 0px #000;
        }
        .glitch-text {
            position: relative;
        }
        .glitch-text::before, .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
            left: -2px;
            text-shadow: -1px 0 #00fff9;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
            0% { clip: rect(14px, 9999px, 12px, 0); }
            5% { clip: rect(84px, 9999px, 4px, 0); }
            10% { clip: rect(2px, 9999px, 86px, 0); }
            15% { clip: rect(6px, 9999px, 20px, 0); }
            20% { clip: rect(54px, 9999px, 27px, 0); }
            100% { clip: rect(32px, 9999px, 66px, 0); }
        }
      `}</style>

      <div className="min-h-screen font-mono text-black selection:bg-[#ff00ff] selection:text-white">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 pt-32 pb-16 text-center border-b-4 border-black bg-white mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
          
          <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] mb-6 transform -rotate-1">
            Real-World Implementations
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl text-black mb-6 uppercase tracking-tight leading-tight glitch-text" data-text="CURATED REAL AI EXAMPLES">
            Curated <span className="text-[#ff00ff]">Real AI Examples</span>
          </h1>
          <p className="text-xl font-bold max-w-2xl mx-auto mb-8 leading-relaxed border-l-4 border-[#ccff00] pl-6 py-2 bg-gray-50">
            I cut through the Twitter hype to find AI examples you can actually use. No magic, just better prompts.
          </p>
        </header>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <div className="bg-white border-4 border-black brutalist-shadow relative">
            <button 
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="absolute -top-4 -left-4 bg-black text-[#ccff00] px-4 py-2 font-display text-xs uppercase border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all brutalist-shadow-sm flex items-center gap-2"
            >
              Filter by {isFilterExpanded ? '−' : '+'}
            </button>
            
            <div className={`p-6 ${isFilterExpanded ? 'block' : 'hidden'}`}>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={(cat) => {
                  setSelectedCategory(cat);
                  setIsFilterExpanded(false);
                }}
              />
            </div>

            {/* Results Count / Status Bar */}
            <div className={`px-6 py-4 flex items-center justify-between ${isFilterExpanded ? 'border-t-2 border-black' : ''}`}>
              <p className="text-sm font-black uppercase tracking-widest">
                <span className="bg-black text-white px-2 py-0.5 mr-2">{filteredByCategory.length}</span>
                {selectedCategory === 'All' ? 'Total Examples' : `Matches in ${selectedCategory}`}
              </p>
              <div className="flex gap-2">
                {selectedCategory !== 'All' && (
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className="text-[10px] font-black uppercase underline decoration-punk-magenta mr-4 hover:text-punk-magenta"
                  >
                    Clear Filter
                  </button>
                )}
                <div className="w-3 h-3 bg-black"></div>
                <div className="w-3 h-3 bg-[#ff00ff]"></div>
                <div className="w-3 h-3 bg-[#ccff00]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Grid */}
        <main className="max-w-6xl mx-auto px-4 pb-24">
          {examplesToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-20 bg-white border-4 border-black brutalist-shadow">
              <Search className="w-16 h-16 mx-auto mb-6 text-gray-300" />
              <p className="font-display text-2xl text-black mb-4 uppercase">No examples found</p>
              <p className="font-bold text-gray-600 mb-8 uppercase tracking-widest text-sm">
                Try adjusting your search or category filter
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                }}
                className="bg-[#ccff00] border-2 border-black px-8 py-3 font-display uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Clear all filters
              </button>
            </div>
          )}

          {hasMoreExamples && (
            <div className="text-center mt-16">
              <button
                onClick={handleLoadMore}
                className="bg-[#ff00ff] text-white border-4 border-black px-12 py-6 font-display text-2xl uppercase brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 mx-auto"
              >
                Show More Stuff <Zap className="w-6 h-6 fill-current" />
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
    // We put the picked \"Free\" items first, then interleave with Premium
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
      revalidate: 86400 // Revalidate every 24 hours
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
      revalidate: 3600 // Retry less frequently on error
    }
  }
}
