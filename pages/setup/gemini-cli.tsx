import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { Terminal, Copy, Check, Info, AlertTriangle, ArrowLeft, Layers, Search, Zap, BookOpen } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function GeminiSetup() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps = [
    {
      title: "1. Install Node.js",
      description: "Node.js is the 'engine' that runs the Gemini tool. We use 'winget' to install it directly from your terminal.",
      command: "winget install OpenJS.NodeJS",
      note: "If it asks for permission, type 'y' and hit Enter."
    },
    {
      title: "2. Update the PATH",
      description: "This tells Windows exactly where your new tools are hidden so you can use them by name.",
      command: '$env:PATH += ";C:\\Program Files\\nodejs;$env:APPDATA\\npm"',
      note: "This fix is critical if the next step says 'npm not found'."
    },
    {
      title: "3. Install Gemini CLI",
      description: "Now we install the actual software from Google's official library.",
      command: "npm install -g @google/gemini-cli",
      note: "The '-g' means Global, so it works in any folder."
    }
  ];

  return (
    <div className="min-h-screen font-mono bg-[#fdfaf6] text-[#1a1a1a]">
      <Head>
        <title>Setup Gemini CLI | Terminal 101 Guide</title>
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 px-4 container mx-auto max-w-3xl">
        <Link href="/agent-setup-service" className="flex items-center text-gray-500 hover:text-black mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO SERVICE PAGE
        </Link>

        <h1 className="text-5xl md:text-6xl font-header uppercase mb-4">
          Gemini CLI <span className="text-orange-600">Setup</span>
        </h1>
        <p className="font-body text-xl text-gray-600 mb-12">
          The non-technical guide to installing Google's powerful terminal agent.
        </p>

        <div className="space-y-12 mb-20">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <h3 className="font-header text-3xl mb-4 uppercase">{step.title}</h3>
              <p className="font-body text-gray-700 mb-6">{step.description}</p>
              
              <div className="relative group">
                <div className="bg-black text-white p-4 font-mono text-sm overflow-x-auto border-l-8 border-orange-500">
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

        <div className="bg-orange-50 border-4 border-orange-500 p-8 mb-20">
          <h2 className="font-header text-3xl mb-4 uppercase flex items-center gap-2">
            <Terminal className="w-6 h-6" /> First Run Handshake
          </h2>
          <p className="font-body mb-6">Type <code>gemini</code> in your terminal. You will be asked:</p>
          
          <div className="space-y-4 font-body">
            <div className="flex gap-4 p-4 bg-white border border-orange-200">
              <div className="font-bold">1. Theme</div>
              <div>Choose <strong>Dark</strong> (standard for terminals).</div>
            </div>
            <div className="flex gap-4 p-4 bg-white border border-orange-200">
              <div className="font-bold">2. Login</div>
              <div>Choose <strong>Login with Google</strong> for the simplest setup. Your browser will open to confirm.</div>
            </div>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-8 mb-20">
          <h2 className="font-header text-4xl mb-8 uppercase tracking-tight">Now what? <span className="text-orange-600">3 Ideas to Start</span></h2>
          <div className="space-y-8 font-body">
            <div className="flex gap-4">
              <Layers className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold uppercase">1. Analyze a Folder</h4>
                <p className="text-sm opacity-80">Navigate to a folder with 50 PDFs or CSVs and type: <code>gemini "Summarize every file in this folder into a single report."</code></p>
              </div>
            </div>
            <div className="flex gap-4">
              <Search className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold uppercase">2. Research Competitors</h4>
                <p className="text-sm opacity-80">Give it a website and type: <code>gemini "Visit https://competitor.com and find their 3 biggest weaknesses according to their homepage."</code></p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-8 h-8 text-purple-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold uppercase">3. Clean a Lead List</h4>
                <p className="text-sm opacity-80">Give it your `leads.csv` and type: <code>gemini "Standardize the Job Titles in this CSV and mark any emails that look fake."</code></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2C3E50] text-white p-8 mb-20 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <h2 className="font-header text-3xl mb-4 uppercase text-orange-500">The First Assignment</h2>
          <p className="font-body mb-6 opacity-90">Ready to see the power? Try this right now:</p>
          <div className="space-y-4 font-body text-sm">
            <div className="p-4 bg-black/30 border border-white/10 rounded">
              <p className="font-bold mb-2">Goal: Find the "Ghost" Strategy</p>
              <p className="opacity-70 mb-4">1. Create a folder called <code>marketing-test</code>.</p>
              <p className="opacity-70 mb-4">2. Drop in 3 transcripts of your recent sales calls.</p>
              <p className="opacity-70">3. Run: <code>gemini "Read these 3 calls. What is the one objection every customer has that we aren't answering on our website?"</code></p>
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-10 text-center mb-12">
            <h3 className="font-header text-4xl mb-4 uppercase text-white">Need a Blueprint?</h3>
            <p className="font-body mb-8 opacity-80">Don't guess the prompts. Use our library of 700+ verified workflows for Sales and Marketing.</p>
            <Link href="/#blueprints" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 font-header text-2xl tracking-widest hover:bg-orange-600 transition-colors">
                <BookOpen className="w-6 h-6" /> BROWSE ALL BLUEPRINTS
            </Link>
        </div>

        <div className="bg-gray-100 p-8 text-center border-2 border-black border-dashed">
            <h3 className="font-header text-3xl mb-4 uppercase">Something went wrong?</h3>
            <p className="font-body mb-6 opacity-80 text-sm">Terminal errors can be cryptic. If you're stuck, we can jump on a remote call and fix it in 15 minutes.</p>
            <Link href="/agent-setup-service" className="inline-block bg-black text-white px-6 py-3 font-header text-xl tracking-widest hover:bg-gray-800 transition-colors">
                GET REMOTE HELP ($99)
            </Link>
        </div>
      </main>
    </div>
  )
}
