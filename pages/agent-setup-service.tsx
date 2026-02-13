import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Check, ArrowRight, Clock, Star, XCircle, Terminal, Zap, ShieldCheck, FileText, MousePointer2 } from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const MockTerminal = dynamic(() => import('../components/MockTerminal'), { ssr: false })

export default function AgentSetupService() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>The Agent Kickstart Jam | AI Setup & Strategy</title>
        <meta name="description" content="I help you set up AI tools on your computer and build 3 workflows that actually work for your business in 90 minutes." />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <main className="relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-6xl pt-40 pb-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-widest mb-8 border border-accent/20">
                <Zap className="w-3 h-3 fill-current" /> 90-Minute Setup Sprint
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-normal leading-tight uppercase font-header">
                3 Plays. <br />
                90 Minutes. <br />
                <span className="text-accent drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">Zero Slop.</span>
              </h1>

              <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 mb-8 inline-block">
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current" /> A "Play" = one automated workflow that saves you hours every week.
                </p>
              </div>
              
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light max-w-lg mb-10">
                I help you set up AI tools on your computer and build 3 workflows that actually work for your business.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-10 py-5 bg-accent hover:bg-accent-hover text-white font-black rounded-lg transition-all shadow-[0_0_30px_rgba(244,63,94,0.3)] text-lg uppercase tracking-widest transform hover:-translate-y-1"
                >
                  Book My Sprint
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-text-secondary/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> 48-Hour Money-Back Guarantee
                </div>
              </div>
            </div>

            <div className="relative group hidden lg:block">
              <div className="absolute -inset-4 bg-modern-gradient opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
              <MockTerminal />
              <div className="absolute -bottom-6 -right-6 bg-secondary-bg border border-navy-dark p-4 rounded-xl shadow-2xl rotate-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                       <MousePointer2 className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Build Status</div>
                       <div className="text-sm font-bold text-white uppercase">Production Ready</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          {/* HOW THIS WORKS */}
          <section className="mb-32">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-normal uppercase text-center font-header">Here's the difference</h2>
            <div className="grid md:grid-cols-2 gap-12 text-lg text-text-secondary leading-relaxed">
              <p>
                Most people treat AI like a better Google. Type a question, copy the answer, paste it somewhere else. Fine for one-offs. Painful when you're doing it 10 times a day.
              </p>
              <p>
                In this session, we set up command-line AI tools on your computer (like Claude Code, Gemini CLI, etc). Then we build 3 workflows that handle your repetitive tasks automatically. <strong>You type one command. It does the work. That's it.</strong>
              </p>
            </div>
          </section>

          {/* WHY NOT JUST DO IT YOURSELF? */}
          <section className="mb-32">
            <h2 className="text-2xl md:text-4xl font-bold mb-12 tracking-normal uppercase text-center font-header">Why not just do it yourself?</h2>
            <div className="max-w-3xl mx-auto text-lg text-text-secondary leading-relaxed space-y-6">
              <p>You could figure this out yourself. People do it all the time. But here's what that actually looks like:</p>
              <p>You'll spend 2-3 weeks watching tutorials, hitting cryptic errors, and Googling things like "zsh command not found fix." You'll get it working eventually. Maybe.</p>
              <p className="text-white font-bold italic">Or we can do it together in 90 minutes. Your call.</p>
            </div>
          </section>

          {/* WHAT HAPPENS IN 90 MINUTES */}
          <section className="mb-32 bg-secondary-bg/50 p-8 md:p-16 rounded-[40px] border border-navy-dark relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <Clock className="w-64 h-64" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-16 uppercase tracking-normal font-header">
              What happens in 90 minutes
            </h2>
            <div className="space-y-12 relative z-10">
              <div className="flex gap-8 group">
                <div className="font-mono text-accent font-bold shrink-0 text-xl group-hover:scale-110 transition-transform">00-20</div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-3 uppercase tracking-tight">Get Everything Installed</h3>
                  <p className="text-text-secondary leading-relaxed">We pick which AI tools make sense for your use case (Claude Code, Gemini CLI, or others) and get them working on your machine. I'll walk you through it.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="font-mono text-accent font-bold shrink-0 text-xl group-hover:scale-110 transition-transform">20-50</div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-3 uppercase tracking-tight">Pick Your 3 Workflows</h3>
                  <p className="text-text-secondary leading-relaxed">We talk about what's eating up your time. Writing the same emails? Organizing files? Pulling data from websites? We pick 3 things to automate.</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="font-mono text-accent font-bold shrink-0 text-xl group-hover:scale-110 transition-transform">50-90</div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-3 uppercase tracking-tight">Build Them Together</h3>
                  <p className="text-text-secondary leading-relaxed">We build your workflows and test them with your actual work. If something doesn't work right, we fix it before we're done.</p>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT YOU GET */}
          <section className="mb-32 grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-navy-dark/20 border border-white/5 rounded-2xl hover:border-accent/30 transition-colors">
              <ShieldCheck className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-bold text-white mb-3 uppercase tracking-normal">Tools That Actually Work</h3>
              <p className="text-sm text-text-secondary font-light">The right AI tools set up on your computer based on what you need. No more error messages or "something went wrong."</p>
            </div>
            <div className="p-8 bg-navy-dark/20 border border-white/5 rounded-2xl hover:border-accent/30 transition-colors">
              <Terminal className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-bold text-white mb-3 uppercase tracking-normal">3 Workflows Built for You</h3>
              <p className="text-sm text-text-secondary font-light">Not generic templates. Actual automation for your specific tasks. Ready to use Monday morning.</p>
            </div>
            <div className="p-8 bg-navy-dark/20 border border-white/5 rounded-2xl hover:border-accent/30 transition-colors">
              <FileText className="w-8 h-8 text-accent mb-6" />
              <h3 className="font-bold text-white mb-3 uppercase tracking-normal">Everything Documented</h3>
              <p className="text-sm text-text-secondary font-light">Every step we took and every command we used, so you can tweak things or build more later.</p>
            </div>
          </section>

          {/* PRICING CARD / THE OFFER */}
          <div id="pricing" className="bg-white text-primary-bg rounded-[40px] p-10 md:p-20 text-center shadow-[0_0_60px_rgba(255,255,255,0.1)] mb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Terminal className="w-64 h-64" />
            </div>
            
            <div className="inline-block bg-accent text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Limited Spots
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-normal leading-none uppercase font-header">
              The Agent Kickstart Jam
            </h2>
            
            <div className="text-8xl font-black mb-2 tracking-tighter">$99</div>
            <p className="text-accent font-mono text-xs font-bold uppercase tracking-[0.3em] mb-10">One-Time Fee | 90 Minutes</p>
            
            <p className="text-slate-600 mb-12 max-w-sm mx-auto font-medium leading-relaxed">
              You've probably watched tutorials or started setup guides and gotten stuck. Let me handle the setup and build the first 3 workflows with you.
            </p>

            {/* Urgency Hook */}
            <div className="mb-12">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10 font-mono">
                  6 of 10 spots available this week
                </div>
                <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="w-[60%] h-full bg-accent rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                </div>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-bold">First Come, First Served</span>
              </div>
            </div>

            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1"
              className="inline-flex items-center justify-center gap-3 w-full max-w-md px-12 py-6 rounded-2xl font-black text-2xl transition-all uppercase tracking-widest bg-primary-bg text-white hover:bg-slate-800 shadow-2xl"
            >
              Book My Session <ArrowRight className="w-6 h-6" />
            </a>

            {/* Refund Policy */}
            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 inline-block text-left max-w-md mx-auto">
               <div className="flex gap-4">
                  <ShieldCheck className="w-10 h-10 text-emerald-500 shrink-0" />
                  <div>
                     <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight mb-1">The 48-Hour Guarantee</h4>
                     <p className="text-[11px] text-slate-500 leading-relaxed">
                        If this doesn't save you at least 10 hours of headache, email me within 48 hours and I'll refund your $99. **No hassle, no questions.**
                     </p>
                  </div>
               </div>
            </div>
          </div>

          {/* WHO'S RUNNING THIS? SECTION */}
          <div className="text-center pt-24 border-t border-navy-dark mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 uppercase tracking-normal font-header">Who am I?</h2>
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 grayscale border-4 border-navy-dark shadow-2xl">
              <Image src="/images/akhil.jpg" alt="Akhil" width={96} height={96} className="object-cover" />
            </div>
            <div className="text-xl md:text-2xl text-text-color italic mb-10 font-light leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                "I'm <strong>Akhil MK</strong>. I run a marketing agency. I got tired of copy-pasting between browser tabs, so I started learning command-line AI tools. The setup was a nightmare. Tutorials skip steps. Things break randomly. I spent months figuring it out. Now I help other business owners skip that mess and get straight to working automation."
              </p>
              <p className="text-right not-italic font-header text-accent tracking-widest uppercase text-xl">
                Akhil, <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="hover:underline">akhilhaving.fun</a>
              </p>
            </div>
            <div className="flex justify-center gap-12 text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em]">
              <a href="mailto:akhil@realaiexamples.com" className="hover:text-accent transition-colors">Direct Support</a>
              <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">The Lab</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
