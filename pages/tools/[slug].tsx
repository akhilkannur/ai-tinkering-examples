import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { aiTools, AiTool } from '../../lib/ai-tools-data';
import { ExternalLink, ArrowLeft, ArrowUpRight, Megaphone, Crown } from 'lucide-react';
import { adSpots, featuredPlaceholders, AdSpot } from '../../lib/ads-data';

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\./g, '-').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

function addRef(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set('ref', 'realaiexamples');
    return u.toString();
  } catch {
    return url;
  }
}

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
  const billboardAd = adSpots.find(ad => ad.type === 'billboard' && ad.active);

  if (!tool) {
    return <div className="flex items-center justify-center text-micro-muted font-mono">Tool not found</div>;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const currentUrl = `${baseUrl}/tools/${slugify(tool.name)}`;
  const description = `Discover how to use ${tool.name} in your workflow. A curated ${tool.category} tool with verified capabilities, pricing, and integrations.`;
  const socialImage = tool.screenshot || tool.image;
  const socialImageUrl = socialImage.startsWith('http') ? socialImage : `${baseUrl}${socialImage}`;

  return (
    <>
      <Head>
        <title>{tool.name}: New {tool.category} AI Tool & Use Case</title>
        <meta name="description" content={description} key="description" />
        <link rel="canonical" href={currentUrl} key="canonical" />
        <meta property="og:title" content={`${tool.name}: ${tool.category} Tool`} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={currentUrl} key="og:url" />
        <meta property="og:image" content={socialImageUrl} key="og:image" />
        <meta name="twitter:title" content={`${tool.name}: ${tool.category} Tool`} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta name="twitter:image" content={socialImageUrl} key="twitter:image" />
      </Head>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1 min-w-0">
            <div className="glass-sheet rounded-sm md:rounded-sm p-6 md:p-12 lg:p-16 overflow-hidden shadow-2xl">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-micro-muted uppercase tracking-widest hover:text-micro-fg transition-colors mb-8 md:mb-12 bg-white/50 px-4 py-2 rounded-sm border border-white/20 shadow-sm"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Back to Tools
          </Link>

          <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12 mb-12 md:mb-20">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-sm border border-micro-layer-1 bg-white flex-shrink-0 flex items-center justify-center p-4 overflow-hidden shadow-soft">
              <Image
                src={imgSrc}
                alt={tool.name}
                width={128}
                height={128}
                className="object-contain"
                onError={() => setImgSrc(fallbackLogo)}
                unoptimized
              />
            </div>
            <div className="flex-1">
              <a 
                href={addRef(tool.url)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/title inline-flex items-start gap-2 mb-6"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-micro-fg leading-[0.85] group-hover/title:text-micro-accent transition-colors">
                  {tool.name}
                </h1>
                <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8 text-micro-muted group-hover/title:text-micro-accent group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all duration-300" />
              </a>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-5 py-2 rounded-sm bg-micro-fg text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                  {tool.category}
                </span>
                <span className="w-28 text-center py-2 rounded-sm bg-white border border-micro-layer-1 text-[11px] font-black uppercase tracking-[0.2em] text-micro-muted flex-shrink-0">
                  {tool.tags.price}
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mb-16">
            <p className="text-xl md:text-2xl lg:text-3xl text-micro-fg font-medium leading-[1.2] tracking-tight mb-12">
              {tool.description}
            </p>
          </div>

          {tool.screenshot && (
            <div className="mb-20">
              <div className="rounded-sm border-8 border-white overflow-hidden shadow-2xl bg-white relative aspect-[16/10] group/preview cursor-zoom-in">
                <Image
                  src={tool.screenshot}
                  alt={`${tool.name} preview`}
                  fill
                  className="object-cover group-hover/preview:scale-[1.02] transition-transform duration-700"
                  unoptimized
                />
              </div>
            </div>
          )}

          <div className="space-y-20">
            {tool.features && tool.features.length > 0 && (
              <div>
                <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-8">Core Capabilities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-5 p-6 bg-white border border-micro-layer-1 rounded-sm text-base md:text-lg font-bold text-micro-fg shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative w-6 h-6 flex-shrink-0 mt-1">
                        <div className="absolute inset-0 bg-terminal-lime translate-x-[2px] translate-y-[2px]"></div>
                        <div className="absolute inset-0 bg-micro-fg flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-terminal-lime"></div>
                        </div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              {tool.pricingDetails && (
                <div className="lg:col-span-2">
                  <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-8">Commercials</h2>
                  <div className="p-6 md:p-8 bg-micro-layer-1 border border-micro-layer-2 rounded-sm flex flex-col justify-center min-h-[100px]">
                    <div className="text-base md:text-lg font-bold text-micro-fg leading-snug">
                      {tool.pricingDetails}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-12">
                {tool.integrations && tool.integrations.length > 0 && (
                  <div>
                    <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-8">Ecosystem</h2>
                    <div className="flex flex-wrap gap-3">
                      {tool.integrations.map((int) => (
                        <span key={int} className="px-5 py-2.5 bg-white rounded-sm text-[13px] font-black uppercase text-micro-fg border border-micro-layer-1 shadow-sm">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tool.maker && (
                  <div>
                    <h2 className="text-[10px] md:text-xs font-black text-micro-muted uppercase tracking-[0.3em] mb-8">Built By</h2>
                    <a 
                      href={tool.maker.twitter ? `https://x.com/${tool.maker.twitter}` : '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/maker flex items-center gap-6 p-6 bg-white border border-micro-layer-1 rounded-sm shadow-sm hover:border-micro-fg transition-all"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0 group-hover/maker:scale-110 transition-transform">
                        <img src={tool.maker.image} alt={tool.maker.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-micro-fg group-hover/maker:text-terminal-lime transition-colors">{tool.maker.name}</div>
                        {tool.maker.role && (
                          <div className="text-[11px] font-black text-micro-muted uppercase tracking-[0.1em] mt-1">{tool.maker.role}</div>
                        )}
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-20 pt-12 md:pt-20 border-t border-micro-layer-1/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-micro-fg mb-2">Ready to try {tool.name}?</h4>
              <p className="text-micro-muted font-medium italic">Visit the official site to get started.</p>
            </div>
            <a
              href={addRef(tool.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-micro-fg text-white rounded-sm text-sm md:text-base font-black uppercase tracking-[0.1em] hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
            >
              Visit Website <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">

              {billboardAd && (
                <a
                  href={billboardAd.link}
                  target={billboardAd.link.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-sm border border-white/5 bg-coffee-900/80 backdrop-blur-md p-5 transition-all hover:border-[#064e3b]/30 shadow-xl"
                >
                  <div className="absolute top-0 right-0 bg-[#064e3b] text-white text-[7px] font-black px-3 py-0.5 uppercase tracking-widest shadow-lg">Partner Spotlight</div>
                  <div className="flex items-start gap-4 relative z-10">
                    {billboardAd.logo ? (
                      <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden p-2">
                        <Image src={billboardAd.logo} alt={billboardAd.title} width={48} height={48} className="object-contain" unoptimized />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0">
                        <Megaphone className="w-6 h-6 text-[#064e3b] animate-pulse" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors tracking-tight leading-snug">{billboardAd.title}</h3>
                      <p className="text-[11px] text-white/50 font-medium leading-relaxed line-clamp-2">{billboardAd.description}</p>
                      <span className="inline-block mt-3 bg-[#064e3b] text-white px-4 py-1.5 rounded-sm font-black uppercase tracking-widest text-[8px] hover:bg-white hover:text-black transition-all border border-[#064e3b]">
                        {billboardAd.ctaText}
                      </span>
                    </div>
                  </div>
                </a>
              )}

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-3.5 h-3.5 text-[#064e3b]" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-micro-muted">Featured Selection</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {featuredPlaceholders.map(ad => (
                    <a
                      key={ad.id}
                      href={ad.link}
                      target={ad.link.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`group block relative rounded-sm border p-4 transition-all ${
                        ad.isPlaceholder 
                        ? 'border-micro-layer-2 border-dashed bg-white hover:border-[#064e3b]/20'
                        : 'border-[#064e3b]/20 bg-[#f0fdf4] hover:shadow-lg hover:border-[#064e3b]/40'
                      }`}
                    >
                      {!ad.isPlaceholder && (
                        <div className="absolute top-0 right-0 bg-[#064e3b] text-white text-[7px] font-black px-2 py-0.5 uppercase tracking-widest rounded-bl-sm">Selection</div>
                      )}
                      <div className="flex items-start gap-3">
                        {!ad.isPlaceholder && (
                          <div className="w-10 h-10 bg-white rounded-sm border border-coffee-200 p-1.5 overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                            {ad.logo ? (
                              <Image src={ad.logo} alt={ad.title} width={28} height={28} className="object-contain" unoptimized />
                            ) : (
                              <div className="w-full h-full bg-coffee-100 flex items-center justify-center text-coffee-800 font-bold text-xs">{ad.title[0]}</div>
                            )}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-bold mb-0.5 ${ad.isPlaceholder ? 'text-micro-muted' : 'text-[#064e3b]'}`}>
                            {ad.isPlaceholder ? 'Get Featured Here' : ad.title}
                          </h3>
                          <p className={`text-[11px] font-medium leading-relaxed line-clamp-2 ${ad.isPlaceholder ? 'text-micro-muted/60' : 'text-[#064e3b]/60'}`}>{ad.description}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

            </div>
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
