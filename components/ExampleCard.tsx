import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExampleRecord, SponsorRecord } from "../lib/airtable";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
    if (isPremium) return;
    if ((e.target as HTMLElement).closest(".external-link")) return;
    e.preventDefault();
    onOpen(example);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
      transition={{ duration: 0.4 }}
      className={`group cursor-pointer flex flex-col bg-white border border-gray-100 hover:border-black transition-all duration-300 relative ${
        isPremium ? 'opacity-90' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        {!imageUrl || imageStatus === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={example.title}
              fill
              className="object-cover object-top grayscale-[20%] brightness-[0.98] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              onLoad={() => setImageStatus('loaded')}
              onError={() => setImageStatus('error')}
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
          </>
        )}
        
        {isPremium && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center p-4">
            <span className="text-white text-[10px] font-mono font-bold tracking-widest uppercase border border-white/20 px-3 py-1">Premium</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow border-t border-gray-100 group-hover:border-black transition-colors">
        <div className="mb-3">
          {example.category && (
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-gray-400 group-hover:text-black transition-colors">
              {example.category}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-display font-black leading-[1.1] text-black uppercase mb-4 tracking-tight">
          {example.title}
        </h3>

        {example.summary && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 font-medium">
            {example.summary}
          </p>
        )}

        <div className="mt-auto pt-6 flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
          <span>Read Workflow</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </motion.article>
  );
}
