import type { ToolRecord } from '../lib/airtable'
import Image from 'next/image'

interface ToolCardProps {
  tool: ToolRecord
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <motion.a
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      href={tool.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border border-light rounded-lg bg-white shadow-md h-full flex flex-col justify-between"
    >
      <div className="flex items-center gap-3">
        {tool.logo?.[0]?.url && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 mb-2"> 
            <Image 
              src={tool.logo[0].url}
              alt={`${tool.toolName} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-dark">{tool.toolName}</h3> 
        </div>
      </div>
    </motion.a>
  )
}