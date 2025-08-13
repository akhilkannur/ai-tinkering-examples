import { Facebook, Twitter, Linkedin, Link2, Copy, Check } from 'lucide-react'
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
          className="p-2 text-slate-400 hover:text-[#1877F2] transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </a>

        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="p-2 text-slate-400 hover:text-[#1DA1F2] transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </a>

        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="p-2 text-slate-400 hover:text-[#0A66C2] transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </a>

        <button
          onClick={copyToClipboard}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
        </button>
      </div>
    )
  }

  // Full version for detail pages
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border ${className}`}>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">
          Found this helpful?
        </h3>
        <p className="text-sm text-slate-600">
          Share it with others who might benefit from this AI workflow
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Facebook */}
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook size={18} />
        </a>

        {/* Twitter */}
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center w-10 h-10 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#0C85D0] transition-colors"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter size={18} />
        </a>

        {/* LinkedIn */}
        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>

        {/* Native Share (Mobile) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={() => {
              navigator.share({
                title,
                text: description,
                url: shareData.url,
              })
              handleShare('native')
            }}
            className="flex items-center justify-center w-10 h-10 bg-slate-800 text-white rounded-lg hover:bg-black transition-colors sm:hidden"
            aria-label="Share"
            title="Share"
          >
            <Copy size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
