const shareOnSocial = (platform: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    console.log('Share button clicked:', platform) // Debug log
    console.log('Full URL:', fullUrl) // Debug log
    
    const encodedUrl = encodeURIComponent(fullUrl)
    const encodedTitle = encodeURIComponent(example.title)
    const encodedDescription = encodeURIComponent(example.summary || example.title)

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
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
