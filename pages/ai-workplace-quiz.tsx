import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AiQuiz from '../components/AiQuiz'
import { Terminal, Activity } from 'lucide-react'

export default function AiWorkplaceQuizPage() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>AI in the Workplace Quiz | Test Your Knowledge | AI Examples</title>
        <meta name="description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz. See how you score and challenge your colleagues!" key="description" />
      </Head>

      <Navbar />

      <main className="pt-40 pb-24 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-8 font-mono">
                <Activity className="w-3.5 h-3.5" /> AI Readiness Quiz
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic text-white">Find your AI <br/>Personality</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              A quick system check to see if you know your LLMs from your MCPs, or if you're just reading LinkedIn headlines.
            </p>
          </div>

          <div className="bg-secondary-bg/40 backdrop-blur-xl border border-white/5 p-1 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-primary-bg p-8 md:p-12 rounded-[calc(1.5rem-4px)]">
                <AiQuiz />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}