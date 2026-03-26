import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Terminal, Copy, Check, Info, Shield, ArrowLeft, MousePointer2, Hammer, Code2, BookOpen, Cpu, Layers, Monitor, Zap } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ClaudeSetup() {
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
      description: "Claude Code requires Node.js to function. If you haven't done this for Gemini yet, this is your first step.",
      command: "winget install OpenJS.NodeJS",
      note: "Standard LTS version is recommended. Restart terminal after install.",
      icon: <Cpu className="w-5 h-5" />,
      why: "Node.js is the environment that allows Claude's local agent to interact with your file system."
    },
    {
      title: "Deploy Claude Code",
      subtitle: "Agentic Installation",
      description: "We use the npm manager to download Anthropic's official agentic coding tool directly to your machine.",
      command: "npm install -g @anthropic-ai/claude-code",
      note: "This may take a minute as it installs several high-performance helper tools.",
      icon: <Terminal className="w-5 h-5" />,
      why: "This installs the 'claude' command which acts as your local AI software engineer."
    },
    {
      title: "Secure Authentication",
      subtitle: "Handshake & Access",
      description: "Claude needs permission to talk to Anthropic's servers. This command starts the secure login flow.",
      command: "claude auth login",
      note: "A browser will open. Sign in with your Anthropic (Claude.ai) account.",
      icon: <Shield className="w-5 h-5" />,
      why: "Authentication ensures your agent can access the latest models while keeping your data private."
    }
  ];

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-bright-pink selection:text-white">
      <Head>
        <title>Setup Claude Code | Work-Ready Terminal Guide</title>
        <meta name="description" content="Professional guide to installing and configuring Anthropic's Claude Code for agentic software engineering." />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-text-color mb-4 tracking-tight">
                        Claude Code <span className="text-bright-pink">Deployment</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
                        Anthropic's agentic coding powerhouse, optimized for your local development environment.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-3 bg-secondary-bg border border-navy-dark p-3 rounded-xl">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-secondary-bg flex items-center justify-center text-[10px] font-bold ${activeStep >= i-1 ? 'bg-bright-pink text-white' : 'bg-navy-light text-text-secondary'}`}>
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
                  className={`group relative bg-secondary-bg border transition-all duration-300 rounded-2xl overflow-hidden ${activeStep === idx ? 'border-bright-pink ring-1 ring-bright-pink/20' : 'border-navy-dark hover:border-navy-light'}`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeStep === idx ? 'bg-bright-pink text-white' : 'bg-navy-dark text-text-secondary group-hover:text-text-color'}`}>
                                {step.icon}
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-bright-pink uppercase tracking-[0.2em]">{step.subtitle}</span>
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
                                <span className="text-bright-pink font-bold select-none">$</span>
                                <code className="text-purple-300 break-all">{step.command}</code>
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
                            <Info className="w-4 h-4 text-bright-pink flex-shrink-0" />
                            <span>{step.note}</span>
                        </div>
                    )}
                  </div>
                  
                  {/* Decorative indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-bright-pink transition-all duration-500 ${activeStep === idx ? 'w-full' : 'w-0'}`}></div>
                </div>
              ))}
            </div>

            {/* Sidebar / Context Column */}
            <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-32 space-y-6">
                    {/* Safety Check Info */}
                    <div className="bg-gradient-to-br from-secondary-bg to-navy-dark border border-navy-dark p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-bright-pink" /> Security Protocol
                        </h2>
                        <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                            Claude Code is <strong>agentic</strong>, meaning it can run commands for you.
                        </p>
                        
                        <div className="space-y-3">
                            <div className="flex gap-3 p-3 bg-primary-bg/50 border border-navy-dark rounded-lg">
                                <div className="text-xs">
                                    <span className="font-bold text-text-color block mb-1 uppercase tracking-wider">Permission Mode</span>
                                    <span className="text-text-secondary">By default, it will ask for your approval before executing "dangerous" commands.</span>
                                </div>
                            </div>
                            <div className="flex gap-3 p-3 bg-primary-bg/50 border border-navy-dark rounded-lg text-xs italic text-text-secondary">
                                <strong>Pro Tip:</strong> Always run <code className="text-bright-pink">claude</code> inside the specific project folder you want to edit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-12 text-center">Engineering <span className="text-bright-pink">Workflows</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Project Architecting",
                        desc: "Open an empty folder and have Claude build the entire file structure for a new landing page or API.",
                        icon: <Hammer className="text-bright-pink" />,
                        cmd: 'claude "Help me architect a Tailwind landing page."'
                    },
                    {
                        title: "Audit & Fix",
                        desc: "Have the agent read your entire codebase to find broken links, missing images, or security vulnerabilities.",
                        icon: <MousePointer2 className="text-blue-500" />,
                        cmd: 'claude "Find all broken links in this folder."'
                    },
                    {
                        title: "Logic Refactoring",
                        desc: "Point it at a complex script and ask it to refactor for speed, readability, or better error handling.",
                        icon: <Code2 className="text-emerald-500" />,
                        cmd: 'claude "Refactor this script to be 2x faster."'
                    }
                ].map((item, i) => (
                    <div key={i} className="bg-secondary-bg border border-navy-dark p-8 rounded-2xl hover:border-bright-pink/30 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-navy-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                        <p className="text-text-secondary text-sm mb-6 leading-relaxed">{item.desc}</p>
                        <div className="bg-primary-bg border border-navy-dark p-3 rounded-lg font-mono text-[11px] text-bright-pink/80 overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.cmd}
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* First Assignment */}
          <div className="mt-24 relative overflow-hidden bg-gradient-to-r from-secondary-bg to-navy-dark border border-bright-pink/20 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-bright-pink/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-bright-pink text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded mb-4">Engineering Task</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 italic">Launch a <span className="text-bright-pink">Landing Page</span></h2>
                    <p className="text-text-secondary mb-8 leading-relaxed">
                        Ready to see the agent in action? Try this to build a functional site in under 30 seconds.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-bright-pink flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1">1</div>
                            <p className="text-sm text-text-color">Create a folder called <code className="text-bright-pink">my-new-site</code>.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-bright-pink flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1">2</div>
                            <p className="text-sm text-text-color">Open terminal in that folder.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-bright-pink flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1">3</div>
                            <p className="text-sm text-text-color italic opacity-80">Run the command below.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                        <Monitor className="w-4 h-4 text-bright-pink" />
                        <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Active Command</span>
                    </div>
                    <code className="block text-sm text-purple-300 leading-relaxed font-mono">
                        claude "Build a one-page portfolio site for me using Tailwind CSS. Include a hero section and a contact form. Save it as index.html"
                    </code>
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={() => copyToClipboard('claude "Build a one-page portfolio site for me using Tailwind CSS. Include a hero section and a contact form. Save it as index.html"', 'assignment')}
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
                    <h3 className="text-3xl font-bold mb-4">Master Agentic Coding</h3>
                    <p className="text-text-secondary mb-10 max-w-lg mx-auto">
                        Don't guess the prompts. Use our library of 500+ verified workflows for Sales and Marketing.
                    </p>
                    <Link href="/ai-examples" className="inline-flex items-center gap-3 bg-bright-pink hover:bg-bright-pink/80 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-bright-pink/20">
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