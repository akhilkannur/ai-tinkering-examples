import { useState, useEffect, useMemo, useRef } from 'react'
import { GetStaticProps } from 'next/types'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import ExampleModal from '../components/ExampleModal'
import NewsletterForm from '../components/NewsletterForm'
import { localSocialExamples } from '../lib/social-examples-data'
import { generateItemListSchema } from '../lib/seo-utils'
import { optimizeImageUrl } from '../utils/cloudinary'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

// --- Inline Components (dark, Spotify-style) ---

function DropCard({
  example,
  onOpen,
  featured = false,
}: {
  example: EnrichedExampleRecord;
  onOpen: (ex: EnrichedExampleRecord) => void;
  featured?: boolean;
}) {
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const rawUrl = example.screenshots?.[0]?.url;
  const imageUrl = optimizeImageUrl(rawUrl, example.cloudinaryPublicId, featured ? 800 : 400);

  return (
    <div
      onClick={() => onOpen(example)}
      className={`relative flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 snap-start ${
        featured
          ? 'w-full md:w-[380px] h-[280px] md:h-[380px]'
          : 'w-[170px] h-[170px] md:w-[210px] md:h-[210px]'
      }`}
    >
      {imageUrl && imgStatus !== 'error' ? (
        <Image
          src={imageUrl}
          alt={example.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          sizes={featured ? '380px' : '210px'}
          onLoad={() => setImgStatus('loaded')}
          onError={() => setImgStatus('error')}
        />
      ) : (
        <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-zinc-700 text-3xl font-display">{example.title.charAt(0)}</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute inset-0 rounded-xl ring-0 ring-green-500/0 group-hover:ring-2 group-hover:ring-green-500/40 transition-all duration-300 pointer-events-none" />

      {example.category && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-green-400 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
            {example.category}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3
          className={`text-white font-semibold leading-tight line-clamp-2 ${
            featured ? 'text-lg md:text-xl mb-2' : 'text-[13px]'
          }`}
        >
          {example.title}
        </h3>
        {featured && example.summary && (
          <p className="text-white/50 text-sm line-clamp-2 mb-2">{example.summary}</p>
        )}
        {featured && example.author_name && (
          <span className="text-white/30 text-xs font-mono">{example.author_name}</span>
        )}
      </div>
    </div>
  );
}

function WeeklyShelf({
  week,
  items,
  isLatest,
  onOpen,
}: {
  week: string;
  items: EnrichedExampleRecord[];
  isLatest: boolean;
  onOpen: (ex: EnrichedExampleRecord) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  const featured = isLatest ? items[0] : null;
  const rest = isLatest ? items.slice(1) : items;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-6 px-6 max-w-[1440px] mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-600">
          DROP / {week}
        </span>
        <div className="h-px flex-grow bg-white/[0.06]" />
        {isLatest && (
          <span className="text-[10px] font-mono font-bold text-black bg-green-500 px-3 py-1 rounded-full uppercase tracking-widest">
            NEW
          </span>
        )}
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
        >
          {featured && <DropCard example={featured} onOpen={onOpen} featured />}
          {rest.map((item) => (
            <DropCard key={item.id} example={item} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function HomePage({ examples, categories, itemListSchema }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalExample, setModalExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems = useMemo(() => {
    return examples.filter(ex => selectedCategory === 'All' || ex.category === selectedCategory);
  }, [examples, selectedCategory]);

  const weeklyBatches = useMemo(() => groupByWeek(filteredItems), [filteredItems]);

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
          background-color: #0a0a0a;
          color: #ffffff;
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
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-color: #0a0a0a;
        }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-green-500/30 selection:text-white">
        <Navbar />

        {/* Hero */}
        <header className="px-6 pt-28 md:pt-40 pb-16 md:pb-24 flex flex-col items-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-green-500/[0.07] rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full font-mono text-[10px] tracking-widest uppercase bg-white/[0.04] border border-white/10 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Weekly Drops
            </div>

            <h1 className="text-5xl md:text-8xl font-display font-semibold text-white tracking-tight leading-[1.1] mb-8">
              From people actually <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-green-500">shipping.</span>
                <span className="absolute inset-0 text-green-500 blur-lg opacity-40">shipping.</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl font-light text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Curated weekly drops of prompts, strategies, and exact setups you can copy.
            </p>

            <div className="max-w-md mx-auto">
              <NewsletterForm dark />
              <p className="text-xs font-mono text-zinc-600 mt-5 uppercase tracking-wider">
                → Next drop: Tuesday
              </p>
            </div>
          </div>
        </header>

        {/* Category Filter */}
        <section className="max-w-[1440px] mx-auto px-6 mb-12">
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-green-500 text-black'
                  : 'bg-white/[0.04] text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-green-500 text-black'
                    : 'bg-white/[0.04] text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Weekly Drops */}
        <main className="pb-24">
          {weeklyBatches.map(([week, items], idx) =>
            items.length > 0 ? (
              <WeeklyShelf
                key={week}
                week={week}
                items={items}
                isLatest={idx === 0}
                onOpen={handleOpenModal}
              />
            ) : null
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-12 px-6">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded bg-green-500" />
              <span className="font-display font-medium text-xl tracking-wide text-white uppercase">
                Real AI Examples
              </span>
            </div>

            <div className="flex gap-8 font-medium text-sm text-zinc-500">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>

            <div className="text-sm font-light text-zinc-700">
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
      revalidate: 86400,
    }
  } catch (error) {
    console.error('Failed to prepare data:', error)
    return { props: { examples: [], categories: [], itemListSchema: null } }
  }
}
