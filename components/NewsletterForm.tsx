import React, { useState } from 'react';

export default function NewsletterForm() {
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
      <div className="py-4 text-center">
        <p className="text-accent font-bold">✓ Welcome to the Lab! Check your inbox.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          placeholder="your@email.com" 
          required
          className="flex-1 px-4 py-3 bg-primary-bg border border-navy-dark text-text-color focus:ring-2 focus:ring-accent outline-none font-sans text-sm" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />
        <button 
          type="submit"
          className="px-6 py-3 bg-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-accent-hover transition-colors disabled:bg-gray-600"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Joining...' : 'Join'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-2 text-center">Something went wrong. Try again?</p>
      )}
      <p className="text-[10px] text-text-secondary mt-3 font-sans text-center uppercase tracking-tighter opacity-50">
        Zero spam. Just 3 field-tested AI plays every week.
      </p>
    </div>
  );
}
