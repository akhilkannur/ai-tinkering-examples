import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, Copy, Zap, Globe, ShieldCheck, Search, Info, Sparkles } from 'lucide-react';
import { aiTools } from '../../lib/ai-tools-data';

const SITE_URL = 'https://realaiexamples.com';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

function makeBadgeEmbed(variant: 'dark' | 'light', slug: string) {
  const fileName = variant === 'dark' ? 'badge-dark.svg' : 'badge-light.svg';
  const baseUrl = slug ? `${SITE_URL}/tools/${slug}` : `${SITE_URL}/tools`;
  const targetUrl = `${baseUrl}?utm_source=badge&utm_medium=embed&utm_campaign=featured`;
  return `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer"><img src="${SITE_URL}/images/${fileName}" alt="Featured on REAL AI EXAMPLES" width="220" height="50" /></a>`;
}

function BadgePreview({ variant }: { variant: 'dark' | 'light' }) {
  const fileName = variant === 'dark' ? 'badge-dark.svg' : 'badge-light.svg';
  return (
    <div className="inline-flex items-center justify-center rounded-sm p-6 bg-micro-layer-1">
      <img src={`/images/${fileName}`} alt={`Listed on Real AI Examples ${variant}`} width="220" height="50" className="shadow-2xl" />
    </div>
  );
}

