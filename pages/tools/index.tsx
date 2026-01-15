import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { aiTools } from '../../lib/ai-tools-data';
import AIToolCard from '../../components/AIToolCard';
import { Search, Filter, Sparkles, Command, Plus } from 'lucide-react';

export default function ToolsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg font-sans text-text-color fade-in">
      <Head>
        <title>AI Tools Directory | Curated List</title>
        <meta name="description" content="A curated database of the latest AI tools for business and productivity." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto relative">
          
          <div className="inline-flex items-center gap-2 bg-navy-dark border border-navy-light/50 text-accent px-4 py-1.5 rounded-sm text-xs font-mono font-bold mb-6 uppercase tracking-wider">
            <Command className="w-3 h-3" />
            <span>Curated Database</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-text-color mb-6 tracking-tight leading-tight uppercase">
            The AI Tool <span className="text-accent">Arsenal</span>
          </h1>
          
          <p className="text-lg text-text-secondary leading-relaxed font-sans max-w-2xl mx-auto mb-8">
             Stop searching, start building. A hand-picked collection of {aiTools.length} tools verified for actual business utility.
          </p>

          <a 
            href="/investors"
            className="inline-flex items-center gap-2 bg-secondary-bg hover:bg-navy-dark border border-navy-light hover:border-accent text-text-color hover:text-accent font-mono text-sm font-bold px-6 py-3 rounded-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-accent-glow"
          >
            <Plus className="w-4 h-4" /> Submit A Tool
          </a>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 sticky top-24 z-30 bg-primary-bg/95 backdrop-blur-sm py-4 border-b border-navy-dark">
          
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-navy-light" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-[#0B1221] border border-navy-dark text-text-color placeholder-navy-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all rounded-sm text-sm font-mono"
              placeholder="Search tools (e.g. 'Writing', 'Video', 'SEO')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono font-bold border transition-all whitespace-nowrap uppercase tracking-wider ${
                  selectedCategory === cat 
                    ? 'bg-accent text-electric-blue border-accent' 
                    : 'bg-[#0B1221] text-text-secondary border-navy-dark hover:border-accent hover:text-accent'
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
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-[#0B1221] border border-navy-dark border-dashed rounded-sm mt-8">
            <Filter className="w-12 h-12 text-navy-dark mx-auto mb-4" />
            <h3 className="text-xl font-headline font-bold text-text-color mb-2">No tools found</h3>
            <p className="text-text-secondary font-mono text-sm mb-6">Try adjusting your search terms.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All')}}
              className="text-accent hover:text-white font-mono text-xs font-bold uppercase tracking-widest border-b border-accent hover:border-white transition-all pb-1"
            >
              Clear filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}