import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center gap-4">
            <Image src="/all examples.png" alt="All Examples" width={120} height={120} className="text-accent object-contain w-30 h-30"/>
            {selectedCategory === 'All' ? 'All Examples' : selectedCategory}
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-accent text-text-color shadow-lg shadow-accent/20'
                    : 'bg-secondary-bg text-text-color hover:bg-accent hover:text-text-color'
                }`}
              >
                {category}
              </button>
            ))}
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
                {filteredExamples.slice(0, examplesToShowBeforeJobsStrip).map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={index < 6}
                    onOpen={handleOpenModal}
                  />
                ))}
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
                {filteredExamples.slice(examplesToShowBeforeJobsStrip).map((example, index) => (
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

        <div className="bg-primary-bg text-text-color" id="newsletter">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 text-text-color !text-text-color">
                Stay in the Loop
              </h2>
              <p className="text-lg text-light-purple mb-8 max-w-2xl mx-auto">
                Get fresh AI examples delivered weekly. No spam, no BS. Just actionable insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 bg-primary-bg text-light-purple text-base rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="bg-accent text-text-color px-8 py-3 text-base font-bold rounded-full hover:bg-accent transition-colors duration-300">
                  Subscribe
                </button>
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