import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next/types'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import ExampleModal from '../components/ExampleModal'
import { localSocialExamples } from '../lib/social-examples-data'
import { generateItemListSchema } from '../lib/seo-utils'
import { optimizeImageUrl } from '../utils/cloudinary'

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
  const [email, setEmail] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

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

      <style jsx global>{`
        body {
          @apply bg-white text-micro-fg antialiased font-sans;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Hero */}
        <section className="text-center mb-24 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[0.95]">
            A library of real AI examples from people who use AI.
          </h1>
          
          <div className="flex flex-col items-center gap-6">
            {formStatus === 'success' ? (
              <div className="px-8 py-4 bg-micro-layer-1 rounded-pill font-bold text-micro-fg">
                ✓ Check your inbox to confirm
              </div>
            ) : (
              <form className="flex w-full max-w-lg p-1.5 bg-micro-layer-1 rounded-pill" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="flex-1 bg-transparent px-6 py-2 outline-none text-[15px] font-medium"
                  placeholder="Get weekly examples"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={formStatus === 'loading'}
                />
                <button type="submit" className="button-micro px-8 py-3" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? '...' : 'Join'}
                </button>
              </form>
            )}
            <p className="text-[13px] font-bold text-micro-muted uppercase tracking-widest">
              Join 300+ AI Tinkers · Next Drop: Tuesday
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <nav className="mb-16 border-b border-micro-layer-1">
          <ul className="flex gap-8 overflow-x-auto pb-4 no-scrollbar">
            <li
              className={`text-[13px] font-bold cursor-pointer transition-colors whitespace-nowrap ${selectedCategory === 'All' ? 'text-micro-fg border-b-2 border-micro-fg pb-4 -mb-4' : 'text-micro-muted hover:text-micro-fg'}`}
              onClick={() => setSelectedCategory('All')}
            >
              ALL DROPS
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                className={`text-[13px] font-bold cursor-pointer transition-colors whitespace-nowrap ${selectedCategory === cat ? 'text-micro-fg border-b-2 border-micro-fg pb-4 -mb-4' : 'text-micro-muted hover:text-micro-fg'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.toUpperCase()}
              </li>
            ))}
          </ul>
        </nav>

        {/* Weekly Drops */}
        <main className="space-y-24">
          {weeklyBatches.map(([week, items], batchIdx) => {
            if (items.length === 0) return null;
            return (
              <section key={week}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-sm font-bold tracking-widest text-micro-muted">DROP / {week.toUpperCase()}</h2>
                  {batchIdx === 0 && <span className="bg-micro-fg text-white px-2 py-0.5 rounded text-[10px] font-bold">NEW</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((example, i) => {
                    const cardNum = globalCardIndex++;
                    const rawUrl = example.screenshots?.[0]?.url;
                    const imageUrl = optimizeImageUrl(rawUrl, example.cloudinaryPublicId, 600);

                    return (
                      <article key={example.id} className="group cursor-pointer" onClick={() => handleOpenModal(example)}>
                        <div className="card-micro aspect-[4/3] relative overflow-hidden mb-4">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={example.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-micro-layer-1 flex items-center justify-center font-mono text-micro-muted">
                              {'{ // ops }'}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-start mb-1 text-[11px] font-bold text-micro-muted uppercase tracking-wider">
                          <span>{example.category || 'EXAMPLE'}</span>
                          <span>{example.publish_date ? new Date(example.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                          {example.title}
                        </h3>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>
      </div>

        {/* Footer */}
        <footer className="mt-24 pt-16 border-t border-micro-layer-1 text-micro-fg font-sans">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                  <div className="w-5 h-5 bg-micro-fg rounded flex items-center justify-center transition-transform group-hover:scale-105"></div>
                  <span className="text-lg font-bold tracking-tight text-micro-fg">Real AI</span>
              </Link>
              <p className="text-sm font-bold text-micro-muted max-w-xs leading-relaxed uppercase tracking-wider">
                Real-world AI workflows and practical automations for business professionals.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-micro-fg uppercase tracking-[0.1em] mb-6">Site</h4>
              <ul className="space-y-3 text-[13px] font-bold text-micro-muted">
                <li><Link href="/about" className="hover:text-micro-fg transition-colors uppercase">About</Link></li>
                <li><Link href="/" className="hover:text-micro-fg transition-colors uppercase">Examples</Link></li>
                <li><Link href="/tools" className="hover:text-micro-fg transition-colors uppercase">Tools</Link></li>
                <li><Link href="/blog" className="hover:text-micro-fg transition-colors uppercase">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-micro-fg uppercase tracking-[0.1em] mb-6">Connect</h4>
              <ul className="space-y-3 text-[13px] font-bold text-micro-muted">
                <li><Link href="/#newsletter" className="hover:text-micro-fg transition-colors uppercase">Newsletter</Link></li>
                <li><a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer" className="hover:text-micro-fg transition-colors uppercase">Twitter</a></li>
                <li><a href="https://salestools.club/" target="_blank" rel="noopener noreferrer" className="hover:text-micro-fg transition-colors uppercase">Salestools Club</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-micro-fg uppercase tracking-[0.1em] mb-6">Legal</h4>
              <ul className="space-y-3 text-[13px] font-bold text-micro-muted">
                <li><Link href="/privacy" className="hover:text-micro-fg transition-colors uppercase">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-micro-fg transition-colors uppercase">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-micro-layer-1 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-micro-muted text-[11px] font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Real AI Examples.
            </p>
          </div>
        </footer>

      <ExampleModal
        example={modalExample as any}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
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
