import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Terminal, Cpu, Zap, ArrowRight, CheckCircle2, MessageSquare, Download, Command, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function LearnAIPage() {
  const pageTitle = "How to Setup AI Agents | Claude Code & Gemini CLI Guide";
  const pageDescription = "Learn how to install and run AI agents on your machine. A complete guide to setting up Claude Code, Gemini CLI, and using Agentic Blueprints.";

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        
        {/* SEO Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.2em] mb-6 font-mono">
                <Terminal className="w-3 h-3" /> The Quickstart Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight uppercase italic">
              A Chatbot <span className="text-accent">with Hands.</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed font-light max-w-2xl">
              Designed for all non-technical, AI-curious professionals. ChatGPT can write an email, but it can't send it. AI Agents live on your computer. They can create files, run searches, and manage projects - just like a remote intern.
            </p>
          </div>

          {/* Setup Steps */}
          <div className="space-y-24">
            
            {/* Step 1: Tool Selection */}
            <section className="relative">
               <div className="absolute -left-12 top-0 text-6xl font-black text-white/5 font-mono hidden md:block">01</div>
               <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Cpu className="text-accent" /> Step 1: Pick Your Tool
               </h2>
               <p className="text-text-secondary mb-8 leading-relaxed">
                  We recommend **Claude Code** or **Gemini CLI**. These are professional-grade tools that run inside your computer's terminal.
               </p>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-secondary-bg border border-navy-dark p-8 rounded-2xl group hover:border-accent/30 transition-all">
                     <h3 className="text-xl font-bold text-white mb-4">Claude Code</h3>
                     <p className="text-sm text-text-secondary mb-6 leading-relaxed">Best for complex coding, file manipulation, and deep reasoning.</p>
                     <div className="bg-primary-bg p-4 rounded-xl font-mono text-xs text-accent border border-white/5 mb-6">
                        npm install -g @anthropic-ai/claude-code
                     </div>
                     <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-white flex items-center gap-2">
                        View Docs <ArrowRight className="w-3 h-3" />
                     </a>
                  </div>

                  <div className="bg-secondary-bg border border-navy-dark p-8 rounded-2xl group hover:border-accent/30 transition-all">
                     <h3 className="text-xl font-bold text-white mb-4">Gemini CLI</h3>
                     <p className="text-sm text-text-secondary mb-6 leading-relaxed">Best for rapid data processing and massive context windows.</p>
                     <div className="bg-primary-bg p-4 rounded-xl font-mono text-xs text-accent border border-white/5 mb-6">
                        npm install -g @google/gemini-cli
                     </div>
                     <a href="https://github.com/google/gemini-cli" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-white flex items-center gap-2">
                        View Docs <ArrowRight className="w-3 h-3" />
                     </a>
                  </div>
               </div>
            </section>

            {/* Step 2: Blueprints */}
            <section className="relative">
               <div className="absolute -left-12 top-0 text-6xl font-black text-white/5 font-mono hidden md:block">02</div>
               <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Download className="text-accent" /> Step 2: Copy a Skill
               </h2>
               <p className="text-text-secondary mb-8 leading-relaxed">
                  Browse our library of **700+ AI Skills**. Each skill is a rigid set of instructions that tells the agent exactly how to perform a business task.
               </p>
               <div className="bg-secondary-bg border border-navy-dark p-8 rounded-3xl relative overflow-hidden group">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                        <Zap className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-white uppercase">The Sales Sniper</h4>
                        <p className="text-xs text-text-secondary">Ready to copy</p>
                     </div>
                  </div>
                  <div className="bg-primary-bg p-6 rounded-xl border border-white/5 font-mono text-xs text-text-secondary mb-6 opacity-60">
                     Role: You are an expert lead researcher... <br/>
                     Objective: Find 50 prospects in the SaaS niche... <br/>
                     Workflow: Phase 1: Scrape LinkedIn...
                  </div>
                  <Link href="/skills" className="bg-white text-primary-bg px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all inline-block">
                     Browse the Library
                  </Link>
               </div>
            </section>

            {/* Step 3: Running */}
            <section className="relative">
               <div className="absolute -left-12 top-0 text-6xl font-black text-white/5 font-mono hidden md:block">03</div>
               <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Command className="text-accent" /> Step 3: Run the Agent
               </h2>
               <p className="text-text-secondary mb-8 leading-relaxed">
                  Open your terminal, type <code className="bg-secondary-bg px-1 py-0.5 rounded text-accent border border-white/5">claude</code> or <code className="bg-secondary-bg px-1 py-0.5 rounded text-accent border border-white/5">gemini</code>, paste the logic, and watch the agent execute the play. No more manual grunt work.
               </p>
               <div className="bg-black rounded-2xl border border-navy-dark p-6 shadow-2xl font-mono text-sm">
                  <div className="flex gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500/20" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                     <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                  </div>
                  <div className="text-text-secondary space-y-2">
                     <div className="flex gap-2">
                        <span className="text-accent italic">➜</span>
                        <span className="text-white">claude "Run the Lead Finder Logic"</span>
                     </div>
                     <div className="text-blue-400">Scanning... Found 50 prospects.</div>
                     <div className="text-emerald-400">✓ Created leads.csv</div>
                     <div className="flex gap-2">
                        <span className="text-accent italic">➜</span>
                        <span className="animate-pulse">_</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Help Section */}
            <section className="bg-white text-primary-bg rounded-[40px] p-12 md:p-16 text-center">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-6">Stuck? We'll do it for you.</h2>
               <p className="text-lg mb-10 max-w-xl mx-auto font-medium">
                  If the terminal scares you, book an **AI Agent Kickstart Jam**. We'll setup everything via screen share and build your first 3 plays together.
               </p>
               <Link href="/agent-setup-service" className="inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-accent-hover transition-all shadow-2xl">
                  BOOK A SETUP JAM <ArrowRight className="w-5 h-5" />
               </Link>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}