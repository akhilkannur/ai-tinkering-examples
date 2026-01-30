import React from 'react';
import { Terminal, Copy, Play, CheckCircle2 } from 'lucide-react';

const HowToUseGuide = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-0">
      
      {/* The 3-Step Setup - Simplified and compact */}
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

export default HowToUseGuide;
