import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import WavyDivider from '../components/WavyDivider'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | AI Examples</title>
        <meta name="description" content="Learn more about AI Examples and our mission to provide actionable AI workflows and prompts." />
      </Head>
      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-200px)]">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 text-center">
            About AI Examples
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Image
                src="/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png"
                alt="Image representing AI Examples website and its content"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg text-light-purple mb-6">
                AI Examples is a curated collection of AI workflows and prompts designed for non-technical tinkerers. Our mission is to demystify AI and make it accessible to everyone, regardless of their technical background.
                {/* TODO: Consider adding a contextual internal link here, e.g., to /ai-examples */}
              </p>
              <p className="text-lg text-light-purple">
                We believe that AI is a powerful tool that can be used to solve real-world problems and unlock new creative possibilities. That's why we provide clear, actionable examples that you can copy, try, and adapt for your own projects.
              </p>
            </div>
          </div>
        </div>
        <WavyDivider />
      </div>
    </>
  )
}
