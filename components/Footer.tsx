import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t-4 border-white font-sans relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Site */}
          <div>
            <h4 className="font-display text-lg text-punk-lime uppercase tracking-widest mb-6">// SITE</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/about" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">About</Link>
              </li>
              <li>
                <Link href="/ai-examples" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Examples</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Tool Directory</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Get Started */}
          <div>
            <h4 className="font-display text-lg text-punk-cyan uppercase tracking-widest mb-6">// GET STARTED</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/agent-setup-service" className="text-punk-magenta hover:text-white transition-colors">Setup Sprint — $99</Link>
              </li>
              <li>
                <Link href="/setup/claude-code" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  Claude Code Guide
                </Link>
              </li>
              <li>
                <Link href="/setup/gemini-cli" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  Gemini CLI Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="font-display text-lg text-punk-lime uppercase tracking-widest mb-6">// CONNECT</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/#newsletter" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Newsletter</Link>
              </li>
              <li>
                <a href="https://salestools.club/" target="_blank" rel="noopener noreferrer" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy uppercase">
                  Salestools Club
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-display text-lg text-punk-cyan uppercase tracking-widest mb-6">// LEGAL</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/privacy" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 group">
             <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-black brutalist-shadow-sm group-hover:rotate-6 transition-transform">
                <Terminal className="w-5 h-5" />
             </div>
             <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">
               &copy; {new Date().getFullYear()} Real AI Examples. Curated for business professionals.
             </p>
          </div>
          
          <div className="flex items-center gap-6 px-6 py-3 bg-gray-900 border-2 border-white/20">
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                <Cpu className="w-3 h-3 text-punk-lime" /> Works with:
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono font-bold text-white uppercase tracking-widest opacity-80">
                <span>Claude</span>
                <span className="text-punk-magenta">/</span>
                <span>ChatGPT</span>
                <span className="text-punk-magenta">/</span>
                <span>Gemini</span>
                <span className="text-punk-magenta">/</span>
                <span>All Major Tools</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
