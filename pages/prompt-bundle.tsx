import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { 
  Zap, Copy, CheckCircle2, ArrowRight, ShieldCheck, 
  Search, Filter, Sparkles, MessageSquare, Layout, 
  BarChart3, Globe, Mail, Lock
} from 'lucide-react';

export default function PromptBundlePage() {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const pageTitle = "The Master AI Workflow Vault | 500+ Copy-Paste Prompts for Business";
  const pageDescription = "Professional AI workflows for Sales, Marketing, and Ops. No technical setup. Just copy and paste into ChatGPT, Claude, or Gemini to automate your business.";

  const categories = [
    "All", "Lead Gen", "Sales Ops", "Marketing Ops", "Content Ops", "SEO", "Customer Success"
  ];

  const handleCopySample = () => {
    const sample = "Role: You are a B2B Lead Gen Specialist...\nObjective: Identify 5 high-value triggers...";
    navigator.clipboard.writeText(sample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* SEO Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="product" />
        <meta name="keywords" content="marketing ai prompts, sales automation workflows, business ai templates, chatgpt marketing prompts, claude sales workflows" />
        
        {/* Structured Data for Product SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "Master AI Workflow Vault",
          "description": pageDescription,
          "brand": {
            "@type": "Brand",
            "name": "Real AI Examples"
          },
          "offers": {
            "@type": "Offer",
            "price": "39.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        })}} />
      </Head>

      <Navbar />

      <main className="relative pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* HERO */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#ccff00] border-2 border-black font-black text-[10px] uppercase tracking-[0.3em] mb-8 transform -rotate-1 brutalist-shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> THE LARGEST B2B WORKFLOW LIBRARY
            </div>
            <h1 className="text-5xl md:text-8xl font-display tracking-tight mb-8 uppercase leading-[0.9] text-black glitch-text" data-text="THE MASTER AI PROMPT VAULT">
              The Master AI <br />
              <span className="text-[#ff00ff]">Prompt Vault</span>
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm mb-12">
              500+ professional-grade AI prompts and workflows for high-growth Sales, Marketing, and Ops teams. <br className="hidden md:block" /> 
              Stop guessing. Just <strong className="bg-black text-[#ccff00] px-1">copy, paste, and win.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NXjwiW67fl4ov8bwfXRO?quantity=1"
                  className="w-full sm:w-auto px-12 py-6 bg-[#ff00ff] text-white border-4 border-black font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none flex items-center justify-center gap-4"
                >
                    Unlock Vault ($39) <ArrowRight className="w-8 h-8 stroke-[3px]" />
                </a>
                <button 
                  onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-12 py-6 bg-white border-4 border-black text-black font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                    Browse Plays
                </button>
            </div>
          </div>

          {/* THE VALUE SECTION */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
             <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ff00ff] mb-6 border-2 border-black brutalist-shadow-sm">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-black mb-4 uppercase leading-tight">Data Logic</h3>
                <p className="text-sm text-black font-black font-mono leading-relaxed">
                    // Standard prompts fail on complex data. My workflows handle massive CSVs, deep audits, and multi-step research.
                </p>
             </div>
             <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ccff00] mb-6 border-2 border-black brutalist-shadow-sm">
                    <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-black mb-4 uppercase leading-tight">Structured</h3>
                <p className="text-sm text-black font-black font-mono leading-relaxed">
                    // Every workflow is engineered to produce structured, usable results. Tables, reports, and code - ready for your team.
                </p>
             </div>
             <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-[#00ffff] mb-6 border-2 border-black brutalist-shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-black mb-4 uppercase leading-tight">Agnostic</h3>
                <p className="text-sm text-black font-black font-mono leading-relaxed">
                    // Formatted for ChatGPT, Claude, and Gemini. One library to rule every model you use in your business.
                </p>
             </div>
          </div>

          {/* PREVIEW / SAMPLE GRID */}
          <div id="preview" className="mb-32">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-display text-black mb-12 uppercase tracking-tight decoration-wavy underline decoration-[#ff00ff]">Step inside the Vault</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 border-2 border-black font-display text-xs uppercase transition-all brutalist-shadow-sm ${selectedCategory === cat ? 'bg-black text-[#ccff00]' : 'bg-white text-black hover:bg-[#ccff00]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-12">
                {/* SAMPLE CARD 1 */}
                <div className="bg-white border-4 border-black p-8 brutalist-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BarChart3 className="w-32 h-32 text-black" />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-black p-2 border-2 border-black text-[#ff00ff]">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-widest">Marketing Ops</span>
                    </div>
                    <h3 className="text-2xl font-display text-black mb-4 uppercase leading-tight">The Competitor Watchtower</h3>
                    <p className="text-sm text-black font-bold mb-8 uppercase leading-relaxed">Automatically audits landing pages and identifies conversion hooks.</p>
                    <div className="bg-gray-100 border-2 border-dashed border-black p-4 mb-8 font-mono text-xs text-black font-black uppercase tracking-widest">
                        Role: CRO Analyst <br/>
                        Objective: Extract Hooks <br/>
                        // Logic Locked...
                    </div>
                    <button 
                        onClick={handleCopySample}
                        className="w-full bg-white border-2 border-black py-3 font-display text-xs uppercase transition-all hover:bg-[#ccff00] brutalist-shadow-sm"
                    >
                        {copied ? "Copied!" : "Copy Sample"}
                    </button>
                </div>

                {/* SAMPLE CARD 2 */}
                <div className="bg-white border-4 border-black p-8 brutalist-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Globe className="w-32 h-32 text-black" />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-black p-2 border-2 border-black text-[#00ffff]">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-widest">SEO</span>
                    </div>
                    <h3 className="text-2xl font-display text-black mb-4 uppercase leading-tight">Semantic Cluster Bot</h3>
                    <p className="text-sm text-black font-bold mb-8 uppercase leading-relaxed">Turns raw keywords into structured content Pillar/Cluster maps.</p>
                    <div className="bg-gray-100 border-2 border-dashed border-black p-4 mb-8 font-mono text-xs text-black font-black uppercase tracking-widest">
                        Role: SEO Specialist <br/>
                        Objective: Map Entities <br/>
                        // Logic Locked...
                    </div>
                    <div className="w-full bg-black text-white py-3 font-display text-xs uppercase text-center brutalist-shadow-sm opacity-50 cursor-not-allowed">
                        <Lock className="w-4 h-4 inline mr-2" /> Locked in Vault
                    </div>
                </div>
             </div>
          </div>

          {/* VALUE PROPOSITION */}
          <div className="bg-[#ccff00] border-4 border-black p-12 md:p-20 mb-32 brutalist-shadow relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <Zap className="w-96 h-96 text-black" />
             </div>
             <div className="max-w-3xl relative z-10">
                <h2 className="text-4xl md:text-7xl font-display text-black mb-12 uppercase leading-[0.9]">Stop writing from scratch. <br/> Start executing.</h2>
                <div className="space-y-8 mb-16">
                    {[
                        "500+ Field-tested workflows for every business role.",
                        "Get 1 year of access to the complete vault.",
                        "Direct copy-paste format. No technical knowledge required.",
                        "Weekly updates with the latest 'Boring AI' plays."
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-6">
                            <div className="bg-black p-1 border border-black rotate-3">
                                <CheckCircle2 className="w-8 h-8 text-[#ccff00] stroke-[3px]" />
                            </div>
                            <span className="text-2xl font-black text-black uppercase leading-tight">{text}</span>
                        </div>
                    ))}
                </div>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NXjwiW67fl4ov8bwfXRO?quantity=1"
                  className="bg-black text-[#ccff00] px-12 py-8 border-4 border-white font-display text-3xl uppercase transition-all brutalist-shadow transform hover:-translate-y-1"
                >
                    UNLOCK THE VAULT ($39)
                </a>
             </div>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto mb-32">
             <h2 className="text-4xl md:text-6xl font-display text-black text-center mb-20 uppercase tracking-tight decoration-wavy underline decoration-[#00ffff]">Questions</h2>
             <div className="space-y-12">
                <div className="bg-white border-4 border-black p-8 brutalist-shadow relative">
                    <div className="absolute -left-4 -top-4 bg-black text-white px-3 py-1 font-display text-xl border-2 border-black shadow-[2px_2px_0px_0px_#ff00ff]">01</div>
                    <h4 className="text-2xl font-display text-black mb-4 uppercase">How do I get the prompts?</h4>
                    <p className="text-sm text-black font-black font-mono leading-relaxed uppercase">// Immediately after purchase, you'll receive access to our Private Vault page. It's a searchable, categorized dashboard.</p>
                </div>
                <div className="bg-white border-4 border-black p-8 brutalist-shadow relative">
                    <div className="absolute -left-4 -top-4 bg-black text-white px-3 py-1 font-display text-xl border-2 border-black shadow-[2px_2px_0px_0px_#ccff00]">02</div>
                    <h4 className="text-2xl font-display text-black mb-4 uppercase">No Code?</h4>
                    <p className="text-sm text-black font-black font-mono leading-relaxed uppercase">// Zero code required. If you can copy text and paste it into a chat box, you can use every workflow in this vault.</p>
                </div>
                <div className="bg-white border-4 border-black p-8 brutalist-shadow relative">
                    <div className="absolute -left-4 -top-4 bg-black text-white px-3 py-1 font-display text-xl border-2 border-black shadow-[2px_2px_0px_0px_#00ffff]">03</div>
                    <h4 className="text-2xl font-display text-black mb-4 uppercase">Boring AI?</h4>
                    <p className="text-sm text-black font-black font-mono leading-relaxed uppercase">// Most prompt bundles are fluffy. Mine are Boring. I focus on high-reliability business logic that works in production.</p>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
