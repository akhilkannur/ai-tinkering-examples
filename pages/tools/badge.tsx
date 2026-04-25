import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Check, Copy } from 'lucide-react';

const SITE_URL = 'https://realaiexamples.com';

function makeBadgeEmbed(variant: 'dark' | 'light') {
  const fileName = variant === 'dark' ? 'badge-dark.svg' : 'badge-light.svg';
  return `<a href="${SITE_URL}/tools" target="_blank" rel="noopener noreferrer"><img src="${SITE_URL}/images/${fileName}" alt="Listed on Real AI Examples" width="220" height="50" /></a>`;
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
  return (
    <div>
      <Head>
        <title>List Your AI Tool — Real AI Examples</title>
        <meta
          name="description"
          content="Get your AI tool listed in our curated directory. Add the Real AI Examples badge to your site and grow together."
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
            List your AI tool.{' '}
            <br />
            <span className="font-instrument font-normal italic lowercase opacity-90 text-terminal-lime">free.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Get listed in our curated directory. Add our badge to your site and we&rsquo;ll both grow together.
          </p>
        </div>

        {/* Glass Sheet */}
        <div className="glass-sheet rounded-sm md:rounded-sm p-6 md:p-16 lg:p-24 overflow-hidden">
          {/* Section A: Badge Preview + Embed */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              Badge &amp; Embed Code
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dark Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-sm p-8 flex flex-col gap-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-micro-muted">
                    Dark Variant
                  </span>
                </div>
                <div className="flex items-center justify-center py-4">
                  <BadgePreview variant="dark" />
                </div>
                <CopyBlock code={makeBadgeEmbed('dark')} />
              </div>

              {/* Light Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-sm p-8 flex flex-col gap-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-micro-muted">
                    Light Variant
                  </span>
                </div>
                <div className="flex items-center justify-center py-4">
                  <BadgePreview variant="light" />
                </div>
                <CopyBlock code={makeBadgeEmbed('light')} />
              </div>
            </div>
          </section>

          {/* Section B: How It Works */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Submit your tool',
                  desc: 'Fill out the form below with your tool details.',
                },
                {
                  step: '02',
                  title: 'Add the badge',
                  desc: 'Embed our badge on your website\u2019s homepage or footer.',
                },
                {
                  step: '03',
                  title: 'Get listed',
                  desc: 'We review and add your tool to the directory within 48 hours.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white/50 border border-white/30 rounded-sm p-8 shadow-sm"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-terminal-lime bg-black px-3 py-1 rounded-sm">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-micro-fg mt-6 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-micro-muted font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section C: Submission Form */}
          <section>
            <h2 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-micro-muted mb-8 md:mb-12 border-b border-micro-layer-1 pb-4">
              Submit Your Tool
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
