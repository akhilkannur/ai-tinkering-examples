import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, ChevronDown, ArrowRight, ShoppingBag, Search, Command } from 'lucide-react';

const CARD_COLORS = ['#D8D8D8', '#6A37AC', '#C5CC5C', '#7B7662', '#333333'];

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];
  const prices = ['All', ...Array.from(new Set(aiTools.map(t => t.tags.price)))];
  const skills = ['All', ...Array.from(new Set(aiTools.map(t => t.tags.skill)))];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchCat = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchPrice = selectedPrice === 'All' || tool.tags.price === selectedPrice;
      const matchSkill = selectedSkill === 'All' || tool.tags.skill === selectedSkill;
      return matchCat && matchPrice && matchSkill;
    });
  }, [selectedCategory, selectedPrice, selectedSkill]);

  const featuredTool = aiTools[0]; // Highlight the first tool as the "Drop"

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
        <title>The Stack | Real AI Examples</title>
        <meta name="description" content="A curated drop of AI tools for business professionals." key="description" />
      </Head>

      <style jsx global>{`
        :root {
          --bg-base: #FFFFFF;
          --text-primary: #000000;
          --text-secondary: #666666;
          --border-heavy: #000000;
          --border-light: #E0E0E0;
          --color-neon: #ccff00;
          --color-pink: #ff00ff;
          --font-display: 'Arial Black', 'Impact', system-ui, -apple-system, sans-serif;
          --font-mono: 'Courier New', Courier, monospace;
          --font-body: 'Newsreader', 'Georgia', serif;
          --space-sm: 1rem;
          --space-md: 2rem;
          --space-lg: 4rem;
        }

        body {
          background-color: var(--bg-base) !important;
          color: var(--text-primary) !important;
          font-family: var(--font-body) !important;
          overflow-x: hidden;
        }

        .store-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }

        /* --- Global Header --- */
        .store-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md) 0;
          border-bottom: 4px solid var(--border-heavy);
          position: sticky;
          top: 0;
          background: white;
          z-index: 100;
        }

        .store-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          text-transform: uppercase;
          text-decoration: none;
          color: black;
          letter-spacing: -0.05em;
        }

        .store-nav-links {
          display: flex;
          gap: var(--space-md);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 900;
        }

        .store-nav-links a.active {
          background: var(--color-neon);
          border: 2px solid black;
          padding: 2px 6px;
          box-shadow: 3px 3px 0 black;
        }

        /* --- Featured Drop (Hero) --- */
        .featured-drop {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          border: 4px solid black;
          margin-top: var(--space-md);
          min-height: 500px;
          box-shadow: 12px 12px 0 black;
          background: white;
        }

        .drop-visual {
          background: #6A37AC;
          border-right: 4px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .drop-tag {
          position: absolute;
          top: 30px;
          left: -40px;
          background: var(--color-neon);
          color: black;
          font-family: var(--font-display);
          padding: 8px 60px;
          transform: rotate(-45deg);
          border: 2px solid black;
          font-size: 0.7rem;
        }

        .drop-info {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .drop-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: var(--space-sm);
        }

        .drop-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 0.85;
          text-transform: uppercase;
          margin-bottom: var(--space-md);
        }

        .drop-desc {
          font-size: 1.25rem;
          margin-bottom: var(--space-lg);
          max-width: 35ch;
          color: #333;
        }

        .drop-cta {
          align-self: flex-start;
          background: black;
          color: white;
          padding: 16px 32px;
          font-family: var(--font-display);
          text-transform: uppercase;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 2px solid black;
          box-shadow: 6px 6px 0 var(--color-neon);
          transition: transform 0.1s;
        }

        .drop-cta:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--color-neon);
        }

        /* --- Store Layout --- */
        .store-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: var(--space-lg);
          margin-top: var(--space-lg);
          margin-bottom: var(--space-lg);
        }

        /* --- Sidebar --- */
        .store-sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .filter-group {
          margin-bottom: var(--space-md);
        }

        .filter-header {
          font-family: var(--font-display);
          font-size: 0.8rem;
          text-transform: uppercase;
          border-bottom: 2px solid black;
          padding-bottom: 4px;
          margin-bottom: var(--space-sm);
        }

        .filter-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .filter-btn {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          padding: 2px 0;
          font-weight: 700;
        }

        .filter-btn:hover { color: black; }
        .filter-btn.active { 
          color: black; 
          text-decoration: underline; 
          text-decoration-thickness: 2px;
          text-underline-offset: 4px;
        }

        /* --- Tool Grid --- */
        .store-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 4px solid black;
          padding-bottom: 8px;
          margin-bottom: var(--space-md);
        }

        .toolbar-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .tool-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-md);
        }

        .tool-tile {
          display: flex;
          flex-direction: column;
          border: 4px solid black;
          background: white;
          cursor: pointer;
          transition: transform 0.2s;
          position: relative;
        }

        .tool-tile:hover {
          transform: translate(-4px, -4px);
          box-shadow: 8px 8px 0 black;
        }

        .tile-visual {
          aspect-ratio: 1/1;
          border-bottom: 4px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .tile-visual img {
          width: 40%;
          height: 40%;
          object-fit: contain;
        }

        .tile-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: black;
          color: white;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          padding: 2px 6px;
          text-transform: uppercase;
          font-weight: 900;
        }

        .tile-info {
          padding: var(--space-sm);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tile-meta {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #666;
          display: flex;
          justify-content: space-between;
        }

        .tile-name {
          font-family: var(--font-display);
          font-size: 1.1rem;
          text-transform: uppercase;
          line-height: 1;
        }

        .tile-price {
          margin-top: 8px;
          background: var(--color-neon);
          align-self: flex-start;
          padding: 2px 8px;
          border: 2px solid black;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        /* --- Footer --- */
        .store-footer {
          border-top: 4px solid black;
          padding: var(--space-lg) 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .footer-header {
          font-family: var(--font-display);
          font-size: 0.75rem;
          margin-bottom: 12px;
        }

        .footer-list { list-style: none; padding: 0; }
        .footer-list li { margin-bottom: 6px; }
        .footer-list a { color: #666; text-decoration: none; }
        .footer-list a:hover { color: black; text-decoration: underline; }

        @media (max-width: 1024px) {
          .featured-drop { grid-template-columns: 1fr; }
          .drop-visual { border-right: none; border-bottom: 4px solid black; height: 300px; }
          .store-layout { grid-template-columns: 1fr; }
          .store-sidebar { display: none; }
        }
      `}</style>

      <div className="store-container">
        {/* Header */}
        <header className="store-nav-header">
          <Link href="/" className="store-logo">realaiexamples</Link>
          <nav className="store-nav-links">
            <Link href="/">Archive</Link>
            <Link href="/tools" className="active">The Stack</Link>
            <Link href="/blog">Editorial</Link>
            <Link href="/about">Info</Link>
          </nav>
        </header>

        {/* Featured Drop */}
        <section className="featured-drop">
          <div className="drop-visual">
            <span className="drop-tag">NEW DROP</span>
            <img src={featuredTool.image} alt={featuredTool.name} />
          </div>
          <div className="drop-info">
            <span className="drop-label">Staff Pick / {featuredTool.category}</span>
            <h1 className="drop-title">{featuredTool.name}</h1>
            <p className="drop-desc">{featuredTool.description}</p>
            <button className="drop-cta" onClick={() => setSelectedTool(featuredTool)}>
              Get Tool <ShoppingBag size={20} />
            </button>
          </div>
        </section>

        {/* Store Body */}
        <div className="store-layout">
          {/* Sidebar */}
          <aside className="store-sidebar">
            <div className="filter-group">
              <h3 className="filter-header">Category</h3>
              <div className="filter-list">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-header">Price</h3>
              <div className="filter-list">
                {prices.map(p => (
                  <button 
                    key={p} 
                    className={`filter-btn ${selectedPrice === p ? 'active' : ''}`}
                    onClick={() => setSelectedPrice(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-header">Expertise</h3>
              <div className="filter-list">
                {skills.map(s => (
                  <button 
                    key={s} 
                    className={`filter-btn ${selectedSkill === s ? 'active' : ''}`}
                    onClick={() => setSelectedSkill(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main>
            <header className="store-toolbar">
              <div className="toolbar-label">{filteredTools.length} Total Items</div>
              <div className="toolbar-label">Sort: Newest Arrival</div>
            </header>

            {filteredTools.length === 0 ? (
              <div style={{ padding: 'var(--space-lg) 0', textAlign: 'center' }}>
                <h3 className="drop-title" style={{ fontSize: '2rem' }}>Out of Stock</h3>
                <p className="filter-btn" style={{ cursor: 'default' }}>No tools match these filters.</p>
                <button 
                  className="drop-cta" 
                  style={{ marginTop: '20px', alignSelf: 'center' }}
                  onClick={() => { setSelectedCategory('All'); setSelectedPrice('All'); setSelectedSkill('All'); }}
                >
                  Clear All
                </button>
              </div>
            ) : (
              <div className="tool-grid">
                {filteredTools.map((tool, i) => (
                  <article 
                    key={tool.name + i} 
                    className="tool-tile"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <div className="tile-visual" style={{ backgroundColor: CARD_COLORS[i % CARD_COLORS.length] }}>
                      <img src={tool.image} alt={tool.name} />
                      {i < 3 && <span className="tile-badge">TRENDING</span>}
                    </div>
                    <div className="tile-info">
                      <div className="tile-meta">
                        <span>{tool.category}</span>
                        <span>{tool.tags.skill}</span>
                      </div>
                      <h3 className="tile-name">{tool.name}</h3>
                      <div className="tile-price">{tool.tags.price}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Newsletter Store Footer */}
        <section style={{ 
          background: 'var(--color-neon)', 
          border: '4px solid black', 
          padding: 'var(--space-lg)', 
          textAlign: 'center',
          boxShadow: '12px 12px 0 black',
          marginBottom: 'var(--space-lg)'
        }}>
          <h2 className="drop-title" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Join the Drop</h2>
          <p className="filter-btn" style={{ cursor: 'default', color: 'black', marginBottom: '20px' }}>
            Get notified of new AI tools every Tuesday.
          </p>
          <form 
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', border: '4px solid black', background: 'white' }}
          >
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS..." 
              style={{ flex: 1, border: 'none', padding: '12px', outline: 'none', fontFamily: 'var(--font-mono)' }} 
            />
            <button 
              type="submit" 
              style={{ background: 'black', color: 'white', border: 'none', padding: '0 24px', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}
            >
              Join
            </button>
          </form>
        </section>

        {/* Global Footer */}
        <footer className="store-footer">
          <div>
            <h4 className="footer-header">Shop</h4>
            <ul className="footer-list">
              <li><Link href="/tools">The Stack</Link></li>
              <li><Link href="/">Blueprints</Link></li>
              <li><a href="https://forms.gle/KqN82GGdCohshtVx8">Submit Tool</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-header">Editorial</h4>
            <ul className="footer-list">
              <li><Link href="/blog">Latest</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-header">Support</h4>
            <ul className="footer-list">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-header">Connect</h4>
            <ul className="footer-list">
              <li><a href="https://twitter.com/realaiexamples">Twitter / X</a></li>
              <li><a href="https://salestools.club">Salestools Club</a></li>
            </ul>
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
