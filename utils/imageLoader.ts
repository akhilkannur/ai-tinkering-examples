// utils/imageLoader.ts

/**
 * Custom image loader for better control over image loading
 * This helps with Airtable images that sometimes fail to load
 */

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Next.js image loader function
 */
export function airtableImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // If it's not an Airtable URL, return as-is
  if (!src.includes('airtable')) {
    return src;
  }

  // For Airtable images, we'll use the original URL with query params
  const url = new URL(src);
  
  // Add width parameter if supported
  if (width) {
    url.searchParams.set('w', width.toString());
  }
  
  // Add quality parameter if supported
  if (quality) {
    url.searchParams.set('q', quality.toString());
  }

  return url.toString();
}

/**
 * Preload an image and return a promise
 */
export function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error('No image source provided'));
      return;
    }

    const img = new Image();
    const timeout = setTimeout(() => {
      reject(new Error(`Image load timeout: ${src}`));
    }, 10000); // 10 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(src);
    };
    
    img.onerror = (error) => {
      clearTimeout(timeout);
      console.error('Image preload failed:', src, error);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
}

/**
 * Retry image loading with exponential backoff
 */
export async function loadImageWithRetry(
  src: string, 
  maxRetries: number = 3
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await preloadImage(src);
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Failed to load image after ${maxRetries} attempts`);
}

/**
 * Check if image URL is valid and accessible
 */
export async function isImageAccessible(src: string): Promise<boolean> {
  try {
    await preloadImage(src);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get optimized Airtable image URL
 */
export function getOptimizedAirtableImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp';
  } = {}
): string {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    
    // Add optimization parameters if supported
    if (options.width) {
      urlObj.searchParams.set('w', options.width.toString());
    }
    
    if (options.height) {
      urlObj.searchParams.set('h', options.height.toString());
    }
    
    if (options.quality) {
      urlObj.searchParams.set('q', options.quality.toString());
    }
    
    if (options.format) {
      urlObj.searchParams.set('fm', options.format);
    }
    
    return urlObj.toString();
  } catch {
    return url; // Return original if URL parsing fails
  }
}