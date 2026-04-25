import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Gift, Share2, Trophy, Mail, Twitter, Linkedin, CheckCircle } from 'lucide-react';

const GIVEAWAY_TOOLS = [
  {
    name: 'Cursor Pro',
    domain: 'cursor.com',
    included: '3-month Pro license',
    value: 120,
  },
  {
    name: 'Perplexity Pro',
    domain: 'perplexity.ai',
    included: '1-year Pro subscription',
    value: 200,
  },
  {
    name: 'Granola',
    domain: 'granola.ai',
    included: '6-month Pro plan',
    value: 96,
  },
  {
    name: 'Notion AI',
    domain: 'notion.so',
    included: '1-year AI add-on',
    value: 120,
  },
  {
    name: 'Otter.ai',
    domain: 'otter.ai',
    included: '3-month Business plan',
    value: 100,
  },
];

const TOTAL_VALUE = GIVEAWAY_TOOLS.reduce((sum, t) => sum + t.value, 0);

const SHARE_TEXT = encodeURIComponent(
  'I just entered to win $500+ in AI tools from @realaiexamples 🎁'
);
const SHARE_URL = encodeURIComponent('https://realaiexamples.com/tools/giveaway');

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      const diff = Math.max(0, endOfMonth.getTime() - now.getTime());
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export default function GiveawayPage() {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const countdown = useCountdown();

  const handleSubmit = async (e: React.FormEvent) => {
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

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div>
      <Head>
        <title>Win $500+ in AI Tools — Monthly Giveaway | Real AI Examples</title>
        <meta
          name="description"
          content="Enter our free monthly giveaway for premium AI tool licenses worth over $500. Subscribe, share, and win."
          key="description"
        />
      </Head>

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-12 md:mb-32 pt-8 md:pt-12">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
          Win $500+ in{' '}
          <span className="font-instrument font-normal italic lowercase opacity-90">
            AI tools.
          </span>
        </h1>
        <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8 md:mb-12">
          Every month we give away premium licenses from the best AI tools. Enter free — just
          subscribe and share.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 md:gap-5">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Min', value: countdown.minutes },
            { label: 'Sec', value: countdown.seconds },
          ].map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px]">
                <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                  {pad(unit.value)}
                </span>
              </div>
              <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-white/60 mt-2 block">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Glass Sheet Content */}
      <div className="glass-sheet rounded-3xl md:rounded-[48px] p-4 md:p-16 lg:p-24 overflow-hidden">
        {/* Total Value Banner */}
        <div className="flex items-center justify-center gap-3 mb-10 md:mb-16">
          <div className="flex items-center gap-3 bg-micro-fg px-6 py-2.5 rounded-full shadow-lg">
            <Gift className="w-4 h-4 text-terminal-lime" />
            <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] text-white">
              Total Value: ${TOTAL_VALUE}
            </span>
          </div>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
          {GIVEAWAY_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="bg-white border border-micro-layer-1 rounded-[32px] p-6 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl border border-micro-layer-1 bg-white flex items-center justify-center p-2.5 overflow-hidden shadow-sm mb-4">
                <Image
                  src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                  alt={tool.name}
                  width={56}
                  height={56}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-micro-fg mb-1">{tool.name}</h3>
              <p className="text-[14px] text-micro-muted font-medium mb-3">{tool.included}</p>
              <span className="text-sm font-bold text-micro-fg bg-micro-layer-1 px-4 py-1.5 rounded-full">
                ${tool.value} value
              </span>
            </div>
          ))}
        </div>

        {/* Entry Form Section */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-micro-muted mb-3">
            Enter the Giveaway
          </h2>
          <p className="text-2xl md:text-4xl font-bold tracking-tight text-micro-fg mb-8">
            Drop your email to{' '}
            <span className="font-instrument font-normal italic lowercase opacity-90">enter.</span>
          </p>

          {formStatus === 'success' ? (
            <div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-terminal-green" />
                <span className="text-lg font-bold text-micro-fg">You&apos;re in!</span>
              </div>

              {/* Share for Bonus Entries */}
              <div className="bg-white border border-micro-layer-1 rounded-[32px] p-6 md:p-8">
                <Share2 className="w-5 h-5 text-micro-muted mx-auto mb-3" />
                <h3 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-micro-muted mb-2">
                  Unlock Bonus Entries
                </h3>
                <p className="text-[14px] text-micro-muted font-medium mb-6">
                  Share on social media for extra chances to win.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-bold bg-micro-fg text-white hover:opacity-90 transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                    Share on X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${SHARE_URL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-bold bg-white border border-micro-layer-2 text-micro-fg hover:border-micro-fg transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    Share on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-2xl mx-auto p-1.5 md:p-2.5 bg-white/90 backdrop-blur-2xl rounded-pill border border-white/30 shadow-2xl"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent px-4 md:px-8 py-3 md:py-4 outline-none text-sm md:text-[18px] font-medium text-micro-fg placeholder:text-micro-muted min-w-0"
              />
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="px-6 md:px-12 py-3 md:py-5 bg-micro-fg text-white rounded-pill font-extrabold text-xs md:text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
              >
                {formStatus === 'loading' ? 'Entering…' : 'Enter Free'}
              </button>
            </form>
          )}

          {formStatus === 'error' && (
            <p className="text-sm text-red-500 font-medium mt-4">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-micro-muted text-center mb-10 md:mb-14">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Mail,
                step: '01',
                title: 'Subscribe',
                desc: "Enter your email above — it's free and takes 5 seconds.",
              },
              {
                icon: Share2,
                step: '02',
                title: 'Share',
                desc: 'Share on Twitter or LinkedIn for bonus entries.',
              },
              {
                icon: Trophy,
                step: '03',
                title: 'Win',
                desc: 'One winner drawn at the end of each month.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white border border-micro-layer-1 rounded-[32px] p-6 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-micro-layer-1 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-micro-fg" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-micro-fg mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-micro-muted font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rules / Fine Print */}
        <div className="text-center border-t border-micro-layer-1 pt-8">
          <p className="text-[12px] text-micro-muted font-medium">
            One winner selected at the end of each month. Winner notified by email.
          </p>
        </div>
      </div>
    </div>
  );
}
