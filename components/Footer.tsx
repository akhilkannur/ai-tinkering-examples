import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-bg pt-16 pb-12 border-t border-navy-dark font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Company */}
          <div>
            <h4 className="font-bold text-text-color mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/#newsletter" className="hover:text-accent transition-colors">Newsletter</Link>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Twitter / X</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-bold text-text-color mb-4">Discover</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/500-ways-to-use-llms-for-work" className="hover:text-accent transition-colors font-medium text-text-color/80">
                  500+ AI Blueprints
                </Link>
              </li>
              <li>
                <Link href="/state-of-ai-2026" className="hover:text-accent transition-colors">
                  State of AI 2026
                </Link>
              </li>
              <li>
                <Link href="/learn-ai" className="hover:text-accent transition-colors">
                  Learn AI
                </Link>
              </li>
              <li>
                <Link href="/ai-workplace-personality" className="hover:text-accent transition-colors">
                  AI Personality Quiz
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  Guides & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Blueprints by Role */}
          <div>
            <h4 className="font-bold text-text-color mb-4">Blueprints by Role</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/role/sales-ops" className="hover:text-accent transition-colors">Sales Ops</Link>
              </li>
              <li>
                <Link href="/role/marketing-ops" className="hover:text-accent transition-colors">Marketing Ops</Link>
              </li>
              <li>
                <Link href="/role/seo" className="hover:text-accent transition-colors">SEO & Content</Link>
              </li>
              <li>
                <Link href="/role/growth" className="hover:text-accent transition-colors">Growth</Link>
              </li>
              <li>
                <Link href="/role/paid-media" className="hover:text-accent transition-colors">Paid Media</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold text-text-color mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-dark text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm opacity-60">
            Real AI Examples &copy; {new Date().getFullYear()} &mdash; Automate your work with structured blueprints.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary/40">
            <span>Built for Gemini CLI</span>
            <span>•</span>
            <span>Claude Code</span>
            <span>•</span>
            <span>Cursor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
