import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Zap, ArrowRight, CheckCircle2, MessageCircle, Shield, Coffee, Gift, HelpCircle, Globe, Video, FileText, BookOpen, X, Check, AlertTriangle, Cpu, Command, Activity } from 'lucide-react'
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

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <div className="relative border-b border-white/5 bg-[#0B1120]">
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             
             <div className="container mx-auto px-4 max-w-6xl pt-40 pb-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-8 font-mono">
                            <Cpu className="w-3.5 h-3.5" /> [ SYSTEM ACCESS: NON-TECHNICAL ]
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] text-white tracking-tight">
                            We Install the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Scary Terminal Stuff</span>
                        </h1>
                        
                        <p className="text-xl text-text-secondary mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light italic">
                            You want to use AI agents, but the setup instructions look like alien code. <strong className="text-white font-medium not-italic">We do it for you in 60 minutes.</strong>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-primary-bg font-bold rounded-lg hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                            >
                                Book Setup ($99) <ArrowRight className="w-5 h-5" />
                            </button>
                            <Link href="#how-it-works" className="px-8 py-4 border border-navy-dark text-text-secondary hover:text-white hover:border-white/20 font-bold rounded-lg transition-all flex items-center justify-center font-mono text-xs uppercase tracking-widest">
                                EXPLORE_PROCESS
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
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="ml-4 text-[10px] font-mono text-white/30 flex-1 text-center uppercase tracking-widest">installation_protocol_v1.sh</div>
                            </div>
                            {/* Terminal Body */}
                            <div className="p-6 font-mono text-xs md:text-sm text-green-400 leading-relaxed h-[320px] overflow-hidden opacity-90">
                                <div className="mb-2 text-white/30">Last login: {new Date().toDateString()}</div>
                                <div className="mb-4">
                                    <span className="text-purple-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">npm install -g @google/gemini-cli</span>
                                </div>
                                <div className="mb-2 text-white/50 italic">
                                    [..................] \ fetchMetadata: sil: <span className="text-yellow-400">WARN</span> deprecated source
                                </div>
                                <div className="mb-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                                    <span className="font-bold">npm ERR!</span> code EACCES<br/>
                                    <span className="font-bold">npm ERR!</span> path /usr/local/lib/node_modules/gemini<br/>
                                </div>
                                <div className="mt-4 mb-4 text-red-500 font-bold uppercase tracking-tighter text-[10px] flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3" /> CRITICAL_ACCESS_DENIED_ERROR
                                </div>
                                <div className="mb-2 border-t border-white/10 pt-4 animate-pulse">
                                    <span className="text-purple-400">➜</span> <span className="text-blue-400">~</span> <span className="text-white">sudo chown -R $USER /usr/local/lib...</span>
                                </div>
                            </div>
                            {/* Overlaid Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white text-primary-bg px-6 py-4 rounded-xl font-bold shadow-2xl border-4 border-primary-bg transform rotate-3 flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                <span className="uppercase tracking-tighter italic">We handle the mess.</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* COMPARISON SECTION */}
        <div className="py-32 bg-primary-bg relative overflow-hidden">
            {/* Extended Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-20">
                    <div className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-4">[ DIAGNOSTIC: COMPARING_MODES ]</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight italic">Stop Fighting Your Computer</h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">There are two ways to get started with AI agents. Choose wisely.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* The Hard Way */}
                    <div className="relative group perspective-1000">
                        <div className="relative bg-[#0F172A]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-500 group-hover:border-red-500/20">
                            <div className="absolute -right-12 -top-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Activity className="w-64 h-64 text-red-500" />
                            </div>
                            
                            <div className="flex items-center gap-4 mb-10">
                                <div className="font-mono text-red-500/50 text-xs">MODE_01:</div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">The "DIY" Nightmare</h3>
                            </div>

                            <ul className="space-y-6 relative z-10 font-mono text-xs md:text-sm">
                                <li className="flex items-start gap-4 text-text-secondary line-through decoration-red-500/40">
                                    <span className="text-red-500/50">#</span>
                                    <span>Googling "npm errors" for 3 hours</span>
                                </li>
                                <li className="flex items-start gap-4 text-text-secondary line-through decoration-red-500/40">
                                    <span className="text-red-500/50">#</span>
                                    <span>Messing up your system PATH</span>
                                </li>
                                <li className="flex items-start gap-4 text-text-secondary line-through decoration-red-500/40">
                                    <span className="text-red-500/50">#</span>
                                    <span>YouTube tutorials that skip steps</span>
                                </li>
                                <li className="flex items-start gap-4 text-text-secondary line-through decoration-red-500/40">
                                    <span className="text-red-500/50">#</span>
                                    <span>Giving up and cancelling the project</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* The Smart Way */}
                    <div className="relative group perspective-1000">
                        <div className="absolute inset-0 bg-accent/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-secondary-bg border border-accent rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-accent/10">
                            <div className="absolute -right-4 -top-4 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shadow-xl transform rotate-3 z-20">SYSTEM_OPTIMIZED</div>
                            
                            <div className="flex items-center gap-4 mb-10">
                                <div className="font-mono text-accent text-xs">MODE_02:</div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">The "Done-For-You" Way</h3>
                            </div>

                            <ul className="space-y-6 relative z-10">
                                <li className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/30">
                                        <Check className="w-3 h-3 text-accent" />
                                    </div>
                                    <span className="text-lg font-medium text-white italic">One payment. One hour. Done.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/30">
                                        <Check className="w-3 h-3 text-accent" />
                                    </div>
                                    <span className="text-lg font-medium text-white italic">We fix every error live on screen</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/30">
                                        <Check className="w-3 h-3 text-accent" />
                                    </div>
                                    <span className="text-lg font-medium text-white italic">Your environment is set up for life</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-accent/30">
                                        <Check className="w-3 h-3 text-accent" />
                                    </div>
                                    <span className="text-lg font-medium text-white italic">Run ANY agent workflow instantly</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* PROCESS SECTION */}
        <div id="how-it-works" className="py-32 bg-[#0B1120] relative border-y border-white/5 overflow-hidden">
             {/* Large Floating Command Icon */}
             <Command className="absolute -right-20 top-20 w-80 h-80 text-white/[0.02] -rotate-12 pointer-events-none" />
             
             {/* Matrix-style Grid Overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-24">
                    <div className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">[ PROTOCOL: EXECUTION_STAGES ]</div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">How We'll Build It</h2>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto font-light">A 60-minute session where you watch the magic happen.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { title: "Screen Share", desc: "You share your screen. We take remote control (with permission)." },
                        { title: "We Install", desc: "Node.js, Gemini CLI, Claude Code, API keys. All the boring stuff." },
                        { title: "First Run", desc: "We run a real agent workflow together to prove it works." },
                        { title: "Handover", desc: "You get a cheat sheet and 7 days of email support." }
                    ].map((step, i) => (
                        <div key={i} className={`relative p-8 rounded-2xl border transition-all duration-700 group overflow-hidden ${activeStep === i ? 'bg-secondary-bg border-accent/40 shadow-2xl scale-105 z-10' : 'bg-[#0F172A]/30 border-white/5 opacity-60'}`}>
                            {/* Glass background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            
                            <div className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.03] select-none z-0 group-hover:text-accent/5 transition-colors font-mono">
                                {i + 1}
                            </div>
                            <div className="relative z-10">
                                <div className="text-[10px] font-mono text-accent/50 uppercase tracking-widest mb-4">Stage_0{i + 1}</div>
                                <h3 className={`text-xl font-bold mb-3 uppercase tracking-tighter ${activeStep === i ? 'text-white' : 'text-text-secondary'}`}>{step.title}</h3>
                                <p className="text-text-secondary leading-relaxed text-sm font-light">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* VALUE STACK SECTION */}
        <div className="py-32 bg-primary-bg relative border-b border-white/5">
             <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <div className="text-green-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4">[ INVENTORY: ASSETS_DEPLOYED ]</div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white italic">The "Setup Stack"</h2>
                    <p className="text-text-secondary font-light">Everything loaded into your machine by the end of the hour.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Terminal className="w-5 h-5" />, title: "Environment", desc: "Node.js, NPM, Gemini, Claude installed correctly." },
                        { icon: <Shield className="w-5 h-5" />, title: "Security", desc: "API keys stored safely in .env files, not exposed." },
                        { icon: <FileText className="w-5 h-5" />, title: "Cheat Sheet", desc: "PDF with the 5 commands you'll actually need." },
                        { icon: <Gift className="w-5 h-5" />, title: "3 Starter Kits", desc: "Ready-to-run agents for Sales & Marketing." },
                        { icon: <MessageCircle className="w-5 h-5" />, title: "Support", desc: "If it breaks next week, we fix it for free." },
                        { icon: <Video className="w-5 h-5" />, title: "Recording", desc: "Re-watch the setup anytime you want." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-6 p-8 bg-secondary-bg/20 border border-white/5 rounded-3xl hover:border-white/10 hover:bg-secondary-bg/40 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-navy-dark border border-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-white mb-2 text-lg uppercase tracking-tight">{item.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed font-light">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* PRICING SECTION */}
        <div id="pricing" className="py-40 relative overflow-hidden bg-[#0B1120]">
             {/* Pulsing glow background */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
             
             <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="bg-secondary-bg border border-white/10 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl group backdrop-blur-xl">
                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none opacity-50"></div>
                    
                    <div className="inline-block bg-accent/10 border border-accent/20 text-accent text-[10px] font-mono font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] mb-10 shadow-lg">
                        availability: [ LIMITED_3_SLOTS_REMAINING ]
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white tracking-tighter">Done-For-You Setup</h2>
                    
                    <div className="flex items-center justify-center gap-4 mb-12">
                       <span className="text-6xl md:text-9xl font-black text-white tracking-tighter tabular-nums">$99</span>
                       <div className="text-left">
                          <div className="text-accent font-mono text-xs font-bold">[ ONE_TIME_FEE ]</div>
                          <div className="text-text-secondary text-sm font-light">No recurring costs</div>
                       </div>
                    </div>
                    
                    <div className="mb-12">
                      <label className="flex items-center justify-center gap-4 cursor-pointer group/check select-none bg-primary-bg/40 p-5 rounded-2xl border border-white/5 hover:border-accent/20 transition-all max-w-md mx-auto group">
                        <div 
                          className={`w-6 h-6 border rounded-lg flex items-center justify-center transition-all ${accepted ? 'bg-accent border-accent scale-110 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'border-white/20 group-hover:border-accent'}`}
                          onClick={() => setAccepted(!accepted)}
                        >
                          {accepted && <Check className="text-white w-4 h-4" />}
                        </div>
                        <span className="text-sm font-mono text-text-secondary group-hover:text-white transition-colors uppercase tracking-widest text-xs">AWAITING_USER_APPROVAL</span>
                      </label>
                    </div>

                    <a 
                      href={accepted ? "https://checkout.dodopayments.com/buy/pdt_0NXg6rDNkM3SOXOy9QriP?quantity=1" : "#"}
                      className={`inline-flex items-center justify-center gap-3 w-full md:w-auto px-16 py-6 rounded-2xl font-bold text-xl transition-all ${accepted ? 'bg-white text-primary-bg hover:bg-gray-100 transform hover:-translate-y-1 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'bg-navy-dark text-text-secondary/30 cursor-not-allowed border border-white/5'}`}
                      onClick={(e) => !accepted && e.preventDefault()}
                    >
                      <Zap className={`w-6 h-6 ${accepted ? 'text-accent animate-pulse' : 'text-text-secondary/30'}`} />
                      INITIATE SETUP CALL
                    </a>
                    
                    <p className="text-[10px] font-mono text-text-secondary/40 mt-10 uppercase tracking-[0.2em]">
                      // 100% refund_protocol if agent_execution fails
                    </p>
                </div>
            </div>
        </div>

        {/* MEET AKHIL SECTION */}
        <div className="py-32 border-t border-white/5 bg-primary-bg relative overflow-hidden">
           <div className="container mx-auto px-4 max-w-4xl relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center bg-[#0F172A]/40 backdrop-blur-md border border-white/5 p-10 md:p-12 rounded-[40px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Terminal className="w-32 h-32" />
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-r from-accent to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/10 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                        <Image src="/images/akhil.jpg" alt="Akhil MK" fill className="object-cover" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left relative z-10">
                    <div className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-4">[ OPERATOR: AKHIL_MK ]</div>
                    <p className="text-white text-lg leading-relaxed font-medium italic">
                      "I run this site and I've been setting up terminal AI agents for myself and friends for years. I'm not a corporate engineer—I'm a builder who loves breaking things and fixing them. If I can't get your setup running perfectly, I'll refund your money before we even end the call."
                    </p>
                    <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                      <a href="https://akhilhaving.fun" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent hover:underline uppercase tracking-widest border border-accent/20 px-4 py-2 rounded-full bg-accent/5">
                        [ VISIT_LOG: akhilhaving.fun ]
                      </a>
                      <a href="mailto:akhil@realaiexamples.com" className="text-xs font-mono text-text-secondary hover:text-white transition-colors uppercase tracking-widest">
                        Email: akhil@realaiexamples.com
                      </a>
                    </div>
                  </div>
              </div>
           </div>
        </div>

      </main>
      
      <footer className="border-t border-white/5 py-12 text-center text-text-secondary text-[10px] bg-[#0B1120] font-mono uppercase tracking-[0.3em] opacity-40">
        <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} REAL_AI_EXAMPLES_DPT. ALL_RIGHTS_RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}