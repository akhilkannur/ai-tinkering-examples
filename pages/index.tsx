import { useMemo, useState, useEffect } from 'react'
import { GetStaticProps } from 'next/types'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { localSocialExamples } from '../lib/social-examples-data'
import { generateItemListSchema } from '../lib/seo-utils'
import { optimizeImageUrl } from '../utils/cloudinary'
import ExampleModal from '../components/ExampleModal'

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

const CARD_COLORS = ['#6A37AC', '#7B7662', '#333333', '#C5CC5C', '#D8D8D8'];

function groupByWeek(items: EnrichedExampleRecord[]) {
  const sorted = [...items].sort((a, b) => {
    const dateA = new Date(a.publish_date || '2026-03-01').getTime();
    const dateB = new Date(b.publish_date || '2026-03-01').getTime();
    return dateB - dateA || a.title.localeCompare(b.title);
  });

  const groups: { [key: string]: EnrichedExampleRecord[] } = {};
  const itemsPerBatch = 7;
  const numBatches = Math.ceil(sorted.length / itemsPerBatch);

  for (let i = 0; i < numBatches; i++) {
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);
    const startDate = new Date(startOfThisWeek);
    startDate.setDate(startDate.getDate() - 7 * (i + 1));
    const weekLabel = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const isLastBatch = i === numBatches - 1;
    const batchSize = isLastBatch ? 9 : itemsPerBatch;
    groups[weekLabel] = sorted.slice(i * itemsPerBatch, i * itemsPerBatch + batchSize);
  }

  return Object.entries(groups).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
}

export default function HomePage({ examples, categories, itemListSchema }: ExamplesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [selectedExample, setSelectedExample] = useState<EnrichedExampleRecord | null>(null)

  // Sync state with URL for deep linking / back button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.exampleSlug) {
        const ex = examples.find(item => item.slug === e.state.exampleSlug);
        if (ex) setSelectedExample(ex);
      } else {
        setSelectedExample(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [examples]);

  const handleExampleClick = (example: EnrichedExampleRecord) => {
    setSelectedExample(example);
    const categorySlug = (example.category || 'uncategorized').toLowerCase().replace(/\s+/g, '-');
    const url = `/ai-examples/${categorySlug}/${example.slug}`;
    window.history.pushState({ exampleSlug: example.slug }, '', url);
  };

  const closeModal = () => {
    setSelectedExample(null);
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const filteredItems = useMemo(() => {
    return examples.filter(ex => selectedCategory === 'All' || ex.category === selectedCategory);
  }, [examples, selectedCategory]);

  const weeklyBatches = useMemo(() => groupByWeek(filteredItems), [filteredItems]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormStatus('success');
        setEmail('');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  let globalCardIndex = 0;

  return (
    <>
      <Head>
        <title>Real AI Examples — How People Actually Use AI at Work</title>
        <meta name="description" content="Curated real-world AI workflows. No magic, just better prompts and practical automation." key="description" />
        <link rel="canonical" href="https://realaiexamples.com/" />
      </Head>

      <div>
        {/* Hero */}
        <section className="text-center mb-16 md:mb-40 max-w-5xl mx-auto pt-8 md:pt-12">
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8 md:mb-12 leading-[0.85] text-white drop-shadow-md">
           A library of real AI examples <br className="hidden md:block"/>from <span className="font-instrument font-normal italic lowercase opacity-90">people who use AI.</span>
          </h1>
          
          <div className="flex flex-col items-center gap-10">
            {formStatus === 'success' ? (
              <div className="px-12 py-6 bg-white rounded-pill font-bold text-micro-fg shadow-xl">
                ✓ Check your inbox to confirm
              </div>
            ) : (
              <form className="flex w-full max-w-2xl p-1.5 md:p-2.5 bg-white/90 backdrop-blur-2xl rounded-pill border border-white/30 shadow-2xl" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="flex-1 bg-transparent px-4 md:px-8 py-3 md:py-4 outline-none text-sm md:text-[18px] font-medium text-micro-fg placeholder:text-micro-muted min-w-0"
                  placeholder="Get weekly examples"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={formStatus === 'loading'}
                />
                <button type="submit" className="px-6 md:px-12 py-3 md:py-5 bg-white text-micro-fg rounded-pill font-extrabold text-xs md:text-sm uppercase tracking-wider hover:bg-micro-layer-1 transition-all shadow-lg active:scale-95 flex-shrink-0" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? '...' : 'Join Free'}
                </button>
              </form>
            )}
            <p className="text-[13px] font-bold text-white uppercase tracking-[0.15em] opacity-80">
              Join 400+ AI Native Operators
            </p>
          </div>
        </section>

        {/* Floating Glass Sheet */}
        <div className="glass-sheet rounded-3xl md:rounded-[48px] p-4 md:p-16 lg:p-24 overflow-hidden">
          {/* Category Filter - Refined */}
          <nav className="mb-10 md:mb-24">
            <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
              <li
                className={`px-4 md:px-8 py-2 md:py-3 rounded-pill text-[11px] md:text-[12px] font-bold cursor-pointer transition-all tracking-widest border ${selectedCategory === 'All' ? 'bg-micro-fg text-white border-micro-fg shadow-lg' : 'bg-white text-micro-muted border-micro-layer-1 hover:border-micro-layer-2'}`}
                onClick={() => setSelectedCategory('All')}
              >
                ALL DROPS
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`px-4 md:px-8 py-2 md:py-3 rounded-pill text-[11px] md:text-[12px] font-bold cursor-pointer transition-all tracking-widest border ${selectedCategory === cat ? 'bg-micro-fg text-white border-micro-fg shadow-lg' : 'bg-white text-micro-muted border-micro-layer-1 hover:border-micro-layer-2'}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.toUpperCase()}
                </li>
              ))}
            </ul>
          </nav>

          {/* Weekly Drops */}
          <main className="space-y-16 md:space-y-40">
            {weeklyBatches.map(([week, items], batchIdx) => {
              if (items.length === 0) return null;
              return (
                <section key={week}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-sm font-bold tracking-widest text-micro-muted uppercase">DROP / {week.toUpperCase()}</h2>
                    {batchIdx === 0 && <span className="bg-micro-fg text-white px-2 py-0.5 rounded text-[10px] font-bold">NEW</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {items.map((example) => {
                      const rawUrl = example.screenshots?.[0]?.url;
                      const imageUrl = optimizeImageUrl(rawUrl, example.cloudinaryPublicId, 600);

                      return (
                        <article key={example.id} className="group cursor-pointer">
                          <Link 
                            href={`/ai-examples/${(example.category || 'uncategorized').toLowerCase().replace(/\s+/g, '-')}/${example.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleExampleClick(example);
                            }}
                          >
                          <div className="card-micro aspect-[4/3] relative overflow-hidden mb-4 bg-micro-layer-1">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={example.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-micro-layer-1 flex items-center justify-center font-mono text-micro-muted">
                                {'{ // ops }'}
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-start mb-1 text-[11px] font-bold text-micro-muted uppercase tracking-wider">
                            <span>{example.category || 'EXAMPLE'}</span>
                            <span></span>
                          </div>
                          <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                            {example.title}
                          </h3>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>

      <ExampleModal 
        example={selectedExample} 
        isOpen={!!selectedExample} 
        onClose={closeModal} 
      />
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
