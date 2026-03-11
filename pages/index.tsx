import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lightbulb, ArrowRight, Zap, Clock, Shield, TrendingUp, Users, Brain, Code, Target, Sparkles } from 'lucide-react';
import FeaturedIn from '../components/FeaturedIn';

// Hand-picked "Featured Ideas" from lib/ideas-data.json
const featuredIdeas = [
  {
    "id": "10k-report-prospector",
    "vertical": "Sales",
    "problem": "Turn 'Risk Factors' into 'Sales Pitches'.",
    "what_ai_does": "Parses a public company's 10-K (Annual Report) to extract specific 'Risk Factors' and generates a cold email positioning your product as the solution.",
    "time_saved": "2-5 hours / week",
    "difficulty": "Intermediate"
  },
  {
    "id": "employee-flight-risk-detector",
    "vertical": "HR",
    "problem": "Burnout and 'Quiet Quitting' are invisible until a resignation letter hits the desk.",
    "what_ai_does": "Analyzes anonymized sentiment trends in Slack/Public channels to flag rising friction or 'disengagement clusters'.",
    "time_saved": "$50k+ (Per Hire)",
    "difficulty": "Intermediate"
  },
  {
    "id": "canonical-tag-auditor",
    "vertical": "Marketing",
    "problem": "One scan to find Canonical conflicts, NoIndex errors, and Broken Links.",
    "what_ai_does": "Technical debt is invisible until traffic drops. This agent crawls your site to identify 'silent killers' before they kill your rankings.",
    "time_saved": "2-5 hours / week",
    "difficulty": "Intermediate"
  },
  {
    "id": "vendor-negotiation-script",
    "vertical": "Executive",
    "problem": "Save 20% on your software stack from a bill or a name.",
    "what_ai_does": "Researches competitor deals and parity pricing to find leverage, then drafts a high-pressure negotiation script for your specific vendor.",
    "time_saved": "$5k - $50k / year",
    "difficulty": "Intermediate"
  },
  {
    "id": "contract-redline-risk-spotter",
    "vertical": "Legal",
    "problem": "Spot deal-killing clauses in legal redlines instantly.",
    "what_ai_does": "Analyzes the diff of a contract and highlights high-risk changes (Liability, IP, Payment terms) that Sales needs to push back on.",
    "time_saved": "2 hours / contract",
    "difficulty": "Beginner"
  },
  {
    "id": "qbr-deck-generator",
    "vertical": "Customer Success",
    "problem": "Don't just report numbers. Tell a story of Value vs. Friction.",
    "what_ai_does": "Analyzes raw Usage Logs and Support Tickets to calculate an account 'Health Score' and generates a 5-slide strategic growth deck.",
    "time_saved": "10 hours / client",
    "difficulty": "Intermediate"
  },
  {
    "id": "career-page-keyword-alert",
    "vertical": "Sales",
    "problem": "Trigger outreach when a prospect posts a specific job role.",
    "what_ai_does": "Hiring is the strongest signal of budget. This agent monitors 100+ careers pages and alerts you when a 'Target Role' is posted.",
    "time_saved": "10+ hours / month",
    "difficulty": "Intermediate"
  },
  {
    "id": "board-deck-narrative-factory",
    "vertical": "Executive",
    "problem": "Founders send raw metrics to the Board; directors get confused.",
    "what_ai_does": "Ingests P&L and Sales data to draft the core narrative slides: The Win, The Bottleneck, and The Strategic Pivot.",
    "time_saved": "15 hours / quarter",
    "difficulty": "Intermediate"
  }
];

