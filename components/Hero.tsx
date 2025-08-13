import React from 'react'

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold">AI examples you can copy & try</h1>
      <p className="mt-4 text-lg text-slate-600">Short, visual examples of people playing with AI — prompts, workflows, threads, videos. Curated for non-technical tinkerers.</p>
      <div className="mt-6">
        <a href="#newsletter" className="inline-block rounded-xl px-5 py-3 bg-black text-white">Get weekly examples</a>
      </div>
    </section>
  )
}
