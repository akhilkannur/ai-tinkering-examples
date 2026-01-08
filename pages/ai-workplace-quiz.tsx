import Head from 'next/head'
import Navbar from '../components/Navbar'
import WavyDivider from '../components/WavyDivider'
import AiQuiz from '../components/AiQuiz'

export default function AiWorkplaceQuizPage() {
  return (
    <>
      <Head>
        <title>AI in the Workplace Quiz | Test Your Knowledge | AI Examples</title>
        <meta name="description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz. See how you score and challenge your colleagues!" />
        <meta property="og:title" content="AI in the Workplace Quiz | Test Your Knowledge" />
        <meta property="og:description" content="Test your knowledge of the latest AI developments in marketing, sales, and HR with this interactive quiz." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`} />
      </Head>
      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-[calc(100vh-200px)]">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-8 text-center">
            AI in the Workplace Quiz
          </h1>
          <AiQuiz />
        </div>
        <WavyDivider />
      </div>
    </>
  )
}
