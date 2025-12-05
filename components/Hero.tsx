

import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
           <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-50 animate-blob" />
           <div className="absolute top-40 left-0 w-72 h-72 bg-bright-pink/10 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative py-16 sm:py-24 text-center">

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 relative">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xl shadow-accent/20 ring-4 ring-white">
                <Image
                  src="/hero_image.png"
                  alt="Hero image for AI Examples"
                  layout="fill"
                  objectFit="cover"
                  className="mx-auto"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-slate-900 font-headline max-w-4xl">
              Weekly AI examples you can <span className="text-transparent bg-clip-text bg-modern-gradient">copy & try</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              A newsletter of real AI use cases from real people. Practical and simple for non-technical thinkers.
            </p>

            <div className="max-w-[500px] w-full mx-auto beehiiv-form-container bg-white p-2 rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100">
              <iframe src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" data-test-id="beehiiv-embed" style={{width: '100%', height: '147px'}} frameBorder="0" scrolling="no" className="mx-auto block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}