import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Terminal, Cpu, Zap, ArrowRight, CheckCircle2, MessageSquare, Download, Command, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

export default function LearnAIPage() {
  const pageTitle = "How to Setup AI Agents | Claude Code & Gemini CLI Guide";
  const pageDescription = "Learn how to install and run AI agents on your machine. A complete guide to setting up Claude Code, Gemini CLI, and using Agentic Blueprints.";

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#ccff00] border-2 border-black font-black text-[10px] uppercase tracking-[0.3em] mb-8 transform -rotate-1 brutalist-shadow-sm">
                <Terminal className="w-3.5 h-3.5" /> The Quickstart Guide
            </div>
            <h1 className="text-5xl md:text-8xl font-display tracking-tight mb-8 uppercase leading-[0.9] text-black glitch-text" data-text="A CHATBOT WITH HANDS.">
              A Chatbot <br />
              <span className="text-[#ff00ff]">With Hands.</span>
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm">
              Designed for all non-technical, AI-curious professionals. ChatGPT can write an email, but it can't send it. AI Agents live on your computer.
            </p>
          </div>

          <div className="space-y-20">
            {/* Step 1 */}
            <section className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow relative">
               <div className="absolute -left-6 -top-6 bg-black text-white w-16 h-16 flex items-center justify-center font-display text-4xl border-4 border-black shadow-[4px_4px_0px_0px_#ff00ff]">01</div>
               <h2 className="text-3xl md:text-4xl font-display text-black mb-8 flex items-center gap-4 uppercase">
                  <Cpu className="w-8 h-8 text-[#ccff00] stroke-[3px]" /> Step 1: Pick Your Tool
               </h2>
               <p className="text-lg text-black font-bold mb-8 uppercase leading-tight">
                  I recommend <strong className="bg-black text-[#ccff00] px-1">Claude Code</strong> or <strong className="bg-black text-[#ccff00] px-1">Gemini CLI</strong>. These run inside your computer's terminal.
               </p>
               
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 border-2 border-black p-6 hover:bg-[#ccff00] transition-colors group">
                     <h3 className="text-2xl font-display text-black mb-4 uppercase">Claude Code</h3>
                     <p className="text-sm text-black font-black font-mono mb-6 uppercase tracking-widest leading-relaxed">// Best for complex coding, file manipulation, and deep reasoning.</p>
                     <div className="bg-black text-[#ccff00] p-4 border-2 border-black font-mono text-xs mb-6">
                        npm install -g @anthropic-ai/claude-code
                     </div>
                     <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="inline-block bg-white border-2 border-black text-black px-4 py-2 font-display text-xs uppercase brutalist-shadow-sm hover:bg-black hover:text-white transition-colors">
                        View Docs
                     </a>
                  </div>
                  <div className="bg-gray-50 border-2 border-black p-6 hover:bg-[#ff00ff] transition-colors group">
                     <h3 className="text-2xl font-display text-black mb-4 uppercase">Gemini CLI</h3>
                     <p className="text-sm text-black font-black font-mono mb-6 uppercase tracking-widest leading-relaxed">// High-speed agentic CLI for Google's Gemini models.</p>
                     <div className="bg-black text-[#ff00ff] p-4 border-2 border-black font-mono text-xs mb-6">
                        npm install -g @google/gemini-cli
                     </div>
                     <a href="https://github.com/google/gemini-cli" target="_blank" rel="noopener noreferrer" className="inline-block bg-white border-2 border-black text-black px-4 py-2 font-display text-xs uppercase brutalist-shadow-sm hover:bg-black hover:text-white transition-colors">
                        View Docs
                     </a>
                  </div>
               </div>
            </section>

            {/* Step 2 */}
            <section className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow relative">
               <div className="absolute -left-6 -top-6 bg-black text-white w-16 h-16 flex items-center justify-center font-display text-4xl border-4 border-black shadow-[4px_4px_0px_0px_#ccff00]">02</div>
               <h2 className="text-3xl md:text-4xl font-display text-black mb-8 flex items-center gap-4 uppercase">
                  <Download className="w-8 h-8 text-[#ff00ff] stroke-[3px]" /> Step 2: Pick a Skill
               </h2>
               <p className="text-lg text-black font-bold mb-8 uppercase leading-tight">
                  Browse my library of <strong className="bg-black text-[#ff00ff] px-1">500+ AI Skills</strong>. Each is a rigid set of instructions for a business task.
               </p>
               
               <div className="bg-[#ccff00] border-4 border-black p-6 rotate-1 brutalist-shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                        <div className="bg-black p-2 border-2 border-black text-white">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                        <h4 className="font-display text-2xl text-black uppercase">Example: Sales Sniper</h4>
                  </div>
                  <p className="text-sm text-black font-black uppercase tracking-widest leading-relaxed">
                     Download the "Lead Finder" skill and place it in your project folder.
                  </p>
               </div>
            </section>

            {/* Step 3 */}
            <section className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow relative">
               <div className="absolute -left-6 -top-6 bg-black text-white w-16 h-16 flex items-center justify-center font-display text-4xl border-4 border-black shadow-[4px_4px_0px_0px_#00ffff]">03</div>
               <h2 className="text-3xl md:text-4xl font-display text-black mb-8 flex items-center gap-4 uppercase">
                  <Command className="w-8 h-8 text-[#00ffff] stroke-[3px]" /> Step 3: Run It
               </h2>
               <p className="text-lg text-black font-bold mb-8 uppercase leading-tight">
                  Tell your terminal agent to use the skill. It will read your files and do the work.
               </p>
               
               <div className="bg-black p-8 border-4 border-black brutalist-shadow-sm text-white font-mono text-lg mb-8 relative">
                  <div className="absolute top-2 right-4 text-[10px] uppercase font-black tracking-widest text-[#ccff00]">Terminal</div>
                  <span className="text-[#ff00ff]">➜</span> <span className="text-[#ccff00]">claude</span> "Run the Lead Finder Logic"
               </div>
            </section>

            {/* Help Section */}
            <div className="bg-[#ff00ff] border-4 border-black p-8 md:p-12 brutalist-shadow text-center">
               <h2 className="text-3xl md:text-5xl font-display text-white mb-8 uppercase tracking-tight">Need a Hand?</h2>
               <p className="text-xl text-white font-black mb-12 uppercase leading-tight">
                  I can jump on a 90-minute call and set everything up for you.
               </p>
               <Link href="/agent-setup-service" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 border-4 border-black font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none mx-auto">
                  Book Setup Sprint <ArrowRight className="w-8 h-8 stroke-[3px]" />
               </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
