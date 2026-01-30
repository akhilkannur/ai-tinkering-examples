import React from 'react';
import { Terminal, Copy, Play, CheckCircle2, Cpu } from 'lucide-react';

const HowToUseGuide = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-0">
      
      {/* 1. The "What is this?" Analogy - Compact Version */}
      <div className="bg-secondary-bg rounded-3xl p-6 md:p-10 text-text-color shadow-2xl mb-8 relative overflow-hidden border border-navy-dark group hover:border-accent/30 transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-500"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-semibold mb-4 border border-accent/20">
              <Cpu className="w-3 h-3" />
              <span>New to Agents? Start here.</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight font-sans">
              A Chatbot with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Hands.</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-6 font-normal">
              ChatGPT can <em>write</em> an email, but it can't <em>send</em> it. <br/>
              <strong className="text-text-color">Agentic Tools</strong> live on your computer. They can create files, run searches, and manage projects - just like a remote intern.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
               <div className="flex items-center gap-3 bg-primary-bg px-4 py-2 rounded-lg border border-navy-dark">
                 <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-xs">1</div>
                 <span className="text-xs font-bold text-text-color">Install Agent</span>
               </div>
               <div className="flex items-center gap-3 bg-primary-bg px-4 py-2 rounded-lg border border-navy-dark">
                 <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">2</div>
                 <span className="text-xs font-bold text-text-color">Paste Blueprint</span>
               </div>
            </div>
          </div>
          
          {/* Visual Analogy - Smaller */}
          <div className="bg-[#0D1117] rounded-lg border border-navy-dark p-4 shadow-2xl font-mono text-[11px] relative">
            <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-3">
              <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-white">claude "Run the Lead Finder"</span>
              </div>
              <div className="text-white/50 pl-4">
                Scanning... Found 50 prospects. <br/>
                <span className="text-blue-400">✓ Created leads.csv</span>
              </div>
              <div className="flex gap-2 animate-pulse">
                <span className="text-green-400">➜</span>
                <span className="text-white">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. The 3-Step Setup - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/40 transition-colors group flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-primary-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-4 border border-navy-dark">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-color mb-2">1. Pick Your Tool</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              We recommend <strong className="text-text-color">Claude Code</strong> or <strong className="text-text-color">Gemini CLI</strong>. They run in your terminal.
            </p>
          </div>
          <div className="bg-primary-bg rounded-lg p-3 font-mono text-[10px] text-text-secondary/80 flex justify-between items-center group cursor-pointer border border-navy-dark hover:border-accent/30 transition-colors"
               onClick={() => navigator.clipboard.writeText('npm install -g @anthropic-ai/claude-code')}>
            <span className="truncate mr-2">npm install -g @anthropic-ai/claude-code</span>
            <Copy className="w-3 h-3 text-text-secondary group-hover:text-accent" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/40 transition-colors group flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-primary-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-4 border border-navy-dark">
              <Copy className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-color mb-2">2. Copy a Blueprint</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Browse the library. Click <strong className="text-text-color">"Copy Blueprint"</strong> on any card (e.g., "The Sales Sniper").
            </p>
          </div>
          <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
            <div className="flex items-center gap-2 text-[10px] text-accent font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Blueprint copied to clipboard!</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-6 hover:border-accent/40 transition-colors group flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-primary-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-4 border border-navy-dark">
              <Play className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-text-color mb-2">3. Run the Agent</h3>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              In your terminal, type <code className="bg-primary-bg px-1 py-0.5 rounded text-[10px] border border-navy-dark">claude</code> or <code className="bg-primary-bg px-1 py-0.5 rounded text-[10px] border border-navy-dark">gemini</code>, and paste.
            </p>
          </div>
          <div className="bg-[#0D1117] rounded-lg p-3 font-mono text-[10px] text-green-400 border border-navy-dark">
            &gt; claude "Paste here..."
          </div>
        </div>
      </div>

    </div>
  );
};

export default HowToUseGuide;