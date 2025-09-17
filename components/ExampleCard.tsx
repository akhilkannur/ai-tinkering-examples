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
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const img = example.screenshots?.[0]?.url
  // Temporarily disable Cloudinary optimization
  // const optimizedImageUrl = optimizeImageUrl(img, 400)
  const optimizedImageUrl = img
  const publishDate = example.publish_date ? new Date(example.publish_date) : null
  
  // Generate the SEO-friendly URL
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const exampleUrl = `/ai-examples/${categorySlug}/${example.slug}`
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${exampleUrl}` : `https://your-domain.com${exampleUrl}`

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on share button or links
    if ((e.target as HTMLElement).closest('.share-button') || (e.target as HTMLElement).closest('.external-link') || (e.target as HTMLElement).closest('.sponsor-link')) {
      return
    }
    e.preventDefault()
    onOpen(example)
  }

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowShareMenu(!showShareMenu)
  }

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setShowShareMenu(false)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const shareOnSocial = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    console.log('Share button clicked:', platform) // Debug log
    console.log('Full URL:', fullUrl) // Debug log
    
    const encodedUrl = encodeURIComponent(fullUrl)
    const encodedTitle = encodeURIComponent(example.title)
    const encodedDescription = encodeURIComponent(example.summary || example.title)

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    }

    const url = shareUrls[platform as keyof typeof shareUrls]
    console.log('Generated share URL:', url) // Debug log
    
    if (url) {
      // Try different approaches for opening the popup
      try {
        // Method 1: Standard window.open
        const popup = window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
        
        // Check if popup was blocked
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          // Fallback: Try opening in same tab
          console.log('Popup blocked, trying fallback...')
          window.open(url, '_blank')
        } else {
          console.log('Popup opened successfully')
        }
      } catch (error) {
        console.error('Error opening share popup:', error)
        // Ultimate fallback: direct navigation
        window.location.href = url
      }
      
      setShowShareMenu(false)
      
      // Analytics tracking if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: platform,
          content_type: 'example',
          item_id: example.slug
        })
      }
    } else {
      console.error('No URL generated for platform:', platform)
    }
  }

  const sponsorLogo = sponsor?.logo?.[0]?.url;

  return (
    <article className="card hover:shadow-lg transition-all duration-200 group cursor-pointer hover:scale-[1.02] transform relative flex flex-col">
      {/* SEO Link wrapper - invisible but covers the card for crawlers */}
      <Link href={exampleUrl} className="absolute inset-0 z-0" aria-label={example.title}>
        <span className="sr-only">View {example.title} details</span>
      </Link>

      {/* Card content with higher z-index */}
      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        {img && (
          <div className="relative w-full h-64 mb-3 overflow-hidden rounded-t-2xl bg-slate-100"> 
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


          </div>
        )}

        <div className="space-y-3 flex-grow flex flex-col p-4 bg-white rounded-b-2xl"> 
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                {example.title}
              </h3>
              <div className="flex items-center gap-2 ml-2 shrink-0">
                <span className="text-sm text-slate-500">{example.read_time ?? 1} min</span> 
                {example.original_link && (
                  <a
                    href={example.original_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link p-1 text-slate-400 hover:text-slate-600 transition-colors" 
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View original source"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Removed summary: example.summary && <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mt-2">{example.summary}</p> */}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2 flex-wrap items-center">
                {example.Sponsored && (
                  <span className="px-2 py-1 text-xs border rounded-md bg-yellow-100 text-yellow-800 font-semibold">
                    Sponsored
                  </span>
                )}
                {example.category && (
                  <span className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700"> {/* Removed border */}
                    {example.category}
                  </span>
                )}
                {example.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs text-slate-500 bg-slate-100 rounded-md"> 
                    #{tag}
                  </span>
                ))}
                {example.tags && example.tags.length > 2 && (
                  <span className="px-2 py-1 text-xs text-slate-400 bg-slate-100 rounded-md"> 
                    +{example.tags.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {publishDate && (
                  <time dateTime={example.publish_date} className="text-xs text-slate-400"> 
                    {publishDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
                
                {/* Share button */}
                <div className="relative share-button">
                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" 
                    aria-label="Share example"
                  >
                    <Share2 size={14} />
                  </button>

                  {/* Share dropdown menu */}
                  {showShareMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 py-2 min-w-[160px] z-30"> 
                      <button
                        type="button"
                        onClick={(e) => shareOnSocial('facebook', e)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-slate-700" 
                      >
                        <Facebook size={16} className="text-[#1877F2]" />
                        <span className="text-sm">Facebook</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => shareOnSocial('twitter', e)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-slate-700" 
                      >
                        <Twitter size={16} className="text-[#1DA1F2]" />
                        <span className="text-sm">Twitter</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => shareOnSocial('linkedin', e)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-slate-700" 
                      >
                        <Linkedin size={16} className="text-[#0A66C2]" />
                        <span className="text-sm">LinkedIn</span>
                      </button>
                      
                      <div className="border-t border-slate-100 my-1"></div> 
                      
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-slate-700" 
                      >
                        {copied ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Link2 size={16} className="text-slate-600" /> 
                        )}
                        <span className="text-sm">
                          {copied ? 'Copied!' : 'Copy link'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </article>
  )
}
