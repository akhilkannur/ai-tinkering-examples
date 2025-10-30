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
import ToolCard from '../components/ToolCard'
import { fetchEnrichedExamples, fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, EnrichedExampleRecord, JobRecord, ToolRecord } from '../lib/airtable'
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
          <div className="bg-secondary-bg py-12">
            <HorizontalStrip 
              title="Featured AI Tools"
              items={featuredTools}
              renderItem={(tool) => <ToolCard tool={tool} />}
              viewAllLink="/tools"
            />
          </div>
        )}

        <div className="bg-[#f3d2c1] py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-color mb-2">
                Latest AI Examples
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-white text-text-color hover:bg-accent hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredExamples.length === 0 ? (
              <div className="py-16 text-center">
                <h3 className="text-2xl font-bold mb-3">Nothing Found</h3>
                <p className="text-lg text-light-purple mb-6">Try a different category, or check back later!</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="bg-accent text-white px-6 py-3 text-base font-bold rounded-full hover:bg-pink-600 transition-colors duration-300"
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
          <div className="bg-primary-bg py-12">
            <HorizontalStrip 
              title="Featured AI Jobs"
              items={featuredJobs}
              renderItem={(job) => <JobCard job={job} />}
              viewAllLink="/jobs"
            />
          </div>
        )}

        <div className="bg-gradient-to-br from-[#f582ae] to-[#8bd3dd] text-white py-16" id="newsletter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              📬 Don't Miss Out!
            </h2>
            <p className="text-xl mb-8">
              Get 5-10 hand-picked AI examples delivered weekly. Join hundreds of subscribers learning to use AI practically.
            </p>
            
            <div className="max-w-[500px] mx-auto">
              <iframe 
                src="https://subscribe-forms.beehiiv.com/44f8ba74-5250-4aac-9fa0-3ad651f05798" 
                data-test-id="beehiiv-embed" 
                style={{width: '100%', height: '147px'}} 
                frameBorder="0" 
                scrolling="no" 
                className="mx-auto block" 
                loading="lazy" 
              />
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