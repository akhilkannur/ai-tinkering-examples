import { useState, useEffect, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Search } from 'lucide-react'
import Navbar from '../../components/Navbar'
import JobCard from '../../components/JobCard'
import { fetchAllJobs, JobRecord } from '../../lib/airtable'

interface JobsPageProps {
  jobs: JobRecord[]
}

export default function JobsPage({ jobs }: JobsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredJobs, setFilteredJobs] = useState<JobRecord[]>([])

  useEffect(() => {
    let results = jobs

    if (searchTerm) {
      results = results.filter(job =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredJobs(results)
  }, [jobs, searchTerm])

  return (
    <>
      <Head>
        <title>AI Jobs | Find Your Next Role in AI - AI Tinkering Examples</title>
        <meta name="description" content="Browse a curated list of AI job openings from top companies." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Jobs | Find Your Next Role in AI" />
        <meta property="og:description" content="Browse a curated list of AI job openings from top companies." />
        <meta property="og:url" content="https://your-domain.com/jobs" />
        <meta property="og:image" content="https://your-domain.com/social-share-default.jpg" />
        <meta property="og:site_name" content="AI Tinkering Examples" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Jobs | Find Your Next Role in AI" />
        <meta name="twitter:description" content="Browse a curated list of AI job openings from top companies." />
        <meta name="twitter:image" content="https://your-domain.com/social-share-default.jpg" />
      </Head>

      <div className="min-h-screen bg-primary-bg">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-color mb-4 font-headline">
            AI Job Board
          </h1>
          <p className="text-lg text-light-purple mb-6">
            Find your next opportunity in the exciting world of AI.
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-purple" size={20} />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-primary-bg"
            />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 pb-12">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-light-purple mb-2">No jobs found</p>
              <p className="text-sm text-light-purple mb-4">
                Try adjusting your search terms.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-accent hover:text-accent underline"
              >
                Clear search
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<JobsPageProps> = async () => {
  try {
    const jobs = await fetchAllJobs()
    return {
      props: { jobs },
      revalidate: 300, // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return {
      props: { jobs: [] },
      revalidate: 60, // Retry more frequently on error
    }
  }
}