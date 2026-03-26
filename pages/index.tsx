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
import { Zap, Search, ArrowRight, Calendar } from 'lucide-react'

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
  itemListSchema: any
}

// Helper to group by week (deterministic)
function groupByWeek(items: EnrichedExampleRecord[]) {
  // Sort items by date desc then title to ensure stable layout
  const sorted = [...items].sort((a, b) => {
    const dateDiff = new Date(b.publish_date || '2026-03-01').getTime() - new Date(a.publish_date || '2026-03-01').getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.title.localeCompare(b.title);
  });
  
  const groups: { [key: string]: EnrichedExampleRecord[] } = {};
  const itemsPerBatch = 9;
  const numBatches = Math.ceil(sorted.length / itemsPerBatch);
  
  // Starting from last week (Mar 23) going back
  for (let i = 0; i < numBatches; i++) {
    const startDate = new Date('2026-03-23');
    startDate.setDate(startDate.getDate() - (i * 7));
    
    const weekLabel = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    groups[weekLabel] = sorted.slice(i * itemsPerBatch, (i + 1) * itemsPerBatch);
  }

  return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
}

export default function HomePage({ examples, categories, itemListSchema }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems = useMemo(() => {
    return examples.filter(ex => {
      const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ex.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.category?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [examples, selectedCategory, searchQuery]);

  const weeklyBatches = useMemo(() => {
    return groupByWeek(filteredItems);
  }, [filteredItems]);

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
        <title>Real AI Examples — See How People Actually Use AI at Work</title>
        <meta name="description" content="Curated real-world AI workflows with screenshots. Not prompts. Not tools. Actual examples of people automating sales, marketing, and ops." key="description" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/`} />
        
        <meta property="og:title" content="Real AI Examples — See How People Actually Use AI at Work" key="og:title" />
        <meta property="og:description" content="Curated real-world AI workflows with screenshots. Not prompts. Not tools. Actual examples of people automating sales, marketing, and ops." key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />

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
        .font-display {
            font-family: 'Archivo Black', sans-serif;
        }
        .font-mono {
            font-family: 'Space Mono', monospace;
        }
      `}</style>

      <div className="min-h-screen font-sans selection:bg-accent-dark selection:text-white">
        <Navbar />
        
        <header className="hero-gradient pt-xl md:pt-[160px] pb-xl md:pb-xxl text-center px-4 border-b-4 border-accent-dark">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-display font-black tracking-[-0.02em] leading-[0.9] mb-lg text-primary-text uppercase">
              Curated <span className="text-secondary-text">Workflows &</span> <br className="hidden md:block" /> <span className="text-[#ff00ff]">AI Examples</span>
            </h1>
            
            <p className="text-[1.125rem] font-medium text-black max-w-xl mx-auto mb-xl leading-relaxed bg-[#ccff00] border-2 border-accent-dark px-4 py-2 rotate-1 inline-block">
              I cut through the hype to find AI workflows you can actually use. No magic, just better prompts.
            </p>

            <div className="relative max-w-[640px] mx-auto group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-light-placeholder">
                <Search size={20} />
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search examples (e.g. 'sales', 'marketing')..."
                className="w-full pl-[60px] pr-[60px] py-[18px] bg-white border-4 border-accent-dark shadow-brutalist focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-none outline-none transition-all text-[1rem] font-medium placeholder:text-light-placeholder"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1.5 px-2 py-1 bg-[#ccff00] border-2 border-accent-dark text-[10px] font-mono font-bold text-black pointer-events-none">
                <span className="opacity-50 font-sans">⌘</span> K
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-lg mt-xl mb-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b-4 border-accent-dark pb-lg">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat);
              }}
            />
            
            <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-secondary-text uppercase tracking-widest">
              <span>{filteredItems.length} {filteredItems.length === 1 ? 'Match' : 'Matches'}</span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-accent-dark underline underline-offset-4 decoration-2"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-lg pb-xxl">
          {weeklyBatches.length > 0 ? (
            <div className="space-y-xxl">
              {weeklyBatches.map(([week, items], batchIdx) => (
                <div key={week} className="space-y-lg">
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-1 border-2 border-accent-dark font-display text-sm uppercase shadow-brutalist-sm ${batchIdx === 0 ? 'bg-[#ff00ff] text-white' : 'bg-white text-primary-text'}`}>
                      Week of {week}
                    </div>
                    <div className="h-[2px] flex-grow bg-accent-dark/10"></div>
                    {batchIdx === 0 && (
                      <div className="text-[10px] font-mono font-bold text-black bg-[#ccff00] px-2 py-1 uppercase tracking-widest border border-black">
                        New Drop
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
                    {items.map((example, index) => (
                      <ExampleCard
                        key={example.id}
                        example={example}
                        priority={batchIdx === 0 && index < 6}
                        onOpen={handleOpenModal}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-xxl bg-white border-4 border-accent-dark shadow-brutalist">
              <Search className="w-12 h-12 mx-auto mb-md text-light-placeholder" />
              <p className="text-2xl font-display font-black text-primary-text mb-sm uppercase">No examples found</p>
              <p className="text-[10px] font-mono font-bold text-secondary-text mb-lg uppercase tracking-widest">Try adjusting your search or category filter</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-[#ccff00] text-black px-lg py-sm border-2 border-accent-dark shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-[0.875rem] font-display font-black uppercase"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>

        <NewsletterSignup />

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
    // Rely exclusively on local data as Airtable is dead
    const rawExamples = localSocialExamples;

    const dateSorted = rawExamples.sort((a, b) => {
      const dateA = new Date(a.publish_date || 0).getTime();
      const dateB = new Date(b.publish_date || 0).getTime();
      return dateB - dateA;
    });

    const categories = dateSorted.map(e => e.category).filter(Boolean) as string[];
    const uniqueCategories = [...new Set(categories)];

    const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
    const itemListSchema = generateItemListSchema(dateSorted, SITE_URL);

    return { 
      props: { 
        examples: dateSorted,
        categories: uniqueCategories,
        itemListSchema,
      },
      revalidate: 86400
    }
  } catch (error) {
    console.error('Failed to prepare data for homepage:', error)
    return { props: { examples: [], categories: [], itemListSchema: null } }
  }
}
