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
  // to ensure proper loading
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
    const img = new Image();
    
    img.onload = () => resolve(src);
    img.onerror = (error) => {
      console.error('Image preload failed:', src, error);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    // Set a timeout for slow-loading images
    const timeout = setTimeout(() => {
      reject(new Error(`Image load timeout: ${src}`));
    }, 10000); // 10 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(src);
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
}

/**
 * Extract image dimensions from URL or fetch from server
 */
export async function getImageDimensions(src: string): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    
    img.onerror = () => {
      resolve(null);
    };
    
    img.src = src;
  });
}

/**
 * Generate placeholder blur data URL
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  
  if (!canvas) {
    // Server-side fallback
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  }
  
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#fef6e4');
  gradient.addColorStop(1, '#f3d2c1');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/png');
}