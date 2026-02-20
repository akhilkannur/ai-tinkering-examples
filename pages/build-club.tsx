import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Sparkles, ArrowRight, Zap, Target, Search, Heart, CheckCircle2, ShieldCheck, Cpu, Terminal } from 'lucide-react';

export default function BuildClubPage() {
  const [signed, setSigned] = useState(false);

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>The 100M Build Club | Real AI Examples</title>
        <meta name="description" content="A private syndicate for founders building AI-native companies. Zero fluff, high-velocity building." />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* HERO SECTION */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#ccff00] border-2 border-black font-black text-[10px] uppercase tracking-[0.3em] mb-8 transform -rotate-1 brutalist-shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> PRIVATE SYNDICATE
            </div>
            <h1 className="text-5xl md:text-9xl font-display tracking-tight mb-8 uppercase leading-[0.8] text-black glitch-text" data-text="THE 100M BUILD CLUB">
              The 100M <br />
              <span className="text-[#ff00ff]">Build Club</span>
            </h1>
            <p className="text-xl md:text-3xl text-black max-w-2xl mx-auto font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-4 bg-white border-2 border-black brutalist-shadow-sm mb-12 uppercase tracking-tighter">
              Stop debating "AGI." <br />
              Start shipping profitable <br />
              <span className="bg-black text-[#ccff00] px-2">Agentic software.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <div className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow rotate-1">
                <h2 className="text-3xl md:text-5xl font-display text-black mb-8 uppercase leading-none">The Manifesto</h2>
                <div className="space-y-6 text-xl text-black font-bold uppercase tracking-tighter leading-tight font-mono">
                    <p>// We do not build "GPT Wrappers."</p>
                    <p>// We build autonomous agents with specific business goals.</p>
                    <p>// We prioritize speed-to-market over perfect architecture.</p>
                    <p>// We use AI to automate our own building process.</p>
                </div>
            </div>

            <div className="bg-[#ccff00] border-4 border-black p-8 md:p-12 brutalist-shadow -rotate-1">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-black flex items-center justify-center text-[#ff00ff] border-2 border-black shadow-[4px_4px_0px_0px_#00ffff]">
                        <Zap className="w-10 h-10 fill-current" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display text-black uppercase">Join the Squad</h2>
                </div>
                
                <div className="bg-white border-4 border-black p-6 mb-8 relative">
                  <div className="absolute top-2 right-4 flex gap-4 text-[10px] font-black font-mono text-gray-400 uppercase">
                    <span>Store #001</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-display text-xl mb-6 uppercase border-b-2 border-black pb-2">Entrance Receipt</h3>
                  <div className="space-y-4 font-mono text-xs font-black uppercase">
                    <div className="flex justify-between">
                        <span>Initiation Fee</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Status</span>
                        <span className="text-emerald-600">Open_Beta</span>
                    </div>
                    <div className="border-t-2 border-black pt-4 flex justify-between text-lg font-display">
                        <span>Total</span>
                        <span>$0.00</span>
                    </div>
                  </div>
                </div>

                <button 
                    onClick={() => setSigned(!signed)}
                    className={`w-full py-6 border-4 border-black font-display text-2xl uppercase transition-all brutalist-shadow-sm flex items-center justify-center gap-4 ${signed ? 'bg-black text-[#ccff00]' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                >
                    {signed ? 'SIGNATURE CAPTURED' : 'SIGN MANIFESTO'}
                    {signed && <CheckCircle2 className="w-8 h-8 stroke-[3px]" />}
                </button>
            </div>
          </div>

          {/* VALUES */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
             <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-[#00ffff] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-black mb-4 uppercase">High Alpha</h3>
                <p className="text-sm text-black font-black font-mono leading-relaxed">// We only build workflows that provide massive leverage. No toys.</p>
             </div>
             <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-[#ff00ff] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    <Search className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-black mb-4 uppercase">Anti-Slop</h3>
                <p className="text-sm text-black font-black font-mono leading-relaxed">// We strip away the marketing fluff and focus on rigid logic.</p>
             </div>
             <div className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-[#ccff00] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-black mb-4 uppercase">Agent-First</h3>
                <p className="text-sm text-black font-black font-mono leading-relaxed">// We build for machine readability and autonomous execution.</p>
             </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="bg-black border-4 border-black p-12 md:p-24 text-center brutalist-shadow relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-display text-white mb-12 uppercase leading-tight">READY TO <br/> START BUILDING?</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <a href="mailto:akhil@realaiexamples.com" className="bg-[#ccff00] text-black px-12 py-6 border-4 border-white font-display text-2xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                        GET IN TOUCH
                    </a>
                    <div className="text-[#ff00ff] font-display text-xl uppercase tracking-widest animate-pulse">
                        SQUAD_RECRUITMENT: ACTIVE
                    </div>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
