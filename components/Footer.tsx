import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-micro-fg py-24 border-t border-micro-layer-1 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Column 1: Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-5 h-5 bg-micro-fg rounded flex items-center justify-center transition-transform group-hover:scale-105"></div>
                <span className="text-lg font-bold tracking-tight text-micro-fg">Real AI</span>
            </Link>
            <p className="text-sm font-bold text-micro-muted max-w-xs leading-relaxed uppercase tracking-wider">
              Real-world AI workflows and practical automations for business professionals.
            </p>
          </div>

          {/* Column 2: Site */}
          <div>
            <h4 className="text-[11px] font-bold text-micro-fg uppercase tracking-[0.1em] mb-6">Site</h4>
            <ul className="space-y-3 text-[13px] font-bold text-micro-muted">
              <li><Link href="/about" className="hover:text-micro-fg transition-colors">ABOUT</Link></li>
              <li><Link href="/" className="hover:text-micro-fg transition-colors">EXAMPLES</Link></li>
              <li><Link href="/tools" className="hover:text-micro-fg transition-colors">TOOLS</Link></li>
              <li><Link href="/blog" className="hover:text-micro-fg transition-colors">BLOG</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-[11px] font-bold text-micro-fg uppercase tracking-[0.1em] mb-6">Legal</h4>
            <ul className="space-y-3 text-[13px] font-bold text-micro-muted">
              <li><Link href="/privacy" className="hover:text-micro-fg transition-colors">PRIVACY</Link></li>
              <li><Link href="/terms" className="hover:text-micro-fg transition-colors">TERMS</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-micro-layer-1 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-micro-muted text-[11px] font-bold uppercase tracking-widest">
             &copy; {new Date().getFullYear()} Real AI Examples.
           </p>
        </div>
      </div>
    </footer>
  );
}
