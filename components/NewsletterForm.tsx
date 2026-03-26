import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');
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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to subscribe');
      }
    } catch (err: any) {
      console.error('Newsletter submission error:', err);
      setErrorMessage(err.message || 'Something went wrong. Try again?');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-3 px-6 bg-[#ccff00] border-2 border-accent-dark shadow-brutalist-sm text-center">
        <p className="text-black font-mono text-[10px] font-bold uppercase tracking-widest">✓ Welcome! Check your inbox.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="email" 
          placeholder="your@email.com" 
          required
          className="flex-1 px-4 py-2 bg-white border-2 border-accent-dark text-primary-text font-sans text-sm focus:bg-hero-tint outline-none transition-all placeholder:text-light-placeholder" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-black text-[#ccff00] font-display uppercase text-xs font-black border-2 border-accent-dark shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:bg-gray-400 transition-all"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-600 font-bold font-mono text-[10px] mt-2 uppercase text-center tracking-tighter">⚠️ {errorMessage}</p>
      )}
    </div>
  );
}
