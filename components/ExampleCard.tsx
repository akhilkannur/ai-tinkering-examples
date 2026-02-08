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
      className={`card group cursor-pointer relative flex flex-col bg-secondary-bg rounded-none overflow-hidden border-4 border-black transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 ${
        isPremium ? 'opacity-90' : ''
      }`}
    >
      {/* Premium Lock Overlay */}
      {isPremium && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] text-center p-4">
          <div className="bg-black p-4 rounded-none mb-3 shadow-lg border-2 border-accent">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
              <rect x="3" y="11" width="18" height="11" rx="0" ry="0"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <span className="text-black font-black tracking-widest uppercase text-xs bg-accent px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">Premium Example</span>
        </div>
      )}

      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-black border-b-4 border-black">
          {!imageUrl || imageStatus === 'error' ? (
            <div className="absolute inset-0 bg-secondary-bg flex flex-col items-center justify-center gap-2 opacity-50">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <>
              {imageStatus === 'loading' && !blurImageUrl && (
                <div className="absolute inset-0 bg-secondary-bg flex items-center justify-center">
                  <div className="text-black text-xs font-mono font-bold uppercase tracking-widest">Loading...</div>
                </div>
              )}
              <Image
                src={imageUrl}
                alt={example.title}
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-500 ease-out grayscale group-hover:grayscale-0"
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
            </>
          )}
        </div>

        <div className="p-6 flex flex-col gap-3 relative bg-white">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-headline font-bold leading-tight text-black line-clamp-2 uppercase">
              {example.title}
            </h3>
          </div>

          {example.summary && (
            <p className="text-sm text-black/80 line-clamp-2 leading-relaxed font-mono font-medium">
              {example.summary}
            </p>
          )}

          <div className="pt-4 mt-auto border-t-2 border-black border-dashed flex items-center justify-between text-[10px] font-black font-mono text-black/40 uppercase tracking-widest">
             {example.read_time && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {example.read_time}m
              </span>
            )}
            <span className="text-black group-hover:text-primary-bg transition-colors flex items-center gap-1">
              OPEN BLUEPRINT <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
