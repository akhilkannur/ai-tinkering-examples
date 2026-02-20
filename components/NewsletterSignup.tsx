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
    <div id="newsletter" className="max-w-2xl mx-auto p-8 md:p-12 my-12 border-4 border-black bg-white brutalist-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
      
      <h2 className="text-3xl md:text-5xl font-display text-black uppercase leading-[0.9] glitch-text" data-text="JOIN THE LAB">Join the <span className="text-[#ff00ff]">Lab</span></h2>
      <p className="text-sm text-black font-black font-mono mt-4 leading-relaxed uppercase tracking-tighter italic border-l-4 border-[#ccff00] pl-4">
        // Free blueprints starter pack and occasional updates on AI tactics.
      </p>
      
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
        <input 
          aria-label="email" 
          placeholder="ENTER_EMAIL_FOR_ACCESS" 
          className="flex-1 px-6 py-4 bg-gray-50 border-2 border-black text-black focus:bg-[#ccff00] outline-none font-display text-base uppercase placeholder:text-gray-300" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <button 
          type="submit"
          className="px-10 py-4 bg-black text-[#ccff00] font-display uppercase text-xl transition-all brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:bg-gray-400"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'WAITING...' : 'Join_Now'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-6 p-4 border-2 border-black font-black font-mono text-xs uppercase tracking-widest ${status === 'success' ? 'bg-[#ccff00]/20 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  )
}
