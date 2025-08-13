export default function Hero() {
  return (
    <section className="relative max-w-4xl mx-auto px-4 py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl shadow-sm">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">AI examples you can copy & try</h1>
        <p className="mt-4 text-lg text-slate-600">
          Short, visual examples of people playing with AI — prompts, workflows, threads, videos. Curated for
          non-technical tinkerers.
        </p>
        <div className="mt-8">
          <a
            href="#newsletter"
            className="inline-block rounded-xl px-6 py-3 bg-slate-900 text-white font-medium shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Get weekly examples
          </a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-3xl -z-0"></div>
    </section>
  )
}
