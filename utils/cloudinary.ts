// utils/cloudinary.ts
export function optimizeImageUrl(airtableUrl: string, width?: number) {
  if (!airtableUrl) return null
  
  const cloudinaryBase = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/fetch/`
  const transforms = [
    'f_auto', // Auto format (WebP, AVIF)
    'q_auto', // Auto quality
    width ? `w_${width}` : 'w_800', // Auto width
    'c_fill' // Fill mode
  ].join(',')
  
  return `${cloudinaryBase}${transforms}/${encodeURIComponent(airtableUrl)}`
}
