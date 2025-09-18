import { motion, useInView } from 'framer-motion'
import React from 'react'
import type { JobRecord } from '../lib/airtable'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

interface JobCardProps {
  job: JobRecord
}

export default function JobCard({ job }: JobCardProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      href={job.jobUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-transparent rounded-lg bg-primary-bg shadow-lg h-full flex flex-col justify-between transform hover:-translate-y-1 hover:border-accent transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        {job.companyLogo?.[0]?.url && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0"> 
            <Image 
              src={job.companyLogo[0].url}
              alt={`${job.companyName} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-text-color">{job.jobTitle}</h3> 
          <p className="text-xs text-text-color">{job.companyName}</p> 
          {job.location && (
            <p className="text-xs text-text-color flex items-center gap-1 mt-0.5"> 
              <MapPin size={10} /> {job.location}
            </p>
          )}
        </div>
      </div>
    </motion.a>
  )
}