export default function IdeasHomepage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-mono">
      <Head>
        <title>What can you actually do with AI agents? | Real AI Examples</title>
        <meta name="description" content="Browse 660+ AI automation ideas across every department. Find what fits your workflow." />
      </Head>

      <Navbar />

      <main>
        {/* HERO: IDEA-FIRST */}
        <section className="pt-40 pb-24 px-4 border-b border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-widest mb-8">
              <Sparkles className="w-3 h-3" /> Inspiration Layer v2.0
            </div>
            
            <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.8] tracking-tighter mb-12">
              What can you <br />
              actually <span className="text-[#ccff00]">do?</span>
            </h1>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <p className="text-xl md:text-3xl font-bold leading-tight text-white/90">
                  Browse 668 AI automation ideas across every department. <br />
                  <span className="text-white/40">Find the specific pattern that fits your workflow.</span>
                </p>
                
                <div className="pt-6">
                  <Link
                    href="/ideas-database"
                    className="inline-flex items-center gap-4 bg-[#ccff00] text-black px-10 py-6 font-display text-2xl uppercase hover:translate-x-1 hover:translate-y-1 transition-transform brutalist-shadow-white"
                  >
                    Explore Ideas <ArrowRight className="w-8 h-8" strokeWidth={3} />
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 hidden lg:block">
                 <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                   <div className="w-3 h-3 bg-[#ccff00] rounded-full"></div>
                   <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">system / idea-engine / random_sample</span>
                </div>
                <div className="space-y-4 text-sm font-bold">
                  <div className="text-[#ccff00]"> {'>'} Pattern: The 10-K Stitcher</div>
                  <div className="text-white/40 italic">// Turn public risk factors into sales pitches.</div>
                  <div className="text-[#ccff00] pt-4"> {'>'} Pattern: Employee Flight Risk</div>
                  <div className="text-white/40 italic">// Detect churn signals before they resign.</div>
                  <div className="text-[#ccff00] pt-4"> {'>'} Pattern: Vendor Negotiator</div>
                  <div className="text-white/40 italic">// Save 20% on software stacks via AI scripts.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedIn />

        {/* SAMPLE IDEAS GRID */}
        <section className="py-24 px-4 bg-white/5">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-display text-4xl uppercase leading-[0.9] tracking-tighter">
                Sample <br />
                <span className="text-[#ccff00]">Patterns.</span>
              </h2>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hidden md:block">
                Curated samples from 668 ideas
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredIdeas.map((idea) => (
                <div key={idea.id} className="bg-black border-2 border-white/10 p-6 flex flex-col hover:border-[#ccff00] transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#ccff00] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                      {idea.vertical}
                    </span>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      {idea.difficulty}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black uppercase leading-tight mb-4 group-hover:text-[#ccff00] transition-colors">
                    {idea.problem}
                  </h3>
                  
                  <p className="text-xs text-white/50 mb-8 flex-grow leading-relaxed font-bold">
                    // {idea.what_ai_does}
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-[#ccff00] text-[10px] font-black uppercase tracking-widest">
                    <Zap className="w-3 h-3" /> {idea.time_saved}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/ideas-database"
                className="inline-flex items-center gap-2 border-2 border-[#ccff00] text-[#ccff00] px-8 py-4 font-black uppercase tracking-widest hover:bg-[#ccff00] hover:text-black transition-colors"
              >
                Explore All 668 Patterns <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECONDARY INFO */}
        <section className="py-24 px-4 border-t border-white/10">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-white/40 font-black uppercase tracking-[0.3em] text-xs mb-8">Proof of Work</p>
            <h2 className="text-2xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight">
              Every idea in this database is backed by a <span className="text-[#ccff00]">functional technical blueprint</span> we use ourselves.
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-12 opacity-30">
               <div className="flex items-center gap-2"><Target className="w-5 h-5" /> ROI-FOCUSED</div>
               <div className="flex items-center gap-2"><Users className="w-5 h-5" /> OPERATOR-GRADE</div>
               <div className="flex items-center gap-2"><Brain className="w-5 h-5" /> TOOL-AGNOSTIC</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
        
        .font-display {
          font-family: 'Archivo Black', sans-serif;
        }
      `}</style>
    </div>
  );
}
