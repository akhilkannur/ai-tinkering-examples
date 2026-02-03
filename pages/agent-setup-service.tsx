import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Zap, ArrowRight, CheckCircle2, MessageCircle, Shield, Coffee, Gift, HelpCircle, Globe, Video, FileText, BookOpen, X, Check, AlertTriangle, Cpu, Command } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AgentSetupService() {
  const title = "Done-For-You AI Agent Setup | For Non-Technical Tinkerers";
  const description = "We'll install Gemini CLI & Claude Code on your machine via screen share. No terminal experience needed. Just show up and watch us do the hard part.";

  const [accepted, setAccepted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-primary-bg text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Navbar />

      <main className="pt-24 relative z-10">
        
        {/* HERO SECTION */}
        <div className="relative border-b border-navy-dark bg-[#0B1120]">
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             
             <div className="container mx-auto px-4 max-w-6xl pt-20 pb-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest mb-8">
                            <Cpu className="w-4 h-4" /> For Non-Technical Tinkerers
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] text-white tracking-tight">
                            We Install the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Scary Terminal Stuff</span>
                        </h1>
                        
                        <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                            You want to use AI agents, but the setup instructions look like alien code. <strong className="text-white font-medium">We do it for you in 60 minutes.</strong>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-primary-bg font-bold rounded-lg hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                            >
                                Book Setup ($99) <ArrowRight className="w-5 h-5" />
                            </button>
                            <Link href="#how-it-works" className="px-8 py-4 border border-navy-dark text-text-secondary hover:text-white hover:border-white/20 font-bold rounded-lg transition-all flex items-center justify-center">
                                See How It Works
                            </Link>
                        </div>
                    </div>

                    {/* HERO VISUAL - TERMINAL */}
                    <div className="relative hidden lg:block perspective-1000">
                        <div className="absolute -inset-4 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur-2xl opacity-20 animate-pulse"></div>
                        <div className="relative bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out p-1">
                            {/* Window Bar */}
                            <div className="bg-[#1E293B] px-4 py-2 rounded-t-lg flex items-center gap-2 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="ml-4 text-[10px] font-mono text-white/30 flex-1 text-center">gemini-setup — -zsh</div>
                            </div>
                            {/* Terminal Body */}
                            <div className="p-6 font-mono text-xs md:text-sm text-green-400 leading-relaxed h-[320px] overflow-hidden opacity-90">
                                <div className="mb-2 text-white/50">Last login: {new Date().toDateString()} on ttys001</div>
                                <div className="mb-4">
                                    <span className="text-purple-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">npm install -g @google/gemini-cli</span>
                                </div>
                                <div className="mb-2 text-white">
                                    [..................] \ fetchMetadata: sil: <span className="text-yellow-400">WARN</span> deprecated source
                                </div>
                                <div className="mb-2 text-white">
                                    <span className="bg-white/20 px-1">npm ERR!</span> code EACCES<br/>
                                    <span className="bg-white/20 px-1">npm ERR!</span> syscall mkdir<br/>
                                    <span className="bg-white/20 px-1">npm ERR!</span> path /usr/local/lib/node_modules/gemini<br/>
                                    <span className="bg-white/20 px-1">npm ERR!</span> errno -13
                                </div>
                                <div className="mb-4 text-red-400 font-bold">
                                    Error: Missing write access to /usr/local/lib
                                </div>
                                <div className="mb-2 border-t border-white/10 pt-4 animate-pulse">
                                    <span className="text-purple-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">sudo chown -R $USER /usr/local/lib...</span>
                                </div>
                            </div>
                            {/* Overlaid Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white text-primary-bg px-6 py-3 rounded-lg font-bold shadow-xl border-4 border-primary-bg transform rotate-3 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                We fix this mess.
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* COMPARISON SECTION */}
        <div className="py-24 bg-primary-bg relative">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop Fighting Your Computer</h2>
                    <p className="text-text-secondary text-xl max-w-2xl mx-auto">There are two ways to get started with AI agents.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* The Hard Way */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-red-500/5 rounded-3xl transform rotate-2 group-hover:rotate-1 transition-transform"></div>
                        <div className="relative bg-[#1a1a1a] border border-red-900/30 rounded-3xl p-8 md:p-12 overflow-hidden">
                            <div className="absolute -right-10 -top-10 opacity-5">
                                <AlertTriangle className="w-64 h-64" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500 font-bold text-xl">01</div>
                                <h3 className="text-2xl font-bold text-red-400">The "DIY" Nightmare</h3>
                            </div>

                            <ul className="space-y-6 relative z-10">
                                <li className="flex items-start gap-4 group/item">
                                    <X className="w-6 h-6 text-red-500/50 mt-0.5 group-hover/item:text-red-500 transition-colors" />
                                    <span className="text-lg text-text-secondary line-through decoration-red-500/30">Googling "npm errors" for 3 hours</span>
                                </li>
                                <li className="flex items-start gap-4 group/item">
                                    <X className="w-6 h-6 text-red-500/50 mt-0.5 group-hover/item:text-red-500 transition-colors" />
                                    <span className="text-lg text-text-secondary line-through decoration-red-500/30">Messing up your system PATH</span>
                                </li>
                                <li className="flex items-start gap-4 group/item">
                                    <X className="w-6 h-6 text-red-500/50 mt-0.5 group-hover/item:text-red-500 transition-colors" />
                                    <span className="text-lg text-text-secondary line-through decoration-red-500/30">YouTube tutorials that skip steps</span>
                                </li>
                                <li className="flex items-start gap-4 group/item">
                                    <X className="w-6 h-6 text-red-500/50 mt-0.5 group-hover/item:text-red-500 transition-colors" />
                                    <span className="text-lg text-text-secondary line-through decoration-red-500/30">Giving up and cancelling the project</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* The Smart Way */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 rounded-3xl transform -rotate-2 blur-xl"></div>
                        <div className="relative bg-secondary-bg border-2 border-accent rounded-3xl p-8 md:p-12 shadow-2xl">
                            <div className="absolute -right-6 -top-6 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transform rotate-3">Recommended</div>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl">02</div>
                                <h3 className="text-2xl font-bold text-white">The "Done-For-You" Way</h3>
                            </div>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <span className="text-lg font-medium text-white">One payment. One hour. Done.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <span className="text-lg font-medium text-white">We fix every error live on screen</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <span className="text-lg font-medium text-white">Your environment is set up for life</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    </div>
                                    <span className="text-lg font-medium text-white">Run ANY agent workflow instantly</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* PROCESS SECTION */}
        <div id="how-it-works" className="py-32 bg-[#0B1120] relative border-y border-navy-dark overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-accent to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Here's Exactly What Happens</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">A 60-minute Zoom call where you watch us work.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { title: "Screen Share", desc: "You share your screen. We take remote control (with permission)." },
                        { title: "We Install", desc: "Node.js, Gemini CLI, Claude Code, API keys. All the boring stuff." },
                        { title: "First Run", desc: "We run a real agent workflow together to prove it works." },
                        { title: "Handover", desc: "You get a cheat sheet and 7 days of email support." }
                    ].map((step, i) => (
                        <div key={i} className={`relative p-8 rounded-2xl border transition-all duration-500 group ${activeStep === i ? 'bg-secondary-bg border-accent shadow-2xl scale-105 z-10' : 'bg-primary-bg border-navy-dark opacity-80 hover:opacity-100'}`}>
                            <div className="absolute -top-6 -left-4 text-8xl font-black text-white/5 select-none z-0 group-hover:text-white/10 transition-colors">
                                0{i + 1}
                            </div>
                            <div className="relative z-10">
                                <h3 className={`text-xl font-bold mb-4 ${activeStep === i ? 'text-accent' : 'text-white'}`}>{step.title}</h3>
                                <p className="text-text-secondary leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* VALUE STACK (WHAT YOU GET) */}
        <div className="py-24 bg-primary-bg">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">The "Setup Stack"</h2>
                    <p className="text-text-secondary">Everything included in your session.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: <Terminal />, title: "Full Environment", desc: "Node.js, NPM, Gemini, Claude installed correctly." },
                        { icon: <Shield />, title: "Security Check", desc: "API keys stored safely in .env files, not exposed." },
                        { icon: <FileText />, title: "Cheat Sheet", desc: "PDF with the 5 commands you'll actually need." },
                        { icon: <Gift />, title: "3 Starter Kits", desc: "Ready-to-run agents for Sales & Marketing." },
                        { icon: <MessageCircle />, title: "7-Day Support", desc: "If it breaks next week, we fix it for free." },
                        { icon: <Video />, title: "Session Recording", desc: "Re-watch the setup anytime you want." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-6 bg-secondary-bg rounded-xl border border-navy-dark hover:border-navy-light transition-colors">
                            <div className="p-3 bg-primary-bg rounded-lg text-accent border border-navy-dark">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* PRICING */}
        <div id="pricing" className="py-24 container mx-auto px-4 max-w-4xl">
          <div className="bg-secondary-bg border border-navy-dark rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-black/50 group">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="inline-block bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8 shadow-lg shadow-accent/20">
              Limited Availability
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Done-For-You Setup</h2>
            <div className="flex items-center justify-center gap-2 mb-8">
               <span className="text-6xl md:text-8xl font-bold text-white tracking-tighter">$99</span>
               <span className="text-text-secondary text-xl font-medium self-end mb-4">/ one-time</span>
            </div>
            
            <div className="mb-10">
              <label className="flex items-center justify-center gap-3 cursor-pointer group/check select-none bg-primary-bg/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors max-w-md mx-auto">
                <div 
                  className={`w-6 h-6 border rounded flex items-center justify-center transition-all ${accepted ? 'bg-accent border-accent' : 'border-navy-light group-hover/check:border-accent'}`}
                  onClick={() => setAccepted(!accepted)}
                >
                  {accepted && <Check className="text-white w-4 h-4" />}
                </div>
                <span className="text-sm text-text-secondary group-hover/check:text-text-color transition-colors">I agree to the remote session terms</span>
              </label>
            </div>

            <a 
              href={accepted ? "https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1" : "#"}
              className={`inline-flex items-center justify-center gap-2 w-full md:w-auto px-16 py-6 rounded-xl font-bold text-xl transition-all ${accepted ? 'bg-white text-primary-bg hover:bg-gray-100 transform hover:-translate-y-1 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'bg-navy-dark text-text-secondary/50 cursor-not-allowed'}`}
              onClick={(e) => !accepted && e.preventDefault()}
            >
              Book Your Session <ArrowRight className="w-6 h-6" />
            </a>
            
            <p className="text-xs text-text-secondary/40 mt-8">
              100% Money Back Guarantee if we can't get your agent running.
            </p>
          </div>
        </div>

        {/* MEET AKHIL */}
        <div className="container mx-auto px-4 max-w-3xl mb-32">
           <div className="flex flex-col md:flex-row gap-8 items-center bg-transparent border border-navy-dark/50 p-8 rounded-2xl">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 grayscale hover:grayscale-0 transition-all">
                <Image src="/images/akhil.jpg" alt="Akhil MK" width={80} height={80} className="object-cover" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-text-secondary text-sm leading-relaxed">
                  <strong className="text-white">Hi, I'm Akhil.</strong> I run this site. I'm not a "clean code" engineer—I'm a tinkerer. I built this service because my friends kept getting stuck on terminal errors. If I can't fix your setup, I'll refund you instantly.
                </p>
              </div>
           </div>
        </div>

      </main>
      
      <footer className="border-t border-navy-dark py-12 text-center text-text-secondary text-sm bg-[#0B1120]">
        <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Real AI Examples. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
