export function optimizeImageUrl(airtableUrl: string | undefined | null, publicId?: string | null, width?: number) {
  if (!airtableUrl && !publicId) return null
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
    return airtableUrl || null;
  }

  const w = width ? `w_${width}` : 'w_800'
  // c_fill might crop if aspect ratio differs, c_limit is safer if we just want to resize. 
  // But original used c_fill. Sticking to it but maybe 'c_limit' is better if we don't want cropping?
  // Let's stick to previous behavior: 'c_fill'
  const transforms = `f_auto,q_auto,${w},c_fill`

  // 1. Preferred: Permanent Cloudinary ID
  if (publicId) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`
  }
  
  // 2. Fallback: Fetch URL (for non-synced images)
  // Note: This relies on the Airtable URL being valid at the time of request
  if (airtableUrl) {
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodeURIComponent(airtableUrl)}`
  }

  return null
}