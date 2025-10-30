import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExampleRecord, SponsorRecord } from "../lib/airtable";
import Image from "next/image";
import { Clock } from "lucide-react";

interface ExampleCardProps {
  example: ExampleRecord;
  sponsor?: SponsorRecord;
  priority?: boolean;
  onOpen: (example: ExampleRecord) => void;
}

export default function ExampleCard({
  example,
  sponsor,
  priority = false,
  onOpen,
}: ExampleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when example changes
    setImageStatus('loading');
    const imageUrl = example.screenshots?.[0]?.url;
    
    if (!imageUrl) {
      setImageStatus('error');
      return;
    }

    // Pre-load the image
    const img = new window.Image();
    
    img.onload = () => {
      setImageSrc(imageUrl);
      setImageStatus('loaded');
    };
    
    img.onerror = () => {
      console.error('Failed to load image:', imageUrl);
      setImageStatus('error');
    };

    // Start loading
    img.src = imageUrl;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [example.screenshots]);

  // Generate the SEO-friendly URL
  const categorySlug =
    example.category?.toLowerCase().replace(/\s+/g, "-") || "uncategorized";
  const exampleUrl = `/ai-examples/${categorySlug}/${example.slug}`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(".share-button") ||
      (e.target as HTMLElement).closest(".external-link") ||
      (e.target as HTMLElement).closest(".sponsor-link")
    ) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    onOpen(example);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="card group cursor-pointer relative flex flex-col bg-[#fef6e4] custom-shadow rounded-2xl overflow-hidden border border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#fef6e4] rounded-t-2xl">
          {/* Loading State */}
          {imageStatus === 'loading' && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 text-sm animate-pulse">Loading...</div>
              </div>
            </div>
          )}

          {/* Error State */}
          {imageStatus === 'error' && (
            <div className="absolute inset-0 bg-[#fef6e4] flex flex-col items-center justify-center gap-2 p-4">
              <svg 
                className="w-12 h-12 text-slate-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <div className="text-slate-400 text-sm text-center">
                Image preview unavailable
              </div>
            </div>
          )}

          {/* Loaded Image */}
          {imageStatus === 'loaded' && imageSrc && (
            <>
              <Image
                src={imageSrc}
                alt={`${example.title} - AI workflow example`}
                fill
                className="object-cover object-left-top group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                quality={85}
                unoptimized={false}
              />
              <div className="absolute inset-0 bg-blue-900 opacity-10 group-hover:opacity-5 transition-opacity duration-300"></div>
            </>
          )}
        </div>

        <div className="p-3 sm:p-4 text-center">
          <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-text-color line-clamp-2">
            {example.title}
          </h3>
          {example.read_time && (
            <div className="flex items-center justify-center text-sm text-slate-600 mt-2">
              <Clock size={14} className="mr-1" />
              <span>{example.read_time} min read</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}