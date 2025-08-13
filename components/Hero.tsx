export default function Hero() {
  return (
    <section className="relative max-w-4xl mx-auto px-4 py-16 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 rounded-2xl shadow-lg overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">AI examples you can copy & try</h1>
        <p className="mt-4 text-lg text-slate-600">
          Short, visual examples of people playing with AI — prompts, workflows, threads, videos. Curated for
          non-technical tinkerers.
        </p>
        <div className="mt-8">
          <a
            href="#newsletter"
            className="inline-block rounded-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
          >
            Get weekly examples
          </a>
        </div>
      </div>

      <div className="absolute top-4 right-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-8 left-12 w-24 h-24 bg-gradient-to-tr from-purple-200 to-pink-300 rounded-full opacity-50 blur-lg"></div>
      <div className="absolute top-1/2 right-16 w-16 h-16 bg-gradient-to-bl from-blue-200 to-cyan-300 rounded-full opacity-40 blur-md"></div>
      <div className="absolute bottom-4 right-1/3 w-20 h-20 bg-gradient-to-tl from-green-200 to-emerald-300 rounded-full opacity-45 blur-lg"></div>

      <div className="absolute top-12 left-8 w-8 h-8 bg-pink-300 rounded-lg rotate-12 opacity-30"></div>
      <div className="absolute bottom-12 right-12 w-6 h-6 bg-purple-300 rounded-full opacity-40"></div>
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-orange-300 rotate-45 opacity-25"></div>
    </section>
  )
}
