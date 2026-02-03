import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Terminal, Command, Cpu, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Setup101() {
  const title = "AI Agent Setup 101 | Real AI Examples";
  const description = "Learn the basics of terminal-based AI tools. How to install and configure Gemini CLI and Claude Code.";

  return (
    <div className="min-h-screen font-mono bg-[#fdfaf6] text-[#1a1a1a]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Navbar />

      <main className="pt-32 pb-20 px-4 container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-header uppercase tracking-tighter mb-4">
            Agent Setup <span className="text-orange-600">101</span>
          </h1>
          <p className="font-body text-xl text-gray-600">
            A beginner-friendly guide to getting agentic tools into your terminal.
          </p>
        </div>

        <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] mb-16">
          <h2 className="font-header text-3xl mb-6 uppercase border-b-2 border-black pb-2">The Framework</h2>
          <div className="prose prose-lg font-body max-w-none">
            <p>
              Most people think AI is a website (ChatGPT). But real power lives in the <strong>Terminal</strong>. 
              Terminal tools allow AI to read your files, write code, and run commands on your computer.
            </p>
            <p>
              To get there, you need three things on your machine:
            </p>
            <ul className="list-none space-y-4 pl-0">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center flex-shrink-0 mt-1">1</div>
                <div>
                  <strong>The Engine (Node.js):</strong> This is the environment that lets these tools run.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center flex-shrink-0 mt-1">2</div>
                <div>
                  <strong>The Tool (CLI):</strong> The actual software (Gemini CLI or Claude Code).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center flex-shrink-0 mt-1">3</div>
                <div>
                  <strong>The Brain (API Key/Login):</strong> Your permission to use the AI models.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/setup/gemini-cli" className="bg-white border-2 border-black p-8 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all group">
            <h3 className="font-header text-4xl mb-4 group-hover:text-orange-600 transition-colors uppercase">Gemini CLI</h3>
            <p className="font-body text-gray-600 mb-6">Best for large codebases and huge context windows (2M tokens).</p>
            <div className="flex items-center text-black font-bold">
              START SETUP <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>

          <Link href="/setup/claude-code" className="bg-white border-2 border-black p-8 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_rgba(230,126,34,1)] transition-all group">
            <h3 className="font-header text-4xl mb-4 group-hover:text-purple-600 transition-colors uppercase">Claude Code</h3>
            <p className="font-body text-gray-600 mb-6">Best for reasoning, coding, and direct agentic execution.</p>
            <div className="flex items-center text-black font-bold">
              START SETUP <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>

        <div className="mt-20 p-8 border-4 border-black border-dashed text-center">
            <h3 className="font-header text-3xl mb-4 uppercase">Stuck in the terminal?</h3>
            <p className="font-body mb-6">If commands aren't working or your PATH is broken, we can do it for you.</p>
            <Link href="/agent-setup-service" className="inline-block bg-black text-white px-8 py-3 font-header text-2xl tracking-widest hover:bg-gray-800 transition-colors">
                BOOK REMOTE SETUP ($99)
            </Link>
        </div>

      </main>

      <Footer />
    </div>
  )
}
