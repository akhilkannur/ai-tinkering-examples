import { motion, useInView } from 'framer-motion'
import React from 'react'
import type { JobRecord } from '../lib/airtable'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'

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
      className="group block p-6 border-4 border-black bg-white brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-75 h-full flex flex-col justify-between"
    >
      <div className="flex items-start gap-4">
        {job.companyLogo?.[0]?.url && (
          <div className="relative w-12 h-12 rounded-none overflow-hidden bg-white flex-shrink-0 border-2 border-black brutalist-shadow-sm shadow-black/10 rotate-2 group-hover:rotate-0 transition-transform"> 
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
        <div className="flex-grow">
          <h3 className="font-display text-lg text-black group-hover:text-[#ff00ff] transition-colors leading-tight uppercase mb-1">{job.jobTitle}</h3> 
          <p className="text-xs font-black font-mono text-gray-500 uppercase tracking-widest">{job.companyName}</p> 
          {job.location && (
            <p className="text-[10px] font-black font-mono text-gray-400 flex items-center gap-1 mt-2 uppercase tracking-tighter bg-gray-100 px-1 border border-black inline-flex"> 
              <MapPin size={10} strokeWidth={3} /> {job.location}
            </p>
          )}
        </div>
        <ArrowRight size={16} className="text-black group-hover:translate-x-1 transition-transform stroke-[3px]" />
      </div>
    </motion.a>
  )
}
