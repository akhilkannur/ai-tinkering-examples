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

      <div className="min-h-screen bg-primary-bg text-black font-sans selection:bg-[#ff00ff] selection:text-white">
        <Navbar />

        {/* HERO SECTION: BRANDED & PREMIUM */}
        <div className="pt-32 pb-20 relative overflow-hidden border-b-4 border-black bg-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#ccff00] border-2 border-black text-accent font-mono text-[10px] uppercase tracking-widest mb-6 transform -rotate-1">
              <Zap className="w-3 h-3 fill-current" /> Branded Utility Tool
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-black mb-6 tracking-tighter uppercase leading-[0.9] glitch-text" data-text="DOCS TO CONTEXT">
              DOCS TO <span className="text-[#ff00ff]">CONTEXT</span>
            </h1>
            <p className="text-xl text-black font-bold max-w-2xl mx-auto leading-relaxed border-l-4 border-[#ccff00] pl-6 py-2 bg-gray-50">
              Stop copy-pasting documentation. Enter a domain and get a single, 
              LLM-optimized <strong className="bg-black text-[#ccff00] px-1">Context File</strong> for your AI Agent in seconds.
            </p>
          </div>
        </div>

        {/* TOOL SECTION: MINIMALIST & PROFESSIONAL */}
        <div className="container mx-auto px-4 max-w-4xl py-20">
          <div className="bg-white border-4 border-black p-8 md:p-16 brutalist-shadow relative overflow-hidden group transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <FileText className="w-32 h-32 text-black" />
            </div>
            
            <form onSubmit={handleGenerate} className="relative z-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Enter domain (e.g. apollo.io)" 
                    className="w-full bg-gray-50 border-2 border-black py-5 pl-14 pr-6 focus:bg-[#ccff00] outline-none transition-all font-mono text-sm text-black placeholder:text-gray-400"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className={`bg-black text-[#ccff00] hover:translate-x-0.5 hover:translate-y-0.5 px-10 py-5 font-display text-xl uppercase transition-all flex items-center justify-center gap-3 brutalist-shadow-sm ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-3 border-[#ccff00]/30 border-t-[#ccff00] rounded-full animate-spin"></div>
                      Crawling...
                    </>
                  ) : (
                    <>
                      Generate .md <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-8 p-4 bg-red-100 border-2 border-red-500 rounded-none text-red-600 text-sm font-bold font-mono text-center uppercase tracking-widest">
                  ⚠️ {error}
                </div>
              )}

              {isFinished && result && (
                <div className="mt-8 p-8 bg-green-50 border-4 border-black animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-center gap-3 text-green-700 font-display mb-6 text-xl uppercase tracking-widest">
                    <CheckCircle className="w-6 h-6" /> Context File Ready
                  </div>
                  <a 
                    href={result.file}
                    download={result.fileName}
                    className="bg-[#ff00ff] text-white px-12 py-4 border-4 border-black font-display text-xl uppercase transition-all flex items-center justify-center gap-2 mx-auto inline-flex brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    <Download className="w-6 h-6" /> Download {result.fileName}
                  </a>
                </div>
              )}
              
              <p className="mt-8 text-black text-[10px] font-black uppercase tracking-[0.2em] text-center">
                // Optimized for Gemini CLI, Claude Code & Cursor
              </p>
            </form>
          </div>

          {/* PRE-MADE LIBRARY: SLEEK GRID */}
          <div className="mt-32">
            <div className="flex items-center justify-between mb-12 border-b-4 border-black pb-6">
              <div className="flex items-center gap-4">
                <Search className="text-black w-8 h-8" />
                <h2 className="text-3xl font-display uppercase tracking-tight text-black">Pre-Baked Library</h2>
              </div>
              <div className="text-[10px] text-black font-black uppercase tracking-widest hidden md:block italic">// Verified Contexts</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {preMadeContexts.map((ctx, i) => (
                <div key={i} className="bg-white border-4 border-black p-6 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all group flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-black text-[#ccff00] px-2 py-0.5 font-mono text-[9px] font-bold uppercase border border-black">
                        {ctx.category}
                      </div>
                      <div className="text-gray-500 text-[9px] font-black font-mono uppercase">{ctx.size}</div>
                    </div>
                    <h3 className="text-xl font-display mb-8 text-black group-hover:text-[#ff00ff] transition-colors leading-tight uppercase">
                      {ctx.name}
                    </h3>
                  </div>
                  <a 
                    href={ctx.file}
                    className="w-full bg-white border-2 border-black text-black text-center py-3 font-display text-xs flex items-center justify-center gap-2 hover:bg-[#ccff00] transition-all uppercase tracking-widest"
                    download
                  >
                    <Download className="w-4 h-4" /> Get Context
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* VALUE PROP GRID */}
          <div className="grid md:grid-cols-3 gap-12 mt-32 border-t-4 border-black pt-20">
            <div className="text-center md:text-left">
              <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-[#ccff00] mx-auto md:mx-0 border-2 border-black brutalist-shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display uppercase mb-4 text-black tracking-tight">Agent Optimized</h3>
              <p className="text-black text-sm leading-relaxed font-bold font-mono">
                // Markdown is the native tongue of LLMs. We preserve hierarchy and structure.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-[#ff00ff] mx-auto md:mx-0 border-2 border-black brutalist-shadow-sm">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display uppercase mb-4 text-black tracking-tight">Full Context</h3>
              <p className="text-black text-sm leading-relaxed font-bold font-mono">
                // Avoid RAG snippet failures. Give your agent the "Big Picture" architecture.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 text-white mx-auto md:mx-0 border-2 border-black brutalist-shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display uppercase mb-4 text-black tracking-tight">Zero Friction</h3>
              <p className="text-black text-sm leading-relaxed font-bold font-mono">
                // One file vs 50 browser tabs. The professional choice for agentic workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
