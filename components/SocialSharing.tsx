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
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="p-2 border-2 border-black bg-white hover:bg-[#ccff00] transition-all brutalist-shadow-sm"
          aria-label="Share on X"
        >
          <X size={16} strokeWidth={3} />
        </a>

        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="p-2 border-2 border-black bg-white hover:bg-[#00ffff] transition-all brutalist-shadow-sm"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} strokeWidth={3} />
        </a>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <span className="font-display text-xs text-black uppercase tracking-widest bg-[#ccff00] px-2 py-0.5 border-2 border-black transform rotate-2">SHARE</span>
      <div className="flex items-center gap-4">
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-[#00ffff] transition-all brutalist-shadow-sm"
          aria-label="Share on X"
        >
          <X size={20} strokeWidth={3} />
        </a>
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('facebook')}
          className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-[#ff00ff] hover:text-white transition-all brutalist-shadow-sm"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} strokeWidth={3} />
        </a>
        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-[#ccff00] transition-all brutalist-shadow-sm"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} strokeWidth={3} />
        </a>
      </div>
    </div>
  )
}
