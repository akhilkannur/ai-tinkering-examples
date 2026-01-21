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
      {/* Translucent Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-white border border-slate-200 shadow-2xl rounded-sm overflow-hidden relative w-full max-w-4xl z-[110] animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 z-30"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top "Featured" Strip */}
        <div className="h-1 bg-accent w-full"></div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-sm overflow-hidden border border-slate-100 bg-slate-50 shadow-inner">
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 tracking-tight pr-8">
                  {tool.name}
                </h1>
                
                {/* Social Sharing */}
                <div className="flex items-center gap-3">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-black transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#0077b5] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-accent transition-colors uppercase tracking-wider border-l border-slate-200 pl-3 ml-1"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Metadata Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm">
                  {tool.category}
                </span>
                {tool.tags.price && (
                  <span className="border border-slate-200 text-slate-500 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm">
                    {tool.tags.price}
                  </span>
                )}
                {tool.tags.skill && (
                  <span className="border border-slate-200 text-slate-500 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm">
                    {tool.tags.skill}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {tool.description}
              </p>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-accent text-white px-6 py-3 rounded-sm font-bold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>

                {/* Direct Page Link */}
                <Link 
                  href={`/tools/${tool.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-accent font-mono text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-accent transition-all pb-1"
                >
                  Permalink <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex items-center justify-between">
           <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
             Verified Listing
           </span>
           <span className="text-xs font-sans font-bold text-accent">
             Real AI Examples
           </span>
        </div>
      </div>
    </div>
  );
}
