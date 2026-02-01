import React, { useState } from 'react';
import { Download, Database, Check, X } from 'lucide-react';

export default function DatabaseDownloadCta() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: 'database-download' }),
      });

      if (response.ok) {
        setStatus('success');
        // In a real scenario, you'd trigger the download here or redirect to a thank you page with the link
        // window.location.href = '/downloads/500-ai-blueprints.csv'; 
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-text-color mb-2">Check your inbox!</h3>
        <p className="text-text-secondary">We've sent the database link to {email}.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-secondary-bg border border-navy-dark rounded-2xl shadow-2xl p-8 md:p-12 text-center md:text-left">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
        <div className="flex-shrink-0 bg-primary-bg p-6 rounded-2xl border border-navy-dark shadow-inner rotate-3 transform transition-transform hover:rotate-0">
          <Database className="w-16 h-16 text-accent mb-2" />
          <span className="block text-xs font-mono text-text-secondary text-center mt-2">500_ROWS.CSV</span>
        </div>

        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-text-color mb-4 tracking-tight">
            Download the <span className="text-accent">Full Database</span>
          </h2>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            Don't want to browse? Get all 500+ blueprints in a sortable CSV/Notion file. 
            Includes categories, tools, and difficulty scores.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              required
              className="flex-grow bg-primary-bg border border-navy-dark rounded-lg px-4 py-3 text-text-color focus:ring-2 focus:ring-accent focus:outline-none placeholder:text-text-secondary/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'loading' ? 'Sending...' : (
                <>
                  <Download className="w-5 h-5" /> Download CSV
                </>
              )}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
          <p className="text-xs text-text-secondary/60 mt-3 flex items-center gap-1">
             <Check className="w-3 h-3" /> Free for a limited time
          </p>
        </div>
      </div>
    </div>
  );
}
