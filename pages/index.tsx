import { useState, useEffect, useMemo } from 'react'
import { GetStaticProps } from 'next/types'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ExampleCard from '../components/ExampleCard'
import CategoryFilter from '../components/CategoryFilter'
import ExampleModal from '../components/ExampleModal'
import NewsletterForm from '../components/NewsletterForm'
import { localSocialExamples } from '../lib/social-examples-data'
import { generateItemListSchema } from '../lib/seo-utils'
import { ArrowRight } from 'lucide-react'

// EnrichedExampleRecord type definition (locally for now since Airtable is dead)
export interface EnrichedExampleRecord {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  publish_date?: string;
  category?: string;
  screenshots?: { url: string }[];
  cloudinaryPublicId?: string;
  author_name?: string;
  author_link?: string;
  original_link?: string;
  isPremium?: boolean;
  sponsor?: any;
  workflow_steps?: string;
}

interface ExamplesPageProps {
  examples: EnrichedExampleRecord[]
  categories: string[]
  itemListSchema: any
}

// Helper to group by week (deterministic)
function groupByWeek(items: EnrichedExampleRecord[]) {
  const sorted = [...items].sort((a, b) => {
    const dateA = new Date(a.publish_date || '2026-03-01').getTime();
    const dateB = new Date(b.publish_date || '2026-03-01').getTime();
    return dateB - dateA || a.title.localeCompare(b.title);
  });
  
  const groups: { [key: string]: EnrichedExampleRecord[] } = {};
  const itemsPerBatch = 9;
  const numBatches = Math.ceil(sorted.length / itemsPerBatch);
  
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
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems = useMemo(() => {
    return examples.filter(ex => {
      return selectedCategory === 'All' || ex.category === selectedCategory;
    });
  }, [examples, selectedCategory]);

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
        <title>Real AI Examples — How People Actually Use AI at Work</title>
        <meta name="description" content="Curated real-world AI workflows. No magic, just better prompts and practical automation." key="description" />
        <link rel="canonical" href="https://realaiexamples.com/" />
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
        .font-display {
            font-family: 'Archivo Black', sans-serif;
        }
        .font-mono {
            font-family: 'Space Mono', monospace;
        }
      `}</style>

      <div className="min-h-screen selection:bg-black selection:text-white">
        <Navbar />
        
        <header className="pt-12 md:pt-24 pb-12 text-center px-4 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-black text-black uppercase leading-[0.95] mb-6 tracking-tight">
              Real Workflows. <br/> AI Examples.
            </h1>
            
            <div className="max-w-xl mx-auto mb-10">
              <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed mb-8">
                I cut through the hype to find AI workflows you can actually use. No magic, just better prompts.
              </p>
              
              <div className="max-w-md mx-auto">
                <NewsletterForm />
                <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-3">
                  Get the weekly drop
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 mt-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <span>{filteredItems.length} {filteredItems.length === 1 ? 'Example' : 'Examples'}</span>
              {selectedCategory !== 'All' && (
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="text-black underline underline-offset-4 decoration-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 pb-16">
          {weeklyBatches.map(([week, items], batchIdx) => items.length > 0 && (
            <div key={week} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-gray-400">
                  Drop / {week}
                </span>
                <div className="h-px flex-grow bg-gray-100"></div>
                {batchIdx === 0 && (
                  <span className="text-[10px] font-mono font-bold text-black bg-white border border-black px-2 py-0.5 uppercase tracking-widest">
                    Latest
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {items.map((example) => (
                  <ExampleCard
                    key={example.id}
                    example={example as any}
                    onOpen={handleOpenModal}
                  />
                ))}
              </div>
            </div>
          ))}
        </main>

        <ExampleModal
          example={modalExample as any}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<ExamplesPageProps> = async () => {
  try {
    const rawExamples = localSocialExamples;
    const dateSorted = [...rawExamples].sort((a, b) => {
      const dateA = new Date(a.publish_date || 0).getTime();
      const dateB = new Date(b.publish_date || 0).getTime();
      return dateB - dateA;
    });
    const categories = Array.from(new Set(dateSorted.map(e => e.category).filter(Boolean))) as string[];
    const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
    const itemListSchema = generateItemListSchema(dateSorted as any, SITE_URL);
    return { 
      props: { examples: dateSorted as any, categories, itemListSchema },
      revalidate: 86400
    }
  } catch (error) {
    console.error('Failed to prepare data:', error)
    return { props: { examples: [], categories: [], itemListSchema: null } }
  }
}
