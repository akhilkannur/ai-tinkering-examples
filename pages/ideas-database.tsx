import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Search, Filter, Zap, ArrowRight, Lightbulb, ChevronDown, CheckCircle, Coffee } from 'lucide-react';
import ideasData from '../lib/ideas-data.json';

export default function IdeasDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('All');

  const verticals = useMemo(() => {
    const v = new Set(ideasData.map(i => i.vertical));
    return ['All', ...Array.from(v).sort()];
  }, []);

  const filteredIdeas = useMemo(() => {
    return ideasData.filter(idea => {
      const matchesSearch = idea.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           idea.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.what_ai_does.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVertical = selectedVertical === 'All' || idea.vertical === selectedVertical;
      return matchesSearch && matchesVertical;
    });
  }, [searchTerm, selectedVertical]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-mono">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>668 Practical Ideas to Save Time | Real AI Examples</title>
        <meta name="description" content="Browse 668 simple ideas to get your time back. From sales to marketing, find exactly what works for your business." />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <header className="mb-16 border-l-8 border-[#ccff00] pl-8 py-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-widest mb-6">
              <Coffee className="w-3 h-3" /> Practical Business Ideas
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tighter mb-6">
              Get your <br />
              time <span className="text-[#ccff00]">back.</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white/70 max-w-2xl leading-tight">
              Browse 668 simple ideas to reclaim your schedule. <br className="hidden md:block" />
              Find what saves you time this week.
            </p>
          </header>

          {/* Search & Filters */}
          <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-md py-6 border-y border-white/10 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="text" 
                  placeholder="WHAT PROBLEM ARE YOU SOLVING?..."
                  className="w-full bg-white/5 border-2 border-white/10 px-12 py-4 font-black uppercase tracking-widest focus:border-[#ccff00] focus:outline-none transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <select 
                  className="w-full bg-white/5 border-2 border-white/10 px-4 py-4 font-black uppercase tracking-widest appearance-none focus:border-[#ccff00] focus:outline-none cursor-pointer"
                  value={selectedVertical}
                  onChange={(e) => setSelectedVertical(e.target.value)}
                >
                  {verticals.map(v => <option key={v} value={v} className="bg-black">{v.toUpperCase()}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
               Showing {filteredIdeas.length} / {ideasData.length} practical ideas
             </div>
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ccff00]">
               Status: Ready to use
             </div>
          </div>

          {/* Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredIdeas.map((idea, idx) => (
              <Link key={idea.id + idx} href={`/ideas/${idea.id}`}>
                <div className="group relative bg-white/5 border-2 border-white/10 p-8 hover:border-[#ccff00] transition-all duration-300 flex flex-col h-full cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#ccff00] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                      {idea.vertical}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase leading-tight mb-4 group-hover:text-[#ccff00] transition-colors">
                    {idea.problem}
                  </h3>

                  <p className="text-white/60 leading-relaxed font-bold">
                    // {idea.what_ai_does}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-white/10">
              <p className="text-2xl font-black uppercase text-white/30">No ideas matched your search.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedVertical('All');}}
                className="mt-6 text-[#ccff00] font-black uppercase tracking-widest hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap');
        
        .font-display {
          font-family: 'Archivo Black', sans-serif;
        }
      `}</style>
    </div>
  );
}
