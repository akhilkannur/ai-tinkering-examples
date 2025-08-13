import type { ExampleRecord } from '../lib/airtable'
import Link from 'next/link'
import Image from 'next/image'

export default function ExampleCard({ example }: { example: ExampleRecord }) {
  const img = example.screenshots?.[0]?.url
  const publishDate = example.publish_date ? new Date(example.publish_date) : null
  
  // Generate SEO-friendly URL structure: /ai-examples/category/slug
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const exampleUrl = `/ai-examples/${categorySlug}/${example.slug}`
  
  return (
    <article className="card hover:shadow-md transition-shadow duration-200 group">
      <Link href={exampleUrl} className="block">
        {img && (
          <div className="relative w-full h-44 mb-3 overflow-hidden rounded-xl bg-slate-100">
            <Image 
              src={img} 
              alt={`${example.title} - AI workflow example screenshot`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold leading-tight group-hover:text-slate-700 transition-colors line-clamp-2">
              {example.title}
            </h3>
            <span className="text-sm text-slate-500 ml-2 shrink-0">
              {example.read_time ?? 1} min
            </span>
          </div>
          
          {example.summary && (
            <p className="text-sm text-slate-600 line-clamp-3">
              {example.summary}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {example.category && (
                <span className="px-2 py-1 text-xs border rounded-full bg-slate-50">
                  {example.category}
                </span>
              )}
              {example.tags?.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 text-xs text-slate-500 bg-slate-100 rounded-full">
                  #{tag}
                </span>
              ))}
              {example.tags && example.tags.length > 2 && (
                <span className="px-2 py-1 text-xs text-slate-400 bg-slate-100 rounded-full">
                  +{example.tags.length - 2}
                </span>
              )}
            </div>
            
            {publishDate && (
              <time 
                dateTime={example.publish_date}
                className="text-xs text-slate-400"
              >
                {publishDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
