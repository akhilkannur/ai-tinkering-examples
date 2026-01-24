import { useState, useEffect, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import JobCard from '../../components/JobCard'
import { fetchAllJobs, JobRecord } from '../../lib/airtable'

interface JobsPageProps {
  jobs: JobRecord[]
}

export default function JobsPage({ jobs }: JobsPageProps) {
  const [filteredJobs, setFilteredJobs] = useState<JobRecord[]>([])

  useEffect(() => {
    let results = jobs

    setFilteredJobs(results)
  }, [jobs])

  return (
    <>
      <Head>
        <title>AI Jobs | Find Your Next Role in AI - Real AI Examples</title>
        <meta name="description" content="Browse a curated list of AI job openings from top companies." key="description" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content="AI Jobs | Find Your Next Role in AI" key="og:title" />
        <meta property="og:description" content="Browse a curated list of AI job openings from top companies." key="og:description" />
        <meta property="og:url" content="https://realaiexamples.com/jobs" key="og:url" />
        <meta property="og:image" content="https://realaiexamples.com/api/og?mode=home" key="og:image" />
        <meta property="og:site_name" content="Real AI Examples" key="og:site_name" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content="AI Jobs | Find Your Next Role in AI" key="twitter:title" />
        <meta name="twitter:description" content="Browse a curated list of AI job openings from top companies." key="twitter:description" />
        <meta name="twitter:image" content="https://realaiexamples.com/api/og?mode=home" key="twitter:image" />
      </Head>

      <div className="min-h-screen bg-primary-bg">
        <Navbar />
        
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-text-color mb-6 tracking-tight leading-tight uppercase">
            AI Job <span className="text-accent">Board</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Find your next opportunity in the exciting world of AI.
          </p>
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
              <p className="text-text-secondary mb-2">No jobs found</p>
              <p className="text-sm text-text-secondary mb-4">
                Try adjusting your search terms.
              </p>
              <button
                onClick={() => {}}
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