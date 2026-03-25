import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Users, TrendingUp, DollarSign, ExternalLink, Twitter, ArrowUpRight, Flame, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import {
  SEED_STACKS,
  AI_TOOLS,
  getToolBySlug,
  getPopularTools,
  TOOL_CATEGORIES,
  FounderStack,
  AiToolEntry,
} from '../lib/stacks-data';

function formatMoney(cents: number): string {
  if (cents >= 10000) return `$${(cents / 1000).toFixed(0)}k`;
  if (cents >= 1000) return `$${(cents / 1000).toFixed(1)}k`;
  return `$${cents.toLocaleString()}`;
}

function ToolPill({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;
  
  const categoryColors: Record<string, string> = {
    coding: 'bg-[#ccff00] text-black border-black',
    chat: 'bg-[#ff00ff] text-white border-black',
    design: 'bg-[#00ffff] text-black border-black',
    image: 'bg-purple-400 text-white border-black',
    video: 'bg-red-400 text-white border-black',
    writing: 'bg-orange-300 text-black border-black',
    research: 'bg-blue-300 text-black border-black',
    automation: 'bg-yellow-300 text-black border-black',
    data: 'bg-green-300 text-black border-black',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase tracking-wider border-2 ${categoryColors[tool.category] || 'bg-gray-200 text-black border-black'}`}>
      <span>{tool.icon}</span>
      <span>{tool.name}</span>
    </span>
  );
}

function FounderCard({ stack, rank }: { stack: FounderStack; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border-4 border-black brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
      {/* Header */}
      <div className="p-6 border-b-4 border-black">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Rank badge */}
            <div className="flex-shrink-0 w-12 h-12 bg-black text-[#ccff00] flex items-center justify-center font-display text-xl">
              #{rank}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-display uppercase">{stack.name}</h3>
                {stack.growth30d && stack.growth30d > 20 && (
                  <span className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 border-2 border-black uppercase">
                    🔥 trending
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <a
                  href={`https://x.com/${stack.xHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-[#ff00ff] hover:underline flex items-center gap-1"
                >
                  @{stack.xHandle}
                  {stack.xFollowerCount && (
                    <span className="text-gray-500 text-xs">({(stack.xFollowerCount / 1000).toFixed(1)}k)</span>
                  )}
                </a>
                <span className="text-xs font-bold uppercase bg-gray-100 px-2 py-0.5 border border-black">
                  {stack.role}
                </span>
              </div>
            </div>
          </div>

          {/* Revenue badge */}
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-display text-black">
              {formatMoney(stack.mrr)}<span className="text-sm font-mono text-gray-500">/mo</span>
            </div>
            {stack.growth30d !== null && (
              <div className={`text-xs font-bold font-mono ${stack.growth30d > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {stack.growth30d > 0 ? '▲' : '▼'} {Math.abs(stack.growth30d).toFixed(1)}% MoM
              </div>
            )}
          </div>
        </div>

        {/* Startup info */}
        <div className="mt-3 flex items-center gap-2">
          {stack.startupIcon && (
            <img src={stack.startupIcon} alt="" className="w-5 h-5 border border-black" />
          )}
          <a
            href={stack.startupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-gray-600 hover:text-black flex items-center gap-1"
          >
            {stack.startup}
            <ArrowUpRight className="w-3 h-3" />
          </a>
          {stack.country && (
            <span className="text-xs text-gray-400 font-mono">· {stack.country}</span>
          )}
          {stack.category && (
            <span className="text-xs bg-black text-white px-2 py-0.5 font-mono uppercase">
              {stack.category}
            </span>
          )}
        </div>
      </div>

      {/* AI Tools */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">AI Stack</span>
          {stack.monthlyAiSpend && (
            <span className="text-xs font-mono bg-[#ccff00] px-2 py-0.5 border border-black">
              ~${stack.monthlyAiSpend}/mo
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {stack.aiTools.map(slug => (
            <ToolPill key={slug} slug={slug} />
          ))}
        </div>

        {/* Hot take */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full text-left flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-black transition-colors"
        >
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="font-bold uppercase text-xs">Hot Take</span>
          {expanded ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
        </button>
        {expanded && (
          <p className="mt-2 text-sm font-mono bg-black text-[#ccff00] p-3 border-2 border-black">
            &ldquo;{stack.hotTake}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

function ToolLeaderboard({ stacks }: { stacks: FounderStack[] }) {
  const popular = getPopularTools(stacks);

  return (
    <div className="bg-white border-4 border-black brutalist-shadow">
      <div className="p-4 bg-black text-[#ccff00] font-display text-lg uppercase">
        🏆 Most Used AI Tools
      </div>
      <div className="divide-y-2 divide-black">
        {popular.slice(0, 8).map(({ tool, count }, i) => (
          <div key={tool.slug} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-lg font-display w-8">{i + 1}.</span>
              <span className="text-lg">{tool.icon}</span>
              <span className="font-bold text-sm uppercase">{tool.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 bg-[#ccff00] border border-black" style={{ width: `${(count / stacks.length) * 100}px` }} />
              <span className="text-xs font-mono text-gray-500">
                {Math.round((count / stacks.length) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBar({ stacks }: { stacks: FounderStack[] }) {
  const totalSpend = stacks.reduce((sum, s) => sum + (s.monthlyAiSpend || 0), 0);
  const avgSpend = Math.round(totalSpend / stacks.length);
  const totalTools = new Set(stacks.flatMap(s => s.aiTools)).size;
  const avgTools = (stacks.reduce((sum, s) => sum + s.aiTools.length, 0) / stacks.length).toFixed(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {[
        { label: 'Builders', value: stacks.length.toString(), icon: <Users className="w-5 h-5" /> },
        { label: 'AI Tools Tracked', value: totalTools.toString(), icon: <TrendingUp className="w-5 h-5" /> },
        { label: 'Avg AI Spend', value: `$${avgSpend}/mo`, icon: <DollarSign className="w-5 h-5" /> },
        { label: 'Avg Stack Size', value: `${avgTools} tools`, icon: <Filter className="w-5 h-5" /> },
      ].map(stat => (
        <div key={stat.label} className="bg-white border-4 border-black p-4 brutalist-shadow-sm text-center">
          <div className="flex justify-center mb-2 text-[#ff00ff]">{stat.icon}</div>
          <div className="text-2xl font-display">{stat.value}</div>
          <div className="text-xs font-mono uppercase text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function StacksPage() {
  const [filterTool, setFilterTool] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'mrr' | 'spend' | 'tools'>('mrr');

  const stacks = SEED_STACKS;

  const filteredStacks = useMemo(() => {
    let result = [...stacks];

    if (filterTool !== 'all') {
      result = result.filter(s => s.aiTools.includes(filterTool));
    }

    result.sort((a, b) => {
      if (sortBy === 'mrr') return b.mrr - a.mrr;
      if (sortBy === 'spend') return (b.monthlyAiSpend || 0) - (a.monthlyAiSpend || 0);
      return b.aiTools.length - a.aiTools.length;
    });

    return result;
  }, [stacks, filterTool, sortBy]);

  // Top tools for quick filter
  const topToolSlugs = ['cursor', 'claude-code', 'chatgpt', 'claude', 'v0', 'perplexity'];

  const pageTitle = "AI Stacks — What AI Tools Do Top Builders Use?";
  const pageDescription = "See the real AI toolkits of indie hackers and startup founders. Browse by builder, by tool, or by spend. Powered by verified TrustMRR data.";

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="description" />
        <meta property="og:title" content={pageTitle} key="og:title" />
        <meta property="og:description" content={pageDescription} key="og:description" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={pageTitle} key="twitter:title" />
        <meta name="twitter:description" content={pageDescription} key="twitter:description" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-7xl relative z-10">
        {/* Hero */}
        <div className="text-center mb-16 max-w-4xl mx-auto border-b-4 border-black pb-16">
          <div className="inline-block bg-black text-[#ccff00] px-4 py-2 font-mono text-sm uppercase tracking-widest mb-6 rotate-[-1deg]">
            Powered by TrustMRR · Verified Revenue
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display text-black mb-6 uppercase leading-[0.9]">
            AI <span className="text-[#ff00ff]">Stacks</span>
          </h1>
          
          <p className="text-lg md:text-xl font-mono text-gray-700 max-w-2xl mx-auto mb-8">
            What AI tools do the top builders actually use? Real people. Verified revenue. No BS.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://forms.gle/KqN82GGdCohshtVx8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff00ff] text-white px-6 py-3 border-4 border-black font-display uppercase text-sm brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              + Submit Your Stack
            </a>
            <a
              href="https://trustmrr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 border-4 border-black font-display uppercase text-sm brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
            >
              View on TrustMRR <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <StatsBar stacks={stacks} />

        {/* Filters + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Tool filter */}
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Filter by tool</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterTool('all')}
                className={`px-3 py-1.5 text-xs font-bold uppercase border-2 border-black transition-all ${
                  filterTool === 'all' ? 'bg-black text-[#ccff00]' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                All
              </button>
              {topToolSlugs.map(slug => {
                const tool = getToolBySlug(slug);
                if (!tool) return null;
                return (
                  <button
                    key={slug}
                    onClick={() => setFilterTool(slug)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase border-2 border-black transition-all ${
                      filterTool === slug ? 'bg-black text-[#ccff00]' : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {tool.icon} {tool.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Sort by</div>
            <div className="flex gap-2">
              {([
                { key: 'mrr', label: '💰 Revenue' },
                { key: 'spend', label: '🤖 AI Spend' },
                { key: 'tools', label: '🔧 Stack Size' },
              ] as const).map(option => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase border-2 border-black transition-all ${
                    sortBy === option.key ? 'bg-black text-[#ccff00]' : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Founder cards */}
          <div className="lg:col-span-2 space-y-6">
            {filteredStacks.length === 0 ? (
              <div className="bg-white border-4 border-black p-12 text-center brutalist-shadow">
                <p className="text-xl font-display uppercase mb-2">No builders found</p>
                <p className="font-mono text-sm text-gray-500">Try a different filter</p>
              </div>
            ) : (
              filteredStacks.map((stack, i) => (
                <FounderCard key={stack.xHandle} stack={stack} rank={i + 1} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ToolLeaderboard stacks={stacks} />

            {/* CTA */}
            <div className="bg-black text-white border-4 border-black p-6">
              <h3 className="font-display text-xl text-[#ccff00] uppercase mb-3">
                What&apos;s Your Stack?
              </h3>
              <p className="text-sm font-mono text-gray-300 mb-4">
                Share the AI tools you use daily. Get featured alongside top builders.
              </p>
              <a
                href="https://forms.gle/KqN82GGdCohshtVx8"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#ccff00] text-black px-4 py-3 font-display uppercase text-sm border-2 border-[#ccff00] hover:bg-[#ff00ff] hover:text-white hover:border-[#ff00ff] transition-colors"
              >
                Submit Your Stack →
              </a>
            </div>

            {/* Tool categories */}
            <div className="bg-white border-4 border-black brutalist-shadow-sm">
              <div className="p-4 border-b-2 border-black font-display text-sm uppercase">
                Tool Categories
              </div>
              <div className="p-4 space-y-2">
                {TOOL_CATEGORIES.map(cat => {
                  const count = AI_TOOLS.filter(t => t.category === cat.value).length;
                  return (
                    <div key={cat.value} className="flex items-center justify-between text-sm font-mono">
                      <span>{cat.label}</span>
                      <span className="text-xs text-gray-400">{count} tools</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
