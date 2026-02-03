import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Terminal, Copy, Check, Info, AlertTriangle, ArrowLeft } from 'lucide-react'
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
      command: "$env:PATH += ";C:\Program Files\nodejs;$env:APPDATA\npm"",
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
        <Link href="/setup" className="flex items-center text-gray-500 hover:text-black mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO HUB
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

        <div className="bg-black text-white p-10 text-center">
            <h3 className="font-header text-4xl mb-4 uppercase">Something went wrong?</h3>
            <p className="font-body mb-8 opacity-80">Terminal errors can be cryptic. If you're stuck, we can jump on a remote call and fix it in 15 minutes.</p>
            <Link href="/agent-setup-service" className="inline-block bg-orange-500 text-white px-8 py-4 font-header text-2xl tracking-widest hover:bg-orange-600 transition-colors">
                GET REMOTE HELP ($99)
            </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
