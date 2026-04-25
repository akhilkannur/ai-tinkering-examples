import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ExternalLink, Share2, Check, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { AiTool } from '../lib/ai-tools-data';

interface ToolDetailModalProps {
  tool: AiTool;
  onClose: () => void;
}

export default function ToolDetailModal({ tool, onClose }: ToolDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Fallback logo logic
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch (e) { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = tool.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
      setCurrentUrl(`${window.location.origin}/tools/${slug}`);
    }
  }, [tool.name]);

  const handleShare = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Check out ${tool.name} on Real AI Examples!`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-white border-4 border-black brutalist-shadow relative w-full max-w-4xl z-[110] animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col sm:h-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black text-white hover:bg-[#ff00ff] p-2 z-30 border-2 border-black brutalist-shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 stroke-[3px]" />
        </button>

        <div className="p-5 sm:p-8 md:p-12 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-start">
            
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 relative rounded-none overflow-hidden border-4 border-black bg-white brutalist-shadow-sm">
                 <Image
                    src={imgSrc}
                    alt={`${tool.name} logo`}
                    fill
                    className="object-cover"
                    onError={() => setImgSrc(fallbackLogo)}
                    unoptimized={true}
                  />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-display text-black uppercase leading-none">
                  {tool.name}
                </h1>
                
                {/* Social Sharing */}
                <div className="flex items-center gap-4">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-[#00ffff] hover:text-black transition-all brutalist-shadow-sm"
                  >
                    <Twitter className="w-5 h-5 fill-current" />
                  </a>
                  <button 
                    onClick={handleShare}
                    className="bg-white text-black border-2 border-black px-4 py-2 font-display text-[10px] uppercase transition-all brutalist-shadow-sm hover:bg-[#ccff00]"
                  >
                    {copied ? <Check className="w-4 h-4 stroke-[3px] inline mr-2" /> : <Share2 className="w-4 h-4 stroke-[3px] inline mr-2" />}
                    {copied ? 'Copied' : 'Link'}
                  </button>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="flex flex-wrap gap-3 mb-6 sm:mb-10">
                <span className="bg-[#ccff00] text-black px-3 py-1 text-[10px] font-black font-mono uppercase border-2 border-black tracking-widest">
                  {tool.category}
                </span>
                {tool.tags.price && (
                  <span className="bg-black text-white px-3 py-1 text-[10px] font-black font-mono uppercase border-2 border-black tracking-widest transform rotate-1">
                    {tool.tags.price}
                  </span>
                )}
                </div>

              {/* Description */}
              <p className="text-base sm:text-xl text-black font-bold uppercase leading-tight border-l-8 border-[#ccff00] pl-4 sm:pl-6 py-3 sm:py-4 bg-gray-50 mb-6 sm:mb-10">
                {tool.description}
              </p>

              {/* Maker Info */}
              {tool.maker && (
                <div className="mb-6 sm:mb-10 p-4 bg-micro-layer-1 border-2 border-black brutalist-shadow-sm inline-flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none border-2 border-black overflow-hidden flex-shrink-0 bg-white">
                    <img src={tool.maker.image} alt={tool.maker.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-micro-muted mb-1">Maker</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black uppercase text-black">{tool.maker.name}</span>
                      {tool.maker.twitter && (
                        <a 
                          href={`https://x.com/${tool.maker.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-micro-muted hover:text-black transition-colors"
                        >
                          <Twitter className="w-3 h-3 fill-current" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-[#ccff00] px-6 py-3 sm:px-10 sm:py-4 border-4 border-black font-display text-sm sm:text-xl uppercase transition-all brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none inline-flex items-center gap-3"
                >
                  Visit Website
                  <ExternalLink className="w-6 h-6 stroke-[3px]" />
                </a>

                {/* Direct Page Link */}
                <Link 
                  href={`/tools/${tool.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`}
                  className="text-black font-black font-mono text-xs uppercase tracking-[0.2em] underline decoration-4 decoration-[#ff00ff] underline-offset-8 hover:text-[#ff00ff] transition-colors"
                  onClick={onClose}
                >
                  Permalink <ArrowRight className="w-4 h-4 inline-block ml-1" />
                </Link>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
