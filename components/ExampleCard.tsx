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
      className={`group flex flex-col bg-white rounded shadow-technical border border-gray-200 hover:border-terminal-green/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full ${
        isPremium ? 'opacity-90' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 transition-colors group-hover:bg-gray-100">
        {!imageUrl || imageStatus === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <i className="ph ph-image text-4xl text-gray-400"></i>
          </div>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={example.title}
              fill
              className="object-cover object-top grayscale-[30%] brightness-[0.95] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              onLoad={() => setImageStatus('loaded')}
              onError={() => setImageStatus('error')}
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
          </>
        )}

        {example.category && (
          <div className="absolute top-4 right-4 bg-white rounded px-3 py-1 font-mono text-[9px] tracking-widest uppercase text-secondary-text shadow-sm border border-gray-200">
            {example.category}
          </div>
        )}

        {isPremium && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm text-center p-4">
            <span className="text-white text-[10px] font-mono font-bold tracking-widest uppercase border border-white/20 px-3 py-1">Premium</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-light-placeholder font-mono uppercase text-[9px] tracking-widest">
            {example.category || 'EXAMPLE'}
          </span>
        </div>

        <h3 className="text-xl font-display font-semibold text-primary-text mb-3 leading-tight group-hover:text-terminal-green transition-colors line-clamp-2">
          {example.title}
        </h3>

        {example.summary && (
          <p className="text-secondary-text font-light mb-6 line-clamp-3 leading-relaxed text-sm">
            {example.summary}
          </p>
        )}

        <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center font-medium text-primary-text text-xs">
                    {example.author_name ? example.author_name.charAt(0) : 'R'}
                </div>
                <span className="font-medium text-sm text-secondary-text">{example.author_name || 'Real AI'}</span>
            </div>
            <div className="w-9 h-9 rounded bg-gray-50 flex items-center justify-center text-light-placeholder group-hover:bg-terminal-green group-hover:text-white transition-colors">
                <i className="ph ph-arrow-up-right text-base"></i>
            </div>
        </div>
      </div>
    </motion.article>
  );
}
