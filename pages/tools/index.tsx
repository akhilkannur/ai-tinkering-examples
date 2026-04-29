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
    const tools = [...filteredTools].sort((a, b) => a.name.localeCompare(b.name));
    const latestDropTools = chronologicalTools.slice(0, 2);
    const featuredSlugs = latestDropTools.map(t => t.name);
    
    const featured = tools.filter(t => featuredSlugs.includes(t.name));
    const regular = tools.filter(t => !featuredSlugs.includes(t.name));
    
    return [...featured, ...regular];
  }, [filteredTools, chronologicalTools]);

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
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-20 pt-8 md:pt-12 px-6">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
            Too many AI tools. <br /><span className="font-instrument font-normal italic lowercase opacity-90 text-white/90">Not enough time.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Skip the marketing hype. A weekly shortlist of handpicked tools that solve real work problems.
          </p>

          {/* Stats Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-16 border-t border-b border-white/5 py-6 md:py-8 px-12 bg-white/5 backdrop-blur-sm rounded-sm">
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
          <div className="max-w-5xl mx-auto mb-12 md:mb-20 px-6">
            <a 
              href={billboardAd.link} 
              target={billboardAd.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-sm border border-white/10 bg-black/40 backdrop-blur-md p-8 md:p-12 transition-all hover:border-white/20 shadow-2xl"
            >
              <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-black px-4 py-1 uppercase tracking-widest">Sponsored</div>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                {billboardAd.logo ? (
                  <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden p-4">
                    <Image 
                      src={billboardAd.logo} 
                      alt={billboardAd.title} 
                      width={128} 
                      height={128} 
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 md:w-32 md:h-32 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Zap className="w-10 h-10 md:w-16 md:h-16 text-white animate-pulse" />
                  </div>
                )}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-terminal-lime transition-colors tracking-tight">{billboardAd.title}</h3>
                  <p className="text-base md:text-lg text-white/50 font-medium leading-relaxed max-w-3xl">
                    {billboardAd.description}
                  </p>
                </div>
                <div className="bg-white text-black px-8 py-4 rounded-sm font-black uppercase tracking-widest text-[11px] hover:bg-terminal-lime transition-colors shadow-xl">
                  {billboardAd.ctaText}
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Floating Glass Sheet */}
        <div className="glass-sheet rounded-sm p-4 md:p-16 lg:p-24 overflow-hidden">
          
          {/* Pinned Featured Grid (2x2) */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-10">
              <Star className="w-4 h-4 text-terminal-lime fill-terminal-lime" />
              <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted">Top of Directory</h2>
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
                              <div className="flex items-center gap-3 bg-micro-fg px-6 py-2.5 rounded-sm shadow-lg border border-white/10">
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
                              {group.tools.map((tool, tIndex) => {
                                const isLatestDrop = index === 0;
                                const isFeaturedInDrop = isLatestDrop && tIndex < 2;
                                
                                return (
                                  <React.Fragment key={tool.name}>
                                    <Link href={`/tools/${slugify(tool.name)}`}>
                                      <ToolDataRow 
                                        tool={tool} 
                                        isDirectory={true} 
                                        isFeatured={isFeaturedInDrop}
                                      />
                                    </Link>
                                    
                                    {isLatestDrop && tIndex === 1 && (
                                      <a 
                                        href="https://checkout.dodopayments.com/buy/pdt_0NdjTsAfiPncaaDKhzJ79?quantity=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <div className="group flex flex-col md:flex-row md:items-center gap-6 py-10 px-8 bg-white border border-micro-layer-1 border-dashed hover:border-micro-fg transition-all cursor-pointer rounded-sm mb-4 relative overflow-hidden shadow-sm">
                                          <div className="absolute top-0 right-0 bg-micro-layer-1 text-micro-muted text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl-sm">Available</div>
                                          <div className="flex items-center gap-6 flex-shrink-0 md:w-64">
                                            <div className="w-14 h-14 rounded-sm border border-micro-layer-2 bg-micro-layer-1/50 flex items-center justify-center text-micro-muted/40 font-bold text-2xl">?</div>
                                            <div className="min-w-0">
                                              <h3 className="text-lg font-bold tracking-tight text-micro-fg/80 italic group-hover:text-micro-fg transition-colors">Featured Slot</h3>
                                              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-micro-muted">Pin to Top ($9)</span>
                                            </div>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-[15px] text-micro-muted/60 font-medium italic">Pin your tool to the top of this week's drop for maximum visibility.</p>
                                          </div>
                                          <div className="flex items-center justify-between md:justify-end gap-10 flex-shrink-0 md:w-48">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-micro-fg group-hover:underline">Secure for $9</span>
                                            <ArrowRight className="w-5 h-5 text-micro-muted group-hover:text-micro-fg group-hover:translate-x-1 transition-all" />
                                          </div>
                                        </div>
                                      </a>
                                    )}
                                  </React.Fragment>
                                );
                              })}                          
                            </div>
                          </div>
                          {inlineAds.find(ad => ad.position === index) && (
                            <div className="mb-16 md:mb-28">
                              <InlineAdBanner ad={inlineAds.find(ad => ad.position === index)!} />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                      
                      {hasMoreWeeks && !showAllWeeks && (
                        <button
                          onClick={() => setShowAllWeeks(true)}
                          className="w-full py-6 md:py-8 mt-8 md:mt-12 border border-micro-layer-1 rounded-sm bg-white text-micro-muted font-bold uppercase tracking-widest text-[11px] hover:border-micro-fg hover:text-micro-fg transition-all flex items-center justify-center gap-3 shadow-soft hover:shadow-micro"
                        >
                          Explore Older Backlog <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {alphabeticalTools.map((tool) => {
                        const isFeatured = chronologicalTools.slice(0, 2).map(t => t.name).includes(tool.name);
                        return (
                          <Link key={tool.name} href={`/tools/${slugify(tool.name)}`}>
                            <ToolTile tool={tool} isFeatured={isFeatured} />
                          </Link>
                        );
                      })}
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
      className={`group relative flex flex-col p-10 rounded-sm border transition-all ${
        ad.isPlaceholder 
        ? 'bg-white border-micro-layer-1 border-dashed hover:border-micro-fg/20' 
        : 'bg-white border-micro-layer-1 shadow-sm hover:shadow-xl hover:border-micro-fg/40'
      }`}
    >
      {!ad.isPlaceholder && (
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 bg-white rounded-sm border border-micro-layer-1 p-2 overflow-hidden flex items-center justify-center shadow-sm">
            {ad.logo ? (
              <Image src={ad.logo} alt={ad.title} width={32} height={32} className="object-contain" unoptimized />
            ) : (
              <div className="w-full h-full bg-micro-layer-1 flex items-center justify-center text-micro-fg font-bold">{ad.title[0]}</div>
            )}
          </div>
          <div className="bg-black text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm">Featured Spot</div>
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-3 flex items-center gap-3 tracking-tight ${ad.isPlaceholder ? 'text-micro-muted' : 'text-micro-fg'}`}>
        {ad.title}
        {!ad.isPlaceholder && <ExternalLink className="w-4 h-4 text-micro-muted group-hover:text-micro-fg transition-colors" />}
      </h3>
      <p className={`text-[15px] font-medium leading-relaxed mb-8 ${ad.isPlaceholder ? 'text-micro-muted/60 italic' : 'text-micro-muted'}`}>
        {ad.description}
      </p>
      <div className="mt-auto pt-6 border-t border-micro-layer-1 flex items-center justify-between">
        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${ad.isPlaceholder ? 'text-micro-muted/50' : 'text-micro-fg group-hover:text-black'}`}>
          {ad.isPlaceholder ? 'Promote Your Tool' : 'Explore Tool'}
        </span>
        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${ad.isPlaceholder ? 'text-micro-muted/30' : 'text-micro-fg'}`} />
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
      className={`group flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-sm border transition-all ${
        ad.isPlaceholder
        ? 'bg-white border-micro-layer-1 border-dashed text-center md:text-left hover:border-micro-fg/20'
        : 'bg-micro-fg border-white/10 text-white hover:shadow-2xl'
      }`}
    >
      <div className="flex items-center gap-8 flex-1">
        {!ad.isPlaceholder && ad.logo && (
          <div className="w-16 h-16 bg-white rounded-sm p-3 flex-shrink-0 shadow-lg hidden md:flex items-center justify-center overflow-hidden">
            <Image src={ad.logo} alt={ad.title} width={48} height={48} className="object-contain" unoptimized />
          </div>
        )}
        <div>
          <h3 className={`text-xl font-bold mb-2 tracking-tight ${ad.isPlaceholder ? 'text-micro-muted' : 'text-white'}`}>
            {ad.title}
          </h3>
          <p className={`text-base font-medium ${ad.isPlaceholder ? 'text-micro-muted/60' : 'text-white/50'}`}>
            {ad.description}
          </p>
        </div>
      </div>
      <div className={`px-8 py-4 rounded-sm font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap shadow-xl ${
        ad.isPlaceholder
        ? 'bg-white text-micro-muted border border-micro-layer-2 group-hover:border-micro-fg group-hover:text-micro-fg'
        : 'bg-white text-black hover:bg-terminal-lime'
      }`}>
        {ad.ctaText || 'Learn More'}
      </div>
    </a>
  );
}

function ToolTile({ tool, isFeatured }: { tool: AiTool, isFeatured?: boolean }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div className={`group flex flex-col h-full rounded-sm p-6 transition-all cursor-pointer border ${isFeatured ? 'bg-white border-micro-fg shadow-xl z-10' : 'bg-white border-micro-layer-1 hover:border-micro-fg hover:shadow-micro'}`}>
      <div className="flex items-center gap-4 mb-4 relative">
        {isFeatured && (
          <div className="absolute -top-10 -left-2 bg-black text-white text-[7px] font-black px-1.5 py-0.5 uppercase tracking-widest rounded-sm shadow-sm">Featured</div>
        )}
        <div className={`w-12 h-12 rounded-sm border bg-white flex-shrink-0 flex items-center justify-center p-2 overflow-hidden transition-colors shadow-sm ${isFeatured ? 'border-micro-fg' : 'border-micro-layer-1 group-hover:border-micro-fg'}`}>
          <Image
            src={imgSrc}
            alt={tool.name}
            width={44}
            height={44}
            className="object-contain"
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`text-base font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4 truncate ${isFeatured ? 'text-black' : 'text-micro-fg'}`}>
            {tool.name}
          </h3>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isFeatured ? 'text-black/60' : 'text-micro-muted'}`}>
            {tool.category}
          </span>
        </div>
      </div>

      <p className={`text-[13.5px] font-medium leading-relaxed line-clamp-2 flex-1 mb-5 ${isFeatured ? 'text-black/80' : 'text-micro-muted'}`}>
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-micro-layer-1">
        <span className={`text-[10px] font-bold w-20 text-center py-1 rounded-sm flex-shrink-0 ${isFeatured ? 'bg-black text-white' : 'bg-micro-layer-1 text-micro-fg'}`}>
          {tool.tags.price}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isFeatured ? 'text-black' : 'text-micro-muted'}`}>
          {hostname}
        </span>
      </div>
    </div>
  );
}

function ToolDataRow({ tool, isDirectory, isFeatured }: { tool: AiTool, isDirectory?: boolean, isFeatured?: boolean }) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  return (
    <div
      className={`group flex flex-col md:flex-row md:items-center gap-6 py-8 px-6 -mx-6 transition-all cursor-pointer rounded-sm border border-transparent ${isFeatured ? 'bg-micro-layer-1/20 border-l-4 border-l-black' : 'hover:bg-white hover:border-micro-layer-1 hover:shadow-soft'}`}
    >
      {/* Logo & Name Mobile Group */}
      <div className="flex items-center gap-6 flex-shrink-0 md:w-64 relative">
        {isFeatured && (
          <div className="absolute -top-3 -left-3 bg-black text-white text-[7px] font-black px-1.5 py-0.5 uppercase tracking-widest rounded-sm z-10 shadow-sm">Featured</div>
        )}
        <div className={`w-14 h-14 rounded-sm border bg-white flex-shrink-0 flex items-center justify-center p-2.5 overflow-hidden transition-colors shadow-sm ${isFeatured ? 'border-black' : 'border-micro-layer-1 group-hover:border-micro-fg'}`}>
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
          <h3 className={`text-lg font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-black' : 'text-micro-fg'}`}>
            {tool.name}
          </h3>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isFeatured ? 'text-black/60' : 'text-micro-muted'}`}>
            {tool.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className={`text-[16px] font-medium leading-relaxed ${isDirectory ? 'truncate' : ''} ${isFeatured ? 'text-black/80' : 'text-micro-muted'}`}>
          {tool.description}
        </p>
      </div>

      {/* Pricing & Link */}
      <div className="flex items-center justify-between md:justify-end gap-10 flex-shrink-0 md:w-48">
        <span className={`text-xs font-bold w-24 text-center py-1.5 rounded-sm flex-shrink-0 ${isFeatured ? 'bg-black text-white' : 'bg-micro-layer-1 text-micro-fg'}`}>
          {tool.tags.price}
        </span>
        <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-all ${isFeatured ? 'text-black' : 'text-micro-muted group-hover:text-micro-fg'}`} />
      </div>
    </div>
  );
}
