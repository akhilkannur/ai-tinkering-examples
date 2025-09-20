import { ArrowRight } from 'lucide-react'
import Script from 'next/script'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 flex flex-col md:flex-row items-center gap-8">

          <div className="relative z-10 order-first md:order-first text-center md:text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-text-color font-headline">
              AI examples you can copy & try
            </h1>

            <p className="text-lg sm:text-xl text-light-purple max-w-3xl mx-auto md:mx-0 mb-10">
              Curated workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.
            </p>

            <div style={{width: "660px", height: "307px", maxWidth: "100%"}}>
              <Script async src="https://subscribe-forms.beehiiv.com/embed.js" />
              <iframe src="https://subscribe-forms.beehiiv.com/3881a34c-be47-4794-a1d5-73fe5d800844" className="beehiiv-embed" data-test-id="beehiiv-embed" frameBorder="0" scrolling="no" style={{width: "100%", height: "100%", margin: "0", borderRadius: "0px !important", backgroundColor: "transparent", boxShadow: "0 0 #0000"}}></iframe>
            </div>
          </div>

          <div className="relative z-10 order-last md:order-last flex justify-center">
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