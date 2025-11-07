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
