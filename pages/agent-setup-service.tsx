import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Zap, ArrowRight, Cpu, Globe, Layers, Repeat, Command, Lock, ShieldCheck, CheckCircle2, Sparkles, MousePointer2, Star, TrendingUp, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const mockLines = [
  { text: "gemini run @lead-researcher.md", type: "input" },
  { text: "● Loading 50 domains from 'target_list.csv'...", type: "system" },
  { text: "● Phase 2: Browsing websites for 'Head of Growth' contacts...", type: "system" },
  { text: "✔ Found 42 verified contacts. Data enriched.", type: "success" },
  { text: "✔ Drafted 42 personalized icebreakers.", type: "success" },
  { text: "Output: 'outreach_ready.csv' saved to /results", type: "report" }
];

export default function AgentSetupService() {
  const title = "Agent Setup & Strategy Jam | Turn your machine into an AI Employee";
  const description = "Professional remote installation plus a 1-hour brainstorming session. Stop chatting and start assigning work to autonomous terminal agents.";

  const [accepted, setAccepted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => (prev < mockLines.length ? prev + 1 : 0));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#0F172A] text-white selection:bg-orange-500/30">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
        <style>{`
          .font-header { font-family: 'Bebas Neue', sans-serif; }
          .font-body { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'Courier Prime', monospace; }
          .texture-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.03;
            pointer-events: none;
          }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          .cursor-blink { animation: blink 1s infinite; }
        `}</style>
      </Head>

      <div className="fixed inset-0 texture-overlay z-50"></div>

      <Navbar />

      <main className="pt-24 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-6xl pt-12 mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-block bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 mb-6">
                <span className="text-xs font-bold text-orange-500 tracking-widest uppercase flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current" /> Early Adopter Offer: 8/10 Remaining
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-header mb-6 leading-[0.9] tracking-tight">
                GIVE YOUR AI <br />
                <span className="text-orange-500">HANDS.</span>
              </h1>
              
              <p className="font-body text-xl md:text-2xl mb-10 text-slate-400 leading-relaxed max-w-xl">
                Stop fighting with terminal errors. We'll remotely upgrade your machine and build your first <span className="text-white font-bold">Autonomous AI Employee</span> in 60 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-500/20"
                >
                  Book Setup Session ($99) <ArrowRight className="w-5 h-5" />
                </button>
                <Link href="#why" className="border border-white/10 hover:bg-white/5 text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center transition-all">
                  See Capabilities
                </Link>
              </div>

              <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                  <Cpu className="w-4 h-4" /> Gemini 2.0
                </div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                  <Zap className="w-4 h-4" /> Claude Code
                </div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                  <Globe className="w-4 h-4" /> Qwen
                </div>
              </div>
            </div>

            {/* VISUAL DEMO (Terminal) */}
            <div className="relative group hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative bg-[#0D1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
                <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Active Agent Execution</span>
                </div>
                <div className="p-8 min-h-[300px] flex flex-col gap-3">
                  {mockLines.slice(0, visibleLines).map((line, idx) => (
                    <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-500">
                      {line.type === 'input' && (
                        <span className="text-blue-400">
                          <span className="text-green-400 mr-2">$</span>
                          {line.text}
                        </span>
                      )}
                      {line.type === 'system' && <span className="text-white/60">{line.text}</span>}
                      {line.type === 'success' && <span className="text-green-400 font-bold">{line.text}</span>}
                      {line.type === 'report' && (
                        <div className="mt-2 p-4 bg-orange-500/5 rounded border border-orange-500/20 text-orange-200 italic">
                          {line.text}
                        </div>
                      )}
                    </div>
                  ))}
                  {visibleLines < mockLines.length && (
                    <div className="w-2 h-5 bg-orange-500/60 cursor-blink inline-block ml-1"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VALUE PROPOSITION GRID */}
        <div id="why" className="container mx-auto px-4 max-w-6xl mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-header uppercase tracking-tight mb-4">Beyond the <span className="text-orange-500">Sandbox</span></h2>
            <p className="font-body text-slate-400 max-w-2xl mx-auto">Web AI is for chatting. Terminal AI is for performing. Stop wasting hours on manual data entry and repetitive research.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl hover:border-orange-500/30 transition-all group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="text-orange-500 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-header uppercase mb-3 tracking-wide">Infinite Memory</h3>
              <p className="text-slate-400 leading-relaxed text-sm">Point Gemini at 1,000 PDFs or your entire 2025 email history. It "sees" everything at once to find patterns a human (or a chatbot) would miss.</p>
            </div>
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MousePointer2 className="text-purple-500 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-header uppercase mb-3 tracking-wide">OS Autonomy</h3>
              <p className="text-slate-400 leading-relaxed text-sm">Give your AI hands. Agents can create folders, move files, and launch websites directly on your desktop. You define the result; they build the path.</p>
            </div>
            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="text-emerald-500 w-6 h-6" />
              </div>
              <h3 className="text-header text-2xl uppercase mb-3 tracking-wide font-header">Hardened Privacy</h3>
              <p className="text-slate-400 leading-relaxed text-sm">Your data stays in your terminal. There is no middleman startup reading your files. Your computer talks directly to the AI model provider.</p>
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        <div className="bg-slate-900/30 border-y border-white/5 py-24 mb-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-header uppercase tracking-tight text-center mb-16">What Founders are <span className="text-orange-500">Building</span></h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-orange-500 border border-white/10 font-bold italic">"</div>
                <div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-4 font-body">"I was spending 4 hours a week summarizing sales calls. After the session, Akhil helped me build a script that does it in 30 seconds for my entire team. Life changing."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                    <span className="font-bold text-sm uppercase tracking-widest font-header">Founder @ Fintech SaaS</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-orange-500 border border-white/10 font-bold italic">"</div>
                <div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-4 font-body">"I didn't even know my computer could do this. We built an autonomous lead researcher that finds contacts on LinkedIn and checks their site for tech changes while I'm at lunch."</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                    <span className="font-bold text-sm uppercase tracking-widest font-header">CMO @ B2B Agency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MEET YOUR GUIDE */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl border-4 border-orange-500 overflow-hidden shadow-2xl relative transform rotate-3">
                  <Image 
                    src="/images/akhil.jpg" 
                    alt="Akhil MK" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-left">
                <h2 className="font-header text-4xl md:text-5xl mb-4 uppercase tracking-tight">Meet your guide: <span className="text-orange-500">Akhil MK</span></h2>
                <p className="font-body text-lg mb-6 text-slate-400 leading-relaxed">
                  I spent the last 5 years building automated systems for DTC brands and running a performance agency. I'm not a "clean code" engineer—I'm a <strong>tinkerer</strong> who believes terminal agents are the ultimate leverage for non-technical founders.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-orange-400/80">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Founder @ adlibrary.store</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> AI Sniper Architect</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> 700+ Blueprints Shipped</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Ex-Agency Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING / RECEIPT SECTION */}
        <div id="pricing" className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-16 items-start mb-32 pt-12">
          <div className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-3xl font-body">
            <h2 className="font-header text-4xl mb-8 uppercase tracking-tight">The 60-Minute Session</h2>
            
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center font-bold font-mono">01</div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-white">Full Installation</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">We remotely install Node.js, Gemini CLI, Claude Code, and Qwen on your machine while you watch.</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center font-bold font-mono">02</div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-white">Environment Tuning</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">We fix your System PATH and lock down your API Keys so you can run tools from any folder securely.</p>
                </div>
              </div>

              <div className="flex gap-5 p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl -mx-2">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold font-mono text-sm">03</div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-orange-500">The Strategy Jam</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-bold">We brainstorm 3 specific workflows for your role and run the first one live together.</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center font-bold font-mono">04</div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-white">The Handover</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">You get your Agent Manifest—a file on your desktop with custom commands and a First Week guide.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-6 h-6 border-2 border-white/20 flex items-center justify-center transition-all ${accepted ? 'bg-orange-500 border-orange-500' : 'group-hover:border-orange-500'}`} onClick={() => setAccepted(!accepted)}>
                  {accepted && <CheckCircle2 className="text-white w-4 h-4" />}
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">I accept the remote session terms</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-8 w-full max-w-md mx-auto shadow-2xl transform rotate-1 font-mono text-sm relative text-black">
              {/* Receipt Jagged Edge Top */}
              <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)', marginTop: '-10px' }}></div>

              <div className="text-center mb-8">
                <div className="font-header text-4xl mb-1 italic tracking-tighter">REAL AI EXAMPLES</div>
                <div className="text-[10px] text-gray-400 tracking-widest uppercase">Invoice #BETA-001</div>
                <div className="text-[10px] text-gray-400 uppercase">{new Date().toLocaleDateString()}</div>
              </div>

              <div className="border-b-2 border-dashed border-gray-200 mb-6"></div>

              <div className="flex justify-between mb-4 font-bold uppercase text-[10px] text-gray-400">
                <span>Description</span>
                <span>Subtotal</span>
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex justify-between font-bold">
                  <span>ENVIRONMENT SETUP</span>
                  <span>$99.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>60-MIN STRATEGY JAM</span>
                  <span>$99.00</span>
                </div>
                <div className="flex justify-between text-orange-600 font-bold text-xs italic">
                  <span>- BETA TINKERER DISCOUNT</span>
                  <span>-$99.00</span>
                </div>
              </div>

              <div className="border-b-2 border-dashed border-gray-200 mb-6"></div>

              <div className="flex justify-between text-3xl font-header mb-10 tracking-tight">
                <span>TOTAL DUE</span>
                <span>$99.00</span>
              </div>

              <div className="text-center">
                <a 
                  href={accepted ? "https://checkout.dodopayments.com/buy/pdt_0NWW6..." : "#"}
                  className={`block w-full py-5 font-header text-3xl tracking-widest transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] border-2 border-black ${accepted ? 'bg-orange-500 text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  onClick={(e) => !accepted && e.preventDefault()}
                >
                  UPGRADE NOW
                </a>
                <div className="mt-6 flex flex-col gap-2 items-center text-[10px] uppercase text-gray-400">
                  <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secure Stripe Checkout</div>
                  <div className="flex items-center gap-1 font-bold text-black"><TrendingUp className="w-3 h-3" /> Limited to first 10 tinkerers</div>
                </div>
              </div>

              {/* Receipt Jagged Edge Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)', marginBottom: '-10px' }}></div>
          </div>
        </div>

        {/* THE ENGINE ROOM (TECHNICAL 101) */}
        <div className="container mx-auto px-4 max-w-6xl mb-24">
          <div className="bg-slate-900 border-2 border-white/5 p-8 md:p-16 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-header text-5xl mb-6 uppercase tracking-tight text-white">The Engine Room</h2>
                <p className="font-body text-slate-400 mb-12 leading-relaxed">
                  Terminal errors can be frustrating. If you're comfortable with technical friction, you can use our guides to build your workstation yourself. But if you want to skip the IT work and go straight to shipping, we recommend the <strong>Jam Session</strong>.
                </p>
                
                <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-white/5 text-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm text-white">The Engine</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">We install Node.js—the environment that lets modern AI agents run on your computer.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-white/5 text-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-purple-500 group-hover:text-white transition-all">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm text-white">The Tools</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">We configure Gemini CLI (for massive memory) and Claude Code (for autonomous work).</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-white/5 text-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm text-white">The Brain</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">We secure your API Keys so you only pay for what you use, directly to the providers.</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-orange-600 p-8 md:p-12 border-4 border-black text-white transform md:rotate-2 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative">
                  <div className="absolute -top-6 -left-6 bg-black text-white px-4 py-1 font-header text-xl tracking-widest transform -rotate-3 border-2 border-white">
                    DIY GUIDES
                  </div>
                  <h4 className="font-header text-4xl uppercase mb-6 tracking-tight">Build it Yourself</h4>
                  <p className="font-body text-sm mb-10 opacity-90 leading-relaxed">
                      Follow our 101 guides to install the tools manually. Best for those who know their way around PowerShell.
                  </p>
                  <ul className="space-y-6 font-bold uppercase tracking-widest text-base">
                      <li>
                          <Link href="/setup/gemini-cli" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                              <div className="w-8 h-8 bg-black/20 rounded flex items-center justify-center font-mono">01</div> Gemini CLI Guide <ArrowRight className="w-5 h-5 ml-auto" />
                          </Link>
                      </li>
                      <li>
                          <Link href="/setup/claude-code" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                              <div className="w-8 h-8 bg-black/20 rounded flex items-center justify-center font-mono">02</div> Claude Code Guide <ArrowRight className="w-5 h-5 ml-auto" />
                          </Link>
                      </li>
                  </ul>
                  <div className="mt-12 pt-8 border-t border-white/20 text-[10px] italic opacity-60 font-mono">
                      * WARNING: Terminal errors can be frustrating. Jam Session recommended.
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* USE CASES / JAM IDEAS */}
        <div className="container mx-auto px-4 max-w-6xl mb-32">
          <h2 className="font-header text-5xl mb-12 uppercase text-center tracking-tighter text-slate-700">Jam Ideas for Your Role</h2>
          <div className="grid md:grid-cols-3 gap-8 font-body">
            <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:bg-orange-500/5 hover:border-orange-500/20 transition-all group">
              <h3 className="font-header text-2xl mb-4 uppercase text-orange-500">Sales & Lead Gen</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Point the AI at 50 LinkedIn profiles. Have it research their websites and draft unique icebreakers while you drink coffee.</p>
            </div>
            <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:bg-purple-500/5 hover:border-purple-500/20 transition-all group">
              <h3 className="font-header text-2xl mb-4 uppercase text-purple-500">Marketing Ops</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Turn 20 long blog posts into an entire month of social media content (LinkedIn, X, Newsletters) in one single click.</p>
            </div>
            <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:bg-blue-500/5 hover:border-blue-500/20 transition-all group">
              <h3 className="font-header text-2xl mb-4 uppercase text-blue-500">Research & HR</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Analyze 1,000 pages of legal docs or resumes. Find the needle in the haystack without ever hitting "Cmd+F" again.</p>
            </div>
          </div>
        </div>

        {/* GLOBAL AVAILABILITY */}
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-white/5 border border-white/10 p-12 rounded-3xl font-body relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
            <Globe className="w-16 h-16 mx-auto mb-6 text-orange-500 group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="font-header text-4xl mb-4 uppercase tracking-tight">Remote Available Globally</h3>
            <p className="max-w-xl mx-auto text-slate-400 leading-relaxed">
              We operate across all timezones. Once you book, you'll receive a link to pick a slot that works for your local time. Typical turnaround: <span className="text-white font-bold tracking-widest uppercase ml-1">Under 48 hours.</span>
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}