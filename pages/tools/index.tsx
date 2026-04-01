import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, ChevronDown, ArrowRight, ShoppingBag, Search, Command, X } from 'lucide-react';

const CARD_COLORS = ['#F5F5F5', '#EFEFEF', '#FAFAFA', '#F0F0F0', '#FFFFFF'];

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  
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

  const featuredTools = aiTools.slice(0, 3);

  return (
    <>
      <Head>
        <title>The Stack | Real AI Examples</title>
        <meta name="description" content="A technical repository of AI tools for operators." key="description" />
      </Head>

      <style jsx global>{`
        :root {
          --bg-base: #FFFFFF;
          --text-primary: #000000;
          --text-secondary: #777777;
          --border-thin: 1px solid #000000;
          --border-medium: 2px solid #000000;
          --color-neon: #ccff00;
          --font-display: 'Arial Black', 'Impact', sans-serif;
          --font-mono: 'JetBrains Mono', 'Courier New', monospace;
          --font-body: 'Newsreader', 'Georgia', serif;
          --space-sm: 1rem;
          --space-md: 2rem;
          --space-lg: 4rem;
        }

        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap');

        body {
          background-color: var(--bg-base) !important;
          color: var(--text-primary) !important;
          font-family: var(--font-body) !important;
          letter-spacing: -0.01em;
          -webkit-font-smoothing: antialiased;
        }

        .stack-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 var(--space-md) var(--space-lg);
        }

        /* --- Header --- */
        .stack-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          border-bottom: var(--border-thin);
          margin-bottom: 2rem;
        }

        .stack-logo {
          font-family: var(--font-display);
          font-size: 1.25rem;
          text-transform: uppercase;
          text-decoration: none;
          color: black;
          letter-spacing: -0.05em;
        }

        .stack-nav {
          display: flex;
          gap: 2rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 800;
        }

        .stack-nav a {
          text-decoration: none;
          color: black;
        }

        .stack-nav a.active {
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
        }

        /* --- Bento Hero --- */
        .bento-hero {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 400px;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .bento-main {
          border: var(--border-thin);
          display: flex;
          background: #000;
          color: #FFF;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }

        .bento-main-info {
          flex: 1;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
        }

        .bento-main-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111;
        }

        .bento-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .bento-label::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--color-neon);
          border-radius: 50%;
        }

        .bento-title {
          font-family: var(--font-display);
          font-size: 4rem;
          text-transform: uppercase;
          line-height: 0.9;
          margin-bottom: 1.5rem;
        }

        .bento-desc {
          font-size: 1.1rem;
          max-width: 30ch;
          opacity: 0.8;
        }

        .bento-side {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .bento-small {
          flex: 1;
          border: var(--border-thin);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
          cursor: pointer;
          transition: background 0.2s;
        }

        .bento-small:hover { background: #f9f9f9; }

        .bento-small h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        /* --- Floating Filter Bar --- */
        .filter-dock {
          position: sticky;
          top: 1rem;
          z-index: 100;
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .filter-bar {
          background: black;
          color: white;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 4px;
          border: var(--border-thin);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .filter-select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 1rem;
          border-right: 1px solid #333;
        }

        .filter-select-wrapper:last-child { border-right: none; }

        .filter-select-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
          color: #666;
        }

        .filter-select {
          background: none;
          border: none;
          color: white;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 800;
          outline: none;
          cursor: pointer;
          padding: 4px 0;
        }

        /* --- Tool Grid --- */
        .tool-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1px;
          background: #000;
          border: var(--border-thin);
        }

        .tool-item {
          background: white;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: background 0.1s;
        }

        .tool-item:hover { background: #fafafa; }

        .tool-visual {
          height: 100px;
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .tool-visual img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.8;
        }

        .tool-item:hover .tool-visual img { filter: none; opacity: 1; }

        .tool-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .tool-desc {
          font-size: 1rem;
          color: #444;
          margin-bottom: 2.5rem;
          flex-grow: 1;
          line-height: 1.4;
        }

        /* Technical Manifest Table */
        .tool-manifest {
          border-top: var(--border-thin);
          padding-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .manifest-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .manifest-key {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          text-transform: uppercase;
          color: #888;
        }

        .manifest-val {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          font-weight: 800;
        }

        /* --- Footer --- */
        .stack-footer {
          margin-top: 8rem;
          padding-top: 4rem;
          border-top: var(--border-thin);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .footer-left h4 {
          font-family: var(--font-display);
          font-size: 2rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .footer-right {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          display: flex;
          gap: 4rem;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-list a {
          text-decoration: none;
          color: #666;
        }

        .footer-list a:hover {
          color: black;
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .bento-hero { grid-template-columns: 1fr; grid-template-rows: auto; }
          .bento-main { flex-direction: column; height: auto; }
          .bento-main-visual { height: 250px; border-top: var(--border-thin); }
          .bento-main-info { padding: 2rem; }
        }

        @media (max-width: 640px) {
          .stack-container {
            padding: 0 1rem 2rem;
          }
          .stack-header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
            padding: 1rem 0;
            margin-bottom: 1rem;
          }
          .stack-logo {
            font-size: 1rem;
          }
          .stack-nav {
            gap: 1rem;
            font-size: 0.65rem;
          }
          .bento-hero {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }
          .bento-main {
            flex-direction: column;
            height: auto;
          }
          .bento-main-info {
            padding: 1.25rem;
          }
          .bento-main-visual {
            height: 120px;
            border-top: var(--border-thin);
          }
          .bento-title {
            font-size: 2rem;
            margin-bottom: 0.75rem;
          }
          .bento-desc {
            font-size: 0.9rem;
          }
          .bento-small {
            padding: 1.25rem;
          }
          .bento-small h3 {
            font-size: 1rem;
          }
          .filter-dock {
            margin-bottom: 1.5rem;
          }
          .filter-bar {
            flex-wrap: wrap;
            width: 100%;
          }
          .filter-select-wrapper {
            border-right: none;
            border-bottom: 1px solid #333;
            padding: 0.5rem 0.75rem;
            flex: 1;
            min-width: 45%;
          }
          .filter-select-wrapper:last-child {
            border-bottom: none;
          }
          .tool-grid {
            grid-template-columns: 1fr;
          }
          .tool-item {
            padding: 1.25rem;
          }
          .tool-visual {
            height: 60px;
            margin-bottom: 1rem;
          }
          .tool-name {
            font-size: 1.1rem;
          }
          .tool-desc {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
          }
          .tool-manifest {
            padding-top: 1rem;
            gap: 1rem;
          }
          .stack-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
            margin-top: 3rem;
            padding-top: 2rem;
          }
          .footer-left h4 {
            font-size: 1.25rem;
          }
          .footer-right {
            gap: 2rem;
          }
        }
      `}</style>

      <div className="stack-container">
        {/* Header */}
        <header className="stack-header">
          <Link href="/" className="stack-logo">realaiexamples</Link>
          <nav className="stack-nav">
            <Link href="/">Archive</Link>
            <Link href="/tools" className="active">The Stack</Link>
            <Link href="/blog">Editorial</Link>
            <Link href="/about">Info</Link>
          </nav>
        </header>

        {/* Bento Hero */}
        <section className="bento-hero">
          <div className="bento-main" onClick={() => setSelectedTool(featuredTools[0])}>
            <div className="bento-main-info">
              <span className="bento-label">Featured</span>
              <h1 className="bento-title">{featuredTools[0].name}</h1>
              <p className="bento-desc">{featuredTools[0].description}</p>
            </div>
            <div className="bento-main-visual">
              <img src={featuredTools[0].image} alt={featuredTools[0].name} style={{ width: '100px', filter: 'invert(1)' }} />
            </div>
          </div>
          <div className="bento-side">
            <div className="bento-small" onClick={() => setSelectedTool(featuredTools[1])}>
              <span className="bento-label">Popular</span>
              <h3>{featuredTools[1].name}</h3>
              <p className="manifest-val" style={{ color: '#666' }}>{featuredTools[1].category}</p>
            </div>
            <div className="bento-small" onClick={() => setSelectedTool(featuredTools[2])}>
              <span className="bento-label">Trending</span>
              <h3>{featuredTools[2].name}</h3>
              <p className="manifest-val" style={{ color: '#666' }}>{featuredTools[2].tags.price}</p>
            </div>
          </div>
        </section>

        {/* Floating Filter Bar */}
        <div className="filter-dock">
          <div className="filter-bar">
            <div className="filter-select-wrapper">
              <span className="filter-select-label">Category</span>
              <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="filter-select-wrapper">
              <span className="filter-select-label">Price</span>
              <select className="filter-select" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                {prices.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="filter-select-wrapper">
              <span className="filter-select-label">Skill</span>
              <select className="filter-select" value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                {skills.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {(selectedCategory !== 'All' || selectedPrice !== 'All' || selectedSkill !== 'All') && (
              <button 
                onClick={() => { setSelectedCategory('All'); setSelectedPrice('All'); setSelectedSkill('All'); }}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0 8px' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Technical Grid */}
        <main>
          {filteredTools.length === 0 ? (
            <div style={{ padding: '8rem 0', textAlign: 'center', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: '#888' }}>
              <p>No tools found for this filter</p>
            </div>
          ) : (
            <div className="tool-grid">
              {filteredTools.map((tool, i) => (
                <article key={tool.name + i} className="tool-item" onClick={() => setSelectedTool(tool)}>
                  <div className="tool-visual">
                    <img src={tool.image} alt={tool.name} />
                  </div>
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-desc">{tool.description}</p>
                  
                  <div className="tool-manifest">
                    <div className="manifest-row">
                      <span className="manifest-key">Category</span>
                      <span className="manifest-val">{tool.category}</span>
                    </div>
                    <div className="manifest-row">
                      <span className="manifest-key">Price</span>
                      <span className="manifest-val">{tool.tags.price}</span>
                    </div>
                    <div className="manifest-row">
                      <span className="manifest-key">Skill Level</span>
                      <span className="manifest-val">{tool.tags.skill}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="stack-footer">
          <div className="footer-left">
            <h4>The Stack.</h4>
            <p className="manifest-val" style={{ color: '#888', marginTop: '0.5rem' }}>
              {aiTools.length} tools and counting
            </p>
          </div>
          <div className="footer-right">
            <div>
              <p className="manifest-key" style={{ marginBottom: '1rem' }}>Directories</p>
              <ul className="footer-list">
                <li><Link href="/tools">Full Inventory</Link></li>
                <li><a href="https://forms.gle/KqN82GGdCohshtVx8">Submit Tool</a></li>
              </ul>
            </div>
            <div>
              <p className="manifest-key" style={{ marginBottom: '1rem' }}>Repository</p>
              <ul className="footer-list">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Editorial</Link></li>
              </ul>
            </div>
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
