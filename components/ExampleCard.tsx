import type React from "react"
import type { ExampleRecord, SponsorRecord } from "../lib/airtable"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Share2, ExternalLink } from "lucide-react"
import { Facebook, Twitter, Linkedin, Link2, Copy, Check } from "lucide-react"
import { optimizeImageUrl } from '../utils/cloudinary'

interface ExampleCardProps {
  example: ExampleRecord
  sponsor?: SponsorRecord
  priority?: boolean // For above-the-fold images
  onOpen: (example: ExampleRecord) => void
}

export default function ExampleCard({ example, sponsor, priority = false, onOpen }: ExampleCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const img = example.screenshots?.[0]?.url
  const optimizedImageUrl = img
  
  // Generate the SEO-friendly URL
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const exampleUrl = `/ai-examples/${categorySlug}/${example.slug}`

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on share button or links
    if ((e.target as HTMLElement).closest('.share-button') || (e.target as HTMLElement).closest('.external-link') || (e.target as HTMLElement).closest('.sponsor-link')) {
      return
    }
    e.preventDefault()
    onOpen(example)
  }

  return (
    <article className="card hover:shadow-lg transition-all duration-200 group cursor-pointer hover:scale-[1.02] transform relative flex flex-col">
      {/* SEO Link wrapper - invisible but covers the card for crawlers */}
      <Link href={exampleUrl} className="absolute inset-0 z-0" aria-label={example.title}>
        <span className="sr-only">View {example.title} details</span>
      </Link>

      {/* Card content with higher z-index */}
      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        {img && (
          <div className="relative w-full h-64 overflow-hidden rounded-t-2xl bg-slate-100"> 
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
                src={optimizedImageUrl || img || "/placeholder.svg"}
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
                onError={(e) => {
                  console.error('Image failed to load:', optimizedImageUrl || img)
                  console.error('Error details:', e)
                  setImageError(true)
                  setImageLoading(false)
                }}
                unoptimized={false}
              />
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <h3 className="text-lg font-semibold leading-tight text-white line-clamp-2">
                {example.title}
              </h3>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}