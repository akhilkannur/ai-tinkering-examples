import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import { aiTools } from '../../lib/ai-tools-data';
import { Search, ExternalLink, Filter, Command, Sparkles } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      <Head>
        <title>AI Tools Directory | Curated List</title>
        <meta name="description" content="A clean, curated list of the latest AI tools for business and productivity." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600 mb-3 font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Updated Daily</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            AI Tools Directory
          </h1>
          <p className="text-slate-500 text-lg">
            A curated database of {aiTools.length} tools to speed up your workflow.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 z-30 bg-white/90 backdrop-blur-md py-4 border-b border-slate-100">
          
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg text-sm"
              placeholder="Search tools..."
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
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Feed (Clean List) */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <div className="col-span-4">Tool</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-1 text-right">Price</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {filteredTools.map((tool, idx) => (
              <a 
                key={idx} 
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 px-6 py-4 hover:bg-slate-50/80 transition-colors items-center relative"
              >
                {/* Tool Identity */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden p-1 shadow-sm group-hover:shadow-md transition-all">
                    <Image 
                      src={tool.image} 
                      alt={tool.name} 
                      width={40} 
                      height={40}
                      className="object-contain w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      {tool.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
                    </h3>
                    {/* Mobile Category Tag */}
                    <div className="md:hidden mt-1">
                       <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tool.category}</span>
                    </div>
                  </div>
                </div>

                {/* Category (Desktop) */}
                <div className="hidden md:block col-span-2">
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    {tool.category}
                  </span>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-5">
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 md:line-clamp-1 group-hover:line-clamp-none transition-all">
                    {tool.description}
                  </p>
                </div>

                {/* Access / Status */}
                <div className="hidden md:flex col-span-1 justify-end">
                  {tool.tags.price === 'Free' ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                      {tool.tags.price}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200 border-dashed mt-8">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No tools found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All')}}
              className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}