import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { FileText, Download, Zap, Link as LinkIcon, CheckCircle, Search, Cpu, Brain, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function DocContext() {
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ file: string, fileName: string } | null>(null);

  const preMadeContexts = [
    { name: "Apollo.io API Reference", size: "142 KB", category: "Sales Tech", file: "/context/docs-apollo-io.md" },
    { name: "Clay.run Knowledge Base", size: "284 KB", category: "Data Ops", file: "/context/docs-clay-com.md" },
    { name: "HubSpot CRM API", size: "512 KB", category: "CRM", file: "/context/hubspot-api.md" },
    { name: "Instantly.ai Docs", size: "88 KB", category: "Cold Email", file: "/context/instantly-docs.md" },
    { name: "Salesforce REST API", size: "1.2 MB", category: "CRM", file: "/context/salesforce-api.md" },
    { name: "Claude Code Guide", size: "64 KB", category: "AI Agents", file: "/context/claude-code.md" },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsGenerating(true);
    setIsFinished(false);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/docs-to-context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({ file: data.file, fileName: data.fileName });
        setIsFinished(true);
      } else {
        setError(data.error || 'Failed to generate context. Please try a different URL.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Head>
        <title>DocContext | Convert Documentation to LLM Context</title>
        <meta name="description" content="Turn any documentation site into a single Markdown file for Gemini CLI, Claude Code, and all major AI agents." />
      </Head>

      <div className="min-h-screen bg-primary-bg text-text-color font-sans selection:bg-accent/30">
        <Navbar />

        {/* HERO SECTION: BRANDED & PREMIUM */}
        <div className="pt-32 pb-20 relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-hero-gradient opacity-10 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-[10px] uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3 fill-current" /> Branded Utility Tool
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[0.9]">
              DOCS TO <span className="text-accent italic">CONTEXT</span>
            </h1>
            <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto leading-relaxed">
              Stop copy-pasting documentation. Enter a domain and get a single, 
              LLM-optimized <strong className="text-white">Context File</strong> for your AI Agent in seconds.
            </p>
          </div>
        </div>

        {/* TOOL SECTION: MINIMALIST & PROFESSIONAL */}
        <div className="container mx-auto px-4 max-w-4xl py-20">
          <div className="bg-secondary-bg border border-navy-dark rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden group transition-all hover:border-accent/20">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
            
            <form onSubmit={handleGenerate} className="relative z-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary/40 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Enter domain (e.g. apollo.io)" 
                    className="w-full bg-primary-bg border border-navy-dark rounded-2xl py-5 pl-14 pr-6 focus:border-accent outline-none transition-all font-mono text-sm text-white placeholder:text-text-secondary/30"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className={`bg-white text-black hover:bg-accent hover:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 shadow-xl ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-3 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Crawling...
                    </>
                  ) : (
                    <>
                      Generate .md <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-500 text-xs font-mono text-center">
                  ⚠️ {error}
                </div>
              )}

              {isFinished && result && (
                <div className="mt-8 p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-center gap-3 text-emerald-400 font-bold mb-6 text-sm uppercase tracking-widest">
                    <CheckCircle className="w-5 h-5" /> Context File Ready
                  </div>
                  <a 
                    href={result.file}
                    download={result.fileName}
                    className="bg-white text-black px-12 py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 mx-auto inline-flex shadow-xl"
                  >
                    <Download className="w-5 h-5" /> Download {result.fileName}
                  </a>
                </div>
              )}
              
              <p className="mt-8 text-text-secondary/30 text-[10px] font-mono uppercase tracking-[0.2em] text-center">
                Optimized for Gemini CLI, Claude Code & Cursor
              </p>
            </form>
          </div>

          {/* PRE-MADE LIBRARY: SLEEK GRID */}
          <div className="mt-32">
            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <Search className="text-accent w-6 h-6" />
                <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">Pre-Baked Library</h2>
              </div>
              <div className="text-[10px] text-text-secondary/40 font-mono uppercase tracking-widest hidden md:block italic">Verified Contexts</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preMadeContexts.map((ctx, i) => (
                <div key={i} className="bg-secondary-bg border border-navy-dark p-6 rounded-[32px] hover:border-accent/30 transition-all group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-accent/10 text-accent px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider">
                        {ctx.category}
                      </div>
                      <div className="text-text-secondary/30 text-[9px] font-mono">{ctx.size}</div>
                    </div>
                    <h3 className="text-lg font-bold mb-8 text-white group-hover:text-accent transition-colors leading-tight uppercase italic">
                      {ctx.name}
                    </h3>
                  </div>
                  <a 
                    href={ctx.file}
                    className="w-full bg-primary-bg border border-navy-dark text-text-secondary text-center py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all uppercase tracking-widest"
                    download
                  >
                    <Download className="w-4 h-4" /> Get Context
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* VALUE PROP GRID */}
          <div className="grid md:grid-cols-3 gap-12 mt-32 border-t border-white/5 pt-20">
            <div className="text-center md:text-left">
              <div className="bg-accent/10 w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-accent mx-auto md:mx-0">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase italic mb-4 text-white tracking-tight">Agent Optimized</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                Markdown is the native tongue of LLMs. We preserve hierarchy and structure that raw text copy-pastes destroy.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="bg-accent/10 w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-accent mx-auto md:mx-0">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase italic mb-4 text-white tracking-tight">Full Context</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                Avoid RAG snippet failures. Give your agent the "Big Picture" architecture of any API or SaaS tool.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="bg-accent/10 w-10 h-10 rounded-lg flex items-center justify-center mb-6 text-accent mx-auto md:mx-0">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase italic mb-4 text-white tracking-tight">Zero Friction</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                One file vs 50 browser tabs. The professional choice for Gemini CLI, Claude Code, and Cursor workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
