import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import WavyDivider from '../components/WavyDivider'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Real AI Examples</title>
        <meta name="description" content="Learn more about Real AI Examples and our mission to provide actionable AI workflows and prompts." key="description" />
        <meta property="og:title" content="About | Real AI Examples" key="og:title" />
        <meta property="og:description" content="Learn more about Real AI Examples and our mission to provide actionable AI workflows and prompts." key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="About | Real AI Examples" key="twitter:title" />
        <meta name="twitter:description" content="Learn more about Real AI Examples and our mission to provide actionable AI workflows and prompts." key="twitter:description" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="twitter:image" />
      </Head>
      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 min-h-[calc(100vh-200px)]">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-16 text-center uppercase">
            No Hype. <span className="text-accent">Just Files.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Image Column */}
            <div className="w-full md:w-2/5 order-1 md:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent translate-x-3 translate-y-3 rounded-none group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
                <div className="relative border-4 border-black bg-white p-2 shadow-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                  <Image
                    src="/hero_image.png"
                    alt="Real AI Examples"
                    width={600}
                    height={338}
                    priority
                    className="grayscale hover:grayscale-0 transition-all duration-500 w-full h-auto"
                  />
                </div>
              </div>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-center opacity-40">
                Figure 1.1: Reliable Workflows &gt; AI Hype
              </p>
            </div>

            {/* Text Column */}
            <div className="w-full md:w-3/5 font-sans order-2 md:order-1">
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="text-2xl font-bold mb-8 leading-tight">
                  <span className="bg-accent/10 px-2">Let's be honest...</span>
                </p>
                <p className="text-lg text-text-color mb-6 leading-relaxed">
                  Most AI content is a waste of time. You spend three hours reading about "the future of work" and end up with zero useful files on your computer.
                </p>
                <p className="text-lg text-text-color mb-6 leading-relaxed">
                  We built this because we spent too much time arguing with chatbots and not enough time doing work. We found that if you give Claude or Gemini a very specific, rigid instruction file, it actually does the job.
                </p>
                <p className="text-lg text-text-color mb-6 leading-relaxed">
                  So we started collecting those files. Then we started testing them. Now we're giving them to you.
                </p>
                
                <div className="my-10 border-l-4 border-accent pl-6 py-2 italic text-xl text-text-color/80">
                  "No 'thought leadership.' No theory. Just boring, reliable text files that make AI useful for once."
                </div>

                <p className="text-lg text-text-color mb-12 leading-relaxed">
                  Every blueprint in our library is designed to be a "Mission File"—a single document that tells an agent exactly who to be and what to produce. No fluff.
                </p>

                <div className="bg-white border-2 border-black p-8 rounded-none relative">
                  <p className="font-mono text-lg mb-4">
                    See you inside,<br />
                    <span className="font-bold">Akhil</span>
                  </p>
                  <p className="font-mono text-sm text-accent">
                    📩 akhil@realaiexamples.com
                  </p>
                  <div className="absolute -top-4 -right-4 bg-black text-white px-3 py-1 font-mono text-[10px] uppercase tracking-tighter transform rotate-3">
                    Founder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WavyDivider />
      </div>
    </>
  )
}
