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
            font-family: 'Outfit', sans-serif;
            background-color: #f5f2eb;
            color: #3a2d26;
        }
        .font-display {
            font-family: 'Fredoka', sans-serif;
        }
        .font-mono {
            font-family: 'JetBrains Mono', monospace;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div className="min-h-screen selection:bg-coffee-300 selection:text-coffee-900">
        <Navbar />
        
        <header className="px-6 pt-28 md:pt-40 pb-20 md:pb-32 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-coffee-200/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-coffee-300/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
            <div className="inline-block mb-8 px-5 py-2 rounded-full font-medium text-xs tracking-widest uppercase bg-white border border-coffee-200 text-coffee-600 shadow-sm">
                A library of real AI examples
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-semibold text-coffee-900 tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
              From people actually <br/>
              <span className="text-coffee-500">shipping.</span>
            </h1>
            
            <div className="max-w-xl mx-auto mb-10">
              <p className="text-lg md:text-xl font-light text-coffee-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                Get curated weekly drops of prompts, strategies, and exact setups you can copy.
              </p>
              
              <div className="max-w-md mx-auto">
                <NewsletterForm />
                <p className="text-xs font-light text-coffee-500 mt-5">
                  Get the next drop in your inbox. Sent every Tuesday.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-[1440px] mx-auto px-6 mt-8 mb-12 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            
            <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-coffee-600 whitespace-nowrap ml-8 pb-4 cursor-pointer hover:text-coffee-900 transition-colors">
                <i className="ph ph-sort-descending text-lg"></i>
                Latest First
            </div>
          </div>
        </section>

        <main className="max-w-[1440px] mx-auto px-6 pb-24 relative z-10">
          {weeklyBatches.map(([week, items], batchIdx) => items.length > 0 && (
            <div key={week} className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-coffee-400">
                  Drop / {week}
                </span>
                <div className="h-px flex-grow bg-coffee-200/60"></div>
                {batchIdx === 0 && (
                  <span className="text-[10px] font-mono font-bold text-white bg-coffee-900 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Latest
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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

          <div className="mt-16 flex justify-center">
            <button className="px-8 py-3.5 bg-white border border-coffee-200 rounded-full font-medium tracking-wide text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 text-coffee-800">
                Load More Examples
                <i className="ph ph-arrow-down text-coffee-500 text-lg"></i>
            </button>
          </div>
        </main>

        <footer className="border-t border-coffee-200/60 bg-[#f5f2eb] mt-auto py-12 px-6">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-coffee-400"></div>
                  <div className="font-display font-medium text-xl tracking-wide text-coffee-900 mt-0.5 uppercase">Real AI Examples</div>
              </div>
              
              <div className="flex gap-8 font-medium text-sm text-coffee-600">
                  <Link href="/about" className="hover:text-coffee-900 transition-colors">About</Link>
                  <a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer" className="hover:text-coffee-900 transition-colors">Twitter</a>
                  <Link href="/" className="hover:text-coffee-900 transition-colors">Newsletter</Link>
              </div>
              
              <div className="text-sm font-light text-coffee-500">
                  © 2026 Build With AI
              </div>
          </div>
        </footer>

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
