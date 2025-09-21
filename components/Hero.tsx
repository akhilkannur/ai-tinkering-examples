import { ArrowRight } from 'lucide-react'
import Script from 'next/script'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="relative z-10 order-first md:order-first text-center md:text-left flex-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-text-color font-headline">
              AI examples you can copy & try
            </h1>

            <p className="text-lg sm:text-xl text-light-purple max-w-3xl mx-auto md:mx-0 mb-10">
              Curated workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.
            </p>

            <div style={{maxWidth: "100%"}}>
              <iframe src="https://embeds.beehiiv.com/e3398e54-e0cf-44f9-a380-23571e7b542a?slim=true" data-test-id="beehiiv-embed" width="400" height="52" frameBorder="0" scrolling="no" className="mx-auto block" style={{margin: '0', borderRadius: '0px', backgroundColor: 'transparent', maxWidth: '100%'}} />
            </div>
          </div>

          <div className="relative z-10 order-last md:order-last flex justify-center flex-1">
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