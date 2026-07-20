import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { localSocialExamples } from '../../../lib/social-examples-data'
import { EnrichedExampleRecord } from '../../../lib/types'
import { optimizeImageUrl } from '../../../utils/cloudinary'

interface CategoryPageProps {
  category: string
  examples: EnrichedExampleRecord[]
}

const slugify = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export default function ExampleCategoryPage({ category, examples }: CategoryPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'
  const currentUrl = `${baseUrl}/ai-examples/category/${slugify(category)}`
  const description = `Real ${category} AI workflows from people using AI at work. Browse documented examples, prompts, tools, and outcomes.`

  return (
    <>
      <Head>
        <title>{category} AI Workflow Examples | Real AI Examples</title>
        <meta name="description" content={description} key="description" />
        <link rel="canonical" href={currentUrl} key="canonical" />
        <meta property="og:title" content={`${category} AI Workflow Examples`} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={currentUrl} key="og:url" />
      </Head>

      <main className="max-w-6xl mx-auto px-6">
        <header className="max-w-3xl mb-16 pt-8 md:pt-12">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
            ← All examples
          </Link>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mt-8 mb-6">
            {category} AI examples
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">{description}</p>
        </header>

        <div className="glass-sheet rounded-sm p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {examples.map(example => {
              const imageUrl = optimizeImageUrl(example.screenshots?.[0]?.url, example.cloudinaryPublicId, 600)
              return (
                <article key={example.id}>
                  <Link href={`/ai-examples/${slugify(category)}/${example.slug}`} className="group block">
                    <div className="aspect-[4/3] relative overflow-hidden bg-micro-layer-1 mb-4 rounded-sm border border-micro-layer-1">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={example.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h2 className="text-xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
                      {example.title}
                    </h2>
                    {example.summary && <p className="text-sm text-micro-muted mt-3 line-clamp-3">{example.summary}</p>}
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [...new Set(localSocialExamples.map(example => example.category).filter(Boolean))] as string[]
  return {
    paths: categories.map(category => ({ params: { category: slugify(category) } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.category as string
  const category = localSocialExamples.find(example => example.category && slugify(example.category) === categorySlug)?.category
  if (!category) return { notFound: true }

  return {
    props: {
      category,
      examples: localSocialExamples.filter(example => example.category === category),
    },
  }
}
