import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { adSpots, featuredPlaceholders, AdSpot } from '../../lib/ads-data';
import { ArrowRight, ChevronDown, List, LayoutGrid, Megaphone, Crown, ExternalLink } from 'lucide-react';

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
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-16 pt-8 md:pt-12 px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-[0.9] text-white drop-shadow-md">
            Too many AI tools. <br /><span className="font-instrument font-normal italic lowercase opacity-90 text-white/90">Not enough time.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10 text-balance">
            Skip the marketing hype. A weekly shortlist of handpicked tools that solve real work problems.
          </p>

          {/* Stats Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-12 border-t border-b border-white/5 py-4 md:py-6 px-10 bg-white/5 backdrop-blur-sm rounded-sm">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-terminal-lime mb-0.5">{aiTools.length}+</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Tools Curated</div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-white mb-0.5">{categories.length - 1}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Categories</div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-white mb-0.5">SUNDAY</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Weekly Drop</div>
            </div>
          </div>
        </div>

        {/* Billboard Ad (Refined & Smaller) */}
        {billboardAd && (
          <div className="max-w-4xl mx-auto mb-12 md:mb-20 px-6">
            <a 
              href={billboardAd.link} 
              target={billboardAd.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-sm border border-white/5 bg-coffee-900/80 backdrop-blur-md p-6 md:p-10 transition-all hover:border-[#064e3b]/30 shadow-xl"
            >
              <div className="absolute top-0 right-0 bg-[#064e3b] text-white text-[8px] font-black px-4 py-1 uppercase tracking-widest shadow-lg">Partner Spotlight</div>
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10">
                {billboardAd.logo ? (
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden p-3">
                    <Image 
                      src={billboardAd.logo} 
                      alt={billboardAd.title} 
                      width={96} 
                      height={96} 
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-8 h-8 text-[#064e3b] animate-pulse" />
                  </div>
                )}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors tracking-tight">{billboardAd.title}</h3>
                  <p className="text-sm md:text-base text-white/50 font-medium leading-relaxed max-w-2xl">
                    {billboardAd.description}
                  </p>
                </div>
                <div className="bg-[#064e3b] text-white px-6 py-3 rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all shadow-lg border border-[#064e3b]">
                  {billboardAd.ctaText}
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Floating Glass Sheet */}
        <div className="glass-sheet rounded-sm p-4 md:p-12 lg:p-20 overflow-hidden">
          
          {/* Pinned Featured Grid (Refined Sizing) */}
          <div className="mb-12 md:mb-24">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <Crown className="w-4 h-4 text-[#064e3b]" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-micro-muted">Featured Selection</h2>
              <div className="h-[1px] flex-grow bg-micro-layer-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featuredPlaceholders.map((ad) => (
                <FeaturedCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>

          {/* Filters & View Toggle */}
          <div className="mb-8 md:mb-12 sticky top-4 z-40 bg-white/90 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-8 rounded-sm border border-white/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 flex-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 md:px-4 py-1.5 md:py-1.5 rounded-sm text-[9px] md:text-[11px] font-bold transition-all whitespace-nowrap border ${
                    selectedCategory === cat 
                    ? 'bg-micro-fg border-micro-fg text-white shadow-lg' 
                    : 'bg-white/50 border-white/10 text-micro-muted hover:border-micro-fg/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-micro-layer-1 p-1 rounded-sm border border-micro-layer-2">
              <button
                onClick={() => setViewMode('drops')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all ${
                  viewMode === 'drops' ? 'bg-white text-micro-fg shadow-sm' : 'text-micro-muted hover:text-micro-fg'
                }`}
              >
                <List className="w-3 h-3" /> Drops
              </button>
              <button
                onClick={() => setViewMode('directory')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all ${
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
                          <div className="mb-12 md:mb-20">
                            <div className="flex items-center gap-6 mb-8 md:mb-10">
                              <div className="flex items-center gap-3 bg-micro-fg px-5 py-2 rounded-sm shadow-lg">
                                <span className="w-1.5 h-1.5 rounded-sm bg-terminal-lime animate-pulse"></span>
                                <h2 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
                                  {group.label}
                                </h2>
                              </div>
                              <div className="h-[1px] flex-grow bg-micro-layer-1"></div>
                              <span className="text-[9px] md:text-[10px] font-bold text-micro-muted uppercase tracking-[0.2em] whitespace-nowrap">
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
                                      <div className={`${isFeaturedInDrop ? 'bg-[#f0fdf4]' : ''}`}>
                                        <ToolDataRow 
                                          tool={tool} 
                                          isDirectory={true} 
                                          isFeatured={isFeaturedInDrop}
                                        />
                                      </div>
                                    </Link>
                                    
                                    {/* Weekly Drop Placeholder as 3rd item */}
                                    {isLatestDrop && tIndex === 1 && (
                                      <a 
                                        href="https://checkout.dodopayments.com/buy/pdt_0NdjTsAfiPncaaDKhzJ79?quantity=1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <div className="group flex flex-col md:flex-row md:items-center gap-6 py-10 px-8 bg-[#f0fdf4] border border-micro-layer-1 border-dashed hover:border-[#064e3b]/40 transition-all cursor-pointer rounded-sm mb-4 relative overflow-hidden shadow-sm">
                                          <div className="absolute top-0 right-0 bg-[#064e3b] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl-sm">Available</div>
                                          <div className="flex items-center gap-6 flex-shrink-0 md:w-64">
                                            <div className="w-12 h-12 rounded-sm border border-coffee-200 bg-white flex items-center justify-center text-[#064e3b]/40 font-bold text-xl shadow-inner-soft">?</div>
                                            <div className="min-w-0">
                                              <h3 className="text-base font-bold tracking-tight text-[#064e3b] italic group-hover:underline decoration-2 underline-offset-4">Featured Slot</h3>
                                              <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#064e3b]/60">Pin to Top ($9)</span>
                                            </div>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[#064e3b]/70 font-medium italic leading-relaxed text-balance">Pin your tool to the top of this week's drop for maximum community visibility.</p>
                                          </div>
                                          <div className="flex items-center justify-between md:justify-end gap-10 flex-shrink-0 md:w-48">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#064e3b] group-hover:underline decoration-2 underline-offset-8 transition-all">Secure for $9</span>
                                            <ArrowRight className="w-4 h-4 text-[#064e3b] group-hover:translate-x-1 transition-all" />
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
                            <div className="mb-16 md:mb-28 px-4 md:px-0">
                              <InlineAdBanner ad={inlineAds.find(ad => ad.position === index)!} />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                      
                      {/* Show More Weeks */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      className={`group relative flex flex-col p-8 md:p-10 rounded-sm border transition-all ${
        ad.isPlaceholder 
        ? 'bg-white border-micro-layer-2 border-dashed hover:border-[#064e3b]/20 shadow-inner-soft' 
        : 'bg-[#f0fdf4] border-[#064e3b]/20 shadow-sm hover:shadow-xl hover:border-[#064e3b]/40'
      }`}
    >
      {!ad.isPlaceholder && (
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 bg-white rounded-sm border border-coffee-200 p-2 overflow-hidden flex items-center justify-center shadow-md">
            {ad.logo ? (
              <Image src={ad.logo} alt={ad.title} width={32} height={32} className="object-contain" unoptimized />
            ) : (
              <div className="w-full h-full bg-coffee-100 flex items-center justify-center text-coffee-800 font-bold">{ad.title[0]}</div>
            )}
          </div>
          <div className="bg-[#064e3b] text-white text-[8px] font-black px-2.5 py-0.5 uppercase tracking-widest rounded-sm shadow-md">Selection</div>
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-3 flex items-center gap-3 tracking-tight ${ad.isPlaceholder ? 'text-micro-muted' : 'text-[#064e3b]'}`}>
        {ad.title}
        {!ad.isPlaceholder && <ExternalLink className="w-4 h-4 text-[#064e3b]/40 group-hover:text-[#064e3b] transition-colors" />}
      </h3>
      <p className={`text-sm md:text-[15px] font-medium leading-relaxed mb-8 ${ad.isPlaceholder ? 'text-micro-muted/60 italic' : 'text-[#064e3b]/70'}`}>
        {ad.description}
      </p>
      <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${ad.isPlaceholder ? 'text-micro-muted/50' : 'text-[#064e3b] group-hover:underline decoration-2 underline-offset-4'}`}>
          {ad.isPlaceholder ? 'Claim This Spot' : 'Explore Tool'}
        </span>
        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${ad.isPlaceholder ? 'text-micro-muted/30' : 'text-[#064e3b]'}`} />
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
      className={`group flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 rounded-sm border transition-all ${
        ad.isPlaceholder
        ? 'bg-white border-micro-layer-1 border-dashed text-center md:text-left hover:border-blue-500/20 shadow-sm shadow-inner-soft'
        : 'bg-coffee-900 border-white/10 text-white hover:shadow-xl'
      }`}
    >
      <div className="flex items-center gap-8 flex-1">
        {!ad.isPlaceholder && ad.logo && (
          <div className="w-16 h-16 bg-white rounded-sm p-3 flex-shrink-0 shadow-lg hidden md:flex items-center justify-center overflow-hidden">
            <Image src={ad.logo} alt={ad.title} width={48} height={48} className="object-contain" unoptimized />
          </div>
        )}
        <div>
          <h3 className={`text-lg md:text-xl font-bold mb-1.5 tracking-tight ${ad.isPlaceholder ? 'text-micro-muted' : 'text-white'}`}>
            {ad.title}
          </h3>
          <p className={`text-sm md:text-base font-medium ${ad.isPlaceholder ? 'text-micro-muted/60' : 'text-white/50'}`}>
            {ad.description}
          </p>
        </div>
      </div>
      <div className={`px-8 py-4 rounded-sm font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap shadow-xl ${
        ad.isPlaceholder
        ? 'bg-white text-micro-muted border border-micro-layer-2 group-hover:border-blue-500 group-hover:text-blue-700'
        : 'bg-blue-600 text-white hover:bg-white hover:text-black border border-blue-500'
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
    <div className={`group flex flex-col h-full rounded-sm p-6 md:p-8 transition-all cursor-pointer border ${isFeatured ? 'bg-[#f0fdf4] border-[#064e3b]/30 shadow-xl z-10' : 'bg-white border-micro-layer-1 hover:border-micro-fg hover:shadow-micro'}`}>
      <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-6 relative">
        {isFeatured && (
          <div className="absolute -top-10 -left-2 bg-[#064e3b] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm shadow-lg">Featured Selection</div>
        )}
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-sm border bg-white flex-shrink-0 flex items-center justify-center p-2 md:p-2.5 overflow-hidden transition-colors shadow-sm ${isFeatured ? 'border-[#064e3b]/30' : 'border-micro-layer-1 group-hover:border-micro-fg'}`}>
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
        <div className="min-w-0 flex-1">
          <h3 className={`text-base md:text-lg font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4 truncate ${isFeatured ? 'text-[#064e3b]' : 'text-micro-fg'}`}>
            {tool.name}
          </h3>
          <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] ${isFeatured ? 'text-[#064e3b]/60' : 'text-micro-muted'}`}>
            {tool.category}
          </span>
        </div>
      </div>

      <p className={`text-[14px] md:text-[15px] font-medium leading-relaxed line-clamp-2 flex-1 mb-5 md:mb-6 ${isFeatured ? 'text-[#064e3b]/80' : 'text-micro-muted'}`}>
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 md:pt-5 border-t border-black/5">
        <span className={`text-[9px] md:text-[10px] font-bold w-20 md:w-22 text-center py-1.5 rounded-sm flex-shrink-0 ${isFeatured ? 'bg-[#064e3b] text-white shadow-md' : 'bg-micro-layer-1 text-micro-fg'}`}>
          {tool.tags.price}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isFeatured ? 'text-[#064e3b]' : 'text-micro-muted'}`}>
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
      className={`group flex flex-col md:flex-row md:items-center gap-6 md:gap-8 py-8 md:py-10 px-6 md:px-8 -mx-6 md:-mx-8 transition-all cursor-pointer rounded-sm border border-transparent ${isFeatured ? '' : 'hover:bg-white hover:border-micro-layer-1 hover:shadow-soft'}`}
    >
      {/* Logo & Name Mobile Group */}
      <div className="flex items-center gap-6 md:gap-8 flex-shrink-0 md:w-72 relative">
        {isFeatured && (
          <div className="absolute -top-3 -left-3 bg-[#064e3b] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm z-10 shadow-lg">Featured</div>
        )}
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-sm border bg-white flex-shrink-0 flex items-center justify-center p-2.5 md:p-3 overflow-hidden transition-colors shadow-sm ${isFeatured ? 'border-[#064e3b]/30' : 'border-micro-layer-1 group-hover:border-micro-fg'}`}>
          <Image
            src={imgSrc}
            alt={tool.name}
            width={64}
            height={64}
            className="object-contain"
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized
          />
        </div>

        <div className="min-w-0">
          <h3 className={`text-lg md:text-xl font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-[#064e3b]' : 'text-micro-fg'}`}>
            {tool.name}
          </h3>
          <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] ${isFeatured ? 'text-[#064e3b]/60' : 'text-micro-muted'}`}>
            {tool.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className={`text-[15px] md:text-[17px] font-medium leading-relaxed ${isDirectory ? 'truncate' : ''} ${isFeatured ? 'text-[#064e3b]/80' : 'text-micro-muted'}`}>
          {tool.description}
        </p>
      </div>

      {/* Pricing & Link */}
      <div className="flex items-center justify-between md:justify-end gap-10 md:gap-12 flex-shrink-0 md:w-56">
        <span className={`text-[10px] md:text-xs font-bold w-24 md:w-28 text-center py-1.5 md:py-2 rounded-sm flex-shrink-0 ${isFeatured ? 'bg-[#064e3b] text-white shadow-md' : 'bg-micro-layer-1 text-micro-fg'}`}>
          {tool.tags.price}
        </span>
        <ArrowRight className={`w-5 h-5 group-hover:translate-x-2 transition-all ${isFeatured ? 'text-[#064e3b]' : 'text-micro-muted group-hover:text-micro-fg'}`} />
      </div>
    </div>
  );
}
