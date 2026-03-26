import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExampleRecord, SponsorRecord } from "../lib/airtable";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { optimizeImageUrl } from "../utils/cloudinary";

interface ExampleCardProps {
  example: ExampleRecord;
  sponsor?: SponsorRecord;
  priority?: boolean;
  onOpen: (example: ExampleRecord) => void;
  isPremium?: boolean;
}

export default function ExampleCard({
  example,
  sponsor,
  priority = false,
  onOpen,
  isPremium = false,
}: ExampleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const rawAirtableUrl = example.screenshots?.[0]?.url;
  const imageUrl = optimizeImageUrl(rawAirtableUrl, example.cloudinaryPublicId, 800);
  const blurImageUrl = optimizeImageUrl(rawAirtableUrl, example.cloudinaryPublicId, 100);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isPremium) return; // Prevent opening if premium

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
      className={`group cursor-pointer flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover rounded-md ${
        isPremium ? 'opacity-90' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="relative flex-grow flex flex-col">
        {/* Image wrap: 16:10 aspect ratio */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-card-image-bg rounded-md mb-md">
          {!imageUrl || imageStatus === 'error' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-20">
              <svg className="w-10 h-10 text-primary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <>
              {imageStatus === 'loading' && !blurImageUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-border-color border-t-primary-text rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={imageUrl}
                alt={example.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                quality={85}
                onLoad={() => setImageStatus('loaded')}
                onError={() => setImageStatus('error')}
                {...(blurImageUrl && {
                  placeholder: 'blur',
                  blurDataURL: blurImageUrl,
                })}
              />
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 card-image-overlay pointer-events-none" />
            </>
          )}

          {/* Premium Lock Overlay */}
          {isPremium && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-accent-dark/80 backdrop-blur-[2px] text-center p-md">
              <div className="bg-white p-sm rounded-sm mb-sm shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-dark">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <span className="text-white text-[0.75rem] font-semibold tracking-wider uppercase">Premium</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          {/* Tag: Uppercase, muted, above title */}
          {example.category && (
            <div className="text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-secondary-text mb-xs">
              {example.category}
            </div>
          )}

          <h3 className="text-[1.125rem] font-semibold leading-tight text-primary-text mb-sm transition-colors duration-200">
            {example.title}
          </h3>

          {example.summary && (
            <p className="text-[0.875rem] font-normal text-secondary-text line-clamp-2 leading-relaxed mb-md">
              {example.summary}
            </p>
          )}

          <div className="mt-auto flex items-center gap-2 text-[0.875rem] font-medium text-primary-text group/link">
             <span>View workflow</span>
             <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
