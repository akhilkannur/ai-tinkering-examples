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
        :root {
          --bg-base: #FFFFFF;
          --text-primary: #000000;
          --text-secondary: #555555;
          --border-heavy: #000000;
          --border-light: #E0E0E0;
          --color-charcoal: #333333;
          --color-olive: #7B7662;
          --color-acid: #C5CC5C;
          --color-purple: #6A37AC;
          --color-grey: #D8D8D8;
          --color-watermark: rgba(0, 0, 0, 0.04);
          --font-display: 'Arial Black', 'Impact', system-ui, -apple-system, sans-serif;
          --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          --font-mono: 'Courier New', Courier, monospace;
          --space-xs: 0.5rem;
          --space-sm: 1rem;
          --space-md: 2rem;
          --space-lg: 4rem;
          --space-xl: 8rem;
        }

        body {
          background-color: var(--bg-base) !important;
          color: var(--text-primary) !important;
          font-family: var(--font-body) !important;
          -webkit-font-smoothing: antialiased;
          line-height: 1.2;
          overflow-x: hidden;
        }

        .watermark-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80vw;
          height: 80vw;
          max-width: 800px;
          max-height: 800px;
          z-index: 0;
          pointer-events: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .watermark-svg {
          width: 100%;
          height: 100%;
          fill: var(--color-watermark);
        }

        .drops-wrapper {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 var(--space-md);
          position: relative;
          z-index: 1;
        }

        .drops-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) 0;
          border-bottom: 2px solid var(--border-heavy);
          margin-bottom: var(--space-xl);
        }

        .drops-logo {
          font-family: var(--font-display);
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          color: var(--text-primary);
          text-decoration: none;
        }

        .drops-nav {
          display: flex;
          gap: var(--space-md);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .drops-nav a {
          color: var(--text-primary);
          text-decoration: none;
        }

        .drops-nav a:hover {
          text-decoration: underline;
        }

        .hero-section {
          text-align: center;
          margin-bottom: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-md);
          max-width: 20ch;
        }

        .newsletter-form {
          display: flex;
          width: 100%;
          max-width: 600px;
          border: 2px solid var(--border-heavy);
        }

        .newsletter-input {
          flex-grow: 1;
          border: none;
          padding: var(--space-sm) var(--space-md);
          font-family: var(--font-mono);
          font-size: 1rem;
          background: transparent;
          outline: none;
          color: var(--text-primary);
        }

        .newsletter-input::placeholder {
          color: var(--text-secondary);
        }

        .newsletter-submit {
          background: var(--text-primary);
          color: var(--bg-base);
          border: none;
          border-left: 2px solid var(--border-heavy);
          padding: 0 var(--space-md);
          font-family: var(--font-display);
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .newsletter-submit:hover {
          background: var(--bg-base);
          color: var(--text-primary);
        }

        .newsletter-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .hero-meta {
          margin-top: var(--space-sm);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .newsletter-success {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          border: 2px solid var(--border-heavy);
          padding: var(--space-sm) var(--space-md);
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        .category-nav {
          margin-bottom: var(--space-xl);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          padding: var(--space-sm) 0;
          overflow-x: auto;
          white-space: nowrap;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .category-nav::-webkit-scrollbar {
          display: none;
        }

        .category-list {
          display: inline-flex;
          gap: var(--space-md);
          padding: 0 var(--space-md);
          list-style: none;
        }

        .category-item {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .category-item:hover,
        .category-item.active {
          color: var(--text-primary);
          font-weight: bold;
        }

        .drop-container {
          margin-bottom: var(--space-xl);
        }

        .drop-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 4px solid var(--border-heavy);
          padding-bottom: var(--space-xs);
          margin-bottom: var(--space-md);
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          z-index: 10;
          padding-top: var(--space-sm);
        }

        .drop-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .drop-status {
          font-family: var(--font-mono);
          background: var(--text-primary);
          color: var(--bg-base);
          padding: 2px 8px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-lg) var(--space-md);
        }

        .card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .card-visual {
          aspect-ratio: 4/3;
          width: 100%;
          margin-bottom: var(--space-sm);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card:hover .card-visual {
          transform: translateY(-4px);
        }

        .card-visual.no-image::after {
          content: '{ // ops }';
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.3);
          mix-blend-mode: overlay;
        }

        .card-visual.color-light::after {
          color: rgba(0, 0, 0, 0.2);
        }

        .card-visual img,
        .card-visual > span {
          object-fit: cover;
          object-position: top;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .card-category {
          color: var(--text-secondary);
        }

        .card-id {
          color: var(--border-light);
        }

        .card-title {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .drops-footer {
          text-align: center;
          padding: var(--space-xl) 0 var(--space-md);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        .drops-footer a {
          color: var(--text-secondary);
          text-decoration: none;
          margin: 0 var(--space-sm);
        }

        .drops-footer a:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .drops-header {
            flex-direction: column;
            gap: var(--space-sm);
            align-items: flex-start;
          }
          .workflow-grid {
            grid-template-columns: 1fr;
          }
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-submit {
            border-left: none;
            border-top: 2px solid var(--border-heavy);
            padding: var(--space-sm);
          }
        }
      `}</style>

      {/* Watermark */}
      <div className="watermark-container">
        <svg className="watermark-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L10 90 L35 90 L50 60 L65 90 L90 90 Z" />
          <circle cx="50" cy="65" r="15" fill="none" stroke="currentColor" strokeWidth="8" />
        </svg>
      </div>

      <div className="drops-wrapper">
        {/* Header */}
        <header className="drops-header">
          <Link href="/" className="drops-logo">Real AI</Link>
          <nav className="drops-nav">
            <Link href="/tools">Tools</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="hero-section">
          <h1 className="hero-title">Real Workflows.<br />Zero Bullshit.</h1>

          {formStatus === 'success' ? (
            <div className="newsletter-success">✓ Check your inbox to confirm</div>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="ENTER EMAIL TO UNLOCK THE VAULT..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formStatus === 'loading'}
              />
              <button type="submit" className="newsletter-submit" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? '...' : 'Join'}
              </button>
            </form>
          )}

          <div className="hero-meta">
            Join 14,204+ Operators · Next Drop: Tuesday
          </div>
          {formStatus === 'error' && (
            <div className="hero-meta" style={{ color: '#c00', marginTop: '0.5rem' }}>
              Something went wrong. Try again.
            </div>
          )}
        </section>

        {/* Category Filter */}
        <nav className="category-nav">
          <ul className="category-list">
            <li
              className={`category-item ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Drops
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </nav>

        {/* Weekly Drops */}
        <main>
          {weeklyBatches.map(([week, items], batchIdx) => {
            if (items.length === 0) return null;
            return (
              <section key={week} className="drop-container">
                <header className="drop-header">
                  <h2 className="drop-title">DROP / {week.toUpperCase()}</h2>
                  {batchIdx === 0 && <span className="drop-status">NEW</span>}
                </header>

                <div className="workflow-grid">
                  {items.map((example, i) => {
                    const cardNum = globalCardIndex++;
                    const rawUrl = example.screenshots?.[0]?.url;
                    const imageUrl = optimizeImageUrl(rawUrl, example.cloudinaryPublicId, 600);
                    const colorIdx = cardNum % CARD_COLORS.length;
                    const bgColor = CARD_COLORS[colorIdx];
                    const isLightCard = bgColor === '#C5CC5C' || bgColor === '#D8D8D8';

                    return (
                      <article key={example.id} className="card" onClick={() => handleOpenModal(example)}>
                        <div
                          className={`card-visual ${!imageUrl ? 'no-image' : ''} ${isLightCard && !imageUrl ? 'color-light' : ''}`}
                          style={{ backgroundColor: bgColor }}
                        >
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={example.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              style={{ objectFit: 'cover', objectPosition: 'top' }}
                            />
                          )}
                        </div>
                        <div className="card-info">
                          <div className="card-meta">
                            <span className="card-category">{example.category || 'EXAMPLE'}</span>
                            <span className="card-id">ID-{String(cardNum + 1).padStart(3, '0')}</span>
                          </div>
                          <h3 className="card-title">{example.title}</h3>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>

        {/* Footer */}
        <footer className="drops-footer">
          <div style={{ marginBottom: '1rem' }}>
            <Link href="/about">About</Link>
            <a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer">Twitter</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          Real AI Examples © 2026
        </footer>
      </div>

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
