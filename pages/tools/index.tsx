import React, { useState, useMemo, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import Navbar from '../../components/Navbar';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, X, ArrowRight, ExternalLink, ChevronDown, Search } from 'lucide-react';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

// Group tools by week label
function getWeekLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  
  // Start of this week (Sunday)
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setDate(now.getDate() - now.getDay());
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  if (date >= startOfThisWeek) return 'This Week';
  if (date >= startOfLastWeek) return 'Last Week';

  // Find the Monday of that week for a cleaner label
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return `Week of ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [showAllWeeks, setShowAllWeeks] = useState(false);

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools
      .filter(tool => {
        const matchCat = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
      })
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }, [selectedCategory, searchQuery]);

  // Group by week
  const groupedWeeks = useMemo(() => {
    const groups: { label: string; tools: AiTool[] }[] = [];
    const map = new Map<string, AiTool[]>();

    filteredTools.forEach(tool => {
      const label = getWeekLabel(tool.dateAdded);
      if (!map.has(label)) {
        map.set(label, []);
        groups.push({ label, tools: map.get(label)! });
      }
      map.get(label)!.push(tool);
    });

    return groups;
  }, [filteredTools]);

  const visibleGroups = showAllWeeks ? groupedWeeks : groupedWeeks.slice(0, 4);
  const hasMoreWeeks = groupedWeeks.length > 4;

  // Count tools added this month

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F8F6] font-sans text-slate-900 selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>AI Tools Directory — {aiTools.length} Curated Tools | Real AI Examples</title>
        <meta name="description" content={`Browse ${aiTools.length} curated AI tools — filtered by category and price. Updated weekly.`} key="description" />
        <style>{`
          .serif-title {
            font-family: 'Cormorant Garamond', serif;
          }
        `}</style>
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 pt-28 md:pt-40 pb-24">
        
        {/* Hero - DistributionKit Style */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-6">
            Your Workflow<br />Won't Automate Itself.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            The most practical AI tools directory for operators. No fluff, just APIs, MCP configs, and work-ready stack.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-7xl mx-auto mb-8 sticky top-[72px] z-40 bg-[#F9F8F6]/80 backdrop-blur-md py-4 border-b border-slate-200/50">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Horizontal Pill Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap border-2 transition-all ${
                    selectedCategory === cat 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Tools List & Sidebar */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main Content: Tools List */}
          <div className="flex-grow min-w-0">
            {filteredTools.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No tools found matching your search</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                  className="mt-4 text-[#ff00ff] font-bold uppercase text-xs hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                {visibleGroups.map((group) => (
                  <div key={group.label} className="mb-12">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                      <h2 className="serif-title text-xl font-bold italic tracking-tight text-slate-800">
                        {group.label}
                      </h2>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {group.tools.length} TOOLS
                      </span>
                    </div>
                    <div className="divide-y divide-slate-200/50">
                      {group.tools.map((tool) => (
                        <ToolDataRow 
                          key={tool.name} 
                          tool={tool} 
                          onClick={() => setSelectedTool(tool)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Show More Weeks */}
                {hasMoreWeeks && !showAllWeeks && (
                  <button
                    onClick={() => setShowAllWeeks(true)}
                    className="w-full py-6 mt-8 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold uppercase tracking-widest text-xs hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    Explore Older Backlog <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar: Sponsors */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-[140px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff00ff]"></div>
              </div>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="https://salestools.club/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block bg-slate-50 border border-slate-100 rounded-[2rem] p-6 hover:border-slate-900 transition-all hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-display font-black text-xl">
                      S
                    </div>
                    <div>
                      <h4 className="font-display font-black uppercase text-sm leading-tight group-hover:text-[#ff00ff] transition-colors">SalesTools.club</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sponsor</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                    The ultimate database for modern sales operators. 500+ curated tools, APIs, and workflows to build your outbound engine.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 group-hover:gap-3 transition-all">
                    Explore Database <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
                
                {/* Secondary Sponsor/Link */}
                <Link 
                  href="/tools/badge"
                  className="block border-2 border-dashed border-slate-200 rounded-[2rem] p-6 text-center hover:border-slate-400 transition-colors"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Want to sponsor?</p>
                  <p className="text-xs font-bold text-slate-900 hover:text-[#ff00ff] transition-colors underline underline-offset-4">Get in touch →</p>
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Submit CTA */}
        <div className="max-w-7xl mx-auto mt-20">
          <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff00ff] opacity-10 blur-[100px] -mr-32 -mt-32 transition-all group-hover:opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase mb-3">List Your Tool</h2>
              <p className="text-slate-400 font-medium max-w-md">Join {aiTools.length} curated tools. Add our badge, get verified instantly. Free forever.</p>
            </div>
            <Link
              href="/tools/badge"
              className="relative z-10 inline-flex items-center gap-3 bg-[#ff00ff] text-white px-8 py-4 font-display font-black uppercase text-sm rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Get Verified <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </main>

      {selectedTool && (
        <ToolDetailModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}

      {/* Custom styles for scrollbar hiding */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function ToolDataRow({ tool, onClick }: { tool: AiTool; onClick: () => void }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div 
      className="group flex flex-col md:flex-row items-start md:items-center justify-between py-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer px-4 -mx-4 rounded-xl"
      onClick={onClick}
    >
      {/* Name + Logo */}
      <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-1/4">
        <div className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden shadow-sm group-hover:border-slate-900 transition-colors">
          <Image 
            src={imgSrc} 
            alt={tool.name} 
            width={40} 
            height={40} 
            className="object-contain"
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized
          />
        </div>
        <div className="min-w-0">
          <h3 className="serif-title text-xl font-bold italic leading-tight group-hover:text-[#ff00ff] transition-colors truncate">
            {tool.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              {tool.category}
            </span>
            <span className="md:hidden text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
              {tool.tags.price}
            </span>
          </div>
        </div>
      </div>

      {/* Description - Full text */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Human / Maker Block - Clickable to Social */}
      <div className="w-full md:w-1/5 mb-4 md:mb-0">
        {tool.maker ? (
          <a 
            href={`https://x.com/${tool.maker.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-transparent hover:border-[#ff00ff] hover:bg-white transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white flex-shrink-0 shadow-sm">
              <img 
                src={tool.maker.image} 
                alt={tool.maker.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-1">Maker</div>
              <div className="text-xs font-bold text-slate-900 truncate">{tool.maker.name}</div>
            </div>
          </a>
        ) : (
          <div className="hidden md:block h-10"></div>
        )}
      </div>

      {/* Metadata - Desktop Only */}
      <div className="hidden md:flex items-center gap-6 w-1/6 justify-end pr-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Pricing</span>
          <span className="text-xs font-bold text-slate-900">{tool.tags.price}</span>
        </div>
      </div>

      {/* Action */}
      <div className="w-full md:w-auto flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm group-hover:shadow-md">
          Details <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
