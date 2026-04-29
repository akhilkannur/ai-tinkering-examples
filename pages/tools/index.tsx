import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { adSpots, featuredPlaceholders, AdSpot } from '../../lib/ads-data';
import { ArrowRight, ChevronDown, List, LayoutGrid, Zap, Star, ExternalLink } from 'lucide-react';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

// Group tools by week label (Sunday publication)
function getWeekLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  // Adjust to the following Sunday (if not already Sunday)
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  
  const datePart = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  return `DROP / ${datePart}`;
}

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllWeeks, setShowAllWeeks] = useState(false);
  const [viewMode, setViewMode] = useState<'drops' | 'directory'>('drops');

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools
      .filter(tool => {
        return selectedCategory === 'All' || tool.category === selectedCategory;
      });
  }, [selectedCategory]);

  const chronologicalTools = useMemo(() => {
    return [...filteredTools].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }, [filteredTools]);

  const alphabeticalTools = useMemo(() => {
    return [...filteredTools].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredTools]);

  // Group by week
  const groupedWeeks = useMemo(() => {
    const groups: { label: string; tools: AiTool[] }[] = [];
    const map = new Map<string, AiTool[]>();

    chronologicalTools.forEach(tool => {
      const label = getWeekLabel(tool.dateAdded);
      if (!map.has(label)) {
        map.set(label, []);
        groups.push({ label, tools: map.get(label)! });
      }
      map.get(label)!.push(tool);
    });

    return groups;
  }, [chronologicalTools]);

  const visibleGroups = showAllWeeks ? groupedWeeks : groupedWeeks.slice(0, 4);
  const hasMoreWeeks = groupedWeeks.length > 4;

  const billboardAd = adSpots.find(ad => ad.type === 'billboard' && ad.active);
  const inlineAds = adSpots.filter(ad => ad.type === 'inline' && ad.active);

  return (
    <div>
      <Head>
        <title>Weekly AI Drops: New Tools & Real Use Cases for Tinkerers</title>
        <meta name="description" content={`Every Sunday, we drop the latest AI tools from independent makers and real-world use cases. ${aiTools.length} tools curated for non-technical tinkerers.`} key="description" />
      </Head>

      <div>
        {/* Hero */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20 pt-8 md:pt-12">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
            Too many AI tools. <br /><span className="font-instrument font-normal italic lowercase opacity-90">Not enough time.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Skip the marketing hype. A weekly shortlist of handpicked tools that solve real work problems.
          </p>

          {/* Stats Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-16 border-t border-b border-white/10 py-6 md:py-8 px-12 bg-black/20 backdrop-blur-sm rounded-sm">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-terminal-lime mb-1">{aiTools.length}+</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Tools Curated</div>
            </div>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{categories.length - 1}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Categories</div>
            </div>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">SUNDAY</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Weekly Drop</div>
            </div>
          </div>
        </div>

        {/* Billboard Ad */}
        {billboardAd && (
          <div className="max-w-5xl mx-auto mb-12 md:mb-20">
            <a 
              href={billboardAd.link} 
              target={billboardAd.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-sm border border-terminal-lime/30 bg-black/40 backdrop-blur-md p-8 md:p-12 transition-all hover:border-terminal-lime"
            >
              <div className="absolute top-0 right-0 bg-terminal-lime text-black text-[10px] font-black px-4 py-1 uppercase tracking-widest">Premium Billboard</div>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-20 h-20 md:w-32 md:h-32 bg-terminal-lime/10 border border-terminal-lime/20 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Zap className="w-10 h-10 md:w-16 md:h-16 text-terminal-lime animate-pulse" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-terminal-lime transition-colors">{billboardAd.title}</h3>
                  <p className="text-base md:text-xl text-white/70 font-medium leading-relaxed max-w-3xl">
                    {billboardAd.description}
                  </p>
                </div>
                <div className="bg-terminal-lime text-black px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                  {billboardAd.ctaText}
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Floating Glass Sheet */}
        <div className="glass-sheet rounded-sm md:rounded-sm p-4 md:p-16 lg:p-24 overflow-hidden">
          
          {/* Pinned Featured Grid (2x2) */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-10">
              <Star className="w-4 h-4 text-terminal-lime fill-terminal-lime" />
              <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted">Pinned Featured Tools</h2>
              <div className="h-[1px] flex-grow bg-micro-layer-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPlaceholders.map((ad) => (
                <FeaturedCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>

          {/* Filters & View Toggle */}
          <div className="mb-8 md:mb-16 sticky top-4 z-40 bg-white/80 backdrop-blur-2xl py-4 px-4 md:py-6 md:px-8 rounded-sm border border-white/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 flex-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 md:px-5 py-1.5 md:py-2 rounded-sm text-[10px] md:text-[12px] font-bold transition-all whitespace-nowrap border ${
                    selectedCategory === cat 
                    ? 'bg-micro-fg border-micro-fg text-white shadow-lg' 
                    : 'bg-white/50 border-white/20 text-micro-muted hover:border-micro-fg/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-micro-layer-1 p-1 rounded-sm border border-micro-layer-2">
              <button
                onClick={() => setViewMode('drops')}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === 'drops' ? 'bg-white text-micro-fg shadow-sm' : 'text-micro-muted hover:text-micro-fg'
                }`}
              >
                <List className="w-3 h-3" /> Drops
              </button>
              <button
                onClick={() => setViewMode('directory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === 'directory' ? 'bg-white text-micro-fg shadow-sm' : 'text-micro-muted hover:text-micro-fg'
                }`}
              >
                <LayoutGrid className="w-3 h-3" /> Directory
              </button>
            </div>
          </div>

          {/* Main Content: Tools List (Full Width) */}
          <div className="max-w-full">
              {filteredTools.length === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-micro-layer-2 rounded-sm bg-micro-layer-1/30">
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
                  {viewMode === 'drops' ? (
                    <>
                      {visibleGroups.map((group, index) => (
                        <React.Fragment key={group.label}>
                          <div className="mb-16 md:mb-28">
                            <div className="flex items-center gap-6 mb-10 md:mb-14">
                              <div className="flex items-center gap-3 bg-micro-fg px-6 py-2.5 rounded-sm shadow-lg">
                                <span className="w-2 h-2 rounded-sm bg-terminal-lime animate-pulse"></span>
                                <h2 className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
                                  {group.label}
                                </h2>
                              </div>
                              <div className="h-[1px] flex-grow bg-micro-layer-1"></div>
                              <span className="text-[10px] md:text-[11px] font-bold text-micro-muted uppercase tracking-[0.2em] whitespace-nowrap">
                                {group.tools.length} TOOLS
                              </span>
                            </div>
                            <div className="divide-y divide-micro-layer-1">
                              {group.tools.map((tool) => (
                               <Link key={tool.name} href={`/tools/${slugify(tool.name)}`}>
                                 <ToolDataRow tool={tool} isDirectory={true} />
                               </Link>
                              ))}                          
                            </div>
                          </div>
                          {/* Inject Inline Ads */}
                          {inlineAds.find(ad => ad.position === index) && (
                            <div className="mb-16 md:mb-28">
                              <InlineAdBanner ad={inlineAds.find(ad => ad.position === index)!} />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                      
                      {/* Show More Weeks */}
                      {hasMoreWeeks && !showAllWeeks && (
                        <button
                          onClick={() => setShowAllWeeks(true)}
                          className="w-full py-6 md:py-8 mt-8 md:mt-12 border border-micro-layer-1 rounded-sm md:rounded-sm bg-white text-micro-muted font-bold uppercase tracking-widest text-[11px] hover:border-micro-fg hover:text-micro-fg transition-all flex items-center justify-center gap-3 shadow-soft hover:shadow-micro"
                        >
                          Explore Older Backlog <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {alphabeticalTools.map((tool) => (
                        <Link key={tool.name} href={`/tools/${slugify(tool.name)}`}>
                          <ToolTile tool={tool} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
</div>
  );
}

function FeaturedCard({ ad }: { ad: AdSpot }) {
  return (
    <a 
      href={ad.link} 
      target={ad.link.startsWith('http') ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`group relative flex flex-col p-8 rounded-sm border transition-all ${
        ad.isPlaceholder 
        ? 'bg-micro-layer-1/50 border-micro-layer-2 border-dashed hover:border-micro-fg/30' 
        : 'bg-white border-terminal-lime shadow-lg hover:shadow-xl'
      }`}
    >
      {!ad.isPlaceholder && <div className="absolute top-4 right-4 bg-terminal-lime text-black text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm">Featured</div>}
      <h3 className="text-xl font-bold text-micro-fg mb-3 flex items-center gap-3">
        {ad.title}
        {!ad.isPlaceholder && <ExternalLink className="w-4 h-4 text-micro-muted group-hover:text-micro-fg transition-colors" />}
      </h3>
      <p className="text-sm text-micro-muted font-medium leading-relaxed mb-6">
        {ad.description}
      </p>
      <div className="mt-auto pt-4 border-t border-micro-layer-1 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-micro-muted group-hover:text-micro-fg transition-colors">
          {ad.isPlaceholder ? 'Promote Your Tool' : 'View Tool'}
        </span>
        <ArrowRight className="w-3 h-3 text-micro-muted group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
}

function InlineAdBanner({ ad }: { ad: AdSpot }) {
  return (
    <a 
      href={ad.link} 
      target={ad.link.startsWith('http') ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`group flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-sm border transition-all ${
        ad.isPlaceholder
        ? 'bg-micro-layer-1/30 border-micro-layer-2 border-dashed text-center md:text-left'
        : 'bg-micro-fg border-micro-fg text-white hover:shadow-micro'
      }`}
    >
      <div className="flex-1">
        <h3 className={`text-lg font-bold mb-2 ${ad.isPlaceholder ? 'text-micro-fg' : 'text-white'}`}>
          {ad.title}
        </h3>
        <p className={`text-sm font-medium ${ad.isPlaceholder ? 'text-micro-muted' : 'text-white/60'}`}>
          {ad.description}
        </p>
      </div>
      <div className={`px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-[11px] transition-all whitespace-nowrap ${
        ad.isPlaceholder
        ? 'bg-white text-micro-muted border border-micro-layer-2 group-hover:border-micro-fg group-hover:text-micro-fg'
        : 'bg-terminal-lime text-black'
      }`}>
        {ad.ctaText || 'Learn More'}
      </div>
    </a>
  );
}

function ToolTile({ tool }: { tool: AiTool }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div className="group flex flex-col h-full bg-white border border-micro-layer-1 rounded-sm p-5 hover:border-micro-fg hover:shadow-micro transition-all cursor-pointer">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-sm border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden group-hover:border-micro-fg transition-colors shadow-sm">
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
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold tracking-tight text-micro-fg group-hover:underline decoration-2 underline-offset-4 truncate">
            {tool.name}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-micro-muted">
            {tool.category}
          </span>
        </div>
      </div>

      <p className="text-[13px] text-micro-muted font-medium leading-relaxed line-clamp-2 flex-1 mb-4">
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-micro-layer-1">
        <span className="text-[10px] font-bold text-micro-fg bg-micro-layer-1 w-20 text-center py-1 rounded-sm flex-shrink-0">
          {tool.tags.price}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-micro-muted">
          {hostname}
        </span>
      </div>
    </div>
  );
}

function ToolDataRow({ tool, isDirectory }: { tool: AiTool, isDirectory?: boolean }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div
      className="group flex flex-col md:flex-row md:items-center gap-6 py-8 px-6 -mx-6 hover:bg-white transition-all cursor-pointer rounded-sm border border-transparent hover:border-micro-layer-1 hover:shadow-soft"
    >
      {/* Logo & Name Mobile Group */}
      <div className="flex items-center gap-6 flex-shrink-0 md:w-64">
        <div className="w-14 h-14 rounded-sm border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-2.5 overflow-hidden group-hover:border-micro-fg transition-colors shadow-sm">
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
          <h3 className="text-lg font-bold tracking-tight text-micro-fg group-hover:underline decoration-2 underline-offset-4">
            {tool.name}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-micro-muted">
            {tool.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className={`text-[16px] text-micro-muted font-medium leading-relaxed ${isDirectory ? 'truncate' : ''}`}>
          {tool.description}
        </p>
      </div>

      {/* Pricing & Link */}
      <div className="flex items-center justify-between md:justify-end gap-10 flex-shrink-0 md:w-48">
        <span className="text-xs font-bold text-micro-fg bg-micro-layer-1 w-24 text-center py-1.5 rounded-sm flex-shrink-0">
          {tool.tags.price}
        </span>
        <ArrowRight className="w-5 h-5 text-micro-muted group-hover:text-micro-fg group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
