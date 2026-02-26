import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, Sparkles, Command, Plus, Briefcase, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
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

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto relative border-b-4 border-black pb-16">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
          
          <h1 className="text-5xl md:text-7xl font-display text-black mb-8 uppercase leading-[0.9] glitch-text" data-text="THE TOOL DIRECTORY">
            The Tool <span className="text-[#ff00ff]">Directory</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black font-black leading-relaxed font-mono uppercase bg-[#ccff00] px-4 py-2 border-2 border-black rotate-1 inline-block mb-10">
            // No spam. Just real AI tools for real work.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-black font-black uppercase tracking-widest">
              Building something? <a href="https://forms.gle/KqN82GGdCohshtVx8" target="_blank" rel="noopener noreferrer" className="text-[#ff00ff] hover:bg-black hover:text-white px-1 transition-colors underline decoration-2 decoration-black underline-offset-4">Pitch it here.</a>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-16 sticky top-24 z-30 flex justify-center">
          <div className="bg-white border-4 border-black p-4 brutalist-shadow-sm flex overflow-x-auto gap-3 max-w-full scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 font-display text-xs uppercase border-2 border-black transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black text-[#ccff00]' 
                    : 'bg-white text-black hover:bg-[#ccff00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTools.map((tool, idx) => (
              <AIToolCard
                key={idx}
                name={tool.name}
                description={tool.description}
                url={tool.url}
                imageUrl={tool.image}
                category={tool.category}
                featured={tool.featured}
                slug={slugify(tool.name)}
                onClick={() => setSelectedTool(tool)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-white border-4 border-black brutalist-shadow">
            <Filter className="w-16 h-16 text-gray-200 mx-auto mb-6 stroke-[3px]" />
            <h3 className="text-3xl font-display text-black mb-4 uppercase">No tools found</h3>
            <p className="text-black font-black font-mono uppercase text-sm mb-10 tracking-widest">// Try a different category.</p>
            <button 
              onClick={() => {setSelectedCategory('All')}}
              className="bg-[#ccff00] border-2 border-black px-8 py-3 font-display uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
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

        {/* Exit Strategy CTA */}
        <div className="mt-32 pt-16 border-t-4 border-black text-center max-w-3xl mx-auto">
           <Briefcase className="w-12 h-12 text-black mx-auto mb-8 stroke-[3px]" />
           <h2 className="text-3xl md:text-4xl font-display text-black mb-6 uppercase">Built something profitable?</h2>
           <p className="text-lg text-black font-bold mb-10 font-mono uppercase leading-tight">
             // If you're looking for an exit, browse our curated list of 150+ micro-PE firms and acquisition partners.
           </p>
           <Link href="/investors" className="inline-flex items-center gap-4 bg-black text-[#00ffff] px-8 py-4 border-4 border-black font-display text-lg uppercase transition-all brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
             View Exit Database <ArrowRight className="w-6 h-6 stroke-[3px]" />
           </Link>
        </div>

      </main>
    </div>
  );
}
