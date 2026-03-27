import { useState, useEffect, useMemo } from 'react'
import { GetStaticProps } from 'next/types'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ExampleCard from '../components/ExampleCard'
import CategoryFilter from '../components/CategoryFilter'
import ExampleModal from '../components/ExampleModal'
import NewsletterForm from '../components/NewsletterForm'
import { localSocialExamples } from '../lib/social-examples-data'
import { generateItemListSchema } from '../lib/seo-utils'
import { ArrowRight } from 'lucide-react'
import ScallopButton from '../components/ScallopButton'
import NewsletterModal from '../components/NewsletterModal' // To be created
import OrbitingCards from '../components/OrbitingCards'

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
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)

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

  const handleOpenNewsletterModal = () => {
    setIsNewsletterModalOpen(true);
  };

  const handleCloseNewsletterModal = () => {
    setIsNewsletterModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Real AI Examples — How People Actually Use AI at Work</title>
        <meta name="description" content="Curated real-world AI workflows. No magic, just better prompts and practical automation." key="description" />
        <link rel="canonical" href="https://realaiexamples.com/" />
      </Head>

      {/* SVG for filters - hidden off-screen */}
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1 }}>
        <defs>
          <filter id="warp-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="2" result="noise"></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <style jsx global>{`
        :root {
            --c-bg: #FFAAFA;
            --c-grid: #F184EB;
            --c-brand: #EF3922;
        }
        }

        body {
            background-color: var(--c-bg); /* Use Figment background */
            color: var(--c-brand); /* Use Figment brand color */
            font-family: var(--f-display); /* Use Figment display font */
            height: 100vh;
            width: 100vw;
            overflow: hidden; 
            position: relative;
        }

        .bg-grid {
            position: absolute;
            top: -20%;
            left: -20%;
            width: 140%;
            height: 140%;
            z-index: 0;
            pointer-events: none;
            background-image: 
                linear-gradient(var(--c-grid) 1px, transparent 1px),
                linear-gradient(90deg, var(--c-grid) 1px, transparent 1px);
            background-size: 60px 60px;
            background-position: center center;
            filter: url(#warp-filter);
            opacity: 0.7;
            animation: breathe 20s ease-in-out infinite alternate;
        }

        @keyframes breathe {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.05) translate(-1%, -1%); }
        }

        /* The following custom font definitions are now handled by Tailwind CSS */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div className="min-h-screen selection:bg-terminal-lime selection:text-black">
        <Navbar />

        {/* This div is the new animated background */}
        <div className="bg-grid"></div>

        {/* Orbiting Cards */}
        <OrbitingCards />

        <header className="px-6 pt-28 md:pt-40 pb-20 md:pb-32 flex flex-col items-center justify-center relative overflow-hidden">


          <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
            <h1 className="text-5xl md:text-8xl font-syne font-semibold text-figment-brand tracking-tight leading-[1.1] mb-8">
              Imagine.
            </h1>

            <div className="max-w-xl mx-auto mb-10">
              <p className="text-lg md:text-xl font-light text-figment-brand mb-12 max-w-2xl mx-auto leading-relaxed">
                Unlock your creative potential with our AI-powered canvas.
              </p>

              <div className="max-w-md mx-auto">
                <ScallopButton onClick={handleOpenNewsletterModal} className="mt-4">
                  Start creating
                </ScallopButton>
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

            <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-secondary-text whitespace-nowrap ml-8 pb-4 cursor-pointer hover:text-primary-text transition-colors">
                <i className="ph ph-sort-descending text-lg"></i>
                Latest First
            </div>
          </div>
        </section>

        <main className="max-w-[1440px] mx-auto px-6 pb-24 relative z-10">
          {weeklyBatches.map(([week, items], batchIdx) => items.length > 0 && (
            <div key={week} className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-light-placeholder">
                  DROP / {week}
                </span>
                <div className="h-px flex-grow bg-gray-200"></div>
                {batchIdx === 0 && (
                  <span className="text-[10px] font-mono font-bold text-white bg-terminal-green px-4 py-1.5 rounded uppercase tracking-widest shadow-sm">
                    NEW
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
            <button className="px-8 py-3.5 bg-white border border-gray-200 rounded font-mono text-xs uppercase tracking-widest shadow-technical hover:shadow-md hover:-translate-y-0.5 hover:border-terminal-green transition-all flex items-center gap-2 text-secondary-text">
                Load More
                <i className="ph ph-arrow-down text-terminal-green text-base"></i>
            </button>
          </div>
        </main>

        <footer className="border-t border-gray-200 bg-white mt-auto py-12 px-6">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-terminal-green"></div>
                  <div className="font-display font-medium text-xl tracking-wide text-primary-text mt-0.5 uppercase">Real AI Examples</div>
              </div>

              <div className="flex gap-8 font-medium text-sm text-secondary-text">
                  <Link href="/about" className="hover:text-primary-text transition-colors">About</Link>
                  <a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer" className="hover:text-primary-text transition-colors">Twitter</a>
                  <Link href="/" className="hover:text-primary-text transition-colors">Newsletter</Link>
              </div>

              <div className="text-sm font-light text-light-placeholder">
                  © 2026 Build With AI
              </div>
          </div>
        </footer>

        <ExampleModal
          example={modalExample as any}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <NewsletterModal
          isOpen={isNewsletterModalOpen}
          onClose={handleCloseNewsletterModal}
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
