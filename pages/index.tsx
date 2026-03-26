import { useState, useEffect, useMemo } from 'react'
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ExampleCard from '../components/ExampleCard'
import CategoryFilter from '../components/CategoryFilter'
import ExampleModal from '../components/ExampleModal'
import NewsletterSignup from '../components/NewsletterSignup'
import { fetchEnrichedExamples, EnrichedExampleRecord } from '../lib/airtable'
import { localSocialExamples } from '../lib/social-examples-data'
import { generateItemListSchema } from '../lib/seo-utils'
import { Zap, Search, ArrowRight } from 'lucide-react'

const INITIAL_DISPLAY_COUNT = 12;

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
  itemListSchema: any
}

export default function HomePage({ examples, categories, itemListSchema }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleExamplesCount, setVisibleExamplesCount] = useState(INITIAL_DISPLAY_COUNT)
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredByCategory = useMemo(() => {
    return examples.filter(ex => {
      const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ex.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.category?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [examples, selectedCategory, searchQuery]);

  const examplesToDisplay = useMemo(() => {
    return filteredByCategory.slice(0, visibleExamplesCount);
  }, [filteredByCategory, visibleExamplesCount]);

  useEffect(() => {
    setVisibleExamplesCount(INITIAL_DISPLAY_COUNT);
  }, [selectedCategory, searchQuery]);

  const handleLoadMore = () => {
    setVisibleExamplesCount(prevCount => prevCount + INITIAL_DISPLAY_COUNT);
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
        <title>Real AI Examples — See How People Actually Use AI at Work</title>
        <meta name="description" content="Curated real-world AI workflows with screenshots. Not prompts. Not tools. Actual examples of people automating sales, marketing, and ops." key="description" />
        <meta name="keywords" content="AI examples, real AI examples, AI workflows, automation, prompts, artificial intelligence, guides" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/`} />
        
        <meta property="og:title" content="Real AI Examples — See How People Actually Use AI at Work" key="og:title" />
        <meta property="og:description" content="Curated real-world AI workflows with screenshots. Not prompts. Not tools. Actual examples of people automating sales, marketing, and ops." key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="Real AI Examples — See How People Actually Use AI at Work" key="twitter:title" />
        <meta name="twitter:description" content="Curated real-world AI workflows with screenshots. Not prompts. Not tools. Actual examples of people automating sales, marketing, and ops." key="twitter:description" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="twitter:image" />

        {itemListSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        )}
      </Head>

      <style jsx global>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
            color: #111111;
        }
        .hero-gradient {
            background: linear-gradient(to bottom, #ffffff, #fcf9f7);
        }
        .card-image-overlay {
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.02));
        }
        .text-muted {
            color: #666666;
        }
        .border-subtle {
            border-color: #eaeaea;
        }
      `}</style>

      <div className="min-h-screen font-sans selection:bg-black selection:text-white">
        <Navbar />
        
        <header className="hero-gradient pt-xl md:pt-[160px] pb-xl md:pb-xxl text-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-muted mb-md">
              Real-World Implementations
            </div>
            
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[1.1] mb-lg text-primary-text">
              Curated <span className="text-accent-dark">Real AI Examples</span>
            </h1>
            
            <p className="text-[1.125rem] font-normal text-muted max-w-2xl mx-auto mb-xl leading-relaxed">
              I cut through the hype to find AI workflows you can actually use. No magic, just better prompts and practical automation.
            </p>

            {/* Search Input Pattern */}
            <div className="relative max-w-[640px] mx-auto group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-light-placeholder">
                <Search size={20} />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search examples (e.g. 'marketing', 'sales ops')..."
                className="w-full pl-[60px] pr-[60px] py-[18px] bg-white border border-[rgba(0,0,0,0.05)] rounded-md shadow-search focus:shadow-[0_8px_40px_rgba(234,201,181,0.4)] focus:border-[rgba(0,0,0,0.1)] outline-none transition-all text-[1rem] placeholder:text-light-placeholder"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 px-2 py-1 bg-hero-tint border border-border-color rounded-sm text-[0.75rem] font-medium text-secondary-text pointer-events-none">
                <span className="opacity-50">⌘</span> K
              </div>
            </div>
          </div>
        </header>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-lg mb-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-border-color pb-lg">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat);
              }}
            />
            
            <div className="flex items-center gap-4 text-[0.875rem] font-medium text-secondary-text">
              <span>{filteredByCategory.length} {filteredByCategory.length === 1 ? 'Result' : 'Results'}</span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-accent-dark hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Examples Grid */}
        <main className="max-w-7xl mx-auto px-lg pb-xxl">
          {examplesToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
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
            <div className="text-center py-xxl bg-hero-tint rounded-md border border-border-color">
              <Search className="w-12 h-12 mx-auto mb-md text-light-placeholder" />
              <p className="text-xl font-medium text-primary-text mb-sm">No examples found</p>
              <p className="text-muted mb-lg">Try adjusting your search or category filter</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-accent-dark text-white px-lg py-sm rounded-sm text-[0.875rem] font-medium hover:bg-black transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {hasMoreExamples && (
            <div className="text-center mt-xl">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 bg-accent-dark text-white px-xl py-lg rounded-sm text-[1rem] font-medium hover:bg-black transition-all group"
              >
                Load More Examples
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </main>

        {/* Newsletter Signup */}
        <NewsletterSignup />

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

    const dateSorted = rawExamples.sort((a, b) => {
      const dateA = new Date(a.publish_date || 0).getTime();
      const dateB = new Date(b.publish_date || 0).getTime();
      return dateB - dateA;
    });

    const examplesByCategory: Record<string, EnrichedExampleRecord[]> = {};
    dateSorted.forEach(ex => {
      const cat = ex.category || 'Uncategorized';
      if (!examplesByCategory[cat]) examplesByCategory[cat] = [];
      examplesByCategory[cat].push(ex);
    });

    const FREE_LIMIT = 100;
    const freeSet = new Set<string>();
    const categoriesList = Object.keys(examplesByCategory);
    
    let picks = 0;
    let round = 0;

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
      if (!madePick) break;
      round++;
    }

    const freePool = dateSorted.filter(ex => freeSet.has(ex.id));
    const premiumPool = dateSorted.filter(ex => !freeSet.has(ex.id));

    const mixedExamples: EnrichedExampleRecord[] = [];
    let f = 0;
    let p = 0;

    while (f < freePool.length || p < premiumPool.length) {
      for (let i = 0; i < 2 && f < freePool.length; i++) {
        mixedExamples.push({ ...freePool[f++], isPremium: false } as any);
      }
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
      revalidate: 86400
    }
  } catch (error) {
    console.error('Failed to fetch data for examples page:', error)
    const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
    return { 
      props: { 
        examples: localSocialExamples,
        categories: [...new Set(localSocialExamples.map(e => e.category).filter(Boolean) as string[])],
        itemListSchema: generateItemListSchema(localSocialExamples, SITE_URL),
      },
      revalidate: 3600
    }
  }
}
