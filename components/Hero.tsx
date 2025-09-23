

import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative bg-primary-bg text-text-color overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative py-8 sm:py-12 text-center">

          <div className="relative z-10">
            <div className="flex justify-center">
              <Image
                src="/favicon.png"
                alt="AI Examples Logo"
                width={128}
                height={128}
                className="mx-auto"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-text-color font-headline">
              Weekly AI examples you can copy & try
            </h1>

            <p className="text-lg sm:text-xl text-light-purple max-w-3xl mx-auto mb-8">
              A newsletter of real AI use cases from real people. Practical and simple for non-technical thinkers
            </p>

            <div className="max-w-[500px] overflow-hidden h-[140px] mb-0 mx-auto">
              <iframe src={process.env.NEXT_PUBLIC_BEEHIIV_EMBED_URL} data-test-id="beehiiv-embed" width="500" height="147" frameBorder="0" scrolling="no" className="mx-auto block m-0 rounded-none bg-transparent max-w-full translate-y-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}