import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { Search, ExternalLink, Filter } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>The AI Tool Directory | 80+ Curated Tools</title>
        <meta name="description" content="Discover the best AI tools for developers, marketers, and creators. Curated, categorized, and updated daily." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-16">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            The AI Tool Directory
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Stop searching. Start building. We've curated the best <span className="font-bold text-blue-600">{aiTools.length} AI tools</span> to help you work faster.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200 sticky top-24 z-30">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Search tools (e.g., 'video', 'coding')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <a 
              key={idx} 
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Header with Logo */}
              <div className="p-6 pb-4 flex items-start gap-4">
                <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-1">
                  <Image 
                    src={tool.image} 
                    alt={tool.name} 
                    width={48} 
                    height={48}
                    className="object-contain w-full h-full rounded-lg"
                    unoptimized // Allow external URLs easily
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {tool.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {tool.category}
                    </span>
                    {tool.tags.price === 'Free' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pb-6 flex-grow">
                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>{tool.tags.skill}</span>
                <span className="group-hover:text-blue-600 transition-colors">Visit Website →</span>
              </div>
            </a>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No tools found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All')}}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}