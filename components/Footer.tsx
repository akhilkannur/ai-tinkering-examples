import React from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-primary-text pt-xxl pb-xl border-t border-border-color font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-lg md:px-[48px] relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-xl mb-xl">
          {/* Column 1: Site */}
          <div>
            <h4 className="text-[0.75rem] font-semibold text-primary-text uppercase tracking-[0.05em] mb-lg">Site</h4>
            <ul className="space-y-sm text-[0.875rem] font-normal text-secondary-text">
              <li>
                <Link href="/about" className="hover:text-primary-text transition-colors">About</Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary-text transition-colors">Examples</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-primary-text transition-colors">Tool Directory</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-text transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Connect */}
          <div>
            <h4 className="text-[0.75rem] font-semibold text-primary-text uppercase tracking-[0.05em] mb-lg">Connect</h4>
            <ul className="space-y-sm text-[0.875rem] font-normal text-secondary-text">
              <li>
                <Link href="/#newsletter" className="hover:text-primary-text transition-colors">Newsletter</Link>
              </li>
              <li>
                <a href="https://salestools.club/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-text transition-colors">
                  Salestools Club
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-[0.75rem] font-semibold text-primary-text uppercase tracking-[0.05em] mb-lg">Legal</h4>
            <ul className="space-y-sm text-[0.875rem] font-normal text-secondary-text">
              <li>
                <Link href="/privacy" className="hover:text-primary-text transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-text transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-lg border-t border-border-color flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex items-center gap-4 group">
             <div className="w-6 h-6 bg-accent-dark text-white flex items-center justify-center text-[0.75rem] font-semibold rounded-[4px_4px_12px_4px]">R</div>
             <p className="text-secondary-text text-[0.75rem] font-normal">
               &copy; {new Date().getFullYear()} Real AI Examples. Curated for business professionals.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
