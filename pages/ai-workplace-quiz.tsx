import Head from 'next/head'
import Navbar from '../components/Navbar'
import WavyDivider from '../components/WavyDivider'
import AiQuiz from '../components/AiQuiz'

export default function AiWorkplaceQuizPage() {
  return (
    <>
      <Head>
        <title>AI in the Workplace Quiz | Test Your Knowledge | AI Examples</title>
        <meta name="description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz. See how you score and challenge your colleagues!" key="description" />
        <meta property="og:title" content="AI in the Workplace Quiz | Test Your Knowledge" key="og:title" />
        <meta property="og:description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz." key="og:description" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="og:image" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="AI in the Workplace Quiz | Test Your Knowledge" key="twitter:title" />
        <meta name="twitter:description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz." key="twitter:description" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/api/og?mode=home`} key="twitter:image" />
      </Head>
      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-200px)]">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 text-center uppercase">
            Do You Actually <span className="text-accent">Get AI?</span>
          </h1>
          <p className="text-lg text-text-color/80 max-w-2xl mx-auto mb-12 text-center leading-relaxed">
            A quick quiz to see if you know your LLMs from your MCPs, or if you're just reading LinkedIn headlines.
          </p>
          <AiQuiz />
        </div>
        <WavyDivider />
      </div>
    </>
  )
}
