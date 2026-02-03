import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, Sparkles, Command, Plus } from 'lucide-react';

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      return selectedCategory === 'All' || tool.category === selectedCategory;
    });
  }, [selectedCategory]);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 fade-in">
      <Head>
        <title>AI Tools Directory | Curated List | Real AI Examples</title>
        <meta name="description" content="A curated database of the latest AI tools for business and productivity. Hand-picked for Sales, Marketing, and Ops tinkerers." key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="AI Tools Directory | Curated List" key="og:title" />
        <meta property="og:description" content="A curated database of the latest AI tools for business and productivity. Hand-picked for Sales, Marketing, and Ops tinkerers." key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="AI Tools Directory | Curated List" key="twitter:title" />
        <meta name="twitter:description" content="A curated database of the latest AI tools for business and productivity. Hand-picked for Sales, Marketing, and Ops tinkerers." key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-16 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto relative">
          
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm text-accent px-4 py-1.5 rounded-sm text-xs font-mono font-bold mb-6 uppercase tracking-wider">
            <Command className="w-3 h-3" />
            <span>The Inbox</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-slate-900 mb-6 tracking-tight leading-tight uppercase">
            What the Community is <span className="text-accent">Building</span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto mb-8">
            People send us their AI tools every day. We delete the spam and list the ones that look real.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-slate-500 font-sans">
              Building something? <a href="https://forms.gle/KqN82GGdCohshtVx8" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold">Pitch it here.</a>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12 sticky top-24 z-30 bg-slate-50/95 backdrop-blur-sm py-4 border-b border-slate-200">
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono font-bold border transition-all whitespace-nowrap uppercase tracking-wider ${
                  selectedCategory === cat 
                    ? 'bg-accent text-white border-accent' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, idx) => (
              <div key={idx} className="h-64">
                <AIToolCard
                  name={tool.name}
                  description={tool.description}
                  url={tool.url}
                  imageUrl={tool.image}
                  category={tool.category}
                  featured={tool.featured}
                  slug={slugify(tool.name)}
                  onClick={() => setSelectedTool(tool)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-white border border-slate-200 border-dashed rounded-sm mt-8">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-headline font-bold text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-500 font-mono text-sm mb-6">Try adjusting your category filter.</p>
            <button 
              onClick={() => {setSelectedCategory('All')}}
              className="text-accent hover:text-accent-hover font-mono text-xs font-bold uppercase tracking-widest border-b border-accent hover:border-accent-hover transition-all pb-1"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Tool Detail Modal Overlay */}
        {selectedTool && (
          <ToolDetailModal 
            tool={selectedTool} 
            onClose={() => setSelectedTool(null)} 
          />
        )}

      </main>
    </div>
  );
}