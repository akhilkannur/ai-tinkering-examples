import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
import { ArrowRight, Zap, Brain } from 'lucide-react'
import { getAllRecipes } from '../lib/recipes'
import { Recipe } from '../lib/cookbook-data'
import NewsletterForm from '../components/NewsletterForm'
import NewsletterPopup from '../components/NewsletterPopup'
import FeaturedIn from '../components/FeaturedIn'
import HeroForm from '../components/HeroForm'
import { generateItemListSchema } from '../lib/seo-utils'

// Lazy load heavy components
const TerminalCookbook = dynamic(() => import('../components/BuilderFlowchart'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center text-text-secondary">Loading Blueprints...</div>
})

const MockTerminal = dynamic(() => import('../components/MockTerminal'), { ssr: false })

interface HomePageProps {
  recipes: Recipe[]
}

export default function HomePage({ recipes }: HomePageProps) {
  const homepageTitle = "500+ Real AI Examples: Agent-Ready Workflows & Blueprints";
  const homepageDescription = "Stop chatting and start building. A library of 500+ reliable, copy-paste Real AI Examples and blueprints for sales, marketing, and founders. Works with Gemini CLI and Claude Code.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';

  const itemListSchema = generateItemListSchema(recipes.slice(0, 12), baseUrl);

  return (
    <>
      <Head>
        <title>{homepageTitle}</title>
        <meta name="description" content={homepageDescription} key="description" />
        <meta property="og:title" content={homepageTitle} key="og:title" />
        <meta property="og:description" content={homepageDescription} key="og:description" />
        <meta property="og:url" content={baseUrl} key="og:url" />
        <meta property="og:image" content={`${baseUrl}/api/og?mode=home`} key="og:image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" key="og:type" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@realaiexamples" />
        <meta name="twitter:title" content={homepageTitle} key="twitter:title" />
        <meta name="twitter:description" content={homepageDescription} key="twitter:description" />
        <meta name="twitter:image" content={`${baseUrl}/api/og?mode=home`} key="twitter:image" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Real AI Examples",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/ai-examples?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </Head>

      <style jsx global>{`
        body {
            font-family: 'Space Mono', monospace;
            background-color: #f0f0f0;
        }
        .font-display {
            font-family: 'Archivo Black', sans-serif;
        }
        .brutalist-shadow {
            box-shadow: 6px 6px 0px 0px #000;
        }
        .brutalist-shadow-sm {
            box-shadow: 3px 3px 0px 0px #000;
        }
        .marquee-container {
            overflow: hidden;
            white-space: nowrap;
        }
        .marquee-content {
            display: inline-block;
            animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .glitch-text {
            position: relative;
        }
        .glitch-text::before, .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
            left: -2px;
            text-shadow: -1px 0 #00fff9;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
            0% { clip: rect(14px, 9999px, 12px, 0); }
            5% { clip: rect(84px, 9999px, 4px, 0); }
            10% { clip: rect(2px, 9999px, 86px, 0); }
            15% { clip: rect(6px, 9999px, 20px, 0); }
            20% { clip: rect(54px, 9999px, 27px, 0); }
            100% { clip: rect(32px, 9999px, 66px, 0); }
        }
      `}</style>

      <div className="min-h-screen font-mono text-black selection:bg-[#ff00ff] selection:text-white">
        <Navbar />

        {/* HERO SECTION */}
        <div className="bg-white pt-32 pb-20 relative overflow-hidden border-b-4 border-black">
            {/* Background Decorations */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#ff00ff] rounded-full mix-blend-multiply opacity-30 blur-xl pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#ccff00] rounded-full mix-blend-multiply opacity-30 blur-xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] mb-6 transform -rotate-2">
                            For Non-Technical Tinkerers & Founders
                        </div>
                        
                        <h1 className="font-display text-5xl md:text-7xl mb-8 uppercase leading-[0.9] break-words">
                            Workflows for <br />
                            <span className="bg-[#ccff00] px-2 text-black">Chat & Agents.</span>
                        </h1>
                        
                        <p className="text-xl font-bold mb-10 border-l-8 border-[#ff00ff] pl-6 py-2 bg-gray-50 leading-relaxed max-w-lg">
                            500+ hardened instruction sets. Use them as <strong>high-reliability prompts</strong> in ChatGPT, or deploy them as <strong>automated skills</strong> in your terminal. 
                        </p>

                        <div className="inline-block bg-black text-[#ccff00] border-2 border-black px-3 py-1 mb-6 brutalist-shadow-sm transform rotate-1">
                            <span className="text-xs font-bold tracking-wide uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-current" /> Optimized for Claude.ai, Gemini CLI, and Claude Code
                            </span>
                        </div>

                        <div className="flex flex-col gap-8 max-w-lg mb-12">
                            <a
                                href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                                className="group w-full sm:w-auto px-8 py-5 bg-[#ff00ff] border-4 border-black font-display text-2xl uppercase brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 text-white relative"
                            >
                                Get 1 Year Access ($39) 
                                <ArrowRight className="w-8 h-8 stroke-[4px] group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-sm font-black text-black uppercase tracking-tight">
                                    Not ready? <button onClick={() => {
                                        const form = document.getElementById('free-pack-form');
                                        form?.scrollIntoView({ behavior: 'smooth' });
                                        (document.querySelector('#free-pack-form input') as HTMLInputElement)?.focus();
                                    }} className="text-black underline decoration-2 underline-offset-4 hover:text-[#ff00ff] transition-colors bg-[#ccff00] px-1">Grab 5 starter blueprints for free</button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="absolute -top-6 -right-6 bg-[#ccff00] w-full h-full border-4 border-black z-0"></div>
                        <div className="relative z-10 border-4 border-black brutalist-shadow">
                          <MockTerminal />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* MARQUEE SECTION (NEW REBRAND ELEMENT) */}
        <div className="bg-[#ccff00] border-b-4 border-black py-4 overflow-hidden">
            <div className="marquee-container font-display text-2xl uppercase tracking-widest">
                <div className="marquee-content">
                    Real AI Examples // Prompts for Chat // Agent Ready Skills // 500+ Blueprints // Workflows for Operators // Real AI Examples // Prompts for Chat // Agent Ready Skills // 500+ Blueprints // Workflows for Operators //
                </div>
            </div>
        </div>

        <FeaturedIn />

        {/* THE 5-FILE SETUP */}
        <div className="bg-white py-16 border-y-4 border-black relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] opacity-10 font-display text-9xl leading-none select-none pointer-events-none">5 FILES</div>

              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-widest mb-6 transform -rotate-1">
                    <Brain className="w-3 h-3" /> The 5-File Setup
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl text-black mb-6 tracking-tight uppercase">
                    One File Per Department.<br />
                    <span className="text-[#ff00ff]">500+ Workflows Total.</span>
                  </h2>
                  <p className="text-xl font-bold max-w-2xl leading-relaxed">
                    Instead of downloading blueprints one by one, get 5 consolidated files. Drop them in your .claude/skills/ folder. Your agent reads them automatically.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                    <div className="bg-gray-50 border-2 border-black p-4">
                      <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Sales Ops</div>
                      <div className="text-2xl font-display text-black">254</div>
                    </div>
                    <div className="bg-gray-50 border-2 border-black p-4">
                      <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Marketing Ops</div>
                      <div className="text-2xl font-display text-black">118</div>
                    </div>
                    <div className="bg-gray-50 border-2 border-black p-4">
                      <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">SEO & Content</div>
                      <div className="text-2xl font-display text-black">106</div>
                    </div>
                    <div className="bg-gray-50 border-2 border-black p-4">
                      <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">RevOps</div>
                      <div className="text-2xl font-display text-black">157</div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full lg:w-auto">
                  <Link href="/context" className="block w-full lg:w-auto bg-[#ccff00] text-black text-center px-12 py-6 border-4 border-black font-display text-xl uppercase brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    See the 5 Files <ArrowRight className="inline-block w-8 h-8 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COOKBOOK GRID */}
        <div className="bg-white pb-24" id="skills">
            <div className="container mx-auto px-4">
               <TerminalCookbook recipes={recipes} />
            </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-[#f0f0f0] py-20 border-t-4 border-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-4xl text-black mb-12 text-center uppercase decoration-wavy underline decoration-[#ff00ff]">
              Quick Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-4 border-black p-6 brutalist-shadow relative">
                <div className="absolute -left-3 -top-3 bg-black text-white px-2 py-1 font-mono text-xs">Q.01</div>
                <h3 className="font-display text-xl mb-3 text-black uppercase leading-tight">Where do I put them?</h3>
                <p className="font-bold text-black text-sm leading-relaxed">
                  Download the blueprint (.md) and drop it into <code className="bg-gray-100 px-1 border border-black text-black">.agents/skills/</code> or <code className="bg-gray-100 px-1 border border-black text-black">.claude/skills/</code>. The same file works with Claude Code, Gemini CLI, Cursor, and all major agent tools.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-6 brutalist-shadow relative">
                <div className="absolute -left-3 -top-3 bg-black text-white px-2 py-1 font-mono text-xs">Q.02</div>
                <h3 className="font-display text-xl mb-3 text-black uppercase leading-tight">What are the 5 Files?</h3>
                <p className="font-bold text-black text-sm leading-relaxed">
                  Instead of 500 small files, we've grouped blueprints into 5 department-level files: Sales Ops, Marketing Ops, SEO & Content, RevOps, and Automation & Dev. One file gives your agent an entire department's playbooks.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-6 brutalist-shadow relative">
                <div className="absolute -left-3 -top-3 bg-black text-white px-2 py-1 font-mono text-xs">Q.03</div>
                <h3 className="font-display text-xl mb-3 text-black uppercase leading-tight">How are these generated?</h3>
                <p className="font-bold text-black text-sm leading-relaxed">
                  This site is a meta-experiment. When a workflow works for my business, I immediately turn it into a skill and publish it. For general use cases, I take feedback from users and experts to refine the logic. Any questions? Reach out at <a href="mailto:akhil@realaiexamples.com" className="text-[#ff00ff] hover:underline">akhil@realaiexamples.com</a>.
                </p>
              </div>

              <div className="bg-white border-4 border-black p-6 brutalist-shadow relative">
                <div className="absolute -left-3 -top-3 bg-black text-white px-2 py-1 font-mono text-xs">Q.04</div>
                <h3 className="font-display text-xl mb-3 text-black uppercase leading-tight">Is it safe?</h3>
                <p className="font-bold text-black text-sm leading-relaxed">
                  100% plain text (.md). No executables or hidden scripts. You can audit every line before giving it to your agent. If you use open-source models (like Llama), no data leaves your machine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER / FREE PACK */}
        <div className="bg-[#ccff00] text-black py-24 border-t-4 border-black" id="free-pack-form">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-5xl md:text-6xl mb-6 uppercase">
              🎁 Grab the Free Pack
            </h2>
            <p className="text-xl mb-10 font-bold max-w-2xl mx-auto uppercase leading-tight font-mono">
              // Not ready for 500+ files? <br/>
              Get my top 5 high-impact starter blueprints for free. 
            </p>

            <div className="max-w-[600px] mx-auto">
              <NewsletterForm />
            </div>
            <p className="text-[10px] font-black font-mono text-black/40 uppercase mt-8 tracking-[0.2em]">
              Instant Access. No Spam. No BS.
            </p>
          </div>
        </div>

        {/* EXIT INTENT POPUP */}
        <NewsletterPopup delay={30} />

      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const recipes = await getAllRecipes();

    return {
      props: { recipes },
      revalidate: 86400,
    }
  } catch (error) {
    console.error('Failed to fetch recipes for homepage:', error)
    return {
      props: { recipes: [] },
      revalidate: 3600,
    }
  }
}
