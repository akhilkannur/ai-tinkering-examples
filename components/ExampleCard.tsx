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
      className={`group flex flex-col bg-white rounded-[2rem] shadow-soft border border-coffee-100 hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden h-full ${
        isPremium ? 'opacity-90' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-coffee-50 transition-colors group-hover:bg-[#f2efe9]">
        {!imageUrl || imageStatus === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <i className="ph ph-image text-4xl text-coffee-400"></i>
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
        
        {example.category && (
          <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 font-medium text-[10px] tracking-widest uppercase text-coffee-700 shadow-sm border border-coffee-100/50">
            {example.category}
          </div>
        )}

        {isPremium && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-coffee-900/80 backdrop-blur-sm text-center p-4">
            <span className="text-white text-[10px] font-mono font-bold tracking-widest uppercase border border-white/20 px-3 py-1">Premium</span>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-coffee-500 font-semibold uppercase text-[10px] tracking-widest">
            {example.category || 'Example'}
          </span>
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-coffee-900 mb-3 leading-tight group-hover:text-coffee-600 transition-colors line-clamp-2">
          {example.title}
        </h3>

        {example.summary && (
          <p className="text-coffee-700 font-light mb-8 line-clamp-3 leading-relaxed text-sm">
            {example.summary}
          </p>
        )}

        <div className="mt-auto pt-6 border-t border-coffee-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e6dbcf] flex items-center justify-center font-medium text-coffee-800 text-xs">
                    {example.author_name ? example.author_name.charAt(0) : 'R'}
                </div>
                <span className="font-medium text-sm text-coffee-800">{example.author_name || 'Real AI'}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-coffee-50 flex items-center justify-center text-coffee-500 group-hover:bg-coffee-900 group-hover:text-white transition-colors">
                <i className="ph ph-arrow-up-right text-lg"></i>
            </div>
        </div>
      </div>
    </motion.article>
  );
}
