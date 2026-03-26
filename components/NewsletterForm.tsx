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
      setErrorMessage(err.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-2 px-4 border border-black text-center">
        <p className="text-black font-sans text-sm font-medium">✓ Check your inbox to confirm.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-0 border-2 border-black focus-within:ring-2 focus-within:ring-black transition-all">
        <input 
          type="email" 
          placeholder="your@email.com" 
          required
          className="flex-1 px-4 py-3 bg-white text-primary-text font-sans text-sm outline-none placeholder:text-gray-400" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button 
          type="submit"
          className="px-6 py-3 bg-[#ff00ff] text-white font-sans text-sm font-bold hover:bg-black disabled:bg-gray-400 transition-all uppercase tracking-widest"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-600 font-medium text-[10px] mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
