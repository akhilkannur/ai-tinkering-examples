import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import NewsletterForm from '../components/NewsletterForm'
import { Zap, AlertTriangle, TrendingUp, Cpu, Terminal, ShieldAlert, BarChart3, Calculator, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function StateOfAI() {
  const pageTitle = "State of Practical AI 2026: The Operator's Report";
  const pageDescription = "The tactical truth about AI agents in 2026. Benchmarks, ROI math, and the comparison of Gemini CLI vs Claude Code vs Cursor.";

  const [laborRate, setLaborRate] = useState(50);
  const [taskHours, setTaskHours] = useState(10);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Basic calculation: (Hours * Rate) * 0.9 (assuming 90% automation efficiency)
    setSavings(taskHours * laborRate * 0.9);
  }, [laborRate, taskHours]);

  const engines = [
    { name: "Gemini 2.0 (CLI)", strength: "2M Context Window", useCase: "Analyzing massive codebases/folders", rating: 9.5 },
    { name: "Claude Code", strength: "Agentic Execution", useCase: "Complex refactoring & building", rating: 9.2 },
    { name: "Cursor / Windsurf", strength: "IDE Integration", useCase: "Daily iterative development", rating: 8.8 },
    { name: "Qwen 2.5 (Local)", strength: "Zero Latency/Privacy", useCase: "Processing sensitive data offline", rating: 8.5 }
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} key="description" />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={pageTitle} key="og:title" />
        <meta property="og:description" content={pageDescription} key="og:description" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      </Head>

      <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-orange-500/30">
        <Navbar />

        {/* HERO: DATA-DRIVEN */}
        <div className="pt-32 pb-20 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 font-mono text-xs uppercase tracking-widest mb-6">
              2026 Operator's Report • Data Updated Monthly
            </div>
            <h1 className="text-5xl md:text-7xl font-header mb-6 leading-none tracking-tight">
              THE STATE OF <br />
              <span className="text-orange-500">PRACTICAL AI</span>
            </h1>
            <p className="text-xl text-slate-400 font-body max-w-2xl mx-auto leading-relaxed">
              The hype cycle is over. We're now in the <strong>Deployment Era</strong>. 
              Here is the tactical data on what is actually moving the needle for sales, marketing, and ops.
            </p>
          </div>
        </div>

        {/* SECTION 1: THE AGENT COMPARISON MATRIX */}
        <div className="container mx-auto px-4 max-w-5xl py-24">
          <div className="flex items-center gap-3 mb-12">
            <Cpu className="text-orange-500 w-8 h-8" />
            <h2 className="text-3xl font-header uppercase tracking-tight">Agent Engine Comparison</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {engines.map((engine, i) => (
              <div key={i} className="bg-slate-900 border border-white/10 p-6 rounded-xl hover:border-orange-500/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-white">{engine.name}</h3>
                  <div className="text-orange-500 font-mono font-bold">{engine.rating}/10</div>
                </div>
                <div className="space-y-3 font-body text-sm">
                  <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Primary Strength:</span> {engine.strength}</p>
                  <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Best For:</span> {engine.useCase}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl flex items-center justify-between">
            <div className="text-sm font-mono text-orange-200">
              <span className="font-bold mr-2">VERDICT:</span>
              Gemini CLI is the context king; Claude Code is the logic champion. Use both.
            </div>
            <Link href="/agent-setup-service" className="text-xs font-bold uppercase tracking-widest bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
              Setup My Workstation
            </Link>
          </div>
        </div>

        {/* SECTION 2: THE ROI CALCULATOR */}
        <div className="bg-slate-900/50 border-y border-white/5 py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-500 mb-4">
                  <Calculator className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Automation ROI</span>
                </div>
                <h2 className="text-4xl font-header uppercase mb-6 leading-tight">Quantify the <span className="text-orange-500">Arbitrage</span></h2>
                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  In 2026, the biggest competitive advantage isn't being "smarter"—it's having lower execution costs. Calculate how much you're leaving on the table by doing "manual" research.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Hourly Labor Rate ($)</label>
                    <input 
                      type="range" min="20" max="250" step="5" value={laborRate}
                      onChange={(e) => setLaborRate(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="mt-2 text-white font-mono">${laborRate}/hour</div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Hours spent on manual data tasks / week</label>
                    <input 
                      type="range" min="1" max="40" step="1" value={taskHours}
                      onChange={(e) => setTaskHours(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="mt-2 text-white font-mono">{taskHours} hours</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500 text-white p-10 rounded-3xl shadow-2xl shadow-orange-500/20 transform rotate-1">
                <h3 className="font-header text-3xl mb-2 uppercase italic">Potential Weekly Savings</h3>
                <div className="text-7xl font-header mb-6">${savings.toLocaleString()}</div>
                <div className="space-y-4 font-body text-sm border-t border-white/20 pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Based on 90% automation efficiency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Eliminating "Copy-Paste" fatigue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reclaiming {taskHours} focused hours</span>
                  </div>
                </div>
                <Link href="/500-ways-to-use-llms-for-work" className="mt-8 block bg-black text-white text-center py-4 font-bold rounded-lg hover:bg-slate-900 transition-colors">
                  Get the Blueprints
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE "GHOST" COST (HALLUCINATIONS) */}
        <div className="container mx-auto px-4 max-w-5xl py-24">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-red-500 mb-4">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-xs">Risk Assessment</span>
              </div>
              <h2 className="text-4xl font-header uppercase mb-6 leading-tight">The <span className="text-red-500">Hallucination Tax</span></h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Blind trust is the most expensive mistake in 2026. The "Tax" isn't the AI being wrong—it's the time you spend <strong>verifying</strong> that it's right.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase">Creative Tasks</h4>
                    <p className="text-xs text-slate-500">2-5% hallucination rate. Safe for brainstorming, risky for direct publishing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase">Analytical Tasks</h4>
                    <p className="text-xs text-slate-500">12-18% hallucination rate. Requires automated verification (Python/Unit Tests).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl">
              <h3 className="font-header text-2xl mb-6 uppercase tracking-wide">The "Operator" Protocol</h3>
              <ul className="space-y-6 font-body text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="text-orange-500 font-mono font-bold">01.</span>
                  <span><strong>Never upload direct:</strong> Always run AI output through a secondary "Fact-Checker" prompt or a local validator script.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-mono font-bold">02.</span>
                  <span><strong>Use Markdown Schemas:</strong> Giving the AI a rigid structure reduces hallucination by 40% vs. open-ended prompting.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-mono font-bold">03.</span>
                  <span><strong>Small Batches:</strong> Don't process 1,000 lines at once. Process in chunks of 50 to keep the "Reasoning Engine" sharp.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FINAL CTA: THE ACTIONABLE DATA */}
        <div className="bg-orange-500 text-white py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-header mb-8 tracking-tight uppercase leading-none">
              Data is useless <br />without <span className="italic">Deployment.</span>
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
              We don't just report on the state of AI. We build the blueprints that let you exploit it. Join 5,000+ operators getting tactical updates.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}