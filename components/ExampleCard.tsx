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
      className={`card group cursor-pointer relative flex flex-col bg-white border-4 border-black transition-all duration-300 brutalist-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none ${
        isPremium ? 'opacity-90' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Category Badge */}
      {example.category && (
        <div className="absolute top-4 left-4 z-30 bg-black text-[#ccff00] px-2 py-0.5 text-[10px] font-display uppercase border-2 border-black">
          {example.category}
        </div>
      )}

      {/* Premium Lock Overlay */}
      {isPremium && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-[1px] text-center p-4">
          <div className="bg-white p-4 border-4 border-black mb-3 shadow-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <span className="text-[#ff00ff] font-display tracking-widest uppercase text-xs bg-white px-3 py-1 border-2 border-black">Premium Example</span>
        </div>
      )}

      <div className="relative z-10 flex-grow">
        <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-50 border-b-4 border-black">
          {!imageUrl || imageStatus === 'error' ? (
            <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center gap-2 opacity-50">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <>
              {imageStatus === 'loading' && !blurImageUrl && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-black text-xs font-mono font-bold animate-pulse uppercase tracking-widest">Loading...</div>
                </div>
              )}
              <Image
                src={imageUrl}
                alt={example.title}
                fill
                className="object-cover object-top opacity-95 group-hover:opacity-100 transition-all duration-500 ease-out grayscale-[15%] brightness-[0.98] group-hover:grayscale-0 group-hover:brightness-100"
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
              {/* Subtle Overlay to separate white screenshots from white background */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
            </>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3 relative">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-display text-lg leading-tight text-black line-clamp-2 group-hover:text-[#ff00ff] transition-colors duration-200 uppercase">
              {example.title}
            </h3>
          </div>

          {example.summary && (
            <p className="text-sm text-black line-clamp-2 leading-relaxed font-bold font-mono">
              // {example.summary}
            </p>
          )}

          <div className="pt-4 mt-auto flex items-center justify-between border-t-2 border-black/10">
             <div className="flex items-center gap-4 text-[10px] font-black font-mono text-black uppercase tracking-tighter">
                <span className="font-bold border border-black px-1 group-hover:bg-[#ccff00] group-hover:text-black transition-colors">Details</span>
             </div>
             <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
