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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-200px)]">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 text-center uppercase">
            No Hype. <span className="text-accent">Just Files.</span>
          </h1>
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl">
              <Image
                src="/hero_image.png"
                alt="Real AI Examples"
                width={800}
                height={450}
                priority
                className="rounded-lg shadow-2xl mx-auto border border-navy-dark/10"
              />
            </div>
            <div className="w-full max-w-2xl">
              <p className="text-lg text-text-color mb-6">
                <span className="font-bold">Let's be honest...</span>
              </p>
              <p className="text-lg text-text-color mb-6">
                Most AI content is a waste of time. You spend three hours reading about "the future of work" and end up with zero useful files on your computer.
              </p>
              <p className="text-lg text-text-color mb-6">
                We built this because we spent too much time arguing with chatbots and not enough time doing work. We found that if you give Claude or Gemini a very specific, rigid instruction file, it actually does the job.
              </p>
              <p className="text-lg text-text-color mb-6">
                So we started collecting those files. Then we started testing them. Now we're giving them to you.
              </p>
              <br />
              <p className="text-lg text-text-color mb-6">
                No "thought leadership." No theory. Just boring, reliable text files that make AI useful for once.
              </p>
              <p className="text-lg text-text-color mb-6">
                See you inside,<br />Akhil<br />📩 akhil@realaiexamples.com
              </p>
            </div>
          </div>
        </div>
        <WavyDivider />
      </div>
    </>
  )
}
