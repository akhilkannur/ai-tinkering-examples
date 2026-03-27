import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter } from 'lucide-react';

const CARD_COLORS = ['#333333', '#6A37AC', '#D8D8D8', '#C5CC5C', '#7B7662'];

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => selectedCategory === 'All' || tool.category === selectedCategory);
  }, [selectedCategory]);

  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

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
      if (res.ok) { setFormStatus('success'); setEmail(''); }
      else { setFormStatus('error'); }
    } catch { setFormStatus('error'); }
  };

  return (
    <>
      <Head>
        <title>AI Tools Directory | Real AI Examples</title>
        <meta name="description" content="A curated database of the latest AI tools for business and productivity." key="description" />
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

        .tools-watermark {
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

        .tools-watermark svg {
          width: 100%;
          height: 100%;
          fill: var(--color-watermark);
        }

        .tools-wrapper {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 var(--space-md);
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .tools-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) 0;
          border-bottom: 2px solid var(--border-heavy);
          margin-bottom: var(--space-xl);
        }

        .tools-logo {
          font-family: var(--font-display);
          font-size: 2rem;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          color: var(--text-primary);
          text-decoration: none;
        }

        .tools-nav {
          display: flex;
          gap: var(--space-md);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .tools-nav a {
          color: var(--text-primary);
          text-decoration: none;
        }

        .tools-nav a:hover {
          text-decoration: underline;
        }

        .tools-nav a.active {
          font-weight: bold;
        }

        .tools-hero {
          text-align: center;
          margin-bottom: var(--space-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tools-hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          text-transform: uppercase;
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-md);
          max-width: 15ch;
        }

        .tools-newsletter {
          display: flex;
          width: 100%;
          max-width: 600px;
          border: 2px solid var(--border-heavy);
        }

        .tools-newsletter input {
          flex-grow: 1;
          border: none;
          padding: var(--space-sm) var(--space-md);
          font-family: var(--font-mono);
          font-size: 1rem;
          background: transparent;
          outline: none;
          color: var(--text-primary);
        }

        .tools-newsletter input::placeholder {
          color: var(--text-secondary);
        }

        .tools-newsletter button {
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

        .tools-newsletter button:hover {
          background: var(--bg-base);
          color: var(--text-primary);
        }

        .tools-newsletter button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tools-hero-meta {
          margin-top: var(--space-sm);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .tools-newsletter-success {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          border: 2px solid var(--border-heavy);
          padding: var(--space-sm) var(--space-md);
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        .tools-cat-nav {
          margin-bottom: var(--space-xl);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          padding: var(--space-sm) 0;
          overflow-x: auto;
          white-space: nowrap;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .tools-cat-nav::-webkit-scrollbar {
          display: none;
        }

        .tools-cat-list {
          display: inline-flex;
          gap: var(--space-md);
          padding: 0 var(--space-md);
          list-style: none;
        }

        .tools-cat-item {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .tools-cat-item:hover,
        .tools-cat-item.active {
          color: var(--text-primary);
          font-weight: bold;
        }

        .tools-section-header {
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

        .tools-section-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .tools-section-badge {
          font-family: var(--font-mono);
          background: var(--text-primary);
          color: var(--bg-base);
          padding: 2px 8px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--space-lg) var(--space-md);
        }

        .tool-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .tool-card-visual {
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

        .tool-card:hover .tool-card-visual {
          transform: translateY(-4px);
        }

        .tool-card-visual::after {
          content: '{ // tool }';
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.3);
          mix-blend-mode: overlay;
        }

        .tool-card-visual.color-light::after {
          color: rgba(0, 0, 0, 0.2);
        }

        .tool-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .tool-card-category {
          color: var(--text-secondary);
        }

        .tool-card-id {
          color: var(--border-light);
        }

        .tool-card-title {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.2;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .tool-card-desc {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tool-card-price {
          align-self: flex-start;
          border: 2px solid var(--border-heavy);
          padding: 4px 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          background: var(--bg-base);
          color: var(--text-primary);
        }

        .tools-empty {
          text-align: center;
          padding: var(--space-xl) 0;
          font-family: var(--font-mono);
          text-transform: uppercase;
        }

        .tools-empty h3 {
          font-family: var(--font-display);
          font-size: 2rem;
          margin-bottom: var(--space-sm);
        }

        .tools-empty p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: var(--space-md);
        }

        .tools-empty button {
          background: var(--text-primary);
          color: var(--bg-base);
          border: 2px solid var(--border-heavy);
          padding: var(--space-xs) var(--space-md);
          font-family: var(--font-display);
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .tools-empty button:hover {
          background: var(--bg-base);
          color: var(--text-primary);
        }

        .tools-footer {
          padding: var(--space-xl) 0 var(--space-md);
          border-top: 2px solid var(--border-heavy);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: auto;
        }

        .tools-footer a {
          color: var(--text-secondary);
          text-decoration: none;
        }

        .tools-footer a:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }

        .tools-footer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }

        .tools-footer-grid ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tools-footer-heading {
          font-family: var(--font-display);
          font-size: 0.75rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-sm);
        }

        .tools-footer-bottom {
          padding-top: var(--space-sm);
          border-top: 1px solid var(--border-light);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
        }

        @media (max-width: 640px) {
          .tools-header {
            flex-direction: column;
            gap: var(--space-sm);
            align-items: flex-start;
          }
          .tools-grid {
            grid-template-columns: 1fr;
          }
          .tools-newsletter {
            flex-direction: column;
          }
          .tools-newsletter button {
            border-left: none;
            border-top: 2px solid var(--border-heavy);
            padding: var(--space-sm);
          }
          .tools-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-md);
          }
        }
      `}</style>

      {/* Watermark */}
      <div className="tools-watermark">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L10 90 L35 90 L50 60 L65 90 L90 90 Z" />
          <circle cx="50" cy="65" r="15" fill="none" stroke="currentColor" strokeWidth="8" />
        </svg>
      </div>

      <div className="tools-wrapper">
        {/* Header */}
        <header className="tools-header">
          <Link href="/" className="tools-logo">realaiexamples</Link>
          <nav className="tools-nav">
            <Link href="/">Archive</Link>
            <Link href="/tools" className="active">Tools</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="tools-hero">
          <h1 className="tools-hero-title">AI Tools.<br />Curated.</h1>

          {formStatus === 'success' ? (
            <div className="tools-newsletter-success">✓ Check your inbox to confirm</div>
          ) : (
            <form className="tools-newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="ENTER EMAIL TO UNLOCK THE VAULT..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formStatus === 'loading'}
              />
              <button type="submit" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? '...' : 'Join'}
              </button>
            </form>
          )}

          <div className="tools-hero-meta">
            Join 14,204+ Operators
            {' · '}
            <a
              href="https://forms.gle/KqN82GGdCohshtVx8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              Pitch your tool
            </a>
          </div>
          {formStatus === 'error' && (
            <div className="tools-hero-meta" style={{ color: '#c00', marginTop: '0.5rem' }}>
              Something went wrong. Try again.
            </div>
          )}
        </section>

        {/* Category Filter */}
        <nav className="tools-cat-nav">
          <ul className="tools-cat-list">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`tools-cat-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? 'All Tools' : cat}
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {filteredTools.length === 0 ? (
            <div className="tools-empty">
              <h3>No Tools Found</h3>
              <p>Try a different category.</p>
              <button onClick={() => setSelectedCategory('All')}>Clear Filters</button>
            </div>
          ) : (
            <section style={{ marginBottom: 'var(--space-xl)' }}>
              <header className="tools-section-header">
                <h2 className="tools-section-title">
                  {selectedCategory === 'All'
                    ? 'THE STACK'
                    : selectedCategory.toUpperCase()}
                  {' / '}
                  {filteredTools.length} TOOLS
                </h2>
                <span className="tools-section-badge">UPDATED</span>
              </header>

              <div className="tools-grid">
                {filteredTools.map((tool, i) => {
                  const bgColor = CARD_COLORS[i % CARD_COLORS.length];
                  const isLight = bgColor === '#C5CC5C' || bgColor === '#D8D8D8';

                  return (
                    <article
                      key={tool.name + i}
                      className="tool-card"
                      onClick={() => setSelectedTool(tool)}
                    >
                      <div
                        className={`tool-card-visual ${isLight ? 'color-light' : ''}`}
                        style={{ backgroundColor: bgColor }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div className="tool-card-meta">
                          <span className="tool-card-category">{tool.category}</span>
                          <span className="tool-card-id">T-{String(i + 1).padStart(3, '0')}</span>
                        </div>
                        <h3 className="tool-card-title">{tool.name}</h3>
                        <p className="tool-card-desc">{tool.description}</p>
                        {tool.tags.price && (
                          <span className="tool-card-price">{tool.tags.price}</span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="tools-footer">
          <div className="tools-footer-grid">
            <div>
              <h4 className="tools-footer-heading">Site</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/">Examples</Link></li>
                <li><Link href="/tools">Tool Directory</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="tools-footer-heading">Connect</h4>
              <ul>
                <li><Link href="/#newsletter">Newsletter</Link></li>
                <li><a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://salestools.club/" target="_blank" rel="noopener noreferrer">Salestools Club</a></li>
              </ul>
            </div>
            <div>
              <h4 className="tools-footer-heading">Legal</h4>
              <ul>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="tools-footer-bottom">
            © {new Date().getFullYear()} Real AI Examples. Curated for business professionals.
          </div>
        </footer>
      </div>

      {selectedTool && (
        <ToolDetailModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </>
  );
}
