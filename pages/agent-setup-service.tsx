import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Monitor, Terminal, ShieldCheck, Zap, ArrowRight, CheckCircle2, Cpu, Globe, Layers, Repeat } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function AgentSetupService() {
  const title = "Agent Setup & Strategy Jam | Gemini, Claude & Qwen Configuration";
  const description = "Professional remote installation plus a 1-hour brainstorming session. Get over the terminal friction and start building real AI workflows.";

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
          <div className="inline-block border-2 border-black bg-orange-500 text-white px-4 py-1 mb-6 transform -rotate-1 font-header tracking-widest">
            EARLY ADOPTER OFFER: 4/10 REMAINING
          </div>
          
          <h1 className="text-6xl md:text-8xl font-header mb-6 leading-none text-black uppercase">
            Setup & <span className="text-orange-600">Strategy Jam</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop fighting with PowerShell. We'll remotely install your agents and spend an hour jamming on how to use them for your specific business. 
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <span className="font-bold">Gemini (2M Context)</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="font-bold">Claude Code (Agentic)</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">Qwen & Open Source</span>
            </div>
          </div>
        </div>

        {/* BEYOND THE SANDBOX */}
        <div className="container mx-auto px-4 max-w-5xl mb-24">
          <div className="bg-black text-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_rgba(230,126,34,1)]">
            <h2 className="font-header text-4xl md:text-5xl mb-8 text-center uppercase tracking-tight">
              Why you need <span className="text-orange-500">Terminal Agents</span>
            </h2>
            <p className="font-body text-lg mb-12 opacity-80 text-center max-w-2xl mx-auto">
              ChatGPT is a website. Terminal agents are employees with hands on your keyboard. 
              Here is the difference between "Chatting" and "Performing."
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-white/20 p-6 hover:bg-white/5 transition-colors">
                <Layers className="w-10 h-10 text-orange-500 mb-4" />
                <h3 className="font-header text-2xl mb-2 uppercase">Massive Context</h3>
                <p className="font-body text-sm opacity-70">Point Gemini at 1,000 PDFs or your entire 2025 email history. It doesn't forget. It doesn't hallucinate. It analyzes the "Big Picture" in seconds.</p>
              </div>
              <div className="border border-white/20 p-6 hover:bg-white/5 transition-colors">
                <Terminal className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="font-header text-2xl mb-2 uppercase">System Access</h3>
                <p className="font-body text-sm opacity-70">Agents can create folders, move files, and launch websites on your machine. You describe the outcome; they build the infrastructure.</p>
              </div>
              <div className="border border-white/20 p-6 hover:bg-white/5 transition-colors">
                <Repeat className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="font-header text-2xl mb-2 uppercase">Background Loops</h3>
                <p className="font-body text-sm opacity-70">Close your laptop and go to lunch. Run a background command to process 5,000 rows of lead data while you do literally anything else.</p>
              </div>
            </div>
          </div>
        </div>

        {/* THE OFFER SECTION */}
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12 items-start mb-24">
          
          {/* THE PROCESS */}
          <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] font-body">
            <h2 className="font-header text-4xl mb-6 border-b-4 border-black pb-2">THE 60-MINUTE SESSION</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">The Technical Handshake</h3>
                  <p className="text-sm text-gray-600">We connect via Google Remote Desktop. We install Node.js, Git, and your chosen CLI engines (Gemini, Claude, or Qwen) while you watch.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Security Hardening</h3>
                  <p className="text-sm text-gray-600">We configure your environment variables so your API keys stay hidden. We set up your first "Work-Ready" folder with proper guardrails.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-orange-50 border-2 border-orange-200 -mx-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">The Idea Jam</h3>
                  <p className="text-sm text-gray-900"><strong>This is where the magic happens.</strong> We brainstorm 3 specific workflows for your role. We run the first one live together to reduce the friction of "doing it alone."</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">The Cheat Sheet</h3>
                  <p className="text-sm text-gray-600">You get a personalized "First Week" guide with the exact commands we built during the jam session.</p>
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
                <span className="text-sm font-bold uppercase tracking-tight">I'm ready to push past the terminal friction.</span>
              </label>
            </div>
          </div>

          {/* THE RECEIPT */}
          <div className="bg-white p-6 w-full max-w-sm mx-auto border border-gray-200 shadow-2xl transform rotate-1 font-mono text-sm relative text-black">
              {/* Receipt Jagged Edge Top */}
              <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)', marginTop: '-10px' }}></div>

              <div className="text-center mb-6">
                <div className="font-header text-3xl mb-1 italic">REAL AI EXAMPLES</div>
                <div className="text-xs text-gray-500 tracking-widest uppercase">Item: Setup + Jam Session</div>
                <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>

              <div className="flex justify-between mb-2 font-bold uppercase">
                <span>Description</span>
                <span>Amount</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Remote Environment Setup</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>60-Min Strategy Jam</span>
                <span>$99.00</span>
              </div>
              <div className="flex justify-between mb-4 italic text-gray-500">
                <span>- Early Adopter Bundle</span>
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
                <p className="mt-4 text-[10px] uppercase text-gray-400">Limited to first 10 tinkerers</p>
              </div>

              {/* Receipt Jagged Edge Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)', marginBottom: '-10px' }}></div>
          </div>
        </div>

        {/* USE CASES */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <h2 className="font-header text-5xl mb-12 uppercase text-center tracking-tighter italic text-gray-400">Ideas we can jam on</h2>
          <div className="grid md:grid-cols-3 gap-6 font-body">
            <div className="bg-white border-2 border-black p-6">
              <h3 className="font-bold mb-2 uppercase border-b border-black">For Sales</h3>
              <p className="text-sm">Web scraping competitor pricing pages or enriching 100 LinkedIn profiles with recent "trigger events" autonomously.</p>
            </div>
            <div className="bg-white border-2 border-black p-6">
              <h3 className="font-bold mb-2 uppercase border-b border-black">For Marketing</h3>
              <p className="text-sm">Turning 50 blog posts into LinkedIn threads and newsletters in one background loop while you have lunch.</p>
            </div>
            <div className="bg-white border-2 border-black p-6">
              <h3 className="font-bold mb-2 uppercase border-b border-black">For HR/Ops</h3>
              <p className="text-sm">Point the agent at a folder of 500 resumes. Ask it to find the top 5 matches for a specific JD and save a CSV report.</p>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}