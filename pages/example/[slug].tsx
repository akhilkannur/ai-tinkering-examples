import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import ExampleDetail from '../../components/ExampleDetail'
import { fetchExamples, fetchExampleBySlug, ExampleRecord } from '../../lib/airtable'

interface ExamplePageProps {
  example: ExampleRecord | null
}

export default function ExamplePage({ example }: ExamplePageProps) {
  const router = useRouter()

  // Redirect to homepage if no example found
  useEffect(() => {
    if (!router.isFallback && !example) {
      router.push('/')
    }
  }, [example, router])

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-slate-200 rounded mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!example) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Example Not Found</h1>
          <p className="text-slate-600 mb-8">The example you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Examples
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <ExampleDetail example={example} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const examples = await fetchExamples()
    const paths = examples.map(example => ({ 
      params: { slug: example.slug } 
    }))
    
    return { 
      paths, 
      fallback: 'blocking' // Enable ISR for new examples
    }
  } catch (error) {
    console.error('Error generating static paths:', error)
    return { 
      paths: [], 
      fallback: 'blocking' 
    }
  }
}

export const getStaticProps: GetStaticProps<ExamplePageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string
    const example = await fetchExampleBySlug(slug)
    
    if (!example) {
      return { notFound: true }
    }
    
    return { 
      props: { example }, 
      revalidate: 300 // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Error fetching example:', error)
    return { notFound: true }
  }
}
