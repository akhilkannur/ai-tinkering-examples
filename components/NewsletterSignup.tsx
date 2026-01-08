import React, { useState } from 'react'

export default function NewsletterSignup() {
  const embed = process.env.NEXT_PUBLIC_BEEHIIV_EMBED || ''
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }
  
  return (
    <div id="newsletter" className="max-w-2xl mx-auto p-6 my-8 border rounded-2xl bg-white shadow-sm">
      <h2 className="text-3xl font-extrabold tracking-tight text-[#001858] sm:text-4xl">Stay in the Loop</h2>
      <p className="text-sm text-slate-600 mt-2">Handpicked AI tinkering examples delivered weekly.</p>
      {embed ? (
        <div className="mt-4" dangerouslySetInnerHTML={{__html: embed}} />
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
          <input 
            aria-label="email" 
            placeholder="your@email.com" 
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent outline-none" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading' || status === 'success'}
          />
          <button 
            type="submit"
            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition-colors disabled:bg-gray-400"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      {message && (
        <p className={`mt-3 text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
