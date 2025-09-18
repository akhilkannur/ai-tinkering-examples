import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Hash } from 'lucide-react'
import Navbar from '../../../components/Navbar'
import ExampleCard from '../../../components/ExampleCard'
import ExampleModal from '../../../components/ExampleModal'
import SocialSharing from '../../../components/SocialSharing'
import { fetchExamples, ExampleRecord } from '../../../lib/airtable'

interface TagPageProps {
  examples: ExampleRecord[]
  tag: string
  tagDisplayName: string
}

export default function TagPage({ examples, tag, tagDisplayName }: TagPageProps) {
  const [selectedExample, setSelectedExample] = useState<ExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://your-domain.com/ai-examples/tag/${tag}`

  const handleOpenModal = (example: ExampleRecord) => {
    setSelectedExample(example)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedExample(null), 300)
  }

  return (
    <>
      <Head>
        <title>#{tagDisplayName} AI Examples | AI Workflow Library | AI Tinkering Examples</title>
        <meta name="description" content={`Explore ${examples.length} AI workflow examples tagged with ${tagDisplayName}. Practical automation ideas and step-by-step guides.`} />
        <meta name="keywords" content={`${tagDisplayName}, AI workflows, AI examples, automation, prompts`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`#{tagDisplayName} AI Examples`} />
        <meta property="og:description" content={`${examples.length} AI workflows tagged with ${tagDisplayName}.`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:title" content={`#{tagDisplayName} AI Examples`} />
        <meta name="twitter:description" content={`${examples.length} practical AI workflows tagged with ${tagDisplayName}.`} />
        
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
              #{tagDisplayName}
            </li>
          </ol>
        </nav>

        {/* Tag Header */}
        <header className="max-w-4xl mx-auto px-4 py-8">
          <Link 
            href="/ai-examples"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to All Examples
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Hash size={32} className="text-slate-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
              {tagDisplayName}
            </h1>
          </div>
          
          <p className="text-lg text-slate-600 mb-2">
            {examples.length} AI workflow{examples.length !== 1 ? 's' : ''} tagged with {tagDisplayName}
          </p>
          <p className="text-slate-500">
            Discover automation ideas and prompts related to {tagDisplayName.toLowerCase()}
          </p>
        </header>

        {/* Examples Grid */}
        <main className="max-w-4xl mx-auto px-4 pb-12">
          {examples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {examples.map((example, index) => (
                <ExampleCard 
                  key={example.id} 
                  example={example}
                  priority={index < 4}
                  onOpen={handleOpenModal}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-light-purple mb-4">No examples found with this tag yet.</p>
              <Link 
                href="/ai-examples"
                className="text-accent hover:text-accent underline"
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
              title={`#${tagDisplayName} AI Examples`}
              description={`${examples.length} practical AI workflows tagged with ${tagDisplayName}.`}
            />
          </div>
        )}

        {/* Modal */}
        <ExampleModal
          example={selectedExample}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const examples = await fetchExamples()
    const allTags = new Set<string>()
    
    examples.forEach(example => {
      example.tags?.forEach(tag => {
        allTags.add(tag)
      })
    })
    
    const paths = Array.from(allTags).map(tag => ({
      params: { 
        tag: tag.toLowerCase().replace(/\s+/g, '-')
      }
    }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error('Failed to generate tag paths:', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tagSlug = params?.tag as string
  
  if (!tagSlug) {
    return { notFound: true }
  }

  try {
    const allExamples = await fetchExamples()
    
    // Find examples with this tag
    const examples = allExamples.filter(example => {
      return example.tags?.some(tag => 
        tag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
    })

    if (examples.length === 0) {
      return { notFound: true }
    }

    // Get the display name from the first matching tag
    let tagDisplayName = tagSlug
    for (const example of examples) {
      const matchingTag = example.tags?.find(tag => 
        tag.toLowerCase().replace(/\s+/g, '-') === tagSlug
      )
      if (matchingTag) {
        tagDisplayName = matchingTag
        break
      }
    }

    return {
      props: {
        examples,
        tag: tagSlug,
        tagDisplayName,
      },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch tag examples:', error)
    return { notFound: true }
  }
}
