import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Terminal, Target, ArrowRight, Zap, BarChart, PenTool, CheckCircle, Lock, Server, Cpu } from 'lucide-react'
import Link from 'next/link'

export default function ZeroBudgetMarketing() {
  const title = "The $0 Marketing Stack: Clone a $50k/mo Team with Agents";
  const description = "Beat funded competitors using free AI agents. A complete automated marketing stack for bootstrappers. Competitor Intel, Content Scaling, and Outbound.";

  const comparison = [
    { role: "Competitor Analysis", human: "$5,000/mo (Agency)", agent: "$0 (Python Script)" },
    { role: "Social Media Manager", human: "$4,000/mo (Freelancer)", agent: "$0 (Claude Context)" },
    { role: "Outbound SDR", human: "$60,000/yr (Salary)", agent: "$0 (Signal Scraper)" },
    { role: "SEO Specialist", human: "$3,000/mo (Retainer)", agent: "$0 (Clustering Bot)" },
    { role: "Total Cost", human: "~$15,000/mo", agent: "$0 (Just API credits)" },
  ];

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* HEADER */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] px-4 py-2 border-2 border-black font-black text-[10px] uppercase tracking-[0.3em] mb-8 transform -rotate-1 brutalist-shadow-sm">
            <Terminal className="w-3.5 h-3.5" /> Asymmetric Warfare
          </div>
          <h1 className="text-5xl md:text-8xl font-display tracking-tight mb-8 uppercase leading-[0.9] text-black glitch-text" data-text="CLONE A TEAM WITH TEXT FILES">
            How to Clone a Marketing Team <br/>
            <span className="text-[#ff00ff]">With 5 Text Files.</span>
          </h1>
          <p className="text-xl md:text-2xl text-black font-bold leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm text-left">
            Your competitor raised $81M. You have $0. <br/>
            You can't out-spend them. But you can <span className="bg-black text-[#ccff00] px-1 uppercase italic font-bold border-2 border-black">out-automate</span> them. <br/><br/>
            Most founders think they need to hire an agency to grow. You don't. You need "Boring Agents" - simple scripts that run locally on your computer and do the grunt work of a 10-person marketing department.
          </p>
        </div>

        {/* THE MATH */}
        <div className="bg-white border-4 border-black p-8 brutalist-shadow mb-20">
          <h3 className="text-2xl font-display text-black mb-8 flex items-center gap-3 uppercase decoration-wavy underline decoration-[#ff00ff]">
            <BarChart className="w-8 h-8 text-black stroke-[3px]" /> The Arbitrage Opportunity
          </h3>
          <div className="overflow-x-auto font-mono">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-4 border-black">
                  <th className="pb-4 text-black font-black uppercase tracking-widest bg-[#f0f0f0] px-2">Role</th>
                  <th className="pb-4 text-red-600 font-black uppercase tracking-widest px-2">Human Cost</th>
                  <th className="pb-4 text-emerald-600 font-black uppercase tracking-widest px-2">Agent Cost</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b-2 border-black/10 hover:bg-[#ccff00]/10 transition-colors uppercase font-black text-[10px]">
                    <td className="py-4 px-2 font-display text-base">{row.role}</td>
                    <td className="py-4 px-2 text-black/60">{row.human}</td>
                    <td className="py-4 px-2 text-emerald-600 text-sm bg-[#ccff00]/5 font-bold">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STEP 1: INTEL */}
        <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm mb-20 rotate-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-[#00ffff] border-2 border-black brutalist-shadow-sm shadow-[#00ffff]">
              <Target className="w-6 h-6 stroke-[3px]" />
            </div>
            <h2 className="text-3xl font-display text-black uppercase">1. The "Intel" Agent</h2>
          </div>
          <p className="text-lg text-black font-bold mb-6 leading-relaxed font-mono italic">
            // Your competitors are leaking data. They have public sitemaps, public ad libraries, and public tech stacks. 
            An agency would charge you $5,000 to "audit" this.
          </p>
          <p className="text-lg text-black font-bold mb-8 leading-relaxed font-mono italic">
            // Our <strong>Competitor Tech Stack Spy</strong> blueprint does it for free. It crawls their site, identifies every tool they use, and checks their `sitemap.xml` to see what content they are prioritizing.
          </p>
          
          <div className="bg-black border-4 border-black p-6 font-mono text-xs text-[#00ffff] mb-0 relative shadow-2xl">
            <div className="absolute top-2 right-4 text-white/20 uppercase font-black">Agent_Output</div>
            <div className="mb-2 text-white/40"># Output from 'Competitor Spy' Agent</div>
            <div>&gt; Scanning competitor.com...</div>
            <div>&gt; Found: Hubspot (CRM)</div>
            <div>&gt; Found: Segment (Analytics)</div>
            <div className="bg-red-900/20 px-1 border border-red-500/30">&gt; Found: 6sense (Intent Data) -- <span className="text-[#ff00ff] font-black underline">WARNING: They are moving upmarket.</span></div>
            <div>&gt; Found: 45 new blog posts in /enterprise-sales</div>
            <div className="text-[#ccff00] mt-4 font-black">✓ Report generated: intel_brief.md</div>
          </div>
        </div>

        {/* STEP 2: CONTENT */}
        <div className="bg-white border-4 border-black p-8 brutalist-shadow mb-20 -rotate-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ff00ff] border-2 border-black brutalist-shadow-sm shadow-[#ff00ff]">
              <PenTool className="w-6 h-6 stroke-[3px]" />
            </div>
            <h2 className="text-3xl font-display text-black uppercase">2. The "Content" Waterfall</h2>
          </div>
          <p className="text-lg text-black font-bold mb-8 leading-relaxed font-mono italic">
            // You can't afford a social media manager. But you can record <strong>one video</strong>.
            The <strong>Content Repurposer</strong> agent takes a raw transcript and applies a "Waterfall" logic.
          </p>
          <ul className="space-y-6 mb-8 font-mono font-black uppercase text-xs">
            <li className="flex items-start gap-4">
              <div className="bg-[#ff00ff] text-white p-1 border-2 border-black rotate-3">01</div>
              <span className="pt-1"><strong>Step 1:</strong> Extracts the "Core Insight" (removes fluff).</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-[#ccff00] text-black p-1 border-2 border-black -rotate-3">02</div>
              <span className="pt-1"><strong>Step 2:</strong> Writes a long-form LinkedIn essay (Hook + Story + Lesson).</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-[#00ffff] text-black p-1 border-2 border-black rotate-6">03</div>
              <span className="pt-1"><strong>Step 3:</strong> Writes 5 tweet variations (Contrarian, Listicle, Question).</span>
            </li>
          </ul>
          <p className="text-lg text-black font-bold font-mono italic">
            // It doesn't just "summarize." It <strong>rewrites</strong> based on the platform's algorithm.
          </p>
        </div>

        {/* STEP 3: OUTBOUND */}
        <div className="bg-white border-4 border-black p-8 brutalist-shadow mb-20 rotate-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ccff00] border-2 border-black brutalist-shadow-sm shadow-[#ccff00]">
              <Zap className="w-6 h-6 stroke-[3px] fill-current" />
            </div>
            <h2 className="text-3xl font-display text-black uppercase">3. The "Signal" Hunter</h2>
          </div>
          <p className="text-lg text-black font-bold mb-8 leading-relaxed font-mono italic">
            // Cold outreach fails when it's generic. It works when it's relevant.
            The <strong>Signal Scraper</strong> agent monitors 100 target accounts for specific triggers:
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8 font-mono font-black uppercase text-xs">
             <div className="bg-gray-50 p-6 border-4 border-black brutalist-shadow-sm">
               <span className="text-[#ff00ff] font-black block mb-4 border-b-2 border-black pb-2">Trigger A: Hiring</span>
               <span className="text-black leading-relaxed">"They just posted a job for 'Head of Sales'. They need our CRM tool."</span>
             </div>
             <div className="bg-gray-50 p-6 border-4 border-black brutalist-shadow-sm">
               <span className="text-[#ccff00] bg-black px-1 font-black block mb-4 border-b-2 border-black pb-2">Trigger B: Tech Change</span>
               <span className="text-black leading-relaxed">"They just removed 'Intercom' from their site. They are looking for a replacement."</span>
             </div>
          </div>
          <p className="text-lg text-black font-bold font-mono italic">
            // The agent alerts you <strong>only</strong> when a trigger fires. You spend 0 minutes prospecting.
          </p>
        </div>

        {/* FINAL CTA */}
        <div className="bg-black text-white border-4 border-black p-12 md:p-20 text-center brutalist-shadow relative overflow-hidden mb-24">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-display text-white mb-8 uppercase leading-tight glitch-text" data-text="STEAL THIS ENTIRE STACK.">Steal This <br/> Entire Stack.</h2>
            <p className="text-xl text-white font-black uppercase mb-12 max-w-2xl mx-auto leading-relaxed bg-[#ff00ff] border-4 border-white inline-block px-4 py-2 rotate-1">
              Actual Blueprint Files (.md and .json) that you can run in your terminal today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a 
                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                className="w-full sm:w-auto px-12 py-6 bg-[#ccff00] text-black border-4 border-white font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                Unlock All ($39) <ArrowRight className="w-8 h-8 stroke-[3px] inline-block ml-2" />
              </a>
              <Link href="/#blueprints" className="text-white font-display text-xl uppercase underline decoration-wavy decoration-[#ff00ff] hover:text-[#ccff00] transition-colors">
                See All Blueprints
              </Link>
            </div>
            <p className="mt-8 text-xs text-white/40 font-black font-mono uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" /> One-time payment. No recurring fees.
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}
