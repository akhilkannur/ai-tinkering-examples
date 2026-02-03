import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Zap, ArrowRight, CheckCircle2, Clock, MessageCircle, Sparkles, Shield, Coffee, Gift, HelpCircle, Globe, Video, FileText } from 'lucide-react'
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

      <main className="pt-24 pb-20 relative z-10">
        
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-5xl pt-8 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            
            <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-bold text-accent tracking-wide uppercase flex items-center gap-2">
                <Coffee className="w-3 h-3" /> 60-Minute Remote Session
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              We Install the <span className="text-accent">Scary Terminal Stuff</span> <br className="hidden md:block" />So You Don't Have To.
            </h1>
            
            <p className="text-xl mb-8 text-text-secondary leading-relaxed max-w-2xl mx-auto">
              You want to use Gemini CLI or Claude Code, but the setup is a nightmare. 
              <strong className="text-text-color"> We do it for you.</strong> Screen share, watch us work, ask questions. Walk away with a working AI agent.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20"
              >
                Book Your Setup ($99) <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="#how-it-works" className="w-full sm:w-auto border border-navy-dark hover:bg-white/5 text-text-color font-bold py-4 px-8 rounded-lg text-lg flex items-center justify-center transition-all">
                See How It Works
              </Link>
            </div>

            <p className="text-sm text-text-secondary/60 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> No coding required. We do all the typing.
            </p>
          </div>
        </div>

        {/* BEFORE/AFTER SECTION */}
        <div className="bg-secondary-bg border-y border-navy-dark py-16 mb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-text-color">
              From <span className="text-red-400">"Why won't this work?!"</span> to <span className="text-emerald-400">"Wait, that's it?"</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {beforeAfterItems.map((item, idx) => (
                <div key={idx} className="flex items-stretch gap-4 bg-primary-bg rounded-xl border border-navy-dark p-5">
                  <div className="flex-1 flex items-center gap-3 text-red-400/80">
                    <span className="text-lg">✗</span>
                    <span className="text-sm line-through opacity-70">{item.before}</span>
                  </div>
                  <div className="w-px bg-navy-light"></div>
                  <div className="flex-1 flex items-center gap-3 text-emerald-400">
                    <span className="text-lg">✓</span>
                    <span className="text-sm font-medium">{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how-it-works" className="container mx-auto px-4 max-w-5xl mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Here's Exactly What Happens</h2>
            <p className="text-text-secondary max-w-xl mx-auto">A 60-minute Zoom call where we do the work and you learn by watching.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`bg-secondary-bg border border-navy-dark rounded-2xl p-6 transition-all ${activeStep === 0 ? 'border-accent ring-2 ring-accent/20' : ''}`}>
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4 font-bold">01</div>
              <h3 className="font-bold text-lg mb-2 text-text-color">Screen Share</h3>
              <p className="text-sm text-text-secondary leading-relaxed">You share your screen. We take control (with your permission). You watch.</p>
            </div>
            
            <div className={`bg-secondary-bg border border-navy-dark rounded-2xl p-6 transition-all ${activeStep === 1 ? 'border-accent ring-2 ring-accent/20' : ''}`}>
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4 font-bold">02</div>
              <h3 className="font-bold text-lg mb-2 text-text-color">We Install Everything</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Node.js, Gemini CLI, Claude Code, API keys. All the boring stuff, done right.</p>
            </div>
            
            <div className={`bg-secondary-bg border border-navy-dark rounded-2xl p-6 transition-all ${activeStep === 2 ? 'border-accent ring-2 ring-accent/20' : ''}`}>
              <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4 font-bold">03</div>
              <h3 className="font-bold text-lg mb-2 text-text-color">Run Your First Agent</h3>
              <p className="text-sm text-text-secondary leading-relaxed">We pick a workflow from our library and run it together. Real results, not demos.</p>
            </div>
            
            <div className={`bg-secondary-bg border border-navy-dark rounded-2xl p-6 transition-all ${activeStep === 3 ? 'border-accent ring-2 ring-accent/20' : ''}`}>
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mb-4 font-bold">04</div>
              <h3 className="font-bold text-lg mb-2 text-text-color">You're Set Up Forever</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Get a cheat sheet with commands. Ask us anything for 7 days after.</p>
            </div>
          </div>
        </div>

        {/* WHO THIS IS FOR */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="bg-secondary-bg border border-navy-dark rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">This Is For You If...</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-color font-medium">You've heard about "AI agents" but the terminal feels like hacker stuff</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-color font-medium">You tried following a tutorial and got stuck at step 3</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-color font-medium">You'd rather pay someone to do the annoying setup than waste a weekend</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-color font-medium">You're a founder, marketer, or ops person—not a developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT YOU GET */}
        <div className="container mx-auto px-4 max-w-5xl mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/30 transition-all">
              <Video className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">60-Min Live Session</h3>
              <p className="text-sm text-text-secondary">Zoom screen share. We do the work, you watch and learn.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/30 transition-all">
              <Terminal className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Full Tool Installation</h3>
              <p className="text-sm text-text-secondary">Node.js, Gemini CLI, Claude Code, API keys—all configured.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/30 transition-all">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">First Agent Run</h3>
              <p className="text-sm text-text-secondary">We run a real workflow together so you see it actually work.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/30 transition-all">
              <FileText className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">Command Cheat Sheet</h3>
              <p className="text-sm text-text-secondary">A simple doc with the 5 commands you'll actually use.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/30 transition-all">
              <MessageCircle className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold text-lg mb-2">7 Days of Support</h3>
              <p className="text-sm text-text-secondary">Email us any questions for a week. We'll unstick you.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/30 transition-all">
              <Gift className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold text-lg mb-2">Bonus: 3 Starter Workflows</h3>
              <p className="text-sm text-text-secondary">Pre-built blueprints for lead research, content, and data cleanup.</p>
            </div>
          </div>
        </div>

        {/* MEET AKHIL */}
        <div className="container mx-auto px-4 max-w-4xl mb-24">
          <div className="bg-secondary-bg border border-navy-dark rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-accent overflow-hidden relative">
                  <Image 
                    src="/images/akhil.jpg" 
                    alt="Akhil MK" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Hi, I'm Akhil.</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  I run this site and I've helped 50+ non-technical founders set up terminal AI agents. 
                  I'm not a "clean code" engineer—I'm a tinkerer who figures out what works and teaches it in plain English. 
                  If something breaks during our session, I fix it. That's it.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-text-secondary">
                  <span className="bg-primary-bg border border-navy-dark px-3 py-1 rounded-full">700+ Blueprints Created</span>
                  <span className="bg-primary-bg border border-navy-dark px-3 py-1 rounded-full">50+ Setups Completed</span>
                  <span className="bg-primary-bg border border-navy-dark px-3 py-1 rounded-full">0 Frustrated Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div id="pricing" className="container mx-auto px-4 max-w-4xl mb-24 pt-8">
          <div className="bg-secondary-bg border-2 border-accent rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-purple-500 to-accent"></div>
            
            <div className="inline-block bg-accent/10 border border-accent/20 rounded-full px-4 py-1 mb-6">
              <span className="text-xs font-bold text-accent tracking-wide uppercase">Limited Availability</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Done-For-You Setup</h2>
            <div className="text-5xl md:text-6xl font-extrabold text-accent mb-4">$99</div>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">One payment. 60-minute session. Everything installed and working.</p>
            
            <div className="bg-primary-bg border border-navy-dark rounded-xl p-6 mb-8 max-w-md mx-auto text-left">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>60-minute live Zoom session</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Gemini CLI + Claude Code installed</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>API keys configured securely</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>First agent run (real results)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Command cheat sheet</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>7 days email support</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <label className="flex items-center justify-center gap-3 cursor-pointer group">
                <div 
                  className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${accepted ? 'bg-accent border-accent' : 'border-navy-light group-hover:border-accent'}`} 
                  onClick={() => setAccepted(!accepted)}
                >
                  {accepted && <CheckCircle2 className="text-white w-4 h-4" />}
                </div>
                <span className="text-sm text-text-secondary group-hover:text-text-color transition-colors">I agree to the remote session terms</span>
              </label>
            </div>

            <a 
              href={accepted ? "https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1" : "#"}
              className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-bold text-lg transition-all ${accepted ? 'bg-accent hover:bg-accent-hover text-white transform hover:-translate-y-1 shadow-lg shadow-accent/20' : 'bg-navy-dark text-text-secondary cursor-not-allowed'}`}
              onClick={(e) => !accepted && e.preventDefault()}
            >
              Book Your Session <ArrowRight className="w-5 h-5" />
            </a>
            
            <p className="text-xs text-text-secondary/60 mt-4 flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" /> Secure Stripe checkout. Scheduling link sent immediately.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="container mx-auto px-4 max-w-3xl mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" /> Do I need any technical knowledge?
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">Nope. If you can open a Zoom call and share your screen, you're qualified. We do all the terminal typing.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" /> Mac or Windows?
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">Both. We've done setups on Mac, Windows, and even a few brave Linux users.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" /> What if something breaks after the session?
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">Email us within 7 days. We'll hop on a quick call and fix it. No extra charge.</p>
            </div>
            
            <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" /> How do I book a time?
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">After payment, you'll get a Calendly link to pick a slot that works for you. Usually within 48 hours.</p>
            </div>
          </div>
        </div>

        {/* GLOBAL AVAILABILITY */}
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-2xl font-bold mb-2">Available Worldwide</h3>
            <p className="text-text-secondary max-w-md mx-auto">
              Remote sessions work across all timezones. Pick a slot that fits your schedule.
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}
