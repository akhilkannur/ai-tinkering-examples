import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 flex flex-col md:flex-row items-center md:justify-between gap-8">

          <div className="relative z-10 text-center md:text-left md:w-1/2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-text-color font-headline">
              AI Examples, Reimagined
            </h1>

            <p className="text-lg sm:text-xl text-light-purple max-w-3xl mx-auto md:mx-0 mb-10">
              A curated collection of prompts, workflows, and AI experiments, designed to inspire and empower your creative journey.
            </p>

            <a 
              href="#newsletter"
              className="group inline-flex items-center gap-3 bg-accent text-electric-blue px-8 py-4 text-lg font-bold rounded-full hover:bg-accent hover:text-electric-blue transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20"
            >
              Get Weekly Inspiration
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </div>

          <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png"
              alt="Hero Image"
              width={500} 
              height={500} 
              className="object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}