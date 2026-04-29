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
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-32 pt-8 md:pt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors mb-10 bg-white/10 px-4 py-2 rounded-sm border border-white/10"
          >
            <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5" />
            Back to Tools
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
            Get discovered. <br />
            <span className="font-instrument font-normal italic lowercase opacity-90 text-terminal-lime">Fast-tracked.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
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
            <div className="p-8 bg-micro-layer-1 rounded-sm border border-micro-layer-2">
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
              <div className="bg-white border border-micro-layer-1 rounded-sm p-8 flex flex-col gap-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-micro-muted">
                    Standard Dark
                  </span>
                </div>
                <div className="flex items-center justify-center py-4">
                  <BadgePreview variant="dark" />
                </div>
                <CopyBlock code={makeBadgeEmbed('dark', cleanSlug)} />
              </div>

              {/* Light Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-sm p-8 flex flex-col gap-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-micro-muted">
                    Standard Light
                  </span>
                </div>
                <div className="flex items-center justify-center py-4">
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
                  className="bg-white/50 border border-white/30 rounded-sm p-8 shadow-sm"
                >
                  <div className="w-10 h-10 bg-black text-terminal-lime rounded-sm flex items-center justify-center mb-6">
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
          <section className="mb-16 md:mb-28 bg-black p-8 md:p-16 rounded-sm border border-terminal-lime/30">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Want maximum visibility?</h2>
              <p className="text-white/60 text-lg font-medium">Skip the queue and dominate the directory with our premium ad placements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-terminal-lime">Most Visible</span>
                  <span className="text-xl font-black text-white">$49/mo</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Premium Billboard</h3>
                <ul className="text-sm text-white/50 space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3 h-3 text-terminal-lime" /> Full-width top banner</li>
                  <li className="flex items-center gap-2"><Check className="w-3 h-3 text-terminal-lime" /> Custom CTA & Visuals</li>
                  <li className="flex items-center gap-2"><Check className="w-3 h-3 text-terminal-lime" /> 10,000+ monthly impressions</li>
                </ul>
                <button className="w-full py-3 bg-terminal-lime text-black font-black uppercase tracking-widest text-[11px] rounded-sm hover:scale-[1.02] transition-transform">Claim Billboard</button>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Best ROI</span>
                  <span className="text-xl font-black text-white">$19/14d</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pinned Featured Slot</h3>
                <ul className="text-sm text-white/50 space-y-3 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3 h-3 text-terminal-lime" /> Pinned to Top of Directory</li>
                  <li className="flex items-center gap-2"><Check className="w-3 h-3 text-terminal-lime" /> Distinct "Featured" styling</li>
                  <li className="flex items-center gap-2"><Check className="w-3 h-3 text-terminal-lime" /> Permanent Dofollow Link</li>
                </ul>
                <button className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-sm hover:scale-[1.02] transition-transform">Buy Featured Slot</button>
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
