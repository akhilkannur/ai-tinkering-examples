import React, { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('✓ Welcome to the Lab! Check your inbox.')
        setEmail('')
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to subscribe')
      }
    } catch (err: any) {
      console.error('Newsletter submission error:', err);
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }
  
  return (
    <div id="newsletter" className="max-w-2xl mx-auto p-6 sm:p-8 my-8 border border-navy-dark bg-secondary-bg shadow-2xl relative overflow-hidden rounded-xl">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-text-color uppercase leading-tight">Join the <span className="text-accent">Lab</span></h2>
      <p className="text-xs sm:text-sm text-text-secondary mt-2 font-sans leading-relaxed">Free blueprints starter pack and occasional updates on actionable AI tactics. If they suck, unsubscribe. We won't be offended.</p>
      
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
        <input 
          aria-label="email" 
          placeholder="your@email.com" 
          className="flex-1 px-4 py-3 bg-primary-bg border border-navy-dark text-text-color focus:ring-2 focus:ring-accent outline-none font-sans text-sm sm:text-base" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <button 
          type="submit"
          className="px-8 py-3 bg-accent text-white font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-accent-hover transition-all disabled:bg-gray-600 shadow-lg hover:shadow-accent/20 rounded-md sm:rounded-none"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <p className={`mt-4 text-sm font-bold ${status === 'success' ? 'text-accent' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
