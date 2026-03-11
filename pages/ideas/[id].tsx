import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { ArrowLeft, Zap, Clock, CheckCircle, Info, Lightbulb, Coffee } from 'lucide-react';
import ideasData from '../../lib/ideas-data.json';

export default function IdeaDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const idea = ideasData.find(i => i.id === id);

  if (!idea) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-4">Idea Not Found</h1>
          <Link href="/ideas-database" className="text-[#ccff00] uppercase font-black hover:underline">
            Back to Database
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-mono">
      <Head>
        <title>{idea.name} | Real AI Examples</title>
        <meta name="description" content={idea.problem} />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/ideas-database" className="inline-flex items-center gap-2 text-white/40 hover:text-[#ccff00] transition-colors mb-12 uppercase font-black text-xs">
            <ArrowLeft className="w-4 h-4" /> Back to Database
          </Link>

          {/* Header */}
          <header className="mb-16 border-l-8 border-[#ccff00] pl-8 py-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-widest mb-6">
              <Lightbulb className="w-3 h-3" /> {idea.vertical} Pattern
            </div>
            <h1 className="font-display text-4xl md:text-6xl uppercase leading-[0.9] tracking-tighter mb-6">
              {idea.name}
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Problem Section */}
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#ccff00]" /> The Problem
                </h2>
                <p className="text-2xl font-bold leading-tight text-white/90">
                  {idea.problem}
                </p>
              </section>

              {/* What AI Does */}
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#ccff00]" /> What AI Does
                </h2>
                <p className="text-lg text-white/70 leading-relaxed font-bold">
                  // {idea.what_ai_does}
                </p>
              </section>

              {/* How To Do It */}
              <section className="bg-white/5 border-2 border-white/10 p-8">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#ccff00] mb-8 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> How to actually do it
                </h2>
                <div className="space-y-6">
                  {idea.howToDoIt.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-white/10 text-white flex items-center justify-center font-black text-xs border border-white/20">
                        0{idx + 1}
                      </span>
                      <p className="text-white/80 font-bold leading-snug pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              {/* Best Tool */}
              <div className="bg-[#ccff00] text-black p-8 brutalist-shadow-white">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                   Best tool for this
                </h2>
                <p className="text-3xl font-display uppercase mb-4 leading-none">
                  {idea.bestTool}
                </p>
                <p className="text-xs font-bold leading-relaxed opacity-80">
                  {idea.whyThisTool}
                </p>
              </div>

              {/* ROI & Difficulty */}
              <div className="bg-white/5 border-2 border-white/10 p-8 space-y-8">
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">ROI</h2>
                  <div className="flex items-center gap-3 text-2xl font-black text-[#ccff00] uppercase">
                    <Zap className="w-5 h-5" /> {idea.time_saved}
                  </div>
                </div>
                <div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Difficulty</h2>
                  <div className="flex items-center gap-3 text-2xl font-black uppercase">
                    <Clock className="w-5 h-5 text-white/40" /> {idea.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
        
        .font-display {
          font-family: 'Archivo Black', sans-serif;
        }
        .brutalist-shadow-white {
            box-shadow: 6px 6px 0px 0px #fff;
        }
      `}</style>
    </div>
  );
}
