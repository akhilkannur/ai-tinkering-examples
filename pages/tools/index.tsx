import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, Sparkles, Command, Plus, Briefcase, ArrowRight } from 'lucide-react';

// Helper to group by week (randomly for now till last week as requested)
function groupByWeekTools(items: AiTool[]) {
  // Shuffle items to randomize assortment
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  
  const batches: { [key: string]: AiTool[] } = {};
  const itemsPerBatch = 12;
  const numBatches = Math.ceil(shuffled.length / itemsPerBatch);
  
  // Starting from last week (Mar 23) going back
  for (let i = 0; i < numBatches; i++) {
    const startDate = new Date('2026-03-23');
    startDate.setDate(startDate.getDate() - (i * 7));
    
    const weekLabel = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    batches[weekLabel] = shuffled.slice(i * itemsPerBatch, (i + 1) * itemsPerBatch);
  }

  return Object.entries(batches).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
}

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      return selectedCategory === 'All' || tool.category === selectedCategory;
    });
  }, [selectedCategory]);

  const toolBatches = useMemo(() => {
    return groupByWeekTools(filteredTools);
  }, [filteredTools]);

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
    <div className="flex flex-col min-h-screen bg-white font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>AI Tools Directory | Curated List | Real AI Examples</title>
        <meta name="description" content="A curated database of the latest AI tools for business and productivity. Hand-picked for Sales, Marketing, and Ops tinkerers." key="description" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="AI Tools Directory | Curated List" key="og:title" />
        <meta property="og:description" content="A curated database of the latest AI tools for business and productivity. Hand-picked for Sales, Marketing, and Ops tinkerers." key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-7xl relative z-10">
        
        <div className="text-center mb-24 max-w-3xl mx-auto relative border-b-4 border-black pb-16">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
          
          <h1 className="text-5xl md:text-7xl font-display text-black mb-8 uppercase leading-[0.9]">
            The Tool <span className="text-[#ff00ff]">Directory</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black font-black leading-relaxed font-mono uppercase bg-[#ccff00] px-4 py-2 border-2 border-black rotate-1 inline-block mb-10">
            No spam. Just real AI tools for real work.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-black font-black uppercase tracking-widest">
              Building something? <a href="https://forms.gle/KqN82GGdCohshtVx8" target="_blank" rel="noopener noreferrer" className="text-[#ff00ff] hover:bg-black hover:text-white px-1 transition-colors underline decoration-2 decoration-black underline-offset-4 text-xs">Pitch it here.</a>
            </p>
          </div>
        </div>

        <div className="mb-16 sticky top-24 z-30 flex justify-center">
          <div className="bg-white border-4 border-black p-4 brutalist-shadow-sm flex overflow-x-auto gap-3 max-w-full scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 font-display text-[10px] uppercase border-2 border-black transition-all ${
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

        <div className="space-y-xxl">
          {toolBatches.map(([week, tools], batchIdx) => tools.length > 0 && (
            <div key={week} className="space-y-lg">
              <div className="flex items-center gap-4">
                <div className={`px-4 py-1 border-2 border-black font-display text-sm uppercase shadow-brutalist-sm ${batchIdx === 0 ? 'bg-[#ff00ff] text-white' : 'bg-white text-black'}`}>
                  Batch: Week of {week}
                </div>
                <div className="h-[2px] flex-grow bg-black/10"></div>
                {batchIdx === 0 && (
                  <div className="text-[10px] font-mono font-bold text-black bg-[#ccff00] px-2 py-1 uppercase tracking-widest border border-black">
                    Newly Added
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {tools.map((tool, idx) => (
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
            </div>
          ))}

          {filteredTools.length === 0 && (
            <div className="text-center py-24 bg-white border-4 border-black brutalist-shadow">
              <Filter className="w-16 h-16 text-gray-200 mx-auto mb-6 stroke-[3px]" />
              <h3 className="text-3xl font-display text-black mb-4 uppercase">No tools found</h3>
              <p className="text-black font-black font-mono uppercase text-sm mb-10 tracking-widest">Try a different category.</p>
              <button 
                onClick={() => {setSelectedCategory('All')}}
                className="bg-[#ccff00] border-2 border-black px-8 py-3 font-display uppercase brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

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
