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
      <div className="py-6 px-10 bg-[#ccff00]/20 border-4 border-black brutalist-shadow-sm text-center">
        <p className="text-black font-display uppercase">✓ Welcome to the Lab! Check your inbox.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input 
          type="email" 
          placeholder="ENTER_EMAIL_FOR_ACCESS" 
          required
          className="flex-1 px-6 py-4 bg-white border-2 border-black text-black font-display text-base uppercase focus:bg-[#ccff00] outline-none transition-all placeholder:text-gray-500" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button 
          type="submit"
          className="px-10 py-4 bg-black text-[#ccff00] font-display uppercase text-xl transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:bg-gray-400"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'WAITING...' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-600 font-black font-mono text-xs mt-4 uppercase text-center tracking-tighter animate-pulse">⚠️ {errorMessage}</p>
      )}
    </div>
  );
}
