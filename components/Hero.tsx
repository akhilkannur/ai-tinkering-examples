

import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-hero-gradient opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30 animate-blob-pulse animation-delay-2000" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-light/10 rounded-full blur-3xl opacity-30 animate-blob-pulse animation-delay-4000" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative py-16 sm:py-24 text-center">

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 relative">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-navy-dark shadow-accent-glow">
                <Image
                  src="/hero_image.png"
                  alt="Hero image for AI Examples"
                  layout="fill"
                  objectFit="cover"
                  className="mx-auto"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-headline font-bold tracking-tight mb-6 text-text-color max-w-4xl">
              Weekly AI examples you can <span className="text-transparent bg-clip-text bg-modern-gradient">copy & try</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              A newsletter of real AI use cases from real people. Practical and simple for non-technical thinkers.
            </p>

            <div className="max-w-[500px] w-full mx-auto beehiiv-form-container bg-secondary-bg p-2 rounded-xl border border-navy-dark shadow-custom-light">
              <iframe src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" data-test-id="beehiiv-embed" style={{width: '100%', height: '147px'}} frameBorder="0" scrolling="no" className="mx-auto block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}