import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Zap, ArrowRight, Cpu, Globe, Layers, Repeat, Command, Lock, FileText, Globe2, Sparkles, MousePointer2, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function AgentSetupService() {
  const title = "Autonomous AI Setup & Strategy Jam | Gemini & Claude for Non-Techies";
  const description = "Stop chatting with AI and start assigning it work. We remotely configure your computer into an autonomous workstation plus a 1-hour brainstorming session.";

  const [accepted, setAccepted] = useState(false);

  // Design Palette
  const colors = {
    bg: '#F4F1EA', // Creamy Paper
    header: '#2C3E50', // Deep Navy
    accent: '#E67E22', // Burnt Orange
    card: '#FFFFFF',
    text: '#333333'
  }

  return (
    <div className="min-h-screen font-mono selection:bg-orange-200" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        <style>{`
          .font-header { font-family: 'Bebas Neue', sans-serif; }
          .font-body { font-family: 'Courier Prime', monospace; }
          .texture-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.05;
            pointer-events: none;
          }
        `}</style>
      </Head>

      <div className="fixed inset-0 texture-overlay z-50"></div>

      <Navbar />

      <main className="pt-24 pb-20 relative z-10">
        
        {/* HERO */}
        <div className="container mx-auto px-4 max-w-5xl text-center mb-16">
          <div className="inline-block border-2 border-black bg-orange-500 text-white px-4 py-1 mb-6 transform -rotate-1 font-header tracking-widest text-sm">
            EARLY ADOPTER OFFER: 8/10 REMAINING
          </div>
          
          <h1 className="text-6xl md:text-8xl font-header mb-6 leading-none text-black uppercase">
            THE AUTONOMOUS <br />
            <span className="text-orange-600">WORKSTATION</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop chatting with AI. Start assigning it work. We'll remotely upgrade your machine and spend an hour building your first "AI Employee" together.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 hover:bg-blue-50 transition-colors">
              <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="font-bold">Infinite Memory</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 hover:bg-purple-50 transition-colors">
              <Command className="w-5 h-5 text-purple-600" />
              <span className="font-bold">AI with Hands</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 hover:bg-green-50 transition-colors">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="font-bold">Privacy Guaranteed</span>
            </div>
          </div>
        </div>

        {/* THE "WHY" SECTION */}
        <div className="container mx-auto px-4 max-w-5xl mb-24">
          <div className="bg-black text-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_rgba(230,126,34,1)]">
            <h2 className="font-header text-4xl md:text-5xl mb-8 text-center uppercase tracking-tight text-white">
              Move Beyond <span className="text-orange-500">The Sandbox</span>
            </h2>
            <p className="font-body text-lg mb-12 opacity-80 text-center max-w-2xl mx-auto italic">
              "ChatGPT is a website you talk to. These tools are workers that live on your computer. They don't just answer questions—they perform tasks."
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="border border-white/20 p-6 hover:bg-orange-500/10 transition-colors group">
                <Cpu className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-header text-2xl mb-2 uppercase">Infinite Memory</h3>
                <p className="font-body text-sm opacity-70">Point your AI at 500 resumes or a year's worth of emails. It "sees" everything at once to find patterns a human (or a chatbot) would miss.</p>
              </div>
              <div className="border border-white/20 p-6 hover:bg-purple-500/10 transition-colors group">
                <Terminal className="w-10 h-10 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-header text-2xl mb-2 uppercase">AI with Hands</h3>
                <p className="font-body text-sm opacity-70">Unlike web AI, these tools can create folders, move files, and build websites directly on your desktop. You describe the result; they build the infrastructure.</p>
              </div>
              <div className="border border-white/20 p-6 hover:bg-blue-500/10 transition-colors group">
                <Repeat className="w-10 h-10 text-blue-500 mb-4 group-hover:rotate-180 transition-transform duration-700" />
                <h3 className="font-header text-2xl mb-2 uppercase">Set & Forget</h3>
                <p className="font-body text-sm opacity-70">Close your laptop and go to lunch. Run a "Loop" that processes 1,000 leads or researches 50 competitors in the background while you do real work.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRIVACY PROMISE */}
        <div className="container mx-auto px-4 max-w-5xl mb-24">
          <div className="bg-white border-4 border-black p-8 md:p-12 relative">
            <h2 className="font-header text-4xl mb-6 uppercase tracking-tight">Your Data. Your Machine. <span className="text-orange-600">Period.</span></h2>
            <div className="grid md:grid-cols-2 gap-12 font-body">
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  When you use terminal agents, your data stays in your terminal. There is no "Middleman" startup reading your files.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Direct Connection:</strong> Your computer talks directly to the AI model.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Zero Leaks:</strong> We configure your setup so your secret keys stay locked in your system, not on the web.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#Fdfaf6] p-6 border-2 border-dashed border-black">
                <h4 className="font-bold uppercase mb-2">The Founder's Rule:</h4>
                <p className="text-sm opacity-80">
                  "Never upload your entire business strategy folder to a random AI website. With an autonomous workstation, you own the walls."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* THE SESSION SECTION */}
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12 items-start mb-24">
          
          {/* THE PROCESS */}
          <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] font-body">
            <h2 className="font-header text-4xl mb-6 border-b-4 border-black pb-2">THE SETUP + JAM SESSION</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Boring Tech Stuff (We do it)</h3>
                  <p className="text-sm text-gray-600">We connect remotely and handle the installation of the "Engine" and the AI tools. You just watch and ask questions.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">The Tuning</h3>
                  <p className="text-sm text-gray-600">We make sure your computer knows where the tools are hidden so they never "break" or disappear. We lock down your security keys.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-orange-50 border-2 border-orange-200 -mx-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">The Strategy Jam</h3>
                  <p className="text-sm text-gray-900 font-bold">The best part. We spend the rest of the hour brainstorming exactly how to use this for your job. We build your first custom workflow live.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">The Handover</h3>
                  <p className="text-sm text-gray-600">You receive your <strong>Agent Manifest</strong>—a simple file on your desktop with your custom commands and a "First Week" guide.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t-2 border-dashed border-black">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={accepted} 
                  onChange={() => setAccepted(!accepted)}
                  className="w-6 h-6 border-2 border-black rounded-none appearance-none checked:bg-black transition-all cursor-pointer"
                />
                <span className="text-sm font-bold uppercase tracking-tight">I want to stop chatting and start building.</span>
              </label>
            </div>
          </div>

          {/* THE RECEIPT */}
          <div className="bg-white p-6 w-full max-w-sm mx-auto border border-gray-200 shadow-2xl transform rotate-1 font-mono text-sm relative text-black">
              {/* Receipt Jagged Edge Top */}
              <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)', marginTop: '-10px' }}></div>

              <div className="text-center mb-6">
                <div className="font-header text-3xl mb-1 italic">REAL AI EXAMPLES</div>
                <div className="text-xs text-gray-500 tracking-widest uppercase">Order: AI Upgrade Session</div>
                <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>

              <div className="flex justify-between mb-2 font-bold uppercase text-[10px] text-gray-400">
                <span>Description</span>
                <span>Amount</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Workstation Setup</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>60-Min Strategy Jam</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between mb-4 italic text-gray-500">
                <span>- Beta Tinkerer Discount</span>
                <span>(-$99.00)</span>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>TOTAL DUE</span>
                <span>$99.00</span>
              </div>

              <div className="text-center">
                <button 
                  disabled={!accepted}
                  className={`w-full py-4 font-header text-2xl tracking-widest transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black ${accepted ? 'bg-orange-500 text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  {accepted ? "BOOK YOUR SESSION" : "CHECK BOX TO BOOK"}
                </button>
                <p className="mt-4 text-[10px] uppercase text-gray-400">Limited to first 10 spots</p>
              </div>

              {/* Receipt Jagged Edge Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)', marginBottom: '-10px' }}></div>
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="container mx-auto px-4 max-w-4xl mb-24 text-center">
          <div className="bg-black/5 border-2 border-black p-8 font-body">
            <Globe2 className="w-12 h-12 mx-auto mb-4 text-orange-600" />
            <h3 className="font-header text-3xl mb-2 uppercase">Remote Available Globally</h3>
            <p className="max-w-xl mx-auto opacity-70">
              We operate across all timezones. Typical turnaround: <strong>Under 48 hours.</strong>
            </p>
          </div>
        </div>

        {/* USE CASES - THE JAM IDEAS */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <h2 className="font-header text-5xl mb-12 uppercase text-center tracking-tighter italic text-gray-400">Jam Ideas for Your Role</h2>
          <div className="grid md:grid-cols-3 gap-6 font-body">
            <div className="bg-white border-2 border-black p-6 hover:translate-y-[-4px] transition-transform">
              <h3 className="font-bold mb-2 uppercase border-b border-black">Sales & Lead Gen</h3>
              <p className="text-sm">Point the AI at 50 LinkedIn profiles. Have it research their websites and draft 50 unique icebreakers while you drink coffee.</p>
            </div>
            <div className="bg-white border-2 border-black p-6 hover:translate-y-[-4px] transition-transform">
              <h3 className="font-bold mb-2 uppercase border-b border-black">Marketing Ops</h3>
              <p className="text-sm">Turn 20 long blog posts into an entire month of social media content (LinkedIn, X, Newsletters) in one click.</p>
            </div>
            <div className="bg-white border-2 border-black p-6 hover:translate-y-[-4px] transition-transform">
              <h3 className="font-bold mb-2 uppercase border-b border-black">Research & HR</h3>
              <p className="text-sm">Analyze 1,000 pages of legal docs or resumes. Find the needle in the haystack without ever hitting "Cmd+F".</p>
            </div>
          </div>
        </div>

        {/* MEET YOUR GUIDE */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="bg-[#2C3E50] text-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full border-4 border-orange-500 overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 relative">
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
                <p className="font-body text-lg mb-6 opacity-90 leading-relaxed">
                  I spent the last 5 years building automated systems for DTC brands and running a performance agency. I'm not a "clean code" engineer—I'm a <strong>tinkerer</strong> who believes terminal agents are the ultimate leverage for non-technical founders.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 font-mono text-[10px] uppercase tracking-widest text-orange-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div> Founder @ adlibrary.store
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div> AI Sniper Architect
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div> 700+ Blueprints Shipped
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div> Ex-Agency Founder
                  </div>
                </div>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* THE ENGINE ROOM (TECHNICAL 101) */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <h2 className="font-header text-4xl mb-6 uppercase border-b-2 border-black pb-2 text-black">The Engine Room</h2>
            <div className="font-body text-lg">
              <p className="mb-10 opacity-70 text-sm italic">
                (This is the technical stuff we handle during your session so you don't have to.)
              </p>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-black text-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black group-hover:bg-orange-500 group-hover:text-black transition-colors">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm">The Engine</h4>
                            <p className="text-[11px] opacity-70 leading-relaxed">We install <strong>Node.js</strong>—the environment that lets modern AI agents run on your computer.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-black text-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black group-hover:bg-purple-500 group-hover:text-black transition-colors">
                            <Terminal className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm">The Tools</h4>
                            <p className="text-[11px] opacity-70 leading-relaxed">We configure <strong>Gemini CLI</strong> (for massive memory) and <strong>Claude Code</strong> (for autonomous work).</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-black text-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-black group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase text-sm">The Brain</h4>
                            <p className="text-[11px] opacity-70 leading-relaxed">We secure your <strong>API Keys</strong> so you only pay for what you use, directly to the providers.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-orange-600 p-8 border-4 border-black text-white transform rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                    <h4 className="font-header text-3xl uppercase mb-4 tracking-tight">Prefer the Hard Way?</h4>
                    <p className="font-body text-sm mb-8 opacity-90 leading-relaxed">
                        If you're comfortable with error messages and technical friction, you can use our 101 guides to build your workstation yourself.
                    </p>
                    <ul className="space-y-4 font-bold uppercase tracking-widest text-sm">
                        <li>
                            <Link href="/setup/gemini-cli" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                                <ArrowRight className="w-4 h-4" /> Gemini CLI Guide
                            </Link>
                        </li>
                        <li>
                            <Link href="/setup/claude-code" className="flex items-center gap-2 hover:translate-x-2 transition-transform">
                                <ArrowRight className="w-4 h-4" /> Claude Code Guide
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-10 pt-6 border-t border-white/20 text-[10px] italic opacity-60">
                        Warning: Terminal errors can be frustrating. We recommend the Jam Session for a smooth start.
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
