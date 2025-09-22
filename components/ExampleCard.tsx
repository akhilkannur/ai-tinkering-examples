import React from "react"
import { motion, useInView } from 'framer-motion'
import type { ExampleRecord, SponsorRecord } from "../lib/airtable"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Share2, ExternalLink, Clock } from "lucide-react"
import { Facebook, Twitter, Linkedin, Link2, Copy, Check } from "lucide-react"
import { optimizeImageUrl } from '../utils/cloudinary'

interface ExampleCardProps {
  example: ExampleRecord
  sponsor?: SponsorRecord
  priority?: boolean // For above-the-fold images
  onOpen: (example: ExampleRecord) => void
}

export default function ExampleCard({ example, sponsor, priority = false, onOpen }: ExampleCardProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
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
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="card group cursor-pointer relative flex flex-col bg-[#fef6e4] custom-shadow rounded-lg overflow-hidden border border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* SEO Link wrapper - invisible but covers the card for crawlers */}
      <Link href={exampleUrl} className="absolute inset-0 z-0" aria-label={example.title}>
        <span className="sr-only">View {example.title} details</span>
      </Link>

      {/* Card content with higher z-index */}
      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        {img && (
          <div className="relative w-full h-96 overflow-hidden bg-[#fef6e4]">
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
            )}

            {/* Error fallback */}
            {imageError && (
              <div className="absolute inset-0 bg-[#fef6e4] flex items-center justify-center">
                <div className="text-slate-400 text-sm">Image unavailable</div>
              </div>
            )}

            {!imageError && (
              <Image
                src={optimizedImageUrl || img || "/placeholder.svg"}
                alt={`${example.title} - AI workflow example screenshot`}
                fill
                className={`object-contain group-hover:scale-105 transition-transform duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                quality={80}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        )}
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold leading-tight text-text-color line-clamp-2">
            {example.title}
          </h3>
        </div>
      </div>
    </motion.article>
  )
}