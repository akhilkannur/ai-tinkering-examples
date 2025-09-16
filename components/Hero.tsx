export default function Hero() {
  return (
    <section className="relative max-w-4xl mx-auto px-4 py-16 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-pink-200 via-orange-200 to-yellow-200 rounded-2xl shadow-2xl">
        {/* Animated gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/30 via-purple-300/20 via-pink-300/30 to-orange-300/20 animate-pulse rounded-2xl"></div>
        
        {/* Moving gradient orbs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-60 blur-2xl animate-bounce [animation-duration:3s]"></div>
        <div className="absolute top-1/2 -right-10 w-36 h-36 bg-gradient-to-bl from-violet-400 to-purple-400 rounded-full opacity-50 blur-2xl animate-bounce [animation-duration:4s] [animation-delay:1s]"></div>
        <div className="absolute -bottom-10 left-1/3 w-32 h-32 bg-gradient-to-tr from-orange-400 to-yellow-400 rounded-full opacity-55 blur-2xl animate-bounce [animation-duration:5s] [animation-delay:2s]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-8 left-12 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg rotate-12 opacity-70 animate-spin [animation-duration:8s]"></div>
        <div className="absolute top-20 right-16 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rotate-45 opacity-60 animate-ping [animation-duration:3s]"></div>
        <div className="absolute bottom-16 right-20 w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-50 animate-pulse [animation-duration:4s]"></div>
        <div className="absolute bottom-24 left-16 w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-65 animate-bounce [animation-duration:6s]"></div>
        
        {/* Subtle mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30 rounded-2xl"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(251, 146, 60, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 60% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
            `
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 drop-shadow-sm">
          AI examples you can copy & try
        </h1>
        <p className="mt-4 text-lg text-slate-700 drop-shadow-sm max-w-2xl">
          Short, visual examples of people playing with AI — prompts, workflows, threads, videos. Curated for
          non-technical tinkerers.
        </p>
        <div className="mt-8">
          <a
            href="#newsletter"
            className="inline-block rounded-xl px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-sm border border-white/20"
          >
            <span className="relative z-10">Get weekly examples</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>

      {/* Decorative elements with enhanced gradients */}
      <div className="absolute top-6 right-10 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 animate-ping [animation-duration:2s]"></div>
      <div className="absolute top-12 right-6 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-70 animate-pulse [animation-duration:3s]"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-bounce [animation-duration:4s]"></div>
      <div className="absolute bottom-20 left-4 w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full opacity-50 animate-pulse [animation-duration:5s]"></div>
      
      {/* Sparkle effects */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-80 animate-ping [animation-duration:1.5s]"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-70 animate-ping [animation-duration:2.5s] [animation-delay:0.5s]"></div>
      <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full opacity-60 animate-ping [animation-duration:3.5s] [animation-delay:1s]"></div>
    </section>
  )
}
