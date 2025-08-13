import { Facebook, Twitter, Linkedin, Link2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface SocialSharingProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function SocialSharing({ url, title, description, className = '' }: SocialSharingProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
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
        item_id: title
      })
    }
  }

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
          href={shareLinks.facebook}
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
          href={shareLinks.twitter}
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
          href={shareLinks.linkedin}
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
                url,
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
