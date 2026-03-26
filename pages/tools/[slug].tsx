import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ArrowLeft, ExternalLink, Share2, Check, Twitter, Linkedin } from 'lucide-react';

import Navbar from '../../components/Navbar';
import { aiTools, AiTool } from '../../lib/ai-tools-data';

// Helper to slugify names
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

interface ToolPageProps {
  tool: AiTool;
}

export default function ToolPage({ tool }: ToolPageProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Fallback logo logic (same as Card)
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch (e) { return ''; }
  };
  const hostname = getHostname(tool.url);
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool.image || fallbackLogo);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // If page is not generated yet
  if (router.isFallback) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  const handleShare = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Check out ${tool.name} on Real AI Examples!`;

  return (
    <div className="flex flex-col min-h-screen bg-page-bg font-sans text-primary-text selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>{tool.name} | Verified on Real AI Examples</title>
        <meta name="description" content={`Check out ${tool.name} on Real AI Examples. ${tool.description}`} key="description" />
        
        {/* Open Graph / Social */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={`${tool.name} | Featured on Real AI Examples`} key="og:title" />
        <meta property="og:description" content={tool.description} key="og:description" />
        <meta property="og:image" content={imgSrc} key="og:image" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={`${tool.name} | Featured on Real AI Examples`} key="twitter:title" />
        <meta name="twitter:description" content={tool.description} key="twitter:description" />
        <meta name="twitter:image" content={imgSrc} key="twitter:image" />
      </Head>

      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center container mx-auto px-4 pt-32 pb-24 relative z-10">
        
        <div className="absolute top-32 left-4 md:left-8 z-30">
            <Link href="/tools" className="inline-flex items-center text-secondary-text hover:text-accent-dark transition-colors text-[10px] font-mono font-bold uppercase tracking-widest group bg-white px-4 py-2 border-2 border-accent-dark shadow-brutalist-sm">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Tools
            </Link>
        </div>

        <div className="bg-white border-4 border-accent-dark shadow-brutalist overflow-hidden relative w-full max-w-4xl">
            
            <div className="h-2 bg-[#ff00ff] w-full border-b-2 border-accent-dark"></div>

            <div className="p-8 md:p-16">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                
                {/* Logo Section */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 relative border-4 border-accent-dark bg-white shadow-brutalist-sm rotate-1">
                     <Image
                        src={imgSrc}
                        alt={`${tool.name} logo`}
                        fill
                        className="object-cover p-4"
                        onError={() => setImgSrc(fallbackLogo)}
                        unoptimized={true}
                      />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <h1 className="text-4xl md:text-6xl font-display font-black text-primary-text tracking-tight uppercase leading-none mb-4">
                        {tool.name}
                      </h1>
                      <div className="inline-block bg-[#ccff00] text-black px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border-2 border-accent-dark">
                        {tool.category}
                      </div>
                    </div>
                    
                    {/* Share Buttons */}
                    <div className="flex items-center gap-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center border-2 border-accent-dark bg-white hover:bg-[#ccff00] transition-all shadow-brutalist-sm"
                        aria-label="Share on X"
                      >
                        <Twitter size={18} />
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center border-2 border-accent-dark bg-white hover:bg-[#ff00ff] hover:text-white transition-all shadow-brutalist-sm"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                      <button 
                        onClick={handleShare}
                        className="h-10 px-4 flex items-center gap-2 text-[10px] font-mono font-bold text-accent-dark border-2 border-accent-dark bg-white hover:bg-hero-tint transition-all shadow-brutalist-sm uppercase tracking-widest"
                      >
                        {copied ? <Check size={14} /> : <Share2 size={14} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-3 mb-10">
                    {tool.tags.price && (
                      <span className="bg-hero-tint text-secondary-text px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border border-border-color">
                        Price: {tool.tags.price}
                      </span>
                    )}
                    {tool.tags.skill && (
                      <span className="bg-hero-tint text-secondary-text px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border border-border-color">
                        Skill: {tool.tags.skill}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xl text-secondary-text leading-relaxed mb-12 font-medium">
                    {tool.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-accent-dark text-white px-8 py-4 border-4 border-accent-dark font-display text-xl uppercase transition-all shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
                  >
                    Visit {tool.name}
                    <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  </a>

                </div>
              </div>
            </div>

            {/* Footer / Verified Msg */}
            <div className="bg-hero-tint border-t-2 border-accent-dark px-8 py-4 flex items-center justify-between">
               <span className="text-[10px] font-mono font-bold text-secondary-text uppercase tracking-widest">
                 Verified Tool Listing
               </span>
               <span className="text-[10px] font-mono font-bold text-[#ff00ff] uppercase tracking-widest">
                 Real AI Examples
               </span>
            </div>
        </div>

      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = aiTools.map((tool) => ({
    params: { slug: slugify(tool.name) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const tool = aiTools.find((t) => slugify(t.name) === slug);

  if (!tool) {
    return { notFound: true };
  }

  return {
    props: { tool },
  };
};
