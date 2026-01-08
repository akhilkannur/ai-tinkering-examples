import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-secondary-bg py-8 border-t border-navy-dark">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-text-secondary text-sm font-mono">
          AI Tinkering Examples <span className="text-text-secondary">&copy; {new Date().getFullYear()}</span> &mdash; Made for curious minds
        </p>
      </div>
    </footer>
  );
}
