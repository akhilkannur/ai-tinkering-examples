import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 text-center">

          {/* Background Shapes */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-natsume-gradient rounded-full opacity-20 blur-3xl animate-blob"></div>
          <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-natsume-gradient rounded-full opacity-10 blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-natsume-gradient rounded-full opacity-10 blur-3xl animate-blob animation-delay-4000"></div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-natsume-gradient">
              AI Examples, Reimagined
            </h1>

            <p className="text-lg sm:text-xl text-light-purple max-w-3xl mx-auto mb-10">
              A curated collection of prompts, workflows, and AI experiments, designed to inspire and empower your creative journey.
            </p>

            <a 
              href="#newsletter"
              className="group inline-flex items-center gap-3 bg-accent text-primary-bg px-8 py-4 text-lg font-bold rounded-full hover:bg-bright-pink hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20"
            >
              Get Weekly Inspiration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}