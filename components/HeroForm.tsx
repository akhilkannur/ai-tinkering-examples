import React, { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';

export default function HeroForm() {
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
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#ccff00] border-4 border-black p-4 brutalist-shadow-sm font-display text-xs uppercase animate-in zoom-in duration-300">
        ✓ Pack Sent! Check your inbox.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full brutalist-shadow">
        <input 
          type="email" 
          placeholder="Enter your email for the free pack..." 
          required
          className="flex-1 px-4 py-4 bg-white border-4 border-black text-black font-display text-sm uppercase focus:bg-[#ccff00] outline-none transition-all placeholder:text-gray-600 min-w-0" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button 
          type="submit"
          className="px-8 py-4 bg-black text-[#ccff00] border-4 sm:border-l-0 border-black font-display uppercase text-sm hover:bg-[#ff00ff] hover:text-white transition-all disabled:bg-gray-400 whitespace-nowrap flex items-center justify-center gap-2 group"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : (
            <>
              Send Me The Pack <ArrowRight className="w-4 h-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
      <div className="flex items-center gap-2 px-1">
        <Zap className="w-3 h-3 text-[#ff00ff] fill-current" />
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-black/40 italic">
          5 starter blueprints included
        </span>
      </div>
    </div>
  );
}
