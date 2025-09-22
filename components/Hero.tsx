import { ArrowRight } from 'lucide-react'
import Script from 'next/script'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative py-8 sm:py-12 text-center">

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-text-color font-headline">
              Weekly AI examples you can copy & try
            </h1>

            <p className="text-lg sm:text-xl text-light-purple max-w-3xl mx-auto mb-8">
              A newsletter of real AI use cases from real people. Practical and simple for non-technical thinkers
            </p>

            <div style={{maxWidth: "500px", overflow: "hidden", height: "140px", marginBottom: "0px", margin: "0 auto"}}>
              <iframe src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" data-test-id="beehiiv-embed" width="500" height="147" frameBorder="0" scrolling="no" className="mx-auto block" style={{margin: '0', borderRadius: '0px', backgroundColor: 'transparent', maxWidth: '100%', transform: 'translateY(0px)'}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}