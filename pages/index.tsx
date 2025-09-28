import { useState, useMemo, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Image from 'next/image'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ExampleCard from '../components/ExampleCard'
import ExampleModal from '../components/ExampleModal'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import ToolCard from '../components/ToolCard'
import { fetchEnrichedExamples, fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, EnrichedExampleRecord, JobRecord, ToolRecord, SiteSettingRecord } from '../lib/airtable'
import WavyDivider from '../components/WavyDivider'
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
      return sortedExamples.slice(0, 3);
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
      const slug = router.query.slug[router.query.slug.length - 1]; // Get the actual example slug
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
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

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

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": homepageTitle,
          "url": process.env.NEXT_PUBLIC_BASE_URL,
          "logo": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
          "sameAs": [
            process.env.NEXT_PUBLIC_TWITTER_URL,
            process.env.NEXT_PUBLIC_LINKEDIN_URL
          ].filter(Boolean) // Filter out undefined/null values
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
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={selectedExample.title} />
            <meta name="twitter:description" content={selectedExample.summary || homepageDescription} />
            {selectedExample.screenshots?.[0]?.url && (
              <meta name="twitter:image" content={selectedExample.screenshots[0].url} />
            )}
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} />
            <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} />
          </>
        )}
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color fade-in">
        <Navbar />
        <Hero />
        

        {siteSettings.enableFeaturedToolsSection && featuredTools.length > 0 && (
          <HorizontalStrip 
            title="Featured Tools"
            items={featuredTools}
            renderItem={(tool) => <ToolCard tool={tool} />}
            viewAllLink="/tools"
          />
        )}

        <div className="bg-[#f3d2c1] py-8">
          <div className="max-w-6xl mx-auto px-2 sm:px-6">

          <h2 className="text-3xl font-extrabold text-text-color mb-6 flex items-center gap-8 w-full">
            <span className="flex-grow text-center">
              <span style={{color: '#f582ae', marginRight: '0.5rem'}}>✦</span>
              {selectedCategory === 'All' ? 'Latest Examples' : selectedCategory}
            </span>
          </h2>


          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 text-base font-bold rounded-full transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-accent text-primary-bg shadow-lg'
                      : 'bg-secondary-bg text-text-color hover:bg-accent hover:text-primary-bg'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {filteredExamples.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-3xl font-bold mb-4">Nothing Found</h3>
              <p className="text-lg text-light-purple mb-8">Try a different category, or check back later!</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="bg-accent text-primary-bg px-8 py-3 text-base font-bold rounded-full hover:bg-bright-pink transition-colors duration-300"
              >
                Show All Examples
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredExamples.map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={true}
                    onOpen={handleOpenModal}
                  />
                ))}
                <CtaCard />
              </div>

              {siteSettings.enableFeaturedJobsSection && featuredJobs.length > 0 && (
                <HorizontalStrip 
                  title="Featured Jobs"
                  items={featuredJobs}
                  renderItem={(job) => <JobCard job={job} />}
                  viewAllLink="/jobs"
                />
              )}
            </>
          )}
          </div>
        </div>

        
        <div className="bg-primary-bg text-text-color mt-16 mb-8" id="newsletter">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 text-text-color !text-text-color">
                Stay in the Loop
              </h2>
              <p className="text-lg text-light-purple mb-6 max-w-2xl mx-auto">
                Get fresh AI examples delivered weekly. No spam, no BS. Just actionable insights.
              </p>
                            <div className="max-w-[500px] w-full mx-auto">
                <iframe src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" data-test-id="beehiiv-embed" style={{width: '100%', height: '147px'}} frameBorder="0" scrolling="no" className="mx-auto block" />
              </div>
            </div>
          </div>
        </div>

        <WavyDivider />
        

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