import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ExampleBody from '../../components/ExampleBody'
import { localSocialExamples } from '../../lib/social-examples-data'
import { EnrichedExampleRecord } from '../../lib/types'
import { optimizeImageUrl } from '../../utils/cloudinary'

interface ExamplePageProps {
  example: EnrichedExampleRecord | null
  relatedExamples: EnrichedExampleRecord[]
}

export default function ExamplePage({ example, relatedExamples }: ExamplePageProps) {
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

        {relatedExamples.length > 0 && (
          <div className="mt-32 pt-16 border-t border-micro-layer-1">
            <h2 className="text-sm font-bold tracking-widest text-micro-muted uppercase mb-10">More Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {relatedExamples.map((ex) => {
                const imageUrl = optimizeImageUrl(ex.screenshots?.[0]?.url, ex.cloudinaryPublicId, 400);
                const exCategorySlug = ex.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';
                return (
                  <Link 
                    key={ex.id} 
                    href={`/ai-examples/${exCategorySlug}/${ex.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] rounded-sm overflow-hidden border border-micro-layer-1 mb-4">
                      {imageUrl ? (
                        <Image 
                          src={imageUrl} 
                          alt={ex.title} 
                          width={400} 
                          height={300} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-micro-layer-1 flex items-center justify-center text-[10px] font-bold text-micro-muted uppercase">No Preview</div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg leading-tight group-hover:underline decoration-2 underline-offset-4">{ex.title}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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

  // Get related examples (same category if possible, otherwise latest)
  const relatedExamples = localSocialExamples
    .filter(ex => ex.slug !== slug)
    .filter(ex => !example?.category || ex.category === example.category)
    .slice(0, 2);

  // If we don't have enough from the same category, fill with latest
  if (relatedExamples.length < 2) {
    const additional = localSocialExamples
      .filter(ex => ex.slug !== slug && !relatedExamples.find(r => r.slug === ex.slug))
      .slice(0, 2 - relatedExamples.length);
    relatedExamples.push(...additional);
  }

  return {
    props: { 
      example,
      relatedExamples
    },
  }
}