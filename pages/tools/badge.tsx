import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, Zap, Globe, ShieldCheck } from 'lucide-react';

const SITE_URL = 'https://realaiexamples.com';

function makeBadgeEmbed(variant: 'dark' | 'light', slug: string) {
  const fileName = variant === 'dark' ? 'badge-dark.svg' : 'badge-light.svg';
  const targetUrl = slug ? `${SITE_URL}/tools/${slug}` : `${SITE_URL}/tools`;
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
  const [slug, setSlug] = useState('');

  const cleanSlug = useMemo(() => {
    return slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }, [slug]);

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
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-32 pt-8 md:pt-12 px-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors mb-10 bg-white/10 px-4 py-2 rounded-sm border border-white/10"
          >
            <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5" />
            Back to Tools
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md text-left">
            Get discovered. <br />
            <span className="font-instrument font-normal italic lowercase opacity-90 text-blue-400">Fast-tracked.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed text-left">
            Makers who embed the badge get priority review, a permanent SEO backlink, and a feature in our next Weekly Drop.
          </p>
        </div>

        {/* Glass Sheet */}
        <div className="glass-sheet rounded-sm md:rounded-sm p-6 md:p-16 lg:p-24 overflow-hidden">
          
          {/* Section 0: Slug Builder */}
          <section className="mb-16 md:mb-28 max-w-2xl">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 border-b border-micro-layer-1 pb-4">
              01. Customize Your Embed
            </h2>
            <div className="p-8 bg-micro-layer-1 rounded-sm border border-micro-layer-2 shadow-inner-soft">
              <label className="block text-[10px] font-black uppercase tracking-widest text-micro-muted mb-4">
                Enter your Tool Name or Slug
              </label>
              <input 
                type="text"
                placeholder="e.g. My AI Tool"
                className="w-full bg-white border border-micro-layer-2 rounded-sm p-4 text-lg font-bold text-micro-fg outline-none focus:border-micro-fg transition-colors"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="mt-4 text-xs font-bold text-micro-muted uppercase tracking-wider">
                Target URL: <span className="text-micro-fg">realaiexamples.com/tools/{cleanSlug || '[slug]'}</span>
              </p>
            </div>
          </section>

          {/* Section A: Badge Preview + Embed */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              02. Choose Your Style
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
                <CopyBlock code={makeBadgeEmbed('dark', cleanSlug)} />
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
                <CopyBlock code={makeBadgeEmbed('light', cleanSlug)} />
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
                  <div className="w-10 h-10 bg-black text-blue-500 rounded-sm flex items-center justify-center mb-6 shadow-brutalist-sm">
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mt-48 -mr-48"></div>
            
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
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Full-width top banner</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> 10,000+ monthly views</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Custom CTA & Branding</li>
                </ul>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NdjT9bFzYo3W1ZstgIR9?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white text-black text-center font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-blue-500 transition-colors mt-auto shadow-xl"
                >
                  Claim Billboard
                </a>
              </div>

              {/* Tier 2: Pinned Slot */}
              <div className="bg-white/10 border border-white/20 p-8 rounded-sm flex flex-col scale-[1.02] shadow-2xl relative group hover:border-blue-500/30 transition-all">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-black text-[8px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">Most Popular</div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Launch Boost</span>
                  <span className="text-2xl font-black text-white">$19<span className="text-xs text-white/30 font-medium lowercase">/30d</span></span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Pinned Featured Slot</h3>
                <p className="text-sm text-white/40 mb-8 font-medium italic leading-relaxed">Pin your tool to the top-of-directory grid for 30 days. Only 4 spots available, first-come first-served.</p>
                <ul className="text-sm text-white/60 space-y-4 mb-10">
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Pinned 2x2 Grid Spot</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Permanent Dofollow Link</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Priority Ordering</li>
                </ul>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NdjTKBElEJQkFQ9aBiwh?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-blue-500 text-black text-center font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-white transition-colors mt-auto shadow-xl"
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
                <p className="text-sm text-white/40 mb-8 font-medium italic leading-relaxed">Dominate a specific Sunday drop for 7 days. Only 3 spots available, first-come first-served.</p>
                <ul className="text-sm text-white/60 space-y-4 mb-10">
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> #1 Spot in Weekly Drop</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Highlighted Row Style</li>
                  <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-500" /> Dual-View Pinned Logic</li>
                </ul>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NdjTsAfiPncaaDKhzJ79?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border border-white/10 text-white text-center font-black uppercase tracking-widest text-[11px] rounded-sm hover:bg-white hover:text-black transition-colors mt-auto shadow-sm"
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
