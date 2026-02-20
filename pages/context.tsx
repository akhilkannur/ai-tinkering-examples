import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Download, FileJson, Brain, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function ContextLibrary() {
  const masterSkills = [
    { name: "Sales Ops Master Skill", file: "/master-skills/sales-ops.md", count: 254, color: "text-[#00ffff]", desc: "Outbound, Lead Gen & CRM" },
    { name: "Marketing Ops Master Skill", file: "/master-skills/marketing-ops.md", count: 118, color: "text-[#ff00ff]", desc: "Ad Ops, Email & Paid Media" },
    { name: "SEO & Content Master Skill", file: "/master-skills/seo-content.md", count: 106, color: "text-[#ccff00]", desc: "Technical SEO & Programmatic Content" },
    { name: "RevOps Master Skill", file: "/master-skills/revops-strategy.md", count: 157, color: "text-[#ff00ff]", desc: "Strategy, Growth & Analytics" },
    { name: "Automation & Dev Master Skill", file: "/master-skills/automation-dev.md", count: 96, color: "text-[#00ffff]", desc: "AI Setup, Low-Code & Tools" },
  ];

  const cookbooks = [
    { name: "Master Brain (All 500+)", file: "/cookbook-full.json", count: 723, color: "text-[#ff00ff]" },
    { name: "Sales Ops Specialist", file: "/context/cookbook-sales-ops.json", count: 181, color: "text-[#00ffff]" },
    { name: "Strategic Ops Specialist", file: "/context/cookbook-strategic-ops.json", count: 124, color: "text-[#ccff00]" },
    { name: "Lead Gen Specialist", file: "/context/cookbook-lead-gen.json", count: 73, color: "text-green-600" },
    { name: "SEO Specialist", file: "/context/cookbook-seo.json", count: 49, color: "text-yellow-600" },
    { name: "Marketing Ops Specialist", file: "/context/cookbook-marketing-ops.json", count: 58, color: "text-[#ff00ff]" },
  ];

  const CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP";

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>Context Library | Real AI Examples</title>
        <meta name="description" content="Premium context files for Gemini CLI and Claude Code. Unlock 500+ workflows for $39." />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-1 font-black text-sm uppercase mb-8 transform rotate-1 brutalist-shadow-sm">
            <Zap className="w-4 h-4 fill-current" /> Premium Context Library
          </div>
          <h1 className="text-5xl md:text-7xl font-display mb-8 text-black uppercase leading-[0.9] glitch-text" data-text="GIVE YOUR AGENT A PHD.">
            Give Your Agent a <span className="text-[#ff00ff]">PhD.</span>
          </h1>
          <p className="text-xl md:text-2xl text-black font-bold leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm">
            Stop copying prompts one by one. Unlock these <strong>Consolidated Master Skills</strong> and drop them into your project.
          </p>
          <div className="mt-12">
            <a 
              href={CHECKOUT_URL}
              className="bg-[#ff00ff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none text-white px-12 py-6 border-4 border-black font-display text-2xl uppercase transition-all brutalist-shadow inline-flex items-center gap-4"
            >
              Unlock All Context ($39) <ArrowRight className="w-8 h-8 stroke-[3px]" />
            </a>
          </div>
        </div>

        {/* Master Skills (New Section) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {masterSkills.map((skill, i) => (
            <div key={i} className="bg-white border-4 border-black p-8 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex flex-col justify-between group">
              <div>
                <div className={`text-[10px] font-black uppercase tracking-widest bg-black px-2 py-0.5 inline-block border border-black mb-4 ${skill.color}`}>Master Skill</div>
                <h3 className="text-2xl font-display mb-4 text-black uppercase leading-tight">{skill.name}</h3>
                <p className="text-sm text-black font-black font-mono mb-8 leading-relaxed">// {skill.desc}</p>
              </div>
              <div className="flex flex-col gap-4 mt-auto">
                <span className="text-xs font-black font-mono text-gray-500 uppercase tracking-widest">{skill.count} Blueprints</span>
                <a 
                  href={CHECKOUT_URL} 
                  className="bg-white border-2 border-black text-black px-4 py-3 font-display text-xs uppercase transition-all flex items-center justify-center gap-2 hover:bg-[#ccff00]"
                >
                  <Download className="w-4 h-4 stroke-[3px]" /> Unlock .md
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          <div className="bg-[#ccff00] p-8 border-4 border-black brutalist-shadow-sm rotate-1">
            <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white font-display text-2xl border-2 border-black shadow-[2px_2px_0px_0px_#fff]">1</div>
            <h3 className="text-2xl font-display mb-4 uppercase">Get Access</h3>
            <p className="text-black font-bold uppercase text-sm leading-tight">One-time $39 payment unlocks the entire library of Master Skills.</p>
          </div>
          <div className="bg-white p-8 border-4 border-black brutalist-shadow-sm -rotate-1">
            <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white font-display text-2xl border-2 border-black shadow-[2px_2px_0px_0px_#ccff00]">2</div>
            <h3 className="text-2xl font-display mb-4 uppercase">Drop in Folder</h3>
            <p className="text-black font-bold uppercase text-sm leading-tight">Place the files in your project root or context directory.</p>
          </div>
          <div className="bg-[#ff00ff] p-8 border-4 border-black brutalist-shadow-sm rotate-1">
            <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white font-display text-2xl border-2 border-black shadow-[2px_2px_0px_0px_#00ffff]">3</div>
            <h3 className="text-2xl font-display mb-4 uppercase">Prompt Agent</h3>
            <p className="text-white font-bold uppercase text-sm leading-tight">"From a /marketing-ops standpoint, review our GTM plan."</p>
          </div>
        </div>

        {/* Specialized JSON (Cookbooks) */}
        <div className="bg-black text-white border-y-4 border-black py-20 px-4 -mx-4 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-display mb-12 flex items-center justify-center gap-4 uppercase glitch-text" data-text="JSON COOKBOOKS">
              <Brain className="w-12 h-12 text-[#ccff00]" strokeWidth={3} /> JSON Cookbooks
            </h2>
            
            <div className="grid gap-6">
              {cookbooks.map((book, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-between bg-white border-4 border-black p-6 hover:translate-x-1 hover:translate-y-1 transition-all group brutalist-shadow-sm">
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <div className="bg-black p-3 border-2 border-black">
                        <FileJson className={`w-10 h-10 ${book.color}`} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-display text-black uppercase">{book.name}</h4>
                      <p className="text-sm text-black font-black font-mono uppercase tracking-widest">{book.count} Workflows included</p>
                    </div>
                  </div>
                  <a 
                    href={CHECKOUT_URL} 
                    className="flex items-center gap-3 bg-black text-[#ccff00] hover:bg-[#ff00ff] hover:text-white border-4 border-black px-8 py-4 font-display text-lg uppercase transition-all w-full md:w-auto justify-center"
                  >
                    <Download className="w-6 h-6 stroke-[3px]" /> Unlock JSON
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center text-xs font-black font-mono text-[#ccff00] uppercase tracking-[0.2em] bg-white/10 py-4 border border-white/20">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Compatible with Gemini CLI, Claude Code, and Cursor.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
