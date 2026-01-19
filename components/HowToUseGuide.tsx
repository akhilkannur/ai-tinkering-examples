import React from 'react';
import Link from 'next/link';
import { Terminal, Copy, Play, Zap, CheckCircle2, Cpu } from 'lucide-react';

const HowToUseGuide = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-20">
      
      {/* 1. The "What is this?" Analogy */}
      <div className="bg-secondary-bg rounded-3xl p-8 md:p-12 text-text-color shadow-2xl mb-12 relative overflow-hidden border border-navy-dark group hover:border-accent/30 transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity duration-500"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-accent/20">
              <Cpu className="w-3 h-3" />
              <span>New to Agents? Start here.</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight font-sans">
              A Chatbot with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Hands.</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 font-normal">
              ChatGPT can <em>write</em> an email, but it can't <em>send</em> it. <br/>
              <strong className="text-text-color">Agentic Tools</strong> (like Claude Code or Gemini CLI) are different. They live on your computer, so they can create files, run searches, and manage your projects—just like a remote intern.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-3 bg-primary-bg px-4 py-3 rounded-lg border border-navy-dark hover:border-accent/30 transition-colors">
                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm">1</div>
                 <span className="text-sm font-bold text-text-color">Install an Agent</span>
               </div>
               <div className="hidden sm:block text-text-secondary/50 self-center">→</div>
               <div className="flex items-center gap-3 bg-primary-bg px-4 py-3 rounded-lg border border-navy-dark hover:border-accent/30 transition-colors">
                 <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">2</div>
                 <span className="text-sm font-bold text-text-color">Paste a Blueprint</span>
               </div>
            </div>
          </div>
          
          {/* Visual Analogy */}
          <div className="bg-[#0D1117] rounded-lg border border-navy-dark p-6 shadow-2xl font-mono text-sm relative">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-white/30 text-xs">user@macbook:~</span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-white">claude "Run the Lead Finder blueprint"</span>
              </div>
              <div className="text-white/50 pl-4">
                Scanning LinkedIn... <br/>
                Found 50 prospects. <br/>
                Checking emails... <br/>
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

      {/* 2. The 3-Step Setup */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        
        {/* Step 1 */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-8 hover:border-accent/40 transition-colors group">
          <div className="w-12 h-12 bg-primary-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-6 border border-navy-dark">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-text-color mb-3">1. Pick Your Tool</h3>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            We recommend <strong className="text-text-color">Claude Code</strong> or <strong className="text-text-color">Gemini CLI</strong>. They are free tools that run in your terminal.
          </p>
          <div className="bg-primary-bg rounded-lg p-3 font-mono text-xs text-text-secondary/80 flex justify-between items-center group cursor-pointer border border-navy-dark hover:border-accent/30 transition-colors"
               onClick={() => navigator.clipboard.writeText('npm install -g @anthropic-ai/claude-code')}>
            <span className="truncate mr-2">npm install -g @anthropic-ai/claude-code</span>
            <Copy className="w-3 h-3 text-text-secondary group-hover:text-accent" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-8 hover:border-accent/40 transition-colors group">
          <div className="w-12 h-12 bg-primary-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-6 border border-navy-dark">
            <Copy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-text-color mb-3">2. Copy a Blueprint</h3>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            Browse the library below. Click <strong className="text-text-color">"Copy Blueprint"</strong> on any card (e.g., "The Sales Sniper").
          </p>
          <div className="bg-accent/5 rounded-lg p-3 border border-accent/10">
            <div className="flex items-center gap-2 text-xs text-accent font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Blueprint copied to clipboard!</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-secondary-bg border border-navy-dark rounded-xl p-8 hover:border-accent/40 transition-colors group">
          <div className="w-12 h-12 bg-primary-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors mb-6 border border-navy-dark">
            <Play className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-text-color mb-3">3. Run the Agent</h3>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            Go back to your terminal, type <code className="bg-primary-bg px-1 py-0.5 rounded text-xs border border-navy-dark">claude</code> or <code className="bg-primary-bg px-1 py-0.5 rounded text-xs border border-navy-dark">gemini</code>, and paste the text.
          </p>
          <div className="bg-[#0D1117] rounded-lg p-3 font-mono text-xs text-green-400 border border-navy-dark">
            &gt; claude "Paste here..."
          </div>
        </div>
      </div>

      {/* 3. The "Pro Tip" Box */}
      <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="bg-yellow-500/10 p-3 rounded-lg text-yellow-500 shrink-0 border border-yellow-500/20">
          <Zap className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h4 className="font-bold text-yellow-500 text-sm mb-2 uppercase tracking-wide">Pro Tip</h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            Want to build something bigger? Use the <strong className="text-text-color">"Autonomous Project Manager"</strong> blueprint to chain multiple recipes together into a full workflow.
          </p>
        </div>
        <Link href="/blueprints/autonomous-project-manager">
          <button className="text-xs font-bold bg-yellow-500 text-black px-5 py-3 rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap shadow-lg shadow-yellow-500/10">
            View Project Manager
          </button>
        </Link>
      </div>

    </div>
  );
};

export default HowToUseGuide;
