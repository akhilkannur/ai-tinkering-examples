import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Monitor, Terminal, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function AgentSetupService() {
  const title = "Agent Setup Service | Gemini CLI & Claude Code Configuration";
  const description = "Professional remote installation and configuration of AI agents. Get Gemini CLI and Claude Code running on your machine without the terminal headache.";

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
          
          <h1 className="text-6xl md:text-8xl font-header mb-6 leading-none text-black">
            AGENT SETUP <span className="text-orange-600">AS A SERVICE</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop fighting with PowerShell and Terminal. We'll remotely install, configure, and secure your AI agents so you can start building.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <Terminal className="w-5 h-5" />
              <span className="font-bold">Gemini CLI</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <Terminal className="w-5 h-5 text-purple-600" />
              <span className="font-bold">Claude Code</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="font-bold">Security Hardened</span>
            </div>
          </div>
        </div>

        {/* PRICING & TERMS SECTION */}
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12 items-start mb-24">
          
          {/* THE PROCESS */}
          <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] font-body">
            <h2 className="font-header text-4xl mb-6 border-b-4 border-black pb-2">HOW IT WORKS</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Schedule & Pay</h3>
                  <p className="text-sm text-gray-600">Book your 30-minute slot. Payment is upfront to secure the "First 10" discount.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Remote Handshake</h3>
                  <p className="text-sm text-gray-600">We connect via Google Remote Desktop. You watch as we handle the installation and PATH configuration.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Security Hardening</h3>
                  <p className="text-sm text-gray-600">We set up your .gitignore and system variables to ensure your API keys never leak.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Handover</h3>
                  <p className="text-sm text-gray-600">We run a test query to confirm everything is live. You get a custom cheat sheet for your specific setup.</p>
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
                <span className="text-sm font-bold uppercase tracking-tight">I understand this is a remote setup service.</span>
              </label>
            </div>
          </div>

          {/* THE RECEIPT */}
          <div className="bg-white p-6 w-full max-w-sm mx-auto border border-gray-200 shadow-2xl transform rotate-1 font-mono text-sm relative text-black">
              {/* Receipt Jagged Edge Top */}
              <div className="absolute top-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)', marginTop: '-10px' }}></div>

              <div className="text-center mb-6">
                <div className="font-header text-3xl mb-1">AGENT SETUP</div>
                <div className="text-xs text-gray-500 tracking-widest">ORDER TYPE: REMOTE</div>
                <div className="text-xs text-gray-500">{new Date().toLocaleDateString()}</div>
              </div>

              <div className="border-b-2 border-dashed border-gray-300 mb-4"></div>

              <div className="flex justify-between mb-2 font-bold uppercase">
                <span>Description</span>
                <span>Amount</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Gemini CLI Install</span>
                <span>$49.50</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Claude Code Install</span>
                <span>$49.50</span>
              </div>
              <div className="flex justify-between mb-4 italic text-gray-500">
                <span>- First 10 Beta Discount</span>
                <span>(-$100.00)</span>
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
                  {accepted ? "BOOK SETUP NOW" : "CHECK BOX TO BOOK"}
                </button>
                <p className="mt-4 text-[10px] uppercase text-gray-400">Secure checkout via Stripe</p>
              </div>

              {/* Receipt Jagged Edge Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-white" style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)', marginBottom: '-10px' }}></div>
          </div>
        </div>

        {/* COMPARISON / 101 PREVIEW */}
        <div className="container mx-auto px-4 max-w-4xl text-center mb-24">
          <h2 className="font-header text-5xl mb-12 uppercase">Prefer to DIY?</h2>
          <div className="grid md:grid-cols-2 gap-8 font-body">
            <Link href="/setup/gemini-cli" className="bg-white border-2 border-black p-8 hover:bg-orange-50 transition-colors group">
              <Terminal className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">Gemini CLI 101</h3>
              <p className="text-sm">Learn how to install the 2M context window beast on your machine.</p>
              <div className="mt-4 flex items-center justify-center text-orange-600 font-bold">
                READ GUIDE <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link href="/setup/claude-code" className="bg-white border-2 border-black p-8 hover:bg-purple-50 transition-colors group">
              <Terminal className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-xl mb-2">Claude Code 101</h3>
              <p className="text-sm">Set up Anthropic's agentic coding powerhouse correctly.</p>
              <div className="mt-4 flex items-center justify-center text-purple-600 font-bold">
                READ GUIDE <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
