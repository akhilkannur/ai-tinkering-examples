

import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden border-b border-navy-dark">
      {/* Background Decoration - Simplified for Tech Lab look */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative py-16 sm:py-24 text-center">

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 relative">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-none overflow-hidden border border-navy-dark bg-secondary-bg">
                <Image
                  src="/hero_image.png"
                  alt="Hero image for AI Examples"
                  layout="fill"
                  objectFit="cover"
                  className="mx-auto hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-headline font-bold tracking-tight mb-6 text-text-color max-w-4xl uppercase">
              Weekly AI examples you can <span className="text-accent bg-clip-text">copy & try</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
              A newsletter of real AI use cases from real people. Practical and simple for non-technical thinkers.
            </p>

            <div className="max-w-[500px] w-full mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}