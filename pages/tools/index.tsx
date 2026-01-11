import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { Search, ExternalLink, Terminal, Cpu, Activity, Hash, Filter } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-gray-300 font-mono selection:bg-green-900 selection:text-green-50">
      <Head>
        <title>AI_TOOLS_DIRECTORY // 2026</title>
        <meta name="description" content="A curated feed of the latest AI tools. Raw data. No fluff." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Terminal Header */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <div className="flex items-center gap-3 text-green-500 mb-4">
            <Terminal className="w-5 h-5" />
            <span className="text-sm tracking-widest">SYSTEM_READY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            INTELLIGENCE_FEED
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
            > Initializing scan of {aiTools.length} AI agents...<br/>
            > Filtering for high-signal tools.<br/>
            > Displaying results below.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 sticky top-20 z-30 bg-[#0a0a0a]/95 backdrop-blur-sm py-4 border-b border-gray-800">
          
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-600">root@search:~$</span>
            </div>
            <input
              type="text"
              className="block w-full pl-32 pr-4 py-3 bg-gray-900 border border-gray-800 text-green-400 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all rounded-sm"
              placeholder="find tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-green-500 text-black border-green-500' 
                    : 'bg-gray-900 text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Feed (Table) */}
        <div className="border border-gray-800 rounded-sm overflow-hidden bg-gray-900/30">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-900 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <div className="col-span-4">Tool Identity</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-1 text-right">Access</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-800">
            {filteredTools.map((tool, idx) => (
              <a 
                key={idx} 
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-900 transition-all duration-150 items-start relative"
              >
                {/* Active Indicator on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Identity */}
                <div className="col-span-1 md:col-span-4 flex items-start gap-4">
                  <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-sm overflow-hidden p-0.5 grayscale group-hover:grayscale-0 transition-all">
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
                    <h3 className="text-base font-bold text-gray-200 group-hover:text-green-400 transition-colors flex items-center gap-2">
                      {tool.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-gray-500" />
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1.5 md:hidden">
                       <span className="text-[10px] text-gray-500 border border-gray-800 px-1.5 py-0.5">{tool.category}</span>
                    </div>
                  </div>
                </div>

                {/* Category (Desktop) */}
                <div className="hidden md:block col-span-2 mt-1">
                  <span className="text-xs text-gray-500 border border-gray-800 px-2 py-1 bg-gray-900/50 group-hover:border-green-500/30 group-hover:text-green-500/80 transition-colors">
                    {tool.category}
                  </span>
                </div>

                {/* Description */}
                <div className="col-span-1 md:col-span-5 mt-1">
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 group-hover:text-gray-400 group-hover:line-clamp-none transition-all">
                    {tool.description}
                  </p>
                </div>

                {/* Access / Status */}
                <div className="hidden md:flex col-span-1 justify-end mt-1">
                  {tool.tags.price === 'Free' ? (
                    <span className="text-[10px] font-bold text-black bg-green-500 px-2 py-0.5">
                      FREE
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-600 border border-gray-800 px-2 py-0.5">
                      {tool.tags.price.toUpperCase()}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20 border border-gray-800 border-dashed rounded-sm mt-8">
            <Hash className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 font-mono">ERROR: No matching records found.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All')}}
              className="mt-4 text-green-500 hover:underline text-sm"
            >
              > Reset Query
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
