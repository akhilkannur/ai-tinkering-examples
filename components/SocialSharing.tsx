import { Facebook, X, Linkedin, Link2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { ExampleRecord } from '../lib/airtable'
import { getSocialShareUrls } from '../utils/urlHelpers'
import { trackEvent } from '../utils/analytics'

interface SocialSharingProps {
  example?: ExampleRecord
  url?: string
  title: string
  description?: string
  className?: string
  compact?: boolean
}

export default function SocialSharing({ 
  example, 
  url, 
  title, 
  description, 
  className = '',
  compact = false 
}: SocialSharingProps) {
  const [copied, setCopied] = useState(false)

  const shareData = example 
    ? getSocialShareUrls(example)
    : {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url!)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url!)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url!)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || title)}`,
        url: url!
      }

  const handleShare = (platform: string) => {
    trackEvent('share', {
      method: platform,
      content_type: 'example',
      item_id: example?.slug || title
    })
  }

  if (compact) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="p-2 text-secondary-text hover:text-primary-text hover:bg-hero-tint rounded-md transition-all"
          aria-label="Share on X"
        >
          <X size={16} />
        </a>

        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="p-2 text-secondary-text hover:text-primary-text hover:bg-hero-tint rounded-md transition-all"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </a>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-[0.75rem] font-semibold text-secondary-text uppercase tracking-[0.05em]">Share</span>
      <div className="flex items-center gap-2">
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 flex items-center justify-center text-secondary-text hover:text-primary-text hover:bg-hero-tint border border-border-color rounded-md transition-all"
          aria-label="Share on X"
        >
          <X size={20} />
        </a>
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('facebook')}
          className="w-10 h-10 flex items-center justify-center text-secondary-text hover:text-primary-text hover:bg-hero-tint border border-border-color rounded-md transition-all"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} />
        </a>
        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="w-10 h-10 flex items-center justify-center text-secondary-text hover:text-primary-text hover:bg-hero-tint border border-border-color rounded-md transition-all"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  )
}
