import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { adSpots, featuredPlaceholders, AdSpot } from '../../lib/ads-data';
import { ArrowRight, ChevronDown, List, LayoutGrid, Megaphone, Crown, ExternalLink, TrendingUp, Clock } from 'lucide-react';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

function addRef(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set('ref', 'realaiexamples');
    return u.toString();
  } catch {
    return url;
  }
}

// Group tools by week label (Sunday publication)
function getWeekLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  const datePart = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  return `DROP / ${datePart}`;
}

export default function ToolsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllWeeks, setShowAllWeeks] = useState(false);
  const [viewMode, setViewMode] = useState<'drops' | 'directory'>('drops');
  const [activeWeek, setActiveWeek] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const weekRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const weekNavRef = useRef<HTMLDivElement>(null);
  const isScrollingTo = useRef(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setFormStatus('success');
        setEmail('');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const scrollToWeek = useCallback((label: string) => {
    const el = weekRefs.current.get(label);
    if (!el) return;
    isScrollingTo.current = true;
    setActiveWeek(label);
    const offset = 160;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => { isScrollingTo.current = false; }, 800);
  }, []);

  useEffect(() => {
    if (!activeWeek || !weekNavRef.current) return;
    const nav = weekNavRef.current;
    const btn = nav.querySelector(`[data-week-btn="${activeWeek}"]`) as HTMLElement | null;
    if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeWeek]);

  useEffect(() => {
    if (viewMode !== 'drops') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveWeek(entry.target.getAttribute('data-week') || null);
            break;
          }
        }
      },
      { rootMargin: '-160px 0px -60% 0px', threshold: 0 }
    );
    weekRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [viewMode, showAllWeeks, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => selectedCategory === 'All' || tool.category === selectedCategory);
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

  // Last week's picks = 2nd group's first 3 tools (the previous week)
  const lastWeekPicks = groupedWeeks.length > 1 ? groupedWeeks[1].tools.slice(0, 3) : [];
  const lastWeekLabel = groupedWeeks.length > 1 ? groupedWeeks[1].label : '';

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
            Every Sunday, we handpick a shortlist of AI tools that solve real work problems.
          </p>

          <div className="flex flex-col items-center gap-10 mb-16">
            {formStatus === 'success' ? (
              <div className="px-12 py-6 bg-white rounded-sm font-bold text-micro-fg shadow-xl">
                ✓ Check your inbox to confirm
              </div>
            ) : (
              <form className="flex w-full max-w-2xl p-1.5 md:p-2.5 bg-white/90 backdrop-blur-2xl rounded-sm border border-white/30 shadow-2xl" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="flex-1 bg-transparent px-4 md:px-8 py-3 md:py-4 outline-none text-sm md:text-[18px] font-medium text-micro-fg placeholder:text-micro-muted min-w-0"
                  placeholder="Get weekly drops"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={formStatus === 'loading'}
                />
                <button type="submit" className="px-6 md:px-12 py-3 md:py-5 bg-white text-micro-fg rounded-sm font-extrabold text-xs md:text-sm uppercase tracking-wider hover:bg-micro-layer-1 transition-all shadow-lg active:scale-95 flex-shrink-0" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? '...' : 'Join Free'}
                </button>
              </form>
            )}
            <p className="text-[13px] font-bold text-white uppercase tracking-[0.15em] opacity-80">
              Join 400+ AI Native Operators
            </p>
          </div>

          {/* Stats Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-12 border-t border-b border-white/5 py-4 md:py-6 px-10 bg-white/5 backdrop-blur-sm rounded-sm">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-terminal-lime mb-0.5">300+</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Tools Curated</div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-white mb-0.5">{groupedWeeks.length}</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Weekly Drops</div>
            </div>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-white mb-0.5">SUNDAY</div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Next Drop</div>
            </div>
          </div>
        </div>

        {/* Main Layout: Content + Sidebar */}
        <div className="glass-sheet rounded-sm p-4 md:p-8 lg:p-10 overflow-hidden max-w-[1400px] mx-auto">

          {/* Filters & View Toggle - Full Width */}
          <div className="mb-8 md:mb-10 sticky top-4 z-40 bg-white/90 backdrop-blur-2xl py-3 px-4 md:py-4 md:px-8 rounded-sm border border-white/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
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

          {/* Week Nav Bar — Drops view only */}
          {viewMode === 'drops' && groupedWeeks.length > 1 && (
            <div
              ref={weekNavRef}
              className="mb-8 md:mb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-micro-muted mr-2 flex-shrink-0">Jump to:</span>
              {(showAllWeeks ? groupedWeeks : groupedWeeks.slice(0, 4)).map((group, i) => {
                const shortLabel = group.label.replace('DROP / ', '');
                const isActive = activeWeek === group.label || (!activeWeek && i === 0);
                return (
                  <button
                    key={group.label}
                    data-week-btn={group.label}
                    onClick={() => {
                      scrollToWeek(group.label);
                    }}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-sm text-[10px] font-bold transition-all border whitespace-nowrap ${
                      isActive
                        ? 'bg-micro-fg border-micro-fg text-white shadow-lg'
                        : 'bg-white/50 border-micro-layer-1 text-micro-muted hover:border-micro-fg/30 hover:text-micro-fg'
                    }`}
                  >
                    {i === 0 ? `${shortLabel} ✦` : shortLabel}
                    <span className="ml-1.5 opacity-50">{group.tools.length}</span>
                  </button>
                );
              })}
            </div>
          )}

          {filteredTools.length === 0 ? (
            <div className="py-24 text-center border-2 border-dashed border-micro-layer-2 rounded-sm bg-micro-layer-1/30">
              <p className="text-micro-muted font-bold uppercase tracking-widest text-sm">No tools found</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-6 text-micro-fg font-bold uppercase text-xs hover:underline decoration-2 underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

              {/* === LEFT: Main Content === */}
              <div className="flex-1 min-w-0">
                {viewMode === 'drops' ? (
                  <>
                    {visibleGroups.map((group, index) => (
                      <React.Fragment key={group.label}>
                        <div
                          className="mb-12 md:mb-16"
                          data-week={group.label}
                          ref={(el) => { if (el) weekRefs.current.set(group.label, el); else weekRefs.current.delete(group.label); }}
                        >
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
                                <a key={tool.name} href={addRef(tool.url)} target="_blank" rel="noopener noreferrer">
                                  <div className={`${isFeaturedInDrop ? 'bg-[#f0fdf4]' : ''}`}>
                                    <ToolDataRow
                                      tool={tool}
                                      isDirectory={true}
                                      isFeatured={isFeaturedInDrop}
                                    />
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}

                    {hasMoreWeeks && !showAllWeeks && (
                      <button
                        onClick={() => setShowAllWeeks(true)}
                        className="w-full py-6 md:py-8 mt-4 border border-micro-layer-1 rounded-sm bg-white text-micro-muted font-bold uppercase tracking-widest text-[11px] hover:border-micro-fg hover:text-micro-fg transition-all flex items-center justify-center gap-3 shadow-soft hover:shadow-micro"
                      >
                        Explore Older Backlog <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {alphabeticalTools.map((tool) => {
                      const isFeatured = chronologicalTools.slice(0, 2).map(t => t.name).includes(tool.name);
                      return (
                        <a key={tool.name} href={addRef(tool.url)} target="_blank" rel="noopener noreferrer">
                          <ToolTile tool={tool} isFeatured={isFeatured} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* === RIGHT: Sidebar === */}
              <div className="w-full lg:w-[300px] flex-shrink-0">
                <div className="lg:sticky lg:top-24 flex flex-col gap-6">

                  {/* Billboard / Partner Spotlight */}
                  {billboardAd && (
                    <a
                      href={billboardAd.link}
                      target={billboardAd.link.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="group block relative overflow-hidden rounded-sm border border-white/5 bg-coffee-900/80 backdrop-blur-md p-5 transition-all hover:border-[#064e3b]/30 shadow-xl"
                    >
                      <div className="absolute top-0 right-0 bg-[#064e3b] text-white text-[7px] font-black px-3 py-0.5 uppercase tracking-widest shadow-lg">Partner Spotlight</div>
                      <div className="flex items-start gap-4 relative z-10">
                        {billboardAd.logo ? (
                          <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden p-2">
                            <Image src={billboardAd.logo} alt={billboardAd.title} width={48} height={48} className="object-contain" unoptimized />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
                            <Megaphone className="w-6 h-6 text-[#064e3b] animate-pulse" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors tracking-tight leading-snug">{billboardAd.title}</h3>
                          <p className="text-[11px] text-white/50 font-medium leading-relaxed line-clamp-2">{billboardAd.description}</p>
                          <span className="inline-block mt-3 bg-[#064e3b] text-white px-4 py-1.5 rounded-sm font-black uppercase tracking-widest text-[8px] hover:bg-white hover:text-black transition-all border border-[#064e3b]">
                            {billboardAd.ctaText}
                          </span>
                        </div>
                      </div>
                    </a>
                  )}

                  {/* Featured Selection — all 3 ad slots */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-3.5 h-3.5 text-[#064e3b]" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-micro-muted">Featured Selection</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {featuredPlaceholders.map(ad => (
                        <SidebarFeaturedCard key={ad.id} ad={ad} />
                      ))}
                    </div>
                  </div>

                  {/* Last Week's Picks — organic content card */}
                  {lastWeekPicks.length > 0 && (
                    <div className="rounded-sm border border-micro-layer-1 bg-white p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-3.5 h-3.5 text-micro-muted" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-micro-muted">Last Week&apos;s Picks</h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        {lastWeekPicks.map(tool => (
                          <a key={tool.name} href={addRef(tool.url)} target="_blank" rel="noopener noreferrer">
                            <div className="group flex items-center gap-3 p-2 -mx-2 rounded-sm hover:bg-micro-layer-1 transition-all cursor-pointer">
                              <div className="w-8 h-8 rounded-sm border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
                                <Image
                                  src={tool.image || `https://www.google.com/s2/favicons?domain=${(() => { try { return new URL(tool.url).hostname; } catch { return ''; }})()}&sz=128`}
                                  alt={tool.name}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs font-bold text-micro-fg truncate group-hover:underline decoration-1 underline-offset-2">{tool.name}</h4>
                                <p className="text-[10px] text-micro-muted truncate">{tool.description}</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-micro-layer-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-micro-muted">{lastWeekLabel}</span>
                      </div>
                    </div>
                  )}

                  {/* Trending Categories — organic content */}
                  <div className="rounded-sm border border-micro-layer-1 bg-white p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-3.5 h-3.5 text-micro-muted" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-micro-muted">Popular Categories</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.filter(c => c !== 'All').slice(0, 8).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className="px-3 py-1 rounded-sm text-[10px] font-bold bg-micro-layer-1 text-micro-muted hover:bg-micro-fg hover:text-white transition-all border border-transparent hover:border-micro-fg"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarFeaturedCard({ ad }: { ad: AdSpot }) {
  return (
    <a
      href={ad.link}
      target={ad.link.startsWith('http') ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group block relative rounded-sm border border-[#064e3b]/20 bg-[#f0fdf4] p-4 transition-all hover:shadow-lg hover:border-[#064e3b]/40"
    >
      <div className="absolute top-0 right-0 bg-[#064e3b] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl-sm">Selection</div>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white rounded-sm border border-coffee-200 p-1.5 overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
          {ad.logo ? (
            <Image src={ad.logo} alt={ad.title} width={28} height={28} className="object-contain" unoptimized />
          ) : (
            <div className="w-full h-full bg-coffee-100 flex items-center justify-center text-coffee-800 font-bold text-xs">{ad.title[0]}</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[#064e3b] mb-0.5 group-hover:underline decoration-1 underline-offset-2 flex items-center gap-1.5">
            {ad.title}
            <ExternalLink className="w-3 h-3 text-[#064e3b]/40 group-hover:text-[#064e3b] transition-colors flex-shrink-0" />
          </h3>
          <p className="text-[11px] text-[#064e3b]/60 font-medium leading-relaxed line-clamp-2">{ad.description}</p>
        </div>
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
          <Image src={imgSrc} alt={tool.name} width={56} height={56} className="object-contain" onError={() => setImgSrc(fallbackLogo)} unoptimized />
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
      className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-6 md:py-8 px-4 md:px-6 -mx-4 md:-mx-6 transition-all cursor-pointer rounded-sm border border-transparent ${isFeatured ? '' : 'hover:bg-white hover:border-micro-layer-1 hover:shadow-soft'}`}
    >
      <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 md:w-56 relative">
        {isFeatured && (
          <div className="absolute -top-3 -left-2 bg-[#064e3b] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm z-10 shadow-lg">Featured</div>
        )}
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-sm border bg-white flex-shrink-0 flex items-center justify-center p-2 overflow-hidden transition-colors shadow-sm ${isFeatured ? 'border-[#064e3b]/30' : 'border-micro-layer-1 group-hover:border-micro-fg'}`}>
          <Image src={imgSrc} alt={tool.name} width={48} height={48} className="object-contain" onError={() => setImgSrc(fallbackLogo)} unoptimized />
        </div>
        <div className="min-w-0">
          <h3 className={`text-base font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-[#064e3b]' : 'text-micro-fg'}`}>
            {tool.name}
          </h3>
          <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${isFeatured ? 'text-[#064e3b]/60' : 'text-micro-muted'}`}>
            {tool.category}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-relaxed ${isDirectory ? 'truncate' : ''} ${isFeatured ? 'text-[#064e3b]/80' : 'text-micro-muted'}`}>
          {tool.description}
        </p>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 flex-shrink-0 md:w-40">
        <span className={`text-[10px] font-bold w-20 text-center py-1.5 rounded-sm flex-shrink-0 ${isFeatured ? 'bg-[#064e3b] text-white shadow-md' : 'bg-micro-layer-1 text-micro-fg'}`}>
          {tool.tags.price}
        </span>
        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-all ${isFeatured ? 'text-[#064e3b]' : 'text-micro-muted group-hover:text-micro-fg'}`} />
      </div>
    </div>
  );
}
