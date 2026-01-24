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
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans text-slate-900">
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

      {/* Main Container - Centered Focus Mode */}
      <main className="flex-grow flex flex-col items-center justify-center container mx-auto px-4 py-12 relative">
        
        {/* Clickable Backdrop Area (Optional: To mimic modal closing) */}
        <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => router.push('/tools')}
            aria-label="Return to directory"
        />

        {/* Floating Back Link (Visible but unobtrusive) */}
        <div className="absolute top-8 left-4 md:left-8 z-10">
            <Link href="/tools" className="inline-flex items-center text-slate-500 hover:text-accent transition-colors text-sm font-mono uppercase tracking-wider group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
            </Link>
        </div>

        {/* Main Card (Z-Index to sit above backdrop) */}
        <div className="bg-white border border-slate-200 shadow-xl rounded-sm overflow-hidden relative w-full max-w-4xl z-20">
            
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
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-slate-900 tracking-tight">
                      {tool.name}
                    </h1>
                    
                    {/* Share Buttons */}
                    <div className="flex items-center gap-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-black transition-colors"
                        aria-label="Share on X (Twitter)"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#0077b5] transition-colors"
                        aria-label="Share on LinkedIn"
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

                  {/* CTA Button */}
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-accent text-white px-6 py-3 rounded-sm font-bold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </a>

                </div>
              </div>
            </div>

            {/* Footer / Verified Msg */}
            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex items-center justify-between">
               <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                 Verified Listing
               </span>
               <span className="text-xs font-sans font-bold text-accent">
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
