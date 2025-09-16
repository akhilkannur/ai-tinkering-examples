import React from 'react'

export default function NewsletterSignup() {
  const embed = process.env.NEXT_PUBLIC_BEEHIIV_EMBED || ''
  
  return (
    <div id="newsletter" className="max-w-2xl mx-auto p-6 my-8 border rounded-2xl">
      <h3 className="text-lg font-semibold">Get a weekly roundup</h3>
      <p className="text-sm text-slate-600 mt-2">Handpicked AI tinkering examples delivered weekly.</p>
      {embed ? (
        <div className="mt-4" dangerouslySetInnerHTML={{__html: embed}} />
      ) : (
        <form className="mt-4 flex gap-2">
          <input 
            aria-label="email" 
            placeholder="your@email.com" 
            className="flex-1 px-3 py-2 border rounded-lg" 
            type="email"
          />
          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
