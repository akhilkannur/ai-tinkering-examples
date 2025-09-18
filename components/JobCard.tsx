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
      className="block p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all duration-200 shadow-md h-full flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transform" 
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
          <h3 className="text-sm font-semibold text-dark">{job.jobTitle}</h3> 
          <p className="text-xs text-medium">{job.companyName}</p> 
          {job.location && (
            <p className="text-xs text-medium flex items-center gap-1 mt-0.5"> 
              <MapPin size={10} /> {job.location}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}