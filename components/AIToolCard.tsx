import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface AIToolCardProps {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
}

export default function AIToolCard({ name, description, url, imageUrl, category }: AIToolCardProps) {
  // Extract hostname for favicon fallback
  const getHostname = (href: string) => {
    try {
      return new URL(href).hostname;
    } catch (e) {
      return '';
    }
  };

  const hostname = getHostname(url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  
  // State to handle image source. Default to imageUrl, fallback to Google Favicon if missing or broken.
  const [imgSrc, setImgSrc] = useState<string>(imageUrl || fallbackLogo);

  useEffect(() => {
    // If props change, reset (prioritize the provided image, or fallback immediately if empty)
    setImgSrc(imageUrl || fallbackLogo);
  }, [imageUrl, fallbackLogo]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-[#0B1221] border border-navy-dark hover:border-accent/50 transition-all duration-300 relative overflow-hidden rounded-sm hover:shadow-[0_0_20px_-5px_rgba(212,255,0,0.1)]"
    >
      {/* Top Bar: Icon + Action */}
      <div className="flex items-center justify-between p-4 border-b border-navy-dark/50 bg-secondary-bg/30">
        <div className="relative w-10 h-10 rounded-sm overflow-hidden border border-navy-dark bg-navy-dark">
          <Image
            src={imgSrc}
            alt={`${name} logo`}
            fill
            className="object-cover bg-white" 
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized={true} // Needed for external URLs like Google Favicons often
          />
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
           <span className="text-[10px] font-mono font-bold text-accent border border-accent/30 px-2 py-1 bg-accent/5 uppercase tracking-wider flex items-center gap-1">
             Open <ArrowRight className="w-3 h-3" />
           </span>
        </div>
      </div>
      
      {/* Content Body */}
      <div className="p-4 flex-grow flex flex-col relative">
         {/* Subtle Grid Background Effect */}
         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

         <h3 className="text-base font-headline font-bold text-text-color group-hover:text-accent transition-colors mb-2 tracking-tight">
           {name}
         </h3>
         
         <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 font-sans opacity-80 group-hover:opacity-100 transition-opacity">
           {description}
         </p>
      </div>

      {/* Footer / Meta (Optional) */}
      {category && (
        <div className="px-4 py-2 border-t border-navy-dark/50 bg-[#080c16]">
          <span className="text-[10px] font-mono text-navy-light uppercase tracking-widest">
            {category}
          </span>
        </div>
      )}
    </a>
  );
}
