import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Check, Copy, Send } from 'lucide-react';

const CATEGORIES = [
  'Video & Audio',
  'Image Generation',
  'Copywriting',
  'Code Assistance',
  'Marketing',
  'Productivity',
];

const DARK_BADGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="44" viewBox="0 0 200 44" fill="none">
  <rect width="200" height="44" rx="8" fill="#000"/>
  <rect x="10" y="10" width="24" height="24" rx="6" fill="#ccff00"/>
  <text x="42" y="21" fill="#fff" font-family="system-ui,sans-serif" font-size="10" font-weight="700" letter-spacing="0.05em">LISTED ON</text>
  <text x="42" y="34" fill="#fff" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Real AI Examples</text>
</svg>`;

const LIGHT_BADGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="44" viewBox="0 0 200 44" fill="none">
  <rect x="0.5" y="0.5" width="199" height="43" rx="7.5" fill="#fff" stroke="#e5e5e5"/>
  <rect x="10" y="10" width="24" height="24" rx="6" fill="#000"/>
  <text x="42" y="21" fill="#000" font-family="system-ui,sans-serif" font-size="10" font-weight="700" letter-spacing="0.05em">LISTED ON</text>
  <text x="42" y="34" fill="#000" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Real AI Examples</text>
</svg>`;

function makeBadgeEmbed(variant: 'dark' | 'light') {
  const svg = variant === 'dark' ? DARK_BADGE_SVG : LIGHT_BADGE_SVG;
  const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return `<a href="https://realaiexamples.com/tools" target="_blank" rel="noopener noreferrer"><img src="${encoded}" alt="Listed on Real AI Examples" width="200" height="44" /></a>`;
}

function BadgePreview({ variant }: { variant: 'dark' | 'light' }) {
  const svg = variant === 'dark' ? DARK_BADGE_SVG : LIGHT_BADGE_SVG;
  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl p-6 ${
        variant === 'dark' ? 'bg-micro-layer-1' : 'bg-micro-layer-1'
      }`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
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
      <pre className="font-mono text-sm bg-micro-layer-1 rounded-2xl p-6 border border-micro-layer-2 overflow-x-auto whitespace-pre-wrap break-all">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 flex items-center gap-1.5 bg-white border border-micro-layer-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-micro-muted hover:text-micro-fg hover:border-micro-fg transition-all"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function BadgePage() {
  const [formState, setFormState] = useState({
    name: '',
    url: '',
    category: '',
    description: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — wire up real endpoint later
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

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
            className="inline-flex items-center gap-2 text-xs font-bold text-white/60 uppercase tracking-widest hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Tools
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
            List your AI tool.{' '}
            <br />
            <span className="font-instrument font-normal italic lowercase opacity-90">free.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Get listed in our curated directory. Add our badge to your site and we&rsquo;ll both grow together.
          </p>
        </div>

        {/* Glass Sheet */}
        <div className="glass-sheet rounded-3xl md:rounded-[48px] p-4 md:p-16 lg:p-24 overflow-hidden">
          {/* Section A: Badge Preview + Embed */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-micro-muted mb-8 md:mb-12">
              Badge &amp; Embed Code
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dark Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-[32px] p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                    Dark
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <BadgePreview variant="dark" />
                </div>
                <CopyBlock code={makeBadgeEmbed('dark')} />
              </div>

              {/* Light Badge */}
              <div className="bg-white border border-micro-layer-1 rounded-[32px] p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                    Light
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <BadgePreview variant="light" />
                </div>
                <CopyBlock code={makeBadgeEmbed('light')} />
              </div>
            </div>
          </section>

          {/* Section B: How It Works */}
          <section className="mb-16 md:mb-28">
            <h2 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-micro-muted mb-8 md:mb-12">
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
                  className="bg-white border border-micro-layer-1 rounded-[32px] p-6"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                    Step {item.step}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-micro-fg mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-micro-muted font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section C: Submission Form */}
          <section>
            <h2 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-micro-muted mb-8 md:mb-12">
              Submit Your Tool
            </h2>

            {submitted ? (
              <div className="bg-white border border-micro-layer-1 rounded-[32px] p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-terminal-lime flex items-center justify-center mx-auto mb-6">
                  <Check className="w-7 h-7 text-micro-fg" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-micro-fg mb-2">
                  Submission received!
                </h3>
                <p className="text-[14px] text-micro-muted font-medium max-w-md mx-auto">
                  We&rsquo;ll review your tool and get back to you within 48 hours. Don&rsquo;t forget to add the badge to your site.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-micro-layer-1 rounded-[32px] p-6 md:p-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tool Name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="bg-micro-layer-1 border border-transparent rounded-2xl px-6 py-4 text-micro-fg focus:bg-white focus:border-micro-layer-2 outline-none transition-all placeholder:text-micro-muted/60"
                  />
                  <input
                    type="url"
                    name="url"
                    placeholder="https://yourtool.com"
                    required
                    value={formState.url}
                    onChange={handleChange}
                    className="bg-micro-layer-1 border border-transparent rounded-2xl px-6 py-4 text-micro-fg focus:bg-white focus:border-micro-layer-2 outline-none transition-all placeholder:text-micro-muted/60"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select
                    name="category"
                    required
                    value={formState.category}
                    onChange={handleChange}
                    className="bg-micro-layer-1 border border-transparent rounded-2xl px-6 py-4 text-micro-fg focus:bg-white focus:border-micro-layer-2 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled>
                      Category
                    </option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="bg-micro-layer-1 border border-transparent rounded-2xl px-6 py-4 text-micro-fg focus:bg-white focus:border-micro-layer-2 outline-none transition-all placeholder:text-micro-muted/60"
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Brief description of your tool..."
                  required
                  rows={4}
                  value={formState.description}
                  onChange={handleChange}
                  className="w-full bg-micro-layer-1 border border-transparent rounded-2xl px-6 py-4 text-micro-fg focus:bg-white focus:border-micro-layer-2 outline-none transition-all resize-none mb-6 placeholder:text-micro-muted/60"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-micro-fg text-white rounded-full text-sm font-bold uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-all disabled:opacity-50 inline-flex items-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Tool'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
