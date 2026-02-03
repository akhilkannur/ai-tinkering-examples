import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Terminal, Copy, Check, Info, Shield, ArrowLeft, MousePointer2, Hammer, Code2, BookOpen } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ClaudeSetup() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps = [
    {
      title: "1. Install Node.js",
      description: "Claude Code requires Node.js to function. If you haven't done this for Gemini yet, run this now.",
      command: "winget install OpenJS.NodeJS",
      note: "Restart your terminal after this if it's your first time."
    },
    {
      title: "2. Install Claude Code",
      description: "We use the npm manager to download Anthropic's agentic coding tool.",
      command: "npm install -g @anthropic-ai/claude-code",
      note: "This may take a minute as it installs several helper tools."
    },
    {
      title: "3. Authenticate",
      description: "Claude needs permission to talk to Anthropic's servers. This command starts the login flow.",
      command: "claude auth login",
      note: "A browser will open. Sign in with your Anthropic (Claude.ai) account."
    }
  ];

  return (
    <div className="min-h-screen font-mono bg-[#fdfaf6] text-[#1a1a1a]">
      <Head>
        <title>Setup Claude Code | Terminal 101 Guide</title>
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 px-4 container mx-auto max-w-3xl">
        <Link href="/agent-setup-service" className="flex items-center text-gray-500 hover:text-black mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO SERVICE PAGE
        </Link>

        <h1 className="text-5xl md:text-6xl font-header uppercase mb-4">
          Claude Code <span className="text-purple-600">Setup</span>
        </h1>
        <p className="font-body text-xl text-gray-600 mb-12">
          Anthropic's agentic coding powerhouse, directly in your terminal.
        </p>

        <div className="space-y-12 mb-20">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <h3 className="font-header text-3xl mb-4 uppercase">{step.title}</h3>
              <p className="font-body text-gray-700 mb-6">{step.description}</p>
              
              <div className="relative group">
                <div className="bg-black text-white p-4 font-mono text-sm overflow-x-auto border-l-8 border-purple-500">
                  <code>{step.command}</code>
                </div>
                <button 
                  onClick={() => copyToClipboard(step.command, `step-${idx}`)}
                  className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded hover:bg-gray-700"
                >
                  {copied === `step-${idx}` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              
              {step.note && (
                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 italic">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>{step.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-purple-50 border-4 border-purple-500 p-8 mb-20 font-body">
          <h2 className="font-header text-3xl mb-4 uppercase flex items-center gap-2">
            <Shield className="w-6 h-6 text-purple-600" /> Safety Check
          </h2>
          <p className="mb-4">Claude Code is <strong>agentic</strong>, meaning it can run commands for you. By default, it will ask for your permission before executing "dangerous" commands.</p>
          <div className="p-4 bg-white border border-purple-200">
            <strong>Pro Tip:</strong> Always run <code>claude</code> inside the project folder you want to edit. This keeps the AI focused on the right files.
          </div>
        </div>

        <div className="bg-white border-4 border-black p-8 mb-20">
          <h2 className="font-header text-4xl mb-8 uppercase tracking-tight">Now what? <span className="text-purple-600">3 Ideas to Start</span></h2>
          <div className="space-y-8 font-body">
            <div className="flex gap-4">
              <Hammer className="w-8 h-8 text-purple-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold uppercase">1. Plan a Project</h4>
                <p className="text-sm opacity-80">Open an empty folder and type: <code>claude "I want to build a simple landing page for my sales consulting business. Help me architect the files."</code></p>
              </div>
            </div>
            <div className="flex gap-4">
              <MousePointer2 className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold uppercase">2. Assign a Task</h4>
                <p className="text-sm opacity-80">Give it a goal and type: <code>claude "Read all the files in this folder and find any broken links or missing images."</code></p>
              </div>
            </div>
            <div className="flex gap-4">
              <Code2 className="w-8 h-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold uppercase">3. Fix and Refactor</h4>
                <p className="text-sm opacity-80">Point it at a script and type: <code>claude "Refactor this Python script to be 2x faster and add error handling."</code></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-10 text-center mb-12">
            <h3 className="font-header text-4xl mb-4 uppercase text-white">Need a Blueprint?</h3>
            <p className="font-body mb-8 opacity-80">Don't guess the prompts. Use our library of 700+ verified workflows for Sales and Marketing.</p>
            <Link href="/#blueprints" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 font-header text-2xl tracking-widest hover:bg-purple-700 transition-colors">
                <BookOpen className="w-6 h-6" /> BROWSE ALL BLUEPRINTS
            </Link>
        </div>

        <div className="bg-gray-100 p-8 text-center border-2 border-black border-dashed">
            <h3 className="font-header text-4xl mb-4 uppercase">Configuration Headache?</h3>
            <p className="font-body mb-8 opacity-80 text-sm">If npm isn't cooperating or you're seeing "EACCES" errors, don't waste your afternoon. Let a professional handle the setup.</p>
            <Link href="/agent-setup-service" className="inline-block bg-black text-white px-8 py-4 font-header text-2xl tracking-widest hover:bg-gray-800 transition-colors">
                GET REMOTE HELP ($99)
            </Link>
        </div>
      </main>
    </div>
  )
}
