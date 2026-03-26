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
        setMessage('✓ Welcome! Please check your inbox for a confirmation email.')
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
    <div id="newsletter" className="max-w-3xl mx-auto p-xl md:p-xxl my-xxl bg-hero-tint rounded-md border border-border-color text-center relative overflow-hidden">
      <div className="max-w-lg mx-auto relative z-10">
        <h2 className="text-[2rem] font-medium tracking-tight text-primary-text mb-md">Join the Newsletter</h2>
        <p className="text-[1rem] text-secondary-text mb-xl leading-relaxed">
          Get practical AI workflows, automation blueprints, and tactical guides delivered directly to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-sm">
          <input 
            aria-label="Email address" 
            placeholder="your@email.com" 
            className="flex-1 px-lg py-sm bg-white border border-border-color rounded-sm text-primary-text focus:border-secondary-text outline-none text-[1rem] placeholder:text-light-placeholder transition-all" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading' || status === 'success'}
          />
          <button 
            type="submit"
            className="px-xl py-sm bg-accent-dark text-white rounded-sm text-[0.875rem] font-medium hover:bg-black transition-all disabled:opacity-50"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-lg text-[0.875rem] font-medium ${status === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
