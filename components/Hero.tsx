

import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

export default function Hero() {
  return (
    <div className="relative bg-brand-beige text-brand-navy overflow-hidden border-b border-brand-navy/10">
      {/* Background Decoration - Simplified for Tech Lab look */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#0C2340_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative py-12 text-center">

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 relative">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-none overflow-hidden border border-brand-navy bg-white">
                <Image
                  src="/hero_image.png"
                  alt="Hero image for AI Examples"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="mx-auto hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-headline font-bold tracking-tight mb-4 text-brand-navy max-w-4xl uppercase">
              AI Workflows You Can <span className="text-accent bg-clip-text">Copy.</span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-navy/70 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Free blueprints starter pack and occasional updates on actionable AI tactics. If they suck, unsubscribe. I won't be offended.
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