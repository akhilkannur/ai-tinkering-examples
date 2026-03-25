import Head from 'next/head'
import Navbar from '../components/Navbar'
import AiQuiz from '../components/AiQuiz'
import { Terminal, Activity } from 'lucide-react'

export default function AiWorkplaceQuizPage() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>AI in the Workplace Quiz | Test Your Knowledge | AI Examples</title>
        <meta name="description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz. See how you score and challenge your colleagues!" key="description" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center mb-24 relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
            
            <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-2 font-black text-xs uppercase mb-8 transform rotate-1 brutalist-shadow-sm">
                <Activity className="w-4 h-4 stroke-[3px]" /> AI Readiness Check
            </div>
            <h1 className="text-5xl md:text-8xl font-display mb-8 uppercase leading-[0.9] text-black glitch-text" data-text="FIND YOUR AI PERSONALITY">
              Find your AI <br/>Personality
            </h1>
            <p className="text-xl md:text-2xl text-black font-black max-w-2xl mx-auto leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm text-left">
              A quick system check to see if you know your LLMs from your MCPs, or if you're just reading LinkedIn headlines.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-[#ff00ff]/10 opacity-10 blur-3xl group-hover:opacity-20 transition-all"></div>
            <AiQuiz />
          </div>
        </div>
      </main>
    </div>
  )
}
