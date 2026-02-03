import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-bg pt-20 pb-12 border-t border-white/5 font-sans relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Company */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6">[ _SOURCE ]</h4>
            <ul className="space-y-3 text-sm text-text-secondary font-light">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Mission</Link>
              </li>
              <li>
                <Link href="/agent-setup-service" className="hover:text-accent transition-colors font-bold text-accent italic">Setup Service</Link>
              </li>
              <li>
                <Link href="/#newsletter" className="hover:text-white transition-colors">Intelligence Feed</Link>
              </li>
              <li>
                <a href="https://twitter.com/realaiexamples" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6">[ _REPOSITORY ]</h4>
            <ul className="space-y-3 text-sm text-text-secondary font-light">
              <li>
                <Link href="/500-ways-to-use-llms-for-work" className="hover:text-white transition-colors">
                  700+ Blueprints
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-white transition-colors">
                  Micro-PE Match
                </Link>
              </li>
              <li>
                <Link href="/learn-ai" className="hover:text-white transition-colors">
                  Terminal 101
                </Link>
              </li>
              <li>
                <Link href="/ai-workplace-quiz" className="hover:text-white transition-colors">
                  System Audit Quiz
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Engineering Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Playbooks */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6">[ _DEPARTMENTS ]</h4>
            <ul className="space-y-3 text-sm text-text-secondary font-light">
              <li>
                <Link href="/role/sales-ops" className="hover:text-white transition-colors font-mono text-[11px]">SALES_OPS</Link>
              </li>
              <li>
                <Link href="/role/marketing-ops" className="hover:text-white transition-colors font-mono text-[11px]">MARKETING_OPS</Link>
              </li>
              <li>
                <Link href="/role/seo" className="hover:text-white transition-colors font-mono text-[11px]">SEO_LOGIC</Link>
              </li>
              <li>
                <Link href="/role/growth" className="hover:text-white transition-colors font-mono text-[11px]">GROWTH_HACKING</Link>
              </li>
              <li>
                <Link href="/role/paid-media" className="hover:text-white transition-colors font-mono text-[11px]">PAID_ACQUISITION</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-6">[ _PROTOCOLS ]</h4>
            <ul className="space-y-3 text-sm text-text-secondary font-light">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">Security & Privacy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Access Protocols</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 group">
             <div className="w-8 h-8 rounded-lg bg-secondary-bg border border-white/10 flex items-center justify-center text-accent group-hover:border-accent/30 transition-colors">
                <Terminal className="w-4 h-4" />
             </div>
             <p className="text-text-secondary text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
               &copy; {new Date().getFullYear()} REAL_AI_EXAMPLES_DPT.MISSION_COMPLETE.
             </p>
          </div>
          
          <div className="flex items-center gap-6 px-6 py-3 bg-secondary-bg/30 border border-white/5 rounded-2xl">
            <div className="flex items-center gap-2 text-[9px] font-mono text-text-secondary uppercase tracking-widest">
                <Cpu className="w-3 h-3 text-accent" /> Optimized_for:
            </div>
            <div className="flex items-center gap-4 text-[9px] font-mono font-bold text-white uppercase tracking-widest opacity-60">
                <span>Gemini_2.0</span>
                <span className="text-accent">/</span>
                <span>Claude_Code</span>
                <span className="text-accent">/</span>
                <span>Cursor</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}