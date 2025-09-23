import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import Navbar from '../../components/Navbar'
import ExampleBody from '../../components/ExampleBody'
import SocialSharing from '../../components/SocialSharing'
import { 
  fetchEnrichedExamples,
  fetchEnrichedExampleBySlug,
  EnrichedExampleRecord 
} from '../../lib/airtable'

interface ExamplePageProps {
  example: EnrichedExampleRecord | null
}

export default function ExamplePage({ example }: ExamplePageProps) {
  if (!example) {
    // This should ideally not be reached due to fallback: 'blocking' and notFound: true
    return <div>Example not found</div>
  }

  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/ai-examples/${categorySlug}/${example.slug}`

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
      "name": "AI Tinkering Examples",
      "logo": {
        "@type": "ImageObject",
        "url": example.sponsor?.logo?.[0]?.url || `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
      }
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
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${example.title} | AI Workflow Example`} />
        <meta property="og:description" content={example.summary || `Learn how to recreate this AI workflow: ${example.title}`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="AI Tinkering Examples" />
        {example.screenshots?.[0]?.url && (
          <meta property="og:image" content={example.screenshots[0].url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" content={currentUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-primary-bg">
        <Navbar />
        
        <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-600">
            <li><Link href="/">Home</Link></li>
            <li className="before:content-['/'] before:mx-2"><Link href="/ai-examples" className="hover:text-text-color transition-colors">AI Examples</Link></li>
            {example.category && (
              <li className="before:content-['/'] before:mx-2">
                <Link href={`/ai-examples/category/${categorySlug}`}>{example.category}</Link>
              </li>
            )}
            <li className="before:content-['/'] before:mx-2 text-text-color font-medium truncate font-headline">
              {example.title}
            </li>
          </ol>
        </nav>

        <main>
          <ExampleBody example={example} />
        </main>

        <div className="max-w-4xl mx-auto px-4 py-8 flex justify-between items-center">
          <SocialSharing 
            url={currentUrl}
            title={example.title}
            description={example.summary}
          />
          {example.original_link && (
            <a
              href={example.original_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 border border-transparent rounded-full shadow-sm text-base font-bold text-electric-blue bg-accent hover:bg-accent hover:text-electric-blue transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink size={16} />
              View Original
            </a>
          )}
        </div>

        {example.tags && example.tags.length > 0 && (
          <footer className="max-w-4xl mx-auto px-4 py-8">
            <div className="border-t border-secondary-bg pt-8">
              <h3 className="text-sm font-semibold text-text-color mb-4 font-headline">Related Topics</h3>
              <div className="flex gap-2 flex-wrap">
                {example.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/ai-examples/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-2 text-sm bg-secondary-bg text-text-color rounded-full hover:bg-accent transition-colors"
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
  const examples = await fetchEnrichedExamples();
  const paths = examples.map(example => {
    const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';
    return {
      params: { 
        slug: [categorySlug, example.slug]
      }
    }
  });
  
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params?.slug as string[];
  const exampleSlug = slugArray?.[slugArray.length - 1];
  
  if (!exampleSlug) {
    return { notFound: true };
  }
  
  const example = await fetchEnrichedExampleBySlug(exampleSlug);
  
  if (!example) {
    return { notFound: true };
  }

  return { 
    props: { example }, 
    revalidate: 300 // 5 minutes
  };
};