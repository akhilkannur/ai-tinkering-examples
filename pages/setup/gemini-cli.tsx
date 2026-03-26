import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Terminal, Copy, Check, Info, AlertTriangle, ArrowLeft, Layers, Search, Zap, BookOpen, ChevronRight, Monitor, Cpu, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GeminiSetup() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps = [
    {
      title: "Install Node.js Runtime",
      subtitle: "The Foundation",
      description: "Node.js is the engine that executes the Gemini agent. We use Windows Package Manager (winget) for a clean, path-safe installation.",
      command: "winget install OpenJS.NodeJS",
      note: "Standard LTS version is recommended for maximum stability.",
      icon: <Cpu className="w-5 h-5" />,
      why: "Without Node, your computer doesn't know how to speak 'JavaScript', which Gemini is built on."
    },
    {
      title: "Configure Environment PATH",
      subtitle: "System Recognition",
      description: "This command registers Node and NPM in your system's memory so you can run them from any folder without errors.",
      command: '$env:PATH += ";C:\\Program Files\\nodejs;$env:APPDATA\\npm"',
      note: "Essential if you see 'command not found' errors in the next step.",
      icon: <Layers className="w-5 h-5" />,
      why: "Think of this as giving your computer a map to where the new tools are stored."
    },
    {
      title: "Deploy Gemini CLI",
      subtitle: "The Agent Installation",
      description: "This fetches the latest verified version of the Gemini tool from Google's official cloud repository.",
      command: "npm install -g @google/gemini-cli",
      note: "The '-g' flag installs it globally for your user profile.",
      icon: <Terminal className="w-5 h-5" />,
      why: "This is the actual 'brain' you'll be interacting with in your terminal."
    }
  ];

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent selection:text-white">
      <Head>
        <title>Setup Gemini CLI | Work-Ready Terminal Guide</title>
        <meta name="description" content="Professional guide to installing and configuring Google's Gemini CLI for marketing and sales automation." />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-text-color mb-4 tracking-tight">
                        Gemini CLI <span className="text-accent">Deployment</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                        A professional-grade guide to installing Google's powerful terminal agent for high-scale workflows.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-3 bg-secondary-bg border border-navy-dark p-3 rounded-xl">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-secondary-bg flex items-center justify-center text-[10px] font-bold ${activeStep >= i-1 ? 'bg-accent text-white' : 'bg-navy-light text-text-secondary'}`}>
                                {i}
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Installation Progress</span>
                </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Steps Column */}
            <div className="lg:col-span-8 space-y-8">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`group relative bg-secondary-bg border transition-all duration-300 rounded-2xl overflow-hidden ${activeStep === idx ? 'border-accent ring-1 ring-accent/20' : 'border-navy-dark hover:border-navy-light'}`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeStep === idx ? 'bg-accent text-white' : 'bg-navy-dark text-text-secondary group-hover:text-text-color'}`}>
                                {step.icon}
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{step.subtitle}</span>
                                <h3 className="text-2xl font-bold text-text-color">{step.title}</h3>
                            </div>
                        </div>
                        <span className="text-4xl font-black text-navy-dark/50 select-none">0{idx + 1}</span>
                    </div>

                    <p className="text-text-secondary mb-8 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Terminal Command */}
                    <div className="relative mb-6">
                        <div className="absolute -top-3 left-4 px-2 py-0.5 bg-secondary-bg border border-navy-dark rounded text-[10px] font-mono text-text-secondary z-10">
                            POWERSHELL / TERMINAL
                        </div>
                        <div className="bg-[#0D1117] rounded-xl border border-white/5 pt-8 pb-6 px-6 font-mono text-sm relative overflow-hidden group/term">
                            <div className="absolute top-3 left-4 flex gap-1.5 opacity-30">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-accent font-bold select-none">$</span>
                                <code className="text-blue-300 break-all">{step.command}</code>
                            </div>
                            
                            <button 
                                onClick={() => copyToClipboard(step.command, `step-${idx}`)}
                                className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-all border border-white/5"
                                title="Copy to clipboard"
                            >
                                {copied === `step-${idx}` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    
                    {step.note && (
                        <div className="flex items-center gap-3 p-4 bg-navy-dark/30 rounded-xl border border-navy-dark text-sm text-text-secondary italic">
                            <Info className="w-4 h-4 text-accent flex-shrink-0" />
                            <span>{step.note}</span>
                        </div>
                    )}
                  </div>
                  
                  {/* Decorative indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-500 ${activeStep === idx ? 'w-full' : 'w-0'}`}></div>
                </div>
              ))}
            </div>

            {/* Sidebar / Context Column */}
            <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-32 space-y-6">
                    {/* Handshake Info */}
                    <div className="bg-gradient-to-br from-secondary-bg to-navy-dark border border-navy-dark p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-accent" /> Authentication flow
                        </h2>
                        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                            After installation, type <code className="text-accent">gemini</code> to initiate the first-run handshake.
                        </p>
                        
                        <div className="space-y-3">
                            <div className="flex gap-3 p-3 bg-primary-bg/50 border border-navy-dark rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</div>
                                <div className="text-xs">
                                    <span className="font-bold text-text-color block mb-1 uppercase tracking-wider">UI Theme</span>
                                    <span className="text-text-secondary">Select <strong className="text-text-color">Dark</strong> for best readability in standard terminals.</span>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 bg-primary-bg/50 border border-navy-dark rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</div>
                                <div className="text-xs">
                                    <span className="font-bold text-text-color block mb-1 uppercase tracking-wider">Cloud Auth</span>
                                    <span className="text-text-secondary">Choose <strong className="text-text-color">Login with Google</strong>. Authenticate via your secure browser.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-5 h-5 text-accent fill-accent/20" />
                            <h4 className="font-bold text-accent uppercase tracking-widest text-xs">Industry Insight</h4>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed italic">
                            "The CLI is 4x faster than the web interface for batch processing. Once you're setup, you'll never go back to the chat box for data work."
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Professional <span className="text-accent">Workflows</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[ 
                    {
                        title: "Folder Analysis",
                        desc: "Analyze 50+ PDFs or CSVs at once. Summarize entire directories into single structured reports.",
                        icon: <Layers className="text-orange-500" />,
                        cmd: 'gemini "Summarize every file here into a report."'
                    },
                    {
                        title: "Market Intel",
                        desc: "Automated competitor research. Scrape and analyze homepage value props instantly.",
                        icon: <Search className="text-blue-500" />,
                        cmd: 'gemini "Analyze https://competitor.com for GTM gaps."'
                    },
                    {
                        title: "Lead Hygiene",
                        desc: "Standardize job titles and scrub fake emails from massive lead lists in seconds.",
                        icon: <Zap className="text-purple-500" />,
                        cmd: 'gemini "Clean leads.csv and mark fake emails."'
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-secondary-bg border border-navy-dark p-8 rounded-2xl hover:border-accent/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-navy-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                        <p className="text-text-secondary text-sm mb-6 leading-relaxed">{item.desc}</p>
                        <div className="bg-primary-bg border border-navy-dark p-3 rounded-lg font-mono text-[11px] text-accent/80 overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.cmd}
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* First Assignment */}
          <div className="mt-24 relative overflow-hidden bg-gradient-to-r from-secondary-bg to-navy-dark border border-accent/20 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-accent text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded mb-4">Onboarding Task</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">The "Ghost" Strategy <span className="text-accent">Test</span></h2>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                        Ready to see the power? Try this right now to find the one objection your customers have that you're missing.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1">1</div>
                            <p className="text-sm text-text-color">Create a folder called <code className="text-accent">marketing-test</code>.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1">2</div>
                            <p className="text-sm text-text-color">Drop in 3 transcripts of your recent sales calls.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1">3</div>
                            <p className="text-sm text-text-color italic opacity-80">Run the command below.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                        <Monitor className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Active Command</span>
                    </div>
                    <code className="block text-sm text-blue-300 leading-relaxed font-mono">
                        gemini "Read these 3 calls. What is the one objection every customer has that we aren't answering on our website?"
                    </code>
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={() => copyToClipboard('gemini "Read these 3 calls. What is the one objection every customer has that we aren\'t answering on our website?"', 'assignment')}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all border border-white/5"
                        >
                            {copied === 'assignment' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            {copied === 'assignment' ? 'COPIED' : 'COPY COMMAND'}
                        </button>
                    </div>
                </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <div className="bg-modern-gradient p-1 rounded-2xl inline-block mb-8">
                <div className="bg-primary-bg px-10 py-12 rounded-[calc(1rem-1px)]">
                    <h3 className="text-3xl font-bold mb-4">Accelerate Your Setup</h3>
                    <p className="text-text-secondary mb-10 max-w-lg mx-auto">
                        Don't guess the prompts. Use our library of 500+ workflows for Sales and Marketing.
                    </p>
                    <Link href="/ai-examples" className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-accent/20">
                        <BookOpen className="w-5 h-5" /> BROWSE ALL BLUEPRINTS
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-navy-dark py-12 text-center text-text-secondary text-sm">
        <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Real AI Examples. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}