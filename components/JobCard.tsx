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
  const blurDataURL = job.companyLogo?.[0]?.thumbnails?.small?.url || job.companyLogo?.[0]?.thumbnails?.large?.url;

  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      href={job.jobUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-navy-dark rounded-none bg-secondary-bg shadow-none h-full flex flex-col justify-between hover:border-accent transition-colors duration-75 group"
    >
      <div className="flex items-center gap-3">
        {job.companyLogo?.[0]?.url && (
          <div className="relative w-10 h-10 rounded-none overflow-hidden bg-white flex-shrink-0 border border-navy-dark group-hover:border-accent transition-colors duration-75"> 
            <Image 
              src={job.companyLogo[0].thumbnails?.large?.url || job.companyLogo[0].url}
              alt={`${job.companyName} logo`}
              fill
              className="object-contain p-1"
              {...(blurDataURL && {
                placeholder: 'blur',
                blurDataURL: blurDataURL,
              })}
            />
          </div>
        )}
        <div>
          <h3 className="text-sm font-mono font-bold text-text-color group-hover:text-accent transition-colors duration-75">{job.jobTitle}</h3> 
          <p className="text-xs font-mono text-text-secondary group-hover:text-text-color transition-colors duration-75">{job.companyName}</p> 
          {job.location && (
            <p className="text-xs font-mono text-text-secondary flex items-center gap-1 mt-0.5 group-hover:text-text-color transition-colors duration-75"> 
              <MapPin size={10} /> {job.location}
            </p>
          )}
        </div>
      </div>
    </motion.a>
  )
}
