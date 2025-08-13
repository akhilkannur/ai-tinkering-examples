import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import ExampleCard from '../../../components/ExampleCard'
import SocialSharing from '../../../components/SocialSharing'
import { fetchExamples, ExampleRecord } from '../../../lib/airtable'

interface CategoryPageProps {
  examples: ExampleRecord[]
  category: string
  categoryDisplayName: string
}

export default function CategoryPage({ examples, category, categoryDisplayName }: CategoryPageProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://your-domain.com/ai-examples/category/${category}`

  return (
    <>
      <Head>
        <title>{categoryDisplayName} AI Examples | AI Workflow Library | AI Tinkering Examples</title>
        <meta name="description" content={`Discover ${examples.length} ${categoryDisplayName.toLowerCase()} AI workflow examples. Copy-ready prompts, step-by-step guides, and practical automation ideas.`} />
        <meta name="keywords" content={`${categoryDisplayName} AI, AI workflows, ${categoryDisplayName} automation, AI examples, prompts`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${categoryDisplayName} AI Examples | AI Workflow Library`} />
        <meta property="og:description" content={`Discover ${examples.length} ${categoryDisplayName.toLowerCase()} AI workflow examples with step-by-step guides.`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content={`${categoryDisplayName} AI Examples`} />
        <meta name="twitter:description" content={`${examples.length} practical ${categoryDisplayName.toLowerCase()} AI workflows you can copy and try.`} />
        
        <link rel="canonical" content={currentUrl} />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Breadcrumb */}
        <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/ai-examples" className="hover:text-slate-900 transition-colors">AI Examples</Link>
            </li>
            <li className="before:content-['/'] before:mx-2 text-slate-900 font-medium">
              {categoryDisplayName}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <header className="max-w-4xl mx-auto px-4 py-8">
          <Link 
            href="/ai-examples"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to All Examples
          </Link>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            {categoryDisplayName} AI Examples
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            {examples.length} workflow{examples.length !== 1 ? 's' : ''} to help you master {categoryDisplayName.toLowerCase()} with AI
          </p>
          <p className="text-slate-500">
            Step-by-step guides, prompts, and automation ideas you can copy and customize
          </p>
        </header>

        {/* Examples Grid */}
        <main className="max-w-4xl mx-auto px-4 pb-12">
          {examples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {examples.map(example => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No examples found in this category yet.</p>
              <Link 
                href="/ai-examples"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Browse all examples
              </Link>
            </div>
          )}
        </main>

        {/* Social Sharing */}
        {examples.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 pb-8">
            <SocialSharing 
              url={currentUrl}
              title={`${categoryDisplayName} AI Examples`}
              description={`${examples.length} practical ${categoryDisplayName.toLowerCase()} AI workflows you can copy and try.`}
            />
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const examples = await fetchExamples()
    const categories = Array.from(new Set(examples.map(e => e.category).filter(Boolean)))
    
    const paths = categories.map(category => ({
      params: { 
        category: category!.toLowerCase().replace(/\s+/g, '-')
      }
    }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error('Failed to generate category paths:', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.category as string
  
  if (!categorySlug) {
    return { notFound: true }
  }

  try {
    const allExamples = await fetchExamples()
    
    // Find examples matching this category
    const examples = allExamples.filter(example => {
      if (!example.category) return false
      return example.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    })

    if (examples.length === 0) {
      return { notFound: true }
    }

    // Get the display name from the first matching example
    const categoryDisplayName = examples[0].category!

    return {
      props: {
        examples,
        category: categorySlug,
        categoryDisplayName,
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch category examples:', error)
    return { notFound: true }
  }
}
