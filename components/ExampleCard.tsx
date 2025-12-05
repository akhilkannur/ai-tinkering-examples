import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExampleRecord, SponsorRecord } from "../lib/airtable";
import Image from "next/image";
import { Clock } from "lucide-react";
import { optimizeImageUrl } from "../utils/cloudinary";

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

  const rawAirtableUrl = example.screenshots?.[0]?.url;
  const imageUrl = optimizeImageUrl(rawAirtableUrl, example.cloudinaryPublicId, 800);
  const blurImageUrl = optimizeImageUrl(rawAirtableUrl, example.cloudinaryPublicId, 100);

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
      className="card group cursor-pointer relative flex flex-col bg-secondary-bg rounded-none overflow-hidden border border-navy-dark hover:border-accent transition-colors duration-75"
    >
      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-secondary-bg border-b border-navy-dark group-hover:border-accent transition-colors duration-75">
          {!imageUrl || imageStatus === 'error' ? (
            <div className="absolute inset-0 bg-secondary-bg flex flex-col items-center justify-center gap-2">
              <svg className="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-500 text-sm">Preview unavailable</p>
            </div>
          ) : (
            <>
              {imageStatus === 'loading' && !blurImageUrl && (
                <div className="absolute inset-0 bg-secondary-bg flex items-center justify-center">
                  <div className="text-slate-500 text-sm font-mono">Loading...</div>
                </div>
              )}
              <Image
                src={imageUrl}
                alt={example.title}
                fill
                className="object-cover object-left-top opacity-90 group-hover:opacity-100 transition-opacity duration-100"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                quality={80}
                onLoad={() => setImageStatus('loaded')}
                onError={() => setImageStatus('error')}
                {...(blurImageUrl && {
                  placeholder: 'blur',
                  blurDataURL: blurImageUrl,
                })}
              />
              {/* Scanline effect overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
            </>
          )}
        </div>

        <div className="p-5 sm:p-6 text-left relative">
          {/* Hover indicator line */}
          <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300 ease-out"></div>
          
          <h3 className="text-lg sm:text-xl font-mono font-bold leading-tight text-text-color line-clamp-2 group-hover:text-accent transition-colors duration-75 uppercase tracking-tight">
            {example.title}
          </h3>
          {example.read_time && (
            <div className="flex items-center mt-3 text-sm text-text-secondary font-mono group-hover:text-text-color transition-colors duration-75">
              <Clock size={14} className="mr-1.5" />
              <span>{example.read_time} min read</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
