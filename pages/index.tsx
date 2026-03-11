import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Lightbulb, ArrowRight, Zap, Clock, Shield, TrendingUp, Users, Brain, Code, Target, Sparkles, Coffee } from 'lucide-react';
import FeaturedIn from '../components/FeaturedIn';

// Plain-English "Featured Ideas" 
const featuredIdeas = [
  {
    "id": "10k-report-prospector",
    "vertical": "Sales",
    "problem": "Stop manually reading 100-page financial reports.",
    "what_ai_does": "This tool scans annual reports for you, pulls out the 'Risk Factors', and writes a personalized email showing how you can help.",
    "time_saved": "2-5 hours / week",
    "difficulty": "Beginner"
  },
  {
    "id": "employee-flight-risk-detector",
    "vertical": "HR",
    "problem": "Identify team burnout before someone quits.",
    "what_ai_does": "It notices when team frustration or 'quiet quitting' starts to happen in Slack so you can talk to them before they leave.",
    "time_saved": "$50k+ saved / year",
    "difficulty": "Beginner"
  },
  {
    "id": "canonical-tag-auditor",
    "vertical": "Marketing",
    "problem": "Fix the hidden errors hurting your Google rankings.",
    "what_ai_does": "It finds the silent technical errors on your website that prevent your pages from showing up in search results.",
    "time_saved": "5 hours / month",
    "difficulty": "Beginner"
  },
  {
    "id": "vendor-negotiation-script",
    "vertical": "Executive",
    "problem": "Lower your monthly software bills by 20%.",
    "what_ai_does": "It researches competitor prices and writes a polite but firm script for you to use to get a better deal on your software.",
    "time_saved": "$5,000 / year",
    "difficulty": "Beginner"
  },
  {
    "id": "contract-redline-risk-spotter",
    "vertical": "Legal",
    "problem": "Spot the 'gotchas' in your contracts instantly.",
    "what_ai_does": "It scans new legal documents and highlights the risky clauses (like liability or payment terms) that you might miss.",
    "time_saved": "2 hours / contract",
    "difficulty": "Beginner"
  },
  {
    "id": "qbr-deck-generator",
    "vertical": "Customer Success",
    "problem": "Send better client reports in half the time.",
    "what_ai_does": "It turns your raw customer data into a clear story that shows exactly how much value you've delivered this month.",
    "time_saved": "10 hours / month",
    "difficulty": "Beginner"
  },
  {
    "id": "career-page-keyword-alert",
    "vertical": "Sales",
    "problem": "Know exactly when a lead starts hiring.",
    "what_ai_does": "Hiring is a sign of budget. This notifies you the second a target company posts a job for a role that needs your product.",
    "time_saved": "5 hours / week",
    "difficulty": "Beginner"
  },
  {
    "id": "board-deck-narrative-factory",
    "vertical": "Executive",
    "problem": "Stop sending messy spreadsheets to your board.",
    "what_ai_does": "It looks at your numbers and helps you write a clear story about what's working and what needs to change for your directors.",
    "time_saved": "15 hours / quarter",
    "difficulty": "Beginner"
  }
];

export default function IdeasHomepage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-mono">
      <Head>
        <title>How much time can you save this week? | Real AI Examples</title>
        <meta name="description" content="Browse 668 practical ideas to get your time back. From sales to marketing, find exactly what works for your business." />
      </Head>

      <Navbar />

      <main>
        {/* HERO: PRACTICAL & Conversational */}
        <section className="pt-40 pb-24 px-4 border-b border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-widest mb-8">
              <Coffee className="w-3 h-3" /> Practical Business Tools
            </div>
            
            <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.8] tracking-tighter mb-12">
              What Can AI <br />
              Actually <span className="text-[#ccff00]">Do?</span>
            </h1>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <p className="text-xl md:text-3xl font-bold leading-tight text-white/90">
                  Stop wasting hours on repetitive tasks. Browse 500+ ideas that save 2-10 hours per week.
                </p>
                
                <div className="pt-6">
                  <Link
                    href="/ideas-database"
                    className="inline-flex items-center gap-4 bg-[#ccff00] text-black px-10 py-6 font-display text-2xl uppercase hover:translate-x-1 hover:translate-y-1 transition-transform brutalist-shadow-white"
                  >
                    Browse 668 Ideas <ArrowRight className="w-8 h-8" strokeWidth={3} />
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 hidden lg:block">
                 <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                   <div className="w-3 h-3 bg-[#ccff00] rounded-full"></div>
                   <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">Quick Samples / Find Your Business Type</span>
                </div>
                <div className="space-y-4 text-sm font-bold">
                  <div className="text-[#ccff00]"> {'>'} Sales: Personalized Research</div>
                  <div className="text-white/40 italic">// Stop reading 100-page reports manually.</div>
                  <div className="text-[#ccff00] pt-4"> {'>'} HR: Identify Burnout Early</div>
                  <div className="text-white/40 italic">// Catch team frustration before they quit.</div>
                  <div className="text-[#ccff00] pt-4"> {'>'} Finance: Lower Your Bills</div>
                  <div className="text-white/40 italic">// Save 20% on your monthly software costs.</div>
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
                What's <br />
                <span className="text-[#ccff00]">Possible.</span>
              </h2>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hidden md:block">
                Sample ideas that save 2-10 hours per week
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredIdeas.map((idea) => (
                <Link key={idea.id} href={`/ideas/${idea.id}`}>
                  <div className="h-full bg-black border-2 border-white/10 p-6 flex flex-col hover:border-[#ccff00] transition-colors group cursor-pointer relative">
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-[#ccff00] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                        {idea.vertical}
                      </span>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                        {idea.difficulty === 'Beginner' ? 'Simple to Start' : idea.difficulty === 'Intermediate' ? 'Practical' : 'Strategic'}
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
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/ideas-database"
                className="inline-flex items-center gap-2 border-2 border-[#ccff00] text-[#ccff00] px-8 py-4 font-black uppercase tracking-widest hover:bg-[#ccff00] hover:text-black transition-colors"
              >
                Explore All 668 Ideas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECONDARY INFO */}
        <section className="py-24 px-4 border-t border-white/10">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-white/40 font-black uppercase tracking-[0.3em] text-xs mb-8">Work Smarter, Not Harder</p>
            <h2 className="text-2xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight">
              Every idea is practical, easy to start, and designed to save you <span className="text-[#ccff00]">real time and money.</span>
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-12 opacity-30">
               <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> SAVES TIME</div>
               <div className="flex items-center gap-2"><Target className="w-5 h-5" /> EASY TO START</div>
               <div className="flex items-center gap-2"><Brain className="w-5 h-5" /> PRACTICAL</div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
        
        .font-display {
          font-family: 'Archivo Black', sans-serif;
        }
      `}</style>
    </div>
  );
}
