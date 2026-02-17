import Head from 'next/head';
import Navbar from '../components/Navbar';
import ArchetypeQuiz from '../components/ArchetypeQuiz';
import { Activity } from 'lucide-react';

export default function AIWorkplacePersonalityPage() {
  const pageTitle = "AI Workplace Personality Quiz | Real AI Examples";
  const pageDescription = discoveryYourAIWorkingStyle();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';

  function discoveryYourAIWorkingStyle() {
    return "Discover your AI working style. Are you a Speedster, Wordsmith, Analyst, or Builder? Take the 30-second quiz to find your perfect AI workflow.";
  }

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={`${baseUrl}/ai-workplace-personality`} />
      </Head>

      <Navbar />

      <main className="pt-40 pb-24 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.4em] mb-8 font-mono">
                <Activity className="w-3.5 h-3.5" /> Your AI Personality
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic text-white leading-none">
              What's Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">AI Personality?</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              Find out if you're a Speedster, Wordsmith, Analyst, or Builder, and get a curated list of mission files tailored to your style.
            </p>
          </div>

          <div className="bg-secondary-bg/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-1">
            <div className="bg-primary-bg p-2 rounded-[calc(1.5rem-4px)]">
                <ArchetypeQuiz />
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-[10px] font-mono text-text-secondary/40 uppercase tracking-[0.2em]">
              // Diagnostic results used for personalized workflow recommendations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}