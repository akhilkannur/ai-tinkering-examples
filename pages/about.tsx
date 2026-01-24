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
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 text-center">
            About Real AI Examples
          </h1>
          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-lg">
              <Image
                src="/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png"
                alt="Image representing AI Examples website and its content"
                width={500}
                height={300}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="w-full max-w-2xl">
              <p className="text-lg text-text-color mb-6">
                <span className="font-bold">Let me tell you a dirty little secret…</span>
              </p>
              <p className="text-lg text-text-color mb-6">
                Most of the “AI stuff” you see online? It’s smoke and mirrors. Shiny screenshots. Overhyped demos. Big words to make you feel like you’re missing out on the next big thing.
              </p>
              <p className="text-lg text-text-color mb-6">
                But here’s the problem: if you’re a regular human, someone who doesn’t code, doesn’t have 10 PhDs, and doesn’t want to waste hours chasing gimmicks, none of that matters.
              </p>
              <p className="text-lg text-text-color mb-6">
                You don’t need another headline about “AI changing the world.” You need examples you can actually copy, try, and put to work today.
              </p>
              <br /> {/* Added line break */}
              <p className="text-lg text-text-color mb-6">
                That’s why I started AI Examples.
              </p>
              <p className="text-lg text-text-color mb-6">
                Every week, I hunt through the noise, filter out the fluff, and curate only the AI workflows, prompts, and use-cases that real people are using. Things you can swipe and use without needing to be technical.
              </p>
              <p className="text-lg text-text-color mb-6">
                It’s not theory. It’s not hype. It’s the good stuff, handpicked, trimmed of fat, and delivered straight to you.
              </p>
              <p className="text-lg text-text-color mb-6">
                Because let’s be real: AI is only useful if you can do something with it.
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
