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
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        
        {/* HEADER */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-green-500/20">
            <Terminal className="w-3 h-3" /> Asymmetric Warfare
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            How to Clone a Marketing Team <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">With 5 Text Files.</span>
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl">
            Your competitor raised $81M. You have $0. <br/>
            You can't out-spend them. But you can <strong>out-automate</strong> them. <br/><br/>
            Most founders think they need to hire an agency to grow. You don't. You need "Boring Agents" - simple scripts that run locally on your computer and do the grunt work of a 10-person marketing department.
          </p>
        </div>

        {/* THE MATH */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-8 mb-20">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-accent" /> The Arbitrage Opportunity
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-navy-dark">
                  <th className="pb-4 text-text-secondary font-mono uppercase tracking-wider">Role</th>
                  <th className="pb-4 text-red-400 font-mono uppercase tracking-wider">Human Cost</th>
                  <th className="pb-4 text-green-400 font-mono uppercase tracking-wider">Agent Cost</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-b border-navy-dark/50 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 font-bold text-white">{row.role}</td>
                    <td className="py-4 text-text-secondary">{row.human}</td>
                    <td className="py-4 text-green-400 font-bold">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STEP 1: INTEL */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 border border-blue-500/30">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white">1. The "Intel" Agent</h2>
          </div>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            Your competitors are leaking data. They have public sitemaps, public ad libraries, and public tech stacks. 
            An agency would charge you $5,000 to "audit" this.
          </p>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Our <strong>Competitor Tech Stack Spy</strong> blueprint does it for free. It crawls their site, identifies every tool they use (e.g., "They use HubSpot and Segment"), and checks their `sitemap.xml` to see what content they are prioritizing.
          </p>
          
          <div className="bg-[#0D1117] rounded-lg border border-navy-dark p-6 font-mono text-xs text-blue-300 mb-8 shadow-2xl">
            <div className="mb-2 text-gray-500"># Output from 'Competitor Spy' Agent</div>
            <div>&gt; Scanning competitor.com...</div>
            <div>&gt; Found: Hubspot (CRM)</div>
            <div>&gt; Found: Segment (Analytics)</div>
            <div>&gt; Found: 6sense (Intent Data) -- <span className="text-yellow-400">WARNING: They are moving upmarket.</span></div>
            <div>&gt; Found: 45 new blog posts in /enterprise-sales</div>
            <div><span className="text-green-400">✓ Report generated: intel_brief.md</span></div>
          </div>
        </div>

        {/* STEP 2: CONTENT */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400 border border-purple-500/30">
              <PenTool className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white">2. The "Content" Waterfall</h2>
          </div>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            You can't afford a social media manager. But you can record <strong>one video</strong>.
            The <strong>Content Repurposer</strong> agent takes a raw transcript (from YouTube or Loom) and applies a "Waterfall" logic.
          </p>
          <ul className="space-y-4 mb-8 text-text-secondary">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
              <span><strong>Step 1:</strong> Extracts the "Core Insight" (removes fluff).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
              <span><strong>Step 2:</strong> Writes a long-form LinkedIn essay (Hook + Story + Lesson).</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
              <span><strong>Step 3:</strong> Writes 5 tweet variations (Contrarian, Listicle, Question).</span>
            </li>
          </ul>
          <p className="text-lg text-text-secondary">
            It doesn't just "summarize." It <strong>rewrites</strong> based on the platform's algorithm.
          </p>
        </div>

        {/* STEP 3: OUTBOUND */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400 border border-orange-500/30">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white">3. The "Signal" Hunter</h2>
          </div>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            Cold outreach fails when it's generic. It works when it's relevant.
            The <strong>Signal Scraper</strong> agent monitors 100 target accounts for specific triggers:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
             <div className="bg-secondary-bg p-4 rounded-lg border border-navy-dark">
               <span className="text-orange-400 font-bold block mb-1">Trigger A: Hiring</span>
               <span className="text-sm text-text-secondary">"They just posted a job for 'Head of Sales'. They need our CRM tool."</span>
             </div>
             <div className="bg-secondary-bg p-4 rounded-lg border border-navy-dark">
               <span className="text-orange-400 font-bold block mb-1">Trigger B: Tech Change</span>
               <span className="text-sm text-text-secondary">"They just removed 'Intercom' from their site. They are looking for a replacement."</span>
             </div>
          </div>
          <p className="text-lg text-text-secondary">
            The agent alerts you <strong>only</strong> when a trigger fires. You spend 0 minutes prospecting and 100% of your time selling to people who are already buying.
          </p>
        </div>

        {/* FINAL CTA */}
        <div className="bg-gradient-to-br from-accent/10 to-purple-900/20 border border-accent/30 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Steal This Entire Stack.</h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              These aren't just blog post ideas. These are actual <strong>Blueprint Files</strong> (.md and .json) that you can run in your terminal today. <br/><br/>
              Get the <strong>Competitor Spy</strong>, the <strong>Repurposer</strong>, the <strong>Signal Hunter</strong>, plus 500+ other workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                className="w-full sm:w-auto px-10 py-5 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2"
              >
                Get 1 Year Access ($39) <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/#blueprints" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-navy-dark hover:bg-white/10 text-white font-bold rounded-xl text-lg transition-all flex items-center justify-center gap-2">
                See All 500+ Blueprints
              </Link>
            </div>
            <p className="mt-6 text-sm text-text-secondary/60 font-mono flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" /> One-time payment. No recurring fees.
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}