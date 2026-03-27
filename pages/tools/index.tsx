import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, Briefcase, ArrowRight } from 'lucide-react';

// Helper to group by week (deterministic)
function groupByWeekTools(items: AiTool[]) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  const batches: { [key: string]: AiTool[] } = {};
  const itemsPerBatch = 12;
  const numBatches = Math.ceil(sorted.length / itemsPerBatch);
  
  for (let i = 0; i < numBatches; i++) {
    const startDate = new Date('2026-03-23');
    startDate.setDate(startDate.getDate() - (i * 7));
    const weekLabel = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    batches[weekLabel] = sorted.slice(i * itemsPerBatch, (i + 1) * itemsPerBatch);
  }

  return Object.entries(batches);
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
    return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
  };

  return (
    <div className="flex flex-col min-h-screen bg-coffee-100 font-sans text-coffee-900 selection:bg-coffee-300 selection:text-coffee-900">
      <Head>
        <title>AI Tools Directory | Real AI Examples</title>
        <meta name="description" content="A curated database of the latest AI tools for business and productivity." key="description" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-6 pt-32 md:pt-40 pb-16 max-w-7xl relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto border-b border-coffee-200 pb-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-coffee-200/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <h1 className="text-5xl md:text-8xl font-display font-semibold text-coffee-900 mb-8 uppercase leading-[1.1] tracking-tight">
            The Tool <br/> <span className="text-coffee-500">Directory.</span>
          </h1>
          
          <p className="text-lg md:text-xl font-light text-coffee-700 leading-relaxed mb-10 max-w-xl mx-auto">
            No spam. No hype. Just the AI tools people are actually using to ship and scale.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-medium text-coffee-400 uppercase tracking-widest">
              Building something? <a href="https://forms.gle/KqN82GGdCohshtVx8" target="_blank" rel="noopener noreferrer" className="text-coffee-900 hover:text-coffee-500 px-1 transition-colors underline decoration-coffee-200 underline-offset-4">Pitch it here.</a>
            </p>
          </div>
        </div>

        <div className="mb-16 sticky top-24 z-30 flex justify-center">
          <div className="bg-white/80 backdrop-blur-md border border-coffee-200 p-2 rounded-full flex overflow-x-auto gap-2 max-w-full hide-scrollbar shadow-soft">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium text-sm tracking-wide transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-coffee-900 text-white shadow-md' 
                    : 'bg-transparent text-coffee-600 hover:text-coffee-900 hover:bg-coffee-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-20">
          {filteredTools.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-coffee-200 shadow-soft">
              <Filter className="w-16 h-16 text-coffee-200 mx-auto mb-6 stroke-[1.5px]" />
              <h3 className="text-3xl font-display text-coffee-900 mb-4 uppercase">No tools found</h3>
              <p className="text-coffee-600 font-light text-sm mb-10 tracking-widest">Try a different category.</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="bg-coffee-900 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-coffee-700 transition-all"
              >
                Clear filters
              </button>
            </div>
          ) : selectedCategory === 'All' ? (
            toolBatches.map(([week, tools], batchIdx) => tools.length > 0 && (
              <div key={week}>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-coffee-400">
                    Drop / {week}
                  </span>
                  <div className="h-px flex-grow bg-coffee-200/60"></div>
                  {batchIdx === 0 && (
                    <span className="text-[10px] font-mono font-bold text-white bg-coffee-900 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      New
                    </span>
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
            ))
          ) : (
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
