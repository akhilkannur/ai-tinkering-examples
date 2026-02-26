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
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#ccff00]/20 border-4 border-black brutalist-shadow p-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-black border-2 border-black mb-6 rotate-3">
          <Check className="w-10 h-10 text-[#ccff00] stroke-[4px]" />
        </div>
        <h3 className="text-3xl font-display text-black mb-2 uppercase">Check your inbox!</h3>
        <p className="text-black font-black font-mono uppercase text-sm tracking-widest">// Database link sent to {email}.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white border-4 border-black brutalist-shadow p-8 md:p-12 text-center md:text-left">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
      
      <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
        <div className="flex-shrink-0 bg-black p-8 border-4 border-black brutalist-shadow-sm rotate-3 transform transition-transform hover:rotate-0 text-[#ccff00]">
          <Database className="w-16 h-16 stroke-[3px]" />
          <span className="block text-[10px] font-black font-mono text-center mt-4 uppercase tracking-widest">500_ROWS.CSV</span>
        </div>

        <div className="flex-grow">
          <h2 className="text-3xl md:text-4xl font-display text-black mb-4 uppercase leading-none">
            Get the <span className="text-[#ff00ff]">Full Database</span>
          </h2>
          <p className="text-lg text-black font-bold mb-8 uppercase leading-tight font-mono">
            // Get all 500+ blueprints in a sortable CSV/Notion file. 
            Includes categories, tools, and difficulty scores.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="ENTER_EMAIL_ADDRESS" 
              required
              className="flex-grow bg-gray-50 border-2 border-black px-6 py-4 text-black font-display text-sm uppercase focus:bg-[#ccff00] outline-none transition-all placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-black text-[#ccff00] font-display text-xl uppercase py-4 px-10 border-4 border-black brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-3 whitespace-nowrap"
            >
              {status === 'loading' ? 'WAITING...' : (
                <>
                  <Download className="w-6 h-6 stroke-[3px]" /> Download
                </>
              )}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-red-600 font-black font-mono text-xs mt-4 uppercase animate-pulse">⚠️ Something went wrong. Try again.</p>
          )}
          <div className="mt-6 flex items-center gap-2 text-[10px] font-black font-mono text-gray-500 uppercase tracking-widest bg-gray-50 px-2 py-1 border border-black inline-block">
             <Check className="w-3 h-3 stroke-[3px]" /> Free for a limited time
          </div>
        </div>
      </div>
    </div>
  );
}
