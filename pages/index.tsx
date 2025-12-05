import { useState, useMemo, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ExampleCard from '../components/ExampleCard'
import ExampleModal from '../components/ExampleModal'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import AIToolCard from '../components/AIToolCard'
import NewsletterForm from '../components/NewsletterForm' // Added import
import { fetchEnrichedExamples, fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, EnrichedExampleRecord, JobRecord, ToolRecord } from '../lib/airtable'
import CtaCard from '../components/CtaCard'

interface HomePageProps {
  examples: EnrichedExampleRecord[]
  featuredJobs: JobRecord[]
  featuredTools: ToolRecord[]
  siteSettings: Record<string, boolean>;
}

export default function HomePage({ examples, featuredJobs, featuredTools, siteSettings }: HomePageProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedExample, setSelectedExample] = useState<EnrichedExampleRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const homepageTitle = "AI Examples You Can Copy & Try";
  const homepageDescription = "Curated AI workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.";

  const categories = useMemo(() => {
    const cats = examples
      .map(ex => ex.category)
      .filter(Boolean) as string[]
    return ['All', ...new Set(cats)]
  }, [examples])

  const filteredExamples = useMemo(() => {
    const sortedExamples = [...examples].sort((a, b) => {
      if (a.publish_date && b.publish_date) {
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      }
      return 0;
    });

    if (selectedCategory === 'All') {
      return sortedExamples.slice(0, 6);
    }

    return sortedExamples.filter(example => example.category === selectedCategory);
  }, [examples, selectedCategory]);

  const handleOpenModal = (example: EnrichedExampleRecord) => {
    const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized';
    const newUrl = `/ai-examples/${categorySlug}/${example.slug}`;
    window.history.pushState(null, '', newUrl);
    setSelectedExample(example);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    window.history.replaceState(null, '', router.pathname);
    setIsModalOpen(false);
    setTimeout(() => setSelectedExample(null), 300);
  };

  useEffect(() => {
    if (router.query.slug && Array.isArray(router.query.slug)) {
      const slug = router.query.slug[router.query.slug.length - 1];
      const foundExample = examples.find(ex => ex.slug === slug);
      if (foundExample) {
        setSelectedExample(foundExample);
        setIsModalOpen(true);
      }
    }
  }, [router.query.slug, examples]);

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": homepageTitle,
          "url": process.env.NEXT_PUBLIC_BASE_URL,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${process.env.NEXT_PUBLIC_BASE_URL}/ai-examples?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}} />

        {selectedExample && (
          <>
            <title>{selectedExample.title} | AI Examples</title>
            <meta name="description" content={selectedExample.summary || homepageDescription} />
            <meta property="og:title" content={selectedExample.title} />
            <meta property="og:description" content={selectedExample.summary || homepageDescription} />
            {selectedExample.screenshots?.[0]?.url && (
              <meta property="og:image" content={selectedExample.screenshots[0].url} />
            )}
          </>
        )}
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color fade-in">
        <Navbar />
        <Hero />

        {siteSettings.enableFeaturedToolsSection && featuredTools.length > 0 && (
          <div className="bg-secondary-bg py-12 border-b border-navy-dark">
            <HorizontalStrip 
              title="Featured AI Tools"
              items={featuredTools}
              renderItem={(tool) => <AIToolCard
              key={tool.id}
              name={tool.toolName}
              description={tool.shortDescription}
              url={tool.websiteUrl}
              imageUrl={tool.logo?.[0]?.url}
              category={null}
            />}
              viewAllLink="/tools"
            />
          </div>
        )}

        <div className="bg-primary-bg py-12 border-b border-navy-dark">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-headline font-bold text-text-color mb-2 uppercase tracking-tight">
                Latest AI Examples
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 text-sm font-mono font-bold border rounded-none transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-electric-blue border-accent shadow-none'
                      : 'bg-secondary-bg text-text-secondary border-navy-dark hover:border-accent hover:text-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredExamples.length === 0 ? (
              <div className="py-16 text-center">
                <h3 className="text-2xl font-headline font-bold mb-3">Nothing Found</h3>
                <p className="text-lg text-text-secondary mb-6">Try a different category, or check back later!</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="bg-accent text-electric-blue px-6 py-3 text-base font-mono font-bold rounded-none hover:bg-accent-hover transition-colors duration-300"
                >
                  Show All Examples
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExamples.map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={index < 3}
                    onOpen={handleOpenModal}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {siteSettings.enableFeaturedJobsSection && featuredJobs.length > 0 && (
          <div className="bg-primary-bg py-12 border-b border-navy-dark">
            <HorizontalStrip 
              title="Featured AI Jobs"
              items={featuredJobs}
              renderItem={(job) => <JobCard job={job} />}
              viewAllLink="/jobs"
            />
          </div>
        )}

        <div className="bg-secondary-bg text-text-color py-16 border-t border-navy-dark" id="newsletter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-headline font-bold mb-4 uppercase tracking-tight text-accent">
              📬 Don't Miss Out!
            </h2>
            <p className="text-xl mb-8 font-mono text-text-secondary">
              Get 5-10 hand-picked AI examples delivered weekly. Join hundreds of subscribers learning to use AI practically.
            </p>
            
            <div className="max-w-[500px] mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* WavyDivider removed for Digital Workshop theme */}

        <ExampleModal
          example={selectedExample}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [examples, featuredJobs, featuredTools, siteSettingsData] = await Promise.all([
      fetchEnrichedExamples(),
      fetchFeaturedJobs(),
      fetchFeaturedTools(),
      fetchSiteSettings(),
    ]);

    const siteSettings: Record<string, boolean> = {};
    siteSettingsData.forEach(setting => {
      siteSettings[setting.settingName] = setting.enabled;
    });

    return {
      props: { examples, featuredJobs, featuredTools, siteSettings },
      revalidate: 300,
    }
  } catch (error) {
    console.error('Failed to fetch data for homepage:', error)
    return {
      props: { examples: [], featuredJobs: [], featuredTools: [], siteSettings: {} },
      revalidate: 60,
    }
  }
}