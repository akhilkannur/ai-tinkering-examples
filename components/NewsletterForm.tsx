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
      <div className="py-3 px-6 bg-white border border-coffee-200 rounded-full text-center shadow-soft">
        <p className="text-coffee-900 font-sans text-sm font-medium">✓ Check your inbox to confirm.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row group shadow-soft hover:shadow-soft-hover transition-all duration-300 bg-white rounded-full p-1.5 border border-coffee-200">
        <div className="flex-1 flex items-center bg-transparent px-4 relative">
          <i className="ph ph-envelope-simple text-coffee-400 text-xl absolute"></i>
          <input 
            type="email" 
            placeholder="Get weekly teardowns..." 
            required
            className="w-full py-3 pl-8 pr-4 text-base focus:outline-none font-light placeholder-coffee-400 bg-transparent text-coffee-900" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
        </div>
        <button 
          type="submit"
          className="bg-coffee-900 text-white px-8 py-4 sm:py-3 rounded-full font-medium tracking-wide hover:bg-coffee-700 transition-colors flex items-center justify-center text-sm whitespace-nowrap ml-1 disabled:bg-coffee-300"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '...' : 'Join 14k+ Readers'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 font-medium text-[10px] mt-2 text-center">{errorMessage}</p>
      )}
    </div>
  );
}
