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
            background-image: radial-gradient(#000 1px, transparent 1px);
            background-size: 20px 20px;
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
                            Start Building Real Agents
                        </div>
                        
                        <h1 className="font-display text-5xl md:text-7xl mb-8 uppercase leading-[0.9] break-words">
                            Stop Arguing <br />
                            <span className="bg-[#ccff00] px-2 text-black">with Chatbots.</span>
                        </h1>
                        
                        <p className="text-xl font-bold mb-10 border-l-8 border-[#ff00ff] pl-6 py-2 bg-gray-50 leading-relaxed max-w-lg">
                            A library of 500+ agent-ready blueprints for Sales, Marketing, and Ops. Built for Gemini CLI, Claude Code, and all major LLM agents.
                        </p>

                        <div className="inline-block bg-black text-[#ccff00] border-2 border-black px-3 py-1 mb-6 brutalist-shadow-sm transform rotate-1">
                            <span className="text-xs font-bold tracking-wide uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-current" /> 500+ Files. 1 Year Access.
                            </span>
                        </div>

                        <div className="flex flex-col gap-8 mb-12">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <a 
                                    href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                                    className="w-full sm:w-auto px-10 py-5 bg-[#ff00ff] border-4 border-black font-display text-xl uppercase brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 text-white"
                                >
                                    Get 1 Year Access ($39) <ArrowRight className="w-6 h-6 stroke-[3px]" />
                                </a>
                                <div className="text-black font-display text-sm uppercase opacity-40 hidden sm:block">OR</div>
                                <HeroForm />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-gray-600 mb-12 flex items-center gap-2 uppercase tracking-widest">
                          <span className="text-emerald-600 font-black">✓</span>
                          1 Year Access. No recurring auto-charge.
                        </p>
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
                    Real AI Examples // Agent Ready Workflows // 500+ Blueprints // Stop Chatting Start Building // Real AI Examples // Agent Ready Workflows // 500+ Blueprints // Stop Chatting Start Building //
                </div>
            </div>
        </div>

        <FeaturedIn />

        {/* COMPACT MASTER SKILLS BANNER */}
        <div className="bg-white py-16 border-y-4 border-black relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00] opacity-10 font-display text-9xl leading-none select-none pointer-events-none">PHD</div>
              
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] uppercase tracking-widest mb-6 transform -rotate-1">
                    <Brain className="w-3 h-3" /> Master Skill Library
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl text-black mb-6 tracking-tight uppercase glitch-text" data-text="GIVE YOUR AGENT A PHD.">
                    Give Your Agent a <span className="text-[#ff00ff] italic">PhD.</span>
                  </h2>
                  <p className="text-xl font-bold max-w-2xl leading-relaxed">
                    Stop feeding your agent 500 individual files. Use our <strong>Consolidated Master Skills</strong> to give them departmental intelligence in one single file.
                  </p>
                  <div className="mt-4 text-sm font-mono text-gray-500 italic border-l-4 border-black pl-4 py-1">
                    "From the marketing standpoint, review our GTM plan."
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-full lg:w-auto">
                  <Link href="/context" className="block w-full lg:w-auto bg-[#ccff00] text-black text-center px-12 py-6 border-4 border-black font-display text-xl uppercase brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    Browse Master Skills <ArrowRight className="inline-block w-8 h-8 ml-2" />
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
                <h3 className="font-display text-xl mb-3 text-black uppercase leading-tight">What are Master Skills?</h3>
                <p className="font-bold text-black text-sm leading-relaxed">
                  Instead of 500 small files, we've grouped them into  department-level "Master Skills." One file gives your agent the complete knowledge of an entire department.
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

        {/* NEWSLETTER */}
        <div className="bg-[#ccff00] text-black py-24 border-t-4 border-black" id="newsletter">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-5xl md:text-6xl mb-6 uppercase">
              📬 Don't Miss Out!
            </h2>
            <p className="text-xl mb-10 font-bold max-w-2xl mx-auto">
              Free blueprints starter pack and occasional updates on actionable AI tactics. If they suck, unsubscribe. I won't be offended.
            </p>

            <div className="max-w-[600px] mx-auto">
              <NewsletterForm />
            </div>
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
