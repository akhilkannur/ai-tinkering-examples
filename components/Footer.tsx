import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-12 border-t-4 border-white font-sans relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Company */}
          <div>
            <h4 className="font-display text-lg text-punk-lime uppercase tracking-widest mb-6">// SITE</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/about" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Our Mission</Link>
              </li>
              <li>
                <Link href="/agent-setup-service" className="text-punk-magenta hover:text-white transition-colors">Setup Service</Link>
              </li>
              <li>
                <Link href="/build-club" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy text-punk-lime">Build Club</Link>
              </li>
              <li>
                <Link href="/#newsletter" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Newsletter</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-display text-lg text-punk-cyan uppercase tracking-widest mb-6">// DISCOVER</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/generators/docs-to-context" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  Website to Markdown Generator
                </Link>
              </li>
              <li>
                <Link href="/ai-workplace-quiz" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  AI Readiness Quiz
                </Link>
              </li>
              <li>
                <Link href="/prompt-bundle" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  AI Prompt Bundle
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  Micro-PE Directory
                </Link>
              </li>
              <li>
                <Link href="/learn-ai" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">
                  Learn AI
                </Link>
              </li>
              <li>
                <a href="https://salestools.club/" target="_blank" rel="noopener noreferrer" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy uppercase">
                  Salestools club
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Playbooks */}
          <div>
            <h4 className="font-display text-lg text-punk-lime uppercase tracking-widest mb-6">// BY ROLE</h4>
            <ul className="space-y-3 text-sm font-black uppercase tracking-widest">
              <li>
                <Link href="/role/sales-ops" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Sales Ops</Link>
              </li>
              <li>
                <Link href="/role/marketing-ops" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Marketing Ops</Link>
              </li>
              <li>
                <Link href="/role/seo" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">SEO & Search</Link>
              </li>
              <li>
                <Link href="/role/growth" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Growth</Link>
              </li>
              <li>
                <Link href="/role/paid-media" className="hover:text-punk-magenta transition-colors hover:underline decoration-wavy">Paid Ads</Link>
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
               &copy; {new Date().getFullYear()} Real AI Examples. Handcrafted for business professionals and AI tinkerers.
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