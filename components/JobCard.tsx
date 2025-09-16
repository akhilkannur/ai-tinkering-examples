import type { JobRecord } from '../lib/airtable'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

interface JobCardProps {
  job: JobRecord
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <a 
      href={job.jobUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors shadow-sm h-full flex flex-col justify-between"
    >
      <div>
        {job.companyLogo?.[0]?.url && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 mb-2">
            <Image 
              src={job.companyLogo[0].url}
              alt={`${job.companyName} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-sm font-semibold text-slate-900 mb-0.5">{job.jobTitle}</h3>
        <p className="text-xs text-slate-700">{job.companyName}</p>
        {job.location && (
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin size={10} /> {job.location}
          </p>
        )}
        {job.description && (
          <p className="text-xs text-slate-600 mt-2 line-clamp-2">{job.description}</p>
        )}
      </div>
    </a>
  )
}