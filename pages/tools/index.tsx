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
    <div className="flex flex-col min-h-screen bg-[#fafafa] font-sans text-black selection:bg-black selection:text-white">
      <Head>
        <title>AI Tools Directory | Real AI Examples</title>
        <meta name="description" content="A curated database of the latest AI tools for business and productivity." key="description" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-16 md:pt-24 pb-16 max-w-7xl relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto border-b border-gray-200 pb-12">
          <h1 className="text-5xl md:text-7xl font-display font-black text-black mb-6 uppercase leading-[0.95] tracking-tight">
            The Tool <br/> Directory.
          </h1>
          
          <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto">
            No spam. No hype. Just the AI tools people are actually using to ship and scale.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              Building something? <a href="https://forms.gle/KqN82GGdCohshtVx8" target="_blank" rel="noopener noreferrer" className="text-black hover:underline px-1 transition-colors underline-offset-4">Pitch it here.</a>
            </p>
          </div>
        </div>

        <div className="mb-12 sticky top-24 z-30 flex justify-center">
          <div className="bg-white border-2 border-black p-3 flex overflow-x-auto gap-2 max-w-full scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-400 border-transparent hover:text-black hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {toolBatches.map(([week, tools], batchIdx) => tools.length > 0 && (
            <div key={week}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-gray-600">
                  Drop / {week}
                </span>
                <div className="h-px flex-grow bg-gray-200"></div>
                {batchIdx === 0 && (
                  <span className="text-[10px] font-mono font-bold text-black bg-white border border-black px-2 py-0.5 uppercase tracking-widest">
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
          ))}
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
