import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import ExampleCard from '../components/ExampleCard'
import ExampleModal from '../components/ExampleModal'
import NewsletterSignup from '../components/NewsletterSignup'
import HorizontalStrip from '../components/HorizontalStrip'
import JobCard from '../components/JobCard'
import ToolCard from '../components/ToolCard'
import SocialSharing from '../components/SocialSharing' 
import { fetchEnrichedExamples, fetchFeaturedJobs, fetchFeaturedTools, fetchSiteSettings, EnrichedExampleRecord, JobRecord, ToolRecord, SiteSettingRecord } from '../lib/airtable'

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

  // Define homepage meta variables inside the component
  const homepageUrl = "https://your-domain.com/"; // Replace with your actual domain
  const homepageTitle = "AI Examples You Can Copy & Try";
  const homepageDescription = "Curated AI workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.";

  // Get unique categories
  const categories = useMemo(() => {
    const cats = examples
      .map(ex => ex.category)
      .filter(Boolean) as string[]
    return ['All', ...new Set(cats)]
  }, [examples])

  // Filter examples by category only
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

  const examplesToShowBeforeJobsStrip = 6; // Corresponds to 2 rows in a 3-column layout

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" /> {/* Changed font to Plus Jakarta Sans */}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={homepageTitle} />
        <meta property="og:description" content={homepageDescription} />
        <meta property="og:url" content="https://your-domain.com/" />
        <meta property="og:image" content="https://your-domain.com/social-share-default.jpg" />
        <meta property="og:site_name" content="AI Tinkering Examples" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homepageTitle} />
        <meta name="twitter:description" content={homepageDescription} />
        <meta name="twitter:image" content="https://your-domain.com/social-share-default.jpg" />
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .fade-in {
              animation: fadeIn 0.5s ease-in-out;
            }
          `}
        </style>
      </Head>

      <div className="min-h-screen bg-secondary-bg font-['Plus Jakarta Sans'] fade-in">
        <Navbar />
        
        {/* Compact Hero Section */}
        <div className="relative bg-gradient-to-b from-navy-dark to-navy-light text-secondary-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-secondary-bg leading-tight mb-3 sm:mb-4">
                AI examples
                <span className="text-accent"> you can</span> copy & try
              </h1>
              
              <p className="text-base sm:text-lg text-secondary-bg font-light leading-relaxed max-w-2xl mx-auto mb-6">
                Curated workflows and prompts for non-technical tinkerers. 
                No fluff, just actionable examples.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4">
                <a 
                  href="#newsletter"
                  className="group inline-flex items-center gap-2 bg-accent text-secondary-bg px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-all duration-300"
                >
                  Get weekly examples
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                {/* Social Sharing Button */}
                <SocialSharing 
                  url={homepageUrl}
                  title={homepageTitle}
                  description={homepageDescription}
                />
              </div>
            </div>
          </div>
          
          
        </div>

        {/* Featured Tools Strip - Remains above examples */}
        {siteSettings.enableFeaturedToolsSection && featuredTools.length > 0 && (
          <HorizontalStrip 
            title="Featured Tools"
            items={featuredTools}
            renderItem={(tool) => <ToolCard tool={tool} />}
            viewAllLink="/tools"
          />
        )}

        {/* Examples Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-secondary-bg">
          {/* All Examples Heading */}
          <h2 className="text-2xl font-bold text-text-color mb-6 flex items-center gap-2"> <Lightbulb size={24} /> {selectedCategory === 'All' ? 'All examples' : selectedCategory}</h2>

          {/* Category Filter - Moved here */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-accent text-secondary-bg'
                    : 'bg-secondary-bg text-text-color hover:bg-accent hover:text-secondary-bg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredExamples.length === 0 ? (
            <div className="py-16 text-center">
              <h3 className="text-2xl font-bold text-text-color mb-3">Nothing found</h3>
              <p className="text-lg text-text-color mb-6">Try selecting a different category</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="bg-accent text-secondary-bg px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Show all examples
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Render first set of examples */}
                {filteredExamples.slice(0, examplesToShowBeforeJobsStrip).map((example, index) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    priority={index < 6}
                    onOpen={handleOpenModal}
                  />
                ))}
              </div>

              {/* Featured Jobs Strip - Inserted between examples */}
              {siteSettings.enableFeaturedJobsSection && featuredJobs.length > 0 && (
                <HorizontalStrip 
                  title="Featured Jobs"
                  items={featuredJobs}
                  renderItem={(job) => <JobCard job={job} />}
                  viewAllLink="/jobs"
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Render remaining examples */}
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

        {/* Newsletter Section - Moved Down */}
        <div className="bg-primary-bg text-secondary-bg" id="newsletter">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-none">
                Stay in 
                <br />
                <span className="text-accent">the loop</span>
              </h2>
              
              <p className="text-base sm:text-lg text-secondary-bg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Get fresh AI examples delivered weekly. No spam, no BS. 
                Just actionable insights you can use right away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-5 py-3 bg-secondary-bg text-text-color text-base focus:outline-none focus:ring-2 focus:ring-accent" 
                />
                <button className="bg-accent text-secondary-bg px-6 py-3 text-base font-medium hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"> 
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-secondary-bg border-t border-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-black text-text-color mb-2">AI Examples</h3>
                <p className="text-text-color max-w-xs text-sm">
                  Curated for tinkerers, made with care.
                </p>
              </div>
              
              <div className="text-sm text-text-color">
                © 2024 — Made for curious minds
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
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