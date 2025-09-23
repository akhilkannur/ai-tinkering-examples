import { Facebook, X, Linkedin, Link2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { ExampleRecord } from '../lib/airtable'
import { getSocialShareUrls } from '../utils/urlHelpers'

interface SocialSharingProps {
  // Support both direct URL or example record
  example?: ExampleRecord
  url?: string
  title: string
  description?: string
  className?: string
  compact?: boolean // For card view
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

  // Get share URLs - prefer example record for consistency
  const shareData = example 
    ? getSocialShareUrls(example)
    : {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url!)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url!)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url!)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || title)}`,
        url: url!
      }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleShare = (platform: string) => {
    // Track sharing analytics if you have analytics setup
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'example',
        item_id: example?.slug || title
      })
    }
  }

  if (compact) {
    // Compact version for cards - just share icons
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('facebook')}
          className="p-2 border rounded-full text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} />
        </a>

        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="p-2 border rounded-full text-slate-400 hover:text-black hover:border-black transition-colors"
          aria-label="Share on X"
        >
          <X size={20} />
        </a>

        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="p-2 border rounded-full text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} />
        </a>

        <button
          onClick={copyToClipboard}
          className="p-2 border rounded-full text-slate-400 hover:text-slate-600 hover:border-slate-600 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check size={20} /> : <Link2 size={20} />}
        </button>
      </div>
    )
  }

  // Full version for detail pages
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-sm font-medium text-gray-600">SHARE</span>
      <div className="flex items-center gap-2">
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="text-gray-500 hover:text-black transition-colors"
          aria-label="Share on X"
        >
          <X size={20} />
        </a>
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('facebook')}
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} />
        </a>
        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="text-gray-500 hover:text-blue-700 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  )
}