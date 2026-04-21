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
    <>
      <Head>
        <title>AI Tools Directory — {aiTools.length} Curated Tools | Real AI Examples</title>
        <meta name="description" content={`Browse ${aiTools.length} curated AI tools — filtered by category and price. Updated weekly.`} key="description" />
      </Head>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="max-w-5xl mx-auto text-center mb-24 md:mb-32 pt-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9] text-white drop-shadow-md">
            Your workflow <br /><span className="font-instrument font-normal italic lowercase opacity-90">won't automate itself.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            The most practical AI tools directory for operators. No fluff, just APIs, MCP configs, and work-ready stack.
          </p>
        </div>

        {/* Floating Glass Sheet */}
        <div className="glass-sheet rounded-[48px] p-8 md:p-16 lg:p-24 overflow-hidden">
          {/* Search & Filters */}
          <div className="mb-16 sticky top-4 z-40 bg-white/20 backdrop-blur-2xl py-6 px-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              
              {/* Horizontal Pill Filters */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-3 rounded-pill text-[12px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                      ? 'bg-micro-fg border-micro-fg text-white shadow-lg' 
                      : 'bg-white/50 border-white/20 text-micro-muted hover:border-micro-fg/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-micro-muted" />
                <input 
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/50 border border-white/20 rounded-pill text-sm font-medium focus:outline-none focus:bg-white focus:border-micro-fg transition-all placeholder:text-micro-muted/60"
                />
              </div>
            </div>
          </div>

          {/* Tools List & Sidebar */}
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Main Content: Tools List */}
            <div className="flex-grow min-w-0">
              {filteredTools.length === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-micro-layer-2 rounded-[40px] bg-micro-layer-1/30">
                  <p className="text-micro-muted font-bold uppercase tracking-widest text-sm">No tools found matching your search</p>
                  <button 
                    onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                    className="mt-6 text-micro-fg font-bold uppercase text-xs hover:underline decoration-2 underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {visibleGroups.map((group) => (
                    <div key={group.label} className="mb-20">
                      <div className="flex items-center justify-between border-b border-micro-layer-1 pb-4 mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-micro-fg">
                          {group.label}
                        </h2>
                        <span className="text-[11px] font-bold text-micro-muted uppercase tracking-[0.2em]">
                          {group.tools.length} TOOLS
                        </span>
                      </div>
                      <div className="divide-y divide-micro-layer-1">
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
                      className="w-full py-8 mt-12 border border-micro-layer-1 rounded-[32px] bg-white text-micro-muted font-bold uppercase tracking-widest text-[11px] hover:border-micro-fg hover:text-micro-fg transition-all flex items-center justify-center gap-3 shadow-soft hover:shadow-micro"
                    >
                      Explore Older Backlog <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar: Sponsors */}
            <aside className="lg:w-96 flex-shrink-0">
              <div className="sticky top-40 space-y-8">
                <a 
                  href="https://salestools.club/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block bg-white border border-micro-layer-1 rounded-[40px] p-10 hover:border-micro-fg transition-all hover:shadow-micro"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-micro-fg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold uppercase text-[13px] tracking-widest text-micro-fg group-hover:text-terminal-lime transition-colors">SalesTools.club</h4>
                      <p className="text-[10px] font-bold text-micro-muted uppercase tracking-[0.2em]">Curated Partner</p>
                    </div>
                  </div>
                  <p className="text-sm text-micro-muted font-medium leading-relaxed mb-8">
                    The ultimate database for modern sales operators. 500+ curated tools, APIs, and workflows to build your outbound engine.
                  </p>
                  <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-micro-fg group-hover:gap-5 transition-all">
                    Explore Database <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
                
                {/* Submit CTA */}
                <div className="bg-micro-fg rounded-[40px] p-10 text-center relative overflow-hidden group shadow-micro">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-terminal-lime opacity-10 blur-[100px] -mr-32 -mt-32 transition-all group-hover:opacity-20"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">List Your Tool</h2>
                    <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed">Join {aiTools.length} curated tools. Get verified instantly. Free forever.</p>
                    <Link
                      href="/tools/badge"
                      className="inline-flex items-center gap-3 bg-white text-micro-fg px-10 py-4 font-bold uppercase text-[11px] tracking-widest rounded-pill hover:bg-terminal-lime hover:text-micro-fg transition-all shadow-xl hover:scale-105 active:scale-95"
                    >
                      Get Verified <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {selectedTool && (
        <ToolDetailModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </>
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
      className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 hover:bg-white transition-all cursor-pointer px-8 -mx-8 rounded-[32px] border border-transparent hover:border-micro-layer-1 hover:shadow-soft"
      onClick={onClick}
    >
      {/* Name + Logo */}
      <div className="flex items-center gap-6 mb-6 md:mb-0 w-full md:w-1/4">
        <div className="w-14 h-14 rounded-2xl border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-2.5 overflow-hidden shadow-sm group-hover:border-micro-fg transition-colors">
          <Image 
            src={imgSrc} 
            alt={tool.name} 
            width={56} 
            height={56} 
            className="object-contain"
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-bold tracking-tight leading-tight text-micro-fg group-hover:underline decoration-2 underline-offset-4">
            {tool.name}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-micro-muted bg-micro-layer-1 px-2 py-1 rounded-lg">
              {tool.category}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <p className="text-sm text-micro-muted font-medium leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Maker Block */}
      <div className="w-full md:w-1/5 mb-6 md:mb-0">
        {tool.maker ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white flex-shrink-0 shadow-sm">
              <img 
                src={tool.maker.image} 
                alt={tool.maker.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-bold uppercase tracking-widest text-micro-muted leading-none mb-1">Curated By</div>
              <div className="text-xs font-bold text-micro-fg truncate">{tool.maker.name}</div>
            </div>
          </div>
        ) : (
          <div className="hidden md:block h-10"></div>
        )}
      </div>

      {/* Metadata */}
      <div className="hidden md:flex items-center gap-8 w-1/6 justify-end pr-6">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-bold uppercase tracking-widest text-micro-muted mb-1">Pricing</span>
          <span className="text-xs font-bold text-micro-fg">{tool.tags.price}</span>
        </div>
      </div>

      {/* Action */}
      <div className="w-full md:w-auto flex justify-end">
        <button className="flex items-center gap-3 px-8 py-3 bg-micro-fg text-white rounded-pill text-[11px] font-bold uppercase tracking-widest hover:bg-terminal-lime hover:text-micro-fg transition-all shadow-lg active:scale-95">
          Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
