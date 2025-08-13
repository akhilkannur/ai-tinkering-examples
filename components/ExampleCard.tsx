import React from 'react'
import type { ExampleRecord } from '../lib/airtable'
import { useState } from 'react'

interface ExampleCardProps {
  example: ExampleRecord
  priority?: boolean // For above-the-fold images
  onOpen: (example: ExampleRecord) => void
}

export default function ExampleCard({ example, priority = false, onOpen }: ExampleCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  
  const img = example.screenshots?.[0]?.url
  const publishDate = example.publish_date ? new Date(example.publish_date) : null
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onOpen(example)
  }

  // Debug: Log image URL to console
  if (img) {
    console.log('Image URL for', example.title, ':', img)
  }

  return (
    <article 
      className="card hover:shadow-lg transition-all duration-200 group cursor-pointer hover:scale-[1.02] transform"
      onClick={handleCardClick}
    >
      {img && (
        <div className="relative w-full h-44 mb-3 overflow-hidden rounded-xl bg-slate-100">
          {/* Loading placeholder */}
          {imageLoading && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
          )}
          
          {/* Error fallback */}
          {imageError && (
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center flex-col">
              <div className="text-slate-400 text-sm mb-2">Image unavailable</div>
              <div className="text-xs text-slate-400 px-2 text-center break-all">
                {img.length > 50 ? `${img.substring(0, 50)}...` : img}
              </div>
            </div>
          )}
          
          {/* Use regular img tag for better compatibility */}
          {!imageError && (
            <img 
              src={img}
              alt={`${example.title} - AI workflow example screenshot`}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => {
                setImageLoading(false)
                console.log('Image loaded successfully:', img)
              }}
              onError={(e) => {
                setImageError(true)
                setImageLoading(false)
                console.error('Image failed to load:', img, e)
              }}
              loading={priority ? 'eager' : 'lazy'}
            />
          )}
        </div>
      )}
      
      {/* Debug info - remove in production */}
      {!img && (
        <div className="w-full h-44 mb-3 bg-slate-100 rounded-xl flex items-center justify-center">
          <div className="text-slate-400 text-sm">No image URL found</div>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {example.title}
          </h3>
          <span className="text-sm text-slate-500 ml-2 shrink-0">
            {example.read_time ?? 1} min
          </span>
        </div>
        
        {example.summary && (
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {example.summary}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {example.category && (
              <span className="px-2 py-1 text-xs border rounded-full bg-slate-50 text-slate-700">
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
    </article>
  )
}
