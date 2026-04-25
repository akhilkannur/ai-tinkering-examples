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

      <div className="max-w-3xl mx-auto">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-xs font-bold text-micro-muted uppercase tracking-widest hover:text-micro-fg transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="flex items-start gap-6 mb-10">
          <div className="w-16 h-16 rounded-2xl border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-2 overflow-hidden shadow-soft">
            <Image
              src={imgSrc}
              alt={tool.name}
              width={64}
              height={64}
              className="object-contain"
              onError={() => setImgSrc(fallbackLogo)}
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-micro-fg leading-tight mb-2">
              {tool.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-micro-layer-1 text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                {tool.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-micro-layer-1 text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted">
                {tool.tags.price}
              </span>
            </div>
          </div>
        </div>

        <p className="text-lg text-micro-muted font-medium leading-relaxed mb-10 pb-10 border-b border-micro-layer-1">
          {tool.description}
        </p>

        {tool.features && tool.features.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold text-micro-muted uppercase tracking-[0.2em] mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 p-4 bg-micro-layer-1 rounded-xl text-sm font-medium text-micro-fg">
                  <span className="text-terminal-lime">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 pb-10 border-b border-micro-layer-1">
          {tool.pricingDetails && (
            <div>
              <h2 className="text-xs font-bold text-micro-muted uppercase tracking-[0.2em] mb-4">Pricing</h2>
              <div className="p-4 bg-micro-layer-1 rounded-xl text-sm font-bold text-micro-fg">
                {tool.pricingDetails}
              </div>
            </div>
          )}
          {tool.integrations && tool.integrations.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-micro-muted uppercase tracking-[0.2em] mb-4">Integrations</h2>
              <div className="flex flex-wrap gap-2">
                {tool.integrations.map((int) => (
                  <span key={int} className="px-3 py-1.5 bg-micro-layer-1 rounded-lg text-xs font-bold text-micro-fg border border-micro-layer-2">
                    {int}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {tool.tags.useCase.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold text-micro-muted uppercase tracking-[0.2em] mb-4">Use Cases</h2>
            <div className="flex flex-wrap gap-2">
              {tool.tags.useCase.map((uc) => (
                <span key={uc} className="px-4 py-2 rounded-full bg-micro-layer-1 text-sm font-medium text-micro-fg">
                  {uc}
                </span>
              ))}
            </div>
          </div>
        )}

        {tool.maker && (
          <div className="mb-10 pb-10 border-b border-micro-layer-1">
            <h2 className="text-xs font-bold text-micro-muted uppercase tracking-[0.2em] mb-4">Maker</h2>
            <a 
              href={tool.maker.twitter ? `https://x.com/${tool.maker.twitter}` : '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/maker flex items-center gap-4 inline-flex"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-micro-layer-1 flex-shrink-0 group-hover/maker:border-micro-fg transition-colors">
                <img src={tool.maker.image} alt={tool.maker.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-micro-fg group-hover/maker:text-terminal-lime transition-colors">{tool.maker.name}</div>
                {tool.maker.role && (
                  <div className="text-xs text-micro-muted">{tool.maker.role}</div>
                )}
              </div>
            </a>
          </div>
        )}

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-micro-fg text-white rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
        >
          Visit Website <ExternalLink className="w-4 h-4" />
        </a>
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
