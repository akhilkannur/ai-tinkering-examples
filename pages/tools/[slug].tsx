import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { ExternalLink, ArrowLeft } from 'lucide-react';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

interface ToolPageProps {
  tool: AiTool | null;
}

export default function ToolPage({ tool }: ToolPageProps) {
  const getHostname = (href: string) => {
    try { return new URL(href).hostname; } catch { return ''; }
  };
  const hostname = tool ? getHostname(tool.url) : '';
  const fallbackLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  const [imgSrc, setImgSrc] = useState(tool?.image || fallbackLogo);

  if (!tool) {
    return <div className="flex items-center justify-center text-micro-muted font-mono">Tool not found</div>;
  }

  return (
    <>
      <Head>
        <title>{tool.name} — AI Tool | Real AI Examples</title>
        <meta name="description" content={tool.description} key="description" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="glass-sheet rounded-[32px] md:rounded-[48px] p-6 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-micro-muted uppercase tracking-widest hover:text-micro-fg transition-colors mb-8 md:mb-12 bg-white/50 px-4 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Back to Tools
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-10 md:mb-14">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-3 overflow-hidden shadow-soft">
              <Image
                src={imgSrc}
                alt={tool.name}
                width={96}
                height={96}
                className="object-contain"
                onError={() => setImgSrc(fallbackLogo)}
                unoptimized
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-micro-fg leading-[0.9] mb-4">
                {tool.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="px-4 py-1.5 rounded-full bg-micro-fg text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  {tool.category}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/50 border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                  {tool.tags.price}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-micro-fg font-medium leading-relaxed mb-12 pb-12 border-b border-micro-layer-1/50">
            {tool.description}
          </p>

          {tool.screenshot && (
            <div className="mb-16">
              <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-6">Live Preview</h2>
              <div className="rounded-3xl border border-micro-layer-1 overflow-hidden shadow-2xl bg-white relative aspect-[1.6/1]">
                <Image
                  src={tool.screenshot}
                  alt={`${tool.name} preview`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-12">
            {tool.features && tool.features.length > 0 && (
              <div>
                <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-6">Core Capabilities</h2>
                <ul className="space-y-4">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 p-5 bg-white/50 border border-white/30 rounded-2xl text-sm md:text-base font-bold text-micro-fg shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-terminal-lime/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-terminal-lime text-xs font-black">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-12">
              {tool.pricingDetails && (
                <div>
                  <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-6">Commercials</h2>
                  <div className="p-6 bg-micro-fg text-white rounded-2xl shadow-xl">
                    <div className="text-sm md:text-base font-bold">
                      {tool.pricingDetails}
                    </div>
                  </div>
                </div>
              )}
              
              {tool.integrations && tool.integrations.length > 0 && (
                <div>
                  <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-6">Ecosystem</h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.integrations.map((int) => (
                      <span key={int} className="px-4 py-2 bg-white/50 rounded-xl text-xs font-bold text-micro-fg border border-white/20 shadow-sm">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tool.maker && (
                <div>
                  <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-6">Built By</h2>
                  <a 
                    href={tool.maker.twitter ? `https://x.com/${tool.maker.twitter}` : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/maker flex items-center gap-5 p-5 bg-white/50 border border-white/30 rounded-2xl shadow-sm hover:border-micro-fg transition-all"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 group-hover/maker:scale-110 transition-transform">
                      <img src={tool.maker.image} alt={tool.maker.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-micro-fg group-hover/maker:text-terminal-lime transition-colors">{tool.maker.name}</div>
                      {tool.maker.role && (
                        <div className="text-[10px] font-bold text-micro-muted uppercase tracking-widest mt-0.5">{tool.maker.role}</div>
                      )}
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 md:mt-20 pt-12 md:pt-20 border-t border-micro-layer-1/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-micro-fg mb-2">Ready to try {tool.name}?</h4>
              <p className="text-micro-muted font-medium italic">Visit the official site to get started.</p>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-micro-fg text-white rounded-full text-sm md:text-base font-black uppercase tracking-[0.1em] hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
            >
              Visit Website <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </>
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
  const tool = aiTools.find((t) => slugify(t.name) === slug) || null;
  return { props: { tool } };
};
