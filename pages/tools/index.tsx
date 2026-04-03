import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import Navbar from '../../components/Navbar';
import ToolDetailModal from '../../components/ToolDetailModal';
import { Filter, X, ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

// Group tools by week label
function getWeekLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setDate(now.getDate() - now.getDay());
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  if (date >= startOfThisWeek) return 'This Week';
  if (date >= startOfLastWeek) return 'Last Week';

  // Find the Monday of that week
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

const getCategoryColor = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('video') || c.includes('audio')) return 'bg-red-50 text-red-700 border-red-200';
  if (c.includes('productivity')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (c.includes('image')) return 'bg-purple-50 text-purple-700 border-purple-200';
  if (c.includes('copywriting') || c.includes('content')) return 'bg-orange-50 text-orange-700 border-orange-200';
  if (c.includes('marketing')) return 'bg-green-50 text-green-700 border-green-200';
  if (c.includes('code')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  return 'bg-gray-50 text-gray-700 border-gray-200';
};

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];
  const prices = ['All', ...Array.from(new Set(aiTools.map(t => t.tags.price)))];

  const filteredTools = useMemo(() => {
    return aiTools
      .filter(tool => {
        const matchCat = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchPrice = selectedPrice === 'All' || tool.tags.price === selectedPrice;
        return matchCat && matchPrice;
      })
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }, [selectedCategory, selectedPrice]);

  // Group by week
  const grouped = useMemo(() => {
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

  const displayGroups = showAll ? grouped : grouped.slice(0, 4);
  const hasMore = grouped.length > 4;

  // Count tools added this week
  const thisWeekCount = grouped.find(g => g.label === 'This Week')?.tools.length || 0;

  return (
    <div className="flex flex-col min-h-screen bg-page-bg font-sans text-primary-text selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>AI Tools Directory — {aiTools.length} Curated Tools | Real AI Examples</title>
        <meta name="description" content={`Browse ${aiTools.length} curated AI tools — filtered by category and price. Updated weekly.`} key="description" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-24">

        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-secondary-text">
              Updated Weekly
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight leading-[0.9] mb-4">
            AI Tools<br />Directory
          </h1>
          <p className="text-lg text-secondary-text max-w-xl mb-6">
            {aiTools.length} curated tools{thisWeekCount > 0 && <> · <span className="text-primary-text font-semibold">{thisWeekCount} added this week</span></>}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-white border-2 border-accent-dark px-3 py-2 shadow-brutalist-sm">
              <Filter className="w-3.5 h-3.5 text-secondary-text" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-[11px] font-mono font-bold uppercase tracking-wider outline-none cursor-pointer pr-4 appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-accent-dark px-3 py-2 shadow-brutalist-sm">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="bg-transparent text-[11px] font-mono font-bold uppercase tracking-wider outline-none cursor-pointer pr-4 appearance-none"
              >
                {prices.map(p => <option key={p} value={p}>{p === 'All' ? 'All Prices' : p}</option>)}
              </select>
            </div>
            {(selectedCategory !== 'All' || selectedPrice !== 'All') && (
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedPrice('All'); }}
                className="flex items-center gap-1 bg-white border-2 border-accent-dark px-3 py-2 shadow-brutalist-sm text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-red-50 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Tool List */}
        <div className="max-w-4xl mx-auto">
          {filteredTools.length === 0 ? (
            <div className="border-2 border-accent-dark bg-white p-16 text-center">
              <p className="text-sm font-mono uppercase text-secondary-text">No tools found for this filter</p>
            </div>
          ) : (
            displayGroups.map((group) => (
              <div key={group.label} className="mb-0">
                {/* Week Header */}
                <div className="sticky top-[72px] z-40 bg-page-bg border-b-2 border-accent-dark py-2 px-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-secondary-text">
                    {group.label}
                  </span>
                  <span className="text-[10px] font-mono text-secondary-text">
                    {group.tools.length} tool{group.tools.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Tool Rows */}
                <div className="border-x-2 border-b-2 border-accent-dark bg-white mb-8 divide-y divide-gray-100">
                  {group.tools.map((tool, i) => (
                    <ToolRow
                      key={tool.name + i}
                      tool={tool}
                      onClick={() => setSelectedTool(tool)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Show More */}
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full bg-accent-dark text-white py-4 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#ff00ff] transition-colors flex items-center justify-center gap-2 border-2 border-accent-dark"
            >
              Show all {filteredTools.length} tools <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Submit CTA */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-accent-dark text-white border-4 border-accent-dark p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display uppercase mb-2">List Your Tool</h2>
              <p className="text-sm text-gray-400">Add our badge, get verified instantly. Free forever.</p>
            </div>
            <Link
              href="/tools/badge"
              className="inline-flex items-center gap-3 bg-[#ccff00] text-black px-6 py-3 font-display uppercase text-sm border-2 border-[#ccff00] hover:bg-white hover:border-white transition-all shadow-brutalist-sm whitespace-nowrap"
            >
              Submit a Tool <ArrowRight className="w-4 h-4 stroke-[3px]" />
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
    </div>
  );
}

// Dense tool row component
function ToolRow({ tool, onClick }: { tool: AiTool; onClick: () => void }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div
      className="flex items-center gap-4 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors group"
      onClick={onClick}
    >
      {/* Favicon */}
      <div className="relative w-8 h-8 flex-shrink-0 border border-gray-200 bg-white overflow-hidden rounded-sm">
        <Image
          src={imgSrc}
          alt={tool.name}
          fill
          className="object-contain p-0.5"
          onError={() => setImgSrc(fallbackLogo)}
          unoptimized
        />
      </div>

      {/* Name + Description */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm uppercase tracking-tight text-primary-text group-hover:text-[#ff00ff] transition-colors truncate">
            {tool.name}
          </span>
          {tool.featured && (
            <span className="text-[8px] font-mono font-bold uppercase tracking-wider bg-[#ff00ff] text-white px-1.5 py-0.5 flex-shrink-0">
              Featured
            </span>
          )}
        </div>
        <p className="text-xs text-secondary-text truncate leading-snug mt-0.5">
          {tool.description}
        </p>
      </div>

      {/* Category pill */}
      <span className={`hidden sm:inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 border flex-shrink-0 ${getCategoryColor(tool.category)}`}>
        {tool.category}
      </span>

      {/* Date */}
      <span className="hidden md:inline-block text-[10px] font-mono text-secondary-text flex-shrink-0 w-16 text-right">
        {formatDate(tool.dateAdded)}
      </span>

      {/* Arrow */}
      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#ff00ff] transition-colors flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </div>
  );
}
