import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Check, ArrowRight, Clock, Star, XCircle, Terminal, Zap, ShieldCheck, FileText, MousePointer2 } from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const MockTerminal = dynamic(() => import('../components/MockTerminal'), { ssr: false })

export default function AgentSetupService() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>The Agent Kickstart Jam | AI Setup & Strategy</title>
        <meta name="description" content="I help you set up AI tools on your computer and build 3 workflows that actually work for your business in 90 minutes." />
      </Head>

      <Navbar />

      <main className="relative overflow-hidden">
        {/* Background Decorative Grid - Handled by globals.css body bg now, but adding extra flair */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff00ff]/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-6xl pt-40 pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#ccff00] font-bold text-[10px] uppercase tracking-widest mb-8 border-2 border-black transform -rotate-1 brutalist-shadow-sm">
                <Zap className="w-3 h-3 fill-current" /> 90-Minute Setup Sprint
              </div>
              
              <h1 className="text-6xl md:text-8xl font-display mb-8 tracking-tight leading-[0.9] uppercase glitch-text" data-text="3 PLAYS. 90 MINS.">
                3 Plays. <br />
                90 Minutes. <br />
                <span className="text-[#ff00ff]">Zero Slop.</span>
              </h1>

              <div className="bg-white border-2 border-black p-3 mb-8 inline-block brutalist-shadow-sm rotate-1">
                <p className="text-[10px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current text-[#ccff00]" /> A "Play" = one automated workflow that saves you hours every week.
                </p>
              </div>
              
              <p className="text-xl md:text-2xl text-black leading-relaxed font-bold max-w-lg mb-10 border-l-8 border-[#ccff00] pl-6 py-2 bg-gray-50">
                I help you set up AI tools on your computer and build 3 workflows that actually work for your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-10 py-5 bg-[#ff00ff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-white font-display text-xl uppercase tracking-widest transition-all brutalist-shadow border-4 border-black"
                >
                  Book My Sprint
                </button>
                <div className="flex items-center gap-2 text-xs font-black font-mono text-black uppercase tracking-widest">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" /> 48-Hour Money-Back Guarantee
                </div>
              </div>
            </div>

            <div className="relative group hidden lg:block">
              <div className="absolute -inset-4 bg-[#ccff00]/20 opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
              <div className="border-4 border-black brutalist-shadow">
                <MockTerminal />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white border-4 border-black p-4 brutalist-shadow-sm rotate-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black flex items-center justify-center text-[#ccff00] border-2 border-black">
                       <MousePointer2 className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Build Status</div>
                       <div className="text-sm font-display text-black uppercase">Production Ready</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* HOW THIS WORKS */}
          <section className="mb-32 bg-white border-4 border-black p-8 md:p-12 brutalist-shadow">
            <h2 className="text-3xl md:text-5xl font-display mb-12 tracking-normal uppercase text-center decoration-wavy underline decoration-[#ccff00]">Here's the difference</h2>
            <div className="grid md:grid-cols-2 gap-12 text-lg text-black font-bold leading-relaxed">
              <p>
                Most people treat AI like a better Google. Type a question, copy the answer, paste it somewhere else. Fine for one-offs. Painful when you're doing it 10 times a day.
              </p>
              <p>
                In this session, we set up command-line AI tools on your computer (like Claude Code, Gemini CLI, etc). Then we build 3 workflows that handle your repetitive tasks automatically. <span className="bg-black text-white px-1">You type one command. It does the work. That's it.</span>
              </p>
            </div>
          </section>

          {/* WHY NOT JUST DO IT YOURSELF? */}
          <section className="mb-32 text-center">
            <h2 className="text-2xl md:text-4xl font-display mb-12 tracking-normal uppercase">Why not just do it yourself?</h2>
            <div className="max-w-3xl mx-auto text-lg text-black leading-relaxed space-y-6">
              <p className="font-bold">You could figure this out yourself. People do it all the time. But here's what that actually looks like:</p>
              <p className="font-mono text-sm bg-gray-100 p-6 border-2 border-dashed border-black">// You'll spend 2-3 weeks watching tutorials, hitting cryptic errors, and Googling things like "zsh command not found fix." You'll get it working eventually. Maybe.</p>
              <p className="text-black font-display text-2xl uppercase mt-8 italic bg-[#ccff00] inline-block px-4 py-2 border-2 border-black brutalist-shadow-sm">Or we can do it together in 90 minutes. Your call.</p>
            </div>
          </section>

          {/* WHAT HAPPENS IN 90 MINUTES */}
          <section className="mb-32 bg-white p-8 md:p-16 border-4 border-black brutalist-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-10 -translate-y-10">
               <Clock className="w-64 h-64 text-black" />
            </div>
            <h2 className="text-3xl md:text-5xl font-display mb-16 uppercase tracking-normal">
              What happens in 90 minutes
            </h2>
            <div className="space-y-12 relative z-10">
              <div className="flex gap-8 group">
                <div className="font-display text-[#ff00ff] shrink-0 text-3xl group-hover:scale-110 transition-transform">01</div>
                <div>
                  <h3 className="font-display text-xl text-black mb-3 uppercase tracking-tight">Get Everything Installed</h3>
                  <p className="text-black font-bold leading-relaxed">We pick which AI tools make sense for your use case (Claude Code, Gemini CLI, or others) and get them working on your machine. I'll walk you through it.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="font-display text-[#ccff00] shrink-0 text-3xl group-hover:scale-110 transition-transform">02</div>
                <div>
                  <h3 className="font-display text-xl text-black mb-3 uppercase tracking-tight">Pick Your 3 Workflows</h3>
                  <p className="text-black font-bold leading-relaxed">We talk about what's eating up your time. Writing the same emails? Organizing files? Pulling data from websites? We pick 3 things to automate.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="font-display text-[#00ffff] shrink-0 text-3xl group-hover:scale-110 transition-transform">03</div>
                <div>
                  <h3 className="font-display text-xl text-black mb-3 uppercase tracking-tight">Build Them Together</h3>
                  <p className="text-black font-bold leading-relaxed">We build your workflows and test them with your actual work. If something doesn't work right, we fix it before we're done.</p>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT YOU GET */}
          <section className="mb-32 grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border-4 border-black brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <ShieldCheck className="w-10 h-10 text-[#ff00ff] mb-6" />
              <h3 className="font-display text-xl text-black mb-3 uppercase tracking-normal">Tools That Work</h3>
              <p className="text-sm text-black font-black font-mono leading-relaxed">// The right AI tools set up on your computer based on what you need. No more error messages.</p>
            </div>
            <div className="p-8 bg-white border-4 border-black brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <Terminal className="w-10 h-10 text-[#ccff00] mb-6" />
              <h3 className="font-display text-xl text-black mb-3 uppercase tracking-normal">3 Workflows</h3>
              <p className="text-sm text-black font-black font-mono leading-relaxed">// Not generic templates. Actual automation for your specific tasks. Ready to use Monday morning.</p>
            </div>
            <div className="p-8 bg-white border-4 border-black brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              <FileText className="w-10 h-10 text-[#00ffff] mb-6" />
              <h3 className="font-display text-xl text-black mb-3 uppercase tracking-normal">Documented</h3>
              <p className="text-sm text-black font-black font-mono leading-relaxed">// Every step we took and every command we used, so you can tweak things or build more later.</p>
            </div>
          </section>

          {/* PRICING CARD / THE OFFER */}
          <div id="pricing" className="bg-[#ccff00] text-black border-4 border-black p-10 md:p-20 text-center brutalist-shadow mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Terminal className="w-64 h-64" />
            </div>
            
            <div className="inline-block bg-black text-white px-4 py-1 border-2 border-black text-[10px] font-black uppercase tracking-[0.2em] mb-8 transform -rotate-2">
              Limited Spots
            </div>
            
            <h2 className="text-4xl md:text-7xl font-display mb-4 tracking-tight leading-none uppercase">
              The Agent <br/> Kickstart Jam
            </h2>
            
            <div className="text-8xl md:text-9xl font-display mb-2 tracking-tighter">$99</div>
            <p className="text-black font-mono text-sm font-black uppercase tracking-[0.3em] mb-10 bg-white inline-block px-4 py-1 border-2 border-black">One-Time Fee | 90 Minutes</p>
            
            <p className="text-black mb-12 max-w-sm mx-auto font-black leading-relaxed uppercase text-sm">
              Stop watching tutorials and getting stuck. Let me handle the setup and build the first 3 workflows with you.
            </p>

            {/* Urgency Hook */}
            <div className="mb-12">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest bg-black px-4 py-1.5 border-2 border-black font-mono">
                  6 of 10 spots available this week
                </div>
                <div className="w-64 h-4 bg-white border-4 border-black overflow-hidden shadow-sm">
                  <div className="w-[60%] h-full bg-[#ff00ff]"></div>
                </div>
                <span className="text-[10px] text-black font-black font-mono uppercase tracking-widest">First Come, First Served</span>
              </div>
            </div>

            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1"
              className="inline-flex items-center justify-center gap-3 w-full max-w-md px-12 py-6 border-4 border-black font-display text-2xl transition-all uppercase tracking-widest bg-black text-[#ccff00] brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Book My Session <ArrowRight className="w-8 h-8" />
            </a>

            {/* Refund Policy */}
            <div className="mt-12 p-6 bg-white border-2 border-black inline-block text-left max-w-md mx-auto">
               <div className="flex gap-4">
                  <ShieldCheck className="w-10 h-10 text-emerald-600 shrink-0" />
                  <div>
                     <h4 className="font-display text-black text-sm uppercase tracking-tight mb-1">The 48-Hour Guarantee</h4>
                     <p className="text-[11px] text-black font-black font-mono leading-relaxed uppercase">
                        If this doesn't save you 10 hours of headache, I'll refund your $99. <span className="bg-black text-white px-1">No hassle.</span>
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* WHO'S RUNNING THIS? SECTION */}
          <div className="text-center pt-24 border-t-4 border-black mb-24">
            <h2 className="text-3xl md:text-5xl font-display mb-12 uppercase tracking-normal">Who am I?</h2>
            <div className="w-32 h-32 rounded-none border-4 border-black brutalist-shadow-sm overflow-hidden mx-auto mb-8 grayscale rotate-3">
              <Image src="/images/akhil.jpg" alt="Akhil" width={128} height={128} className="object-cover" />
            </div>
            <div className="text-xl md:text-2xl text-black italic mb-10 font-bold leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                "I'm <strong>Akhil MK</strong>. I run a marketing agency. I got tired of copy-pasting between browser tabs, so I started learning command-line AI tools. The setup was a nightmare. Tutorials skip steps. Things break randomly. I spent months figuring it out. Now I help other business owners skip that mess and get straight to working automation."
              </p>
              <p className="text-right not-italic font-display text-[#ff00ff] tracking-widest uppercase text-2xl">
                Akhil, <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="hover:bg-[#ccff00] hover:text-black px-1 transition-colors border-b-2 border-black">akhilhaving.fun</a>
              </p>
            </div>
            <div className="flex justify-center gap-12 text-xs font-black text-black uppercase tracking-[0.3em]">
              <a href="mailto:akhil@realaiexamples.com" className="hover:text-[#ff00ff] transition-colors underline decoration-punk-lime decoration-4 underline-offset-4">Direct Support</a>
              <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff00ff] transition-colors underline decoration-punk-lime decoration-4 underline-offset-4">The Lab</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
