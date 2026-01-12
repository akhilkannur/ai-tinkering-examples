import Image from 'next/image';
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AIToolCardProps {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
}

export default function AIToolCard({ name, description, url, imageUrl, category }: AIToolCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full bg-primary-bg border border-navy-dark hover:border-accent transition-all duration-300 relative overflow-hidden flex flex-col"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />

      {/* Image Section */}
      <div className="relative w-full h-40 overflow-hidden bg-navy-dark border-b border-navy-dark group-hover:border-accent/50 transition-colors z-10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} logo`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-navy-light text-xs font-mono">
            NO IMAGE
          </div>
        )}
        
        {/* Category Badge - Absolute Top Left */}
        {category && (
           <div className="absolute top-2 left-2 z-20">
             <span className="inline-block bg-primary-bg/90 backdrop-blur-sm border border-navy-light text-accent text-[10px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
               {category}
             </span>
           </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-headline font-bold text-text-color group-hover:text-accent transition-colors duration-200 line-clamp-1">
              {name}
            </h3>
            <ExternalLink className="w-4 h-4 text-navy-light group-hover:text-accent transition-colors duration-200 flex-shrink-0 mt-1" />
        </div>
        
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4 flex-grow font-sans">
          {description}
        </p>

        {/* 'Visit Tool' Text appearing on Hover? Or just subtle indicator */}
        <div className="pt-3 border-t border-navy-dark group-hover:border-accent/30 transition-colors mt-auto">
            <span className="text-xs font-mono font-bold text-navy-light group-hover:text-accent flex items-center gap-1 uppercase tracking-widest transition-colors">
               Try Tool <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </span>
        </div>
      </div>
    </a>
  );
}
