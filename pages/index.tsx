import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Script from 'next/script'
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
    return selectedCategory === 'All' 
      ? examples 
      : examples.filter(example => example.category === selectedCategory)
  }, [examples, selectedCategory])

  const handleOpenModal = (example: EnrichedExampleRecord) => {
    setSelectedExample(example)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedExample(null), 300)
  }

  const examplesToShowBeforeJobsStrip = 6;

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .fade-in {
              animation: fadeIn 0.5s ease-in-out;
            }
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob { animation: blob 7s infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-4000 { animation-delay: 4s; }
            .beehiiv-embed {
              display: block !important;
              margin: 0 auto !important;
              overflow: hidden !important;
            }

            #newsletter {
              margin-bottom: 2rem !important;
            }

            #newsletter iframe {
              max-height: 280px !important;
              overflow: hidden !important;
            }
          `}
        </style>
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

        <div className="max-w-6xl mx-auto px-2 sm:px-6 py-8 bg-section-bg-example-card rounded-lg shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-8 w-full">
            <span className="flex-grow text-center">
              {selectedCategory === 'All' ? 'All Examples' : selectedCategory}
            </span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => {
              const tagColors = ['#a786df', '#8bd3dd', '#f582ae', '#f3d2c1', '#fef6e4', '#b0e0e6', '#add8e6', '#87cefa', '#6495ed', '#4682b4'];
              const colorIndex = index % tagColors.length;
              const bgColor = tagColors[colorIndex];
              const textColor = '#001858'; // text-color from tailwind.config.js

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? `bg-[${bgColor}] text-[${textColor}] shadow-lg shadow-accent/20`
                      : `bg-secondary-bg text-[${textColor}] hover:bg-[${bgColor}] hover:text-[${textColor}]`
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredExamples.slice(0, 9).map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={index < 6}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredExamples.slice(9).map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={index < 6}
                    onOpen={handleOpenModal}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bg-primary-bg text-text-color mt-32 mb-16" id="newsletter">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 text-text-color !text-text-color">
                Stay in the Loop
              </h2>
              <p className="text-lg text-light-purple mb-6 max-w-2xl mx-auto">
                Get fresh AI examples delivered weekly. No spam, no BS. Just actionable insights.
              </p>
                            <div className="max-w-3xl mx-auto">
                <Script async src="https://subscribe-forms.beehiiv.com/embed.js" />
                <iframe src="https://subscribe-forms.beehiiv.com/e3398e54-e0cf-44f9-a380-23571e7b542a" className="beehiiv-embed mx-auto block" data-test-id="beehiiv-embed" frameBorder="0" scrolling="no" style={{width: '660px', height: '280px', margin: '0 auto', borderRadius: '0px', backgroundColor: 'transparent', boxShadow: '0 0 #0000', maxWidth: '100%', display: 'block', overflow: 'hidden'}}></iframe>
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