import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { FileText, Download, Zap, Link as LinkIcon, CheckCircle, Search, Cpu, Brain } from 'lucide-react'
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
        <meta name="description" content="Turn any documentation site into a single Markdown file for Gemini CLI, Claude Code, and Cursor." />
      </Head>

      <div className="min-h-screen bg-[#0B0F1A] text-white font-sans">
        <Navbar />

        {/* HERO SECTION */}
        <div className="pt-32 pb-16 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 font-mono text-xs uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3" /> Tool for Operators & Engineers
            </div>
            <h1 className="text-4xl md:text-6xl font-header mb-6 leading-tight tracking-tight uppercase">
              DOCS TO <span className="text-orange-500">CONTEXT</span>
            </h1>
            <p className="text-xl text-slate-400 font-body max-w-2xl leading-relaxed">
              Don't manually copy-paste documentation. Enter a URL and get a single, 
              LLM-optimized <strong>Context File</strong> for your AI Agent in seconds.
            </p>
          </div>
        </div>

        {/* TOOL SECTION */}
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 md:p-12 mb-20 shadow-2xl">
            <form onSubmit={handleGenerate} className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-wide">Generate Custom Context</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Enter domain or docs URL (e.g. apollo.io)" 
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-orange-500 outline-none transition-all font-mono text-sm"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isGenerating}
                  className={`bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Crawling Docs...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Generate .md
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-mono">
                  ⚠️ {error}
                </div>
              )}

              {isFinished && result && (
                <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-center gap-3 text-emerald-500 font-bold mb-4">
                    <CheckCircle className="w-6 h-6" /> Generation Complete!
                  </div>
                  <a 
                    href={result.file}
                    download={result.fileName}
                    className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mx-auto inline-flex"
                  >
                    <Download className="w-5 h-5" /> Download {result.fileName}
                  </a>
                </div>
              )}
              
              <p className="mt-6 text-slate-500 text-xs font-mono">
                Supports GitBook, Docusaurus, and most REST API documentation.
              </p>
            </form>
          </div>

          {/* PRE-MADE LIBRARY */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Search className="text-orange-500 w-6 h-6" />
                <h2 className="text-2xl font-header uppercase">Pre-Baked Library</h2>
              </div>
              <div className="text-xs text-slate-500 font-mono hidden md:block">Updated Weekly</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preMadeContexts.map((ctx, i) => (
                <div key={i} className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-orange-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {ctx.category}
                    </div>
                    <div className="text-slate-500 text-[10px] font-mono">{ctx.size}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-6 text-white group-hover:text-orange-500 transition-colors">
                    {ctx.name}
                  </h3>
                  <a 
                    href={ctx.file}
                    className="w-full bg-white/5 border border-white/10 text-white text-center py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
                    download
                  >
                    <Download className="w-4 h-4" /> Download Context
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* WHY IT WORKS */}
          <div className="grid md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
            <div>
              <Cpu className="text-orange-500 w-8 h-8 mb-4" />
              <h3 className="text-xl font-header uppercase mb-4">Agent Optimized</h3>
              <p className="text-slate-400 font-body text-sm leading-relaxed">
                Markdown format is the "native tongue" of LLMs. It preserves hierarchical structures like headers and lists that "Raw Text" destroys.
              </p>
            </div>
            <div>
              <Brain className="text-orange-500 w-8 h-8 mb-4" />
              <h3 className="text-xl font-header uppercase mb-4">Full Context Memory</h3>
              <p className="text-slate-400 font-body text-sm leading-relaxed">
                Search/RAG only gives the AI snippets. Context files give the AI the "Big Picture" of the entire API architecture.
              </p>
            </div>
            <div>
              <Zap className="text-orange-500 w-8 h-8 mb-4" />
              <h3 className="text-xl font-header uppercase mb-4">Zero Friction</h3>
              <p className="text-slate-400 font-body text-sm leading-relaxed">
                Instead of 50 browser tabs, give your agent one file. Perfect for Gemini CLI, Claude Code, and Cursor.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
