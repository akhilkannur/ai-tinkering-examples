import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { ArrowRight, ChevronDown } from 'lucide-react';

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
  const [showAllWeeks, setShowAllWeeks] = useState(false);

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools
      .filter(tool => {
        return selectedCategory === 'All' || tool.category === selectedCategory;
      })
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }, [selectedCategory]);

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

      <div>
        {/* Hero */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-32 pt-8 md:pt-12">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
            Too many AI tools. <br /><span className="font-instrument font-normal italic lowercase opacity-90">Not enough time.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Skip the marketing hype. A weekly shortlist of handpicked tools that solve real work problems.
          </p>
        </div>

        {/* Floating Glass Sheet */}
        <div className="glass-sheet rounded-3xl md:rounded-[48px] p-4 md:p-16 lg:p-24 overflow-hidden">
          {/* Filters */}
          <div className="mb-8 md:mb-16 sticky top-4 z-40 bg-white/80 backdrop-blur-2xl py-4 px-4 md:py-6 md:px-8 rounded-2xl md:rounded-3xl border border-white/30 shadow-2xl">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[10px] md:text-[12px] font-bold transition-all whitespace-nowrap border ${
                    selectedCategory === cat 
                    ? 'bg-micro-fg border-micro-fg text-white shadow-lg' 
                    : 'bg-white/50 border-white/20 text-micro-muted hover:border-micro-fg/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools List & Sidebar */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* Main Content: Tools List */}
            <div className="flex-grow min-w-0">
              {filteredTools.length === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-micro-layer-2 rounded-[40px] bg-micro-layer-1/30">
                  <p className="text-micro-muted font-bold uppercase tracking-widest text-sm">No tools found</p>
                  <button 
                    onClick={() => {setSelectedCategory('All');}}
                    className="mt-6 text-micro-fg font-bold uppercase text-xs hover:underline decoration-2 underline-offset-4"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {visibleGroups.map((group) => (
                    <div key={group.label} className="mb-10 md:mb-20">
                      <div className="flex items-center justify-between border-b border-micro-layer-1 pb-3 md:pb-4 mb-4 md:mb-8">
                        <h2 className="text-lg md:text-2xl font-bold tracking-tight text-micro-fg">
                          {group.label}
                        </h2>
                        <span className="text-[11px] font-bold text-micro-muted uppercase tracking-[0.2em]">
                          {group.tools.length} TOOLS
                        </span>
                      </div>
                      <div className="divide-y divide-micro-layer-1">
                        {group.tools.map((tool) => (
                          <Link key={tool.name} href={`/tools/${slugify(tool.name)}`}>
                            <ToolDataRow tool={tool} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Show More Weeks */}
                  {hasMoreWeeks && !showAllWeeks && (
                    <button
                      onClick={() => setShowAllWeeks(true)}
                      className="w-full py-6 md:py-8 mt-8 md:mt-12 border border-micro-layer-1 rounded-2xl md:rounded-[32px] bg-white text-micro-muted font-bold uppercase tracking-widest text-[11px] hover:border-micro-fg hover:text-micro-fg transition-all flex items-center justify-center gap-3 shadow-soft hover:shadow-micro"
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
                  className="group block bg-white border border-micro-layer-1 rounded-3xl md:rounded-[40px] p-6 md:p-10 hover:border-micro-fg transition-all hover:shadow-micro"
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
                <div className="bg-micro-fg rounded-3xl md:rounded-[40px] p-6 md:p-10 text-center relative overflow-hidden group shadow-micro">
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

    </>
  );
}

function ToolDataRow({ tool }: { tool: AiTool }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div 
      className="group flex items-center gap-6 py-6 px-6 -mx-6 hover:bg-white transition-all cursor-pointer rounded-2xl border border-transparent hover:border-micro-layer-1 hover:shadow-soft"
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-xl border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-2 overflow-hidden group-hover:border-micro-fg transition-colors">
        <Image 
          src={imgSrc} 
          alt={tool.name} 
          width={48} 
          height={48} 
          className="object-contain"
          onError={() => setImgSrc(fallbackLogo)}
          unoptimized
        />
      </div>

      {/* Name */}
      <div className="w-48 flex-shrink-0 min-w-0">
        <h3 className="text-[16px] font-bold tracking-tight text-micro-fg truncate group-hover:underline decoration-1 underline-offset-4">
          {tool.name}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-micro-muted">
          {tool.category}
        </span>
      </div>

      {/* Description */}
      <p className="hidden md:block flex-1 text-[15px] text-micro-muted font-medium leading-snug truncate min-w-0">
        {tool.description}
      </p>

      {/* Pricing */}
      <span className="hidden md:block text-sm font-bold text-micro-fg flex-shrink-0 w-24 text-right">
        {tool.tags.price}
      </span>

      {/* Action */}
      <div className="flex-shrink-0 ml-auto md:ml-0">
        <ArrowRight className="w-5 h-5 text-micro-muted group-hover:text-micro-fg transition-colors" />
      </div>
    </div>
  );
}
