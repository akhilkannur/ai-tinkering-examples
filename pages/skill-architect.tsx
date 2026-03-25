import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Zap, ShieldCheck, Target, Hammer, Brain, ArrowRight, MessageSquare, Timer, Sparkles, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function SkillArchitect() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>The Skill Architect | Human-Led AI Workflow Extraction</title>
        <meta name="description" content="Stop fighting with AI prompts. We interview you for 60 minutes to extract your repetitive tasks into custom 'Ironclad' AI Skills that actually work." />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* HERO SECTION */}
        <div className="container mx-auto px-4 max-w-6xl pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#ccff00] font-bold text-[10px] uppercase tracking-widest mb-8 border-2 border-black transform -rotate-1 brutalist-shadow-sm">
            <Sparkles className="w-3 h-3 fill-current" /> Expert-Led Extraction Session
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display mb-8 tracking-tighter leading-[0.9] uppercase glitch-text" data-text="DONE-FOR-YOU AI SKILLS">
            DONE-FOR-YOU <br />
            <span className="text-[#ff00ff]">AI SKILLS.</span>
          </h1>

          <p className="text-xl md:text-3xl text-black font-black max-w-3xl mx-auto leading-tight mb-12 border-y-4 border-black py-6 bg-white rotate-1 brutalist-shadow">
            Give us 60 minutes. We interview you to extract your "secret sauce" protocols, then we build the custom <span className="bg-[#ccff00] px-1">Ironclad Skills</span> that handle your repetitive tasks automatically.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 bg-[#ff00ff] text-white font-display text-xl uppercase tracking-widest transition-all brutalist-shadow border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              Book My Extraction Session
            </button>
            <div className="flex items-center gap-2 text-xs font-black font-mono text-black uppercase tracking-widest">
              <Timer className="w-5 h-5 text-black" /> Limited to 5 Sessions / Month
            </div>
          </div>
        </div>

        {/* THE PROBLEM: AI SLOP */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="bg-black text-white p-8 md:p-12 border-4 border-black brutalist-shadow-white relative">
            <div className="absolute -top-6 -right-6 bg-[#ff00ff] text-white p-4 border-4 border-black rotate-12 font-black text-xl">
              SLOP ALERT
            </div>
            <h2 className="text-3xl font-display mb-8 uppercase tracking-tight text-[#ccff00]">Why DIY AI Workflows Fail</h2>
            <div className="space-y-6 text-lg font-bold leading-relaxed opacity-90">
              <p>Most people treat AI like a magic wand. They type a vague prompt like <span className="text-[#ff00ff]">"help me with sales research"</span> and get back a generic, hallucinated mess. We call this "AI Slop."</p>
              <p>AI is smart, but it doesn't know your <strong>Hammer</strong> (the specific tools you use) or your <strong>Guardrails</strong> (the exact steps you take to ensure quality). When you "just ask the model to figure it out," it converges toward the median. It flattens your expertise.</p>
            </div>
          </div>
        </div>

        {/* THE PROCESS: STUDIO SESSIONS */}
        <div className="container mx-auto px-4 max-w-5xl mb-32">
          <h2 className="text-4xl md:text-6xl font-display mb-16 text-center uppercase tracking-tighter underline decoration-[#ccff00] decoration-8 underline-offset-8">The Studio Session</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-4 border-black p-8 brutalist-shadow relative group">
              <div className="w-12 h-12 bg-black text-[#ccff00] flex items-center justify-center border-2 border-black mb-6 transform group-hover:rotate-12 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">01. THE INTERVIEW</h3>
              <p className="font-bold text-gray-600">We spend 60 minutes interviewing you about your repetitive tasks. We don't ask for prompts; we ask for your protocols, your tools, and your manual "Ironclad" checks.</p>
            </div>

            <div className="bg-white border-4 border-black p-8 brutalist-shadow relative group">
              <div className="w-12 h-12 bg-black text-[#ccff00] flex items-center justify-center border-2 border-black mb-6 transform group-hover:rotate-12 transition-transform">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">02. THE EXTRACTION</h3>
              <p className="font-bold text-gray-600">Our "Studio" takes that raw expertise and transforms it into a custom Skill package: The SKILL.md instructions, the validation scripts, and the automation "Hammers" specific to your machine.</p>
            </div>

            <div className="bg-white border-4 border-black p-8 brutalist-shadow relative group">
              <div className="w-12 h-12 bg-black text-[#ccff00] flex items-center justify-center border-2 border-black mb-6 transform group-hover:rotate-12 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">03. THE DELIVERY</h3>
              <p className="font-bold text-gray-600">We install the skills directly into your local AI agent (Claude Code, Gemini CLI, etc). You get your time back without ever having to debug a script or write a prompt again.</p>
            </div>
          </div>
        </div>

        {/* EXTRACTION > INVENTION BOX */}
        <div className="container mx-auto px-4 max-w-4xl mb-32">
          <div className="border-8 border-black p-12 bg-[#ccff00] brutalist-shadow rotate-1">
             <h2 className="text-4xl font-display mb-6 uppercase tracking-tighter">EXTRACTION &gt; INVENTION</h2>
             <p className="text-xl font-black leading-tight mb-8">
               We don't "invent" new ways for you to work. We "extract" the hard-won procedural truth of how you already work and encode it so your AI agent can follow it with 100% accuracy.
             </p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-black text-white p-4 text-center border-2 border-black">
                 <div className="text-xs font-mono uppercase opacity-60 mb-2">Goal</div>
                 <div className="font-bold">Zero Slop</div>
               </div>
               <div className="bg-black text-white p-4 text-center border-2 border-black">
                 <div className="text-xs font-mono uppercase opacity-60 mb-2">Tech</div>
                 <div className="font-bold">Local-First</div>
               </div>
               <div className="bg-black text-white p-4 text-center border-2 border-black">
                 <div className="text-xs font-mono uppercase opacity-60 mb-2">Format</div>
                 <div className="font-bold">Ironclad</div>
               </div>
               <div className="bg-black text-white p-4 text-center border-2 border-black">
                 <div className="text-xs font-mono uppercase opacity-60 mb-2">Outcome</div>
                 <div className="font-bold">Real Time</div>
               </div>
             </div>
          </div>
        </div>

        {/* PRICING / CTA */}
        <div className="container mx-auto px-4 max-w-3xl text-center">
           <div className="bg-white border-4 border-black p-12 brutalist-shadow">
              <h3 className="text-2xl font-black uppercase mb-4 tracking-widest">One Flat Fee. No Retainers.</h3>
              <div className="text-6xl font-display mb-8 uppercase tracking-tighter text-[#ff00ff]">$999 / <span className="text-black text-2xl">Session</span></div>
              <ul className="text-left space-y-4 mb-12 font-bold max-w-md mx-auto">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> 60-Minute Extraction Interview</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> 3 Custom "Ironclad" AI Skills</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Full Local Installation & Setup</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /> Validation Scripts & Tool Config</li>
              </ul>
              <button className="w-full px-10 py-6 bg-black text-[#ccff00] font-display text-2xl uppercase tracking-widest transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none border-4 border-black">
                Claim Your Spot
              </button>
           </div>
        </div>

      </main>
    </div>
  )
}
