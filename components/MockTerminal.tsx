import React, { useState, useEffect } from 'react';

const lines = [
  { text: "gemini run @lead-source-truth-auditor.md", type: "input" },
  { text: "● Phase 1: Loading 'source_audit.csv'...", type: "system" },
  { text: "● Phase 2: Analyzing 1,200 leads for UTM vs Self-Report mismatches...", type: "system" },
  { text: "✔ 142 'Dark Social' leads identified (Podcast mentions with Direct UTMs).", type: "success" },
  { text: "✔ Action List generated: 'dark_social_campaign.csv'", type: "success" },
  { text: "Report: \"Attribution truth corrected. Dark Social ROI is 4.2x higher than reported.\"", type: "report" }
];

export default function MockTerminal() {
  const [visibleLines, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => setVisibleCount(prev => prev + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setVisibleCount(0), 5000); // Reset after delay
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div className="bg-[#0D1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm w-full max-w-2xl mx-auto relative">
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-20"></div>
      
      <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5 relative z-10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold ml-2">Agent Execution Preview</span>
      </div>
      <div className="p-6 min-h-[220px] flex flex-col gap-2">
        {lines.slice(0, visibleLines).map((line, idx) => (
          <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-500">
            {line.type === 'input' && (
              <span className="text-blue-400">
                <span className="text-green-400 mr-2">$</span>
                {line.text}
              </span>
            )}
            {line.type === 'system' && <span className="text-white/60">{line.text}</span>}
            {line.type === 'success' && <span className="text-green-400">{line.text}</span>}
            {line.type === 'report' && (
              <div className="mt-2 p-3 bg-white/5 rounded border border-white/10 text-blue-200 italic">
                {line.text}
              </div>
            )}
          </div>
        ))}
        {visibleLines < lines.length && (
          <div className="w-2 h-5 bg-white/40 animate-pulse inline-block ml-1"></div>
        )}
      </div>
    </div>
  );
}