function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="font-mono text-[11px] md:text-sm bg-micro-layer-1 rounded-sm p-6 border border-micro-layer-2 overflow-x-auto whitespace-pre-wrap break-all text-micro-fg leading-relaxed">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 flex items-center gap-1.5 bg-white border border-micro-layer-2 rounded-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-micro-muted hover:text-micro-fg hover:border-micro-fg transition-all shadow-sm"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function BadgePage() {
  const [search, setSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState<{ name: string, slug: string } | null>(null);

  const filteredTools = useMemo(() => {
    if (!search || search.length < 2) return [];
    return aiTools
      .filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
      .map(t => ({ name: t.name, slug: slugify(t.name) }))
      .slice(0, 5);
  }, [search]);

  const currentSlug = selectedTool ? selectedTool.slug : '';

  return (
    <div>
      <Head>
        <title>Fast-Track Your Tool Listing | Real AI Examples</title>
        <meta
          name="description"
          content="Get featured in our curated directory. Makers who embed the badge get fast-track approval and a high-authority SEO backlink."
          key="description"
        />
      </Head>

      <div>
        {/* Hero */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-32 pt-8 md:pt-12 px-6 text-left">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors mb-10 bg-white/10 px-4 py-2 rounded-sm border border-white/10"
          >
            <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5" />
            Back to Tools
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-10 leading-[0.9] text-white drop-shadow-md">
            Get discovered. <br />
            <span className="font-instrument font-normal italic lowercase text-terminal-lime">Fast-tracked.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed">
            Makers who embed the badge get priority review, a permanent SEO backlink, and a feature in our next Weekly Drop.
          </p>
        </div>

        {/* Glass Sheet */}
        <div className="glass-sheet rounded-sm md:rounded-sm p-6 md:p-16 lg:p-24 overflow-hidden">
          
          {/* Section 0: Tool Picker */}
          <section className="mb-16 md:mb-28 max-w-2xl">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 border-b border-micro-layer-1 pb-4">
              01. Personalize Your Badge (Optional)
            </h2>
            <div className="p-8 bg-micro-layer-1 rounded-sm border border-micro-layer-2 shadow-inner-soft">
              <label className="block text-[10px] font-black uppercase tracking-widest text-micro-muted mb-4">
                Already listed? Search to link directly to your page
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-micro-muted" />
                <input 
                  type="text"
                  placeholder="Search for your tool name..."
                  className="w-full bg-white border border-micro-layer-2 rounded-sm p-4 pl-12 text-lg font-bold text-micro-fg outline-none focus:border-micro-fg transition-colors"
                  value={selectedTool ? selectedTool.name : search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (selectedTool) setSelectedTool(null);
                  }}
                />
                
                {/* Search Results */}
                {filteredTools.length > 0 && !selectedTool && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-micro-layer-2 rounded-sm shadow-2xl z-50 overflow-hidden">
                    {filteredTools.map(t => (
                      <button
                        key={t.slug}
                        onClick={() => {
                          setSelectedTool(t);
                          setSearch('');
                        }}
                        className="w-full text-left px-6 py-4 hover:bg-micro-layer-1 border-b border-micro-layer-1 last:border-0 transition-colors flex items-center justify-between group"
                      >
                        <span className="font-bold text-micro-fg">{t.name}</span>
                        <span className="text-[10px] font-mono text-micro-muted group-hover:text-micro-fg">/tools/{t.slug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedTool ? (
                <div className="mt-6 flex items-center justify-between bg-terminal-lime/10 p-4 rounded-sm border border-terminal-lime/20">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-terminal-lime" />
                    <div>
                      <p className="text-[10px] font-black uppercase text-micro-fg tracking-widest mb-0.5">Personalized SEO Link Active:</p>
                      <p className="text-sm font-bold text-micro-fg">realaiexamples.com/tools/{selectedTool.slug}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedTool(null);
                      setSearch('');
                    }}
                    className="text-[10px] font-black uppercase text-red-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-white/40 border border-white/20 rounded-sm flex items-start gap-3">
                  <Info className="w-5 h-5 text-micro-muted flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-micro-muted font-medium">
                    New submitters can use the default code below. It links to the main directory and is valid for verification.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section A: Badge Preview + Embed */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              02. Grab Your Embed Code
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dark Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-sm p-8 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-micro-muted">
                    Standard Dark
                  </span>
                </div>
                <div className="flex items-center justify-center py-4 bg-coffee-900 rounded-sm">
                  <BadgePreview variant="dark" />
                </div>
                <CopyBlock code={makeBadgeEmbed('dark', currentSlug)} />
              </div>

              {/* Light Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-sm p-8 flex flex-col gap-8 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-micro-muted">
                    Standard Light
                  </span>
                </div>
                <div className="flex items-center justify-center py-4 bg-coffee-50 rounded-sm">
                  <BadgePreview variant="light" />
                </div>
                <CopyBlock code={makeBadgeEmbed('light', currentSlug)} />
              </div>
            </div>
          </section>

          {/* Section B: Why it works */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              The Value Prop
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Zap className="w-5 h-5" />,
                  title: 'Priority Review',
                  desc: 'Tools with a badge move to the top of our curation queue. Verified within 24 hours.',
                },
                {
                  icon: <Globe className="w-5 h-5" />,
                  title: 'SEO Backlink',
                  desc: 'Get a permanent, high-authority do-follow backlink directly to your tool page.',
                },
                {
                  icon: <ShieldCheck className="w-5 h-5" />,
                  title: 'Trust Signal',
                  desc: 'Show your users that you are part of a curated library of proven AI workflows.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-micro-layer-1 rounded-sm p-8 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-black text-[#064e3b] rounded-sm flex items-center justify-center mb-6 shadow-brutalist-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-micro-fg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-micro-muted font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Premium Sponsorships */}
          <section className="mb-16 md:mb-28 bg-coffee-900 p-8 md:p-16 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#064e3b]/10 rounded-full blur-3xl -mt-48 -mr-48"></div>
            
            <div className="max-w-3xl mb-12 relative z-10">
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 tracking-tight">Choose Your Visibility</h2>
              <p className="text-white/50 text-lg font-medium">Skip the queue and dominate the directory with our tiered sponsorship options. All paid slots are first-come, first-served.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
              {/* Tier 1: Billboard */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm flex flex-col group hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Dominance</span>
                  <span className="text-2xl font-black text-white">$29<span className="text-xs text-white/30 font-medium lowercase">/30d</span></span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Premium Billboard</h3>
                <p className="text-sm text-white/40 mb-8 font-medium italic leading-relaxed">The most visible spot on the site. A full-width hero banner appearing above the directory for 30 days.</p>
                <ul className="text-sm text-white/60 space-y-4 mb-10">
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Full-width top banner</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> 10,000+ monthly views</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Custom CTA & Branding</li>
                </ul>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NdjT9bFzYo3W1ZstgIR9?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white text-black text-center font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-[#064e3b] hover:text-white transition-colors mt-auto shadow-xl"
                >
                  Claim Billboard
                </a>
              </div>

              {/* Tier 2: Pinned Slot */}
              <div className="bg-white/10 border border-white/20 p-8 rounded-sm flex flex-col scale-[1.02] shadow-2xl relative group hover:border-[#064e3b]/30 transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#064e3b] text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">Most Popular</div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Launch Boost</span>
                  <span className="text-2xl font-black text-white">$19<span className="text-xs text-white/30 font-medium lowercase">/30d</span></span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Pinned Featured Slot</h3>
                <p className="text-sm text-white/40 mb-8 font-medium italic leading-relaxed text-balance">Pin your tool to the top-of-directory grid for 30 days. Only 4 slots available.</p>
                <ul className="text-sm text-white/60 space-y-4 mb-10">
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Pinned 2x2 Grid Spot</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Permanent Dofollow Link</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Priority Ordering</li>
                </ul>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NdjTKBElEJQkFQ9aBiwh?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#064e3b] text-white text-center font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-white hover:text-black transition-colors mt-auto shadow-xl"
                >
                  Buy Featured Slot
                </a>
              </div>

              {/* Tier 3: Weekly Drop Highlight */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm flex flex-col group hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Budget Friendly</span>
                  <span className="text-2xl font-black text-white">$9<span className="text-xs text-white/30 font-medium lowercase">/7d</span></span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Weekly Drop Highlight</h3>
                <p className="text-sm text-white/40 mb-8 font-medium italic leading-relaxed">Dominate a specific Sunday drop for 7 days. Highlighted row in both view modes.</p>
                <ul className="text-sm text-white/60 space-y-4 mb-10">
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> #1 Spot in Weekly Drop</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Highlighted Row Style</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-[#064e3b]" /> Dual-View Pinned Logic</li>
                </ul>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NdjTsAfiPncaaDKhzJ79?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border border-white/20 text-white text-center font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-white hover:text-black transition-colors mt-auto shadow-sm"
                >
                  Secure Spot
                </a>
              </div>
            </div>
          </section>

          {/* Section C: Submission Form */}
          <section>
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              Final Step: Submit
            </h2>

            <div className="bg-white border border-micro-layer-1 rounded-sm shadow-xl overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSe1VR6EBsPYLb0rVjS4h9xyyDVzdqNcHUNjKvvhXhV6_1DV-A/viewform?embedded=true"
                width="100%"
                height={1304}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                className="block"
              >
                Loading…
              </iframe>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
