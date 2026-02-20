import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface AIToolCardProps {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  slug?: string;
  onClick?: () => void;
}

export default function AIToolCard({ name, description, url, imageUrl, category, featured, slug, onClick }: AIToolCardProps) {
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

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const CardContent = () => (
    <>
      {featured && (
        <div className="absolute top-0 right-0 bg-[#ff00ff] text-white text-[8px] font-black px-2 py-0.5 z-20 uppercase tracking-widest border-b-2 border-l-2 border-black">
          Featured
        </div>
      )}
      {/* Top Bar: Icon + Action */}
      <div className="flex items-center justify-between p-4 border-b-2 border-black bg-gray-50">
        <div className="relative w-12 h-12 rounded-none overflow-hidden border-2 border-black bg-white brutalist-shadow-sm shadow-black/10">
          <Image
            src={imgSrc}
            alt={`${name} logo`}
            fill
            className="object-cover bg-white" 
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized={true}
          />
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
           <span className="text-[10px] font-black text-black border-2 border-black px-2 py-1 bg-[#ccff00] uppercase tracking-widest flex items-center gap-2 brutalist-shadow-sm">
             {slug ? 'View' : 'Open'} <ArrowRight className="w-3 h-3 stroke-[3px]" />
           </span>
        </div>
      </div>
      
      {/* Content Body */}
      <div className="p-5 flex-grow flex flex-col relative bg-white">
         <h3 className="text-lg font-display text-black group-hover:text-[#ff00ff] transition-colors mb-2 uppercase leading-tight">
           {name}
         </h3>
         
         <p className="text-xs text-black font-black font-mono leading-relaxed line-clamp-3 uppercase tracking-tighter">
           // {description}
         </p>
      </div>

      {/* Footer / Meta (Optional) */}
      {category && (
        <div className="px-4 py-2 border-t-2 border-black bg-gray-100">
          <span className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-[0.2em]">
            {category}
          </span>
        </div>
      )}
    </>
  );

  const cardClasses = `group flex flex-col h-full bg-white border-4 border-black brutalist-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 relative overflow-hidden cursor-pointer`;

  if (slug) {
    return (
      <Link href={`/tools/${slug}`} className={cardClasses} onClick={handleClick}>
        <CardContent />
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      onClick={handleClick}
    >
      <CardContent />
    </a>
  );
}
