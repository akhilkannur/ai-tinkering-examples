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

  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('video') || c.includes('audio')) return 'bg-red-50 text-red-700 border-red-200';
    if (c.includes('productivity')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (c.includes('image')) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (c.includes('copywriting') || c.includes('content')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (c.includes('marketing')) return 'bg-green-50 text-green-700 border-green-200';
    if (c.includes('code')) return 'bg-yellow-50 text-yellow-700 border-yellow-700';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const CardContent = () => (
    <>
      {featured && (
        <div className="absolute top-0 right-0 bg-[#ff00ff] text-white text-[8px] font-black px-2 py-0.5 z-20 uppercase tracking-widest border-b-2 border-l-2 border-black">
          Featured
        </div>
      )}
      {/* Top Bar: Icon + Action */}
      <div className="flex items-center justify-between p-5 border-b-2 border-black bg-gray-50">
        <div className="relative w-16 h-16 rounded-none overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Image
            src={imgSrc}
            alt={`${name} logo`}
            fill
            className="object-contain p-2 bg-white" 
            onError={() => setImgSrc(fallbackLogo)}
            unoptimized={true}
          />
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
           <span className="text-[10px] font-black text-white border-2 border-black px-2 py-1 bg-black uppercase tracking-widest flex items-center gap-2 shadow-brutalist-sm">
             {slug ? 'View' : 'Open'} <ArrowRight className="w-3 h-3 stroke-[3px]" />
           </span>
        </div>
      </div>
      
      {/* Content Body */}
      <div className="p-5 flex-grow flex flex-col relative bg-white">
         <h3 className="text-xl font-display font-black text-black group-hover:text-[#ff00ff] transition-colors mb-3 uppercase leading-none tracking-tight">
           {name}
         </h3>
         
         <p className="text-sm text-secondary-text leading-relaxed line-clamp-3 font-medium">
           {description}
         </p>
      </div>

      {/* Footer / Meta (Prominent Tags) */}
      {category && (
        <div className="px-5 py-3 border-t-2 border-black bg-white">
          <span className={`inline-block px-2 py-1 text-[9px] font-black font-mono uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${getCategoryColor(category)}`}>
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
