"use client"

import type React from "react"
import type { ExampleRecord } from "../lib/airtable"
import Image from "next/image"
import { useState } from "react"

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

  return (
    <article
      className="card hover:shadow-lg transition-all duration-200 group cursor-pointer hover:scale-[1.02] transform"
      onClick={handleCardClick}
    >
      {img && (
        <div className="relative w-full h-44 mb-3 overflow-hidden rounded-xl bg-slate-100">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
          )}

          {/* Error fallback */}
          {imageError && (
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <div className="text-slate-400 text-sm">Image unavailable</div>
            </div>
          )}

          {!imageError && (
            <Image
              src={img || "/placeholder.svg"}
              alt={`${example.title} - AI workflow example screenshot`}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
              unoptimized={false}
            />
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {example.title}
          </h3>
          <span className="text-sm text-slate-500 ml-2 shrink-0">{example.read_time ?? 1} min</span>
        </div>

        {example.summary && <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{example.summary}</p>}

        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {example.category && (
              <span className="px-2 py-1 text-xs border rounded-full bg-slate-50 text-slate-700">
                {example.category}
              </span>
            )}
            {example.tags?.slice(0, 2).map((tag) => (
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
            <time dateTime={example.publish_date} className="text-xs text-slate-400">
              {publishDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}
