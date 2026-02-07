import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Zap, Copy, CheckCircle2, ArrowRight, ShieldCheck, 
  Search, Filter, Sparkles, MessageSquare, Layout, 
  BarChart3, Globe, Mail, Lock
} from 'lucide-react';

export default function PromptBundlePage() {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const pageTitle = "The Master AI Workflow Vault | 700+ Copy-Paste Prompts for Business";
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
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
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

      <main className="relative pt-32">
        {/* Ambient background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* HERO */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-8 font-mono">
                <Sparkles className="w-3.5 h-3.5" /> THE LARGEST B2B WORKFLOW LIBRARY
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase italic text-white leading-[0.9]">
              The Master AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Prompt Vault</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed mb-12">
              700+ professional-grade AI prompts and workflows for high-growth Sales, Marketing, and Ops teams. <br className="hidden md:block" /> 
              Stop guessing. Just <strong className="text-white">copy, paste, and win.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NXjwiW67fl4ov8bwfXRO?quantity=1"
                  className="w-full sm:w-auto px-12 py-5 bg-white text-primary-bg font-bold rounded-xl hover:bg-gray-100 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                >
                    Unlock the Vault ($39) <ArrowRight className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-12 py-5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/5 font-bold rounded-xl transition-all flex items-center justify-center text-lg uppercase tracking-wider"
                >
                    Browse Categories
                </button>
            </div>
          </div>

          {/* THE VALUE SECTION */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
             <div className="bg-secondary-bg/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 mb-6 border border-red-500/20">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Data-Driven Logic</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                    Standard prompts fail on complex data. My workflows are built to handle massive CSVs, deep audits, and multi-step research.
                </p>
             </div>
             <div className="bg-secondary-bg/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 border border-accent/20">
                    <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Structured Output</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                    Every workflow is engineered to produce structured, usable results. Tables, reports, and code - ready for your team.
                </p>
             </div>
             <div className="bg-secondary-bg/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">Tool Agnostic</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                    Formatted for ChatGPT, Claude, and Gemini. One library to rule every model you use in your business.
                </p>
             </div>
          </div>

          {/* PREVIEW / SAMPLE GRID */}
          <div id="preview" className="mb-32">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight italic">Step inside the Vault</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-secondary-bg text-text-secondary border border-white/5 hover:border-white/20'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {/* SAMPLE CARD 1 */}
                <div className="bg-secondary-bg border border-navy-dark rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <BarChart3 className="w-32 h-32 text-accent" />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-accent/10 p-2 rounded-lg text-accent border border-accent/20">
                            <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-bold">Marketing Ops</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 italic uppercase">The Competitor Watchtower</h3>
                    <p className="text-text-secondary mb-8 font-light">Automatically audits your competitor's landing page and identifies their 3 primary conversion hooks.</p>
                    <div className="bg-primary-bg rounded-xl border border-white/5 p-4 mb-6 font-mono text-xs text-text-secondary opacity-60">
                        Role: You are an expert CRO Analyst... <br/>
                        Objective: Extract the primary USP... <br/>
                        Workflow: Phase 1: Identify Hooks...
                    </div>
                    <button 
                        onClick={handleCopySample}
                        className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                    >
                        {copied ? "Copied to Clipboard!" : "Copy Sample Prompt"}
                    </button>
                </div>

                {/* SAMPLE CARD 2 */}
                <div className="bg-secondary-bg border border-navy-dark rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Globe className="w-32 h-32 text-purple-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/20">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-bold">SEO</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 italic uppercase">The Semantic Cluster Bot</h3>
                    <p className="text-text-secondary mb-8 font-light">Turns a raw list of 100 keywords into a structured content cluster with Pillar and Cluster relationships.</p>
                    <div className="bg-primary-bg rounded-xl border border-white/5 p-4 mb-6 font-mono text-xs text-text-secondary opacity-60">
                        Role: You are a Semantic SEO Specialist... <br/>
                        Objective: Map keyword entities... <br/>
                        Workflow: Phase 1: Entity Extraction...
                    </div>
                    <a href="#" className="flex items-center gap-2 text-text-secondary/40 font-bold uppercase tracking-widest text-xs cursor-not-allowed">
                        <Lock className="w-3 h-3" /> Locked in Vault
                    </a>
                </div>
             </div>
          </div>

          {/* VALUE PROPOSITION */}
          <div className="bg-white text-primary-bg rounded-[40px] p-12 md:p-20 mb-32 relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-5">
                <Zap className="w-96 h-96" />
             </div>
                          <div className="max-w-3xl relative z-10">
                             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">Stop writing from scratch. <br/> Start executing.</h2>
                             <div className="space-y-6 mb-12">
                                 {[
                                     "700+ Field-tested workflows for every business role.",
                                     "Get 1 year of access to the complete vault.",
                                     "Direct copy-paste format. No technical knowledge required.",
                                     "Weekly updates with the latest 'Boring AI' plays."
                                 ].map((text, i) => (                        <div key={i} className="flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                            <span className="text-xl font-medium">{text}</span>
                        </div>
                    ))}
                </div>
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NXjwiW67fl4ov8bwfXRO?quantity=1"
                  className="inline-flex items-center gap-3 bg-accent text-white px-12 py-6 rounded-2xl font-black text-2xl hover:bg-accent-hover transition-all shadow-2xl transform hover:-translate-y-1"
                >
                    UNLOCK THE VAULT ($39)
                </a>
             </div>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto mb-32">
             <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest">Common Questions</h2>
             <div className="space-y-8">
                <div>
                    <h4 className="text-xl font-bold text-white mb-2 italic">How do I get the prompts?</h4>
                    <p className="text-text-secondary font-light">Immediately after purchase, you'll receive access to our Private Vault page. It's a searchable, categorized dashboard where you can copy the full logic for all 700+ workflows with one click.</p>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-white mb-2 italic">Do I need to be a developer?</h4>
                    <p className="text-text-secondary font-light">Zero code required. If you can copy text and paste it into a chat box, you can use every single workflow in this vault.</p>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-white mb-2 italic">What makes these different?</h4>
                    <p className="text-text-secondary font-light">Most prompt bundles are fluffy. Mine are **Boring**. I focus on high-reliability business logic—cleaning data, auditing competitors, and building content machines that actually work in production.</p>
                </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
