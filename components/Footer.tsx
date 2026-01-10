import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-bg py-8 border-t border-navy-dark">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center flex-wrap gap-6 text-sm font-mono">
          <Link href="/state-of-ai-2026" className="text-accent hover:underline decoration-accent/50 underline-offset-4">
            State of AI 2026
          </Link>
          <Link href="/blueprints" className="text-text-secondary hover:text-accent transition-colors">
            Blueprints
          </Link>
          <Link href="/learn-ai" className="text-text-secondary hover:text-accent transition-colors">
            Learn AI
          </Link>
          <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">
            About
          </Link>
        </div>
        <p className="text-text-secondary text-sm font-mono opacity-60">
          AI Tinkering Examples <span className="text-text-secondary">&copy; {new Date().getFullYear()}</span> &mdash; Made for curious minds
        </p>
      </div>
    </footer>
  );
}
