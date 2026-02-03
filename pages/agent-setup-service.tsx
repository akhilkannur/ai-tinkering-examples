import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Zap, ArrowRight, CheckCircle2, MessageCircle, Shield, Coffee, Gift, HelpCircle, Globe, Video, FileText, BookOpen, X, Check, AlertTriangle, Cpu } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const beforeAfterItems = [
  { before: "Googling 'npm not recognized' for 2 hours", after: "Type one command. It works." },
  { before: "'Path environment variable' nightmares", after: "Run agents from any folder" },
  { before: "YouTube tutorials that skip the hard parts", after: "Someone fixes it live, while you watch" },
  { before: "Giving up and going back to ChatGPT", after: "Actually using the terminal like a pro" },
];

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
    <div className="min-h-screen font-sans bg-primary-bg text-text-color selection:bg-accent/30">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-5xl mb-24 md:mb-32">
          <div className="text-center max-w-4xl mx-auto">
            
            <div className="flex justify-center mb-8">
              <span className="text-xs md:text-sm font-bold text-accent tracking-widest uppercase flex items-center gap-2 bg-secondary-bg px-6 py-2 rounded-full border border-navy-dark shadow-xl">
                <Cpu className="w-4 h-4" /> For Non-Technical Tinkerers & AI Explorers
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
              We Install the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Scary Terminal Stuff</span> <br className="hidden md:block" />So You Don't Have To.
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-text-secondary leading-relaxed max-w-2xl mx-auto font-light">
              You've seen the demos. You want in. But the terminal setup is hell.<br className="hidden md:block" />
              <strong className="text-text-color font-semibold">We do it for you in 60 minutes.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-white text-primary-bg hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Book Your Setup ($99) <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="#how-it-works" className="w-full sm:w-auto text-text-color hover:text-white font-medium py-4 px-8 rounded-full text-lg flex items-center justify-center transition-all underline decoration-text-secondary/30 hover:decoration-white underline-offset-4">
                See How It Works
              </Link>
            </div>

            <p className="text-sm text-text-secondary/60 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> No coding required. We do all the typing.
            </p>
          </div>
        </div>

        {/* BEFORE/AFTER SECTION - REDESIGNED */}
        <div className="container mx-auto px-4 max-w-5xl mb-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stop fighting your computer. Start building.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 relative">
             {/* THE STRUGGLE CARD */}
             <div className="bg-[#1a1a1a] border border-red-900/30 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <AlertTriangle className="w-24 h-24 text-red-500" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-red-400 font-bold mb-8 flex items-center gap-3 text-xl tracking-tight">
                        <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-sm border border-red-500/20">01</span>
                        The "DIY" Nightmare
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 opacity-60">
                            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-lg line-through decoration-red-500/50">Googling "npm not recognized" for 2 hours</span>
                        </li>
                        <li className="flex items-start gap-4 opacity-60">
                            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-lg line-through decoration-red-500/50">"Path environment variable" errors</span>
                        </li>
                        <li className="flex items-start gap-4 opacity-60">
                            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-lg line-through decoration-red-500/50">YouTube tutorials that skip steps</span>
                        </li>
                        <li className="flex items-start gap-4 opacity-60">
                            <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-lg line-through decoration-red-500/50">Giving up and going back to chat</span>
                        </li>
                    </ul>
                </div>
             </div>

             {/* THE SOLUTION CARD */}
             <div className="bg-secondary-bg border-2 border-accent/50 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.1)]">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-24 h-24 text-accent" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-white font-bold mb-8 flex items-center gap-3 text-xl tracking-tight">
                        <span className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm text-white font-bold">02</span>
                        The "Done-For-You" Way
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-green-400" />
                            </div>
                            <span className="text-lg font-medium text-white">Type one command. It just works.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-green-400" />
                            </div>
                            <span className="text-lg font-medium text-white">Run agents from any folder</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-green-400" />
                            </div>
                            <span className="text-lg font-medium text-white">We fix errors live while you watch</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 text-green-400" />
                            </div>
                            <span className="text-lg font-medium text-white">Using the terminal like a pro</span>
                        </li>
                    </ul>
                </div>
             </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how-it-works" className="container mx-auto px-4 max-w-5xl mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Here's Exactly What Happens</h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">A 60-minute Zoom call where we do the work and you learn by watching.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-navy-dark -z-10"></div>

            <div className={`group transition-all duration-500 ${activeStep === 0 ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 border-2 ${activeStep === 0 ? 'bg-secondary-bg border-accent text-accent scale-110 shadow-lg shadow-accent/10' : 'bg-primary-bg border-navy-dark text-text-secondary'}`}>
                <span className="text-3xl font-bold">01</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center text-text-color">Screen Share</h3>
              <p className="text-sm text-text-secondary text-center leading-relaxed">You share your screen. We take control (with your permission). You watch.</p>
            </div>
            
            <div className={`group transition-all duration-500 ${activeStep === 1 ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 border-2 ${activeStep === 1 ? 'bg-secondary-bg border-accent text-accent scale-110 shadow-lg shadow-accent/10' : 'bg-primary-bg border-navy-dark text-text-secondary'}`}>
                <span className="text-3xl font-bold">02</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center text-text-color">We Install Everything</h3>
              <p className="text-sm text-text-secondary text-center leading-relaxed">Node.js, Gemini CLI, Claude Code, API keys. All the boring stuff, done right.</p>
            </div>
            
            <div className={`group transition-all duration-500 ${activeStep === 2 ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 border-2 ${activeStep === 2 ? 'bg-secondary-bg border-accent text-accent scale-110 shadow-lg shadow-accent/10' : 'bg-primary-bg border-navy-dark text-text-secondary'}`}>
                <span className="text-3xl font-bold">03</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center text-text-color">Run Your First Agent</h3>
              <p className="text-sm text-text-secondary text-center leading-relaxed">We pick a workflow from our library and run it together. Real results, not demos.</p>
            </div>
            
            <div className={`group transition-all duration-500 ${activeStep === 3 ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 border-2 ${activeStep === 3 ? 'bg-secondary-bg border-emerald-500 text-emerald-400 scale-110 shadow-lg shadow-emerald-500/10' : 'bg-primary-bg border-navy-dark text-text-secondary'}`}>
                <span className="text-3xl font-bold">04</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-center text-text-color">You're Set Up Forever</h3>
              <p className="text-sm text-text-secondary text-center leading-relaxed">Get a cheat sheet with commands. Ask us anything for 7 days after.</p>
            </div>
          </div>
        </div>

        {/* WHO THIS IS FOR */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="bg-secondary-bg/50 border border-navy-dark rounded-3xl p-10 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">This Is For You If...</h2>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              {[ 
                  "You've heard about \"AI agents\" but the terminal feels like hacker stuff",
                  "You tried following a tutorial and got stuck at step 3",
                  "You'd rather pay someone to do the annoying setup than waste a weekend",
                  "You're a tinkerer or explorer who just wants to see it work"
              ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-text-color font-medium leading-relaxed">{text}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHAT YOU WALK AWAY WITH */}
        <div className="container mx-auto px-4 max-w-6xl mb-32">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold mb-4">What You Walk Away With</h2>
             <p className="text-text-secondary max-w-xl mx-auto">By the end of our session, you'll have a working AI agent that can do things like research 50 leads while you grab lunch.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary-bg p-8 rounded-2xl border border-navy-dark hover:border-navy-light transition-colors">
              <Terminal className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="font-bold text-xl mb-3">Everything Installed</h3>
              <p className="text-text-secondary leading-relaxed">Node.js, Gemini CLI, Claude Code, API keys. Done right, first time.</p>
            </div>
            
            <div className="bg-secondary-bg p-8 rounded-2xl border border-navy-dark hover:border-navy-light transition-colors">
              <Zap className="w-10 h-10 text-yellow-400 mb-6" />
              <h3 className="font-bold text-xl mb-3">Your First Win</h3>
              <p className="text-text-secondary leading-relaxed">We run a real workflow together. You see actual output, not a demo.</p>
            </div>
            
            <div className="bg-secondary-bg p-8 rounded-2xl border border-navy-dark hover:border-navy-light transition-colors">
              <FileText className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="font-bold text-xl mb-3">Cheat Sheet</h3>
              <p className="text-text-secondary leading-relaxed">5 commands you'll actually use. No fluff. Pinned to your desktop.</p>
            </div>
            
            <div className="bg-secondary-bg p-8 rounded-2xl border border-navy-dark hover:border-navy-light transition-colors">
              <Gift className="w-10 h-10 text-accent mb-6" />
              <h3 className="font-bold text-xl mb-3">3 Starter Workflows</h3>
              <p className="text-text-secondary leading-relaxed">Lead research, content repurposing, data cleanup. Ready to run.</p>
            </div>
            
            <div className="bg-secondary-bg p-8 rounded-2xl border border-navy-dark hover:border-navy-light transition-colors">
              <MessageCircle className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="font-bold text-xl mb-3">7-Day Safety Net</h3>
              <p className="text-text-secondary leading-relaxed">Something breaks? Email me. I'll fix it. No extra charge.</p>
            </div>
            
            <div className="bg-secondary-bg p-8 rounded-2xl border border-navy-dark hover:border-navy-light transition-colors">
              <Video className="w-10 h-10 text-accent mb-6" />
              <h3 className="font-bold text-xl mb-3">Confidence</h3>
              <p className="text-text-secondary leading-relaxed">You watched it happen. You know it works. No more guessing.</p>
            </div>
          </div>
        </div>

        {/* MEET AKHIL */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
           <div className="flex flex-col md:flex-row gap-10 items-center bg-secondary-bg/30 p-10 rounded-3xl border border-navy-dark/50">
              <div className="flex-shrink-0 relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-secondary-bg shadow-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                  <Image 
                    src="/images/akhil.jpg" 
                    alt="Akhil MK"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Hi, I'm Akhil.</h2>
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  I run this site and I've been setting up terminal AI agents for myself and friends who kept asking for help. 
                  I'm not a "clean code" engineer—I'm a tinkerer who figures out what works and teaches it in plain English. 
                  If something breaks during our session, I fix it. That's it.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="bg-primary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-text-secondary">700+ BLUEPRINTS CREATED</span>
                  <span className="bg-primary-bg border border-navy-dark px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-text-secondary">FOUNDER @ REALAIEXAMPLES.COM</span>
                </div>
              </div>
           </div>
        </div>

        {/* PRICING */}
        <div id="pricing" className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="bg-secondary-bg border border-navy-dark rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-black/50">
            {/* Subtle Top Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
            
            <div className="inline-block bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
              I take 3-4 of these per week
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Done-For-You Setup</h2>
            <div className="flex items-center justify-center gap-2 mb-6">
               <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter">$99</span>
               <span className="text-text-secondary text-xl font-medium self-end mb-2">/ one-time</span>
            </div>
            <p className="text-text-secondary mb-10 max-w-md mx-auto text-lg">One payment. 60-minute session. Everything installed and working.</p>
            
            <div className="bg-primary-bg/50 border border-navy-dark rounded-2xl p-8 mb-10 max-w-lg mx-auto text-left">
              <ul className="space-y-4">
                {[ 
                    "60-minute live Zoom session",
                    "Gemini CLI + Claude Code installed",
                    "API keys configured securely",
                    "First agent run (real results)",
                    "Command cheat sheet",
                    "7 days email support"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-text-color">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span>{item}</span>
                    </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <label className="flex items-center justify-center gap-3 cursor-pointer group select-none">
                <div 
                  className={`w-6 h-6 border rounded flex items-center justify-center transition-all ${accepted ? 'bg-accent border-accent' : 'border-navy-light group-hover:border-accent'}`}
                  onClick={() => setAccepted(!accepted)}
                >
                  {accepted && <Check className="text-white w-4 h-4" />}
                </div>
                <span className="text-sm text-text-secondary group-hover:text-text-color transition-colors">I agree to the remote session terms</span>
              </label>
            </div>

            <a 
              href={accepted ? "https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1" : "#"}
              className={`inline-flex items-center justify-center gap-2 w-full md:w-auto px-12 py-5 rounded-xl font-bold text-lg transition-all ${accepted ? 'bg-white text-primary-bg hover:bg-gray-100 transform hover:-translate-y-1 shadow-xl' : 'bg-navy-dark text-text-secondary/50 cursor-not-allowed'}`}
              onClick={(e) => !accepted && e.preventDefault()}
            >
              Book Your Session <ArrowRight className="w-5 h-5" />
            </a>
            
            <p className="text-xs text-text-secondary/50 mt-6">
              Scheduling link sent immediately after payment.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="container mx-auto px-4 max-w-3xl mb-32">
          <h2 className="text-3xl font-bold text-center mb-16">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-navy-dark pb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-3 text-text-color">
                <span className="text-accent">01.</span> Do I need any technical knowledge?
              </h3>
              <p className="text-text-secondary text-base leading-relaxed pl-8">Nope. If you can open a Zoom call and share your screen, you're qualified. We do all the terminal typing.</p>
            </div>
            
            <div className="border-b border-navy-dark pb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-3 text-text-color">
                <span className="text-accent">02.</span> Mac or Windows?
              </h3>
              <p className="text-text-secondary text-base leading-relaxed pl-8">Both. We've done setups on Mac, Windows, and even a few brave Linux users.</p>
            </div>
            
            <div className="border-b border-navy-dark pb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-3 text-text-color">
                <span className="text-accent">03.</span> What if something breaks after the session?
              </h3>
              <p className="text-text-secondary text-base leading-relaxed pl-8">Email us within 7 days. We'll hop on a quick call and fix it. No extra charge.</p>
            </div>
            
            <div className="border-b border-navy-dark pb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-3 text-text-color">
                <span className="text-accent">04.</span> How do I book a time?
              </h3>
              <p className="text-text-secondary text-base leading-relaxed pl-8">After payment, you'll get a Calendly link to pick a slot that works for you. Usually within 48 hours.</p>
            </div>
          </div>
        </div>

        {/* DIY OPTION */}
        <div className="container mx-auto px-4 max-w-3xl mb-24">
          <div className="bg-primary-bg border border-navy-dark rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="p-4 bg-secondary-bg rounded-full flex-shrink-0">
               <BookOpen className="w-8 h-8 text-text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Prefer to DIY?</h3>
              <p className="text-text-secondary mb-4 leading-relaxed">
                If you're comfortable with some terminal friction, follow our free setup guides instead.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <Link href="/setup/gemini-cli" className="text-sm font-semibold text-accent hover:text-white transition-colors flex items-center gap-2">
                  Gemini CLI Guide <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/setup/claude-code" className="text-sm font-semibold text-accent hover:text-white transition-colors flex items-center gap-2">
                  Claude Code Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* GLOBAL AVAILABILITY */}
        <div className="container mx-auto px-4 max-w-3xl text-center pb-20">
            <div className="inline-flex items-center gap-3 text-text-secondary/60 text-sm font-medium">
               <Globe className="w-4 h-4" />
               <span>Available Worldwide &bull; Remote Sessions</span>
            </div>
        </div>

      </main>
    </div>
  )
}