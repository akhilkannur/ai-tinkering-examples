import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import ExampleBody from '../../components/ExampleBody'
import { localSocialExamples } from '../../lib/social-examples-data'
import { EnrichedExampleRecord } from '../../lib/types'

interface ExamplePageProps {
  example: EnrichedExampleRecord | null
}

export default function ExamplePage({ example }: ExamplePageProps) {
  if (!example) {
    return <div className="flex items-center justify-center text-micro-muted font-mono">Example not found</div>
  }

  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'
  const currentUrl = `${baseUrl}/ai-examples/${categorySlug}/${example.slug}`
  
  const ogImage = example.screenshots?.[0]?.url 
    ? (example.screenshots[0].url.startsWith('http') ? example.screenshots[0].url : `${baseUrl}${example.screenshots[0].url}`)
    : `${baseUrl}/api/og?title=${encodeURIComponent(example.title)}`;

  return (
    <>
      <Head>
        <title>{example.title} | AI Workflow Example | Real AI Examples</title>
        <meta name="description" content={example.summary || `Learn how to recreate this ${example.category} AI workflow.`} key="description" />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`${example.title} | AI Workflow`} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="max-w-3xl mx-auto">
        <ExampleBody example={example} />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = localSocialExamples.map((ex) => ({
    params: { 
      slug: [
        ex.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized', 
        ex.slug
      ] 
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugArray = params?.slug as string[]
  const slug = slugArray[slugArray.length - 1]
  const example = localSocialExamples.find(ex => ex.slug === slug) || null

  return {
    props: { example },
  }
}