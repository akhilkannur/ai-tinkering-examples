import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Check, ArrowRight, Clock, Star, XCircle, Terminal, Zap, ShieldCheck, FileText } from 'lucide-react'
import { useState } from 'react'

export default function AgentSetupService() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-blue-100">
      <Head>
        <title>The Strategic Agent Jam | AI Agent Setup & Strategy</title>
        <meta name="description" content="Stop fighting with terminal errors. I’ll act as your AI filter, set up your environment, and build 3 custom workflows in 90 minutes." />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24">
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-3xl text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-8 border border-blue-100">
            <Zap className="w-3 h-3" /> Now Expanded to 90 Minutes
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900 leading-[1.1]">
            The Strategic <br /><span className="text-blue-600">Agent Jam</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
            Stop fighting with terminal errors. I’ll act as your <strong>AI filter</strong>, get your agents running, and build your first 3 workflows with you in 90 minutes.
          </p>
        </div>

        <div className="container mx-auto px-4 max-w-2xl">
          {/* WHAT THIS IS */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">What This Is</h2>
            <div className="prose prose-slate prose-lg text-slate-600 space-y-6">
              <p>
                The AI world is full of slop. You’ve seen the demos, but you don't have the time to audit 700+ blueprints to find the 3 that actually move the needle for your business.
              </p>
              <p>
                <strong>I am your filter.</strong> I spend 40+ hours a week breaking AI agents so you don't have to. In this 90-minute session, we move from "Theory" to "Local Execution."
              </p>
            </div>
          </section>

          {/* THE 90-MINUTE SPRINT */}
          <section className="mb-20 bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" /> The 90-Minute Timeline
            </h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="font-mono text-blue-600 font-bold shrink-0 pt-1">00-20</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Environment Audit</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">We clean your Node.js environment, fix permission errors, and get Gemini CLI & Claude Code authenticated on your local machine.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="font-mono text-blue-600 font-bold shrink-0 pt-1">20-50</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">The Blueprint Filter</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">We deep-dive into your specific business bottlenecks. I'll help you select the exact "Plays" from my library of 700+ blueprints that will yield the highest ROI.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="font-mono text-blue-600 font-bold shrink-0 pt-1">50-90</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Live Build & Run</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">We don't just talk. We script your first 3 "Agent Plays" together live, running them against your actual business data (CSVs, URLs, or Docs).</p>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT YOU GET */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8">What You’ll Have</h2>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <span><strong>A Verified Environment:</strong> No more "Command Not Found" errors. Ever.</span>
              </li>
              <li className="flex gap-3">
                <Terminal className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span><strong>3 Custom Agents:</strong> Three production-ready scripts tailored to your workflow.</span>
              </li>
              <li className="flex gap-3">
                <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span><strong>The Execution Log:</strong> A post-call doc containing every command we ran and a 30-day scaling roadmap.</span>
              </li>
            </ul>
          </section>

          {/* QUALIFICATION SECTION */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" /> What this IS
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Technical unblocking for operators.</li>
                <li>• Strategic selection of AI workflows.</li>
                <li>• Hands-on build session.</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-400">
                <XCircle className="w-5 h-5" /> What this ISN'T
              </h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li>• Theoretical chat about AI trends.</li>
                <li>• Long-term software dev contract.</li>
                <li>• A "Guru" course with zero execution.</li>
              </ul>
            </div>
          </div>

          {/* PRICING CARD */}
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Terminal className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-400 uppercase tracking-widest">The Kickstart Jam</h2>
            <div className="text-7xl font-black mb-2 tracking-tighter">$99</div>
            <p className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-8">One-Time | 90 Minute Session</p>
            
            <p className="text-slate-400 mb-8 max-w-sm mx-auto font-light leading-relaxed">
              Zero friction. I handle the terminal, you handle the strategy. 100% refund if you aren't running agents by the end of the call.
            </p>

            <div className="mb-8">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-yellow-500 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                  <Clock className="w-3 h-3" /> Only 4 spots taken this week
                </div>
                <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[40%] h-full bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">6 / 10 Jams Available</span>
              </div>
            </div>

            <div className="mb-10">
              <label className="flex items-center justify-center gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">I'm ready to ship</span>
              </label>
            </div>

            <a 
              href={accepted ? "https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1" : "#"}
              className={`inline-flex items-center justify-center gap-3 w-full max-w-xs px-8 py-5 rounded-xl font-bold text-lg transition-all ${accepted ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              onClick={(e) => !accepted && e.preventDefault()}
            >
              Book My Jam <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* BIO SECTION */}
          <div className="text-center pt-24 border-t border-slate-100">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 grayscale border border-slate-200">
              <Image src="/images/akhil.jpg" alt="Akhil" width={80} height={80} className="object-cover" />
            </div>
            <p className="text-lg text-slate-600 italic mb-8 font-light leading-relaxed">
              "I’m not a software engineer. I’m a builder who uses AI to get work done. I’ve spent hundreds of hours breaking these tools so you don’t have to. I am still in the arena, building my own tools every day."
            </p>
            <div className="flex justify-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <a href="mailto:akhil@realaiexamples.com" className="hover:text-blue-600 transition-colors">Email</a>
              <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Personal Site</a>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-300 text-[9px] font-mono uppercase tracking-[0.4em]">
        <p>&copy; {new Date().getFullYear()} Real AI Examples. No Slop, Just Shipping.</p>
      </footer>
    </div>
  )
}
