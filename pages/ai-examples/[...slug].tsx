import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react'
import Navbar from '../../components/Navbar'
import ExampleDetail from '../../components/ExampleDetail'
import SocialSharing from '../../components/SocialSharing'
import { fetchExamples, fetchExampleBySlug, ExampleRecord } from '../../lib/airtable'

interface ExamplePageProps {
  example: ExampleRecord | null
}

export default function ExamplePage({ example }: ExamplePageProps) {
  if (!example) {
    return (
      <>
        <Head>
          <title>AI Example Not Found - AI Tinkering Examples</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">AI Example Not Found</h1>
            <p className="text-slate-600 mb-8">
              Sorry, we couldn't find the AI workflow example you're looking for.
            </p>
            <Link 
              href="/ai-examples" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={16} />
              Browse All AI Examples
            </Link>
          </div>
        </div>
      </>
    )
  }

  const publishDate = example.publish_date ? new Date(example.publish_date) : null
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://your-domain.com/ai-examples/${example.category?.toLowerCase().replace(/\s+/g, '-')}/${example.slug}`

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": example.title,
    "description": example.summary,
    "author": {
      "@type": "Person",
      "name": example.author_name || "AI Tinkering Examples"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Tinkering Examples"
    },
    "datePublished": example.publish_date,
    "dateModified": example.publish_date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "image": example.screenshots?.[0]?.url,
    "articleSection": example.category,
    "keywords": example.tags?.join(', '),
    "timeRequired": `PT${example.read_time || 1}M`
  }

  return (
    <>
      <Head>
        <title>{example.title} | AI Workflow Example | AI Tinkering Examples</title>
        <meta name="description" content={example.summary || `Learn how to recreate this ${example.category} AI workflow: ${example.title}. Step-by-step guide with screenshots and prompts.`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${example.title} | AI Workflow Example`} />
        <meta property="og:description" content={example.summary || `Learn how to recreate this AI workflow: ${example.title}`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="AI Tinkering Examples" />
        {example.screenshots?.[0]?.url && (
          <meta property="og:image" content={example.screenshots[0].url} />
        )}
        <meta property="article:author" content={example.author_name || "AI Tinkering Examples"} />
        <meta property="article:section" content={example.category || "AI Examples"} />
        {example.publish_date && <meta property="article:published_time" content={example.publish_date} />}
        {example.tags && <meta property="article:tag" content={example.tags.join(', ')} />}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${example.title} | AI Workflow Example`} />
        <meta name="twitter:description" content={example.summary || `Learn how to recreate this AI workflow: ${example.title}`} />
        {example.screenshots?.[0]?.url && (
          <meta name="twitter:image" content={example.screenshots[0].url} />
        )}

        {/* Additional SEO meta tags */}
        <meta name="keywords" content={`AI workflow, ${example.category}, ${example.tags?.join(', ')}, AI examples, prompts, automation`} />
        <meta name="author" content={example.author_name || "AI Tinkering Examples"} />
        <link rel="canonical" content={currentUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Breadcrumb Navigation */}
        <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/ai-examples" className="hover:text-slate-900 transition-colors">
                AI Examples
              </Link>
            </li>
            {example.category && (
              <li className="before:content-['/'] before:mx-2">
                <Link 
                  href={`/ai-examples/category/${example.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-slate-900 transition-colors"
                >
                  {example.category}
                </Link>
              </li>
            )}
            <li className="before:content-['/'] before:mx-2 text-slate-900 font-medium truncate">
              {example.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-6">
            {example.category && (
              <Link 
                href={`/ai-examples/category/${example.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-1 px-3 py-1 border rounded-full bg-white hover:bg-slate-50 transition-colors"
              >
                <Tag size={14} />
                {example.category}
              </Link>
            )}
            
            {publishDate && (
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <time dateTime={example.publish_date}>
                  {publishDate.toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{example.read_time || 1} min read</span>
            </div>

            {example.author_name && (
              <div className="flex items-center gap-1">
                <User size={14} />
                {example.author_link ? (
                  <a 
                    href={example.author_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors"
                  >
                    {example.author_name}
                  </a>
                ) : (
                  <span>{example.author_name}</span>
                )}
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {example.title}
          </h1>
          
          {example.summary && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
              {example.summary}
            </p>
          )}
        </header>

        {/* Main Content */}
        <main>
          <ExampleDetail example={example} />
        </main>

        {/* Social Sharing */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <SocialSharing 
            url={currentUrl}
            title={example.title}
            description={example.summary}
          />
        </div>

        {/* Tags Section */}
        {example.tags && example.tags.length > 0 && (
          <footer className="max-w-4xl mx-auto px-4 py-8">
            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Related Topics</h3>
              <div className="flex gap-2 flex-wrap">
                {example.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/ai-examples/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-2 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const examples = await fetchExamples()
    const paths = examples.map(example => ({
      params: { 
        slug: [
          example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized',
          example.slug
        ]
      }
    }))
    
    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error('Failed to generate static paths:', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params?.slug as string[]
  const exampleSlug = slugArray?.[slugArray.length - 1] // Get the last part as the example slug
  
  if (!exampleSlug) {
    return { notFound: true }
  }
  
  try {
    const example = await fetchExampleBySlug(exampleSlug)
    
    if (!example) {
      return { notFound: true }
    }

    return { 
      props: { example }, 
      revalidate: 300 // 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch example:', error)
    return { notFound: true }
  }
}
