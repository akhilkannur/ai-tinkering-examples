import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Download, Brain, Zap, ArrowRight, FileText } from 'lucide-react';

export default function ContextLibrary() {
  const masterSkills = [
    { name: "Sales Ops", count: 254, desc: "Outbound, Lead Gen & CRM" },
    { name: "Marketing Ops", count: 118, desc: "Ad Ops, Email & Paid Media" },
    { name: "SEO & Content", count: 106, desc: "Technical SEO & Programmatic Content" },
    { name: "RevOps & Strategy", count: 157, desc: "Strategy, Growth & Analytics" },
    { name: "Automation & Dev", count: 96, desc: "AI Setup, Low-Code & Tools" },
  ];

  const CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP";

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Master Skills | Real AI Examples</title>
        <meta name="description" content="500+ consolidated AI blueprints. One file per department. Drop in and go." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-6xl">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-1 font-black text-sm uppercase mb-8 transform rotate-1 brutalist-shadow-sm">
            <Zap className="w-4 h-4 fill-current" /> 500+ Blueprints. One File.
          </div>
          <h1 className="text-5xl md:text-7xl font-display mb-8 text-black uppercase leading-[0.9] glitch-text" data-text="GIVE YOUR AGENT A PHD.">
            Give Your Agent a <span className="text-[#ff00ff]">PhD.</span>
          </h1>
          <p className="text-xl md:text-2xl text-black font-bold leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm">
            Stop copying prompts one by one. <strong>One consolidated skill file</strong> gives your agent an entire department's knowledge.
          </p>
          <div className="mt-12">
            <a
              href={CHECKOUT_URL}
              className="bg-[#ff00ff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-white px-12 py-6 border-4 border-black font-display text-2xl uppercase transition-all brutalist-shadow inline-flex items-center gap-4"
            >
              Get Full Access ($39) <ArrowRight className="w-8 h-8 stroke-[3px]" />
            </a>
          </div>
          <p className="mt-6 text-xs font-black text-gray-500 uppercase tracking-widest">
            Works with Claude Code, Gemini CLI, Cursor & all major agent tools
          </p>
        </div>

        {/* Master Skills */}
        <div className="mb-32">
          <h2 className="text-3xl font-display mb-8 uppercase text-center">
            5 Department Skills. 500+ Blueprints.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {masterSkills.map((skill, i) => (
              <div key={i} className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex flex-col justify-between group">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest bg-black text-[#ccff00] px-2 py-0.5 inline-block border border-black mb-4">
                    Master Skill
                  </div>
                  <h3 className="text-2xl font-display mb-4 text-black uppercase leading-tight">{skill.name}</h3>
                  <p className="text-sm text-black font-black font-mono mb-8 leading-relaxed">// {skill.desc}</p>
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <span className="text-xs font-black font-mono text-gray-500 uppercase tracking-widest">{skill.count} Blueprints</span>
                  <a
                    href={CHECKOUT_URL}
                    className="bg-white border-2 border-black text-black px-4 py-3 font-display text-xs uppercase transition-all flex items-center justify-center gap-2 hover:bg-[#ccff00]"
                  >
                    <Download className="w-4 h-4 stroke-[3px]" /> Get Access
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-32">
          <h2 className="text-3xl font-display mb-8 uppercase text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#ccff00] p-8 border-4 border-black brutalist-shadow-sm rotate-1">
              <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white font-display text-2xl border-2 border-black shadow-[2px_2px_0px_0px_#fff]">1</div>
              <h3 className="text-2xl font-display mb-4 uppercase">Get Access</h3>
              <p className="text-black font-bold uppercase text-sm leading-tight">One-time $39 payment unlocks all 5 Master Skills.</p>
            </div>
            <div className="bg-white p-8 border-4 border-black brutalist-shadow-sm -rotate-1">
              <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white font-display text-2xl border-2 border-black shadow-[2px_2px_0px_0px_#ccff00]">2</div>
              <h3 className="text-2xl font-display mb-4 uppercase">Drop in Folder</h3>
              <p className="text-black font-bold uppercase text-sm leading-tight">Place .md files in .claude/skills/ or .agents/skills/</p>
            </div>
            <div className="bg-[#ff00ff] p-8 border-4 border-black brutalist-shadow-sm rotate-1">
              <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white font-display text-2xl border-2 border-black shadow-[2px_2px_0px_0px_#00ffff]">3</div>
              <h3 className="text-2xl font-display mb-4 uppercase">Prompt Agent</h3>
              <p className="text-white font-bold uppercase text-sm leading-tight">"From a /marketing-ops standpoint, review our GTM plan."</p>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-black text-white border-4 border-black p-12 brutalist-shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display mb-8 flex items-center justify-center gap-4 uppercase">
              <Brain className="w-10 h-10 text-[#ccff00]" strokeWidth={3} /> What's Inside
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white text-black p-6 border-2 border-black">
                <h4 className="text-xl font-display mb-3 uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Plain Markdown (.md)
                </h4>
                <p className="text-sm font-bold uppercase text-gray-600">
                  Human-readable. Agent-ready. No complex formats or JSON structures.
                </p>
              </div>
              <div className="bg-white text-black p-6 border-2 border-black">
                <h4 className="text-xl font-display mb-3 uppercase flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Instant Recognition
                </h4>
                <p className="text-sm font-bold uppercase text-gray-600">
                  Agents auto-detect skills folder and load context automatically.
                </p>
              </div>
              <div className="bg-white text-black p-6 border-2 border-black">
                <h4 className="text-xl font-display mb-3 uppercase flex items-center gap-2">
                  <Download className="w-5 h-5" /> Universal Format
                </h4>
                <p className="text-sm font-bold uppercase text-gray-600">
                  Works with Claude Code, Gemini CLI, Cursor, and all major tools.
                </p>
              </div>
              <div className="bg-white text-black p-6 border-2 border-black">
                <h4 className="text-xl font-display mb-3 uppercase flex items-center gap-2">
                  <Brain className="w-5 h-5" /> Department-Level IQ
                </h4>
                <p className="text-sm font-bold uppercase text-gray-600">
                  One file = entire department's playbooks, frameworks, and workflows.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href={CHECKOUT_URL}
                className="bg-[#ccff00] text-black hover:bg-white border-4 border-white px-12 py-6 font-display text-xl uppercase transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none inline-flex items-center gap-4"
              >
                Get All 5 Master Skills ($39) <ArrowRight className="w-6 h-6 stroke-[3px]" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
