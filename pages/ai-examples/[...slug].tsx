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
import { localSocialExamples } from '../../lib/social-examples-data'
import { getAllRecipes } from '../../lib/recipes'

interface ExamplePageProps {
  example: EnrichedExampleRecord | null
}

export default function ExamplePage({ example }: ExamplePageProps) {
  if (!example) {
    return <div>Example not found</div>
  }

  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'
  const currentUrl = `${baseUrl}/ai-examples/${categorySlug}/${example.slug}`
  
  // Use the first screenshot as the social image
  const ogImage = example.screenshots?.[0]?.url 
    ? (example.screenshots[0].url.startsWith('http') ? example.screenshots[0].url : `${baseUrl}${example.screenshots[0].url}`)
    : `${baseUrl}/api/og?title=${encodeURIComponent(example.title)}`;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": example.title,
    "description": example.summary,
    "author": {
      "@type": "Person",
      "name": example.author_name || "Real AI Examples"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Real AI Examples",
      "logo": {
        "@type": "ImageObject",
        "url": example.sponsor?.logo?.[0]?.url || `${baseUrl}/logo.png`
      }
    },
    "datePublished": example.publish_date,
    "dateModified": example.publish_date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "image": ogImage,
    "articleSection": example.category,
    "keywords": example.tags?.join(', '),
    "timeRequired": `PT${example.read_time || 1}M`
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Examples",
        "item": `${baseUrl}/ai-examples`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": example.category || "Uncategorized",
        "item": `${baseUrl}/ai-examples/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": example.title,
        "item": currentUrl
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{example.title} | AI Workflow Example | Real AI Examples</title>
        <meta name="description" content={example.summary || `Learn how to recreate this ${example.category} AI workflow: ${example.title}. Step-by-step guide with screenshots and prompts.`} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={`${example.title} | AI Workflow Example`} key="og:title" />
        <meta property="og:description" content={example.summary || `Learn how to recreate this AI workflow: ${example.title}`} key="og:description" />
        <meta property="og:url" content={currentUrl} key="og:url" />
        <meta property="og:site_name" content="Real AI Examples" key="og:site_name" />
        <meta property="og:image" content={ogImage} key="og:image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@realaiexamples" />
        <meta name="twitter:title" content={`${example.title} | AI Workflow Example`} key="twitter:title" />
        <meta name="twitter:description" content={example.summary || `Learn how to recreate this AI workflow: ${example.title}`} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />

        <link rel="canonical" href={currentUrl} key="canonical" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
      </Head>

      <div className="min-h-screen bg-primary-bg">
        <Navbar />
        
        <nav className="max-w-4xl mx-auto px-4 pt-32 pb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm font-mono text-text-secondary">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="before:content-['/'] before:mx-2"><Link href="/ai-examples" className="hover:text-accent transition-colors">AI Examples</Link></li>
            {example.category && (
              <li className="before:content-['/'] before:mx-2">
                <Link href={`/ai-examples/category/${categorySlug}`} className="hover:text-accent transition-colors">{example.category}</Link>
              </li>
            )}
            <li className="before:content-['/'] before:mx-2 text-text-color font-bold truncate">
              {example.title}
            </li>
          </ol>
        </nav>

        <main>
          <ExampleBody example={example} />
        </main>

        <div className="max-w-4xl mx-auto px-4 py-8 flex justify-between items-center border-t border-navy-dark mt-8">
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
              className="inline-flex items-center gap-2 px-6 py-2 border border-accent rounded-none shadow-none text-base font-mono font-bold text-accent bg-transparent hover:bg-accent hover:text-electric-blue transition-all duration-300"
            >
              <ExternalLink size={16} />
              View Original
            </a>
          )}
        </div>

        {example.tags && example.tags.length > 0 && (
          <footer className="max-w-4xl mx-auto px-4 py-8">
            <div className="border-t border-navy-dark pt-8">
              <h3 className="text-sm font-bold text-text-secondary mb-4 font-mono uppercase tracking-wider">Related Topics</h3>
              <div className="flex gap-2 flex-wrap">
                {example.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/ai-examples/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-2 text-sm font-mono border border-navy-dark bg-transparent text-text-secondary rounded-none hover:border-accent hover:text-accent transition-colors"
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
  const airtableExamples = await fetchEnrichedExamples();
  const examples = [...localSocialExamples, ...airtableExamples];
  
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
  
  // Try local examples first
  let example = localSocialExamples.find(ex => ex.slug === exampleSlug);
  
  // If not found locally, try Airtable
  if (!example) {
    example = await fetchEnrichedExampleBySlug(exampleSlug);
  }
  
  if (!example) {
    // Check if this is a recipe/blueprint (fixes 404s for old sitemap links)
    const allRecipes = getAllRecipes();
    const recipe = allRecipes.find(r => r.id === exampleSlug);
    
    if (recipe) {
      return {
        redirect: {
          destination: `/how-to/automate-${recipe.id}`,
          permanent: true,
        },
      };
    }

    return { notFound: true };
  }

  // Enforce Canonical URL (Redirect if category mismatch)
  // This fixes GSC "Alternate page with proper canonical tag" issues
  const urlCategorySlug = slugArray.length > 1 ? slugArray[slugArray.length - 2] : 'uncategorized';
  const trueCategorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';

  if (urlCategorySlug !== trueCategorySlug) {
    return {
      redirect: {
        destination: `/ai-examples/${trueCategorySlug}/${example.slug}`,
        permanent: true,
      },
    };
  }

  return { 
    props: { example }, 
    revalidate: 86400 // 24 hours
  };
};